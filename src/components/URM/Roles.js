import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import { RW, RF, RH } from '../../Responsive';
import Loader from "../../commonUtils/loader";
import UrmService from '../services/UrmService';
import UrmDashboard from './UrmDashboard';
import EmptyList from '../Errors/EmptyList';
import { buttonContainer, buttonStyle, buttonStyle1, filterBtn, flatListMainContainer, flatlistSubContainer, headerNavigationBtn, headerNavigationBtnText, headerTitle, headerTitleContainer, headerTitleSubContainer, headerTitleSubContainer2, highText, buttonImageStyle, menuButton, textContainer, textStyleLight, textStyleMedium, flatListHeaderContainer, flatListTitle, singleButtonStyle } from '../Styles/Styles';
import { filterMainContainer, filterSubContainer, filterHeading, filterCloseImage, deleteText, deleteHeading, deleteHeader, deleteContainer, deleteCloseBtn } from '../Styles/PopupStyles';
import { inputField, rnPickerContainer, rnPicker, submitBtn, submitBtnText, cancelBtn, cancelBtnText, datePicker, datePickerBtnText, datePickerButton1, datePickerButton2, datePickerContainer, dateSelector, dateText, } from '../Styles/FormFields';


var deviceheight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export default class Roles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientId: "",
      rolesData: [],
      filterRolesData: [],
      pageNumber: 0,
      flagFilterOpen: false,
      modalVisible: true,
      createdDate: "",
    }
  }

  async componentDidMount() {
    const clientId = await AsyncStorage.getItem("custom:clientId1");
    this.setState({ clientId: clientId });
    this.getRolesList()
  }

  // Getting Roles List
  getRolesList() {
    const { clientId, pageNumber } = this.state
    UrmService.getAllRoles(clientId, pageNumber).then(res => {
      if (res) {
        let response = res.data
        console.log({ response })
        this.setState({ rolesData: res.data })
      }
    })
  }

  // Filter Section
  filterAction() {
    this.setState({ flagFilterOpen: true, modalVisible: true })
  }

  clearFilterAction() {
    this.setState({filterActive: false})
    this.getRolesList()
  }

    modelCancel() {
    this.setState({ modalVisible: false })
  }

  handleCreatedBy = (value) => {
    this.setState({createdBy: value})
  }

  handleRole = (value) => {
    this.setState({role: value})
  }

    datepickerClicked() {
    this.setState({ datepickerOpen: true });
  }

    datepickerCancelClicked() {
    this.setState({ date: new Date(), enddate: new Date(), datepickerOpen: false, datepickerendOpen: false });
  }

  datepickerDoneClicked() {
    if (parseInt(this.state.date.getDate()) < 10 && (parseInt(this.state.date.getMonth()) < 10)) {
      this.setState({ startDate: this.state.date.getFullYear() + "-0" + (this.state.date.getMonth() + 1) + "-" + "0" + this.state.date.getDate() });
    }
    else if (parseInt(this.state.date.getDate()) < 10) {
      this.setState({ startDate: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + "0" + this.state.date.getDate() });
    }
    else if (parseInt(this.state.date.getMonth()) < 10) {
      this.setState({ startDate: this.state.date.getFullYear() + "-0" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate() });
    }
    else {
      this.setState({ startDate: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate() });
    }
    this.setState({ doneButtonClicked: true, datepickerOpen: false, datepickerendOpen: false });
  }


applyRoleFilter() {
  const {role, createdBy, createdDate} = this.state
  this.setState({loading: true})
const searchRole = {
  "roleName": role ?  role : null,
  "createdBy": createdBy ? createdBy : null,
  "createdDate": createdDate ? createdDate : null
}
UrmService.getRolesBySearch(searchRole).then(res => {
  if(res) {
    let rolesList = res.data.result
    console.log({rolesList})
    this.setState({filterRolesData: rolesList, filterActive: true})
  }
    this.setState({loading: false, modalVisible: false})
})
}



  handleeditrole(item, index) {
    this.props.navigation.navigate('CreateRole',
      {
      item: item, isEdit: true,
      onGoBack: () => this.getRolesList()
    })
  }


  render() {
    const {filterActive, rolesData, filterRolesData} = this.state
    return (
      <View>
        <FlatList
          ListHeaderComponent={<View style={flatListHeaderContainer}>
            <Text style={flatListTitle}>Roles</Text>
            {!this.state.filterActive &&
              <TouchableOpacity
                style={filterBtn}
                onPress={() => this.filterAction()} >
                <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/promofilter.png')} />
              </TouchableOpacity>

            }
            {this.state.filterActive &&
              <TouchableOpacity
                style={filterBtn}
                onPress={() => this.clearFilterAction()} >
                <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/clearFilterSearch.png')} />
              </TouchableOpacity>
            }
          </View>}
          data={filterActive ? filterRolesData :rolesData}
          ListEmptyComponent={<EmptyList message={this.state.rolesError} />}
          scrollEnabled={true}
          renderItem={({ item, index }) => (
            <View style={flatListMainContainer}>
              <View style={flatlistSubContainer}>
                <View style={textContainer}>
                  <Text style={highText}>S.No {index + 1}</Text>
                  <Text style={textStyleLight}>Date: {item.createdDate ? item.createdDate.toString().split(/T/)[0] : item.createdDate}</Text>
                </View>
                <View style={textContainer}>
                  <Text style={textStyleMedium}>Role: {item.roleName}</Text>
                  <Text style={textStyleLight}>User Count: {item.usersCount}</Text>
                </View>
                <View style={textContainer}>
                  <Text style={textStyleMedium}>Created By: {item.createdBy}</Text>
                  <View style={buttonContainer}>
                    <TouchableOpacity style={singleButtonStyle} onPress={() => this.handleeditrole(item, index)}>
                      <Image style={buttonImageStyle} source={require('../assets/images/edit.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
        {this.state.flagFilterOpen && (
          <View>
            <Modal isVisible={this.state.modalVisible} style={{ margin: 0 }}>
              <View style={filterMainContainer} >
                <View>
                  <View style={filterSubContainer}>
                    <View>
                      <Text style={filterHeading} > {I18n.t("Filter By")} </Text>
                    </View>
                    <View>
                      <TouchableOpacity style={filterCloseImage} onPress={() => this.modelCancel()}>
                        <Image style={{ margin: 5 }} source={require('../assets/images/modelcancel.png')} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={{
                    height: Device.isTablet ? 2 : 1,
                    width: deviceWidth,
                    backgroundColor: 'lightgray',
                  }}></Text>
                </View>
                <KeyboardAwareScrollView enableOnAndroid={true} >
                  <TextInput
                    style={inputField}
                    underlineColorAndroid="transparent"
                    placeholder={I18n.t("ROLE")}
                    placeholderTextColor="#6F6F6F"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.role}
                    onChangeText={this.handleRole}
                  />
                  <TextInput
                    style={inputField}
                    underlineColorAndroid="transparent"
                    placeholder={I18n.t("CREATED BY")}
                    placeholderTextColor="#6F6F6F"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.createdBy}
                    onChangeText={this.handleCreatedBy}
                  />
                  <TouchableOpacity
                    style={dateSelector} testID="openModal"

                    onPress={() => this.filterDatepickerClicked()}
                  >
                    <Text style={dateText}  > {this.state.createdDate === "" ? 'CREATED DATE' : this.state.createdDate} </Text>
                    <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../assets/images/calender.png')} />
                  </TouchableOpacity>
                  {this.state.datepickerOpen && (
                    <View style={datePickerContainer}>
                      <TouchableOpacity
                        style={datePickerButton1} onPress={() => this.filterDatepickerCancelClicked()}
                      >
                        <Text style={datePickerBtnText}  > Cancel </Text>

                      </TouchableOpacity>
                      <TouchableOpacity
                        style={datePickerButton2} onPress={() => this.filterDatepickerDoneClicked()}
                      >
                        <Text style={datePickerBtnText}  > Done </Text>

                      </TouchableOpacity>
                      <DatePicker style={datePicker}
                        date={this.state.date}
                        mode={'date'}
                        onDateChange={(date) => this.setState({ date })}
                      />
                    </View>
                  )}

                  <TouchableOpacity style={submitBtn}
                    onPress={() => this.applyRoleFilter()}>
                    <Text style={submitBtnText} >{I18n.t("APPLY")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={cancelBtn}
                    onPress={() => this.modelCancel()}>
                    <Text style={cancelBtnText}>{I18n.t("CANCEL")}</Text>
                  </TouchableOpacity>
                </KeyboardAwareScrollView>
              </View>
            </Modal>
          </View>
        )}

      </View>
    )
  }
}
