import { ThemeProvider } from "@/components/theme-provider";
import { useCart } from "@/context/cart-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs as WebTabs } from "expo-router/tabs";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, Text, useWindowDimensions, View } from "react-native";

export default function Layout() {
  return (
    <ThemeProvider>
      <TabsLayout />
    </ThemeProvider>
  );
}

function TabsLayout() {
  if (process.env.EXPO_OS === "web") {
    return <WebTabsLayout />;
  } else {
    return <NativeTabsLayout />;
  }
}

function CartBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <View
      style={{
        position: "absolute",
        top: -4,
        right: -8,
        backgroundColor: "#FF3B30",
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 4,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 11,
          fontWeight: "700",
          fontVariant: ["tabular-nums"],
        }}
      >
        {count > 99 ? "99+" : count}
      </Text>
    </View>
  );
}

function WebTabsLayout() {
  const { width } = useWindowDimensions();
  const isMd = width >= 768;
  const isLg = width >= 1024;
  const { totalItems } = useCart();

  return (
    <WebTabs
      screenOptions={{
        headerShown: false,
        ...(isMd
          ? {
              tabBarPosition: "left",
              tabBarVariant: "material",
              tabBarLabelPosition: isLg ? undefined : "below-icon",
            }
          : {
              tabBarPosition: "bottom",
            }),
      }}
    >
      <WebTabs.Screen
        name="(menu)"
        options={{
          title: "Menu",
          tabBarIcon: (props) => <MaterialIcons {...props} name="restaurant-menu" />,
        }}
      />
      <WebTabs.Screen
        name="(cart)"
        options={{
          title: "Cart",
          tabBarIcon: (props) => (
            <View>
              <MaterialIcons {...props} name="shopping-cart" />
              <CartBadge count={totalItems} />
            </View>
          ),
        }}
      />
    </WebTabs>
  );
}

function NativeTabsLayout() {
  const { totalItems } = useCart();

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(menu)">
        <NativeTabs.Trigger.Label>Menu</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "menucard", selected: "menucard.fill" } },
            default: {
              src: (
                <NativeTabs.Trigger.VectorIcon
                  family={MaterialIcons}
                  name="restaurant-menu"
                />
              ),
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(cart)" badge={totalItems > 0 ? String(totalItems) : undefined}>
        <NativeTabs.Trigger.Label>Cart</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "cart", selected: "cart.fill" } },
            default: {
              src: (
                <NativeTabs.Trigger.VectorIcon
                  family={MaterialIcons}
                  name="shopping-cart"
                />
              ),
            },
          })}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
