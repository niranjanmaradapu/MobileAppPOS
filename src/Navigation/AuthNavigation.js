import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import HomeNavigation from './HomeNavigation';


const Stack = createStackNavigator();
export default class AuthNavigation extends React.Component {
    render() {
        return (

            <Stack.Navigator>
                <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
                <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
                <Stack.Screen name="HomeNavigation" options={{ headerShown: false }} component={HomeNavigation} />
            </Stack.Navigator>

        );
    }

}

