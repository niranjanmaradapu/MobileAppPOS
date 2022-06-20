import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UrmService from '../services/UrmService'
import EmptyList from '../Errors/EmptyList'
import { buttonContainer, buttonImageStyle, buttonStyle1, filterBtn, flatListHeaderContainer, flatListMainContainer, flatlistSubContainer, flatListTitle, highText, singleButtonStyle, textContainer, textStyleLight, textStyleMedium } from '../Styles/Styles'
import Device from 'react-native-device-detection'

export default class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientId: 0,
      pageNumber: 0,
      usersList: [],
      totalPages: 0,
      filterActive: false,
      modalVisible: true,
      flagFilterOpen: false,
    }
  }



  async componentDidMount() {
    const clientId = await AsyncStorage.getItem("custom:clientId1");
    this.setState({ clientId: clientId })
    console.log({ clientId })
    this.getAllUsers()
  }

  getAllUsers() {
    const { clientId, pageNumber } = this.state
    UrmService.getAllUsers(clientId, pageNumber).then(res => {
      let response = res.data.content
      console.log({ response })
      if (res) {
        if (res.data) {
          this.setState({ usersList: this.state.usersList.concat(response), totalPages: res.data.totalPages })
        }
      }
    })
  }

  filterAction() {
    this.setState({ flagFilerOpen: true, modalVisible: true })
  }

  handleedituser() {

  }

  render() {
    return (
      <View>
        <FlatList
          ListHeaderComponent={<View style={flatListHeaderContainer}>
            <Text style={flatListTitle}>Users</Text>
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
          data={this.state.usersList}
          style={{ marginTop: 20 }}
          ListEmptyComponent={<EmptyList message={this.state.rolesError} />}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={flatListMainContainer}>
              <View style={flatlistSubContainer}>
                <View style={textContainer}>
                  <Text style={highText}>UserId: {item.id}</Text>
                  <Text style={textStyleLight}>Date: {item.createdDate ? item.createdDate.toString().split(/T/)[0] : item.createdDate}</Text>
                </View>
                <View style={textContainer}>
                  <Text style={textStyleMedium}>UserName: {item.userName}</Text>
                  <View style={buttonContainer}>
                    {item.isActive ?
                      <Text style={[textStyleMedium, { backgroundColor: '#009900', color: '#ffffff', marginTop: 5, padding: Device.isTablet ? 10 : 5, alignSelf: 'flex-start', borderRadius: Device.isTablet ? 10 : 5, fontFamily: 'medium' }]}>Active</Text>
                      :
                      <Text style={[textStyleMedium, { backgroundColor: '#ee0000', color: '#ffffff', marginTop: 5, padding: Device.isTablet ? 10 : 5, alignSelf: 'flex-start', borderRadius: 5, fontFamily: 'medium' }]}>In-Active</Text>
                    }
                    <TouchableOpacity style={singleButtonStyle} onPress={() => this.handleedituser(item, index)}>
                      <Image style={buttonImageStyle} source={require('../assets/images/edit.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={textContainer}>
                  <Text style={textStyleMedium}>Stores: {item.stores.map((store, index) => {
                    return <Text>{store.name}, </Text>
                  })}</Text>
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

                  <View style={rnPickerContainer}>
                    <RNPickerSelect
                      placeholder={{
                        label: 'USER TYPE'
                      }}
                      Icon={() => {
                        return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                      }}
                      items={[
                        { label: 'Active', value: 'Active' },
                        { label: 'InActive', value: 'InActive' },
                      ]}
                      onValueChange={this.handleUSerType}
                      style={rnPicker}
                      value={this.state.userType}
                      useNativeAndroidPickerStyle={false}
                    />
                  </View>
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
                    placeholder={I18n.t("STORE/BRANCH")}
                    placeholderTextColor="#6F6F6F"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.branch}
                    onChangeText={this.handleBranch}
                  />
                  <TouchableOpacity style={submitBtn}
                    onPress={() => this.applyUserFilter()}>
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