import Settings from '../components/tabbar/Profile/Settings';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabBar from './BottomTabBar';
import PromoNavigation from './PromoNavigation';
import InventoryNavigation from './InventoryNavigation';
import { DrawerContent } from './DrawerContent';
import UrmNavigation from './UrmNavigation';
import NewSaleNavigation from './NewSaleNavigation';
import Home from '../components/tabbar/Home/Home';
import NewSaleTextileNavigation from './NewSaleTextitleNavigation';
import AccountingNaviagtion from './AccountingNavigation';
import ReportsNavigation from './ReportsNavigation';

const Drawer = createDrawerNavigator();
export default class SideNavigation extends React.Component {
    render() {
        return (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="Home" options={{ headerShown: false }} component={Home} />
                <Drawer.Screen name="Settings" options={{ headerShown: false }} component={Settings} />
                <Drawer.Screen name="PromoNavigation" options={{ headerShown: false }} component={PromoNavigation} />
                <Drawer.Screen name="InventoryNavigation" options={{ headerShown: false }} component={InventoryNavigation} />
                <Drawer.Screen name="UrmNavigation" options={{ headerShown: false }} component={UrmNavigation} />
                <Drawer.Screen name="ReportsNavigation" options={{ headerShown: false }} component={ReportsNavigation} />
                <Drawer.Screen name="AccountingNaviagtion" options={{ headerShown: false }} component={AccountingNaviagtion} />
                <Drawer.Screen name="NewSaleNavigation" options={{ headerShown: false }} component={NewSaleNavigation} />
                <Drawer.Screen name="NewSaleTextileNavigation" options={{ headerShown: false }} component={NewSaleTextileNavigation} />
            </Drawer.Navigator>
        );
    }
}