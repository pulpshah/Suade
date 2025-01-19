import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { COLORS } from "@/app/styles";
import ScrollPicker from "../ScrollPicker/ScrollPicker";

type TimePickerCardProps = {
    selectedTime: string;
    setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
};


export default function TimePickerCard({ selectedTime, setSelectedTime }: TimePickerCardProps) {
    return (
        <View style={styles.outerContainer}>
            <BlurView intensity={50} style={styles.blurContainer}>
                <LinearGradient
                    colors={[
                        "rgba(234, 242, 239, 0.2)",
                        "rgba(130, 177, 254, 0.3)",
                        "#4F74FF",
                        "#FF759A",
                        "#FF4690",
                        "#FFD6A3",
                        "#FFCC75",
                    ]}
                    locations={[0, 0.2, 0.4, 0.5, 0.6, 0.8, 1]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradientBackground}
                />
            </BlurView>

            <View style={styles.timePickerContainer}>
                <ScrollPicker onTimeChange={setSelectedTime} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 2,
        flexDirection: "column",
        alignSelf: "stretch",
        borderRadius: 14,
        borderWidth: 0.5,
        borderColor: COLORS.suadeShadesCardOutline,
        overflow: "hidden",
    },
    blurContainer: {
        position: "absolute",
        top: -40,
        left: -40,
        right: -40,
        bottom: -40,
        zIndex: -1,
        borderRadius: 60,
    },
    gradientBackground: {
        flex: 1,
        opacity: 0.9,
    },
    timePickerContainer: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 12,
        flexDirection: "column",
        alignItems: "flex-end",
        alignSelf: "stretch",
        borderRadius: 14,
        backgroundColor: COLORS.suadeShadesBlack,
        shadowColor: "#4F74FF",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        paddingBottom: 16,
    },
});
