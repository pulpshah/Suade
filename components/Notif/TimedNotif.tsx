import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { TEXT_STYLES, COLORS } from "@/app/styles";
import WarningIcon from "./assets/!-icon.svg";

type NotificationProps = {
    notificationText: string;
    seconds: number; // Duration of the animation
};

export default function TimedNotif({ notificationText, seconds }: NotificationProps) {
    const progressWidth = useRef(new Animated.Value(0)).current;
    const [containerWidth, setContainerWidth] = useState(0); // Track width of the text + icon

    useEffect(() => {
        Animated.timing(progressWidth, {
            toValue: 1,
            duration: seconds * 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [progressWidth, seconds]);

    return (
        <View style={styles.outerContainer}>
            {/* Measure the width of the inner container */}
            <View
                style={styles.innerContainer}
                onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
            >
                <Text style={styles.notificationText}>{notificationText}</Text>
                <WarningIcon width={12} height={12} />
            </View>
            {/* Use measured width for the progress bar */}
            <View
                style={[
                    styles.progressBarContainer,
                    { width: containerWidth }, // Set progress bar width dynamically
                ]}
            >
                <Animated.View
                    style={[
                        styles.progressBarInner,
                        {
                            transform: [
                                {
                                    scaleX: progressWidth,
                                },
                            ],
                        },
                    ]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        display: "flex",
        flexDirection: "column",
        paddingVertical: 2,
        paddingHorizontal: 0,
        alignItems: "center",
        borderRadius: 3.5,
    },
    innerContainer: {
        flexDirection: "row",
        paddingVertical: 4,
        paddingHorizontal: 6,
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        borderRadius: 3.5,
        backgroundColor: COLORS.black20,
        boxShadow: "0px 0px 6px 0px rgba(234, 242, 239, 0.12)",
        backdropFilter: "blur(12px)",
    },
    notificationText: {
        ...TEXT_STYLES.base,
        color: "white",
        textShadowColor: "rgba(0, 0, 0, 0.40)",
        textShadowRadius: 6,
    },
    progressBarContainer: {
        height: 2,
        backgroundColor: COLORS.suadeShadesCardOutline,
        overflow: "hidden",
        alignSelf: "center",
    },
    progressBarInner: {
        backgroundColor: COLORS.white60,
        flex: 1,
        transformOrigin: "left",
    },
});
