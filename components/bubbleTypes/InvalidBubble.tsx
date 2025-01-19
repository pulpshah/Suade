import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TEXT_STYLES, COLORS } from "@/app/styles";
import InvalidColoredIcon from "@/assets/icons/invalid-colored-icon.svg"

export default function InvalidBubble() {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.primaryBackground}>
                <View style={styles.fallbackBackground}>
                    <View style={styles.innerContainer}>
                        <InvalidColoredIcon 
                            width={16} 
                            height={16}
                        />
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
        backgroundColor: COLORS.white12,
    },
    fallbackBackground: {
        padding: 8,
        borderRadius: 14,
        backgroundColor: "rgba(234, 242, 239, 0.12)",
    },
    innerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 0px 6px 0px #282828'
    },
});
