import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import type Habit from "../../types/Habit";

/**
 * Props interface for the NewHabitCard component
 *
 * @public
 */
interface NewHabitCardProps {
  /** The habit object containing all habit data to display */
  habit: Habit;
}

/**
 * A card component that displays habit information including icon, title, category, and progress.
 * Features a progress bar showing current completion status and a close/delete button.
 *
 * @param props - The component props
 * @param props.habit - The habit object containing title, category, icon, progress, etc.
 * @returns A styled card displaying the habit information
 *
 * @example
 * ```tsx
 * const habit: Habit = {
 *   id: '1',
 *   title: 'Read Books',
 *   category: 'Education',
 *   icon: 'book',
 *   iconColor: '#4A90E2',
 *   currentProgress: 3,
 *   totalProgress: 10
 * };
 *
 * <NewHabitCard habit={habit} />
 * ```
 *
 * @public
 */
export default function NewHabitCard({ habit }: NewHabitCardProps) {
  /**
   * Calculate the progress percentage based on current vs total progress
   * @remarks Progress is calculated as (current/total) * 100, clamped between 0-100%
   */
  const progressPercentage =
    (habit.currentProgress / habit.totalProgress) * 100;

  return (
    <View style={styles.container}>
      {/* Trash Icon in top right corner */}
      <View style={styles.trashIconContainer}>
        <MaterialCommunityIcons name="close" size={18} color="red" />
      </View>

      {/* Icon and Content */}
      <View style={{ flexDirection: "row" }}>
        <View
          style={[styles.iconContainer, { backgroundColor: habit.iconColor }]}
        >
          <MaterialCommunityIcons
            name={habit.icon as keyof typeof MaterialCommunityIcons.glyphMap}
            size={36}
            color="white"
          />
        </View>

        {/* Content */}
        <View style={{ flex: 1 }}>
          <View style={styles.content}>
            <Text style={[styles.title, { color: habit.iconColor }]}>
              {habit.title}
            </Text>
            <Text style={[styles.category, { color: habit.iconColor }]}>
              {habit.category}
            </Text>
          </View>
          <View style={{ width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.progressTitle}>Today</Text>
              <Text style={[styles.progressTitle]}>
                {habit.currentProgress}/{habit.totalProgress}
              </Text>
            </View>
            {/* Progress Bar */}
            <View style={styles.progressSection}>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${progressPercentage}%`,
                      backgroundColor: habit.iconColor,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.1, // iOS shadow
    shadowRadius: 4, // iOS shadow
    marginVertical: 8,
    position: "relative",
  },
  trashIconContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    // color: ,
    marginBottom: 2,
  },
  category: {
    fontSize: 14,
    color: "#666",
  },
  timeContainer: {
    alignItems: "flex-end",
  },
  timeText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  progressTitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
    marginBottom: 4,
  },
  progressSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBarContainer: {
    flex: 1,
    height: 3,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
});
