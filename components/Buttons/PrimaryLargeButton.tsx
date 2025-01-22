import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TEXT_STYLES, COLORS, EFFECTS } from "@/app/styles";

type PrimaryLargeButtonProps = {
    buttonText: string;
    onPress?: () => void; // Optional onPress handler
    disabled?: boolean; // Optional disabled state
};

export default function PrimaryLargeButton({ buttonText, onPress, disabled }: PrimaryLargeButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.outerContainer, disabled && styles.disabledOuterContainer]}
            onPress={onPress}
            disabled={disabled}
        >
            <View style={[styles.innerContainer, disabled && styles.disabledInnerContainer]}>
                <View style={styles.buttonBodyContainer}>
                    <Text style={[styles.buttonText, disabled && styles.disabledButtonText]}>
                        {buttonText}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        display: "flex",
        width: "100%", // Ensure it uses the full width of the parent container
        alignItems: "center", // Aligns the content centrally
        gap: 6, // Optional spacing between elements
    },
    innerContainer: {
        display: "flex",
        padding: 2,
        flexDirection: "column",
        alignItems: "center", // Center-aligns content within the button
        gap: 10,
        flex: 1,
        width: "100%", // Ensure the button fills the full width
        borderRadius: 14,
        borderWidth: 0.5,
        borderColor: COLORS.suadeShadesCardOutline,
    },
    buttonBodyContainer: {
        display: "flex",
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        width: "100%", // Ensures the button body stretches
        borderRadius: 14,
        backgroundColor: COLORS.white60,
        ...EFFECTS.glassySmall,
    },
    buttonText: {
        ...TEXT_STYLES.lgButtonText,
        color: "#000",
        textShadowColor: "#1F1F1F3D",
    },
    disabledOuterContainer: {
        opacity: 0.6, // Visually indicate a disabled state
    },
    disabledInnerContainer: {
        borderColor: "gray",
    },
    disabledButtonText: {
        color: COLORS.white60, // Adjust text color for disabled state
    },
});
