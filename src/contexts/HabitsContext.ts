import { createContext, useContext } from "react";
import Habit from "../types/Habit";

export interface HabitsContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, "id" | "createdAt">) => void;
  removeHabit: (id: string) => void;
  updateHabitProgress: (id: string, progress: number) => void;
}

export const HabitsContext = createContext<HabitsContextType | undefined>(
  undefined
);

export const useHabits = (): HabitsContextType => {
  const context = useContext(HabitsContext);
  if (context === undefined) {
    throw new Error("useHabits must be used within a HabitsProvider");
  }
  return context;
};
