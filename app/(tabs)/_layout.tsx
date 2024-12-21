import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => <TabBarBackground />, // Use custom gradient background
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          height: 80,
          elevation: 0, // Remove shadows on Android
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'New',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <View style={styles.centerTab}>
              <IconSymbol size={28} name="chevron.left.forwardslash.chevron.right" color="#fff" style={{transform: [{ rotate: '-45deg' }]}}/>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="test1"
        options={{
          title: 'Abcd',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="test2"
        options={{
          title: 'Efgy',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerTab: {
    width: 60,
    height: 60,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    transform: [{ rotate: '45deg' }], // Diamond shape
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80, // Match tab bar height
  },
});

// Custom Gradient Background
function TabBarBackground() {
  return (
    <LinearGradient
      colors={['transparent', 'black']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.75 }}  
      style={styles.gradientBackground}
    />
  );
}
