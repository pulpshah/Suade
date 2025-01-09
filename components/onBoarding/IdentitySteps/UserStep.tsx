import React, { useEffect } from "react";
import { LayoutAnimation, View, Text, TextInput, StyleSheet } from "react-native";
import AtSign from "../assets/icons/@-icon.svg";

interface UserStepProps {
  username: string;
  setUsername: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
}

const UserStep: React.FC<UserStepProps> = ({
  username,
  setUsername,
  firstName,
  setFirstName,
  lastName,
  setLastName,
}) => {
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  return (
    <View style={styles.outerContainer}>
      {/* Header and Subheader */}
      <View style={styles.subheaderAndHeaderContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>What should we call you?</Text>
        </View>
        <View style={styles.subheaderContainer}>
          <Text style={styles.subheaderText}>This appears on your Suade profile.</Text>
        </View>
      </View>

      {/* Input Field */}
      <View style={styles.inputFieldOuterContainer}>
        <View style={styles.inputFieldInnerContainer}>
          <View style={styles.atSignContainer}>
            <AtSign />
          </View>
          <TextInput
            style={styles.userInputText}
            placeholder="nickname"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputFieldInnerContainer}>
          <TextInput
            style={styles.userInputText}
            placeholder="First name"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputFieldInnerContainer}>
          <TextInput
            style={styles.userInputText}
            placeholder="Last name"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
      </View>
    </View>
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
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: undefined,
    letterSpacing: 0.5,
  },
  subheaderContainer: {},
  subheaderText: {
    color: "rgba(255, 255, 255, 0.80)",
    textShadowColor: "rgba(0, 0, 0, 0.18)",
    textShadowOffset: { width: -2.22, height: 2.22 },
    textShadowRadius: 4.444,
    fontFamily: "NotoSans",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    letterSpacing: 0.3,
    opacity: 0.9,
  },
  inputFieldOuterContainer: {
    marginTop: 20,
    display: "flex",
    width: "100%",
    padding: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  inputFieldInnerContainer: {
    display: "flex",
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    gap: 10,
    alignSelf: "stretch",
    borderBottomWidth: 0.5,
    borderBottomColor: "#FFF",
  },
  atSignContainer: {
    display: "flex",
    width: 18.5,
    height: 18,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
  },
  userInputText: {
    color: "#FFF",
    fontFamily: "NotoSans",
    fontSize: 20,
    fontWeight: "400",
    paddingVertical: 0,
    textAlignVertical: "center",
    lineHeight: 25,
    marginTop: 0,
  },
});

export default UserStep;
