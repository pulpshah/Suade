import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const countryCodes = [
  { label: "+1", value: "+1" },
  { label: "+44", value: "+44" },
  { label: "+61", value: "+61" },
  { label: "+91", value: "+91" },
];

interface PhoneInputStepProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
}

const PhoneInputStep: React.FC<PhoneInputStepProps> = ({ phoneNumber, setPhoneNumber }) => {
  const [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1");

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return cleaned;
    const [, part1, part2, part3] = match;

    let formattedNumber = part1;
    if (part2) formattedNumber += ` ${part2}`;
    if (part3) formattedNumber += ` ${part3}`;

    return formattedNumber;
  };

  const handlePhoneNumberChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setLocalPhoneNumber(formatted);
  };

  const handleBlur = () => {
    setPhoneNumber(localPhoneNumber);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.subheaderAndHeaderContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Please enter a valid phone number.</Text>
        </View>
        <View style={styles.subheaderContainer}>
          <Text style={styles.subheaderText}>
            Suade will send you a text with a verification code. Message and data rates may apply.
          </Text>
        </View>
      </View>

      <View style={styles.phoneNumberInputOuterContainer}>
        {/* Country Code Dropdown */}
        <View style={styles.countryCodeDropdownOuterContainer}>
          <Dropdown
            data={countryCodes}
            labelField="label"
            valueField="value"
            value={selectedCountryCode}
            onChange={(item) => setSelectedCountryCode(item.value)}
            style={styles.countryCodeDropdown}
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

        {/* Phone Number Input */}
        <View style={styles.phoneNumberTextInputOuterContainer}>
          <TextInput
            placeholder="000 000 0000"
            style={styles.phoneNumberInputText}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            keyboardType="phone-pad"
            value={localPhoneNumber}
            onChangeText={handlePhoneNumberChange}
            onBlur={handleBlur}
            maxLength={12}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "column",
    gap: 20,
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
    fontFamily: "RocGroteskBold2",
    fontSize: 28,
  },
  subheaderContainer: {},
  subheaderText: {
    color: "rgba(255, 255, 255, 0.80)",
    fontFamily: "NotoSans",
    fontSize: 14,
    fontWeight: "400",
    opacity: 0.9,
  },
  phoneNumberInputOuterContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    width: "100%",
  },
  countryCodeDropdownOuterContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
  },
  countryCodeDropdown: {
    display: "flex",
    height: 52,
    paddingVertical: 14,
    paddingHorizontal: 14,
    justifyContent: "space-between",
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
    fontFamily: "Noto Sans",
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
  phoneNumberTextInputOuterContainer: {
    display: "flex",
    padding: 2,
    justifyContent: "center",
    alignItems: "flex-start",
    borderBottomWidth: 0.5,
    borderBottomColor: "#FFF",
    flex: 1,
    width: "70%",
  },
  phoneNumberInputText: {
    color: "#FFF",
    fontFamily: "NotoSans",
    fontSize: 20,
    fontWeight: "400",
  },
});

export default PhoneInputStep;
