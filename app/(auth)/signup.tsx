import { View, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import SuadeLogo from "../../assets/icons/suade-logo.svg";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/auth";

export default function Signup() {
  const { signUp } = useAuth(); // Access signUp from the Auth context
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignup = () => {
    signUp(email, password); 
  };

  return (
    <ExpoLinearGradient
      colors={["#4B6897", "#455581"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.blackOverlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.outerContainer}>
            {/* Suade Logo */}
            <View style={styles.logoContainer}>
              <SuadeLogo />
            </View>

            {/* Header */}
            <ThemedText style={styles.title}>Create your account</ThemedText>
            <ThemedText style={styles.subtitle}>
              Join us! Please fill in your details.
            </ThemedText>

            {/* Name Fields */}
            <View style={styles.nameContainer}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                <ThemedText style={styles.label}>First Name</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="John"
                  placeholderTextColor="#6B7280"
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                />
              </View>

              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <ThemedText style={styles.label}>Last Name</ThemedText>
                <TextInput
                  style={styles.input}
                  placeholder="Doe"
                  placeholderTextColor="#6B7280"
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email and Password Fields */}
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Email</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="john.doe@example.com"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Password</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#6B7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Confirm Password</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#6B7280"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            {/* Terms and Conditions */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
            >
              <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
                {agreeToTerms && <ThemedText style={styles.checkmark}>✓</ThemedText>}
              </View>
              <ThemedText style={styles.termsText}>
                I agree to the Terms of Service and Privacy Policy
              </ThemedText>
            </TouchableOpacity>

            {/* Create Account Button */}
            <TouchableOpacity style={styles.createAccountOuterContainer} onPress={handleSignup}>
              <ExpoLinearGradient
                colors={["rgba(113, 128, 185, 0.8)", "rgba(234, 242, 239, 0.8)"]}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.createAccountInnerContainer}
              >
                <ThemedText style={styles.buttonText}>Create Account</ThemedText>
              </ExpoLinearGradient>
            </TouchableOpacity>

            {/* Google Sign-up Button */}
            <TouchableOpacity style={styles.googleOuterContainer}>
              <View style={styles.googleInnerContainer}>
                <Image
                  source={require("@/assets/images/Social icon.png")}
                  style={styles.googleIcon}
                />
                <ThemedText style={styles.googleText}>Sign up with Google</ThemedText>
              </View>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <ThemedText style={styles.loginText}>Already have an account?</ThemedText>
              <TouchableOpacity onPress={() => router.push("/onBoarding")}>
                <ThemedText style={styles.loginLink}>Log in</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  scrollContainer: {
    paddingBottom: 20,
  },
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "RocGroteskBold",
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.95)",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "NotoSans",
  },
  nameContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#D1D5DB",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "white",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },
  checkmark: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 14,
    color: "#D1D5DB",
    flex: 1,
  },
  createAccountOuterContainer: {
    width: "100%",
    padding: 2,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    marginBottom: 16,
  },
  createAccountInnerContainer: {
    paddingVertical: 18,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  googleOuterContainer: {
    width: "100%",
    padding: 2,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    marginBottom: 24,
  },
  googleInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
    fontFamily: "NotoSans",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#D1D5DB",
    marginRight: 4,
  },
  loginLink: {
    fontSize: 14,
    color: "#7C3AED",
    fontWeight: "500",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "NotoSans",
  },
});
