import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TEXT_STYLES, COLORS } from "@/app/styles";

export default function ThirdPartyTypingBubble() {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.primaryBackground}>
                <View style={styles.fallbackBackground}>
                    <View style={styles.innerContainer}>
                        <View style={styles.innerContainerBackgroundFallback}>
                            {/* Adding ellipses */}
                            <View style={styles.ellipsesContainer}>
                                <View style={[styles.dot, styles.leftDot]} />
                                <View style={[styles.dot, styles.middleDot]} />
                                <View style={[styles.dot, styles.rightDot]} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        padding: 2,
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        gap: 10,
        borderRadius: 14,
        borderWidth: 0.5,
        borderColor: "rgba(234, 242, 239, 0.20)",
    },
    primaryBackground: {
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: COLORS.black40,
    },
    fallbackBackground: {
        padding: 8,
        borderRadius: 14,
        backgroundColor: "rgba(13, 9, 10, 0.40)",
    },
    innerContainer: {
        display: "flex",
        height: 11,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: 'center',
        gap: 4,
        borderRadius: 3.5,
        opacity: 0.6,
        backgroundColor: COLORS.black20,
        backdropFilter: "blur(6px)",
    },
    innerContainerBackgroundFallback: {
        borderRadius: 3.5,
        backgroundColor: "rgba(13, 9, 10, 0.20)",
    },
    ellipsesContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
    },
    leftDot: {
        backgroundColor: "#FFF",
    },
    middleDot: {
        backgroundColor: "#FFF",
        opacity: 0.6,
    },
    rightDot: {
        backgroundColor: "#FFF",
        opacity: 0.4,
    },
    text: {
        ...TEXT_STYLES.medium,
        color: "#FF686B",
    },
});
