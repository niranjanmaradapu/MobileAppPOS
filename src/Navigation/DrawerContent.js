import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ProfileService from '../components/services/ProfileService';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import React from 'react';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import {
  Caption, Drawer, Title
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';





export function DrawerContent(props) {

  useEffect(() => {
    const username = AsyncStorage.getItem("username");
    axios.get(ProfileService.getUser() + username).then((res) => {
      if (res.data && res.data) {
        global.username = res.data["result"].userName;
      }
    }).catch((err) => {
      console.log({ err })
    });
  })

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} >
        <View style={styles.drawerContent}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: Device.isTablet ? 20 : 10, marginRight: Device.isTablet ? 20 : 10 }}>
            <Image
              style={styles.logoimage}
              source={require('../components/assets/images/easy_retail_logo.png')}
            ></Image>
            <TouchableOpacity style={styles.languageButton} onPress={() => { props.navigation.navigate('LoginAfterLanguageSelect'); }}>

              <Text style={styles.languageText}>{I18n.locale.toUpperCase()}</Text>

            </TouchableOpacity>
          </View>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 10, backgroundColor: '#ED1C24', marginLeft: -20, }}>
              <Image
                style={styles.image}
                source={require('../components/assets/images/profilepic.png')}
                resizeMode={"cover"} ></Image>
              <View style={{ marginLeft: Device.isTablet ? 25 : 15, flexDirection: 'column', height: Device.isTablet ? 100 : 80, justifyContent: 'space-around', marginTop: Device.isTablet ? 10 : 0 }}>
                <Title style={styles.title}>{global.username}</Title>
                <Caption style={styles.caption}>{global.userrole}</Caption>
                <Caption style={styles.middelcaption}>{global.storeName}</Caption>
              </View>
            </View>

          </View>


          <Drawer.Section style={styles.drawerSection}>

            {global.previlage1 === "Dashboard" && (
              <DrawerItem
                labelStyle={{ fontSize: Device.isTablet ? 21 : 16 }}
                icon={({ color, size }) => (
                  <Icon
                    name="home"
                    color={color}
                    size={size}
                  />
                )}
                label={I18n.t("Home")}
                onPress={() => { props.navigation.navigate('Home'); }}
              />
            )}


            {global.previlage2 === "Billing Portal" && (
              <DrawerItem
                labelStyle={{ fontSize: Device.isTablet ? 21 : 16 }}
                icon={({ color, size }) => (
                  <Image
                    style={styles.sidemenuimage}
                    source={require('../components/assets/images/customerportal.png')}
                  ></Image>
                )}
                label={I18n.t("Billing Portal")}
                onPress={() => { props.navigation.navigate('CustomerNavigation'); }}
              />
            )}



            {global.previlage3 === "Inventory Portal" && (
              <DrawerItem
                labelStyle={{ fontSize: Device.isTablet ? 21 : 16 }}
                icon={({ color, size }) => (
                  <Image
                    style={styles.sidemenuimage}
                    source={require('../components/assets/images/inventoryportal.png')}
                  ></Image>
                )}
                label={I18n.t("Inventory Portal")}
                onPress={() => { props.navigation.navigate('InventoryNavigation'); }}
              />
            )}

            {/* //Hold For Now // */}
            {global.previlage4 === "Promotions & Loyalty" && (
              <DrawerItem
                labelStyle={{ fontSize: Device.isTablet ? 21 : 16 }}
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
                labelStyle={{ fontSize: Device.isTablet ? 21 : 16 }}
                icon={({ color, size }) => (
                  <Image
                    style={styles.sidemenuimage}
                    source={require('../components/assets/images/accounting.png')}
                  ></Image>
                )}
                label={I18n.t("Accounting Portal")}
                onPress={() => { props.navigation.navigate('AccountingNaviagtion'); }}
              />
            )}

            {global.previlage6 === "Reports" && (
              <DrawerItem
                labelStyle={{ fontSize: Device.isTablet ? 21 : 16 }}
                icon={({ color, size }) => (
                  <Image
                    style={styles.sidemenuimage}
                    source={require('../components/assets/images/reports.png')}
                  ></Image>
                )}
                label={I18n.t("Reports")}
                onPress={() => { props.navigation.navigate('ReportsNavigation'); }}
              />
            )}

            {global.previlage7 === "URM Portal" && (
              <DrawerItem
                labelStyle={{ fontSize: Device.isTablet ? 21 : 16 }}
                icon={({ color, size }) => (
                  <Image
                    style={styles.sidemenuimage}
                    source={require('../components/assets/images/urmportal.png')}
                  ></Image>
                )}
                label={I18n.t("URM Portal")}
                onPress={() => { props.navigation.navigate('UrmNavigation'); }}
              />
            )}
            <DrawerItem
              labelStyle={{ fontSize: Device.isTablet ? 21 : 16 }}
              icon={({ color, size }) => (
                <Image
                  style={styles.sidemenuimage}
                  source={require('../components/assets/images/sidesettings.png')}
                ></Image>
              )}
              label={I18n.t("Profile Settings")}
              onPress={() => { props.navigation.navigate('Settings'); }}
            />

          </Drawer.Section>

        </View>
      </DrawerContentScrollView>
      {/* <Drawer.Section style={styles.bottomDrawerSection}>

            </Drawer.Section> */}

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          labelStyle={{ fontSize: Device.isTablet ? 21 : 16 }}
          icon={({ color, size }) => (
            <Icon
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label={I18n.t("Domain Switch")}
          onPress={() => { props.navigation.navigate('SelectDomain'); }}
        />
        <DrawerItem
          labelStyle={{ fontSize: Device.isTablet ? 21 : 16 }}
          icon={({ color, size }) => (
            <Icon
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label={I18n.t("Sign Out")}
          onPress={() => { props.navigation.navigate('Login'); }}
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
    fontSize: Device.isTablet ? 21 : 16,
    marginTop: Device.isTablet ? 20 : 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  caption: {
    marginTop: -5,
    fontSize: Device.isTablet ? 19 : 14,
    lineHeight: Device.isTablet ? 20 : 14,
    fontFamily: "medium",
    color: '#000000',
  },
  middelcaption: {
    marginTop: 2,
    fontSize: Device.isTablet ? 19 : 14,
    lineHeight: Device.isTablet ? 20 : 14,
    fontFamily: "medium",
    color: '#ffffff',
  },
  logoimage: {
    width: Device.isTablet ? 200 : 150,
    height: Device.isTablet ? 85 : 50,
    marginTop: 20,
    // marginLeft: Device.isTablet ? 10 : 20,
  },
  image: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    height: Device.isTablet ? 100 : 70,
    width: Device.isTablet ? 100 : 70,
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
  languageButton: {
    // width: Device.isTablet ? 90 : 70,
    paddingLeft: 10,
    paddingRight: 10,
    height: Device.isTablet ? 30 : 20,
    backgroundColor: '#DDDDDD',
    borderRadius: Device.isTablet ? 10 : 6,
    marginTop: 10,
    borderColor: '#ED1C24',
    borderWidth: Device.isTablet ? 2 : 1,
  },
  languageText: {
    color: "#ED1C24",
    fontSize: Device.isTablet ? 17 : 12,
    fontFamily: 'medium',
    alignSelf: 'center',
    marginTop: 3,
  }
});
