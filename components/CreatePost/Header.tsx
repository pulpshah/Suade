import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo Vector Icons
import { useRouter } from 'expo-router';

const Header = () => {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => router.push('/(tabs)/explore')} style={styles.iconContainer}>
        <Ionicons name="close" size={24} color="#fff" /> {/* X Icon */}
      </TouchableOpacity>
      <Text style={styles.headerText}>Create Post</Text>
      <View style={styles.placeholder} /> {/* Placeholder to balance alignment */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'space-between', // Space out elements in the container
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#000',
  },
  iconContainer: {
    width: 50, // Reserve space for alignment
    alignItems: 'flex-start', // Align icon to the start of the container
  },
  headerText: {
    flex: 1, // Take up the remaining space
    textAlign: 'center', // Center the text within the available space
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  placeholder: {
    width: 50, // Placeholder to balance the layout
  },
});

export default Header;
