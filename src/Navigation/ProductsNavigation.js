import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import Products from '../components/tabbar/Products';
import ProductAdd from '../components/tabbar/ProductAdd';
import NewSaleNavigation from './NewSaleNavigation';
import ImageScanner from '../components/tabbar/ImageScanner';

const Stack = createStackNavigator();
export default class ProductsNavigation extends React.Component {
    render() {
        return (

            <Stack.Navigator>
                <Stack.Screen name="Products" options={{headerShown: false}} component={Products} />
                <Stack.Screen name="ProductAdd" options={{headerShown: false}} component={ProductAdd} />
                <Stack.Screen name="NewSaleNavigation" options={{headerShown: false}} component={NewSaleNavigation} />
                <Stack.Screen name="ImageScanner" options={{headerShown: false}} component={ImageScanner} />
            </Stack.Navigator>

        );
    }

}

