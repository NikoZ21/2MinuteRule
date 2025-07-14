import { ScrollView } from "react-native";

import HabitCard from "../../../components/Shared/HabitCard";
import NewHabitForm from "../../../components/NewHabits/NewHabitForm";
import type Habit from "../../../types/Habit";

export default function BadHabits() {
  const initialLocalStorageHabits: Habit[] = [
    {
      id: "1",
      title: "Bad Habit",
      category: "Bad",
      icon: "star-face",
      iconColor: "red",
      currentProgress: 0,
      totalProgress: 100,
      dailyGoal: 10,
      streak: 0,
      createdAt: new Date(),
    },
  ];
  return (
    <ScrollView
      style={{ width: "100%", marginVertical: 30 }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {initialLocalStorageHabits?.length ? (
        initialLocalStorageHabits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))
      ) : (
        <NewHabitForm />
      )}
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
// });
