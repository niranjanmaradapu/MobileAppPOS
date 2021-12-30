import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import AccountManagement from '../components/Accounting/AccountManagement';
import AddDomain from '../components/Accounting/AddDomain';
import AddStore from "../components/Accounting/AddStore";

const Stack = createStackNavigator();
export default class AccountingNaviagtion extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName='AccountManagement' >
                <Stack.Screen name='AccountManagement' options={{ headerShown: false }} component={AccountManagement} />
                <Stack.Screen name='AddStore' options={{ headerShown: false }} component={AddStore} />
                <Stack.Screen name='AddDomain' options={{ headerShown: false }} component={AddDomain} />
            </Stack.Navigator>
        );
    }
}
2;