import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import Login from '../components/Login/Login';
import SignUp from '../components/Login/SignUp';
import HomeNavigation from './HomeNavigation';
import Welcome from '../components/Welcome';
import LanguageSelection from '../components/LanguageSelection';

const Stack = createStackNavigator();
export default class AuthNavigation extends React.Component {
    render() {
        return (

            <Stack.Navigator>
                 <Stack.Screen name="LanguageSelection" options={{ headerShown: false }} component={LanguageSelection} />
                <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
                <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
                <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
                <Stack.Screen name="HomeNavigation" options={{ headerShown: false }} component={HomeNavigation} />
            </Stack.Navigator>

        );
    }

}

