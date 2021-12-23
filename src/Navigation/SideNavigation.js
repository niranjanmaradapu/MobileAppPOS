import Settings from '../components/tabbar/Profile/Settings';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabBar from './BottomTabBar';
import PromoNavigation from './PromoNavigation';
import InventoryNavigation from './InventoryNavigation';
import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();
export default class SideNavigation extends React.Component {
    render() {
        return (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="Home" options={{ headerShown: false }} component={BottomTabBar} />
                <Drawer.Screen name="Settings" options={{ headerShown: false }} component={Settings} />
                <Drawer.Screen name="PromoNavigation" options={{ headerShown: false }} component={PromoNavigation} />
                <Drawer.Screen name="InventoryNavigation" options={{ headerShown: false }} component={InventoryNavigation} />
            </Drawer.Navigator>
        );
    }
}