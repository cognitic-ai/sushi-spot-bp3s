import {
  systemRed,
  tertiarySystemFill,
  label,
} from "@bacons/apple-colors";
import * as Haptics from "expo-haptics";
import { Pressable, ScrollView, Text } from "react-native";

import { categories } from "@/data/sushi";

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  selected,
  onSelect,
}: CategoryFilterProps) {
  const handleSelect = (category: string) => {
    if (process.env.EXPO_OS !== "web") {
      Haptics.selectionAsync();
    }
    onSelect(category);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
      style={{ flexGrow: 0 }}
    >
      {categories.map((cat) => {
        const isSelected = selected === cat.key;
        return (
          <Pressable
            key={cat.key}
            onPress={() => handleSelect(cat.key)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              borderCurve: "continuous",
              backgroundColor: isSelected ? systemRed : tertiarySystemFill,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: isSelected ? "white" : label,
              }}
            >
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
