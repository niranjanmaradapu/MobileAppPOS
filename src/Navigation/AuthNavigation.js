import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import Login from '../components/Login/Login';
import SignUp from '../components/Login/SignUp';
import SelectDomain from '../components/Login/SelectDomain';
import SelectStore from '../components/Login/SelectStore';
import ForgotPassword from '../components/Login/ForgotPassword';
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
                <Stack.Screen name="SelectDomain" options={{ headerShown: false }} component={SelectDomain} />
                <Stack.Screen name="SelectStore" options={{ headerShown: false }} component={SelectStore} />
                <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPassword} />
            </Stack.Navigator>

        );
    }

}

