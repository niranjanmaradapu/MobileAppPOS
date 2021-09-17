import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'

import SideNavigation from './SideNavigation';


const Stack = createStackNavigator();
export default class HomeNavigation extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                
                <Stack.Screen name="SideNavigation" options={{ headerShown: false }} component={SideNavigation} />
            </Stack.Navigator>
        );
    }

}