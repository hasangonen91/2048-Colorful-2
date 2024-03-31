import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GameController from '../Games/2048/GameController';
import GameController8 from '../Games/8X8/GameController8';
import GameController7 from '../Games/7X7/GameController';
import GameController6 from '../Games/6X6/GameController';
import GameController5 from '../Games/5X5/GameController';
import GameController3 from '../Games/3X3/GameController';
import MainScreen from '../Main/MainScreen';
import SplashScreen from '../Splash/SplashScreen';
import {theme} from '../global/styles/theme';

const Stack = createNativeStackNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="MainScreen"
          component={MainScreen}
        />

        <Stack.Screen
          options={{
            headerTitle: '8x8',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: theme.colors.secondary80,
            },
          }}
          name="GameController8"
          component={GameController8}
        />
        <Stack.Screen
          options={{
            headerTitle: '7x7',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: theme.colors.secondary80,
            },
          }}
          name="GameController7"
          component={GameController7}
        />
        <Stack.Screen
          options={{
            headerTitle: '6x6',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: theme.colors.secondary80,
            },
          }}
          name="GameController6"
          component={GameController6}
        />
        <Stack.Screen
          options={{
            headerTitle: '5x5',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: theme.colors.secondary80,
            },
          }}
          name="GameController5"
          component={GameController5}
        />
        <Stack.Screen
          options={{
            headerTitle: '4x4',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: theme.colors.secondary80,
            },
          }}
          name="GameController"
          component={GameController}
        />
        <Stack.Screen
          options={{
            headerTitle: '3x3',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: theme.colors.secondary80,
            },
          }}
          name="GameController3"
          component={GameController3}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;

const styles = StyleSheet.create({});
