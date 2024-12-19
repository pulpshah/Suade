import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            height: 80,
          },
          default: {
            backgroundColor: '#000', // Dark background
            height: 80,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'New',
          tabBarIcon: ({ color }) => (
            <View style={styles.centerTab}>
              <IconSymbol size={28} name="plus" color="#fff" />
            </View>
          ),
          tabBarButton: (props) => (
            <View style={styles.centerTabContainer}>
              <HapticTab {...props} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="test1"
        options={{
          title: 'Abcd',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="test2"
        options={{
          title: 'Efgy',
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
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
  },
  centerTabContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    zIndex: 10,
  },
});
