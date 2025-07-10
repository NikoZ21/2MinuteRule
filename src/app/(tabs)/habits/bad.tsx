import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

export default function BadHabits() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bad Habits</Text>
      <Ionicons name="trash" size={24} color="red" />
      {/* Add your bad habits content here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
