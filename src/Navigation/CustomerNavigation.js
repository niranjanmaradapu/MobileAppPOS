import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import NewSaleTextile from '../components/tabbar/Newsale/NewSaleTextile';
import GenerateEstimationSlip from '../components/CustomerPortal/GenerateEstimationSlip';


const Stack = createStackNavigator();
export default class CustomerNavigation extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName='NewSaleTextile'>
                <Stack.Screen name='NewSaleTextile' options={{ headerShown: false }} component={NewSaleTextile} />
                <Stack.Screen name='GenerateEstimationSlip' options={{ headerShown: false }} component={GenerateEstimationSlip} />
            </Stack.Navigator>
        );
    }
};