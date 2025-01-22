import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ValidColoredIcon from "@/assets/icons/valid-colored-icon.svg";
import FlowBlue from "@/assets/gradients/flow-blue.svg";
import { TEXT_STYLES, COLORS } from "@/app/styles";

export default function SwipedRightValidCard() {
  return (
    <View style={styles.shadowContainer}>
      <FlowBlue style={styles.backgroundImage} />
      <View style={styles.outerContainer}>
        <View style={styles.swipableCardContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Question</Text>
            <View style={styles.coloredIconAndTextContainer}>
              <Text style={styles.validText}>Valid</Text>
              <ValidColoredIcon width={23.78} height={23.78} />
            </View>
          </View>
          <View style={styles.questionTextContainer}>
            <Text style={styles.questionText}>
              Do you check your phone first thing in the morning?
            </Text>
          </View>
        </View>
      </View>
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "150%", // Adjust size for visibility
    height: "150%",
    zIndex: -1,
    alignSelf: "center",
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
  swipableCardContainer: {
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 0,
    alignSelf: "stretch",
  },
  coloredIconAndTextContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  validText: {
    ...TEXT_STYLES.inputText,
    color: "#FFF",
    textShadowColor: "rgba(31, 31, 31, 0.20)",
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 4,
    opacity: 0.6,
  },
  headerText: {
    ...TEXT_STYLES.commentUsernameTextMedium,
    color: "white",
  },
  questionTextContainer: {
    width: "100%",
  },
  questionText: {
    ...TEXT_STYLES.medium,
    color: "white",
  },
});
