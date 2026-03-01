import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    // Simulate login
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
      <ThemedText style={styles.subtitle}>Sign in to find games near you</ThemedText>

      <TextInput
        style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
        placeholder="Email"
        placeholderTextColor={colors.icon}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
        placeholder="Password"
        placeholderTextColor={colors.icon}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: colors.tint }]}
        onPress={handleLogin}
      >
        <ThemedText style={styles.buttonText}>Sign In</ThemedText>
      </TouchableOpacity>

      <Link href="/signup" style={styles.link}>
        <ThemedText style={styles.linkText}>Don't have an account? <ThemedText style={{color: colors.tint, fontWeight: 'bold'}}>Sign Up</ThemedText></ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.7,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    textAlign: 'center',
  },
});
