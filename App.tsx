import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from './src/container/home';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Provider store={store}>
        <Home />
      </Provider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
