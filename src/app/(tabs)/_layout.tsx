import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "New Habits",
          headerStyle: {
            backgroundColor: AppColors.accent,
          },
          headerTintColor: "white",
          tabBarActiveTintColor: AppColors.task2,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="badHabits"
        options={{
          title: "Bad Habits",
          headerStyle: {
            backgroundColor: "red",
          },
          headerTintColor: "white",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ban" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
