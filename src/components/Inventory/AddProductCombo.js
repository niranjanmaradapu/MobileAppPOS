import { FlatList, Text, TextInput, Image, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { backButton, headerTitleContainer, headerTitleSubContainer, backButtonImage, headerTitle, flatListMainContainer, flatlistSubContainer, textContainer, highText, textStyleMedium, textStyleLight, buttonContainer, buttonStyle, buttonImageStyle } from '../Styles/Styles'
import { cancelBtn, cancelBtnText, inputField, inputHeading, submitBtn, submitBtnText } from '../Styles/FormFields'
import axios from 'axios'
import InventoryService from '../services/InventoryService'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class AddProductCombo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      comboName: "",
      comboQty: "",
      barCodeId: "",
      storeId: 0,
      domainId: 0,
      selectedDomainId: 0,
      listOfProducts: [],
      comboDescription: ""
    }
  }

  async componentDidMount() {
    const domainId = await AsyncStorage.getItem("domainDataId")
    const storeId = await AsyncStorage.getItem("storeId")
    console.log("storeId")
    let selectedDomain = 0;
    if (global.domainName === "Textile") {
      selectedDomain = 1
    } else {
      selectedDomain = 2
    }
    this.setState({ storeId: parseInt(storeId), domainId: parseInt(domainId), selectedDomainId: selectedDomain })
  }

  handleBarcodeId = (value) => {
    this.setState({ barCodeId: value })
  }

  handleComboName = (value) => {
    this.setState({ comboName: value })
  }

  handleComboQty = (value) => {
    this.setState({ comboQty: value })
  }

  saveProduct() {
    const { comboName, comboQty, barCodeId, selectedDomainId, storeId, listOfProducts, comboDescription } = this.state
    const comboProductList = listOfProducts.map((item) => {
      const obj = {}
      obj.productTextileId = item.productTextileId
      obj.barcode = item.barcode
      obj.qty = item.qty
      return obj
    })

    const requestObj = {
      bundleQuantity: comboQty,
      storeId: storeId,
      description: comboDescription,
      domainId: selectedDomainId,
      name: comboName,
      productTextiles: comboProductList
    }

    
  }

  getBarcodeDetails() {
    const { selectedDomainId, storeId, barCodeId } = this.state
    let param = `?barcode=${barCodeId}&storeId=${storeId}`
    console.log("get Barcode", param)
    axios.get(InventoryService.getTextileBarcodesDetails() + param).then(res => {
      if (res && res.data.isSuccess === "true" && res.data.result) {
        const { barcode, name, itemMrp, qty, productTextileId } = res.data.result
        const obj = { barcode, name, itemMrp, qty, productTextileId }
        console.log(obj)
        this.setState({ listOfProducts: [...this.state.listOfProducts, obj] })
      }
      console.log(this.state.listOfProducts)
    })
  }

  cancel() {
    this.props.navigation.goBack(null);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null)
  }

  handleProductDeleteAction(item, index) {
    const listOfProducts = [...this.state.listOfProducts]
    listOfProducts.splice(index, 1)
    this.setState({ listOfProducts })
  }

  render() {
    return (
      <View>
        <View style={headerTitleContainer}>
          <View style={headerTitleSubContainer}>
            <TouchableOpacity style={backButton} onPress={() => this.handleBackButtonClick()}>
              <Image style={backButtonImage} source={require('../assets/images/backButton.png')} />
            </TouchableOpacity>
            <Text style={headerTitle}> Add Product Combo </Text>
          </View>
        </View>
        <View>
          <Text style={inputHeading}>Combo Name</Text>
          <TextInput
            style={inputField}
            underlineColorAndroid="transparent"
            placeholder='Combo Name'
            placeholderTextColor={"#6f6f6f17"}
            textAlignVertical="center"
            autoCapitalize='none'
            value={this.state.comboName}
            onChangeText={this.handleComboName}
          />
          <Text style={inputHeading}>Combo Qty</Text>
          <TextInput
            style={inputField}
            underlineColorAndroid="transparent"
            placeholder='Combo Qty'
            placeholderTextColor={"#6f6f6f17"}
            textAlignVertical="center"
            autoCapitalize='none'
            value={this.state.comboQty}
            onChangeText={this.handleComboQty}
          />
          <Text style={inputHeading}>Barcode</Text>
          <TextInput
            style={inputField}
            underlineColorAndroid="transparent"
            placeholder='Barcode'
            placeholderTextColor={"#6f6f6f17"}
            textAlignVertical="center"
            autoCapitalize='none'
            value={this.state.barCodeId}
            onChangeText={this.handleBarcodeId}
            onEndEditing={() => { this.getBarcodeDetails() }}
          />
          <TouchableOpacity style={submitBtn} onPress={() => { this.saveProduct() }}>
            <Text style={submitBtnText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={cancelBtn} onPress={() => { this.cancel() }}>
            <Text style={cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={this.state.listOfProducts}
            style={{ marginTop: 20 }}
            scrollEnabled={true}
            renderItem={({ item, index }) => (
              <View style={flatListMainContainer}>
                <View style={flatlistSubContainer}>
                  <View style={textContainer}>
                    <Text style={highText}>S.No {index + 1}</Text>
                    <View style={buttonContainer}>
                      <TouchableOpacity style={buttonStyle} onPress={() => this.handleProductDeleteAction(item, index)}>
                        <Image style={buttonImageStyle} source={require('../assets/images/delete.png')} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={textContainer}>
                    <Text style={textStyleMedium}>Barcode: {item.barcode}</Text>
                    <Text style={textStyleLight}>Product Name: {item.name}</Text>
                  </View>
                  <View style={textContainer}>
                    <Text style={textStyleLight}>Unit Price: {item.price}</Text>
                    <Text style={textStyleLight}>Unit Qty: {item.qty}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    )
  }
}