import { MaterialCommunityIcons } from "@expo/vector-icons";

export default interface Habit {
  id: string;
  title: string;
  category: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  currentProgress: number;
  totalProgress: number;
  dailyGoal: number;
  streak: number;
  createdAt: Date;
}
