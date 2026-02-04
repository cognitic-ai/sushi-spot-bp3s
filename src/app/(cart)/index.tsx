import {
  systemGroupedBackground,
  secondarySystemGroupedBackground,
  label,
  secondaryLabel,
  separator,
  systemRed,
  systemOrange,
} from "@bacons/apple-colors";
import * as Haptics from "expo-haptics";
import { Link, Stack, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import CartItemRow from "@/components/cart-item-row";
import { useCart } from "@/context/cart-context";

export default function CartScreen() {
  const router = useRouter();
  const { items, totalPrice, totalItems, updateQuantity, removeItem, clearCart } =
    useCart();
  const [isOrdering, setIsOrdering] = useState(false);

  const handlePlaceOrder = () => {
    if (process.env.EXPO_OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setIsOrdering(true);

    setTimeout(() => {
      setIsOrdering(false);
      Alert.alert(
        "Order Placed!",
        `Your delicious sushi order of $${totalPrice.toFixed(2)} is being prepared.`,
        [{ text: "OK", onPress: clearCart }]
      );
    }, 1500);
  };

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            if (process.env.EXPO_OS !== "web") {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            }
            clearCart();
          }
        }
      ]
    );
  };

  if (items.length === 0) {
    return (
      <>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ flex: 1, backgroundColor: systemGroupedBackground }}
        >
          <Animated.View
            entering={FadeIn}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
              paddingTop: 80,
              gap: 16,
            }}
          >
            <Text style={{ fontSize: 80 }}>🍱</Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: label,
                textAlign: "center",
              }}
            >
              Your cart is empty
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: secondaryLabel,
                textAlign: "center",
                maxWidth: 280,
              }}
            >
              Browse our delicious menu and add some fresh sushi to your order
            </Text>
            <Link href="/(menu)" asChild>
              <Pressable
                style={{
                  marginTop: 16,
                  backgroundColor: systemRed,
                  paddingHorizontal: 24,
                  paddingVertical: 14,
                  borderRadius: 25,
                  borderCurve: "continuous",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Browse Menu
                </Text>
              </Pressable>
            </Link>
          </Animated.View>
        </ScrollView>

        <Stack.Screen.Title large>Your Order</Stack.Screen.Title>
      </>
    );
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: systemGroupedBackground }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 200 }}
        >
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </ScrollView>

        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: secondarySystemGroupedBackground,
            borderTopWidth: 0.5,
            borderTopColor: separator as string,
            padding: 16,
            paddingBottom: 34,
            gap: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: secondaryLabel }}>
              Subtotal
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: label,
                fontVariant: ["tabular-nums"],
              }}
            >
              ${totalPrice.toFixed(2)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: secondaryLabel }}>Tax</Text>
            <Text
              style={{
                fontSize: 16,
                color: label,
                fontVariant: ["tabular-nums"],
              }}
            >
              ${(totalPrice * 0.1).toFixed(2)}
            </Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: separator,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700", color: label }}>
              Total
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: label,
                fontVariant: ["tabular-nums"],
              }}
            >
              ${(totalPrice * 1.1).toFixed(2)}
            </Text>
          </View>

          <Pressable
            onPress={handlePlaceOrder}
            disabled={isOrdering}
            style={({ pressed }) => ({
              backgroundColor: pressed || isOrdering ? systemOrange : systemRed,
              paddingVertical: 16,
              borderRadius: 14,
              borderCurve: "continuous",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 8,
              opacity: isOrdering ? 0.8 : 1,
            })}
          >
            {process.env.EXPO_OS === "ios" && (
              <SymbolView
                name={isOrdering ? "hourglass" : "bag.fill"}
                size={20}
                tintColor="white"
              />
            )}
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              {isOrdering ? "Placing Order..." : "Place Order"}
            </Text>
          </Pressable>
        </View>
      </View>

      <Stack.Screen.Title large>Your Order</Stack.Screen.Title>

      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon="trash"
          onPress={handleClearCart}
        />
        <Stack.Toolbar.Menu icon="ellipsis">
          <Stack.Toolbar.MenuAction
            icon="arrow.counterclockwise"
            onPress={handleClearCart}
            destructive
          >
            Clear Cart
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction
            icon="square.and.arrow.up"
            onPress={() => {
              Alert.alert("Share", "Share your order with friends!");
            }}
          >
            Share Order
          </Stack.Toolbar.MenuAction>
        </Stack.Toolbar.Menu>
      </Stack.Toolbar>

      <Stack.Toolbar placement="bottom">
        <Stack.Toolbar.View>
          <View style={{ width: 100, height: 32, justifyContent: "center" }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: secondaryLabel }}>
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </Text>
          </View>
        </Stack.Toolbar.View>
        <Stack.Toolbar.Spacer />
        <Stack.Toolbar.Button
          icon="plus"
          onPress={() => router.push("/(menu)")}
        >
          Add More
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
    </>
  );
}
