import { StyleSheet, ScrollView, View, Text, Dimensions } from "react-native";
import InBetween from "./InBetween";
import SelectedValue from "./SelectedValue";
import PreviewTimeValue from "./PreviewTimeValues";
import { useRef, useState } from "react";
import React from "react";
import { TEXT_STYLES, COLORS } from "@/app/styles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = 24;
const ITEM_GAP = 6;

type ScrollPickerProps = {
    onTimeChange: (time: string) => void;
    mode?: "hour" | "minutes";
};

type TimeUnit = {
    hour: number;
    minute: number;
    timeLetters: string;
};

export default function ScrollPicker({ onTimeChange,mode = "hour" }: ScrollPickerProps) {
    const scrollViewRef = useRef<ScrollView>(null);
    const [selectedTime, setSelectedTime] = useState("12:00 AM");

    // Generate time units from 12 AM to 12 PM
    const timeUnits: TimeUnit[] = [];
    if (mode === "minutes") {
           // Simply generate 0..60 as "minutes"
           for (let m = 0; m <= 60; m++) {
             timeUnits.push({
               hour: 0,
               minute: m,
               timeLetters: "", // No AM/PM needed
             });
           }
         } else {
    // Start with 12 AM
    timeUnits.push({ hour: 12, minute: 0, timeLetters: "AM" });
    timeUnits.push(
        { hour: 12, minute: 15, timeLetters: "AM" },
        { hour: 12, minute: 30, timeLetters: "AM" },
        { hour: 12, minute: 45, timeLetters: "AM" }
    );

    // Add 1 AM to 11 AM
    for (let hour = 1; hour <= 11; hour++) {
        timeUnits.push({ hour, minute: 0, timeLetters: "AM" });
        timeUnits.push(
            { hour, minute: 15, timeLetters: "AM" },
            { hour, minute: 30, timeLetters: "AM" },
            { hour, minute: 45, timeLetters: "AM" }
        );
    }

    // Add 12 PM
    timeUnits.push({ hour: 12, minute: 0, timeLetters: "PM" });
    timeUnits.push(
        { hour: 12, minute: 15, timeLetters: "PM" },
        { hour: 12, minute: 30, timeLetters: "PM" },
        { hour: 12, minute: 45, timeLetters: "PM" }
    );

    // Add 1 PM to 11 PM
    for (let hour = 1; hour <= 11; hour++) {
        timeUnits.push({ hour, minute: 0, timeLetters: "PM" });
        timeUnits.push(
            { hour, minute: 15, timeLetters: "PM" },
            { hour, minute: 30, timeLetters: "PM" },
            { hour, minute: 45, timeLetters: "PM" }
        );
    }
}

    const totalItemWidth = ITEM_WIDTH + ITEM_GAP;

    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / totalItemWidth);
      
        if (index >= 0 && index < timeUnits.length) {
          const selectedTimeUnit = timeUnits[index];
          let formattedTime = "";
      
          if (mode === "minutes") {
            formattedTime = `${selectedTimeUnit.minute} min`;
          } else {
            formattedTime = `${selectedTimeUnit.hour}:${selectedTimeUnit.minute
              .toString()
              .padStart(2, "0")} ${selectedTimeUnit.timeLetters}`;
          }
      
          setSelectedTime(formattedTime);
          onTimeChange(formattedTime);
        }
      };
      

    const isTimeUnitSelected = (unit: TimeUnit) => {
           if (mode === "minutes") {
                 // Check if minute matches
                 const numeric = parseInt(selectedTime);
                 return numeric === unit.minute;
               }
        const [time, period] = selectedTime.split(' ');
        const [hour, minute] = time.split(':').map(Number);
        return unit.hour === hour && 
               unit.minute === minute && 
               unit.timeLetters === period;
    };

    const renderTimeUnit = (unit: TimeUnit) => {
        const isSelected = isTimeUnitSelected(unit);
      
        if (mode === "minutes") {
          // For multiples of 5, use hourTick styling
          if (unit.minute % 5 === 0) {
            return (
              <View style={styles.tickContainer}>
                <View style={[styles.hourTick, isSelected && styles.selectedMinuteTick]} />
              </View>
            );
          } else {
            // For other minutes, use minuteTick + diamond styling
            return (
              <View style={styles.tickContainer}>
                <View style={[styles.diamond, isSelected && styles.selectedDiamond]} />
                <View style={[styles.minuteTick, isSelected && styles.selectedMinuteTick]} />
              </View>
            );
          }
        }
      
        // For hour mode, keep the existing logic
        if (unit.minute === 0) {
          return (
            <View style={styles.tickContainer}>
              <View style={styles.hourTick} />
            </View>
          );
        }
      
        // For 15, 30, 45 minutes in hour mode
        return (
          <View style={styles.tickContainer}>
            <View style={[styles.diamond, isSelected && styles.selectedDiamond]} />
            <View style={[styles.minuteTick, isSelected && styles.selectedMinuteTick]} />
          </View>
        );
      };
      
      

    return (
        <View style={styles.container}>
            {/* Fixed Time Display */}
            <View style={styles.timeDisplayContainer}>
                <Text style={styles.selectedTimeText}>
                    {selectedTime}
                </Text>
            </View>
            
            {/* Fixed Center Indicator */}
            <View style={styles.centerIndicator} />

            {/* Scrollable Timeline */}
            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
                horizontal={true}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                snapToInterval={totalItemWidth}
                decelerationRate="fast"
                snapToAlignment="center"
            >
                {timeUnits.map((unit, index) => (
                    <View key={index} style={styles.timeUnitContainer}>
                        {renderTimeUnit(unit)}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: SCREEN_WIDTH,
        backgroundColor: "black",
        borderRadius: 12,
        overflow: "hidden",
    },
    timeDisplayContainer: {
        position: "absolute",
        top: 10,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
    },
    selectedTimeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    centerIndicator: {
        position: "absolute",
        left: "50%",
        bottom: 40,
        width: 3,
        height: 40,
        backgroundColor: "white",
        zIndex: 3,
    },
    scrollContainer: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: ITEM_GAP,
        paddingHorizontal: SCREEN_WIDTH / 2 - ITEM_WIDTH / 2,
    },
    timeUnitContainer: {
        width: ITEM_WIDTH,
        alignItems: "center",
    },
    tickContainer: {
        alignItems: "center",
        width: ITEM_WIDTH,
    },
    hourTick: {
        width: 3,
        height: 50,
        backgroundColor: "white",
        opacity: 1,
    },
    minuteTick: {
        width: 4,
        height: 40,
        backgroundColor: "gray",
        borderRadius: 2,
        marginBottom: -10,
        alignItems: "center",
    },
    selectedMinuteTick: {
        backgroundColor: "white",
    },
    diamond: {
        width: 8,
        height: 8,
        backgroundColor: "gray",
        transform: [{ rotate: "45deg" }],
        position: "absolute",
        top: -10,
        left: "50%",
        marginLeft: -4,
    },
    selectedDiamond: {
        backgroundColor: "white",
    },
    hourText: {
        color: "white",
        fontSize: 14,
        fontWeight: "500",
        marginTop: 6,
    },
    longMinuteTick: {
        width: 3,
        height: 50,
        backgroundColor: "gray", // Default color
        opacity: 1,
      },
    //   selectedMinuteTick: {
    //     backgroundColor: "white", // Highlight selected tick
    //   },
});