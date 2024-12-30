import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type TutorialFooterProps = {
    onNext: () => void; // Define the type for onNext as a function returning void
    onSkip: () => void; // Define the type for onSkip as a function returning void
  };

export default function TutorialFooter( { onNext, onSkip }: TutorialFooterProps ) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={onSkip} style={styles.button}>
        <Text style={styles.buttonText}>Skip</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#000',
  },
  button: {
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
