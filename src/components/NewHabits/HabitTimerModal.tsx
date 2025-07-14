import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
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
  const progressAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset timer when modal opens or habit changes
  useEffect(() => {
    if (visible) {
      setRemainingTime(timerDuration);
      setIsRunning(false);
      progressAnim.setValue(1);
    }
  }, [visible, habit.id, timerDuration]);

  // Timer logic
  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          const newTime = prev - 1;
          const progress = newTime / timerDuration;

          // Animate progress bar
          Animated.timing(progressAnim, {
            toValue: progress,
            duration: 1000,
            useNativeDriver: false,
          }).start();

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

  const resetTimer = () => {
    setIsRunning(false);
    setRemainingTime(timerDuration);
    progressAnim.setValue(1);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
                <Text style={styles.habitCategory}>{habit.category}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <MaterialCommunityIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Timer Display */}
          <View style={styles.timerSection}>
            <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
            <Text style={styles.timerLabel}>
              {remainingTime === 0 ? "Complete!" : "Time Remaining"}
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    backgroundColor: habit.iconColor,
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
          </View>

          {/* Control Buttons */}
          <View style={styles.controlsSection}>
            <TouchableOpacity
              style={[
                styles.primaryButton,
                { backgroundColor: habit.iconColor },
                remainingTime === 0 && styles.disabledButton,
              ]}
              onPress={toggleTimer}
              disabled={remainingTime === 0}
            >
              <MaterialCommunityIcons
                name={isRunning ? "pause" : "play"}
                size={24}
                color="white"
              />
              <Text style={styles.primaryButtonText}>
                {remainingTime === 0
                  ? "Completed"
                  : isRunning
                  ? "Pause"
                  : "Start"}
              </Text>
            </TouchableOpacity>

            {remainingTime !== timerDuration && (
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={resetTimer}
              >
                <MaterialCommunityIcons name="refresh" size={20} color="#666" />
                <Text style={styles.secondaryButtonText}>Reset</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Progress Info */}
          <View style={styles.progressInfo}>
            <View style={styles.progressItem}>
              <MaterialCommunityIcons name="target" size={16} color="#666" />
              <Text style={styles.progressItemText}>
                Goal: {habit.dailyGoal}x daily
              </Text>
            </View>
            <View style={styles.progressItem}>
              <MaterialCommunityIcons name="fire" size={16} color="#ea580c" />
              <Text style={styles.progressItemText}>
                {habit.streak} day streak
              </Text>
            </View>
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
    width: "100%",
    maxWidth: 400,
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
    marginBottom: 24,
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
    marginBottom: 32,
  },
  timerText: {
    fontSize: 48,
    fontWeight: "300",
    color: "#1a1a1a",
    marginBottom: 8,
    fontFamily: "monospace",
  },
  timerLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  controlsSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 12,
    minWidth: 140,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  secondaryButtonText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  progressItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressItemText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 6,
  },
});
