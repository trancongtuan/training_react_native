import React from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import Routes from './src/app/router/index';

export default function App() {
  return (
    <Routes />
  );
}

AppRegistry.registerComponent('app', () => App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
