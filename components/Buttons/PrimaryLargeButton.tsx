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
        width: "100%",
        alignItems: "flex-end",
        gap: 6,
    },
    innerContainer: {
        display: "flex",
        padding: 2,
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        flex: 1,
        alignSelf: "stretch",
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
        alignSelf: "stretch",
        borderRadius: 14,
        backgroundColor: COLORS.white60,
        ...EFFECTS.glassySmall,
    },
    buttonText: {
        ...TEXT_STYLES.lgButtonText,
        color: "#000",
        textShadowColor: "rgba(31, 31, 31, 0.24)",
        textShadowRadius: 6,
    },
    disabledOuterContainer: {
        opacity: 0.6, // Visually indicate a disabled state
    },
    disabledInnerContainer: {
        borderColor: 'gray',
    },
    disabledButtonText: {
        color: COLORS.white60, // Adjust text color for disabled state
    },
});
