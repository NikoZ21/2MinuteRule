import { Link, router } from "expo-router";
import { View, Text, Pressable } from "react-native";

import NewHabitCard from "../../components/NewHabits/NewHabitCard";
import { Colors as AppColors } from "../../Constants/Colors";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: AppColors.primary, // Your #4CAF50 color
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        2 Minute Rule App
      </Text>
      <NewHabitCard
        color={AppColors.primary}
        title="Read Book"
        category="Skill"
      />
      <NewHabitCard
        color={AppColors.task2}
        title="Workout"
        icon="dumbbell"
        category="Skill"
      />
      <NewHabitCard
        color={AppColors.task3}
        title="Yoga"
        icon="yoga"
        category="Skill"
      />
      <NewHabitCard
        color={AppColors.task4}
        title="Learn french"
        icon="android-messages"
        category="Skill"
      />
      <NewHabitCard
        color={AppColors.task5}
        title="Playing piano"
        icon="piano"
        category="Skill"
      />

      {/* Example button using global colors */}
      <Pressable
        style={{
          backgroundColor: AppColors.primary,
          padding: 15,
          borderRadius: 8,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>new habit</Text>
      </Pressable>
    </View>
  );
}
