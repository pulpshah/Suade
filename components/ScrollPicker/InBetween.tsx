import { COLORS } from "@/app/styles";
import { StyleSheet, View } from "react-native";

export default function InBetween() {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.diamondContainer}>
                <View style={styles.diamond} />
            </View>
            <View style={styles.line} />
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        width: 4,
        height: 38,
        gap: 2,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
    },
    diamondContainer: {
        width: 4,
        height: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    diamond: {
        width: 4,
        height: 4,
        transform: [{ rotate: "45deg" }], // Rotate to make it a diamond
        backgroundColor: COLORS.suadeShadesWhite, // Same color as the line
        borderRadius: .4,
        opacity: 0.3,
    },
    line: {
        width: 4,
        height: 32,
        borderRadius: 9999, // Rounded corners for the line
        backgroundColor: COLORS.suadeShadesWhite, // Same color as the diamond
        opacity: 0.3,
    },
});
