import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CreateNav = ({ 
  selectedScreen, 
  setSelectedScreen 
}: {
  selectedScreen: 'Post' | 'Take';
  setSelectedScreen: (screen: 'Post' | 'Take') => void;
}) => {
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity
        style={[
          styles.navButton,
          selectedScreen === 'Post' && styles.selectedNavButton,
        ]}
        onPress={() => setSelectedScreen('Post')}
      >
        <Text
          style={[
            styles.navText,
            selectedScreen === 'Post' && styles.selectedNavText,
          ]}
        >
          Post
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navButton,
          selectedScreen === 'Take' && styles.selectedNavButton,
        ]}
        onPress={() => setSelectedScreen('Take')}
      >
        <Text
          style={[
            styles.navText,
            selectedScreen === 'Take' && styles.selectedNavText,
          ]}
        >
          Take
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 1.5,
    marginHorizontal: 4,
    backgroundColor: 'transparent',
  },
  selectedNavButton: {
    backgroundColor: 'rgba(234, 242, 239, 0.25)',
  },
  navText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedNavText: {
    color: '#FFF',
  },
});

export default CreateNav;
