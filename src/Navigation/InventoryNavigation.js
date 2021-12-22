import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Inventory from '../components/tabbar/Inventory/Inventory';
import AddBarcode from '../components/tabbar/Inventory/AddBarcode';
import EditBarcode from '../components/tabbar/Inventory/EditBarcode';
const Stack = createStackNavigator();
export default class InventoryNavigation extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Inventory" options={{ headerShown: false }} component={Inventory} />
                <Stack.Screen name="AddBarcode" options={{ headerShown: false }} component={AddBarcode} />
                <Stack.Screen name="EditBarcode" options={{ headerShown: false }} component={EditBarcode} />
            </Stack.Navigator>
        )
    }
}
