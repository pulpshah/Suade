import { COLORS, TEXT_STYLES } from "@/app/styles";
import { StyleSheet, View, Text } from "react-native";

type PreviewTimeValueProps = {
    timeNumber: number;
    timeLetters: string;
};

export default function PreviewTimeValue({ timeNumber, timeLetters }: PreviewTimeValueProps) {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.selectedTimeContainer}>
                <Text style={styles.selectedTimeNumberText}>
                    {timeNumber}<Text style={styles.selectedTimeLetterText}>{timeLetters}</Text>
                </Text>
            </View>
            <View style={styles.line} />
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        marginHorizontal: -12,
    },
    selectedTimeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    selectedTimeNumberText: {
        ...TEXT_STYLES.timePickerNumber,
        color: "#FFF",
    },
    selectedTimeLetterText: {
        ...TEXT_STYLES.timePickerLetters,
        color: "#FFF",
    },
    line: {
        width: 4,
        height: 48,
        borderRadius: 9999,
        backgroundColor: COLORS.suadeShadesWhite,
        opacity: 0.6,
    },
});
