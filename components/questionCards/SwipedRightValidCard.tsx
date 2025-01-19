import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { TEXT_STYLES, COLORS, GRADIENTS } from "@/app/styles";
import ValidColoredIcon from "@/assets/icons/valid-colored-icon.svg";

export default function SwipedRightValidCard() {
    return (
        <View style={styles.outerContainer}>
            {/* Blurred Glow Background */}
            <BlurView intensity={50} style={styles.blurContainer}>
                <LinearGradient
                    colors={GRADIENTS.validBlue.colors}
                    start={GRADIENTS.validBlue.start}
                    end={GRADIENTS.validBlue.end} 
                    style={styles.gradientBackground}
                />
            </BlurView>

            {/* Card Component */}
            <View style={styles.swipableCardContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Question</Text>
                    <View style={styles.coloredIconAndTextContainer}>
                        <Text style={styles.validText}>Valid</Text>
                        <ValidColoredIcon width={23.78} height={23.78} />
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
    coloredIconAndTextContainer: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    validText: {
        ...TEXT_STYLES.inputText,
        color: "#FFF",
        textShadowColor: "rgba(31, 31, 31, 0.20)",
        textShadowOffset: { width: 0, height: 1.5 },
        textShadowRadius: 4,
        opacity: .6
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
