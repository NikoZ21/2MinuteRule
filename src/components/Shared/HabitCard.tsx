import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import type Habit from "../../types/Habit";
import { styles } from "./HabitCard.style";

/**
 * Props interface for the NewHabitCard component
 *
 * @public
 */
interface HabitCardProps {
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
 * <HabitCard habit={habit} />
 * ```
 *
 * @public
 */
export default function HabitCard({ habit }: HabitCardProps) {
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
