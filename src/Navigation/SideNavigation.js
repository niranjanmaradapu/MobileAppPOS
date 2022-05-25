import Settings from '../components/Profile/Settings';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PromoNavigation from './PromoNavigation';
import InventoryNavigation from './InventoryNavigation';
import { DrawerContent } from './DrawerContent';
import UrmNavigation from './UrmNavigation';
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
        this.setState({ loading: false })
        var storeStringId = "";
        var domainStringId = "";
        AsyncStorage.getItem("domainDataId").then((value) => {
            domainStringId = value;
            this.setState({ domainId: parseInt(domainStringId) });
            console.log("domain data id" + this.state.domainId);


        }).catch(() => {
            ////this.setState({ loading: false });
            console.log('There is error getting domainDataId');
            // alert('There is error getting domainDataId');
        });

        AsyncStorage.getItem("storeId").then((value) => {
            storeStringId = value;
            this.setState({ storeId: parseInt(storeStringId) });
            console.log(this.state.storeId);
            console.log("cssafsfs " + this.state.storeId);
        }).catch(() => {
            ////this.setState({ loading: false });
            console.log('There is error getting storeId');
            // alert('There is error getting storeId');
        });

        AsyncStorage.getItem("domainName").then((value) => {
            global.domainName = value;
        }).catch(() => {
            ////this.setState({ loading: false });
            console.log('There is error getting domainName');
            //alert('There is error getting domainName');
        });

        AsyncStorage.getItem("rolename").then((value) => {
            global.userrole = value;
        }).catch(() => {
            ////this.setState({ loading: false });
            console.log('There is error getting userrole');
            // alert('There is error getting userrole');
        });

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



        AsyncStorage.getItem("custom:isConfigUser").then((value) => {
            if (value === "true") {
                global.previlage7 = 'URM Portal';
                global.previlage5 = 'Accounting Portal';
            }
            else {
                AsyncStorage.getItem("custom:isSuperAdmin").then((value) => {
                    if (value === "true") {
                        var domainId = "1";
                        if (global.domainName === "Textile") {
                            domainId = "1";
                        }
                        else if (global.domainName === "Retail") {
                            domainId = "2";
                        }
                        else if (global.domainName === "Electrical & Electronics") {
                            domainId = "3";
                        }

                        axios.get(UrmService.getPrivillagesForDomain() + domainId).then((res) => {
                            if (res.data && res.data["isSuccess"] === "true") {
                                console.log(res.data);
                                let len = res.data["result"].length;
                                console.log(len);
                                if (len > 0) {
                                    for (let i = 0; i < len; i++) {
                                        let previlage = res.data["result"][i];
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
                    }
                    else {
                        console.log('vinod-------> privlage by name1111');
                        AsyncStorage.getItem("rolename").then((value) => {
                            global.userrole = value;
                            axios.get(UrmService.getPrivillagesByRoleName() + value).then((res) => {
                                if (res.data && res.data["isSuccess"] === "true") {
                                    console.log(res.data);
                                    let len = res.data["result"].parentPrivilages.length;
                                    // console.log(.name)
                                    if (len > 0) {
                                        for (let i = 0; i < len; i++) {
                                            let previlage = res.data["result"].parentPrivilages[i];
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
                        }).catch(() => {
                            ////this.setState({ loading: false });
                            console.log('There is error saving domainDataId');
                            // alert('There is error saving domainDataId');
                        });

                    }
                }).catch(() => {
                    ////this.setState({ loading: false });
                    console.log('There is error getting storeId');
                    // alert('There is error getting storeId');
                });
            }
        }).catch(() => {
            ////this.setState({ loading: false });
            console.log('There is error getting storeId');
            // alert('There is error getting storeId');
        });



        const username = await AsyncStorage.getItem("username");
        axios.get(ProfileService.getUser() + username).then((res) => {
            if (res.data && res.data["isSuccess"] === "true") {
                global.username = res.data["result"].userName;
            }
        }).catch(() => {
            ////this.setState({ loading: false });
            ////this.setState({ loading: false });
            // alert('No user details get');
        });
        if (username) {
            this.setState({ domainId: 1 });
        }
        this.initialRouteName()

    }
    render() {
        return this.state.loading ? (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size={"large"} color={"red"} />
            </View>

        ) : (
            <Drawer.Navigator
                initialRouteName={this.state.route}
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