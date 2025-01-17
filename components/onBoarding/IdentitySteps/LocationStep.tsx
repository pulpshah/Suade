import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import USFlag from "../assets/icons/flags/us-flag.svg";
import CanadaFlag from "../assets/icons/flags/canada-flag.svg";
import UKFlag from "../assets/icons/flags/uk-flag.svg";
import AustraliaFlag from "../assets/icons/flags/australia-flag.svg";

interface LocationStepProps {
  zipcode: string;
  setZipcode: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
}

const LocationStep: React.FC<LocationStepProps> = ({ zipcode, setZipcode, country, setCountry }) => {
  const countries = [
    { label: "United States", value: "US", icon: <USFlag width={24} height={16} /> },
    { label: "Canada", value: "CA", icon: <CanadaFlag width={24} height={16} /> },
    { label: "United Kingdom", value: "UK", icon: <UKFlag width={24} height={16} /> },
    { label: "Australia", value: "AU", icon: <AustraliaFlag width={24} height={16} /> },
  ];

  const selectedCountry = countries.find((c) => c.value === country);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.subheaderAndHeaderContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Where are you based?</Text>
        </View>
        <View style={styles.subheaderContainer}>
          <Text style={styles.subheaderText}>This information helps us better serve you.</Text>
        </View>
      </View>

      <View style={styles.inputAndDropdownContainer}>
        {/* Zipcode Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your zipcode"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            keyboardType="numeric"
            value={zipcode}
            onChangeText={setZipcode}
            maxLength={5}
          />
        </View>

        {/* Country Dropdown */}
        <View style={styles.dropdownContainer}>
          <Dropdown
            data={countries}
            labelField="label"
            valueField="value"
            value={country}
            onChange={(item) => setCountry(item.value)}
            placeholder="Select your country"
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholderStyle}
            selectedTextStyle={styles.dropdownSelectedTextStyle}
            containerStyle={styles.dropdownDropdownContainer}
            renderLeftIcon={() => (
              <View style={styles.selectedCountryContainer}>
                {selectedCountry?.icon}
              </View>
            )}
            renderItem={(item) => (
              <View style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText}>{item.label}</Text>
                {item.icon}
              </View>
            )}
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
  subheaderContainer: {},
  subheaderText: {
    color: "rgba(255, 255, 255, 0.80)",
    fontFamily: "NotoSans",
    fontSize: 14,
    fontWeight: "400",
    opacity: 0.9,
  },
  inputAndDropdownContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    marginTop: 20,
  },
  inputContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#FFF",
    padding: 2,
    width: "100%",
  },
  inputField: {
    color: "#FFF",
    fontFamily: "NotoSans",
    fontSize: 20,
    fontWeight: "400",
    paddingVertical: 18,
  },
  dropdownContainer: {
    width: "100%",
  },
  dropdown: {
    height: 52,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: "rgba(13, 9, 10, 0.12)",
    boxShadow: "0px 0px 6.221px rgba(0, 0, 0, 0.25) inset",
    backdropFilter: "blur(12px)",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.20)",
  },
  dropdownPlaceholderStyle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "NotoSans",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  dropdownSelectedTextStyle: {
    color: "#FFF",
    fontFamily: "NotoSans",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  dropdownDropdownContainer: {
    backgroundColor: "rgba(13, 9, 10, 0.12)",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.20)",
    boxShadow: "0px 0px 6.221px rgba(0, 0, 0, 0.25) inset",
    backdropFilter: "blur(12px)",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "rgba(13, 9, 10, 0.12)",
    boxShadow: "0px 0px 6.221px rgba(0, 0, 0, 0.25) inset",
  },
  dropdownItemText: {
    color: "#FFF",
    fontFamily: "NotoSans",
    fontSize: 20,
    fontWeight: "400",
    letterSpacing: 0.3,
  },
  selectedCountryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectedCountryText: {
    color: "#FFF",
    fontFamily: "NotoSans",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});

export default LocationStep;
