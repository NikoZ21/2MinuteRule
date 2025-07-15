import React, { useState, useEffect, useRef } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type Habit from "../../types/Habit";

interface HabitTimerModalProps {
  visible: boolean;
  onClose: () => void;
  habit: Habit;
  timerDuration?: number; // Duration in seconds, default 120 (2 minutes)
  onTimerComplete?: () => void;
}

export default function HabitTimerModal({
  visible,
  onClose,
  habit,
  timerDuration = 120, // 2 minutes default
  onTimerComplete,
}: HabitTimerModalProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timerDuration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset timer when modal opens or habit changes
  useEffect(() => {
    if (visible) {
      setRemainingTime(timerDuration);
      setIsRunning(false);
    }
  }, [visible, habit.id, timerDuration]);

  // Timer logic
  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          const newTime = prev - 1;

          if (newTime <= 0) {
            setIsRunning(false);
            onTimerComplete?.();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, remainingTime, timerDuration, onTimerComplete]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleClose = () => {
    setIsRunning(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.habitInfo}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: habit.iconColor },
                ]}
              >
                <MaterialCommunityIcons
                  name={
                    habit.icon as keyof typeof MaterialCommunityIcons.glyphMap
                  }
                  size={24}
                  color="white"
                />
              </View>
              <View style={styles.habitDetails}>
                <Text style={styles.habitTitle}>{habit.title}</Text>
                <Text style={styles.habitCategory}>
                  {habit.category} • 🔥 {habit.streak}-Day Streak
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <MaterialCommunityIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Large Timer Display */}
          <View style={styles.timerSection}>
            <Text style={styles.largeTimerText}>
              {formatTime(remainingTime)}
            </Text>
          </View>

          {/* Start Button */}
          <TouchableOpacity
            style={[
              styles.startButton,
              { backgroundColor: habit.iconColor },
              remainingTime === 0 && styles.disabledButton,
            ]}
            onPress={toggleTimer}
            disabled={remainingTime === 0}
          >
            <MaterialCommunityIcons
              name={isRunning ? "pause" : "dumbbell"}
              size={24}
              color="white"
            />
            <Text style={styles.startButtonText}>
              {remainingTime === 0
                ? "Completed"
                : isRunning
                ? "Pause"
                : "Start Workout"}
            </Text>
          </TouchableOpacity>

          {/* Goal Info */}
          <View style={styles.goalSection}>
            <MaterialCommunityIcons name="chart-line" size={16} color="#666" />
            <Text style={styles.goalText}>
              Goal: {habit.dailyGoal} sets/day
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  habitInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  habitDetails: {
    flex: 1,
  },
  habitTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  habitCategory: {
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    padding: 4,
  },
  timerSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  largeTimerText: {
    fontSize: 56,
    fontWeight: "300",
    color: "#1a1a1a",
    fontFamily: "monospace",
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 50,
    marginBottom: 32,
    width: "100%",
  },
  startButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  goalSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  goalText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 6,
  },
});
