import { COLORS } from "@/app/styles";
import { StyleSheet, View } from "react-native";

export default function SelectedValue() {
    return (
        <View style={styles.selectedValue} />
    );
}

const styles = StyleSheet.create({
    selectedValue: {
        width: 4,
        height: 80,
        flexShrink: 0,
        borderRadius: 1,
        backgroundColor: COLORS.suadeShadesWhite,
        boxShadow: '0px 0px 6px 0px #282828'
    },

})
