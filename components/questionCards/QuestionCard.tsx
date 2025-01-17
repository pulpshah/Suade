import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TEXT_STYLES, COLORS } from "@/app/styles";

export default function QuestionCard() {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.swipableCardContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        Question
                    </Text>
                </View>
                <View style={styles.questionTextContainer}>
                    <Text style={styles.questionText}>
                        Adults who enjoy sour candy aren’t very mature.
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 2,
        flexDirection: 'column',
        alignSelf: 'stretch',
        borderRadius: 14,
        borderWidth: 0.5,
        borderColor: COLORS.suadeShadesCardOutline
    },
    swipableCardContainer: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        alignSelf: 'stretch',
        borderRadius: 14,
        backdropFilter: 'blur(32px)',
        backgroundColor: COLORS.suadeShadesBlack
    },
    headerContainer: {
        display: 'flex',
        paddingVertical: 8,
        paddingHorizontal: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection: 'row',
    },
    headerText: {
        ...TEXT_STYLES.commentUsernameTextMedium,
        color: 'white',
    },
    questionTextContainer: {

    },
    questionText: {
        ...TEXT_STYLES.medium,
        color: 'white',
    }
})