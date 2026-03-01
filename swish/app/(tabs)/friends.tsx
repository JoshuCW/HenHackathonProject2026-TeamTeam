import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

const MOCK_FRIENDS = [
  { id: '1', name: 'Alex Johnson', status: 'Online', mutual: 12 },
  { id: '2', name: 'Sarah Williams', status: 'In a game', mutual: 5 },
  { id: '3', name: 'Mike Brown', status: 'Offline', mutual: 8 },
  { id: '4', name: 'Emily Davis', status: 'Online', mutual: 15 },
];

export default function FriendsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Friends</ThemedText>
      
      <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.secondary }]}>
        <IconSymbol name="person.badge.plus" size={20} color="#fff" />
        <ThemedText style={styles.addButtonText}>Find Friends</ThemedText>
      </TouchableOpacity>

      <FlatList
        data={MOCK_FRIENDS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.friendItem, { borderBottomColor: colors.icon }]}>
            <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
              <ThemedText style={styles.avatarText}>{item.name[0]}</ThemedText>
            </View>
            <View style={styles.friendInfo}>
              <ThemedText type="defaultSemiBold" style={styles.name}>{item.name}</ThemedText>
              <ThemedText style={styles.status}>{item.status} • {item.mutual} mutual friends</ThemedText>
            </View>
            <TouchableOpacity style={[styles.messageButton, { borderColor: colors.secondary }]}>
              <IconSymbol name="bubble.left" size={20} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 20,
    fontSize: 28,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  friendInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
  },
  status: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  messageButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
});
