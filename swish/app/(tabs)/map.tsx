import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/maps.png')}
        style={styles.mapImage}
        resizeMode="cover"
        accessibilityLabel="Map"
      />
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
