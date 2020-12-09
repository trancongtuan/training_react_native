import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function News() {
  return (
    <View style={styles.container}>
      <Text style = {styles.text}>Open up App.tsx to start working on your news</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
      color: 'black'
  }
});
