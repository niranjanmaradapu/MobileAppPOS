import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TopBar from './TopBar';
const Stack = createStackNavigator();

export default class TopBarNavigation extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="topbar" options={{ headerShown: false }} component={TopBar} />
      </Stack.Navigator>
    );
  }
}
