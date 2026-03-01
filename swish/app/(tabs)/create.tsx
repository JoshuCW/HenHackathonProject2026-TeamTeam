import { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function CreateGameScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [level, setLevel] = useState('All Levels');

  const handleCreate = () => {
    if (!title || !location || !time) {
      Alert.alert('Missing Info', 'Please fill in all required fields.');
      return;
    }
    Alert.alert('Success', 'Game created successfully!');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.header}>Create a Game</ThemedText>
        
        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Game Title</ThemedText>
          <TextInput
            style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
            placeholder="e.g. Sunday Morning Hoops"
            placeholderTextColor={colors.icon}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Location</ThemedText>
          <View style={styles.inputContainer}>
            <IconSymbol name="mappin.and.ellipse" size={20} color={colors.icon} style={styles.inputIcon} />
            <TextInput
              style={[styles.inputWithIcon, { color: colors.text }]}
              placeholder="Search for a court..."
              placeholderTextColor={colors.icon}
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
            <ThemedText style={styles.label}>Time</ThemedText>
            <TextInput
              style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
              placeholder="10:00 AM"
              placeholderTextColor={colors.icon}
              value={time}
              onChangeText={setTime}
            />
          </View>
          <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
            <ThemedText style={styles.label}>Price ($)</ThemedText>
            <TextInput
              style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
              placeholder="0.00"
              placeholderTextColor={colors.icon}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Skill Level</ThemedText>
          <View style={styles.pills}>
            {['All Levels', 'Intermediate', 'Advanced'].map((l) => (
              <TouchableOpacity
                key={l}
                style={[
                  styles.pill,
                  level === l ? { backgroundColor: colors.tint } : { borderColor: colors.icon, borderWidth: 1 }
                ]}
                onPress={() => setLevel(l)}
              >
                <ThemedText style={[
                  styles.pillText,
                  level === l ? { color: '#fff' } : { color: colors.text }
                ]}>{l}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.createButton, { backgroundColor: colors.tint }]}
          onPress={handleCreate}
        >
          <ThemedText style={styles.createButtonText}>Publish Game</ThemedText>
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
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
    fontSize: 32,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  pills: {
    flexDirection: 'row',
    gap: 10,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  pillText: {
    fontWeight: '600',
  },
  createButton: {
    marginTop: 20,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
