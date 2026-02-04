import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

import { CartProvider } from "@/context/cart-context";
import { OnboardingProvider } from "@/context/onboarding-context";

export function ThemeProvider(props: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  return (
    <RNTheme value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <OnboardingProvider>
        <CartProvider>{props.children}</CartProvider>
      </OnboardingProvider>
    </RNTheme>
  );
}
