import { Text, View } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Roles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientId: "",
      rolesData: [],
      filterRolesData: [],
    }
  }

  async componentDidMount() {
    const clientId = await AsyncStorage.getItem("custom:clientId1");
    this.setState({ clientId: clientId });
    this.getRolesList()
  }

  getRolesList() {
    this.setState({ loading: true });
    axios.get(UrmService.getAllRoles() + this.state.clientId).then((res) => {
      let len = res.data["result"].length;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          let number = res.data.result[i];
          console.log(number);
          this.setState({ loading: false });
          this.state.rolesData.push(number);
        }
        this.setState({ rolesData: this.state.rolesData, rolesError: "", loading: false });
      } else {
        this.setState({ rolesError: "Records Not Found", loading: false })
      }
    }).catch(() => {
      this.setState({ loading: false, rolesError: "Records Not Found" });
      console.log("There is an Error Getting Roles");
    });
  }

  render() {
    return (
      <View>
        <Text>Roles</Text>
      </View>
    )
  }
}