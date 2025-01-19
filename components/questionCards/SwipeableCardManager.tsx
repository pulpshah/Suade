import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import SwipeableQuestionCard from "./SwipeableQuestionCard";
import SwipedLeftInvalidCard from "./SwipedLeftInvalidCard";
import SwipedRightValidCard from "./SwipedRightValidCard";

// 1) TYPE FOR onSwipe PROP
type SwipeableCardManagerProps = {
  onSwipe?: (direction: "valid" | "invalid") => void;
};

export default function SwipeableCardManager({ onSwipe }: SwipeableCardManagerProps) {
  const [cardState, setCardState] = useState<"default" | "valid" | "invalid">("default");

  const handleSwipe = (event: { nativeEvent: { translationX: number; state: number } }) => {
    const { translationX, state } = event.nativeEvent;

    if (cardState !== "default") return;

    if (state === State.END) {
      if (translationX > 50) {
        setCardState("valid");
        // 2) FIRE THE CALLBACK
        onSwipe && onSwipe("valid");
      } else if (translationX < -50) {
        setCardState("invalid");
        // 3) FIRE THE CALLBACK
        onSwipe && onSwipe("invalid");
      }
    }
  };

  const renderCard = () => {
    switch (cardState) {
      case "valid":
        return <SwipedRightValidCard />;
      case "invalid":
        return <SwipedLeftInvalidCard />;
      default:
        return <SwipeableQuestionCard />;
    }
  };

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <PanGestureHandler onGestureEvent={handleSwipe} onHandlerStateChange={handleSwipe}>
        <View style={styles.container}>{renderCard()}</View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
