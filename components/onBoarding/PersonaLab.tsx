import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import UserTypingBubble from "../bubbleTypes/UserTypingBubble";
import TimedNotif from "../Notif/TimedNotif";
import QuestionCard from "../questionCards/QuestionCard";
import TimePickerCard from "../questionCards/TimePickerCard";
import PrimaryLargeButton from "../Buttons/PrimaryLargeButton";

// 1) IMPORT THE MANAGER
import SwipeableCardManager from "../questionCards/SwipeableCardManager";

type Message = {
  id: string;
  sender: "system" | "user";
  text?: string;
  component?: JSX.Element;
};

export default function PersonaLab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);

  const flatListRef = useRef<FlatList>(null);
  let messageCounter = 0; // Unique message ID counter

  // 2) ADD THIS FUNCTION TO CAPTURE SWIPES
  const handleCardSwipe = (direction: "valid" | "invalid") => {
    const icon = direction === "valid" ? "✅" : "❌";
    setMessages((prev) => [
      ...prev,
      {
        id: `swipe-icon-${messageCounter++}`,
        sender: "user",
        text: icon,
      },
      {
        id: `swipe-followup-${messageCounter++}`,
        sender: "system",
        text: "Cool!",
      },
      {
        id: `swipe-followup-${messageCounter++}`,
        sender: "system",
        text: "A follow up on that question",
      },
    ]);
  };

  useEffect(() => {
    const botMessages: Message[] = [
      {
        id: "1",
        text: "Learn more about yourself while finding your bigger crowd!",
        sender: "system",
      },
      { id: "2", text: "Let's begin...", sender: "system" },
      {
        id: "3",
        text: "When do you usually wake up and begin your day?",
        sender: "system",
      },
    ];

    let delay = 1000;
    botMessages.forEach((msg, index) => {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { ...msg, id: `${msg.id}-${Date.now()}` },
        ]);
        if (index === botMessages.length - 1) {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: `widgets-${Date.now()}`,
                sender: "user",
                component: renderWidgets(),
              },
            ]);
            setIsTyping(true);
          }, 1000);
        }
      }, delay);
      delay += 1000;
    });
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderWidgets = () => {
    if (currentQuestion === 1) {
      return (
        <View style={styles.widgetContainer}>
          <TimedNotif notificationText="No need to overthink it" seconds={30} />
          <QuestionCard
            questionNumber={1}
            questionText="When do you usually wake up and begin your day?"
          />
          <TimePickerCard
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </View>
      );
    } else {
      // 3) PASS THE CALLBACK TO <SwipeableCardManager />
      return (
        <View style={styles.widgetContainer}>
          <SwipeableCardManager onSwipe={handleCardSwipe} />
        </View>
      );
    }
  };

  const handleConfirm = () => {
    if (!selectedTime) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `user-response-${messageCounter++}`,
        sender: "user",
        text: selectedTime,
        component: (
          <View style={styles.userMessageContainer}>
            <View style={styles.userMessageBubble}>
              <Text style={styles.messageText}>{selectedTime}</Text>
            </View>
            <Image
              source={require("@/components/HomePage/assets/images/profile1.png")}
              style={[styles.profileImage, styles.userProfileImage]}
            />
          </View>
        ),
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-followup-${messageCounter++}`,
          sender: "system",
          text: "Early bird!",
        },
      ]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-transition-${messageCounter++}`,
            sender: "system",
            text: "Onto the next question...",
          },
          {
            id: `bot-next-question-1-${messageCounter++}`,
            sender: "system",
            text: "Here’s an easy one... so try to be honest.",
          },
          {
            id: `bot-next-question-${messageCounter++}`,
            sender: "system",
            component: (
              <Text style={styles.messageText}>
                This time, swipe on that card to vote:{" "}
                <Text style={styles.invalidText}>Left for Invalid</Text> or{" "}
                <Text style={styles.validText}>Right for Valid</Text>
              </Text>
            ),
          },
          {
            id: `widgets-${messageCounter++}`,
            sender: "user",
            component: (
              <View style={styles.widgetContainer}>
                {/* 4) ENSURE the callback is passed HERE, too */}
                <SwipeableCardManager onSwipe={handleCardSwipe} />
              </View>
            ),
          },
        ]);
        setCurrentQuestion(2);
      }, 1000);
    }, 1500);

    setSelectedTime(null);
    setIsTyping(false);
  };

  const renderItem = ({ item }: { item: Message }) => {
    if (item.component) {
      return <View style={styles.widgetContainer}>{item.component}</View>;
    }

    return (
      <View style={styles.messageWrapper}>
        {item.sender === "system" && (
          <View style={styles.systemMessageContainer}>
            <Image
              source={require("@/components/HomePage/assets/images/profile1.png")}
              style={styles.profileImage}
            />
            <View style={styles.systemMessageBubble}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        )}
        {item.sender === "user" && (
          <View style={styles.userMessageContainer}>
            {item.text ? (
              <View style={styles.userMessageBubble}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            ) : (
              <UserTypingBubble />
            )}
            <Image
              source={require("@/components/HomePage/assets/images/profile1.png")}
              style={styles.profileImage}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.subHeader}>Persona Lab</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      {currentQuestion === 1 && (
        <View style={styles.fixedButtonContainer}>
          <PrimaryLargeButton
            buttonText={`Confirm (${selectedTime || "Select Time"})`}
            onPress={handleConfirm}
            disabled={!selectedTime}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backArrow: { fontSize: 20, color: "#fff" },
  subHeader: { fontSize: 40, color: "#fff", fontWeight: "bold" },
  chatContainer: { flexGrow: 1, paddingHorizontal: 16 },
  messageWrapper: { marginBottom: 10 },
  systemMessageContainer: { flexDirection: "row", alignItems: "center" },
  systemMessageBubble: {
    backgroundColor: "#333",
    borderRadius: 20,
    padding: 12,
    maxWidth: "75%",
    borderWidth: 0.2,
    borderColor: "#fff",
    marginLeft: 8,
  },
  userMessageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  userMessageBubble: {
    backgroundColor: "#0000",
    borderRadius: 20,
    padding: 12,
    maxWidth: "75%",
    borderWidth: 0.2,
    borderColor: "#fff",
  },
  profileImage: { width: 32, height: 32, borderRadius: 16 },
  userProfileImage: { marginLeft: 8 },
  messageText: { color: "white", fontSize: 14 },
  widgetContainer: { gap: 16, marginVertical: 10 },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    marginTop: 32,
  },
  invalidText: {
    color: "red",
    fontWeight: "bold",
  },
  validText: {
    color: "blue",
    fontWeight: "bold",
  },
});
