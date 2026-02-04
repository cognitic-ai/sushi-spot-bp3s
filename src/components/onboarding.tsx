import {
  label,
  secondaryLabel,
  systemBackground,
  systemRed,
  tertiaryLabel,
} from "@bacons/apple-colors";
import * as Haptics from "expo-haptics";
import { useCallback, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  interpolate,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    emoji: "🍣",
    title: "Welcome to Sushi",
    subtitle: "Your gateway to authentic Japanese cuisine",
    description:
      "Discover our carefully curated selection of fresh sushi, handcrafted by expert chefs.",
  },
  {
    emoji: "📱",
    title: "Browse & Order",
    subtitle: "Simple and intuitive menu",
    description:
      "Explore our menu by category - from classic nigiri to creative specialty rolls. Add your favorites to cart with a single tap.",
  },
  {
    emoji: "🛒",
    title: "Easy Checkout",
    subtitle: "Your order, your way",
    description:
      "Review your selections, adjust quantities, and place your order in seconds. Fresh sushi awaits!",
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useSharedValue(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      scrollX.value = offsetX;
      const index = Math.round(offsetX / width);
      if (index !== currentIndex && index >= 0 && index < slides.length) {
        setCurrentIndex(index);
        Haptics.selectionAsync();
      }
    },
    [currentIndex, width]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onComplete();
    }
  }, [currentIndex, width, onComplete]);

  const handleSkip = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onComplete();
  }, [onComplete]);

  return (
    <View style={{ flex: 1, backgroundColor: systemBackground }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        {slides.map((slide, index) => (
          <View
            key={index}
            style={{
              width,
              flex: 1,
              paddingHorizontal: 32,
              paddingTop: insets.top + 80,
              alignItems: "center",
            }}
          >
            <Animated.View
              entering={FadeInDown.delay(100).springify()}
              style={{
                marginBottom: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 120,
                  textAlign: "center",
                }}
              >
                {slide.emoji}
              </Text>
            </Animated.View>

            <Animated.Text
              entering={FadeInUp.delay(200).springify()}
              selectable
              style={{
                fontSize: 32,
                fontWeight: "700",
                color: label,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              {slide.title}
            </Animated.Text>

            <Animated.Text
              entering={FadeInUp.delay(300).springify()}
              selectable
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: systemRed,
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              {slide.subtitle}
            </Animated.Text>

            <Animated.Text
              entering={FadeInUp.delay(400).springify()}
              selectable
              style={{
                fontSize: 16,
                color: secondaryLabel,
                textAlign: "center",
                lineHeight: 24,
                maxWidth: 320,
              }}
            >
              {slide.description}
            </Animated.Text>
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 32,
          paddingBottom: insets.bottom + 32,
        }}
      >
        {/* Page indicators */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          {slides.map((_, index) => (
            <PageDot key={index} index={index} scrollX={scrollX} width={width} />
          ))}
        </View>

        {/* Buttons */}
        <View style={{ gap: 12 }}>
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => ({
              backgroundColor: systemRed,
              paddingVertical: 16,
              borderRadius: 14,
              borderCurve: "continuous",
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <Text
              style={{
                color: "white",
                fontSize: 17,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {currentIndex === slides.length - 1 ? "Get Started" : "Continue"}
            </Text>
          </Pressable>

          {currentIndex < slides.length - 1 && (
            <Animated.View entering={FadeIn}>
              <Pressable
                onPress={handleSkip}
                style={({ pressed }) => ({
                  paddingVertical: 12,
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Text
                  style={{
                    color: tertiaryLabel,
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Skip
                </Text>
              </Pressable>
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
}

function PageDot({
  index,
  scrollX,
  width,
}: {
  index: number;
  scrollX: Animated.SharedValue<number>;
  width: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const dotWidth = interpolate(scrollX.value, inputRange, [8, 24, 8], "clamp");
    const opacity = interpolate(scrollX.value, inputRange, [0.3, 1, 0.3], "clamp");

    return {
      width: withSpring(dotWidth, { damping: 20, stiffness: 200 }),
      opacity: withSpring(opacity, { damping: 20, stiffness: 200 }),
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 8,
          borderRadius: 4,
          backgroundColor: systemRed,
        },
        animatedStyle,
      ]}
    />
  );
}
