import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import SuadeLogo from "../../assets/icons/suade-logo.svg"

const InitialScreen = () => {
    return (
        <View style={styles.outerContainer}>
            <SuadeLogo width={196} height={56}/>
        </View>
    );
};


const styles = StyleSheet.create({
    outerContainer: {
        display: "flex",
        flex: 1,
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        flexShrink: 0,
        borderRadius: 4,
        backgroundColor: "rgba(0, 0, 0, 0.24)",
        backdropFilter: "blur(12px)"
    }
})
export default InitialScreen;