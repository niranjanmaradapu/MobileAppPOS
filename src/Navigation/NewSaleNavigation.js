import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import ScanBarCode from '../components/Newsale/ScanBarCode';
import NewSale from '../components/Newsale/NewSale';
import Orders from '../components/Newsale/Orders';
import ImageScanner from '../components/Newsale/ImageScanner';
import ProductEdit from '../components/Newsale/ProductEdit';
import Payment from '../components/Newsale/Payment';


const Stack = createStackNavigator();
export default class NewSaleNavigation extends React.Component {
    render() {
        return (

            <Stack.Navigator>
                <Stack.Screen name="NewSale" options={{ headerShown: false }} component={NewSale} />
                <Stack.Screen name="Orders" options={{ headerShown: false }} component={Orders} />
                <Stack.Screen name="ScanBarCode" options={{ headerShown: false }} component={ScanBarCode} />
                <Stack.Screen name="ImageScanner" options={{ headerShown: false }} component={ImageScanner} />
                <Stack.Screen name="ProductEdit" options={{ headerShown: false }} component={ProductEdit} />
                <Stack.Screen name="Payment" options={{ headerShown: false }} component={Payment} />
            </Stack.Navigator>

        );
    }

}

