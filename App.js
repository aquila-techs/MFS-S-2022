import React, { Component, useEffect } from 'react';
import { Provider } from 'react-redux';
import { StatusBar, Alert, View, Text } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { PersistGate } from 'redux-persist/lib/integration/react';
import I18n from 'react-native-i18n';
import reducer from './src/Reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContainer from './src/Containers/appContainer';
import * as  Updates from "expo-updates"

const config = {
  key: 'primary',
  storage: AsyncStorage,
};
let reducers = persistCombineReducers(config, reducer);

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__,
});

const store = createStore(
  reducers,

  compose(applyMiddleware(thunkMiddleware, loggerMiddleware)),
);
const persister = persistStore(store);

function App() {

  useEffect(() => {
    I18n.locale = 'nl';
    reactToUpdates()
  }, []);

  const reactToUpdates = async () => {
    Updates.addListener((event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        alert('Update Available. restarting your app to see it.');
        Updates.reloadAsync();
      }
    })
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <AppContainer />
      </PersistGate>
    </Provider>
  );
};



export default App;
