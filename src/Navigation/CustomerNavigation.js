import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import NewSaleTextile from '../components/CustomerPortal/NewSaleTextile';
import TextilePayment from '../components/CustomerPortal/TextilePayment';


const Stack = createStackNavigator();
export default class CustomerNavigation extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName='NewSaleTextile'>
                <Stack.Screen name='NewSaleTextile' options={{ headerShown: false }} component={NewSaleTextile} />
                <Stack.Screen name='TextilePayment' options={{ headerShown: false }} component={TextilePayment} />
            </Stack.Navigator>
        );
    }
};