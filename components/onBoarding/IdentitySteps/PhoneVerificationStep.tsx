import React, { useRef } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";

interface PhoneVerificationStepProps {
  phoneNumber: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  onChangeNumber: () => void;
}

const PhoneVerificationStep: React.FC<PhoneVerificationStepProps> = ({
  phoneNumber,
  inputValue,
  setInputValue,
  onChangeNumber,
}) => {
  const inputRef = useRef<TextInput>(null);

  const renderLines = () => {
    return Array(6)
      .fill("")
      .map((_, index) => (
        <View key={index} style={styles.verificationLine}>
          <Text style={styles.verificationDigit}>
            {inputValue[index] || ""}
          </Text>
        </View>
      ));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.outerContainer}>
        <View style={styles.subheaderAndHeaderContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>We sent you a verification code.</Text>
          </View>
          <View style={styles.subheaderContainer}>
            <Text style={styles.subheaderText}>Sent to:</Text>
            <View style={styles.phoneNumberRow}>
              <Text style={styles.phoneNumberText}>{phoneNumber} • </Text>
              <TouchableOpacity onPress={onChangeNumber}>
                <Text style={styles.changeButton}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.verificationInputOuterContainer}>
          <TouchableOpacity
            style={styles.verificationLinesContainer}
            onPress={() => inputRef.current?.focus()}
            activeOpacity={1}
          >
            {renderLines()}
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            keyboardType="numeric"
            value={inputValue}
            onChangeText={(text) => {
              const sanitized = text.replace(/[^0-9]/g, ""); // Allow only numeric input
              if (sanitized.length <= 6) setInputValue(sanitized); // Limit to 6 digits
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "column",
    gap: 20
  },
  subheaderAndHeaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 48,
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
  subheaderContainer: {
    display: "flex",
    flexDirection: "column",
  },
  subheaderText: {
    color: "rgba(255, 255, 255, 0.80)",
    fontFamily: "NotoSans",
    fontSize: 14,
    fontWeight: "400",
    opacity: 0.9,
  },
  phoneNumberRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneNumberText: {
    color: "rgba(255, 255, 255, 0.95)",
    fontFamily: "NotoSans",
    fontSize: 16,
    fontWeight: "400",
  },
  changeButton: {
    color: "rgba(255, 112, 114, 0.80)",
    fontWeight: "600",
    fontFamily: "NotoSans",
    fontSize: 16,
  },
  verificationInputOuterContainer: {
    marginTop: 20,
    alignItems: "center",
    position: "relative",
  },
  verificationLinesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    width: "80%",
  },
  verificationLine: {
    width: 40,
    borderBottomWidth: 0.5,
    borderBottomColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 5,
  },
  verificationDigit: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
});

export default PhoneVerificationStep;
