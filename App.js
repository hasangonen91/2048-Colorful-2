import React from 'react';
import { StyleSheet, View,StatusBar } from 'react-native';
import Navigations from './src/Navigations/Navigations';

export default function App() {
  return (
    <View style={styles.container}>
       <StatusBar
        backgroundColor="#000"
      />
      <Navigations />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbf8ef",
  }
});
