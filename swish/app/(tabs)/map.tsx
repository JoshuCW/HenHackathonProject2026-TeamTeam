import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/map.png')}
        style={styles.mapImage}
        resizeMode="contain"
        accessibilityLabel="Map"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mapImage: {
    width: '90%',
    height: '80%',
  },
});
