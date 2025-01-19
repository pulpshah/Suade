import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TEXT_STYLES, COLORS } from "@/app/styles";

export default function ThirdPersonBubble() {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.primaryBackground}>
                <View style={styles.fallbackBackground}>
                    <Text style={styles.text}>
                        Whats your full name? ex. John Smith
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
        backgroundColor: COLORS.black40,
    },
    fallbackBackground: {
        padding: 8,
        borderRadius: 14,
        backgroundColor: "rgba(13, 9, 10, 0.40)",
    },
    text: {
        ...TEXT_STYLES.medium,
        color: 'white',
    },
});
