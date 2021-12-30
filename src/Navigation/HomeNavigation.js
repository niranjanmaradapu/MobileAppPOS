import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import SideNavigation from './SideNavigation';
import Login from '../components/Login/Login';
import SelectDomain from '../components/Login/SelectDomain';
import SelectStore from '../components/Login/SelectStore';
import ForgotPassword from '../components/Login/ForgotPassword';
import RegisterClient from '../components/URM/RegisterClient';


const Stack = createStackNavigator();
export default class HomeNavigation extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="SideNavigation" options={{ headerShown: false }} component={SideNavigation} />
                <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
                <Stack.Screen name="SelectDomain" options={{ headerShown: false }} component={SelectDomain} />
                <Stack.Screen name="SelectStore" options={{ headerShown: false }} component={SelectStore} />
                <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPassword} />
                <Stack.Screen name="HomeNavigation" options={{ headerShown: false }} component={HomeNavigation} />
                <Stack.Screen name="RegisterClient" options={{ headerShown: false }} component={RegisterClient} />
            </Stack.Navigator>
        );
    }

}