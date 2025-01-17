import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const occupations = [
  { label: "Student", value: "Student" },
  { label: "Employed", value: "Employed" },
  { label: "Unemployed", value: "Unemployed" },
  { label: "Self-employed", value: "Self-employed" },
  { label: "Retired", value: "Retired" },
];

interface OccupationStepProps {
  occupation: string;
  setOccupation: (value: string) => void;
}

const OccupationStep: React.FC<OccupationStepProps> = ({ occupation, setOccupation }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>What’s your current occupation?</Text>
      </View>

      <View style={styles.dropdownContainer}>
        <Dropdown
          data={occupations}
          labelField="label"
          valueField="value"
          value={occupation}
          onChange={(item) => setOccupation(item.value)}
          placeholder="Select your occupation"
          style={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholderStyle}
          selectedTextStyle={styles.dropdownSelectedTextStyle}
          containerStyle={styles.dropdownDropdownContainer}
          renderItem={(item) => (
            <View style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>{item.label}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "column",
    gap: 20,
  },
  headerContainer: {
    alignSelf: "flex-start",
    width: "100%",
    marginBottom: 20,
  },
  headerText: {
    color: "rgba(255, 255, 255, 0.95)",
    fontFamily: "RocGroteskBold",
    fontSize: 28,
  },
  dropdownContainer: {
    width: "100%",
    marginTop: 20,
  },
  dropdown: {
    display: "flex",
    height: 52,
    paddingVertical: 14,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "rgba(13, 9, 10, 0.12)",
    boxShadow: "0px 0px 6.221px rgba(0, 0, 0, 0.25) inset",
    backdropFilter: "blur(12px)",
  },
  dropdownPlaceholderStyle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "Noto Sans",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.3,
    lineHeight: 24,
  },
  dropdownSelectedTextStyle: {
    color: "#FFF",
    fontFamily: "NotoSans",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.3,
    lineHeight: 24,
  },
  dropdownDropdownContainer: {
    backgroundColor: "rgba(13, 9, 10, 0.12)",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.20)",
    boxShadow: "0px 0px 6.221px rgba(0, 0, 0, 0.25) inset",
    backdropFilter: "blur(12px)",
  },
  dropdownItem: {
    display: "flex",
    width: "100%",
    height: 52,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(13, 9, 10, 0.12)",
    boxShadow: "0px 0px 6.221px rgba(0, 0, 0, 0.25) inset",
  },
  dropdownItemText: {
    color: "#FFF",
    fontFamily: "NotoSans",
    fontSize: 20,
    fontWeight: "400",
    letterSpacing: 0.3,
    lineHeight: 24,
  },
});

export default OccupationStep;
