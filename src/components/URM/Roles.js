import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UrmService from '../services/UrmService'
import EmptyList from '../Errors/EmptyList'
import { buttonContainer, buttonImageStyle, buttonStyle1, flatListMainContainer, flatlistSubContainer, highText, textContainer, textStyleLight, textStyleMedium } from '../Styles/Styles'

export default class Roles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientId: "",
      rolesData: [],
      filterRolesData: [],
      pageNumber: 0,
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

  render() {
    return (
      <View>
        <FlatList
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
                    <TouchableOpacity style={buttonStyle1} onPress={() => this.handleedituser(item, index)}>
                      <Image style={buttonImageStyle} source={require('../assets/images/edit.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    )
  }
}