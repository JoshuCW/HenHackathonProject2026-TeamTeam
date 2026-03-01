import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const MOCK_CHATS = [
  { id: '1', name: 'Pickup Soccer @ Central Park', lastMessage: 'See you at 5!', time: '10:30 AM', unread: 2 },
  { id: '2', name: 'Saturday Basketball', lastMessage: 'Is the game still on?', time: 'Yesterday', unread: 0 },
  { id: '3', name: 'Team Swish', lastMessage: 'Great game everyone!', time: 'Mon', unread: 0 },
];

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Chat</ThemedText>
      <FlatList
        data={MOCK_CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.chatItem, { borderBottomColor: colors.icon }]}>
            <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
              <ThemedText style={styles.avatarText}>{item.name[0]}</ThemedText>
            </View>
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <ThemedText type="defaultSemiBold" style={styles.chatName}>{item.name}</ThemedText>
                <ThemedText style={styles.chatTime}>{item.time}</ThemedText>
              </View>
              <ThemedText style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</ThemedText>
            </View>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <ThemedText style={styles.unreadText}>{item.unread}</ThemedText>
              </View>
            )}
          </TouchableOpacity>
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
  chatItem: {
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
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
  },
  chatTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  lastMessage: {
    fontSize: 14,
    opacity: 0.8,
  },
  unreadBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
