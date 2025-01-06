import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import StarIcon from "./assets/icons/star-icon.svg";
import UserIcon from "./assets/icons/user-icon.svg";
import ClockRefreshIcon from "./assets/icons/clock-refresh-icon.svg";
import AtSign from "./assets/icons/@-icon.svg";
import RedArrow from "./assets/icons/red-arrow-icon.svg";
import WhiteArrow from "./assets/icons/white-arrow-icon.svg";
import { BlurView } from "expo-blur";

// Define the data for each step
const stepsData = [
  { step: 1, sectionName: "Identity", header: "What should we call you?", subheader: "This appears on your Suade profile.", placeholder: "example@email.com" },
  { step: 2, sectionName: "Identity", header: "Please enter a valid phone number", subheader: "Suade will send you a text with a verification code. Message and data rates may apply.", placeholder: "000 000 0000" },
  { step: 3, sectionName: "Identity", header: "What’s your date of birth?", subheader: "Suade users must be 16 years or older.", placeholder: "Enter your date of birth" },
  { step: 4, sectionName: "Identity", header: "Where are you based?", subheader: "Your location helps us connect you with others.", placeholder: "Enter your zip code and country" },
  { step: 5, sectionName: "Identity", header: "What’s your gender?", subheader: "This helps us personalize your experience.", placeholder: "Enter your gender" },
  { step: 6, sectionName: "Identity", header: "What’s your occupation?", subheader: "This helps us tailor content to you.", placeholder: "Enter your occupation" },
  { step: 7, sectionName: "Identity", header: "What’s your education level?", subheader: "Tell us about your education.", placeholder: "Enter your education level" },
  { step: 8, sectionName: "Identity", header: "What’s your favorite hobby?", subheader: "This helps us recommend activities.", placeholder: "Enter your hobby" },
];

const countryCodes = [
  { label: '+1', value: '+1' },
  { label: '+44', value: '+44' },
  { label: '+61', value: '+61' },
  { label: '+91', value: '+91' },
];

const Identity = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('+1');
  const [currentSubStep, setCurrentSubStep] = useState<"phoneInput" | "verificationInput">("phoneInput");

  const currentStep = stepsData[currentStepIndex];
  const isLastStep = currentStepIndex === stepsData.length - 1;

  const handleNext = () => {
    if (currentStepIndex === 1 && currentSubStep === "phoneInput") {
      setInputValue(""); // Clear input when transitioning to verification input
      setCurrentSubStep("verificationInput");
    } else if (currentStepIndex === 1 && currentSubStep === "verificationInput") {
      // Proceed to the next main step
      setInputValue(""); // Clear input for the next step
      setCurrentStepIndex(currentStepIndex + 1);
      setCurrentSubStep("phoneInput"); // Reset sub-step for future visits
    } else if (isLastStep) {
      onComplete();
    } else {
      setInputValue("");
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

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

  const renderHeaderAndSubheader = () => {
    if (currentStepIndex === 1 && currentSubStep === "verificationInput") {
      return {
        header: "We sent you a verification code",
        subheader: "Sent to:",
      };
    } else {
      return {
        header: currentStep.header,
        subheader: currentStep.subheader,
      };
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

    // Render input based on the current step
    const renderInputForStep = () => {
      switch (currentStep.step) {
        case 1: // Email input
          return (
            <View style={styles.inputFieldOuterContainer}>
              <View style={styles.inputFieldInnerContainer}>
                <View style={styles.atSignContainer}>
                  <AtSign />
                </View>
                <TextInput
                  style={styles.emailInputText}
                  placeholder={currentStep.placeholder}
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  value={inputValue}
                  onChangeText={setInputValue}
                />
              </View>
            </View>
          );
          case 2: // Phone number input and verification input
          return (
            <View style={styles.phoneNumberInputOuterContainer}>
              {currentSubStep === "phoneInput" ? (
                // Phone number input sub-step
                <>
                  <View style={styles.countryCodeDropdownOuterContainer}>
                    <Dropdown
                      data={countryCodes}
                      labelField="label"
                      valueField="value"
                      value={selectedCountryCode}
                      onChange={(item) => setSelectedCountryCode(item.value)}
                      style={styles.countryCodeDropdown}
                      placeholderStyle={styles.countryCodePlaceholderStyle}
                      selectedTextStyle={styles.countryCodeSelectedTextStyle}
                      containerStyle={styles.countryCodeDropdownContainer}
                      itemTextStyle={styles.countryCodeItemTextStyle}
                    />
                  </View>
                  <View style={styles.phoneNumberTextInputOuterContainer}>
                    <View style={styles.phoneNumberTextInputInnerContainer}>
                      <TextInput
                        placeholder={currentStep.placeholder}
                        style={styles.phoneNumberInputText}
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        keyboardType="phone-pad"
                        value={inputValue}
                        onChangeText={(text) => setInputValue(formatPhoneNumber(text))}
                        maxLength={12}
                      />
                    </View>
                  </View>
                </>
              ) : (
                // Verification code input sub-step
                <View style={styles.verificationInputOuterContainer}>
  <View style={styles.verificationCodeContainer}>
    {Array(6).fill("").map((_, index) => (
      <Text key={index} style={styles.verificationCodeText}>
        {inputValue[index] || "_"}
      </Text>
    ))}
  </View>
  <TextInput
    style={styles.hiddenTextInput}
    keyboardType="numeric"
    value={inputValue}
    onChangeText={(text) => {
      const sanitized = text.replace(/[^0-9]/g, ""); // Allow only numbers
      if (sanitized.length <= 6) setInputValue(sanitized); // Limit to 6 digits
    }}
    autoFocus
  />
</View>
              )}
            </View>
          );        
        case 3: // Date of birth input
          return (
            <TextInput
            style={styles.emailInputText}
            placeholder={currentStep.placeholder}
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={inputValue}
            onChangeText={setInputValue}
          />
          );
        // Add more cases as needed
        default:
          return (
            <TextInput
              placeholder={currentStep.placeholder}
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={inputValue}
              onChangeText={setInputValue}
            />
          );
      }
    };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    style={{ flex: 1 }}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ExpoLinearGradient
    colors={['#4B6897', '#EAF2EF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.outerContainer}
    >
      <View style={styles.blackOverlay}>
      {/* Frame 180 */}
      <View style={styles.innerContainer}>
        {/* Frame 198 */}
        <View style={styles.sectionNameAndProgressContainer}>
          <View style={styles.sectionNameContainer}>
            <Text style={styles.sectionNameAndProgressText}>{currentStep.sectionName}</Text>
          </View>
          <View style={styles.sectionProgressContainer}>
            <Text style={styles.sectionNameAndProgressText}>
              {currentStep.step}/{stepsData.length}
            </Text>
          </View>
        </View>

        {/* Frame 192 */}
        <View style={styles.currentSectionAndHeaderOuterContainer}>
          {/* Frame 188 */}
          <View style={styles.currentSectionIconsContainer}>
            {/* Frame 186 */}
            <ExpoLinearGradient
              colors={["#FFE8F0", "#FFCEE7", "#DC7AA1", "rgba(220, 122, 161, 0.00)"]}
              start={[0.1, 0]}
              end={[1, 1]}
              style={styles.currentIconOuterContainer}
            >
              <View style={styles.currentIconOInnerContainer}>
                <ExpoLinearGradient
                  colors={["#912F56", "#7180B9"]}
                  start={[0, 0.5]}
                  end={[1, 0.5]}
                  style={styles.currentIconImageContainer}
                >
                  <StarIcon />
                </ExpoLinearGradient>
              </View>
            </ExpoLinearGradient>
            {/* Frame 192 */}
            <View style={styles.otherIconOuterContainer}>
              <BlurView intensity={50} style={StyleSheet.absoluteFillObject} />
              <View style={styles.otherIconInnerContainer}>
                <UserIcon />
              </View>
            </View>
            {/* Frame 188 */}
            <View style={styles.otherIconOuterContainer}>
              <BlurView intensity={50} style={StyleSheet.absoluteFillObject} />
              <View style={styles.otherIconInnerContainer}>
                <ClockRefreshIcon />
              </View>
            </View>
          </View>
        </View>

        {/* Frame 197 */}
        <View style={styles.subheaderAndHeaderContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{renderHeaderAndSubheader().header}</Text>
          </View>
          <View style={styles.subheaderContainer}>
            <Text style={styles.subheaderText}>{renderHeaderAndSubheader().subheader}</Text>
          </View>
        </View>
        {renderInputForStep()}
      </View>

      {/* Next Button */}
      <View style={styles.nextButtonOuterContainer}>
  <View
    style={[
      styles.arrowContainer,
      inputValue.trim() ? styles.arrowContainerActive : styles.arrowContainerInactive,
    ]}
  >
    <TouchableOpacity
      style={styles.arrowButton}
      onPress={handleNext}
      disabled={
        currentStepIndex === 0
          ? !inputValue.trim() // Enable for any non-empty input in the first step
          : currentSubStep === "phoneInput"
          ? inputValue.trim().length < 10 // Ensure phone number is valid
          : currentSubStep === "verificationInput" && inputValue.trim().length < 6 // Ensure verification code is valid
      }
    >
      {inputValue.trim() === "" ? <RedArrow /> : <WhiteArrow />}
    </TouchableOpacity>
  </View>
</View>
      </View>
    </ExpoLinearGradient>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,

    },
    blackOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      paddingHorizontal: 16,
      justifyContent: 'space-between',
    },
    innerContainer: {
        display: "flex",
        // width: "100%",
        // paddingHorizontal: 16,
        // paddingTop: 112,
        // paddingBottom: 80,
        // marginBottom: 100,
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: "center",
        gap: 48,
        flexGrow: 1,
    },
    sectionNameAndProgressContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 40,
        marginBottom: 20,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    sectionNameContainer: {
        display: 'flex',
        flexDirection: "row",
        padding: 4,
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 12,
        alignSelf: "stretch",
        borderRadius: 2.2,
    },
    sectionNameAndProgressText: {
        color: '#FFF',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.18)',
        textShadowOffset: { width: -2.222, height: 2.222 },
        textShadowRadius: 4.444,
        fontFamily: 'NotoSans',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: undefined,
        letterSpacing: 0.3,
        opacity: 0.9,
    },
    sectionProgressContainer: {
        display: 'flex',
        flexDirection: "row",
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        borderRadius: 2.222,
        backgroundColor: 'rgba(255, 255, 255, 0.20)',
        shadowColor: 'rgba(0, 0, 0, 0.20)',
        shadowOffset: { width: 0, height: 2.2 },
        shadowOpacity: 1,
        shadowRadius: 4.444,
        backdropFilter: 'blur(13.3px)',
    },
    currentSectionAndHeaderOuterContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 48,
        justifyContent: "flex-start"
    },
    currentSectionIconsContainer: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    headerContainer: {
      alignSelf: "flex-start", // Aligns header text to the left
      width: "100%",
    },
    headerText: {
        color: 'rgba(255, 255, 255, 0.95)',
        fontFamily: 'RocGroteskBold',
        fontSize: 50,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: undefined,
        letterSpacing: 0.5,
    },
    currentIconOuterContainer: {
        display: 'flex',
        position: 'relative',
        flexDirection: "row",
        alignItems: 'flex-start',
        gap: 8,
        borderRadius: 24,
        shadowColor: 'rgba(0, 0, 0, 0.40)',
        shadowOffset: { width: 4, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 24,
    },
    currentIconOInnerContainer: {
        display: 'flex',
        flexDirection: "row",
        width: 78,
        height: 78,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        borderColor: '#EAF2EF',
        borderWidth: 1
    },
    currentIconImageContainer: {
        padding: 8,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        flex: 1,
        alignSelf: "stretch",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "rgba(234, 242, 239, 0.5)",
        shadowColor: "rgba(0, 0, 0, 0.8)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 12,
    },
    otherIconOuterContainer: {
        display: 'flex',
        position: 'relative',
        flexDirection: "row",
        alignItems: 'flex-start',
        gap: 4.5,
        opacity: 0.68,
        borderRadius: 24,
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowOffset: { width: 20, height: 0 },
        shadowRadius: 24,
        shadowOpacity: 1,
        elevation: 24,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        overflow: 'hidden',
      },
    blurContainerIcon: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.68, // Adjust the opacity to match your design
      backgroundColor: 'rgba(0, 0, 0, 0.2)', // mimic luminosity
      zIndex: -1, // Ensure blur is behind content
    },
    otherIconInnerContainer: {
        display: 'flex',
        flexDirection: "row",
        width: 56,
        height: 56,
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 17,
        borderWidth: 0.7, 
        borderColor: '#EAF2EF',
    },
    otherIconImageContainer: {
        padding: 6,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6, 
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 17,
        borderWidth: 0.7,
        borderColor: 'rgba(234, 242, 239, 0.50)',
        shadowColor: 'rgba(0, 0, 0, 0.80)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8.6,
        elevation: 12,
    },
    subheaderAndHeaderContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 20
    },
    subheaderContainer: {
    },
    subheaderText: {
        color: 'rgba(255, 255, 255, 0.80)',
        textShadowColor: 'rgba(0, 0, 0, 0.18)',
        textShadowOffset: { width: -2.222, height: 2.222 },
        textShadowRadius: 4.444,
        fontFamily: 'NotoSans',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: undefined,
        letterSpacing: 0.3,
        opacity: 0.9,
    },
    inputFieldOuterContainer: {
        display: 'flex',
        width: 342,
        padding: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#FFF',
    },
    inputFieldInnerContainer: {
      display: 'flex',
      flexDirection: "row",
      height: 50,
      alignItems: 'center', // Aligns items vertically
      gap: 10,
      alignSelf: 'stretch',
    },
    blurContainerInput: {
        // ...StyleSheet.absoluteFillObject, // Fills parent
        // backdropFilter: 'blur(12px)', // Use expo-blur for actual blur effect
    },
    atSignContainer: {
        display: 'flex',
        width: 18.5,
        height: 18,
        // paddingVertical: 2.25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 7.5,
        opacity: 0.9,
    },
    emailInputText: {
      color: '#FFF',
      fontFamily: 'NotoSans',
      fontSize: 20,
      fontWeight: '400',
      paddingVertical: 0,
      textAlignVertical: 'center', // Ensures vertical alignment
      lineHeight: 25, // Should match or slightly exceed fontSize
      marginTop: 0, // Reset any extra top margin
    },
    nextButtonOuterContainer: {
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 42,
    },
    arrowContainer: {
        display: "flex", 
        flexDirection: "row",
        width: 44,
        transform: [{ rotate: "45deg" }],
        padding: 7.661,
        justifyContent: "center",
        alignItems: "center",
        gap: 22.532,
        flexShrink: 0,
        borderRadius: 2.253,
        borderWidth: 2.253,
        borderColor: "rgba(255, 112, 114, 0.5)",
        opacity: 0.6,
        backgroundColor: "rgba(255, 112, 114, 0.25)",
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 4.506 },
        shadowOpacity: 0.25, 
        shadowRadius: 9.013,
        elevation: 4,
    },
    arrowContainerActive: {
      borderColor: "#FFF", // White border when active
      backgroundColor: 'rgba(234, 242, 239, 0.25)', // Background change when active
      opacity: 1, // Fully opaque
    },
    arrowContainerInactive: {
      borderColor: "rgba(255, 112, 114, 0.5)", // Default border color
      backgroundColor: 'rgba(255, 112, 114, 0.25)', // Default background color
      opacity: 0.6, // Slightly transparent
    },
    arrowButton: {
      transform: [{ rotate: "-45deg" }],
    },


    phoneNumberInputOuterContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 30,
      flexDirection: "row",
      width: "100%"
    },
    countryCodeDropdownOuterContainer: { 
      display: "flex",
      padding: 2,
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      alignSelf: "stretch",
    },
    countryCodeDropdown: {
      borderWidth: 0.5, 
      borderColor: 'rgba(255, 255, 255, 0.20)', 
      backgroundColor: 'rgba(234, 242, 239, 0.40)',
      padding: 10, 
      width: 100
    },
    countryCodePlaceholderStyle: {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    countryCodeSelectedTextStyle: {
      color: '#FFF', 
      fontWeight: 'bold',
      textAlign: "right"
    },
    countryCodeDropdownContainer: {
      backgroundColor: 'rgba(234, 242, 239, 0.40)'
    },
    countryCodeItemTextStyle: {
      color: '#333'
    },
    phoneNumberTextInputOuterContainer: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#FFF',
      width: "50%",
    },
    phoneNumberTextInputInnerContainer: {

    },
    phoneNumberInputText: {
      color: '#FFF',
      fontFamily: 'NotoSans',
      fontSize: 20,
      fontWeight: '400',
      paddingVertical: 0,
      textAlignVertical: 'center', // Ensures vertical alignment
      lineHeight: 25, // Should match or slightly exceed fontSize
      marginTop: 0, // Reset any extra top margin
    },


    verificationInputOuterContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 20,
    },
    verificationCodeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "80%", // Adjust width as needed
    },
    verificationCodeText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#FFF",
      textAlign: "center",
      borderBottomWidth: 2,
      borderBottomColor: "rgba(255, 255, 255, 0.7)", // Underline color
      paddingHorizontal: 8, // Adjust for spacing between characters
    },
    hiddenTextInput: {
      position: "absolute",
      opacity: 0,
      width: 1,
      height: 1,
    },

})
export default Identity;



// import { View, TextInput, StyleSheet } from "react-native";
// import react,{useEffect} from "react";
// export default function Identity({ onValidationChange }: { onValidationChange: (isValid: boolean) => void }) {
//   useEffect(() => {
//     // Assume this step is valid by default
//     onValidationChange(true);
//   }, []);
//   return (
//     <View>
//       <TextInput style={styles.input} placeholder="Gender" placeholderTextColor="#6B7280" />
//       <TextInput style={styles.input} placeholder="Occupation" placeholderTextColor="#6B7280" />
//       <TextInput style={styles.input} placeholder="Education" placeholderTextColor="#6B7280" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 1,
//     borderColor: "#6B7280",
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     color: "white",
//     marginBottom: 16,
//     backgroundColor: "#FFF",
//   },
// });
