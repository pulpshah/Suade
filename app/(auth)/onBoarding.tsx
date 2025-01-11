import React, { useState } from "react";
import { router } from "expo-router";
import Identity from "@/components/onBoarding/Identity";
import Preferences from "@/components/onBoarding/Preferences";
import Habits from "@/components/onBoarding/Habits";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace("/(tutorial)/intro");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Identity onComplete={handleNextStep} />;
      case 1:
        return <Preferences onComplete={handleNextStep} />;
      case 2:
        return <Habits onComplete={handleNextStep} />;
      default:
        return null;
    }
  };

  return <>{renderStep()}</>;
}





// import React, { useState } from "react";
// import { router } from 'expo-router';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
//   Text,
//   Dimensions,
// } from "react-native";
// import { ThemedText } from "@/components/ThemedText";
// import Registration from "@/components/onBoarding/Registration";
// import Identity from "@/components/onBoarding/Identity";
// import Preferences from "@/components/onBoarding/Preferences";
// import Habits from "@/components/onBoarding/Habits";

// export default function Onboarding() {
//   const steps = ["Registration", "Identity", "Preferences", "Habits"];
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//       setIsCurrentStepValid(false);
//     } else {
//       router.push('/login');
//       console.log("Onboarding complete!");
      
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//       setIsCurrentStepValid(true);
//     }
//   };

//   const handleValidationChange = (isValid: boolean): void => {
//     setIsCurrentStepValid(isValid);
//   };
  

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return <Registration onValidationChange={handleValidationChange} />;
//       case 1:
//         return <Identity onValidationChange={handleValidationChange}/>;
//       case 2:
//         return <Preferences onValidationChange={handleValidationChange}/>;
//       case 3:
//         return <Habits onValidationChange={handleValidationChange}/>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1 }}
//     >
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <View style={styles.container}>
//           <ThemedText style={styles.logo}>suade.</ThemedText>
//           <View style={styles.progressContainer}>
//             {steps.map((step, index) => (
//               <View key={index} style={styles.progressStep}>
//                 <View
//                   style={[
//                     styles.progressBox,
//                     currentStep === index && styles.progressBoxActive,
//                   ]}
//                 />
//                 <View
//                   style={[
//                     styles.labelBox,
//                     currentStep === index && styles.labelBoxActive,
//                   ]}
//                 >
//                   <ThemedText
//                     style={[
//                       styles.progressLabel,
//                       currentStep === index && styles.progressLabelActive,
//                     ]}
//                   >
//                     {step}
//                   </ThemedText>
//                 </View>
//               </View>
//             ))}
//           </View>
//           {renderStep()}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={styles.backButton}
//               onPress={handleBack}
//               disabled={currentStep === 0}
//             >
//               <ThemedText style={styles.backButtonText}>Back</ThemedText>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.nextButton,
//                 !isCurrentStepValid && styles.nextButtonDisabled,
//               ]}
//               onPress={handleNext}
//               disabled={!isCurrentStepValid}
//             >
//               <ThemedText style={styles.nextButtonText}>
//                 {currentStep === steps.length - 1 ? "Finish" : "Next"}
//               </ThemedText>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#000",
//   },
//   logo: {
//     fontSize: 25,
//     fontWeight: "700",
//     color: "white",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   progressContainer: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   progressStep: {
//     alignItems: "center",
//     marginHorizontal: 5,
//   },
//   progressBox: {
//     width: 40,
//     height: 40,
//     backgroundColor: "transparent",
//     borderWidth: 1,
//     borderColor: "#6B7280",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   progressBoxActive: {
//     width: 50,
//     height: 50,
//     borderColor: "#FFFFFF",
//   },
//   labelBox: {
//     marginTop: 4,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderWidth: 1,
//     borderColor: "#6B7280",
//     borderRadius: 4,
//   },
//   labelBoxActive: {
//     borderColor: "#FFFFFF",
//   },
//   progressLabel: {
//     color: "#9CA3AF",
//     fontSize: 12,
//     textAlign: "center",
//   },
//   progressLabelActive: {
//     color: "#FFFFFF",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 24,
//   },
//   backButton: {
//     borderWidth: 1,
//     borderColor: "#9CA3AF",
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     backgroundColor: "transparent",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 20,
//   },
//   backButtonText: {
//     color: "#9CA3AF",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   nextButton: {
//     borderWidth: 1,
//     borderColor: "#FFFFFF",
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     backgroundColor: "transparent",
//     alignItems: "center",
//     justifyContent: "center",
//     marginLeft: 20,
//   },
//   nextButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   nextButtonDisabled: {
//     opacity: 0.5,
//     borderColor: "#9CA3AF",
//   },
// });