import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TEXT_STYLES, COLORS } from "@/app/styles";
import WarningIcon from './assets/!-icon.svg'

type NotificationProps = {
    notificationText: string;
};

export default function UntimedNotif({notificationText}: NotificationProps) {
    return(
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.notificationText}>
                    {notificationText}
                </Text>
                <WarningIcon width={12} height={12}/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    outerContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 2,
        paddingHorizontal: 0,
        alignItems: 'center',
        borderRadius: 3.5
    },
    innerContainer: {
        display: 'flex',
        paddingVertical: 4,
        paddingHorizontal: 6,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        borderRadius: 3.5,
        backgroundColor: COLORS.black20,
        boxShadow: '0px 0px 6px 0px rgba(234, 242, 239, 0.12)',
        backdropFilter: 'blur(12px)'
    },
    notificationText: {
        ...TEXT_STYLES.base,
        color: "white",
        textShadowColor: 'rgba(0, 0, 0, 0.40)',
        textShadowRadius: 6,
    }
})