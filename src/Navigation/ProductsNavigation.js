import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import Products from '../components/tabbar/Products';
import ProductAdd from '../components/tabbar/ProductAdd';

const Stack = createStackNavigator();
export default class ProductsNavigation extends React.Component {
    render() {
        return (

            <Stack.Navigator>
                <Stack.Screen name="Products" options={{headerShown: false}} component={Products} />
                <Stack.Screen name="ProductAdd" options={{headerShown: false}} component={ProductAdd} />
            </Stack.Navigator>

        );
    }

}

