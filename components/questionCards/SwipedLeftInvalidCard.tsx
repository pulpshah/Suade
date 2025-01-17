import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { TEXT_STYLES, COLORS, GRADIENTS } from "@/app/styles";
import InvalidColoredIcon from "@/assets/icons/invalid-colored-icon.svg";

export default function SwipedLeftInvalidCard() {
    return (
        <View style={styles.outerContainer}>
            {/* Blurred Glow Background */}
            <BlurView intensity={50} style={styles.blurContainer}>
                {/* First Gradient */}
                <LinearGradient
                    colors={[
                        "rgba(255, 221, 221, 0.32)",
                        "rgba(255, 221, 221, 0.32)",
                    ]}
                    start={{ x: 0, y: 0 }} // Top
                    end={{ x: 0, y: 1 }}   // Bottom
                    style={styles.firstGradient}
                />
                {/* Second Gradient */}
                <LinearGradient
                    colors={GRADIENTS.invalidPink.colors}
                    start={GRADIENTS.invalidPink.start}
                    end={GRADIENTS.invalidPink.end}
                    style={styles.secondGradient}
                />
            </BlurView>

            {/* Card Component */}
            <View style={styles.swipableCardContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Question</Text>
                    <View style={styles.coloredIconAndTextContainer}>
                        <Text style={styles.invalidText}>Invalid</Text>
                        <InvalidColoredIcon width={23.78} height={23.78} />
                    </View>
                </View>
                <View style={styles.questionTextContainer}>
                    <Text style={styles.questionText}>
                        Adults who enjoy sour candy aren’t very mature.
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 2,
        flexDirection: "column",
        alignSelf: "stretch",
        borderRadius: 14,
        borderWidth: 0.5,
        borderColor: COLORS.suadeShadesCardOutline,
        overflow: "hidden",
    },
    blurContainer: {
        position: "absolute",
        top: -40,
        left: -40,
        right: -40,
        bottom: -40,
        zIndex: -1,
        borderRadius: 60,
    },
    firstGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    secondGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    swipableCardContainer: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 12,
        flexDirection: "column",
        alignItems: "flex-end",
        alignSelf: "stretch",
        borderRadius: 14,
        backgroundColor: COLORS.suadeShadesBlack,
        shadowColor: "#4F74FF", 
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        paddingBottom: 16,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 0,
        alignSelf: "stretch",
    },
    coloredIconAndTextContainer: {
        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    invalidText: {
        ...TEXT_STYLES.inputText,
        color: "#FFF",
        textShadowColor: "rgba(31, 31, 31, 0.20)",
        textShadowOffset: { width: 0, height: 1.5 },
        textShadowRadius: 4,
        opacity: 0.6,
    },
    grayIcon: {
        flexShrink: 0,
    },
    headerText: {
        ...TEXT_STYLES.commentUsernameTextMedium,
        color: "white",
    },
    questionTextContainer: {
        width: "100%",
    },
    questionText: {
        ...TEXT_STYLES.medium,
        color: "white",
    },
});
