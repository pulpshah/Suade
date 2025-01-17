import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/auth";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    signIn(email, password);
  };

  return (
    <View style={styles.gradient}>
      <View style={styles.blackOverlay}>
        <View style={styles.outerContainer}>
          {/* Back Arrow */}
          <TouchableOpacity style={styles.backArrow} onPress={() => router.push("/")}>
            <Text style={styles.backArrowText}>{"<"}</Text>
          </TouchableOpacity>

          {/* Bubble and Suade Text */}
          <View style={styles.logoAndHeaderContainer}>
            <View style={styles.bubbleWrapper}>
              <Image source={require("@/assets/images/bubble.png")} style={styles.bubbleImage} />
              <Text style={styles.suadeText}>suade</Text>
            </View>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#6B7280"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#6B7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Image
                  source={
                    passwordVisible
                      ? require("@/assets/images/eye-visible.png")
                      : require("@/assets/images/eye-hidden.png")
                  }
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.signInOuterContainer} onPress={handleLogin}>
            <View style={styles.signInInnerContainer}>
              <Text style={styles.buttonText}>Log in</Text>
            </View>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    backgroundColor: "#000000",
  },
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backArrow: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backArrowText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  logoAndHeaderContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  bubbleWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  bubbleImage: {
    width: 250,
    height: 150,
    resizeMode: "contain",
  },
  suadeText: {
    position: "absolute",
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  input: {
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    padding: 12,
    fontSize: 16,
    color: "white",
    borderRadius: 8,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "white",
  },
  eyeButton: {
    padding: 12,
  },
  eyeIcon: {
    width: 25,
    height: 18,
    tintColor: "#FFFFFF",
  },
  signInOuterContainer: {
    width: "100%",
    marginBottom: 16,
    borderRadius: 8,
  },
  signInInnerContainer: {
    backgroundColor: "rgba(13, 9, 10, 0.4)",
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    boxShadow: "0px 0px 6.221px 0px rgba(0, 0, 0, 0.25) inset",
    backdropFilter: "blur(12px)",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#FFFF",
    marginTop: 12,
  },
});
