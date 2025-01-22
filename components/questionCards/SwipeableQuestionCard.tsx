import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { TEXT_STYLES, COLORS } from "@/app/styles";
import InvalidGrayIcon from "@/assets/icons/invalid-gray-icon.svg";
import ValidGrayIcon from "@/assets/icons/valid-gray-icon.svg";

export default function SwipeableQuestionCard() {
    return (
        <View style={styles.outerContainer}>
            {/* Blurred Glow Background */}
            <BlurView intensity={50} style={styles.blurContainer}>
                <LinearGradient
                    colors={[
                        "rgba(234, 242, 239, 0.2)", // Light teal
                        "rgba(130, 177, 254, 0.3)", // Light blue
                        "#4F74FF",                   // Blue
                        "#FF759A",                   // Light pink
                        "#FF4690",                   // Bright pink
                        "#FFD6A3",                   // Light yellow
                        "#FFCC75",                   // Golden yellow
                    ]}
                    locations={[0, 0.2, 0.4, 0.5, 0.6, 0.8, 1]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradientBackground}
                />
            </BlurView>

            {/* Card Component */}
            <View style={styles.swipableCardContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.grayIconContainer}>
                        <InvalidGrayIcon width={23.78} height={23.78} style={styles.grayIcon} />
                    </View>
                    <Text style={styles.headerText}>Question</Text>
                    <View style={styles.grayIconContainer}>
                        <ValidGrayIcon width={23.78} height={23.78} />
                    </View>
                </View>
                <View style={styles.questionTextContainer}>
                    <Text style={styles.questionText}>
                        Do you check your phone first thing in the morning?
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
        overflow: "hidden", // Prevent blur from spilling outside
    },
    blurContainer: {
        position: "absolute",
        top: -40, // Expand beyond the card
        left: -40,
        right: -40,
        bottom: -40,
        zIndex: -1,
        borderRadius: 60, // Large radius for smooth edges
    },
    gradientBackground: {
        flex: 1,
        opacity: 0.9, // Subtle intensity for the gradient
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
        shadowColor: "#4F74FF", // One of the gradient colors for shadow
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12, // Blur effect for the shadow
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
    grayIconContainer: {
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.6,
        shadowColor: "#282828",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
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
