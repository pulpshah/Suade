import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import TutorialHeader from '@/components/Tutorial/TutorialHeader';
import Header from '@/components/HomePage/Header';

export default function Intro() {
    const router = useRouter();

    return (
      <ImageBackground
        source={require('@/assets/images/Frame 154.png')}
        style={styles.background}
        blurRadius={10} 
      >
        {/* Header */}
        <Header
          showBackButton={false}
          onBackPress={() => router.push('/(tabs)')} 
        />
        {/* Main Content */}
        <View style={styles.container}>
          <View style={styles.contentCenter}>
            <Text style={styles.title}>Welcome to suade!</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)')}>
              <LinearGradient
                colors={['#DC7AA1', '#EAF2EF']}
                locations={[0, 0.8]}
                style={styles.tutorialButton}
              >
                <Text style={styles.buttonText}>Tutorial</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
          <View style={styles.footerButtons}>
            <TouchableOpacity 
              style={styles.footerButton} 
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.footerButtonText}>Back</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => router.push('/(tabs)')}>
              <LinearGradient
                colors={['#7180B9', '#EAF2EF']}
                locations={[0, 0.8]}
                style={styles.footerButton}
              >
                <Text style={styles.footerButtonText}>Later</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
  
  const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      width: '100%',
    },
    contentCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 35,
      color: '#FFFFFF',
      fontWeight: 'bold',
      marginBottom: 30,
    },
    tutorialButton: {
      borderRadius: 0,
      paddingVertical: 15,
      paddingHorizontal: 60,
      marginBottom: 20,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: '500',
    },
    footerButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingBottom: 34, 
    },
    footerButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 0,
    },
    footerButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '500',
    },
  });