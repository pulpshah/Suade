import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface BottomButtonsProps {
  showDrafts?: boolean;
  onContinue: () => void;
  onDrafts?: () => void;
}

const BottomButtons: React.FC<BottomButtonsProps> = ({
  showDrafts = false,
  onContinue,
  onDrafts,
}) => {
  return (
    <View
      style={[
        styles.buttonRowContainer,
        { justifyContent: showDrafts ? "space-between" : "flex-end" }, // Conditional alignment
      ]}
    >
      {showDrafts && (
        <TouchableOpacity onPress={onDrafts} style={styles.draftsButtonOuterContainer}>
          <View style={styles.draftsButtonInnerContainer}>
            <Text style={styles.draftsButtonText}>Drafts</Text>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onContinue} style={styles.continueButtonOuterContainer}>
        <View style={styles.continueButtonInnerContainer}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    zIndex: 100,
  },
  draftsButtonOuterContainer: {
    display: "flex",
    padding: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.20)",
  },
  draftsButtonInnerContainer: {
    display: "flex",
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(13, 9, 10, 0.40)",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6.221,
  },
  draftsButtonText: {
    color: "white",
    fontFamily: "NotoSans",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 18,
    letterSpacing: 0.3,
  },
  continueButtonOuterContainer: {
    display: "flex",
    padding: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.20)",
  },
  continueButtonInnerContainer: {
    display: "flex",
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(13, 9, 10, 0.7)",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6.221,
    elevation: 6,
  },
  continueButtonText: {
    color: "white",
    fontFamily: "NotoSans",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 18,
    letterSpacing: 0.3,
  },
});

export default BottomButtons;
