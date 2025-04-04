import React from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JobDetails = ({ route }) => {
  const { job } = route.params;

  const bookmarkJob = async () => {
    const storedJobs = await AsyncStorage.getItem("bookmarkedJobs");
    let bookmarks = storedJobs ? JSON.parse(storedJobs) : [];
    bookmarks.push(job);
    await AsyncStorage.setItem("bookmarkedJobs", JSON.stringify(bookmarks));
  };

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{job.title}</Text>
      <Text>Location: {job.location}</Text>
      <Text>Salary: {job.salary}</Text>
      <Text>Phone: {job.phone}</Text>
      <Button title="Bookmark" onPress={bookmarkJob} />
    </View>
  );
};

export default JobDetails;
