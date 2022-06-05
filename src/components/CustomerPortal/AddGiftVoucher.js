import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import CustomerService from '../services/CustomerService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { datePicker, datePickerBtnText, datePickerButton1, datePickerButton2, dateSelector, dateText, inputField, inputHeading, submitBtn, submitBtnText } from '../Styles/FormFields';
import { RH, RF, RW } from '../../Responsive';
import { filterBtn, flatListHeaderContainer, flatListTitle } from '../Styles/Styles';
import Modal from 'react-native-modal'

var deviceheight = Dimensions.get('window').height;
var deviceheight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get("window").width;


export default class AddGiftVoucher extends Component {
  render() {
    return (
      <View>
        <TextInput
          style={inputField}
          placeholder={('GV NUMBER *')}
          placeholderTextColor="#6f6f6f60"
          textAlignVertical="center"
          keyboardType={'default'}
          autoCapitalize='none'
          value={this.state.gvNumber}
          onChangeText={(text) => this.handleGvNumber(text)}
        />
        <TextInput
          style={inputField}
          placeholder={I18n.t('DESCRIPTION')}
          placeholderTextColor="#6f6f6f60"
          textAlignVertical="center"
          keyboardType={'default'}
          autoCapitalize='none'
          value={this.state.description}
          onChangeText={(text) => this.handleDescription(text)}
        />
        <TouchableOpacity
          style={dateSelector}
          testID="openModal"
          onPress={() => this.datepickerClicked()}
        >
          <Text
            style={dateText}
          >{this.state.startDate === "" ? 'Start Date' : this.state.startDate}</Text>
          <Image style={styles.calenderpng} source={require('../assets/images/calender.png')} />
        </TouchableOpacity>
        {this.state.datepickerOpen && (
          <View style={styles.dateTopView}>
            <View style={styles.dateTop2}>
              <TouchableOpacity
                style={datePickerButton1} onPress={() => this.datepickerCancelClicked()}
              >
                <Text style={datePickerBtnText}  > Cancel </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={datePickerButton2} onPress={() => this.datepickerDoneClicked()}
              >
                <Text style={datePickerBtnText}  > Done </Text>
              </TouchableOpacity>
            </View>
            <DatePicker style={datePicker}
              date={this.state.date}
              mode={'date'}
              onDateChange={(date) => this.setState({ date })}
            />
          </View>
        )}
        <TouchableOpacity
          style={dateSelector}
          testID="openModal"
          onPress={() => this.enddatepickerClicked()}
        >
          <Text
            style={dateText}
          >{this.state.endDate === '' ? 'End Date' : this.state.endDate}</Text>
          <Image style={styles.calenderpng} source={require('../assets/images/calender.png')} />
        </TouchableOpacity>

        {this.state.datepickerendOpen && (
          <View style={styles.dateTopView}>
            <View style={styles.dateTop2}>
              <View>
                <TouchableOpacity
                  style={datePickerButton1} onPress={() => this.datepickerCancelClicked()}
                >
                  <Text style={datePickerBtnText}  > Cancel </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={datePickerButton2} onPress={() => this.datepickerendDoneClicked()}
                >
                  <Text style={datePickerBtnText}  > Done </Text>
                </TouchableOpacity>
              </View>
            </View>
            <DatePicker style={datePicker}
              date={this.state.enddate}
              mode={'date'}
              onDateChange={(enddate) => this.setState({ enddate })}
            />
          </View>
        )}
        <View >
          <TextInput
            style={inputField}
            placeholder={I18n.t('GIFT VALUE *')}
            placeholderTextColor="#6f6f6f60"
            textAlignVertical="center"
            keyboardType={'default'}
            autoCapitalize='none'
            value={this.state.giftValue}
            onChangeText={(text) => this.handleValue(text)}
          />
          <TouchableOpacity
            style={submitBtn}
            onPress={() => this.addGiftVocher()}
          >
            <Text style={submitBtnText}>{I18n.t("Add Gift Voucher")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  date: {
    width: deviceWidth,
    height: RH(200),
    marginTop: RH(50),
  },
  calenderpng: {
    position: 'absolute',
    top: RH(10),
    right: 0,
  },
  dateTopView: {
    height: RW(280),
    width: deviceWidth,
    backgroundColor: '#ffffff'
  },
  dateTop2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Device.isTablet ? 15 : RH(10),
    marginLeft: Device.isTablet ? 20 : RW(10),
    marginRight: Device.isTablet ? 20 : RW(10)
  },
  mainContainer: {
    flex: 1,
  },

})