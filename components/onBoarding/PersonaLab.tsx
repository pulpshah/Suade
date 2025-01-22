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
import CoffeePicker from "./CoffeePicker";
import ValidBubble from "../bubbleTypes/ValidBubble";
import InvalidBubble from "../bubbleTypes/InvalidBubble";
import ChevronLeftIcon from "@/assets/icons/chevron-left-icon.svg";
import ThirdPersonBubble from "../bubbleTypes/ThirdPersonBubble";
import UserMessageBubble from "../bubbleTypes/UserMessageBubble";
import { TEXT_STYLES } from "@/app/styles";

type Message = {
  id: string;
  sender: "system" | "user";
  text?: string;
  type?: string;
  questionNumber?: number;
  component?: React.ReactNode;
};

export default function PersonaLab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [selectedPublication, setSelectedPublication] = useState<string | null>(null);

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
    // Determine which component to use based on the swipe direction
    const BubbleComponent = direction === "valid" ? <ValidBubble /> : <InvalidBubble />;
  
    setMessages((prev) => [
      ...prev,
      {
        id: `swipe-bubble-${messageCounter++}-${Date.now()}`,
        sender: "user",
        component: BubbleComponent, // Use the respective bubble component
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
                <ThirdPersonBubble>
                  <Text style={styles.instructionsText}>
                    This time, swipe on that card:{" "}
                    <Text style={styles.invalidText}>Left for Invalid</Text>{" "}
                    or <Text style={styles.validText}>Right for Valid</Text>.
                  </Text>
                </ThirdPersonBubble>
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
if (currentQuestion === 4) {
  setTimeout(() => {
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-next-question-${messageCounter++}-${Date.now()}`,
        sender: "system",
        text: "How many cups of coffee do you drink each day?",
      },
      {
        id: `coffee-picker-${messageCounter++}`,
        sender: "user",
        type: "coffeePicker",
      },
    ]);
    setCurrentQuestion(5);
  }, 1000);
}
  };

const renderItem = ({ item }: { item: Message }) => {
  if (item.type === "coffeePicker") {
    return (
      <View style={styles.widgetContainer}>
        <QuestionCard
          questionNumber={4}
          questionText="How many cups of coffee do you drink each day?"
        />
        <CoffeePicker
          onConfirm={(numCups) => {
            setMessages((prev) => [
              ...prev,
              {
                id: `coffee-response-${messageCounter++}-${Date.now()}`,
                sender: "user",
                text: `I drink ${numCups} cup${numCups !== 1 ? "s" : ""} of coffee.`,
              },
              {
                id: `bot-next-${messageCounter++}-${Date.now()}`,
                sender: "system",
                text: "Thanks for sharing! Let's continue...",
              },
              {
                id: `options-card-${messageCounter++}-${Date.now()}`,
                sender: "system",
                type: "optionsCard",
                questionNumber: 5,
                text: "How quickly do you read incoming emails?",
              },
            ]);
            setCurrentQuestion(5);
          }}
        />
      </View>
    );
  }
  
  if (item.type === "optionsCard") {
    if (item.questionNumber === 3) {
      return (
        <View style={styles.widgetContainer}>
          <QuestionCard
            questionNumber={3}
            questionText="Which notifications are you most tempted to tap on first?"
          />
          <OptionsCard
            options={[
              { id: "a", label: "Organizational apps (e.g. Google Calendar, Notion)" },
              { id: "b", label: "News apps (e.g. BBC, NYT, Wall Street Journal)" },
              { id: "c", label: "Adults who enjoy sour candy aren't very mature." },
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

              setTimeout(() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: `bot-next-question-${messageCounter++}-${Date.now()}`,
                    sender: "system",
                    text: "Next up for the coffee lovers:",
                  },
                  {
                    id: `coffee-picker-${messageCounter++}-${Date.now()}`,
                    sender: "user",
                    type: "coffeePicker",
                  },
                ]);
                setCurrentQuestion(4);
              }, 1000);
            }}
          />
        </View>
      );
    } else if (item.questionNumber === 5) {
      return (
        <View style={styles.widgetContainer}>
          <QuestionCard
            questionNumber={5}
            questionText="How quickly do you read incoming emails?"
          />
          <OptionsCard
            options={[
              { id: "a", label: "Immediately upon receiving them" },
              { id: "b", label: "Within a few hours" },
              { id: "c", label: "After a while" },
            ]}
            maxSelections={1}
            onConfirm={(selectedOptions) => {
              setMessages((prev) => [
                ...prev,
                {
                  id: `options-response-${messageCounter++}-${Date.now()}`,
                  sender: "user",
                  text: `Selected: ${selectedOptions.join(", ")}`,
                },
                {
                  id: `bot-next-${messageCounter++}-${Date.now()}`,
                  sender: "system",
                  text: "Thanks for sharing! Let's move on...",
                },
                {
                  id: `options-card-${messageCounter++}-${Date.now()}`,
                  sender: "system",
                  type: "optionsCard",
                  questionNumber: 6,
                  text: "Which of these publications would you most likely choose?",
                },
              ]);
              setCurrentQuestion(6);
            }}
          />
        </View>
      );
    } else if (item.questionNumber === 6) {
      return (
        <View style={styles.widgetContainer}>
          <QuestionCard
            questionNumber={6}
            questionText="Which of these publications would you most likely choose?"
          />
          <OptionsCard
            options={[
              { id: "a", label: "NYT" },
              { id: "b", label: "Washington Post" },
              { id: "c", label: "Forbes" },
            ]}
            maxSelections={1}
            onConfirm={(selectedLabels) => {
              const selectedPub = selectedLabels[0]; // Assuming maxSelections is 1
              setSelectedPublication(selectedPub);
            
              setMessages((prev) => [
                ...prev,
                {
                  id: `options-response-${messageCounter++}-${Date.now()}`,
                  sender: "user",
                  text: `Selected: ${selectedPub}`,
                },
                {
                  id: `bot-next-${messageCounter++}-${Date.now()}`,
                  sender: "system",
                  text: "Next question coming up...",
                },
              ]);
            
              setTimeout(() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: `question-7-${messageCounter++}-${Date.now()}`,
                    sender: "system",
                    type: "optionsCard",
                    questionNumber: 7,
                    text: `Someone shares information they read on ${selectedPub}. What are you likely to do with this information?`,
                  },
                ]);
                setCurrentQuestion(7);
              }, 1000);
            }}
          />
        </View>
      );
    } else if (item.questionNumber === 7) {
      return (
        <View style={styles.widgetContainer}>
          <QuestionCard
            questionNumber={7}
            questionText={`Someone shares information they read on ${selectedPublication}. What are you likely to do with this information?`}
          />
          <OptionsCard
            options={[
              { id: "a", label: "Believe that person" },
              { id: "b", label: "Question it and fact-check on other sites" },
            ]}
            maxSelections={1}
            onConfirm={(selectedOptions) => {
              setMessages((prev) => [
                ...prev,
                {
                  id: `options-response-${messageCounter++}-${Date.now()}`,
                  sender: "user",
                  text: `Selected: ${selectedOptions[0]}`,
                },
                {
                  id: `bot-next-${messageCounter++}-${Date.now()}`,
                  sender: "system",
                  text: "Thanks for your input! Moving on...",
                },
              ]);
              setCurrentQuestion(8);
            }}
          />
        </View>
      );
    }
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
                  item.questionNumber === 2 ? `${selectedTime}s` : selectedTime
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
        <View>
          <SwipeableCardManager onSwipe={handleCardSwipe} />
        </View>
      );
    }
  
    const isBubbleComponent =
    React.isValidElement(item.component) &&
    (item.component.type === ValidBubble || item.component.type === InvalidBubble);

  // Text-based user messages
  if (item.sender === "user" && item.text) {
    return (
      <View style={styles.userMessageContainer}>
        <UserMessageBubble messageText={item.text} />
        <Image
          source={require("@/components/HomePage/assets/images/profile1.png")}
          style={[styles.profileImage, styles.userProfileImage]}
        />
      </View>
    );
  }
  // Text-based system messages (bot)
  if (item.sender === "system" && item.text) {
    return (
      <View style={styles.systemMessageContainer}>
        <Image
          source={require("@/components/HomePage/assets/images/profile1.png")}
          style={styles.profileImage}
        />
        <ThirdPersonBubble>{item.text}</ThirdPersonBubble>
      </View>
    );
  }

  if (item.component) {
    const isThirdPersonBubble = React.isValidElement(item.component) && item.component.type === ThirdPersonBubble;

    return (
        <View style={styles.messageWrapper}>
            {item.sender === "system" && (
                <View style={styles.systemMessageContainer}>
                    <Image
                        source={require("@/components/HomePage/assets/images/profile1.png")}
                        style={styles.profileImage}
                    />
                    {isThirdPersonBubble ? (
                        item.component // Render `ThirdPersonBubble` directly
                    ) : (
                        <View style={styles.systemMessageBubble}>{item.component}</View>
                    )}
                </View>
            )}

            {item.sender === "user" && (
                <View style={styles.userMessageContainer}>
                    {item.component}
                    <Image
                        source={require("@/components/HomePage/assets/images/profile1.png")}
                        style={[styles.profileImage, styles.userProfileImage]}
                    />
                </View>
            )}
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
        <TouchableOpacity style={styles.backArrowContainer} onPress={() => router.back()}>
          <ChevronLeftIcon width={8} height={16} />
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
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backArrowContainer: { 
    width: 32,
    height: 32,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  subHeader: { 
    ...TEXT_STYLES.onboardingTitle,
    color: '#FFFFFF',
    textShadowColor: '#1F1F1F3D',
    textShadowRadius: 6,
  },
  chatContainer: { 
    flexGrow: 1, 
    padding: 12,
  },
  messageWrapper: { 
    marginBottom: 4 
  },
  systemMessageContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: 4,
    gap: 8,
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
    marginTop: 10,
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
  instructionsText: {
    ...TEXT_STYLES.medium,
    color: "white",
    flexWrap: "wrap",
    width: "100%",
  },
  invalidText: {
    ...TEXT_STYLES.medium,
    color: '#FFA3A5',
  },
  validText: {
    ...TEXT_STYLES.medium,
    color: '#B5EDFD'
  },
});