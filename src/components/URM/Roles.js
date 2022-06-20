import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UrmService from '../services/UrmService'
import EmptyList from '../Errors/EmptyList'
import { buttonContainer, buttonImageStyle, buttonStyle1, filterBtn, flatListHeaderContainer, flatListMainContainer, flatlistSubContainer, flatListTitle, highText, singleButtonStyle, textContainer, textStyleLight, textStyleMedium } from '../Styles/Styles'

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
    }
  }

  async componentDidMount() {
    const clientId = await AsyncStorage.getItem("custom:clientId1");
    this.setState({ clientId: clientId });
    this.getRolesList()
  }

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

  filterAction() {
    this.setState({ flagFilterOpen: true, modalVisible: true })
  }

  handleRole(item, index) {
    this.props.navigation.navigate('EditRole');
  }

  handleeditrole() {

  }

  render() {
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
          data={this.state.rolesData}
          style={{ marginTop: 20 }}
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