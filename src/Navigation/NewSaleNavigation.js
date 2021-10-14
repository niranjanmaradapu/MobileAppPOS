import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import Login from '../components/Login/Login';
import ScanBarCode from '../components/tabbar/ScanBarCode';
import NewSale from '../components/tabbar/NewSale';
import Orders from '../components/tabbar/Orders';
import ImageScanner from '../components/tabbar/ImageScanner';


const Stack = createStackNavigator();
export default class NewSaleNavigation extends React.Component {
    render() {
        return (

            <Stack.Navigator>
                <Stack.Screen name="NewSale" options={{headerShown: false}} component={NewSale} />
                <Stack.Screen name="Orders" options={{headerShown: false}} component={Orders} />
                <Stack.Screen name="ScanBarCode" options={{ headerShown: false }} component={ScanBarCode} />
                <Stack.Screen name="ImageScanner" options={{ headerShown: false }} component={ImageScanner} />
            </Stack.Navigator>

        );
    }

}

