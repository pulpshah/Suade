import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TEXT_STYLES, COLORS } from "@/app/styles";

export default function ErrorBubble() {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.primaryBackground}>
                <View style={styles.fallbackBackground}>
                    <Text style={styles.text}>
                        Invalid Response
                    </Text>
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
        backgroundColor: COLORS.red12,
    },
    fallbackBackground: {
        padding: 8,
        borderRadius: 14,
        backgroundColor: "rgba(255, 104, 107, 0.12)",
    },
    text: {
        ...TEXT_STYLES.medium,
        color: '#FF686B'
    },
});
