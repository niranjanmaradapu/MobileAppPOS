import Settings from '../components/tabbar/Profile/Settings';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabBar from './BottomTabBar';
import PromoNavigation from './PromoNavigation';
import InventoryNavigation from './InventoryNavigation';

const Drawer = createDrawerNavigator();

export default class SideNavigation extends React.Component {
    render() {
        return (
            <Drawer.Navigator>
                <Drawer.Screen name="Home" options={{ headerShown: false }} component={BottomTabBar} />
                <Drawer.Screen name="Settings" options={{ headerShown: false }} component={Settings} />
                <Drawer.Screen name="Promotions" options={{ headerShown: false }} component={PromoNavigation} />
                <Drawer.Screen name="Inventory" options={{ headerShown: false }} component={InventoryNavigation} />
            </Drawer.Navigator>
        );
    }
}