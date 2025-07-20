import { ScrollView } from "react-native";

import NewHabitForm from "../../../components/NewHabits/NewHabitForm";
import HabitCard from "../../../components/Shared/HabitCard";

import { useHabits } from "../../../contexts/HabitsContext";

export default async function GoodHabits() {
  const habitContext = useHabits();
  return (
    // <HabitTimerModal
    //   visible={timerModalVisible}
    //   onClose={() => {
    //     setTimerModalVisible(false);
    //   }}
    //   habit={initialLocalStorageHabits[0]}
    //   onTimerComplete={() => {}}
    // />
    <ScrollView
      style={{ width: "100%", marginVertical: 30 }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {habitContext.habits?.length ? (
        habitContext.habits.map((habit) => (
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
