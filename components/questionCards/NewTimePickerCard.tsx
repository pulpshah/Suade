import React, { useEffect } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import NewScrollPicker from "../ScrollPicker/NewScrollPicker";
import FlowShadow from "@/assets/gradients/flow-shadow-medium.svg"

type NewTimePickerCardProps = {
  selectedTime: string | null;
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function NewTimePickerCard({
  selectedTime,
  setSelectedTime,
}: NewTimePickerCardProps) {
  useEffect(() => {
    if (selectedTime === null) {
      setSelectedTime("12:00 AM"); // Default time
    }
  }, [selectedTime]);

  return (
    <View style={styles.shadowContainer}>
      <FlowShadow
        style={styles.backgroundImage}
      >
        <View style={styles.outerContainer}>
          <View style={styles.timePickerContainer}>
            <NewScrollPicker onTimeChange={setSelectedTime} />
          </View>
        </View>
      </FlowShadow>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    overflow: "hidden",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
    opacity: 0.9,
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
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
});
