import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JobDetailsScreen = ({ route }) => {
  const { job } = route.params;

  const bookmarkJob = async () => {
    try {
      const storedJobs = await AsyncStorage.getItem('bookmarkedJobs');
      let jobs = storedJobs ? JSON.parse(storedJobs) : [];

      // Avoid duplicates
      const exists = jobs.some((j) => j.id === job.id);
      if (!exists) {
        jobs.push(job);
        await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(jobs));
        Alert.alert("Success", "Job bookmarked!");
      } else {
        Alert.alert("Info", "Job already bookmarked.");
      }
    } catch (e) {
      console.error("Bookmarking error:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text>Location: {job.location}</Text>
      <Text>Salary: {job.salary}</Text>
      <Text>Phone: {job.phone}</Text>
      <Text>Description: {job.description || "No description available."}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="Bookmark this Job" onPress={bookmarkJob} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});

export default JobDetailsScreen;
