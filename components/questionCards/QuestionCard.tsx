import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TEXT_STYLES, COLORS } from "@/app/styles";

// Define props type
type QuestionCardProps = {
    questionNumber: number,
    questionText: string;
};

export default function QuestionCard({ questionNumber, questionText }: QuestionCardProps) {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.swipableCardContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Question {questionNumber}</Text>
                </View>
                <View style={styles.questionTextContainer}>
                    <Text style={styles.questionText}>{questionText}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 2,
        flexDirection: "column",
        alignSelf: "stretch",
        borderRadius: 14,
        borderWidth: 0.5,
        borderColor: COLORS.suadeShadesCardOutline,
    },
    swipableCardContainer: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 12,
        flexDirection: "column",
        alignItems: "flex-end",
        alignSelf: "stretch",
        borderRadius: 14,
        backgroundColor: COLORS.suadeShadesBlack,
        paddingBottom: 16,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        paddingVertical: 8,
    },
    headerText: {
        ...TEXT_STYLES.commentUsernameTextMedium,
        color: "white",
    },
    questionTextContainer: {
        alignSelf: "stretch",
    },
    questionText: {
        ...TEXT_STYLES.medium,
        color: "white",
    },
});
