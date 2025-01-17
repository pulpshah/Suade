import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function SwipeableTake() {
    return (
        <View style={styles.outerContainer}>

        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        display: 'flex',
        width: '100%',
        padding: 2,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        alignSelf: 'stretch',
        borderRadius: 14,
        borderWidth: .5,
        borderColor: 'rgba(234, 242, 239, 0.20)'
        
    },


})