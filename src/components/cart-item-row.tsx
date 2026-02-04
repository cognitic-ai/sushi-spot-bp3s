import * as Haptics from "expo-haptics";
import { SymbolView } from "expo-symbols";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

import { CartItem } from "@/context/cart-context";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  const handleQuantityChange = (delta: number) => {
    if (process.env.EXPO_OS !== "web") {
      Haptics.selectionAsync();
    }
    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      onRemove(item.id);
    } else {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={Layout.springify()}
      style={{
        backgroundColor: "secondarySystemGroupedBackground",
        borderRadius: 12,
        borderCurve: "continuous",
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 32 }}>{item.emoji}</Text>

      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "label",
          }}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text style={{ fontSize: 13, color: "secondaryLabel" }}>
          ${item.price.toFixed(2)} each
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Pressable
          onPress={() => handleQuantityChange(-1)}
          hitSlop={8}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "tertiarySystemFill",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {process.env.EXPO_OS === "ios" ? (
            <SymbolView name="minus" size={14} tintColor="label" />
          ) : (
            <Text style={{ fontSize: 18, color: "label", fontWeight: "600" }}>
              -
            </Text>
          )}
        </Pressable>

        <Text
          style={{
            fontSize: 17,
            fontWeight: "600",
            color: "label",
            minWidth: 24,
            textAlign: "center",
            fontVariant: ["tabular-nums"],
          }}
        >
          {item.quantity}
        </Text>

        <Pressable
          onPress={() => handleQuantityChange(1)}
          hitSlop={8}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "systemRed",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {process.env.EXPO_OS === "ios" ? (
            <SymbolView name="plus" size={14} tintColor="white" />
          ) : (
            <Text style={{ fontSize: 18, color: "white", fontWeight: "600" }}>
              +
            </Text>
          )}
        </Pressable>
      </View>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: "label",
          minWidth: 60,
          textAlign: "right",
          fontVariant: ["tabular-nums"],
        }}
      >
        ${(item.price * item.quantity).toFixed(2)}
      </Text>
    </Animated.View>
  );
}
