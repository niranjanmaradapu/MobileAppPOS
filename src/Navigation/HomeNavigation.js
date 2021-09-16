import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import BottomTabBar from '../components/BottomTabBar';


const Stack = createStackNavigator();
export default class HomeNavigation extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="BottomTabBar" options={{ headerShown: false }} component={BottomTabBar} />
            </Stack.Navigator>
        );
    }

}