import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ClipboardStatic } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import Modal from 'react-native-modal';
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import InventoryService from '../services/InventoryService'
import { flatListMainContainer, flatlistSubContainer, highText, textContainer, textStyleLight, textStyleMedium } from '../Styles/Styles';

var deviceWidth = Dimensions.get("window").width;
var deviceheight = Dimensions.get("window").height;

export default class ProductCombo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      domainId: 0,
      storeId: 0,
      fromDate: "",
      toDate: "",
      productComboList: [],
    }
  }

  async componentDidMount() {
    const domainId = await AsyncStorage.getItem("domainDataId")
    console.log("doaminId",domainId)
    const storeId = await AsyncStorage.getItem("storeId")
    this.setState({ storeId: parseInt(storeId), domainId: parseInt(domainId) })
    this.getAllProductsCombo()
  }

  async getAllProductsCombo() {
    const { storeId } = this.state
    let params = '';
    params = '?storeId=' + storeId
    console.log(params)
    axios.post(InventoryService.getProductCombo() + params).then(res => {
      if (res) {
        this.setState({ productComboList: res.data.result })
        console.log("Products Combo List", this.state.productComboList)
      }
    })
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.productComboList}
          style={{ marginTop: 20 }}
          scrollEnabled={true}
          keyExtractor={(item, i) => i.toString()}
          ListEmptyComponent={<Text>&#9888; Records Not Found</Text>}
          renderItem={({ item, index }) => (
            <View style={flatListMainContainer}>
              <View style={flatlistSubContainer}>
                <View style={textContainer}>
                  <Text style={highText}>Invetory-ID {item.id}</Text>
                </View>
                <View style={textContainer}>
                  <Text style={textStyleMedium}>Store Id {item.storeId}</Text>
                  <Text style={textStyleLight}>Combo Name {item.name}</Text>
                </View>
                <View style={textContainer}>
                  <Text style={textStyleLight}>No.of Items {item.bundleQuantity}</Text>
                  <Text style={textStyleLight}>Unit Price {item.value}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    )
  }
}