import { ScrollView } from "react-native";

import NewHabitForm from "../../../components/NewHabits/NewHabitForm";
import HabitCard from "../../../components/Shared/HabitCard";

import type Habit from "../../../types/Habit";

const initialLocalStorageHabits: Habit[] | null = await _retrieveDataLocal(
  "habits"
);
export default async function GoodHabits() {
  return (
    <HabitsProvider>
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
    </HabitsProvider>
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
