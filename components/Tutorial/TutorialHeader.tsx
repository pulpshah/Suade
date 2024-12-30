import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type HeaderProps = {
  showBackButton: boolean;
  onBackPress?: () => void;
};

export default function Header({ showBackButton, onBackPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.logo}>suade.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(13, 9, 10, 0.6)', // Matches header background
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  logo: {
    fontSize: 36, // Exact size as per the design
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -1,
    textTransform: 'lowercase',
  },
});
