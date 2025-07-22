import { Stack } from "expo-router";
import Colors from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Habit from "../types/Habit";

// Initialize global variables
global.AppColors = Colors;
global._storeDataLocal = async (key: string, value: Habit) => {
  console.log("storeDataLocal", key, value);
  try {
    console.log("storeDataLocal", key, value);
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

global._retrieveDataLocal = async function <T>(key: string): Promise<T | null> {
  console.log("retrieveDataLocal", key);
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
