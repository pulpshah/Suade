import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { router } from "expo-router";

interface Message {
  id: string;
  text: string;
  sender: "system" | "user";
  showActions?: boolean;
}

interface RenderMessageProps {
  item: Message;
  onResend?: () => void;
  onChangeNumber?: () => void;
}

export default function ChatScreen() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [currentStep, setCurrentStep] = useState<'name' | 'username' | 'phone' | 'verification'>('name');
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Welcome to Suade!", sender: "system" },
  ]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [verificationCode, setVerificationCode] = useState("123456"); // For demo, in real app this would be generated

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: `${prevMessages.length + 1}`,
          text: "What's your first and last name?\nFor example: John Smith",
          sender: "system",
        },
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  
const formatPhoneNumber = (input: string): string => {
  // Remove all non-digit characters
  const cleaned = input.replace(/\D/g, '');
  
  // Format the number as XXX-XXX-XXXX
  if (cleaned.length >= 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
  
  return cleaned;
};

  const handleUsernameSelection = (selectedUsername: string) => {
    setUserName(selectedUsername);
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: `${prevMessages.length + 1}`, text: selectedUsername, sender: "user" },
      {
        id: `${prevMessages.length + 2}`,
        text: "Fantastic choice!",
        sender: "system",
      },
      {
        id: `${prevMessages.length + 3}`,
        text: "Verifying your phone number keeps your account secure.",
        sender: "system",
      },
    ]);
    setCurrentStep('phone');
  };

  const handleResendCode = () => {
    // In a real app, this would trigger a new code to be sent
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: `${prevMessages.length + 1}`,
        text: "Sent you a new 6-digit pin.",
        sender: "system",
      },
    ]);
  };

  const handleChangeNumber = () => {
    setCurrentStep('phone');
    setInput("");
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: `${prevMessages.length + 1}`,
        text: "Let's try with a different number.",
        sender: "system",
      },
    ]);
  };

  const handlePhoneVerification = (phoneNumber: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: `${prevMessages.length + 1}`, text: phoneNumber, sender: "user" },
      {
        id: `${prevMessages.length + 2}`,
        text: "Sent you a 6-digit pin.\nType it in whenever you're ready:",
        sender: "system",
        showActions: true,
      },
    ]);
    setCurrentStep('verification');
    setInput("");
  };

  const handleVerificationCode = (code: string) => {
    if (code === verificationCode) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: `${prevMessages.length + 1}`, text: code, sender: "user" },
        {
          id: `${prevMessages.length + 2}`,
          text: "Great! All verified.",
          sender: "system",
        },
      ]);
      setInput("");
      // Here you would typically proceed to the next step or complete the flow
    } else {
      setIsInvalid(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: `${prevMessages.length + 1}`, text: code, sender: "user" },
        {
          id: `${prevMessages.length + 2}`,
          text: "Incorrect code. Please try again.",
          sender: "system",
          showActions: true,
        },
      ]);
      setInput("");
    }
  };

  const handleSend = () => {
    if (currentStep === 'verification') {
      if (input.trim() && input.length === 6 && /^\d+$/.test(input)) {
        handleVerificationCode(input);
      } else {
        setIsInvalid(true);
      }
      return;
    }

    if (currentStep === 'phone') {
      // Remove any non-digit characters for validation
      const cleanedNumber = input.replace(/\D/g, '');
      if (cleanedNumber.length === 10) {
        handlePhoneVerification(input);
        setIsInvalid(false);
      } else {
        setIsInvalid(true);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: `${prevMessages.length + 1}`,
            text: "Please enter a valid 10-digit phone number",
            sender: "system",
          },
        ]);
      }
      return;
    }

    if (currentStep === 'username') {
      const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
      if (!usernameRegex.test(input)) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: `${prevMessages.length + 1}`,
            text: "Username must be 3-15 characters long and can only contain letters, numbers, and underscores.",
            sender: "system",
          },
        ]);
        setIsInvalid(true);
        return;
      }
      handleUsernameSelection(input);
      return;
    }

    if (input.trim()) {
      const invalidCharacters = /[@#$%^&*()]/;
      if (invalidCharacters.test(input)) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: `${prevMessages.length + 1}`,
            text: "Let's try again!",
            sender: "system",
          },
          {
            id: `${prevMessages.length + 2}`,
            text: "Oops! You need to type your full name separated by a space. Can't include symbols or special characters.",
            sender: "system",
          },
        ]);
        setInput("");
        setIsInvalid(true);
        return;
      }

      const nameParts = input.trim().split(" ");
      if (nameParts.length < 2) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: `${prevMessages.length + 1}`,
            text: "Let's try again!",
            sender: "system",
          },
          {
            id: `${prevMessages.length + 2}`,
            text: "Please provide both your first and last name separated by a space.",
            sender: "system",
          },
        ]);
        setInput("");
        setIsInvalid(true);
        return;
      }

      const firstName = nameParts[0];
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: `${prevMessages.length + 1}`, text: input, sender: "user" },
        {
          id: `${prevMessages.length + 2}`,
          text: `Thanks! Nice to meet you, ${firstName}.`,
          sender: "system",
        },
        {
          id: `${prevMessages.length + 3}`,
          text: "Create a username or pick a generated option:",
          sender: "system",
        },
      ]);
      setInput("");
      setIsInvalid(false);
      setCurrentStep('username');
    }
  };

  const renderMessage = ({ item }: RenderMessageProps) => (
    <View style={styles.messageWrapper}>
      {item.sender === "system" && (
        <View style={styles.systemMessageContainer}>
          <View style={styles.systemMessageBubble}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
          <Image
            source={require("@/components/HomePage/assets/images/profile1.png")}
            style={[styles.profileImage, styles.systemProfileImage]}
          />
          {item.text.includes("Create a username") && (
            <View>
              <View style={styles.optionsContainer}>
                <TouchableOpacity 
                  style={styles.optionButton}
                  onPress={() => handleUsernameSelection("aMarsh2")}
                >
                  <Text style={styles.optionText}>aMarsh2</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.optionButton}
                  onPress={() => handleUsernameSelection("alexM2232")}
                >
                  <Text style={styles.optionText}>alexM2232</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.optionButton}
                  onPress={() => handleUsernameSelection("marshA121")}
                >
                  <Text style={styles.optionText}>marshA121</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {item.showActions && (
            <View style={styles.optionsContainer}>
              <TouchableOpacity 
                style={styles.optionButton}
                onPress={handleResendCode}
              >
                <Text style={styles.optionText}>Resend 10s</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.optionButton}
                onPress={handleChangeNumber}
              >
                <Text style={styles.optionText}>Change number</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {item.sender === "user" && (
        <View style={styles.userMessageContainer}>
          <View style={styles.userMessageBubble}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
          <Image
            source={require("@/components/HomePage/assets/images/profile1.png")}
            style={[styles.profileImage, styles.userProfileImage]}
          />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>Basic info</Text>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isInvalid && styles.invalidInput]}
          placeholder={
            currentStep === 'verification'
              ? "Enter 6-digit code"
              : currentStep === 'phone' 
                ? "728-242-4567" 
                : currentStep === 'username'
                  ? "Enter your username"
                  : "ex. John Smith"
          }
          placeholderTextColor="#999"
          value={input}
          onChangeText={(text) => {
            setInput(text);
            setIsInvalid(false);
          }}
          keyboardType={currentStep === 'phone' || currentStep === 'verification' ? 'phone-pad' : 'default'}
          autoCapitalize={currentStep === 'username' ? 'none' : 'words'}
          maxLength={currentStep === 'verification' ? 6 : undefined}
        />

        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={handleSend}
        >
          <Text style={styles.sendArrow}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  backArrow: {
    fontSize: 20,
    color: "#fff",
  },
  subHeader: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 20,
  },
  chatContainer: {
    flexGrow: 1,
    paddingTop: 16,
  },
  messageWrapper: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  systemMessageContainer: {
    position: "relative",
    marginLeft: 48,
  },
  systemMessageBubble: {
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 12,
    maxWidth: "75%",
    borderWidth: 0.2,
    borderColor: "#fff",
  },
  systemProfileImage: {
    position: "absolute",
    left: -40,
    bottom: -8,
  },
  userMessageContainer: {
    position: "relative",
    alignItems: "flex-end",
    marginRight: 48,
  },
  userMessageBubble: {
    backgroundColor: "#0000",
    borderRadius: 20,
    padding: 12,
    maxWidth: "75%",
    borderWidth: 0.2,
    borderColor: "#fff",
  },
  userProfileImage: {
    position: "absolute",
    right: -40,
    bottom: -8,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageText: {
    color: "white",
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingVertical: 8,
    position: "relative",
  },
  input: {
    flex: 1,
    backgroundColor: "#222",
    borderRadius: 16,
    padding: 12,
    color: "white",
    paddingRight: 40,
    borderWidth: 2,
    borderColor: "#222",
  },
  sendButton: {
    position: "absolute",
    right: 16,
    top: "60%",
    transform: [{ translateY: -10 }],
    backgroundColor: "transparent",
  },
  sendArrow: {
    fontSize: 20,
    color: "#4D90FE",
  },
  invalidInput: {
    borderColor: "red",
  },
  optionsContainer: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-evenly",
  },
  optionButton: {
    backgroundColor: "#333",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  optionText: {
    color: "#fff",
    fontSize: 14,
  },
});