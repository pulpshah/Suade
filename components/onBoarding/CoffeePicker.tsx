import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import CoffeeGrayIcon from "@/assets/icons/coffee-gray-icon.svg";
import CoffeeColoredIcon from "@/assets/icons/coffee-colored-icon.svg";
import PrimaryLargeButton from "../Buttons/PrimaryLargeButton";

type CoffeePickerProps = {
  onConfirm: (numCups: number) => void; // Callback to send the answer to the chat
};

export default function CoffeePicker({ onConfirm }: CoffeePickerProps) {
  const [selectedCups, setSelectedCups] = useState<number>(0);

  const toggleCup = (index: number) => {
    // If clicking on an already selected cup, deselect cups to the right
    if (index + 1 === selectedCups) {
      setSelectedCups(index); // Deselect current cup
    } else {
      setSelectedCups(index + 1); // Select up to this cup
    }
  };

  return (
    <View style={styles.outerContainer}>
      {/* Coffee icons */}
      <View style={styles.coffeeIconContainer}>
        {[0, 1, 2].map((index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleCup(index)}
            style={styles.coffeeIcon}
          >
            {index < selectedCups ? <CoffeeColoredIcon /> : <CoffeeGrayIcon />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Confirm button */}
      <PrimaryLargeButton
        buttonText={`Confirm: ${selectedCups} cup${selectedCups !== 1 ? "s" : ""}`}
        onPress={() => onConfirm(selectedCups)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    gap: 12,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 16,
    width: "100%",
  },
  coffeeIconContainer: {
    flexDirection: "row",
    gap: 16,
  },
  coffeeIcon: {
    transform: [{ rotate: "-7deg" }],
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
