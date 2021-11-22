import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import Promo from '../components/tabbar/Promo';
import AddPool from '../components/tabbar/AddPool';

const Stack = createStackNavigator();
export default class ProductsNavigation extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Promo" options={{headerShown: false}} component={Promo} />
                <Stack.Screen name="AddPool" options={{headerShown: false}} component={AddPool} /> 
            </Stack.Navigator>

        );
    }

}
