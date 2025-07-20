import React, { ReactNode, useEffect, useState } from "react";
import type Habit from "../types/Habit";
import { HabitsContext, HabitsContextType } from "../contexts/HabitsContext";

interface HabitsProviderProps {
  children: ReactNode;
}

// Provider component
export default function HabitsProvider({ children }: HabitsProviderProps) {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchHabits = async () => {
      try {
        const habits = await _retrieveDataLocal("habits");
        if (isMounted) {
          setHabits(habits as Habit[]);
          console.log("habits", habits);
        }
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };
    fetchHabits();

    return () => {
      isMounted = false;
    };
  }, []);

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
}
