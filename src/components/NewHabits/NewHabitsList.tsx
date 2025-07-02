import { ScrollView, View } from "react-native";

import NewHabitCard from "./NewHabitCard";
import NewHabitForm from "./NewHabitForm";
import type Habit from "../../types/Habit";

export default function NewHabitsList() {
  const initialLocalStorageHabits: Habit[] = [];
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
      }}
    >
      <ScrollView style={{ width: "100%" }}>
        {initialLocalStorageHabits?.length ? (
          initialLocalStorageHabits.map((habit) => (
            <NewHabitCard key={habit.id} habit={habit} />
          ))
        ) : (
          <NewHabitForm />
        )}
      </ScrollView>
    </View>
  );
}
