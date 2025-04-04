import AsyncStorage from '@react-native-async-storage/async-storage';

export const getBookmarks = async () => {
  const stored = await AsyncStorage.getItem('bookmarkedJobs');
  return stored ? JSON.parse(stored) : [];
};

export const saveBookmark = async (job) => {
  const bookmarks = await getBookmarks();
  const updated = [...bookmarks, job];
  await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updated));
};
