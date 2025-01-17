import React, { useRef } from "react";
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";

interface DOBStepProps {
  dob: string;
  setDob: (value: string) => void;
}

const DOBStep: React.FC<DOBStepProps> = ({ dob, setDob }) => {
  const inputRef = useRef<TextInput>(null);

  const renderLines = () => {
    const placeholder = ["MM", "DD", "YYYY"];
    const groups = dob.split(" ");
  
    return placeholder.map((place, index) => (
      <View key={index} style={[styles.dobLineGroup, index > 0 && styles.groupSpacing]}>
        {place.split("").map((char, charIndex) => (
          <View key={charIndex} style={styles.dobLine}>
            <Text
              style={
                groups[index]?.[charIndex]
                  ? styles.dobDigit // If the user has entered a value
                  : styles.placeholderDigit // Placeholder style
              }
            >
              {groups[index]?.[charIndex] || char}
            </Text>
          </View>
        ))}
      </View>
    ));
  };

  const handleInputChange = (text: string) => {
    const sanitized = text.replace(/[^0-9]/g, ""); // Allow only numbers
  
    // Split the sanitized input into groups for MM, DD, YYYY
    const mm = sanitized.slice(0, 2);
    const dd = sanitized.slice(2, 4);
    const yyyy = sanitized.slice(4, 8);
  
    // Combine the groups with spaces
    const formatted = [mm, dd, yyyy].filter(Boolean).join(" ");
  
    setDob(formatted);
  };  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.outerContainer}>
        <View style={styles.subheaderAndHeaderContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>What’s your date of birth?</Text>
          </View>
          <View style={styles.subheaderContainer}>
            <Text style={styles.subheaderText}>Suade users must be 16 years or older.</Text>
            <Text style={styles.learnMoreText}>Learn more</Text>
          </View>
        </View>

        <View style={styles.dobInputOuterContainer}>
          <TouchableWithoutFeedback
            onPress={() => inputRef.current?.focus()}
            style={styles.dobLinesContainer}
          >
            <View style={styles.dobLinesContainer}>{renderLines()}</View>
          </TouchableWithoutFeedback>
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            keyboardType="numeric"
            value={dob.replace(/\s/g, "")}
            onChangeText={handleInputChange}
            maxLength={8}
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
  learnMoreText: {
    fontFamily: "NotoSans",
    fontWeight: "700",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.80)",
  },
  dobInputOuterContainer: {
    marginTop: 20,
    alignItems: "center",
    position: "relative",
  },
  dobLinesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dobLineGroup: {
    flexDirection: "row",
    gap: 6,
  },
  groupSpacing: {
    marginLeft: 20,
  },
  dobLine: {
    width: 32,
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
  dobDigit: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold",
  },
  placeholderDigit: {
    fontSize: 32,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "bold",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
});

export default DOBStep;
