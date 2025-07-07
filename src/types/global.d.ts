import { Colors } from "../constants/Colors";
// import AsyncStorage from "@react-native-async-storage/async-storage";

declare global {
  var AppColors: typeof Colors;
  // const _storeData = async (key: string, value: any) => {
  //   try {
  //     await AsyncStorage.setItem(key, JSON.stringify(value));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const _retrieveData = async <T>(key: string): Promise<T | null> => {
  //   try {
  //     const value = await AsyncStorage.getItem(key);
  //     return value != null ? JSON.parse(value) : null;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
}

export {};
