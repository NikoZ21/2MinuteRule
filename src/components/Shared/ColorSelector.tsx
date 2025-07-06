import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import SelectionModal from "./BaseSelector";

const AVAILABLE_COLORS = [
  AppColors.primary,
  AppColors.task2,
  AppColors.task3,
  AppColors.task4,
  AppColors.task5,
  AppColors.accent,
] as const;

interface ColorSelectorProps {
  colorModalVisible: boolean;
  setColorModalVisible: (visible: boolean) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

export default function ColorSelector({
  colorModalVisible,
  setColorModalVisible,
  selectedColor,
  setSelectedColor,
}: ColorSelectorProps) {
  return (
    <SelectionModal
      visible={colorModalVisible}
      title="Choose Color"
      onClose={() => setColorModalVisible(false)}
    >
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
              <MaterialCommunityIcons name="check" size={20} color="white" />
            )}
          </TouchableOpacity>
        )}
      />
    </SelectionModal>
  );
}

const styles = StyleSheet.create({
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 8,
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  colorGrid: {
    padding: 8,
  },
  selectedColorOption: {
    borderWidth: 3,
    borderColor: "white",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
