import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type SkillLevel = 'Any' | 'Beginner' | 'Intermediate' | 'Advanced';

const sports = [
  'Basketball',
  'Soccer',
  'Tennis',
  'Volleyball',
  'Running',
  'Swimming',
  'Cycling',
  'Baseball',
] as const;

const levels: SkillLevel[] = ['Any', 'Beginner', 'Intermediate', 'Advanced'];

export default function FilterScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [selectedSports, setSelectedSports] = useState<string[]>(['Basketball', 'Soccer']);
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('Any');
  const [indoorOnly, setIndoorOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);

  const selectedSportsText = useMemo(() => {
    if (selectedSports.length === 0) {
      return 'No sports selected';
    }
    return selectedSports.join(', ');
  }, [selectedSports]);

  const toggleSport = (sport: string) => {
    setSelectedSports((current: string[]) => {
      if (current.indexOf(sport) !== -1) {
        return current.filter((item: string) => item !== sport);
      }
      return [...current, sport];
    });
  };

  const clearFilters = () => {
    setSelectedSports([]);
    setSkillLevel('Any');
    setIndoorOnly(false);
    setFreeOnly(false);
  };

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Sports Filters
          </ThemedText>
          <ThemedText style={styles.subtitle}>Pick sports and preferences</ThemedText>
        </View>

        <View style={styles.card}>
          <ThemedText style={styles.sectionTitle}>Sports</ThemedText>
          <View style={styles.chipsWrap}>
            {sports.map((sport) => {
              const isSelected = selectedSports.indexOf(sport) !== -1;
              return (
                <Pressable
                  key={sport}
                  onPress={() => toggleSport(sport)}
                  style={[styles.chip, isSelected && styles.chipSelected]}>
                  <ThemedText style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                    {sport}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <ThemedText style={styles.sectionTitle}>Skill Level</ThemedText>
          <View style={styles.levelRow}>
            {levels.map((level) => {
              const active = skillLevel === level;
              return (
                <Pressable
                  key={level}
                  onPress={() => setSkillLevel(level)}
                  style={[styles.levelButton, active && styles.levelButtonActive]}>
                  <ThemedText style={[styles.levelText, active && styles.levelTextActive]}>
                    {level}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <ThemedText style={styles.sectionTitle}>Options</ThemedText>
          <Pressable style={styles.toggleRow} onPress={() => setIndoorOnly((value: boolean) => !value)}>
            <ThemedText style={styles.toggleLabel}>Indoor only</ThemedText>
            <View style={[styles.toggle, indoorOnly && styles.toggleOn]}>
              <View style={[styles.toggleThumb, indoorOnly && styles.toggleThumbOn]} />
            </View>
          </Pressable>
          <Pressable style={styles.toggleRow} onPress={() => setFreeOnly((value: boolean) => !value)}>
            <ThemedText style={styles.toggleLabel}>Free activities only</ThemedText>
            <View style={[styles.toggle, freeOnly && styles.toggleOn]}>
              <View style={[styles.toggleThumb, freeOnly && styles.toggleThumbOn]} />
            </View>
          </Pressable>
        </View>

        <View style={styles.summaryCard}>
          <ThemedText style={styles.summaryTitle}>Current Filters</ThemedText>
          <ThemedText style={styles.summaryText}>Sports: {selectedSportsText}</ThemedText>
          <ThemedText style={styles.summaryText}>Skill: {skillLevel}</ThemedText>
          <ThemedText style={styles.summaryText}>Indoor only: {indoorOnly ? 'Yes' : 'No'}</ThemedText>
          <ThemedText style={styles.summaryText}>Free only: {freeOnly ? 'Yes' : 'No'}</ThemedText>

          <Pressable style={styles.clearButton} onPress={clearFilters}>
            <ThemedText style={styles.clearButtonText}>Clear Filters</ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const createStyles = (theme: (typeof Colors)['light']) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 36,
      gap: 14,
    },
    header: {
      marginBottom: 2,
    },
    title: {
      fontFamily: Fonts.rounded,
      color: theme.text,
    },
    subtitle: {
      color: theme.icon,
      marginTop: 4,
    },
    card: {
      backgroundColor: theme.card,
      borderWidth: 1,
      borderColor: theme.secondary,
      borderRadius: 14,
      padding: 14,
      gap: 12,
    },
    sectionTitle: {
      color: theme.text,
      fontFamily: Fonts.rounded,
      fontSize: 16,
    },
    chipsWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      borderRadius: 999,
      borderWidth: 1,
      borderColor: theme.secondary,
      backgroundColor: theme.background,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    chipSelected: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    chipText: {
      color: theme.text,
      fontSize: 13,
    },
    chipTextSelected: {
      color: theme.background,
    },
    levelRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    levelButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.secondary,
    },
    levelButtonActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    levelText: {
      color: theme.text,
      fontSize: 14,
    },
    levelTextActive: {
      color: theme.background,
    },
    toggleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 6,
    },
    toggleLabel: {
      color: theme.text,
    },
    toggle: {
      width: 40,
      height: 20,
      borderRadius: 10,
      backgroundColor: theme.secondary + '40',
      justifyContent: 'center',
    },
    toggleOn: {
      backgroundColor: theme.primary,
    },
    toggleThumb: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: theme.background,
      marginLeft: 2,
    },
    toggleThumbOn: {
      marginLeft: 22,
    },
    summaryCard: {
      backgroundColor: theme.card,
      borderRadius: 14,
      padding: 14,
      marginTop: 20,
    },
    summaryTitle: {
      color: theme.text,
      fontFamily: Fonts.rounded,
      fontSize: 16,
      marginBottom: 8,
    },
    summaryText: {
      color: theme.text,
      fontSize: 14,
      marginBottom: 4,
    },
    clearButton: {
      marginTop: 12,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: theme.primary,
    },
    clearButtonText: {
      color: theme.background,
      fontWeight: '600',
    },
  });