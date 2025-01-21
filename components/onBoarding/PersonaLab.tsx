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
import SwipeableCardManager from "../questionCards/SwipeableCardManager";
import OptionsCard from "./optionsCard";

type Message = {
  id: string;
  sender: "system" | "user";
  text?: string;
  type?: string;
  questionNumber?: number;
};

export default function PersonaLab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);

  const flatListRef = useRef<FlatList>(null);
  let messageCounter = 0;

  const scrollWithDelay = (delay: number = 100) => {
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: 200,
        animated: true,
      });
    }, delay);
  };

  const handleCardSwipe = (direction: "valid" | "invalid") => {
    const icon = direction === "valid" ? "✅" : "❌";

    setMessages((prev) => [
      ...prev,
      {
        id: `swipe-icon-${messageCounter++}-${Date.now()}`,
        sender: "user",
        text: icon,
      },
      {
        id: `swipe-followup-${messageCounter++}-${Date.now()}`,
        sender: "system",
        text: "Cool!",
      },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `swipe-followup-${messageCounter++}`,
          sender: "system",
          text: "A follow-up on that question",
        },
      ]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `swipe-questioncard-${messageCounter++}`,
              sender: "system",
              type: "timePickerCard",
              questionNumber: 2,
            },
          ]);
        }, 500);
      }, 500);
    }, 1000);
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
        setMessages((prev) => [...prev, { ...msg, id: `${msg.id}-${Date.now()}` }]);
        if (index === botMessages.length - 1) {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: `widgets-${Date.now()}`,
                sender: "user",
                type: "timePickerCard",
                questionNumber: 1,
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

  const handleConfirm = () => {
    if (!selectedTime) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `user-response-${messageCounter++}-${Date.now()}`,
        sender: "user",
        text: currentQuestion === 2 ? `${selectedTime}` : selectedTime,
      },
    ]);

    if (currentQuestion === 1) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-followup-${messageCounter++}-${Date.now()}`,
            sender: "system",
            text: "Early bird!",
          },
        ]);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-transition-${messageCounter++}-${Date.now()}`,
              sender: "system",
              text: "Onto the next question...",
            },
            {
              id: `bot-next-question-1-${messageCounter++}-${Date.now()}`,
              sender: "system",
              text: "Here's an easy one... so try to be honest.",
            },
            {
              id: `bot-next-question-${messageCounter++}-${Date.now()}`,
              sender: "system",
              component: (
                <Text style={styles.messageText}>
                  This time, swipe on that card:{" "}
                  <Text style={styles.invalidText}>Left for Invalid</Text> or{" "}
                  <Text style={styles.validText}>Right for Valid</Text>.
                </Text>
              ),
            },
            {
              id: `widgets-${messageCounter++}`,
              sender: "user",
              type: "swipeableCard",
            },
          ]);
          setCurrentQuestion(2);
        }, 1000);
      }, 1500);
    } 
    else if (currentQuestion === 2) 
      {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-followup-${messageCounter++}-${Date.now()}`,
            sender: "system",
            text: "Cool!",
          },
        ]);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-next-${messageCounter++}-${Date.now()}`,
              sender: "system",
              text: "Next up:",
            },
          ]);
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: `timed-notif-${messageCounter++}-${Date.now()}`,
                sender: "system",
                type: "timedNotif",
              },
              {
                id: `question-card-${messageCounter++}-${Date.now()}`,
                sender: "system",
                type: "optionsCard",
                questionNumber: 3,
              },
            ]);
            setCurrentQuestion(3);
        }, 1000);
      }, 1000);
      }, 500);
    }
    if (currentQuestion === 3) {
      console.log("Adding optionsCard to messages"); 
    setTimeout(() => {
    setMessages((prev) => [
      ...prev,
      {
        id: `options-card-${messageCounter++}-${Date.now()}`,
        sender: "system",
        type: "optionsCard",
      },
    ]);
  }, 1000);
}

    setSelectedTime(null);
    setIsTyping(false);
  };

  const renderItem = ({ item }: { item: Message }) => {
    if (item.type === "timedNotif") {
      return (
        <View style={styles.widgetContainer}>
          <TimedNotif notificationText="No need to overthink it" seconds={30} />
        </View>
      );
    }
  
    // For QuestionCard type
    if (item.type === "questionCard") {
      return (
        <View style={styles.widgetContainer}>
          <QuestionCard
            questionNumber={item.questionNumber || 1}
            questionText={
              item.questionNumber === 1
                ? "When do you usually wake up and begin your day?"
                : item.questionNumber === 2
                ? "If yes, how much time do you spend on your phone before starting your day?"
                : "Which two notifications are you most tempted to tap on first?"
            }
          />
        </View>
      );
    }
    if (item.type === "optionsCard") {
      return (
        <View style={styles.widgetContainer}>
          <OptionsCard
            options={[
              { id: "a", label: "Organizational apps (e.g. Google Calendar, Notion)" },
              { id: "b", label: "News apps (e.g. BBC, NYT, Wall Street Journal)" },
              { id: "c", label: "Adults who enjoy sour candy aren’t     very mature." },
              { id: "d", label: "Social media apps (e.g. Instagram, Facebook, Twitter)" },
            ]}
            maxSelections={2}
            onConfirm={(selectedOptions) => {
              setMessages((prev) => [
                ...prev,
                {
                  id: `options-response-${messageCounter++}-${Date.now()}`,
                  sender: "user",
                  text: `Selected: ${selectedOptions.join(", ")}`,
                },
              ]);
            }}
          />
        </View>
      );
    }
    
    if (item.type === "timePickerCard") {
      return (
        <View style={styles.widgetContainer}>
          <TimedNotif notificationText="No need to overthink it" seconds={30} />
          <QuestionCard
            questionNumber={item.questionNumber || 1}
            questionText={
              item.questionNumber === 1
                ? "When do you usually wake up and begin your day?"
                : item.questionNumber === 2
                ? "If yes, how much time do you spend on your phone before starting your day?"
                : "Which two notifications are you most tempted to tap on first?"
            }
          />
          <TimePickerCard
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            mode={item.questionNumber === 2 ? "minutes" : "hour"}
          />
          {selectedTime && (
            <View style={styles.confirmButtonContainer}>
              <PrimaryLargeButton
                buttonText={`Confirm (${
                  item.questionNumber === 2 
                    ? `${selectedTime}s` 
                    : selectedTime
                })`}
                onPress={handleConfirm}
                disabled={!selectedTime}
              />
            </View>
          )}
        </View>
      );
    }

    if (item.type === "swipeableCard") {
      return (
        <View style={styles.widgetContainer}>
          <SwipeableCardManager onSwipe={handleCardSwipe} />
        </View>
      );
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
              style={[styles.profileImage, styles.userProfileImage]}
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
          <Text style={styles.backArrow}>{"<"}</Text>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000" 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backArrow: { 
    fontSize: 20, 
    color: "#fff" 
  },
  subHeader: { 
    fontSize: 40, 
    color: "#fff", 
    fontWeight: "bold" 
  },
  chatContainer: { 
    flexGrow: 1, 
    paddingHorizontal: 16 
  },
  messageWrapper: { 
    marginBottom: 10 
  },
  systemMessageContainer: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
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
  profileImage: { 
    width: 32, 
    height: 32, 
    borderRadius: 16 
  },
  userProfileImage: { 
    marginLeft: 8 
  },
  messageText: { 
    color: "white", 
    fontSize: 14 
  },
  widgetContainer: { 
    gap: 16, 
    marginVertical: 10 
  },
  confirmButtonContainer: {
    marginTop: 16,
    alignSelf: "center",
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