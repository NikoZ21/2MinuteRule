import { ScrollView } from "react-native";

import NewHabitForm from "../../../components/NewHabits/NewHabitForm";
import HabitCard from "../../../components/Shared/HabitCard";
import type Habit from "../../../types/Habit";
import HabitTimerModal from "../../../components/NewHabits/HabitTimerModal";
import { useState } from "react";

export default function GoodHabits() {
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
  const [timerModalVisible, setTimerModalVisible] = useState(true);

  return (
    <HabitTimerModal
      visible={timerModalVisible}
      onClose={() => {
        setTimerModalVisible(false);
      }}
      habit={initialLocalStorageHabits[0]}
      onTimerComplete={() => {}}
    />
    // <ScrollView
    //   style={{ width: "100%", marginVertical: 30 }}
    //   contentContainerStyle={{ alignItems: "center" }}
    // >
    //   {initialLocalStorageHabits?.length ? (
    //     initialLocalStorageHabits.map((habit) => (
    //       <HabitCard key={habit.id} habit={habit} />
    //     ))
    //   ) : (
    //     <NewHabitForm />
    //   )}
    // </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//     paddingHorizontal: 24,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "rgba(226, 232, 240, 0.5)",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1e293b",
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: "#64748b",
//   },
//   streakBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fed7aa",
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 20,
//   },
//   streakText: {
//     fontSize: 14,
//     color: "#ea580c",
//     marginLeft: 4,
//     fontWeight: "500",
//   },
// });
