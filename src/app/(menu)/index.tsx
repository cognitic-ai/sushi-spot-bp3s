import {
  systemGroupedBackground,
  secondaryLabel,
} from "@bacons/apple-colors";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import CategoryFilter from "@/components/category-filter";
import SushiCard from "@/components/sushi-card";
import { useCart } from "@/context/cart-context";
import { sushiMenu, SushiItem } from "@/data/sushi";

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addItem, totalItems } = useCart();

  const filteredMenu =
    selectedCategory === "all"
      ? sushiMenu
      : sushiMenu.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (item: SushiItem) => {
    addItem(item);
    if (process.env.EXPO_OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: systemGroupedBackground }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={{ paddingTop: 12, gap: 16 }}>
          <View style={{ paddingHorizontal: 16 }}>
            <Text style={{ fontSize: 15, color: secondaryLabel }}>
              Fresh sushi made with love
            </Text>
          </View>

          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <View style={{ paddingHorizontal: 16, gap: 12 }}>
            {filteredMenu.map((item) => (
              <SushiCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </View>

          {filteredMenu.length === 0 && (
            <View style={{ padding: 40, alignItems: "center" }}>
              <Text style={{ fontSize: 48, marginBottom: 16 }}>🍣</Text>
              <Text
                style={{
                  fontSize: 17,
                  color: secondaryLabel,
                  textAlign: "center",
                }}
              >
                No items in this category
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Stack.Screen.Title large>Sushi Menu</Stack.Screen.Title>

      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Menu icon="line.3.horizontal.decrease">
          <Stack.Toolbar.Menu inline title="Sort By">
            <Stack.Toolbar.MenuAction isOn>Price: Low to High</Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction>Price: High to Low</Stack.Toolbar.MenuAction>
            <Stack.Toolbar.MenuAction>Name</Stack.Toolbar.MenuAction>
          </Stack.Toolbar.Menu>
          <Stack.Toolbar.Menu title="Filter">
            <Stack.Toolbar.MenuAction
              icon="star.fill"
              isOn={selectedCategory === "special"}
              onPress={() => setSelectedCategory(selectedCategory === "special" ? "all" : "special")}
            >
              Specials Only
            </Stack.Toolbar.MenuAction>
          </Stack.Toolbar.Menu>
        </Stack.Toolbar.Menu>
      </Stack.Toolbar>

      <Stack.Toolbar placement="bottom">
        <Stack.Toolbar.View>
          <View style={{ width: 120, height: 32, justifyContent: "center" }}>
            <Text style={{ fontSize: 13, fontWeight: "600", color: secondaryLabel }}>
              {filteredMenu.length} items
            </Text>
          </View>
        </Stack.Toolbar.View>
        <Stack.Toolbar.Spacer />
        <Stack.Toolbar.Button
          icon="cart.badge.plus"
          disabled={totalItems === 0}
          onPress={() => {
            if (process.env.EXPO_OS !== "web") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }
          }}
        />
      </Stack.Toolbar>
    </>
  );
}
