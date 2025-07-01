import { Stack } from "expo-router";
import Colors from "../Constants/Colors";

// Initialize global colors immediately when module loads
global.AppColors = Colors;

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
