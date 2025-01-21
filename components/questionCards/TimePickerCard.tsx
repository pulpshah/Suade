import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import ScrollPicker from "../ScrollPicker/ScrollPicker";
import { useEffect } from "react";
type TimePickerCardProps = {
    selectedTime: string | null;
    setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
    mode?: "hour" | "minutes"; 
};

export default function TimePickerCard({ selectedTime, setSelectedTime,mode = "hour"}: TimePickerCardProps) {
    useEffect(() => {
        if (selectedTime === null) {
            setSelectedTime("12:00 AM"); // Set default time on reset
        }
    }, [selectedTime]);
    return (
        <View style={styles.shadowContainer}>
            <ImageBackground
                source={require("@/assets/images/Flow Shadow.png")}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.outerContainer}>
                    {/* Time Picker */}
                    <View style={styles.timePickerContainer}>
                        {/* <ScrollPicker onTimeChange={setSelectedTime} /> */}
                        <ScrollPicker onTimeChange={setSelectedTime} mode={mode} />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
        shadowColor: "#000", // Black shadow
        shadowOffset: { width: 0, height: 4 }, // Shadow positioning
        shadowOpacity: 0.25, // Shadow transparency
        shadowRadius: 10, // Blur radius
        elevation: 10, // Android shadow
        overflow: "hidden",
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        flex: 1,
        opacity: 0.9, // Adjust the opacity of the background
    },
    outerContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 2,
        flexDirection: "column",
        alignSelf: "stretch",
        borderRadius: 14,
        overflow: "hidden",
    },
    timePickerContainer: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 12,
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "stretch",
        borderRadius: 14,
        backgroundColor: "rgba(0, 0, 0, 0.9)", // Semi-transparent black background
    },
});
