import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import SelectionModal from "./BaseSelector";
import { AVAILABLE_ICONS } from "../../constants/Icons";

interface IconSelectorProps {
  selectedColor: string;
  selectedIcon: string;
  iconModalVisible: boolean;
  setIconModalVisible: (visible: boolean) => void;
  setSelectedIcon: (icon: keyof typeof MaterialCommunityIcons.glyphMap) => void;
}

export default function IconSelector({
  selectedColor,
  selectedIcon,
  iconModalVisible,
  setIconModalVisible,
  setSelectedIcon,
}: IconSelectorProps) {
  return (
    <SelectionModal
      visible={iconModalVisible}
      title="Choose Icon"
      onClose={() => setIconModalVisible(false)}
    >
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
    </SelectionModal>
  );
}

const styles = StyleSheet.create({
  iconGrid: {
    padding: 8,
  },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: 8,
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
});
