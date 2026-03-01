import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Image, 
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
type Competitiveness = 'Casual' | 'Moderate' | 'Competitive' | 'Very Competitive';

export default function RegisterScreen() {
  const [profileUri, setProfileUri] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('Intermediate');
  const [competitiveness, setCompetitiveness] = useState<Competitiveness>('Moderate');
  const [pricePerGame, setPricePerGame] = useState('');
  
  const skillLevels: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];
  const competitivenessLevels: Competitiveness[] = ['Casual', 'Moderate', 'Competitive', 'Very Competitive'];

  const pickImage = async () => {
    // request permission
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Permission to access camera roll is required!');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileUri(result.assets[0].uri);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateDOB = (dob: string) => {
    // Check format YYYY-MM-DD
    return /^\d{4}-\d{2}-\d{2}$/.test(dob);
  };

  const submit = () => {
    // Validation
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    if (!dob.trim() || !validateDOB(dob)) {
      Alert.alert('Error', 'Please enter date of birth in format YYYY-MM-DD');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    if (!pricePerGame.trim() || isNaN(Number(pricePerGame))) {
      Alert.alert('Error', 'Please enter a valid price per game');
      return;
    }

    // Log the profile data
    console.log({
      profileUri,
      name,
      bio,
      dob,
      email,
      phone,
      skillLevel,
      competitiveness,
      pricePerGame,
    });
    
    Alert.alert('Success', 'Profile registered successfully!');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="title" style={styles.header}>
          Register Profile
        </ThemedText>

        <View style={styles.imageContainer}>
          {profileUri ? (
            <Image source={{ uri: profileUri }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <ThemedText style={styles.placeholderText}>No Photo</ThemedText>
            </View>
          )}
          <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
            <ThemedText style={styles.photoButtonText}>
              {profileUri ? 'Change Photo' : 'Add Photo'}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Personal Information
          </ThemedText>
          
          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
          
          <TextInput
            style={[styles.input, styles.bioInput]}
            placeholder="Bio (Tell us about yourself)"
            placeholderTextColor="#999"
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (YYYY-MM-DD) *"
            placeholderTextColor="#999"
            value={dob}
            onChangeText={setDob}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Email *"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Phone Number *"
            placeholderTextColor="#999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Default Filters
          </ThemedText>
          
          <ThemedText style={styles.label}>Skill Level</ThemedText>
          <View style={styles.optionsContainer}>
            {skillLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.optionButton,
                  skillLevel === level && styles.optionButtonSelected
                ]}
                onPress={() => setSkillLevel(level)}
              >
                <ThemedText
                  style={[
                    styles.optionText,
                    skillLevel === level && styles.optionTextSelected
                  ]}
                >
                  {level}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          <ThemedText style={styles.label}>Competitiveness</ThemedText>
          <View style={styles.optionsContainer}>
            {competitivenessLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.optionButton,
                  competitiveness === level && styles.optionButtonSelected
                ]}
                onPress={() => setCompetitiveness(level)}
              >
                <ThemedText
                  style={[
                    styles.optionText,
                    competitiveness === level && styles.optionTextSelected
                  ]}
                >
                  {level}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          <ThemedText style={styles.label}>Price per Game ($) *</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="e.g., 25.00"
            placeholderTextColor="#999"
            value={pricePerGame}
            onChangeText={setPricePerGame}
            keyboardType="decimal-pad"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={submit}>
          <ThemedText style={styles.submitButtonText}>
            Create Profile
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  placeholderText: {
    fontSize: 12,
    opacity: 0.6,
  },
  photoButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  photoButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    marginTop: 12,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  bioInput: {
    height: 100,
    paddingTop: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  optionButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
