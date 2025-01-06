import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const PhoneInputStep = ({ onNext }: { onNext: (phone: string) => void }) => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  return (
    <View style={styles.container}>
      <Dropdown
        data={[{ label: "+1", value: "+1" }, { label: "+44", value: "+44" }]}
        value={countryCode}
        onChange={(item) => setCountryCode(item.value)}
        style={styles.dropdown}
      />
      <TextInput
        style={styles.input}
        placeholder="000 000 0000"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        onSubmitEditing={() => phone.length >= 10 && onNext(`${countryCode} ${phone}`)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 10 },
  dropdown: { width: 80 },
  input: { flex: 1, borderBottomWidth: 1, color: "#FFF" },
});

export default PhoneInputStep;
