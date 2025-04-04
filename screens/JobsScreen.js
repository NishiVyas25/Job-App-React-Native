import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JobsScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://remoteok.com/api')
      .then((response) => response.json())
      .then((data) => {
        const filtered = data.slice(1);
        setJobs(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  const bookmarkJob = async (job) => {
    try {
      const stored = await AsyncStorage.getItem('bookmarkedJobs');
      const bookmarks = stored ? JSON.parse(stored) : [];
      const updated = [...bookmarks, job];
      await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updated));
      alert('Job bookmarked!');
    } catch (err) {
      console.error('Bookmark error:', err);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { job: item })}>
        <Text style={styles.title}>{item.position}</Text>
        <Text>{item.company}</Text>
      </TouchableOpacity>
      <Button title="Bookmark" onPress={() => bookmarkJob(item)} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={jobs}
      keyExtractor={(item) => item.id?.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

export default JobsScreen;

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: { backgroundColor: '#eee', padding: 16, marginBottom: 12, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
