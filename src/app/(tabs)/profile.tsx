import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export default function BadHabits() {
  return (
    <View>
      <Text>Bad Habits</Text>
      <Ionicons name="trash" size={24} color="black" />
    </View>
  );
}
