import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { TEXT_STYLES } from "@/app/styles";

export default function UserMessageBubble({messageText}: any) {
    return (
        <View style={styles.outerContainer}>
            <ExpoLinearGradient
                colors={[
                    "rgba(255, 214, 163, 0.32)",
                    "rgba(255, 204, 117, 0.32)",
                    "rgba(255, 117, 154, 0.32)",
                    "rgba(255, 70, 144, 0.32)",
                    "rgba(181, 237, 253, .1)",
                    "rgba(130, 178, 254, .1)",
                    "rgba(79, 117, 255, .15)",

                ]}
                // locations={[0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1]}
                start={{ x: -1, y: -1 }}
                end={{ x: 1, y: 1 }}
                style={styles.innerContainer}
            >
                <Text style={styles.text}>
                    {messageText}
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
        borderColor: "rgba(255, 214, 163, .6)",
    },
    innerContainer: {
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
        backdropFilter: 'blur(64px)'
    },
    text: {
        ...TEXT_STYLES.medium,
        color: 'white',
    },
});
