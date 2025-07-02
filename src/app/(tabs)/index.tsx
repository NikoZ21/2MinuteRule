import { View, Text } from "react-native";
import NewHabitsList from "../../components/NewHabits/NewHabitsList";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: AppColors.primary, // Your #4CAF50 color
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        2 Minute Rule App
      </Text>
      <NewHabitsList />
    </View>
  );
}
