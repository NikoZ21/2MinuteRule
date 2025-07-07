import { ScrollView } from "react-native";

import NewHabitCard from "./NewHabitCard";
import NewHabitForm from "./NewHabitForm";
import type Habit from "../../types/Habit";

export default function NewHabitsList() {
  const initialLocalStorageHabits: Habit[] = [
    {
      id: "1",
      title: "Daily Exercise",
      category: "Health",
      icon: "fitness",
      iconColor: AppColors.primary,
      currentProgress: 0,
      totalProgress: 1,
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Read Books",
      category: "Learning",
      icon: "book",
      iconColor: AppColors.task2,
      currentProgress: 0,
      totalProgress: 30,
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Meditate",
      category: "Mindfulness",
      icon: "leaf",
      iconColor: AppColors.task3,
      currentProgress: 0,
      totalProgress: 15,
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
          <NewHabitCard key={habit.id} habit={habit} />
        ))
      ) : (
        <NewHabitForm />
      )}
    </ScrollView>
  );
}
