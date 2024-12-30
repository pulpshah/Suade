// app/(auth)/signup.tsx
import { View, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignup = () => {
    router.replace('/(tabs)');
  };

  return (
    <ImageBackground
      source={require('@/assets/images/Background.png')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ThemedText style={styles.logo}>suade.</ThemedText>   

          <ThemedText style={styles.title}>Create your account</ThemedText>
          <ThemedText style={styles.subtitle}>Join us! Please fill in your details.</ThemedText>

          <View style={styles.nameContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <ThemedText style={styles.label}>First Name</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="John"
                placeholderTextColor="#6B7280"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <ThemedText style={styles.label}>Last Name</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Doe"
                placeholderTextColor="#6B7280"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="john.doe@example.com"
              placeholderTextColor="#6B7280"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Password</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#6B7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Confirm Password</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#6B7280"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
              {agreeToTerms && <ThemedText style={styles.checkmark}>✓</ThemedText>}
            </View>
            <ThemedText style={styles.termsText}>
              I agree to the Terms of Service and Privacy Policy
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
            <ThemedText style={styles.signUpText}>Create Account</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={require('@/assets/images/Social icon.png')}
              style={styles.googleIcon}
            />
            <ThemedText style={styles.googleText}>Sign up with Google</ThemedText>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <ThemedText style={styles.loginText}>Already have an account?</ThemedText>
            <TouchableOpacity onPress={() => router.push('/onBoarding')}>
              <ThemedText style={styles.loginLink}>Log in</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(46, 34, 126, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 40,
    width: '100%',
    maxWidth: 400,
  },
  logo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  nameContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  checkmark: {
    width: 12,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'white',
    transform: [{ rotate: '-45deg' }],
    marginTop: -2,
  },
  termsText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  signUpButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  signUpText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#374151',
    marginRight: 4,
  },
  loginLink: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '500',
  },
});