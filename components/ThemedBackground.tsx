import { Image, StyleSheet, Platform, ViewProps } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

export default function ThemedBackground({children, style}: ViewProps) {
  return (
    <SafeAreaView>
      <ThemedView style={[styles.titleContainer, style]}>
      <Image 
        source={require('@/assets/images/bg-arrow.png')}
        style={styles.arrow}
      />
      {children}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {

    height:"100%"
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  arrow: {
    height: 363.84, 
    width: 327.12, 
    left:0, 
    bottom:0,
    position:"absolute",
    zIndex: 0,
    opacity: 0.7
  },

});
