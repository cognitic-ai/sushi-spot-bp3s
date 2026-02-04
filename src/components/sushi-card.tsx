import {
  secondarySystemGroupedBackground,
  label,
  secondaryLabel,
  tertiaryLabel,
  systemRed,
  systemOrange,
} from "@bacons/apple-colors";
import * as Haptics from "expo-haptics";
import { SymbolView } from "expo-symbols";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { SushiItem } from "@/data/sushi";

interface SushiCardProps {
  item: SushiItem;
  onAddToCart: (item: SushiItem) => void;
}

export default function SushiCard({ item, onAddToCart }: SushiCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const handleAddToCart = () => {
    if (process.env.EXPO_OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onAddToCart(item);
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          backgroundColor: secondarySystemGroupedBackground,
          borderRadius: 16,
          borderCurve: "continuous",
          overflow: "hidden",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <View style={{ padding: 16, gap: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View style={{ flex: 1, gap: 4 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "600",
                      color: label,
                    }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: secondaryLabel,
                      marginTop: 2,
                    }}
                  >
                    {item.japaneseName}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: secondaryLabel,
                  marginTop: 4,
                }}
                numberOfLines={2}
              >
                {item.description}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ gap: 2 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: label,
                }}
              >
                ${item.price.toFixed(2)}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: tertiaryLabel,
                }}
              >
                {item.pieces} pieces
              </Text>
            </View>

            <Pressable
              onPress={handleAddToCart}
              style={({ pressed }) => ({
                backgroundColor: pressed ? systemOrange : systemRed,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 20,
                borderCurve: "continuous",
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              })}
            >
              {process.env.EXPO_OS === "ios" ? (
                <SymbolView name="plus" size={16} tintColor="white" />
              ) : (
                <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>+</Text>
              )}
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "600",
                }}
              >
                Add
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
