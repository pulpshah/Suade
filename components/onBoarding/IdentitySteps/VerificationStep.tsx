import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const VerificationStep = ({ onNext, phoneNumber }: { onNext: () => void; phoneNumber: string }) => {
  const [code, setCode] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Code sent to {phoneNumber}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={code}
        onChangeText={setCode}
        onSubmitEditing={() => code.length === 6 && onNext()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  infoText: { color: "#FFF", marginBottom: 20 },
  input: { borderBottomWidth: 1, width: "60%", color: "#FFF" },
});

export default VerificationStep;
