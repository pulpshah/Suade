import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import XIcon from "./assets/icons/x-icon.svg";

const Header = () => {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity 
        onPress={() => router.push('/')} 
        style={styles.iconContainer}
        accessibilityLabel="Close"
      >
        <XIcon width={15} height={15} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Create Post</Text>
      </View>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#000',
  },
  iconContainer: {
    width: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  placeholder: {
    width: 50,
  },
});

export default Header;