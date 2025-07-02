import React from "react";
import { View, Text } from "react-native";

export default function NewHabitForm() {
  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <Text style={{ fontSize: 16, color: "white" }}>
        No habits added yet. Create your first habit to get started!
      </Text>
    </View>
  );
}
