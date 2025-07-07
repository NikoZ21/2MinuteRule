// import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import NewHabitsList from "../../components/NewHabits/NewHabitsList";

export default function Index() {
  // const [screen, setScreen] = useState<"newHabit" | "badHabit">("newHabit");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>2 Minute Rule</Text>
          <Text style={styles.headerSubtitle}>
            Build habits, one step at a time
          </Text>
        </View>
        <View style={styles.streakBadge}>
          <MaterialCommunityIcons name="fire" size={16} color="#ea580c" />
          <Text style={styles.streakText}>3 day streak</Text>
        </View>
      </View>

      <NewHabitsList />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(226, 232, 240, 0.5)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fed7aa",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  streakText: {
    fontSize: 14,
    color: "#ea580c",
    marginLeft: 4,
    fontWeight: "500",
  },
});
