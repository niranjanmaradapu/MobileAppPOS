import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Device from 'react-native-device-detection';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import { cancelBtn, cancelBtnText, inputFieldDisabled, inputArea, inputField, inputHeading, rnPicker, rnPickerContainer, submitBtn, submitBtnText } from '../Styles/FormFields';
import { backButton, backButtonImage, headerTitle, headerTitleContainer, headerTitleSubContainer } from '../Styles/Styles';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountingService from '../services/AccountingService';
var deviceWidth = Dimensions.get('window').width;

export default class AddDebitNotes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
      customerId: "",
      mobileNumber: "",
      storeName: "",
      approvedBy: "",
      transanctionMode: "",
      debitAmount: 0,
      payableAmount: 0,
      comments: "",
      trasanctionTypes: [
        { label: 'Card', value: 'Card' },
        { label: 'Cash', value: 'Cash' }
      ],
    };
  }

  async componentDidMount() {
    const userName = await AsyncStorage.getItem("username")
    const storeId = await AsyncStorage.getItem("storeId")
    const storeName = await AsyncStorage.getItem("storeName")
    this.setState({
      storeId: storeId,
      storeName: storeName,
      approvedBy: userName,
      customerName: this.props.route.params.item.customerName,
      customreId: this.props.route.params.item.customerId,
      debitAmount: this.props.route.params.item.amount.toString(),
      mobileNumber: this.props.route.params.item.mobileNumber,
    })
    console.log("items", this.props.route.params.item)
  }


  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  handleCustomerName = (value) => {
    this.setState({ customerName: value });
  };

  handleMobileNumber = (value) => {
    this.setState({ mobileNumber: value });
  };

  handleApprovedBy = (value) => {
    this.setState({ approvedBy: value });
  };

  handleComments = (value) => {
    this.setState({ comments: value })
  }

  handletransactionType = (value) => {
    this.setState({ transanctionMode: value })
  }

  handleStoreName = (value) => {
    this.setState({ storeName: value })
  }

  handledebitAmount = (value) => {
    this.setState({ debitAmount: value })
  }

  handlePayableAmount = (value) => {
    this.setState({ payableAmount: value })
    console.log(this.state.payableAmount)
  }

  saveDebit() {
    const { customreId, comments, storeId, mobileNumber, payableAmount, transanctionMode } = this.state
    const obj = {
      comments: comments,
      amount: payableAmount,
      customerId: customreId,
      storeId: storeId,
      transactionType: "DEBIT",
      accountType: "DEBIT",
      paymentType: transanctionMode
    }
    console.log("params", obj)
    AccountingService.saveDebit(obj).then(res => {
      if (res) {
        if (transanctionMode === 'Card') {
          this.savePayment(res.data.amount, res.data.referenceNumber);
        } else {
          this.props.route.params.onGoBack()
          this.props.navigation.goBack()
        }
        console.log(res.data)
        // alert(res.data.message)
      } else {
        this.props.route.params.onGoBack()
        this.props.navigation.goBack()
      }
    }).catch(err => {
      console.log(err)
      this.props.route.params.onGoBack()
      this.props.navigation.goBack()
    })
  }

  savePayment = (cardAmount, referenceNumber) => {
    const reqObj = {
      amount: cardAmount,
      type: "C",
      referenceNumber: referenceNumber
    }
    AccountingService.creditDebitOrder(reqObj).then((res) => {
      const options = {
        // process.env.RAZORPAY_KEY_ID
        key: "rzp_test_z8jVsg0bBgLQer",
        currency: "INR",
        amount: res.data.result.amount,
        name: "OTSI",
        description: "Transaction",
        image: 'https://i.imgur.com/3g7nmJC.png',
        order_id: res.data.result.razorPayId,
        handler: function (response) {
          toast.success("Payment Done Successfully");
          let status = true
          const param = '?razorPayId=' + response.razorpay_order_id + '&payStatus=' + status;
          const result = axios.post(BASE_URL + NEW_SALE_URL.saveSale + param, {});
        },
        prefill: {
          name: "Kadali",
          email: "kadali@gmail.com",
          contact: "9999999999",
        },
      };
      RazorpayCheckout.open(options).then((data) => {
        this.setState({ tableData: [] });
        alert(`Success: ${data.razorpay_payment_id}`);
        this.props.navigation.goBack();
      }).catch(err => {
        console.log(err)
        alert(`Error: ${JSON.stringify(err.code)} | ${JSON.stringify(err.description)}`);
      })
    })
  }

  cancel() {
    this.props.navigation.goBack(null);
    return true;
  }

  render() {
    return (
      <View>
        <View style={headerTitleContainer} >
          <View style={headerTitleSubContainer}>
            <TouchableOpacity style={backButton} onPress={() => this.handleBackButtonClick()}>
              <Image style={backButtonImage} source={require('../assets/images/backButton.png')} />
            </TouchableOpacity>
            <Text style={headerTitle}>
              Add Debit Notes
            </Text>
          </View>
        </View>
        <ScrollView>
          <Text style={inputHeading}>Mobile Number</Text>
          <TextInput
            style={inputFieldDisabled}
            underlineColorAndroid="transparent"
            placeholder="Mobile Number"
            placeholderTextColor="#000000"
            editable={false}
            textAlignVertical="center"
            autoCapitalize='none'
            value={this.state.mobileNumber}
            onChangeText={this.handleMobileNumber}
          />
          <Text style={inputHeading}>Customer Name</Text>
          <TextInput
            style={inputFieldDisabled}
            underlineColorAndroid="transparent"
            placeholder="Customer Name"
            editable={false}
            placeholderTextColor="#000000"
            textAlignVertical="center"
            autoCapitalize='none'
            value={this.state.customerName}
            onChangeText={this.handleCustomerName}
          />
          <Text style={inputHeading}>Debit Amount</Text>
          <TextInput
            style={inputFieldDisabled}
            underlineColorAndroid="transparent"
            placeholder="Debit Amount"
            placeholderTextColor="#000000"
            editable={false}
            textAlignVertical="center"
            autoCapitalize='none'
            value={this.state.debitAmount}
            onChangeText={this.handledebitAmount}
          />
          <Text style={inputHeading}>Store</Text>
          <TextInput
            style={inputFieldDisabled}
            underlineColorAndroid="transparent"
            placeholder="Store Name"
            placeholderTextColor="#000000"
            textAlignVertical="center"
            editable={false}
            autoCapitalize='none'
            value={this.state.storeName}
            onChangeText={this.handleStoreName}
          />
          <Text style={inputHeading}>Approved By</Text>
          <TextInput
            style={inputFieldDisabled}
            underlineColorAndroid="transparent"
            placeholder="Approved By"
            placeholderTextColor="#000000"
            textAlignVertical="center"
            editable={false}
            autoCapitalize='none'
            value={this.state.approvedBy}
            onChangeText={this.handleApprovedBy}
          />
          <Text style={inputHeading}>Payment Type</Text>
          <View style={rnPickerContainer}>
            <RNPickerSelect
              placeholder={{
                label: 'Payment Type',
                value: "",
              }}
              Icon={() => {
                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
              }}
              items={this.state.trasanctionTypes}
              onValueChange={this.handletransactionType}
              style={rnPicker}
              value={this.state.transanctionMode}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          {this.state.transanctionMode === "Cash" &&
            (<View>
              <Text style={inputHeading}>Payable Cash</Text>
              <TextInput
                style={inputField}
                underlineColorAndroid="transparent"
                placeholder="Payable Cash"
                placeholderTextColor="#6F6F6F"
                textAlignVertical="center"
                autoCapitalize="none"
                value={this.state.payableAmount}
                onChangeText={this.handlePayableAmount}
              />
            </View>)
          }
          <Text style={inputHeading}>Comments</Text>
          <TextInput
            style={inputArea}
            underlineColorAndroid="transparent"
            placeholder="COMMENTS"
            placeholderTextColor="#6F6F6F"
            textAlignVertical="center"
            autoCapitalize="none"
            value={this.state.comments}
            onChangeText={this.handleComments}
          />
          <TouchableOpacity style={submitBtn}
            onPress={() => this.saveDebit()}>
            <Text style={submitBtnText}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={cancelBtn}
            onPress={() => this.cancel()}>
            <Text style={cancelBtnText}>CANCEL</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imagealign: {
    marginTop: Device.isTablet ? 25 : 20,
    marginRight: Device.isTablet ? 30 : 20,
  }
})