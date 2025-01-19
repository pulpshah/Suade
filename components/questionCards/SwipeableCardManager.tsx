import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { PanGestureHandler, State, GestureHandlerRootView } from "react-native-gesture-handler";
import SwipeableQuestionCard from "./SwipeableQuestionCard";
import SwipedLeftInvalidCard from "./SwipedLeftInvalidCard";
import SwipedRightValidCard from "./SwipedRightValidCard";

export default function SwipeableCardManager() {
    const [cardState, setCardState] = useState("default");

    const handleSwipe = (event: { nativeEvent: { translationX: number; state: number } }) => {
        const { translationX, state } = event.nativeEvent;

        // Only allow swipe if the cardState is still "default"
        if (cardState !== "default") {
            return;
        }

        if (state === State.END) {
            if (translationX > 50) {
                setCardState("valid");
            } else if (translationX < -50) {
                setCardState("invalid");
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
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
});
