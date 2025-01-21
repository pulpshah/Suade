import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = 24;
const ITEM_GAP = 6;

type NewScrollPickerProps = {
  onTimeChange: (time: string) => void;
};

type TimeUnit = {
  hour: number;
  minute: number;
  timeLetters: string;
};

export default function NewScrollPicker({ onTimeChange }: NewScrollPickerProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [localTime, setLocalTime] = useState("12:00 AM");

  const timeUnits: TimeUnit[] = [];
  timeUnits.push({ hour: 12, minute: 0, timeLetters: "AM" });
  timeUnits.push(
    { hour: 12, minute: 15, timeLetters: "AM" },
    { hour: 12, minute: 30, timeLetters: "AM" },
    { hour: 12, minute: 45, timeLetters: "AM" }
  );

  for (let hour = 1; hour <= 11; hour++) {
    timeUnits.push({ hour, minute: 0, timeLetters: "AM" });
    timeUnits.push(
      { hour, minute: 15, timeLetters: "AM" },
      { hour, minute: 30, timeLetters: "AM" },
      { hour, minute: 45, timeLetters: "AM" }
    );
  }

  timeUnits.push({ hour: 12, minute: 0, timeLetters: "PM" });
  timeUnits.push(
    { hour: 12, minute: 15, timeLetters: "PM" },
    { hour: 12, minute: 30, timeLetters: "PM" },
    { hour: 12, minute: 45, timeLetters: "PM" }
  );

  for (let hour = 1; hour <= 11; hour++) {
    timeUnits.push({ hour, minute: 0, timeLetters: "PM" });
    timeUnits.push(
      { hour, minute: 15, timeLetters: "PM" },
      { hour, minute: 30, timeLetters: "PM" },
      { hour, minute: 45, timeLetters: "PM" }
    );
  }

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (ITEM_WIDTH + ITEM_GAP));
    if (index >= 0 && index < timeUnits.length) {
      const selectedTimeUnit = timeUnits[index];
      const formattedTime = `${selectedTimeUnit.hour}:${selectedTimeUnit.minute
        .toString()
        .padStart(2, "0")} ${selectedTimeUnit.timeLetters}`;
      setLocalTime(formattedTime);
      onTimeChange(formattedTime);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        horizontal
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={ITEM_WIDTH + ITEM_GAP}
        decelerationRate="fast"
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
      >
        {timeUnits.map((unit, index) => (
          <View key={index} style={styles.timeUnitContainer}>
            <Text style={styles.timeText}>{`${unit.hour}:${unit.minute
              .toString()
              .padStart(2, "0")} ${unit.timeLetters}`}</Text>
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
  scrollContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SCREEN_WIDTH / 2 - ITEM_WIDTH / 2,
  },
  timeUnitContainer: {
    width: ITEM_WIDTH,
    alignItems: "center",
  },
  timeText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
