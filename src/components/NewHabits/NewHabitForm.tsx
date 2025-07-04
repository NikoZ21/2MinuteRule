import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { AVAILABLE_ICONS } from "../../constants/Icons";
import { styles } from "./NewHabitForm.styles";

const AVAILABLE_COLORS = [
  Colors.primary,
  Colors.task2,
  Colors.task3,
  Colors.task4,
  Colors.task5,
  Colors.accent,
] as const;

type ColorType = (typeof AVAILABLE_COLORS)[number];

interface NewHabitFormProps {
  onSave?: (habit: {
    title: string;
    category: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    iconColor: string;
    totalProgress: number;
  }) => void;
  onCancel?: () => void;
}

export default function NewHabitForm({ onSave, onCancel }: NewHabitFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState<ColorType>(Colors.primary);
  const [selectedIcon, setSelectedIcon] =
    useState<keyof typeof MaterialCommunityIcons.glyphMap>("star");
  const [totalProgress, setTotalProgress] = useState("1");
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [iconModalVisible, setIconModalVisible] = useState(false);

  const handleSave = () => {
    if (title.trim() && category.trim()) {
      onSave?.({
        title: title.trim(),
        category: category.trim(),
        icon: selectedIcon,
        iconColor: selectedColor,
        totalProgress: parseInt(totalProgress) || 1,
      });
      // Reset form
      setTitle("");
      setCategory("");
      setSelectedColor(Colors.primary);
      setSelectedIcon("star");
      setTotalProgress("1");
    }
  };

  const ColorSelector = () => (
    <Modal
      visible={colorModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setColorModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose Color</Text>
          <FlatList
            data={AVAILABLE_COLORS}
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.colorGrid}
            renderItem={({ item: color }) => (
              <TouchableOpacity
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColorOption,
                ]}
                onPress={() => {
                  setSelectedColor(color);
                  setColorModalVisible(false);
                }}
              >
                {selectedColor === color && (
                  <MaterialCommunityIcons
                    name="check"
                    size={20}
                    color="white"
                  />
                )}
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.modalCancelButton}
            onPress={() => setColorModalVisible(false)}
          >
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const IconSelector = () => (
    <Modal
      visible={iconModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setIconModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose Icon</Text>
          <FlatList
            data={AVAILABLE_ICONS}
            numColumns={4}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.iconGrid}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.iconOption,
                  selectedIcon === item && {
                    backgroundColor: selectedColor,
                    opacity: 1,
                  },
                ]}
                onPress={() => {
                  setSelectedIcon(item);
                  setIconModalVisible(false);
                }}
              >
                <MaterialCommunityIcons
                  name={item}
                  size={28}
                  color={selectedIcon === item ? "white" : "#666"}
                />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.modalCancelButton}
            onPress={() => setIconModalVisible(false)}
          >
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Create New Habit</Text>

      {/* Habit Title */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Habit Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter habit title"
          placeholderTextColor="#999"
        />
      </View>

      {/* Category */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.textInput}
          value={category}
          onChangeText={setCategory}
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
              style={[styles.colorPreview, { backgroundColor: selectedColor }]}
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
              style={[styles.iconPreview, { backgroundColor: selectedColor }]}
            >
              <MaterialCommunityIcons
                name={selectedIcon}
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
          value={totalProgress}
          onChangeText={setTotalProgress}
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
            { backgroundColor: selectedColor },
            (!title.trim() || !category.trim()) && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={!title.trim() || !category.trim()}
        >
          <Text style={styles.saveButtonText}>Save Habit</Text>
        </TouchableOpacity>
      </View>

      <ColorSelector />
      <IconSelector />
    </View>
  );
}
