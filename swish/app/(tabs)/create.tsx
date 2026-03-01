import { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, ScrollView, Alert, Image, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

// Define Post type
export type Post = {
  id: number;
  x: number;
  y: number;
  sport: string;
  level: string;
  indoor: boolean;
  free: boolean;
  title: string;
  location: string;
  time: string;
  price: string;
};

const postListeners: Array<(post: Post) => void> = [];
export function addPostListener(listener: (post: Post) => void) {
  postListeners.push(listener);
}
export function notifyNewPost(post: Post) {
  postListeners.forEach(l => l(post));
}
let POSTS: Post[] = [];

export default function CreateGameScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [level, setLevel] = useState('All Levels');
  const [meetupPoint, setMeetupPoint] = useState<{x: number, y: number} | null>(null);

  const handleMapPress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    setMeetupPoint({ x: locationX, y: locationY });
  };

  const handleCreate = () => {
    if (!title || !location || !time || !meetupPoint) {
      Alert.alert('Missing Info', 'Please fill in all required fields and select a meetup point on the map.');
      return;
    }
    // Add post to shared array and notify listeners
    const newPost = {
      id: Date.now(),
      x: meetupPoint.x,
      y: meetupPoint.y,
      sport: 'Basketball', // Replace with actual form value if available
      level,
      indoor: false, // Replace with actual form value if available
      free: true, // Replace with actual form value if available
      title,
      location,
      time,
      price,
    };
    POSTS.push(newPost);
    notifyNewPost(newPost);
    Alert.alert('Success', `Game created at (${meetupPoint.x.toFixed(0)}, ${meetupPoint.y.toFixed(0)})!`);
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

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Select Meetup Point</ThemedText>
          <View style={styles.mapContainer}>
            <Pressable onPress={handleMapPress} style={{ flex: 1 }}>
              <Image
                source={require('../../assets/images/maps.png')}
                style={styles.mapImage}
                resizeMode="cover"
              />
              {meetupPoint && (
                <View style={{
                  position: 'absolute',
                  left: meetupPoint.x - 12,
                  top: meetupPoint.y - 12,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: colors.tint,
                  borderWidth: 2,
                  borderColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <IconSymbol name="mappin" size={16} color="#fff" />
                </View>
              )}
            </Pressable>
          </View>
          <ThemedText style={{ color: colors.icon, marginTop: 8 }}>
            {meetupPoint && typeof meetupPoint.x === 'number' && typeof meetupPoint.y === 'number'
              ? `Selected point: (${meetupPoint.x.toFixed(0)}, ${meetupPoint.y.toFixed(0)})`
              : 'Tap the map to select a meetup point.'}
          </ThemedText>
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
  mapContainer: {
    width: '100%',
    aspectRatio: 1.2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#eee',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
