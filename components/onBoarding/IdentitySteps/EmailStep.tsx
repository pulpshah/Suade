import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const EmailStep = ({ onNext }: { onNext: () => void }) => {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="example@email.com"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={email}
        onChangeText={setEmail}
        onSubmitEditing={() => email.trim() && onNext()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center" },
  input: { width: "80%", borderBottomWidth: 1, color: "#FFF" },
});

export default EmailStep;
