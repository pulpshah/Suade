import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const DOBStep = ({ onNext }: { onNext: () => void }) => {
  const [dob, setDob] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="MM/DD/YYYY"
        keyboardType="numeric"
        value={dob}
        onChangeText={setDob}
        onSubmitEditing={() => dob.length === 10 && onNext()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  input: { borderBottomWidth: 1, width: "80%", color: "#FFF" },
});

export default DOBStep;
