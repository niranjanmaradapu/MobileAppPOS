import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ClipboardStatic } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import Modal from 'react-native-modal';
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import InventoryService from '../services/InventoryService'
import { flatListHeaderContainer, flatListMainContainer, flatlistSubContainer, flatListTitle, headerTitle, headerTitleContainer, highText, listEmptyMessage, textContainer, textStyleLight, textStyleMedium } from '../Styles/Styles';
import { RF, RW, RH } from '../../Responsive';
var deviceWidth = Dimensions.get("window").width;
var deviceheight = Dimensions.get("window").height;
import Loader from '../../commonUtils/loader';

export default class ProductCombo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      domainId: 0,
      storeId: 0,
      fromDate: "",
      toDate: "",
      productComboList: [],
      loading: false
    }
  }

  async componentDidMount() {

    const storeId = await AsyncStorage.getItem("storeId")
    this.setState({ storeId: parseInt(storeId), })
    this.getAllProductsCombo()
  }

  async getAllProductsCombo() {
    this.setState({ loading: true })
    const { storeId, fromDate, toDate } = this.state
    let params = `?storeId=${storeId}`
    console.log({ params })
    InventoryService.getProductCombo(params).then(res => {
      console.log({ res })
      let productComboList = res.data.result.content
      console.log({ productComboList })
      this.setState({ productComboList: productComboList, loading: false })
    }).catch(err => {
      console.log({ err })
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <View>
        {this.state.loading &&
          <Loader
            loading={this.state.loading} />
        }
        <FlatList
          ListHeaderComponent={<View style={flatListHeaderContainer}>
            <Text style={flatListTitle}>Products Combo</Text>
          </View>}
          data={this.state.productComboList}
          scrollEnabled={true}
          keyExtractor={(item, i) => i.toString()}
          ListEmptyComponent={<Text style={listEmptyMessage}>&#9888; Records Not Found</Text>}
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
