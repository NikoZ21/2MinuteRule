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
 * A card component that displays habit information including icon, title, category, progress, and streak.
 * Features a progress bar showing current completion status, daily goal indicator, and completion checkmark.
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
 *   totalProgress: 10,
 *   dailyGoal: 3,
 *   streak: 12
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
  const progressPercentage = Math.min(
    (habit.currentProgress / habit.totalProgress) * 100,
    100
  );

  /**
   * Check if the habit is completed for today based on daily goal
   */
  const isCompleted = habit.currentProgress >= habit.dailyGoal;

  return (
    <View style={styles.container}>
      {/* Main Content Row */}
      <View style={styles.mainRow}>
        {/* Left Side - Icon and Content */}
        <View style={styles.leftSection}>
          <View
            style={[styles.iconContainer, { backgroundColor: habit.iconColor }]}
          >
            <MaterialCommunityIcons
              name={habit.icon as keyof typeof MaterialCommunityIcons.glyphMap}
              size={32}
              color="white"
            />
          </View>

          <View style={styles.contentSection}>
            <Text style={styles.title}>{habit.title}</Text>
            <Text style={styles.category}>{habit.category}</Text>
            <Text style={styles.dailyGoal}>
              <MaterialCommunityIcons name="target" size={14} color="#666" />{" "}
              {habit.dailyGoal}x daily goal
            </Text>
          </View>
        </View>

        {/* Right Side - Completion Status and Today Label */}
        <View style={styles.rightSection}>
          <View
            style={[
              styles.completionCircle,
              isCompleted && styles.completedCircle,
            ]}
          >
            {isCompleted && (
              <MaterialCommunityIcons name="check" size={16} color="white" />
            )}
          </View>
          <Text style={styles.todayLabel}>Today</Text>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Today&apos;s Repetitions</Text>
          <Text style={styles.progressText}>
            {habit.currentProgress}/{habit.totalProgress} times
          </Text>
        </View>

        {/* Progress Bar */}
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

      {/* Bottom Section - Streak and Today */}
      <View style={styles.bottomSection}>
        <View style={styles.streakContainer}>
          <MaterialCommunityIcons name="fire" size={16} color="#ea580c" />
          <Text style={styles.streakText}>{habit.streak} day streak</Text>
        </View>
        <Text style={styles.todayText}>Today</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.08, // iOS shadow
    shadowRadius: 8, // iOS shadow
    marginVertical: 8,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  leftSection: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  contentSection: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  dailyGoal: {
    fontSize: 13,
    color: "#666",
    flexDirection: "row",
    alignItems: "center",
  },
  rightSection: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  completionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  completedCircle: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  todayLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  progressText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fed7aa",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  streakText: {
    fontSize: 12,
    color: "#ea580c",
    marginLeft: 4,
    fontWeight: "500",
  },
  todayText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
});
