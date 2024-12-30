import { View, TextInput, StyleSheet } from "react-native";
import react,{useEffect} from "react";
export default function Identity({ onValidationChange }: { onValidationChange: (isValid: boolean) => void }) {
  useEffect(() => {
    // Assume this step is valid by default
    onValidationChange(true);
  }, []);
  return (
    <View>
      <TextInput style={styles.input} placeholder="Gender" placeholderTextColor="#6B7280" />
      <TextInput style={styles.input} placeholder="Occupation" placeholderTextColor="#6B7280" />
      <TextInput style={styles.input} placeholder="Education" placeholderTextColor="#6B7280" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#6B7280",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "white",
    marginBottom: 16,
    backgroundColor: "#FFF",
  },
});
