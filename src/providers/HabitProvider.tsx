import React, { ReactNode, useState } from "react";
import Habit from "../types/Habit";
import { HabitsContext, HabitsContextType } from "../contexts/HabitsContext";

interface HabitsProviderProps {
  children: ReactNode;
}

// Provider component
export const HabitsProvider: React.FC<HabitsProviderProps> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([
    // Sample data for testing
    {
      id: "1",
      title: "Read Book",
      category: "Education",
      icon: "book",
      iconColor: AppColors.primary,
      currentProgress: 3,
      totalProgress: 5,
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Yoga",
      category: "Health",
      icon: "flower",
      iconColor: AppColors.task2,
      currentProgress: 1,
      totalProgress: 3,
      createdAt: new Date(),
    },
  ]);

  // Add new habit
  const addHabit = (habitData: Omit<Habit, "id" | "createdAt">) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(), // Simple ID generation
      createdAt: new Date(),
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  // Remove habit by ID
  const removeHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  // Update habit progress
  const updateHabitProgress = (id: string, progress: number) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, currentProgress: progress } : habit
      )
    );
  };

  const value: HabitsContextType = {
    habits,
    addHabit,
    removeHabit,
    updateHabitProgress,
  };

  return React.createElement(HabitsContext.Provider, { value }, children);
};
