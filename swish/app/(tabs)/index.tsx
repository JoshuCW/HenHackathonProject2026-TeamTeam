import { Image, StyleSheet, Platform, FlatList, TouchableOpacity, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useFilter } from './filter';

const MOCK_GAMES = [
  {
    id: '1',
    title: '5v5 Basketball Run',
    location: 'Central Park Courts',
    time: 'Today, 5:00 PM',
    spots: '3 spots left',
    price: '$10',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ee2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFza2V0YmFsbHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '2',
    title: 'Soccer Pickup',
    location: 'Riverside Field',
    time: 'Tomorrow, 10:00 AM',
    spots: '5 spots left',
    price: '$12',
    level: 'All Levels',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29jY2VyfGVufDB8fDB8fHww',
  },
  {
    id: '3',
    title: 'Indoor Volleyball',
    location: 'Community Center',
    time: 'Sat, 2:00 PM',
    spots: '2 spots left',
    price: '$15',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1612872087720-48ca45b08811?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dm9sbGV5YmFsbHxlbnwwfHwwfHx8MA%3D%3D',
  },
];

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface FilterState {
  selectedSports: string[];
  skillLevel: SkillLevel | 'Any';
  // other fields...
}

export default function DiscoverScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const filter = useFilter();

  const filteredGames = filter ? MOCK_GAMES.filter(game => {
    const sportMatch = filter.selectedSports.length === 0 || filter.selectedSports.some(sport => game.title.toLowerCase().includes(sport.toLowerCase()));
    const levelMatch = filter.skillLevel === 'Any' || game.level === filter.skillLevel;
    // You can add indoorOnly and freeOnly logic if your data supports it
    return sportMatch && levelMatch;
  }) : MOCK_GAMES;

  return (
    <ThemedView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <View style={styles.welcomeRow}>
              <ThemedText type="title">Discover Games</ThemedText>
              <HelloWave />
            </View>
            <ThemedText style={styles.subtitle}>Find your next game nearby</ThemedText>
            
            <View style={[styles.searchBar, { backgroundColor: colors.background === '#151718' ? '#2A2A2A' : '#f0f0f0' }]}>
              <IconSymbol name="magnifyingglass" size={20} color={colors.icon} />
              <ThemedText style={[styles.searchText, { color: colors.icon }]}>Search location or sport...</ThemedText>
            </View>
          </View>
        )}
        data={filteredGames}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <ThemedText type="subtitle" style={styles.cardTitle}>{item.title}</ThemedText>
                <ThemedText style={[styles.price, { color: colors.secondary }]}>{item.price}</ThemedText>
              </View>
              
              <View style={styles.infoRow}>
                <IconSymbol name="mappin.and.ellipse" size={16} color={colors.icon} />
                <ThemedText style={styles.infoText}>{item.location}</ThemedText>
              </View>
              
              <View style={styles.infoRow}>
                <IconSymbol name="clock" size={16} color={colors.icon} />
                <ThemedText style={styles.infoText}>{item.time}</ThemedText>
              </View>

              <View style={styles.footer}>
                <View style={[styles.badge, { backgroundColor: colors.tint + '20' }]}>
                  <ThemedText style={[styles.badgeText, { color: colors.tint }]}>{item.level}</ThemedText>
                </View>
                <ThemedText style={[styles.spots, { color: item.spots.includes('2') ? '#FF3B30' : colors.icon }]}>
                  {item.spots}
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingTop: 60,
  },
  headerContainer: {
    marginBottom: 24,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchText: {
    opacity: 0.7,
  },
  card: {
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
  },
  price: {
    fontWeight: '700',
    fontSize: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  infoText: {
    opacity: 0.8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontWeight: '600',
    fontSize: 12,
  },
  spots: {
    fontSize: 12,
    fontWeight: '500',
  },
});
