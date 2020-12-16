import React from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import Routes from './src/app/router/index';
import initStore from './src/app/config/store'

import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';


const store = initStore();

export default function App() {
  return (
    <Provider store = {store}>
    <Routes />
    </Provider>
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
