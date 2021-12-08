import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import Promo from '../components/tabbar/Promotions/Promo';
import AddPool from '../components/tabbar/Promotions/AddPool';
import EditPool from '../components/tabbar/Promotions/EditPool';
import AddPromo from '../components/tabbar/Promotions/AddPromo';
import AddLoyalty from '../components/tabbar/Promotions/AddLoyalty';

const Stack = createStackNavigator();
export default class ProductsNavigation extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Promo" options={{ headerShown: false }} component={Promo} />
                <Stack.Screen name="AddPool" options={{ headerShown: false }} component={AddPool} />
                <Stack.Screen name="EditPool" options={{ headerShown: false }} component={EditPool} />
                <Stack.Screen name="AddPromo" options={{ headerShown: false }} component={AddPromo} />
                <Stack.Screen name="AddLoyalty" options={{ headerShown: false }} component={AddLoyalty} />
            </Stack.Navigator>

        );
    }

}

