// app/(auth)/login.tsx
import { View, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/context/auth';
export default function Login() {
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
  
    const handleLogin = () => {
      signIn(email, password); // This will now directly navigate to tabs
    };

  return (
    <ImageBackground
      source={require('@/assets/images/Background.png')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ThemedText style={styles.logo}>suade.</ThemedText>   

          <ThemedText style={styles.title}>Log in to your account</ThemedText>
          <ThemedText style={styles.subtitle}>Welcome back! Please enter your details.</ThemedText>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
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

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <ThemedText style={styles.checkmark}>✓</ThemedText>}
              </View>
              <ThemedText style={styles.rememberText}>Remember for 30 days</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/')}>
              <ThemedText style={styles.forgotPassword}>Forgot password</ThemedText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
            <ThemedText style={styles.signInText}>Sign in</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={require('@/assets/images/Social icon.png')}
              style={styles.googleIcon}
            />
            <ThemedText style={styles.googleText}>Sign in with Google</ThemedText>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <ThemedText style={styles.signupText}>Don't have an account?</ThemedText>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <ThemedText style={styles.signupLink}>Sign up</ThemedText>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    marginTop: 20,
  },
  logo: {
    fontSize: 25,
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: 'white',
    fontSize: 14,
  },
  rememberText: {
    fontSize: 14,
    color: '#374151',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  signInText: {
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#374151',
    marginRight: 4,
  },
  signupLink: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '500',
  },
});