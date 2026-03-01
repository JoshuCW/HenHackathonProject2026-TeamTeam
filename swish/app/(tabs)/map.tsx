import React, { useEffect, useMemo, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { addPostListener } from './create';
import type { Post } from './create';

let POSTS: Post[] = [
  { id: 1, x: 120, y: 180, sport: 'Basketball', level: 'Intermediate', indoor: false, free: true, title: '', location: '', time: '', price: '' },
  { id: 2, x: 220, y: 90, sport: 'Soccer', level: 'Any', indoor: true, free: false, title: '', location: '', time: '', price: '' },
  { id: 3, x: 80, y: 250, sport: 'Tennis', level: 'Advanced', indoor: false, free: true, title: '', location: '', time: '', price: '' },
];

// Example filter criteria (replace with context or props in real app)
const userFilter = {
  sports: ['Basketball', 'Soccer'],
  level: 'Any',
  indoorOnly: false,
  freeOnly: false,
};

interface PostFilter {
  sports: string[];
  level: string;
  indoorOnly: boolean;
  freeOnly: boolean;
}

function postMatchesFilter(post: Post, filter: PostFilter): boolean {
  if (filter.sports.length && !filter.sports.includes(post.sport)) return false;
  if (filter.level !== 'Any' && post.level !== filter.level) return false;
  if (filter.indoorOnly && !post.indoor) return false;
  if (filter.freeOnly && !post.free) return false;
  return true;
}

export default function MapScreen() {
  const [posts, setPosts] = useState(POSTS);
  useEffect(() => {
    addPostListener(post => {
      setPosts(current => [...current, post]);
    });
  }, []);
  const filteredPosts = useMemo(() => posts.filter(post => postMatchesFilter(post, userFilter)), [posts]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/maps.png')}
        style={styles.mapImage}
        resizeMode="cover"
        accessibilityLabel="Map"
      />
      {filteredPosts.map(post => (
        <View
          key={post.id}
          style={{
            position: 'absolute',
            left: post.x - 12,
            top: post.y - 24,
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: '#007AFF',
            borderWidth: 2,
            borderColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconSymbol name="mappin" size={16} color="#fff" />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
