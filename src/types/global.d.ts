import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors } from "../constants/Colors";
import type { Habit } from "../types/Habit";

declare global {
  var AppColors: typeof Colors;
  const _storeDataLocal = async (key: string, value: Habit) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  const _retrieveDataLocal = async <T>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (error) {
      console.error(error);
    }
  };
}

export {};
