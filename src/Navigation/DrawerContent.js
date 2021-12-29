import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import UrmService from '../components/services/UrmService';





export function DrawerContent(props) {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <Image
                        style={styles.logoimage}
                        source={require('../components/assets/images/sidemenulogo.png')}
                    ></Image>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 10, backgroundColor: '#ED1C24', marginLeft: -20, }}>
                            <Image
                                style={styles.image}
                                source={require('../components/assets/images/profilepic.png')}
                                resizeMode={"cover"} ></Image>
                            <View style={{ marginLeft: 15, flexDirection: 'column', height: 100 }}>
                                <Title style={styles.title}>{global.username}</Title>
                                <Caption style={styles.middelcaption}>{global.domainName}</Caption>
                                <Caption style={styles.caption}>{global.userrole}</Caption>
                            </View>
                        </View>

                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View> */}
                    </View>


                    <Drawer.Section style={styles.drawerSection}>

                        {global.previlage1 === "Dashboard" && (
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        )} 

                        {global.previlage2 === "Customer Portal" && global.domainName == "Retail" && (
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image
                                        style={styles.sidemenuimage}
                                        source={require('../components/assets/images/customerportal.png')}
                                    ></Image>
                                )}
                                label="Customer Portal"
                                onPress={() => { props.navigation.navigate('NewSaleNavigation') }}
                            />
                        )}
                        {global.previlage2 === "Customer Portal" && global.domainName == "Textile" && (
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image
                                        style={styles.sidemenuimage}
                                        source={require('../components/assets/images/customerportal.png')}
                                    ></Image>
                                )}
                                label="Customer Portal"
                                onPress={() => { props.navigation.navigate('NewSaleTextileNavigation') }}
                            />
                        )}


                        {global.previlage3 === "Inventory Portal" && global.domainName == "Retail" && (
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image
                                        style={styles.sidemenuimage}
                                        source={require('../components/assets/images/inventoryportal.png')}
                                    ></Image>
                                )}
                                label="Inventory Portal"
                                onPress={() => { props.navigation.navigate('NewSaleNavigation') }}
                            />
                        )}

                        {global.previlage3 === "Inventory Portal" && global.domainName == "Textile" && (
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image
                                        style={styles.sidemenuimage}
                                        source={require('../components/assets/images/inventoryportal.png')}
                                    ></Image>
                                )}
                                label="Inventory Portal"
                                onPress={() => { props.navigation.navigate('InventoryNavigation') }}
                            />
                        )}

                        {global.previlage4 === "Promotions & Loyalty" && (
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image
                                        style={styles.sidemenuimage}
                                        source={require('../components/assets/images/promotions.png')}
                                    ></Image>
                                )}
                                label="Promotions & Loyalty"
                                onPress={() => { props.navigation.navigate('PromoNavigation') }}
                            />
                        )}
                        {global.previlage5 === "Accounting Portal" && (
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image
                                        style={styles.sidemenuimage}
                                        source={require('../components/assets/images/accounting.png')}
                                    ></Image>
                                )}
                                label="Accounting Portal"
                                onPress={() => { props.navigation.navigate('AccountingNaviagtion') }}
                            />
                        )}

                        {global.previlage6 === "Reports" && (
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image
                                        style={styles.sidemenuimage}
                                        source={require('../components/assets/images/reports.png')}
                                    ></Image>
                                )}
                                label="Reports"
                                onPress={() => { props.navigation.navigate('') }}
                            />
                        )}

                        {global.previlage7 === "URM Portal" && (
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image
                                        style={styles.sidemenuimage}
                                        source={require('../components/assets/images/urmportal.png')}
                                    ></Image>
                                )}
                                label="URM Portal"
                                onPress={() => { props.navigation.navigate('UrmNavigation') }}
                            />
                        )}
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Image
                                    style={styles.sidemenuimage}
                                    source={require('../components/assets/images/sidesettings.png')}
                                ></Image>
                            )}
                            label="Profile Settings"
                            onPress={() => { props.navigation.navigate('Settings') }}
                        />
                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { props.navigation.navigate('Login') }}
                />
            </Drawer.Section>
        </View>
    );

}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: '#ffffff',
    },
    middelcaption: {
        marginTop: 0,
        fontSize: 14,
        lineHeight: 14,
        color: '#ffffff',
    },
    logoimage: {
        width: 150,
        height: 60,
        marginTop: 20,
        marginLeft: 20,
    },
    image: {
        marginTop: 20,
        marginLeft: 20,
    },
    sidemenuimage: {
        width: 20,
        height: 20
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 0,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
