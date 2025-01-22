import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TEXT_STYLES, COLORS } from "@/app/styles";

type ThirdPersonBubbleProps = {
  children: React.ReactNode; // Accept plain text or nested elements
};

export default function ThirdPersonBubble({ children }: ThirdPersonBubbleProps) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.primaryBackground}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    padding: 2,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: COLORS.suadeShadesCardOutline,
  },
  primaryBackground: {
    borderRadius: 14,
    padding: 8,
    alignSelf: "stretch", // Ensure it fills the width of the container
    backgroundColor: COLORS.black40,
    overflow: "hidden",
  },
  text: {
    ...TEXT_STYLES.medium,
    color: "white",
    flexWrap: "wrap", // Allow wrapping
  },
});
