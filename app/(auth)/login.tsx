import { View, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import SuadeLogo from "../../assets/icons/suade-logo.svg";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/auth";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    signIn(email, password);
  };

  return (
    <ExpoLinearGradient
      colors={["#4B6897", "#455581"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.blackOverlay}>
        <View style={styles.outerContainer}>
          {/* Suade Logo */}
          <View style={styles.logoContainer}>
            <SuadeLogo />
          </View>

          {/* Header */}
          <ThemedText style={styles.title}>Log in to your account</ThemedText>
          <ThemedText style={styles.subtitle}>
            Welcome back! Please enter your details.
          </ThemedText>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
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

          {/* Options */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <ThemedText style={styles.checkmark}>✓</ThemedText>}
              </View>
              <ThemedText style={styles.rememberText}>Remember for 30 days</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/")}>
              <ThemedText style={styles.forgotPassword}>Forgot password</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity style={styles.signInOuterContainer} onPress={handleLogin}>
            <ExpoLinearGradient
              colors={[
                "rgba(113, 128, 185, 0.8)",
                "rgba(234, 242, 239, 0.8)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signInInnerContainer}
            >
              <ThemedText style={styles.buttonText}>Sign in</ThemedText>
            </ExpoLinearGradient>
          </TouchableOpacity>

          {/* Google Sign-in Button */}
          <TouchableOpacity style={styles.googleOuterContainer}>
            <View style={styles.googleInnerContainer}>
              <Image
                source={require("@/assets/images/Social icon.png")}
                style={styles.googleIcon}
              />
              <ThemedText style={styles.googleText}>Sign in with Google</ThemedText>
            </View>
          </TouchableOpacity>

          {/* Signup Link */}
          <View style={styles.signupContainer}>
            <ThemedText style={styles.signupText}>Don't have an account?</ThemedText>
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <ThemedText style={styles.signupLink}>Sign up</ThemedText>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "RocGroteskBold",
    color: "rgba(255, 255, 255, 0.95)",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    fontFamily: "NotoSans",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
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
    padding: 12,
    fontSize: 16,
    color: "white",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
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
  },
  rememberText: {
    fontSize: 14,
    color: "#D1D5DB",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#7C3AED",
    fontWeight: "500",
  },
  signInOuterContainer: {
    width: "100%",
    padding: 2,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 16,
  },
  signInInnerContainer: {
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
    fontFamily: "NotoSans"
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  signupText: {
    fontSize: 14,
    color: "#D1D5DB",
    marginRight: 4,
  },
  signupLink: {
    fontSize: 14,
    color: "#7C3AED",
    fontWeight: "500",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "NotoSans"
  },
});