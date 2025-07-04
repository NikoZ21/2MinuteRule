import { useState } from "react";
import { View } from "react-native";

import NewHabitsList from "../../components/NewHabits/NewHabitsList";

export default function Index() {
  const [screen, setScreen] = useState<"newHabit" | "badHabit">("newHabit");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NewHabitsList />
    </View>
  );
}
