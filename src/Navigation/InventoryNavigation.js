import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Inventory from '../components/Inventory/Inventory';
import AddBarcode from '../components/Inventory/AddBarcode';
import EditBarcode from '../components/Inventory/EditBarcode';
import ViewReBarcode from '../components/Inventory/ViewReBarcode';
const Stack = createStackNavigator();
export default class InventoryNavigation extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Inventory" options={{ headerShown: false }} component={Inventory} />
                <Stack.Screen name="AddBarcode" options={{ headerShown: false }} component={AddBarcode} />
                <Stack.Screen name="EditBarcode" options={{ headerShown: false }} component={EditBarcode} />
                <Stack.Screen name="ViewReBarcode" options={{ headerShown: false }} component={ViewReBarcode} />
            </Stack.Navigator>
        )
    }
}
