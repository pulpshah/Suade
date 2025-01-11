import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import SuadeLogo from "../../assets/icons/suade-logo.svg";

export default function Landing() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <ExpoLinearGradient
        colors={["#4B6897", "#455581"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.blackOverlay}>
          <View style={styles.logoCenteredContainer}>
            <SuadeLogo />
          </View>
        </View>
      </ExpoLinearGradient>
    );
  }

  return (
    <ExpoLinearGradient
      colors={["#4B6897", "#455581"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.blackOverlay}>
        <View style={styles.outerContainer}>
          <View style={styles.logoAndHeaderContainer}>
            <View style={styles.logoContainer}>
              <SuadeLogo />
            </View>
            <Text style={styles.headerText}>What's your take?</Text>
          </View>
          <View style={styles.buttonContainer}>
            {/* Create Account Button */}
            <TouchableOpacity
              onPress={() => router.push("/signup")}
              style={styles.createAccountOuterContainer}
            >
              <ExpoLinearGradient
                colors={[
                  "rgba(113, 128, 185, 0.8)",
                  "rgba(234, 242, 239, 0.8)",
                ]}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.createAccountInnerContainer}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </ExpoLinearGradient>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={() => router.push("/login")}
              style={styles.signInOuterContainer}
            >
              <View style={styles.signInInnerContainer}>
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ExpoLinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  blackOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  outerContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 12,
  },
  logoCenteredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoAndHeaderContainer: {
    alignItems: "center",
    gap: 16,
  },
  logoContainer: {},
  headerText: {
    fontFamily: "RocGroteskBold",
    fontSize: 20,
    fontStyle: "normal",
    letterSpacing: 0.5,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.95)",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  buttonWrapper: {
    width: "100%",
    overflow: "hidden",
    marginVertical: 10,
  },
  gradientButton: {
    paddingVertical: 18,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountOuterContainer: {
    display: "flex",
    padding: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    alignSelf: "stretch",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.20)",
    marginVertical: 10,
  },
  createAccountInnerContainer: {
    paddingVertical: 18,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  signInOuterContainer: {
    display: "flex",
    padding: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    alignSelf: "stretch",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.20)",
    marginVertical: 10,
  },
  signInInnerContainer: {
    display: "flex",
    paddingVertical: 18,
    paddingHorizontal: 14,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
    backgroundColor: "rgba(13, 9, 10, 0.40)",
    boxShadow: "0px 0px 6.221px 0px rgba(0, 0, 0, 0.25) inset",
    backdropFilter: "blur(12px)",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    letterSpacing: 0.3,
    fontFamily: "NotoSans",
  },
});
