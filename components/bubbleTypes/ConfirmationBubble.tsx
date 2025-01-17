import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { TEXT_STYLES } from "@/app/styles";

export default function ConfirmationBubble() {
    return (
        <View style={styles.outerContainer}>
            <ExpoLinearGradient
                colors={[
                    "rgba(234, 242, 239, 0.06)",
                    "rgba(181, 237, 253, 0.03)",
                    "rgba(130, 177, 254, 0.03)",
                    "rgba(79, 116, 255, 0.12)",
                    "rgba(255, 117, 154, 0.12)",
                    "rgba(255, 70, 144, 0.12)",
                    "rgba(255, 214, 163, 0.12)",
                    "rgba(255, 204, 117, 0.12)",
                ]}
                locations={[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.innerContainer}
            >
                <Text style={styles.text}>
                    Whats your full name? ex. John Smith
                </Text>
            </ExpoLinearGradient>
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
        borderColor: "#FFD6A3",
    },
    innerContainer: {
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
        backdropFilter: 'blur(32px)'
    },
    text: {
        ...TEXT_STYLES.medium,
        color: 'white',
    },
});
