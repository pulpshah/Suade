import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";

interface GenderStepProps {
  gender: string;
  setGender: (value: string) => void;
}

const GenderStep: React.FC<GenderStepProps> = ({ gender, setGender }) => {
  const options = ["Man", "Woman", "Nonbinary"];

  return (
    <View style={styles.outerContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Which gender best describes you?</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {options.map((option) => (
            <TouchableOpacity
                key={option}
                style={styles.buttonOuter}
                onPress={() => setGender(option)}
            >
                <ExpoLinearGradient
                colors={
                    gender === option
                    ? ["rgba(113, 128, 185, 0.64)", "rgba(234, 242, 239, 0.64)"]
                    : ["rgba(13, 9, 10, 0.12)", "rgba(13, 9, 10, 0.12)"]
                }
                style={[styles.buttonInner, gender === option && styles.selectedButtonInner]}
                >
                <Text
                    style={[
                    styles.buttonText,
                    gender !== option && { opacity: 0.5 }, // Reduce opacity for unselected buttons
                    ]}
                >
                    {option}
                </Text>
                </ExpoLinearGradient>
            </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "column",
    gap: 20
  },
  headerContainer: {
    alignSelf: "flex-start",
    width: "100%",
  },
  headerText: {
    color: "rgba(255, 255, 255, 0.95)",
    fontFamily: "RocGroteskBold",
    fontSize: 28,
  },
  buttonsContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  buttonOuter: {
    display: "flex",
    height: 55,
    padding: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    alignSelf: "stretch",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.20)",
  },
  buttonInner: {
    display: "flex",
    paddingVertical: 12, // Reduced for better alignment
    paddingHorizontal: 14,
    justifyContent: "center", // Center text vertically
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: 50,
    backgroundColor: "rgba(13, 9, 10, 0.12)",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    backdropFilter: "blur(12px)",
  },
  selectedButtonInner: {
    shadowColor: "rgba(113, 128, 185, 0.64)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  buttonText: {
    color: "#FFF",
    fontFamily: "Noto Sans",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.3,
    textAlignVertical: "center", // Ensures the text is centered vertically
  },
});

export default GenderStep;
