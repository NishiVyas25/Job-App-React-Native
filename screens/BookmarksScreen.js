import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarksScreen = ({ navigation }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const stored = await AsyncStorage.getItem('bookmarkedJobs');
        const data = stored ? JSON.parse(stored) : [];
        setBookmarks(data);
        setLoading(false);
      } catch (err) {
        console.error('Load bookmarks error:', err);
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchBookmarks);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" />;
  }

  return (
    <FlatList
      data={bookmarks}
      keyExtractor={(item) => item.id?.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('JobDetails', { job: item })}
        >
          <Text style={styles.title}>{item.position}</Text>
          <Text>{item.company}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.list}
    />
  );
};

export default BookmarksScreen;

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: { backgroundColor: '#fff', padding: 16, marginBottom: 10, borderRadius: 6 },
  title: { fontWeight: 'bold', fontSize: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
