import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserManagement from '../components/URM/UserManagement';
import AddUser from '../components/URM/AddUser';
import CreateRole from '../components/URM/CreateRole';

const Stack = createStackNavigator();
export default class UrmNavigation extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName='UserManagement' >
                <Stack.Screen name='UserManagement' options={{ headerShown: false }} component={UserManagement} />
                <Stack.Screen name='AddUser' options={{ headerShown: false }} component={AddUser} />
                <Stack.Screen name='CreateRole' options={{ headerShown: false }} component={CreateRole} />
            </Stack.Navigator>
        )
    }
}
2