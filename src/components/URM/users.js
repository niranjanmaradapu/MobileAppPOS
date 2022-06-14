import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UrmService from '../services/UrmService'
import EmptyList from '../Errors/EmptyList'
import { buttonContainer, buttonImageStyle, buttonStyle1, flatListMainContainer, flatlistSubContainer, highText, textContainer, textStyleLight, textStyleMedium } from '../Styles/Styles'
import Device from 'react-native-device-detection'

export default class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientId: 0,
      pageNumber: 0,
      usersList: [],
      totalPages: 0,
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

  render() {
    return (
      <View>
        <FlatList
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
                      <Text style={[textStyleMedium, { backgroundColor: '#009900', color: '#ffffff', padding: Device.isTablet ? 10 : 5, alignSelf: 'flex-start', borderRadius: Device.isTablet ? 10 : 5, fontFamily: 'medium' }]}>Active</Text>
                      :
                      <Text style={[textStyleMedium, { backgroundColor: '#ee0000', color: '#ffffff', padding: Device.isTablet ? 10 : 5, alignSelf: 'flex-start', borderRadius: 5, fontFamily: 'medium' }]}>In-Active</Text>
                    }
                    <TouchableOpacity style={buttonStyle1} onPress={() => this.handleedituser(item, index)}>
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
      </View>
    )
  }
}