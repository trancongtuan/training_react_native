import React from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import Routes from './src/app/router/index';
import initStore from './src/app/config/store'
import setupAxiosInterceptors from './src/app/config/axios-interceptor'
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';


const store = initStore();

const actions = bindActionCreators({ /**handler authen */  }, store.dispatch);

setupAxiosInterceptors(() => {/**actions.clearAuthentication('login.error.unauthorized')*/});

export default function App() {
  return (
    <Provider store={store}>
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
