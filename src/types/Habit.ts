import { Ionicons } from "@expo/vector-icons";

export default interface Habit {
  id: string;
  title: string;
  category: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  currentProgress: number;
  totalProgress: number;
  createdAt: Date;
}
