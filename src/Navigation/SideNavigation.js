

import NewSale from '../components/tabbar/Newsale/NewSale';
import Settings from '../components/tabbar/Profile/Settings';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabBar from './BottomTabBar';

const Drawer = createDrawerNavigator();

export default class SideNavigation extends React.Component {
    render() {
        return (
            <Drawer.Navigator>
     
            <Drawer.Screen name="Home" options={{ headerShown: false }} component={BottomTabBar} />
            <Drawer.Screen name="Settings" options={{ headerShown: false }} component={Settings} />
          </Drawer.Navigator>
        );
    }
}