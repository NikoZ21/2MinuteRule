import { View } from "react-native";
import NewHabitCard from "./NewHabitCard";

export default function NewHabitsList() {
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
      }}
    >
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
    </View>
  );
}
