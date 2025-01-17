import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Habits({ onComplete }: { onComplete: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Habits Placeholder</Text>
      <Button title="Next" onPress={onComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "#FFF",
    fontSize: 18,
    marginBottom: 20,
  },
});


// import { View, TextInput, StyleSheet } from "react-native";
// import React, { useEffect } from "react";
// export default function Habits({ onValidationChange }: { onValidationChange: (isValid: boolean) => void }) {
//   useEffect(() => {
//       // Assume this step is valid by default
//       onValidationChange(true);
//     }, []);
//   return (
//     <View>
//       <TextInput style={styles.input} placeholder="Daily Habit 1..." placeholderTextColor="#6B7280" />
//       <TextInput style={styles.input} placeholder="Daily Habit 2..." placeholderTextColor="#6B7280" />
//       <TextInput style={styles.input} placeholder="Favorite Activities..." placeholderTextColor="#6B7280" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 1,
//     borderColor: "#6B7280",
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     color: "white",
//     marginBottom: 16,
//     backgroundColor: "#FFF",
//   },
// });
