import Settings from '../components/Profile/Settings';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PromoNavigation from './PromoNavigation';
import InventoryNavigation from './InventoryNavigation';
import { DrawerContent } from './DrawerContent';
import UrmNavigation from './UrmNavigation';
import UrmService from '../components/services/UrmService';
import NewSaleNavigation from './NewSaleNavigation';
import Home from '../components/Home/Home';
import AccountingNaviagtion from './AccountingNavigation';
import ReportsNavigation from './ReportsNavigation';
import CustomerNavigation from './CustomerNavigation';
import InventoryRetailNavigation from './InventoryRetailNavigation';
import CustomerRetailNavigation from './CustomerRetailNavigation';
import Device from 'react-native-device-detection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import axios from 'axios'

global.previlage1 = '';
global.previlage2 = '';
global.previlage3 = '';
global.previlage4 = '';
global.previlage5 = '';
global.previlage6 = '';
global.previlage7 = '';
global.previlage8 = '';
global.isSuperAdmin = '';
global.isConfigUser = '';
global.username = '';
const Drawer = createDrawerNavigator();
export default class SideNavigation extends React.Component {
  state = {
    route: '',
    loading: false,
    domainId: ''
  }
  initialRouteName = () => {
    if (global.previlage1 === 'Dashboard') {
      this.setState({ route: 'Home' })
    } else if (global.previlage2 = 'Billing Portal') {
      this.setState({ route: 'CustomerNavigation' })
    } else if (global.previlage3 = 'Inventory Portal') {
      this.setState({ route: 'InventoryNavigation' })
    } else if (global.previlage4 = 'Promotions & Loyalty') {
      this.setState({ route: 'PromoNavigation' })
    }
    else if (global.previlage5 = 'Accounting Portal') {
      this.setState({ route: 'AccountingNaviagtion' })
    } else if (global.previlage6 = 'Reports') {
      this.setState({ route: 'ReportsNavigation' })
    } else if (global.previlage7 = 'URM Portal') {
      this.setState({ route: 'UrmNavigation' })
    }

    this.setState({ loading: false });
  }
  async componentDidMount() {
    console.warn("Gloal", global.previlage1)
    this.setState({ loading: false })
    var storeStringId = "";
    var domainStringId = "";

    AsyncStorage.getItem("storeId").then((value) => {
      storeStringId = value;
      this.setState({ storeId: parseInt(storeStringId) });
      console.log(this.state.storeId);
      console.log("cssafsfs " + this.state.storeId);
    }).catch(() => {
      console.log('There is error getting storeId');
    });

    await AsyncStorage.getItem("rolename").then((value) => {
      global.userrole = value;
    }).catch(() => {
      console.log('There is error getting userrole');
    });

    await AsyncStorage.getItem("username").then(value => {
      global.username = value
    })

    await AsyncStorage.getItem("storeName").then(value => {
      global.storeName = value
    })

    global.previlage1 = '';
    global.previlage2 = '';
    global.previlage3 = '';
    global.previlage4 = '';
    global.previlage5 = '';
    global.previlage6 = '';
    global.previlage7 = '';
    global.previlage8 = '';
    this.initialRouteName()
    this.getPrivileges()
    console.log("")
  }

  async getPrivileges() {
    await AsyncStorage.getItem("roleType").then((value) => {
      if (value === "config_user") {
        global.previlage1 = '';
        global.previlage2 = '';
        global.previlage3 = '';
        global.previlage4 = '';
        global.previlage5 = '';
        global.previlage6 = '';
        global.previlage7 = 'URM Portal';
      }
      else if (value === "super_admin") {
        global.previlage1 = 'Dashboard';
        global.previlage2 = 'Billing Portal';
        global.previlage3 = 'Inventory Portal';
        global.previlage4 = 'Promotions & Loyalty';
        global.previlage5 = 'Accounting Portal';
        global.previlage6 = 'Reports';
        global.previlage7 = 'URM Portal';
      } else {
        AsyncStorage.getItem("rolename").then(value => {
          console.log("role name", value)
          global.userrole = value;
          axios.get(UrmService.getPrivillagesByRoleName() + value).then((res) => {
            console.log("Privileges", res.data)
            if (res.data) {
              let len = res.data.parentPrivileges.length;
              // console.log(.name)
              if (len > 0) {
                for (let i = 0; i < len; i++) {
                  let previlage = res.data.parentPrivileges[i];
                  if (previlage.name === "Dashboard") {
                    global.previlage1 = 'Dashboard';
                  }
                  if (previlage.name === "Billing Portal") {
                    global.previlage2 = 'Billing Portal';
                  }
                  if (previlage.name === "Inventory Portal") {
                    global.previlage3 = 'Inventory Portal';
                  }
                  if (previlage.name === "Promotions & Loyalty") {
                    global.previlage4 = 'Promotions & Loyalty';
                  }
                  if (previlage.name === "Accounting Portal") {
                    global.previlage5 = 'Accounting Portal';
                  }
                  if (previlage.name === "Reports") {
                    global.previlage6 = 'Reports';
                  }
                  if (previlage.name === "URM Portal") {
                    global.previlage7 = 'URM Portal';
                  }
                }
                //this.setState({ loading: false });
              }
            }
          });
        }).catch((err) => {
          console.log(err);
        });
      }
    })

  }

  render() {
    // alert(this.state.route)
    return this.state.loading ? (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={"red"} />
      </View>

    ) : (
      <Drawer.Navigator
        initialRouteName={global.previlage1 === 'Dashboard' ? "Home" : global.previlage2 === 'Billing Portal' ? "CustomerNavigation" : global.previlage3 === 'Inventory Portal' ? "InventoryNavigation " : global.previlage4 === 'Promotions & Loyalty' ? "PromoNavigation" : global.previlage5 === 'Accounting Portal' ? "AccountingNaviagtion" : global.previlage6 === 'Reports' ? "ReportsNavigation" : global.previlage7 === 'URM Portal' ? "UrmNavigation" : this.getPrivileges()}
        screenOptions={{
          drawerStyle: {
            width: Device.isTablet ? 400 : 300,
          }
        }} drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Drawer.Screen name="Settings" options={{ headerShown: false }} component={Settings} />
        <Drawer.Screen name="PromoNavigation" options={{ headerShown: false }} component={PromoNavigation} />
        <Drawer.Screen name="InventoryNavigation" options={{ headerShown: false }} component={InventoryNavigation} />
        <Drawer.Screen name="UrmNavigation" options={{ headerShown: false }} component={UrmNavigation} />
        <Drawer.Screen name="ReportsNavigation" options={{ headerShown: false }} component={ReportsNavigation} />
        <Drawer.Screen name="AccountingNaviagtion" options={{ headerShown: false }} component={AccountingNaviagtion} />
        <Drawer.Screen name="CustomerNavigation" options={{ headerShown: false }} component={CustomerNavigation} />
        <Drawer.Screen name="CustomerRetailNavigation" options={{ headerShown: false }} component={CustomerRetailNavigation} />
        <Drawer.Screen name="NewSaleNavigation" options={{ headerShown: false }} component={NewSaleNavigation} />
        <Drawer.Screen name="InventoryRetailNavigation" options={{ headerShown: false }} component={InventoryRetailNavigation} />
        {/* <Drawer.Screen name="NewSaleTextileNavigation" options={{ headerShown: false }} component={NewSaleTextileNavigation} /> */}
      </Drawer.Navigator>
    );
  }
}