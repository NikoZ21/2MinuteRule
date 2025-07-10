import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GoodHabits from "./good";
import BadHabits from "./bad";

const TopTab = createMaterialTopTabNavigator();

export default function HabitsLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Custom header space */}
      <View style={{ height: 60 }} />

      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#666",
          tabBarIndicatorStyle: {
            backgroundColor: AppColors.accent,
            height: "80%",
            borderRadius: 16,
            marginBottom: 4,
          },
          tabBarStyle: {
            elevation: 2,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            borderBottomWidth: 0,
            marginHorizontal: 60,
            marginTop: 30,
            borderRadius: 20,
            backgroundColor: "#f5f5f5",
            paddingVertical: 4,
            paddingHorizontal: 8,
            height: 50,
          },
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "600",
            textTransform: "none",
            marginTop: 0,
            zIndex: 1,
          },
          tabBarItemStyle: {
            borderRadius: 16,
            marginHorizontal: 2,
            paddingVertical: 2,
            minHeight: 35,
            zIndex: 1,
          },
          tabBarPressColor: "transparent",
        }}
      >
        <TopTab.Screen
          name="good"
          component={GoodHabits}
          options={{
            title: "Good Habits",
            tabBarIcon: ({ color }) => (
              <Ionicons name="add-circle" color={color} size={16} />
            ),
          }}
        />
        <TopTab.Screen
          name="bad"
          component={BadHabits}
          options={{
            title: "Bad Habits",
            tabBarIcon: ({ color }) => (
              <Ionicons name="ban" color={color} size={16} />
            ),
          }}
        />
      </TopTab.Navigator>
    </View>
  );
}
