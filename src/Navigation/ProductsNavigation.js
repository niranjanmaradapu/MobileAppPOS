import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import Products from '../components/tabbar/Products';
// import NewSaleNavigation from './NewSaleNavigation';
import NewSale from '../components/tabbar/NewSale';
import ImageScanner from '../components/tabbar/ImageScanner';
import Home from '../components/tabbar/Home';
import ScanBarCode from '../components/tabbar/ScanBarCode';

const Stack = createStackNavigator();
export default class ProductsNavigation extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Products" options={{headerShown: false}} component={Products} />
                <Stack.Screen name="ScanBarCode" options={{ headerShown: false }} component={ScanBarCode} />
                {/* <Stack.Screen name="NewSaleNavigation" options={{headerShown: false}} component={NewSaleNavigation} /> */}
                <Stack.Screen name="NewSale" options={{headerShown: false}} component={NewSale} />
                <Stack.Screen name="ImageScanner" options={{headerShown: false}} component={ImageScanner} />
                <Stack.Screen name="Home" options={{headerShown: false}} component={Home} /> 
            </Stack.Navigator>

        );
    }

}

