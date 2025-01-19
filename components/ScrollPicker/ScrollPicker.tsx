import { StyleSheet, ScrollView, View, Text } from "react-native";
import InBetween from "./InBetween";
import SelectedValue from "./SelectedValue";
import PreviewTimeValue from "./PreviewTimeValues";
import { useRef, useState } from "react";
import React from "react";
import { TEXT_STYLES, COLORS } from "@/app/styles";

type ScrollPickerProps = {
    onTimeChange: (time: string) => void;
};

type TimeUnit = {
    hour: number;
    minute: number;
    timeLetters: string;
};

export default function ScrollPicker({ onTimeChange }: ScrollPickerProps) {
    const scrollViewRef = useRef<ScrollView>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const timeUnits: TimeUnit[] = [];
    for (let hour = 6; hour <= 12; hour++) {
        timeUnits.push({
            hour,
            minute: 0,
            timeLetters: hour >= 12 ? "PM" : "AM",
        });

        if (hour < 12) {
            timeUnits.push(
                { hour, minute: 15, timeLetters: hour >= 12 ? "PM" : "AM" },
                { hour, minute: 30, timeLetters: hour >= 12 ? "PM" : "AM" },
                { hour, minute: 45, timeLetters: hour >= 12 ? "PM" : "AM" }
            );
        }
    }

    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const itemWidth = 36; // Width of each item including gap
        const index = Math.round(offsetX / itemWidth);

        if (index !== selectedIndex) {
            setSelectedIndex(index);
            const selectedTime = timeUnits[index];
            const displayHour = selectedTime.hour > 12 ? selectedTime.hour - 12 : selectedTime.hour;
            const formattedTime = `${displayHour}:${selectedTime.minute.toString().padStart(2, "0")} ${selectedTime.timeLetters}`;
            onTimeChange(formattedTime);
        }
    };

    const renderTimeUnit = (unit: TimeUnit, index: number) => {
        if (index === selectedIndex) {
            return (
                <View key={index} style={styles.selectedContainer}>
                    {/* Selected Time Text */}
                    <Text style={styles.selectedTimeText}>
                        {`${unit.hour > 12 ? unit.hour - 12 : unit.hour}:${unit.minute
                            .toString()
                            .padStart(2, "0")} ${unit.timeLetters}`}
                    </Text>
                    {/* Selected Value Line */}
                    <SelectedValue />
                </View>
            );
        }

        if (unit.minute === 0) {
            return (
                <PreviewTimeValue
                    key={index}
                    timeNumber={unit.hour}
                    timeLetters={unit.timeLetters}
                />
            );
        }

        return <InBetween key={index} />;
    };

    return (
        <ScrollView
            ref={scrollViewRef}
            style={styles.scrollContainer}
            contentContainerStyle={styles.contentContainer}
            horizontal={true}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            snapToInterval={36} // Width of each item including gap
            decelerationRate="fast"
            snapToAlignment="center"
        >
            {timeUnits.map((unit, index) => renderTimeUnit(unit, index))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: "row",
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 12,
        paddingHorizontal: "50%", // Space on both sides
    },
    selectedContainer: {
        flexDirection: "column",
        alignItems: "center", // Center text and line together
    },
    selectedTimeText: {
        ...TEXT_STYLES.timePickerNumber,
        color: COLORS.suadeShadesWhite,
    },
});
