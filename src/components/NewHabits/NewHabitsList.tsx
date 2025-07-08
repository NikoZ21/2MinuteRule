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
      icon: "dumbbell",
      iconColor: AppColors.primary,
      currentProgress: 9,
      totalProgress: 1,
      dailyGoal: 20,
      streak: 5,
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Read Books",
      category: "Learning",
      icon: "book",
      iconColor: AppColors.task2,
      currentProgress: 2,
      totalProgress: 3,
      dailyGoal: 3,
      streak: 12,
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Meditate",
      category: "Mindfulness",
      icon: "leaf",
      iconColor: AppColors.task3,
      currentProgress: 0,
      totalProgress: 2,
      dailyGoal: 2,
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
          <NewHabitCard key={habit.id} habit={habit} />
        ))
      ) : (
        <NewHabitForm />
      )}
    </ScrollView>
  );
}
