import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { nanoid } from "nanoid";

import { styles } from "./NewHabitForm.styles";

import ColorSelector from "../Shared/ColorSelector";
import IconSelector from "../Shared/IconSelector";

import type Habit from "../../types/Habit";

interface NewHabitFormProps {
  onSave?: (habit: Habit) => void;
  onCancel?: () => void;
}

export default function NewHabitForm({ onSave, onCancel }: NewHabitFormProps) {
  const [formState, setFormState] = useState<Habit>({
    id: "",
    currentProgress: 0,
    dailyGoal: 1,
    streak: 0,
    createdAt: new Date(),
    title: "",
    category: "",
    iconColor: AppColors.primary,
    icon: "star",
    totalProgress: 1,
  });
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [iconModalVisible, setIconModalVisible] = useState(false);

  const handleSave = () => {
    if (formState.title.trim() && formState.category.trim()) {
      _storeDataLocal("habits", formState);
      const x = _retrieveDataLocal("habits");
      console.log(x);
      onSave?.({
        id: nanoid(),
        title: formState.title.trim(),
        category: formState.category.trim(),
        icon: formState.icon,
        iconColor: formState.iconColor,
        currentProgress: 0,
        totalProgress: formState.dailyGoal,
        dailyGoal: formState.dailyGoal,
        streak: 0,
        createdAt: new Date(),
      });
      // Reset form
      setFormState({
        id: "",
        currentProgress: 0,
        dailyGoal: 1,
        streak: 0,
        createdAt: new Date(),
        title: "",
        category: "",
        iconColor: AppColors.primary,
        icon: "star",
        totalProgress: 1,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Create New Habit</Text>

      {/* Habit Title */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Habit Title</Text>
        <TextInput
          style={styles.textInput}
          value={formState.title}
          onChangeText={(title) => setFormState((prev) => ({ ...prev, title }))}
          placeholder="Enter habit title"
          placeholderTextColor="#999"
        />
      </View>

      {/* Category */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.textInput}
          value={formState.category}
          onChangeText={(category) =>
            setFormState((prev) => ({ ...prev, category }))
          }
          placeholder="Enter category"
          placeholderTextColor="#999"
        />
      </View>

      {/* Color and Icon Selection Row */}
      <View style={styles.selectionRow}>
        {/* Color Selection */}
        <View style={styles.selectionGroup}>
          <Text style={styles.label}>Color</Text>
          <TouchableOpacity
            style={styles.selectionButton}
            onPress={() => setColorModalVisible(true)}
          >
            <View
              style={[
                styles.colorPreview,
                { backgroundColor: formState.iconColor },
              ]}
            />
            <Text style={styles.selectionText}>Choose Color</Text>
          </TouchableOpacity>
        </View>

        {/* Icon Selection */}
        <View style={styles.selectionGroup}>
          <Text style={styles.label}>Icon</Text>
          <TouchableOpacity
            style={styles.selectionButton}
            onPress={() => setIconModalVisible(true)}
          >
            <View
              style={[
                styles.iconPreview,
                { backgroundColor: formState.iconColor },
              ]}
            >
              <MaterialCommunityIcons
                name={formState.icon}
                size={16}
                color="white"
              />
            </View>
            <Text style={styles.selectionText}>Choose Icon</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Daily Goal */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Daily Goal</Text>
        <TextInput
          style={styles.textInput}
          value={formState.dailyGoal.toString()}
          onChangeText={(dailyGoal) =>
            setFormState((prev) => ({
              ...prev,
              dailyGoal: parseInt(dailyGoal) || 1,
            }))
          }
          placeholder="1"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: formState.iconColor },
            (!formState.title.trim() || !formState.category.trim()) &&
              styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={!formState.title.trim() || !formState.category.trim()}
        >
          <Text style={styles.saveButtonText}>Save Habit</Text>
        </TouchableOpacity>
      </View>

      <ColorSelector
        colorModalVisible={colorModalVisible}
        setColorModalVisible={setColorModalVisible}
        selectedColor={formState.iconColor}
        setSelectedColor={(iconColor) =>
          setFormState((prev) => ({ ...prev, iconColor }))
        }
      />
      <IconSelector
        iconModalVisible={iconModalVisible}
        setIconModalVisible={setIconModalVisible}
        selectedIcon={formState.icon}
        setSelectedIcon={(icon) => setFormState((prev) => ({ ...prev, icon }))}
        selectedColor={formState.iconColor}
      />
    </View>
  );
}
