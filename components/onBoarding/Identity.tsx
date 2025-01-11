import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from "react-native";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import RedArrow from "./assets/icons/red-arrow-icon.svg";
import WhiteArrow from "./assets/icons/white-arrow-icon.svg";
import StarIcon from "./assets/icons/star-icon.svg";
import UserIcon from "./assets/icons/user-icon.svg";
import ClockRefreshIcon from "./assets/icons/clock-refresh-icon.svg";
import { BlurView } from "expo-blur";
import UserStep from "./IdentitySteps/UserStep";
import PhoneInputStep from "./IdentitySteps/PhoneInputStep";
import PhoneVerificationStep from "./IdentitySteps/PhoneVerificationStep";
import DOBStep from "./IdentitySteps/DOBStep";
import LocationStep from "./IdentitySteps/LocationStep";
import GenderStep from "./IdentitySteps/GenderStep";
import OccupationStep from "./IdentitySteps/OccupationStep";
import EducationStep from "./IdentitySteps/EducationStep";

const Identity = ({ onComplete }: { onComplete: () => void }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [dob, setDob] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");

  const handleNext = () => {
    if (currentStepIndex === 0 && username.trim() && firstName.trim() && lastName.trim()) {
      setCurrentStepIndex(1);
    } else if (currentStepIndex === 1 && phoneNumber.replace(/\s/g, "").length === 10) {
      setCurrentStepIndex(2);
    } else if (currentStepIndex === 2 && verificationCode.trim().length === 6) {
      setCurrentStepIndex(3);
    } else if (currentStepIndex === 3 && dob.replace(/\s/g, "").length === 8) {
      setCurrentStepIndex(4);
    } else if (currentStepIndex === 4 && zipcode.trim() && country) {
      setCurrentStepIndex(5);
    } else if (currentStepIndex === 5 && gender) {
      setCurrentStepIndex(6);
    } else if (currentStepIndex === 6 && occupation) {
      setCurrentStepIndex(7);
    } else if (currentStepIndex === 7 && education) {
      onComplete();
    }
  };
  
  const renderStep = () => {
    switch (currentStepIndex) {
      case 0:
        return (
          <UserStep
            username={username}
            setUsername={setUsername}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
          />
      );
      case 1:
        return <PhoneInputStep phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />;
      case 2:
        return (
          <PhoneVerificationStep
            phoneNumber={phoneNumber}
            inputValue={verificationCode}
            setInputValue={setVerificationCode}
            onChangeNumber={() => setCurrentStepIndex(1)}
          />
        );
      case 3:
        return <DOBStep dob={dob} setDob={setDob} />;
      case 4:
        return <LocationStep zipcode={zipcode} setZipcode={setZipcode} country={country} setCountry={setCountry} />;
      case 5:
        return <GenderStep gender={gender} setGender={setGender} />;
      case 6:
        return <OccupationStep occupation={occupation} setOccupation={setOccupation} />;
      case 7:
        return <EducationStep education={education} setEducation={setEducation} />;
      default:
        return null;
    }
  };
  
  // if (showIntro) {
  //   return (
  //     <KeyboardAvoidingView
  //       behavior={Platform.OS === "ios" ? "padding" : undefined}
  //       style={{ flex: 1 }}
  //     >
  //       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  //         <ExpoLinearGradient
  //           colors={["#4B6897", "#455581"]}
  //           start={{ x: 0, y: 0 }}
  //           end={{ x: 1, y: 1 }}
  //           style={styles.introScreenGradient}
  //         >
  //           <View style={styles.introScreenBlackOverlay}>
  //             <View style={styles.starIconOutermostContainer}>
  //               <View style={styles.starIconOuterContainer}>
  //                 <View style={styles.starIconInnerContainer}>
  //                   <View style={styles.imageOuterContainer}>
  //                     <ExpoLinearGradient
  //                       colors={["#912F56", "#7180B9"]}
  //                       start={{ x: 0, y: 0.5 }}
  //                       end={{ x: 1, y: 0.5 }}
  //                       style={styles.imageInnerContainer}
  //                     >
  //                       <StarIcon width={101} height={101} />
  //                     </ExpoLinearGradient>
  //                   </View>
  //                 </View>
  //               </View>
  //             </View>
  
  //             {/* Arrow Button */}
  //             <View style={styles.nextButtonOuterContainer}>
  //               <View style={[styles.arrowContainer, styles.arrowContainerActive]}>
  //                 <TouchableOpacity onPress={() => setShowIntro(false)} style={styles.arrowButton}>
  //                   <WhiteArrow />
  //                 </TouchableOpacity>
  //               </View>
  //             </View>
  //           </View>
  //         </ExpoLinearGradient>
  //       </TouchableWithoutFeedback>
  //     </KeyboardAvoidingView>
  //   );
  // }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ExpoLinearGradient
          colors={["#4B6897", "#EAF2EF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.outerContainer}
        >
          <View style={styles.blackOverlay}>
            {/* Section Name and Progress */}
            <View style={styles.sectionNameAndProgressContainer}>
              <View style={styles.sectionNameContainer}>
                <Text style={styles.sectionNameAndProgressText}>Identity</Text>
              </View>
              <View style={styles.sectionProgressContainer}>
                <Text style={styles.sectionNameAndProgressText}>
                  {currentStepIndex + 1}/8
                </Text>
              </View>
            </View>

            {/* Icons */}
            <View style={styles.currentSectionIconsContainer}>
              <ExpoLinearGradient
                colors={["#FFE8F0", "#FFCEE7", "#DC7AA1", "rgba(220, 122, 161, 0.00)"]}
                start={{ x: 0.8, y: 0 }}
                end={{ x: 0, y: 1 }}
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

              <BlurView
                style={[StyleSheet.absoluteFill, styles.blurContainer, styles.otherIconOuterContainer]}
                intensity={40}
                tint="light"
              >
                <View style={styles.otherIconInnerContainer}>
                  <UserIcon />
                </View>
              </BlurView>

              <BlurView
                style={[StyleSheet.absoluteFill, styles.blurContainer, styles.otherIconOuterContainer]}
                intensity={40}
                tint="light"
              >
                <View style={styles.otherIconInnerContainer}>
                  <ClockRefreshIcon />
                </View>
              </BlurView>
            </View>

            {renderStep()}

            <View style={styles.flexGrowSpacer} />

            <View style={styles.nextButtonOuterContainer}>
              <View
                style={[
                  styles.arrowContainer,
                  (currentStepIndex === 0 && (username.trim() && firstName.trim() && lastName.trim())) ||
                  (currentStepIndex === 1 && phoneNumber.replace(/\s/g, "").length === 10) ||
                  (currentStepIndex === 2 && verificationCode.trim().length === 6) ||
                  (currentStepIndex === 3 && dob.replace(/\s/g, "").length === 8) ||
                  (currentStepIndex === 4 && zipcode.trim() && country) ||
                  (currentStepIndex === 5 && gender) ||
                  (currentStepIndex === 6 && occupation) ||
                  (currentStepIndex === 7 && education)
                    ? styles.arrowContainerActive
                    : styles.arrowContainerInactive,
                ]}
              >
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={handleNext}
                  disabled={
                    (currentStepIndex === 0 && (!username.trim() || !firstName.trim() || !lastName.trim())) ||
                    (currentStepIndex === 1 && phoneNumber.replace(/\s/g, "").length !== 10) ||
                    (currentStepIndex === 2 && verificationCode.trim().length !== 6) ||
                    (currentStepIndex === 3 && dob.replace(/\s/g, "").length !== 8) ||
                    (currentStepIndex === 4 && (!zipcode.trim() || !country)) ||
                    (currentStepIndex === 5 && !gender) ||
                    (currentStepIndex === 6 && !occupation) ||
                    (currentStepIndex === 7 && !education)
                  }
                >
                  {(currentStepIndex === 0 && (!username.trim() || !firstName.trim() || !lastName.trim())) ||
                  (currentStepIndex === 1 && phoneNumber.replace(/\s/g, "").length !== 10) ||
                  (currentStepIndex === 2 && verificationCode.trim().length !== 6) ||
                  (currentStepIndex === 3 && dob.replace(/\s/g, "").length !== 8) ||
                  (currentStepIndex === 4 && (!zipcode.trim() || !country)) ||
                  (currentStepIndex === 5 && !gender) ||
                  (currentStepIndex === 6 && !occupation) ? (
                    <RedArrow />
                  ) : (
                    <WhiteArrow />
                  )}
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
  introScreenGradient: {
    flex: 1,
  },
  introScreenBlackOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  starIconOutermostContainer: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 72
  },
  starIconOuterContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 18
  },
  starIconInnerContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: 18
  },
  imageOuterContainer: {
    display: "flex",
    width: 180,
    height: 180,
    padding: 9.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 55,
    borderWidth: 2.3,
    borderColor: "#EAF2EF",
  },
  imageInnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 55,
    borderWidth: 2.3,
    borderColor: "rgba(234, 242, 239, 0.50)",
  },
  introArrowContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  introArrowButton: {
    transform: [{ rotate: "-45deg" }],
    borderRadius: 2.25,
    borderWidth: 2.25,
    borderColor: "#FFF",
    backgroundColor: "rgba(234, 242, 239, 0.25)",
    padding: 7.661,
  },
  outerContainer: {
    flex: 1,
  },
  blackOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    paddingHorizontal: 16,
    gap: 50,
    paddingBottom: 36,
  },
  sectionNameAndProgressContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionNameContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 4,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
    alignSelf: "stretch",
    borderRadius: 2.2,
  },
  sectionNameAndProgressText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "NotoSans",
    fontSize: 12,
    fontWeight: "600",
    opacity: 0.9,
  },
  sectionProgressContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2.2,
    backgroundColor: "rgba(255, 255, 255, 0.20)",
  },
  currentSectionIconsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    justifyContent: "center",
  },
  currentIconOuterContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 24,
    shadowColor: "rgba(0, 0, 0, 0.40)",
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 10,
  },
  currentIconOInnerContainer: {
    display: "flex",
    flexDirection: "row",
    width: 78,
    height: 78,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    borderColor: "#EAF2EF",
    borderWidth: 1,
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: 17,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  },
  blurContainer: {
    position: "relative",
    width: 56,
    height: 56,
    borderRadius: 17,
    overflow: "hidden",
  },
  otherIconInnerContainer: {
    display: "flex",
    flexDirection: "row",
    width: 56,
    height: 56,
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17,
    borderWidth: 0.7,
    borderColor: "#EAF2EF",
    zIndex: 1,
  },
  flexGrowSpacer: {
    flex: 1,
  },
  nextButtonOuterContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  arrowContainer: {
    display: "flex",
    flexDirection: "row",
    width: 44,
    transform: [{ rotate: "45deg" }],
    padding: 7.661,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2.25,
    borderWidth: 2.25,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 4.506 },
    shadowOpacity: 0.25,
    shadowRadius: 9,
  },
  arrowContainerActive: {
    borderColor: "#FFF",
    backgroundColor: "rgba(234, 242, 239, 0.25)",
  },
  arrowContainerInactive: {
    borderColor: "rgba(255, 112, 114, 0.5)",
    backgroundColor: "rgba(255, 112, 114, 0.25)",
  },
  arrowButton: {
    transform: [{ rotate: "-45deg" }],
  },
});

export default Identity;
