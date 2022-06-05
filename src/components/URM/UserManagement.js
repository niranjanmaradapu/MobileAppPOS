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
import { listEmptyMessage, pageNavigationBtn, pageNavigationBtnText, filterBtn, menuButton, headerNavigationBtn, headerNavigationBtnText, headerTitle, headerTitleContainer, headerTitleSubContainer, headerTitleSubContainer2, buttonContainer, buttonStyle, buttonStyle1, flatListMainContainer, flatlistSubContainer, buttonImageStyle, textContainer, textStyleLight, textStyleMedium, highText } from '../Styles/Styles';
import { filterMainContainer, filterSubContainer, filterHeading, filterCloseImage, deleteText, deleteHeading, deleteHeader, deleteContainer, deleteCloseBtn } from '../Styles/PopupStyles';
import { inputField, rnPickerContainer, rnPicker, submitBtn, submitBtnText, cancelBtn, cancelBtnText, datePicker, datePickerBtnText, datePickerButton1, datePickerButton2, datePickerContainer, dateSelector, dateText, } from '../Styles/FormFields';

var deviceheight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;


export default class UserManagement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flagOne: false,
      flagTwo: false,
      flagFilterRoles: false,
      flagFilterUsers: false,
      filterButton: false,
      modalVisible: true,
      createdDate: "",
      date: new Date(),
      role: "",
      createdBy: "",
      branch: "",
      rolesData: [],
      usersData: [],
      roleDelete: false,
      userDelete: false,
      privilages: [],
      headerNames: [],
      clientId: 0,
      doneButtonClicked: false,
      navtext: '',
      flagDashboard: false,
      filterActive: false,
      usersError: "",
      rolesError: "",
    };
  }


  async componentDidMount() {
    const clientId = await AsyncStorage.getItem("custom:clientId1");
    this.setState({ clientId: clientId });
    AsyncStorage.getItem("custom:isConfigUser").then((value) => {
      if (value === "true") {
        for (let i = 0; i < 2; i++) {
          if (i === 0) {
            this.state.privilages.push({ bool: false, name: "Users" });
          }
          else {
            this.state.privilages.push({ bool: true, name: "Roles" });
          }
        }
        this.setState({ privilages: this.state.privilages }, () => {
          this.setState({ flagTwo: true, flagOne: false, filterButton: true })
        });
      }
      else {
        AsyncStorage.getItem("custom:isSuperAdmin").then((value) => {
          if (value === "true") {
            var domainId = "1";
            if (global.domainName === "Textile") {
              domainId = "1";
            }
            else if (global.domainName === "Retail") {
              domainId = "2";
            }
            else if (global.domainName === "Electrical & Electronics") {
              domainId = "3";
            }

            axios.get(UrmService.getPrivillagesForDomain() + domainId).then((res) => {
              if (res.data && res.data["isSuccess"] === "true") {
                let len = res.data["result"].length;
                if (len > 0) {
                  if (len > 0) {
                    for (let i = 0; i < len; i++) {
                      let previlage = res.data["result"][i];
                      if (previlage.name === "URM Portal") {
                        for (let i = 0; i < previlage.subPrivillages.length; i++) {
                          // console.log(previlage.subPrivillages[i].parentPrivillageId);
                          if (previlage.id === previlage.subPrivillages[i].parentPrivillageId) {
                            let subprivilage = previlage.subPrivillages[i];
                            if (subprivilage.name === "Back Office") {
                            }
                            this.state.headerNames.push({ name: subprivilage.name })
                          }
                        }
                        this.setState({ headerNames: this.state.headerNames }, () => {
                          console.error(this.state.headerNames)
                          for (let j = 0; j < this.state.headerNames.length; j++) {
                            if (j === 0) {
                              this.state.privilages.push({ bool: true, name: this.state.headerNames[j].name });
                            }
                            else if (this.state.headerNames[j].name === "Back Office") { }
                            else {
                              this.state.privilages.push({ bool: false, name: this.state.headerNames[j].name });
                            }
                          }
                        })
                        this.setState({ privilages: this.state.privilages }, () => {
                          if (this.state.privilages.length > 0) {
                            if (this.state.privilages[0].name === "Dashboard") {
                              this.setState({ flagOne: false, flagTwo: false, flagDashboard: true, filterButton: false });
                            } else if (this.state.privilages[0].name === "Users") {
                              this.setState({ flagOne: true, flagTwo: false, flagDashboard: false, filterButton: true, filterActive: false });
                            } else if (this.state.privilages[0].name === "Roles") {
                              this.setState({ flagOne: false, flagTwo: true, flagDashboard: false, filterButton: true, filterActive: false });
                            }
                            else {
                              this.setState({ flagOne: false, flagTwo: true, flagDashboard: false, filterButton: true, filterActive: false });
                              console.log("please update the privilages in Line.no: 118")
                            }
                          }
                        });
                      }
                    }
                  }
                }
              }
            });
          }
          else {
            AsyncStorage.getItem("rolename").then((value) => {
              axios.get(UrmService.getPrivillagesByRoleName() + value).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {
                  let len = res.data["result"].parentPrivilages.length;
                  let length = res.data["result"].subPrivilages.length;
                  // console.log(.name)
                  if (len > 0) {
                    for (let i = 0; i < len; i++) {
                      let previlage = res.data["result"].parentPrivilages[i];
                      if (previlage.name === "URM Portal") {
                        if (length > - 1) {
                          for (let i = 0; i < length; i++) {
                            if (previlage.id === res.data["result"].subPrivilages[i].parentPrivillageId) {
                              let subprivilage = res.data["result"].subPrivilages[i];
                              if (subprivilage.name === "Back Office") {
                              }
                              this.state.headerNames.push({ name: subprivilage.name })
                            }
                          }
                          this.setState({ headerNames: this.state.headerNames }, () => {
                            console.error(this.state.headerNames)
                            for (let j = 0; j < this.state.headerNames.length; j++) {
                              if (j === 0) {
                                this.state.privilages.push({ bool: true, name: this.state.headerNames[j].name });
                              }
                              else if (this.state.headerNames[j].name === "Back Office") { }
                              else {
                                this.state.privilages.push({ bool: false, name: this.state.headerNames[j].name });
                              }
                            }
                          })
                          this.setState({ privilages: this.state.privilages }, () => {
                            // console.error(this.state.privilages.length)
                            if (this.state.privilages.length > 0) {
                              if (this.state.privilages[0].name === "Dashboard") {
                                this.setState({ flagOne: false, flagTwo: false, flagDashboard: true, filterButton: false });
                              } else if (this.state.privilages[0].name === "Users") {
                                this.setState({ flagOne: true, flagTwo: false, flagDashboard: false, filterButton: true, filterActive: false });
                              } else if (this.state.privilages[0].name === "Roles") {
                                this.setState({ flagOne: false, flagTwo: true, flagDashboard: false, filterButton: true, filterActive: false });
                              } else {
                                this.setState({ flagOne: false, flagTwo: false, flagDashboard: false, filterButton: true, filterActive: false });
                                console.log("please update the privilages in Line.no: 161")
                              }
                            }
                          });
                        }
                      }
                    }
                  }
                }

              });
            }).catch(() => {
              this.setState({ loading: false });
              console.log('There is error saving domainDataId');
              // console.log('There is error saving domainDataId');
            });

          }
        }).catch(() => {
          this.setState({ loading: false });
          console.log('There is error getting storeId');
          //  console.log('There is error getting storeId');
        });
      }
    }).catch(() => {
      this.setState({ loading: false });
      console.log('There is error getting storeId');
      //  console.log('There is error getting storeId');
    });
    this.getAllUsers();
    this.getRolesList();
  }

  getRolesList() {
    this.setState({ rolesData: [] });
    this.setState({ loading: true });

    axios.get(UrmService.getAllRoles() + this.state.clientId).then((res) => {
      let len = res.data["result"].length;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          let number = res.data.result[i];
          // console.log('sfsdfdfsdfdsfsfsdfs' + number);
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

  getAllUsers() {
    this.setState({ usersData: [] });
    this.setState({ loading: true });

    axios.get(UrmService.getAllUsers() + this.state.clientId).then((res) => {
      //console.log('sfsdfdfsdfdsfsfsdfs' + res.data);
      let len = res.data["result"].length;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          let number = res.data.result[i];
          console.log(number);
          let date = res.data.result[i].createdDate
          console.log(date)
          this.setState({ loading: false });

          // console.log('sadsddsad' + number.stores);
          let len = number.stores.length;
          number.storeName = "";
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              if (number.storeName === "") {
                number.storeName = number.storeName + number.stores[i].name;
              }
              else {
                number.storeName = number.storeName + "," + number.stores[i].name;
              }
            }
          }
          this.state.usersData.push(number);
        }
        this.setState({ usersData: this.state.usersData, usersError: "", loading: false });
      } else {
        this.setState({ usersError: "Records Not Found", loading: false });
      }
    }).catch(() => {
      this.setState({ loading: false, usersError: "Records Not Found" });
      console.log("There is an Error Getting Users");
    });
  }

  topbarAction = (item, index) => {
    if (item.name === "Users") {
      this.setState({ flagOne: true, flagTwo: false, flagDashboard: false, filterButton: true, filterActive: false }, () => {
        this.getAllUsers();
      });

    }
    else if (item.name === "Roles") {
      this.setState({ flagTwo: true, flagOne: false, flagDashboard: false, filterButton: true, filterActive: false }, () => {
        this.getRolesList();
      });
    }
    else if (item.name === "Dashboard") {
      this.setState({ flagTwo: false, flagOne: false, flagDashboard: true, filterButton: false });
    }

    if (this.state.privilages[index].bool === true) {
      this.state.privilages[index].bool = false;
    }
    else {
      this.state.privilages[index].bool = true;
    }
    for (let i = 0; i < this.state.privilages.length; i++) {
      if (index != i) {
        this.state.privilages[i].bool = false;
      }
      this.setState({ privilages: this.state.privilages });
    }

  };

  filterAction() {
    if (this.state.flagTwo === true) {
      this.setState({ flagFilterRoles: true, filterActive: false });
    } else {
      this.setState({ flagFilterRoles: false });
    }
    if (this.state.flagOne === true) {
      this.setState({ flagFilterUsers: true });
    } else {
      this.setState({ flagFilterUsers: false });
    }
    this.setState({ modalVisible: true });
  }

  clearFilterAction() {
    if (this.state.flagOne === true) {
      this.setState({ filterActive: false }, () => {
        this.getAllUsers();
        this.setState({ userType: "", role: "", branch: "" })
      });
    }
    else if (this.state.flagTwo === true) {
      this.setState({ filterActive: false }, () => {
        this.getRolesList();
        this.setState({ role: "", createdBy: "", createdDate: "" })
      });
    }
  }

  modelCancel() {
    this.setState({ modalVisible: false, flagFilterRoles: false, flagFilterUsers: false });
  }

  navigateToCreateRoles() {
    this.props.navigation.navigate('CreateRole', {
      isEdit: false,
      onGoBack: () => this.refresh(),
    });
  }

  refresh() {
    this.getRolesList();
  }



  handleBackButtonClick() {
    this.props.navigation.openDrawer();
  }

  navigateToAddUsers() {
    this.props.navigation.navigate('AddUser', {
      isEdit: false,
      onGoBack: () => this.refreshUsers(),
    });
  }

  refreshUsers() {
    this.getAllUsers();
  }



  topbarAction1() {
    this.getAllUsers();
    this.setState({ flagOne: true, flagTwo: false });
    // this.setState({ flagTwo: false })
  }

  topbarAction2() {
    this.getRolesList();
    this.setState({ flagTwo: true, flagOne: false });
  }

  filterDatepickerClicked() {
    this.setState({ datepickerOpen: true });
  }

  filterDatepickerDoneClicked() {
    console.log(this.state.date);
    if (parseInt(this.state.date.getDate()) < 10 && parseInt(this.state.date.getMonth()) < 10) {
      this.setState({ createdDate: this.state.date.getFullYear() + "-0" + (this.state.date.getMonth() + 1) + "-0" + this.state.date.getDate(), doneButtonClicked: true, datepickerOpen: false });
    }
    else if (parseInt(this.state.date.getMonth()) < 10) {
      this.setState({ createdDate: this.state.date.getFullYear() + "-0" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate(), doneButtonClicked: true, datepickerOpen: false });
    }
    else if (parseInt(this.state.date.getDate()) < 10) {
      this.setState({ createdDate: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-0" + this.state.date.getDate(), doneButtonClicked: true, datepickerOpen: false });
    }
    else {
      this.setState({ createdDate: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate(), doneButtonClicked: true, datepickerOpen: false });
    }
  }

  filterDatepickerCancelClicked() {
    this.setState({ date: new Date(), datepickerOpen: false });
  }

  handleCreatedBy = (value) => {
    this.setState({ createdBy: value });
  };

  handleRole = (value) => {
    this.setState({ role: value });
  };

  handleUSerType = (value) => {
    this.setState({ userType: value });
  };

  handleBranch = (value) => {
    this.setState({ branch: value });
  };

  applyRoleFilter() {
    console.log("creatBy", this.state.createdBy)
    const searchRole = {
      "roleName": this.state.role ? this.state.role : null,
      "createdBy": this.state.createdBy ? this.state.createdBy : null,
      "createdDate": this.state.createdDate ? this.state.createdDate : null
    };
    console.log(searchRole);
    axios.post(UrmService.getRolesBySearch(), searchRole).then((res) => {
      console.log("KKKKK", res)
      if (res) {
        if (res.data.isSuccess === "true") {
          this.setState({ rolesData: res.data.result, modalVisible: false, flagFilterRoles: false, createdDate: "", role: "", createdBy: "" }, () => {
            this.setState({ filterActive: true, rolesError: "" });
          });
        } else {
          this.setState({ modalVisible: false, flagFilterRoles: false, userType: "", role: "", createdBy: "", rolesData: "" },
            () => {
              this.setState({ filterActive: true, rolesError: "Records Not Found" })
            });
          console.log("ooooo", res.data);
        }

      } else {
        this.setState({ rolesData: "", modalVisible: false, flagFilterRoles: false, createdDate: "", role: "", createdBy: "" }, () => {
          this.setState({ filterActive: true, rolesError: "Records Not Found" });
        });
      }
    }).catch((err) => {
      this.setState({ loading: false, rolesError: "Records Not Found", rolesData: "" });
      console.warn(err, "fkjnksjdf");
    });
  }

  applyUserFilter() {
    this.setState({ usersData: [] });
    const obj = {
      "id": null,
      "phoneNo": null,
      "name": null,
      "active": this.state.userType === "Active" ? "True" : "False",
      "inActive": this.state.userType === "InActive" ? "True" : "False",
      "roleName": this.state.role ? this.state.role : null,
      "storeName": this.state.branch ? this.state.branch : null,
      "clientDomainId": this.state.clientId,
    };
    console.log('search filter', obj);
    axios.post(UrmService.getUserBySearch(), obj).then((res) => {
      if (res) {
        console.log("users Data", res.data.result);
        if (res.data.isSuccess === "true") {

          let len = res.data["result"].length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let number = res.data.result[i];
              console.log(number);
              this.setState({ loading: false });

              // console.log('sadsddsad' + number.stores);
              let len = number.stores.length;
              number.storeName = "";
              if (len > 0) {
                for (let i = 0; i < len; i++) {
                  if (number.storeName === "") {
                    number.storeName = number.storeName + number.stores[i].name;
                  }
                  else {
                    number.storeName = number.storeName + "," + number.stores[i].name;
                  }
                }
              }
              this.state.usersData.push(number);
            }
            this.setState({ usersData: this.state.usersData, modalVisible: false, userType: "", role: "", createdBy: "", branch: "" },
              () => {
                this.setState({ filterActive: true, usersError: "" });
              });
          }
        } else {
          this.setState({ modalVisible: false, userType: "", role: "", createdBy: "", branch: '', usersData: "" },
            () => {
              this.setState({ filterActive: true, usersError: "Records Not Found" })
              console.log("records not found");
            });
        }

      } else {
        this.setState({ modalVisible: false, userType: "", role: "", createdBy: "", branch: "", usersData: "" }, () => {
          this.setState({ filterActive: true, usersError: "Records Not Found" });
        });
      }

    }).catch((err) => {
      this.setState({ loading: false, usersError: "Records Not Found", usersData: "" });
      console.warn(err);
    });
  }

  deleteUser(item, index) {
    console.log("you have deleted the user");
    this.setState({ modalVisible: false });
  }

  deleteRole(item, index) {
    console.log("you have deleted the role");
    this.setState({ modalVisible: false });
  }

  handleuserdeleteaction(item, index) {
    this.setState({ modalVisible: true, userDelete: true, });
  }
  handleRoledeleteaction(item, index) {
    this.setState({ modalVisible: true, roleDelete: true, });
  }



  updateRoles() {
    this.getAllRoles();
  }

  updateUsers() {
    this.getAllUsers();
  }

  handleedituser(item, index) {
    this.props.navigation.navigate('AddUser',
      {
        item: item, isEdit: true,
        onGoBack: () => this.updateUsers(),
      });
  }

  handleeditRole(item, index) {
    this.props.navigation.navigate('CreateRole',
      {
        item: item, isEdit: true,
        onGoBack: () => this.updateRoles(),
      });
  }

  updateRoles() {
    this.getRolesList();
  }

  handleRole(item, index) {
    this.props.navigation.navigate('EditRole');
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.state.loading &&
          <Loader
            loading={this.state.loading} />
        }
        <SafeAreaView style={styles.mainContainer}>
          <View style={headerTitleContainer} >
            <View style={headerTitleSubContainer}>
              <TouchableOpacity style={menuButton} onPress={() => this.handleBackButtonClick()}>
                <Image source={require('../assets/images/menu.png')} />
              </TouchableOpacity>
              <Text style={headerTitle}>
                {I18n.t("URM Portal")}
              </Text>
            </View>
            <View style={headerTitleSubContainer2}>
              {this.state.flagTwo && (
                <TouchableOpacity style={headerNavigationBtn} onPress={() => this.navigateToCreateRoles()}>
                  <Text style={headerNavigationBtnText}>{I18n.t("Create Role")}</Text>
                </TouchableOpacity>
              )}
              {this.state.flagOne && (
                <TouchableOpacity style={[headerNavigationBtn, I18n.locale === "telugu" ? { height: 40 } : {}]} onPress={() => this.navigateToAddUsers()}>
                  <Text style={headerNavigationBtnText}>{I18n.t("Add User")}</Text>
                </TouchableOpacity>
              )}
              {this.state.filterButton &&
                <View>
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
                </View>
              }
            </View>
          </View>

          <ScrollView>
            <View style={styles.container}>
              <FlatList
                style={styles.flatList}
                horizontal
                data={this.state.privilages}
                ListEmptyComponent={<EmptyList message={this.state.rolesError} />}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity style={[pageNavigationBtn, { backgroundColor: item.bool ? '#ED1C24' : '#FFFFFF', borderColor: item.bool ? '#ED1C24' : '#858585', }]} onPress={() => this.topbarAction(item, index)} >
                    <Text style={[pageNavigationBtnText, { color: item.bool ? "#FFFFFF" : '#858585', }]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                ListFooterComponent={<View style={{ width: 15 }}></View>}
              />

              {console.log(this.state.privilages)}

            </View>


            {this.state.flagDashboard && (
              <UrmDashboard />
            )}
            {this.state.flagTwo && (
              <View>
                <FlatList
                  data={this.state.rolesData}
                  style={{ marginTop: 20, }}
                  scrollEnabled={true}
                  ListEmptyComponent={<EmptyList message={this.state.rolesError} />}
                  renderItem={({ item, index }) => (
                    <View style={flatListMainContainer}>
                      <View style={flatlistSubContainer}>
                        <View style={textContainer}>
                          <Text style={highText} >S.NO: {index + 1} </Text>
                        </View>
                        <View style={textContainer}>
                          <Text style={textStyleMedium}>{I18n.t("ROLE")}: {item.roleName}</Text>
                          <Text style={textStyleLight}>{I18n.t("DOMAIN")}: {item.clientDomainVo.domaiName}</Text>
                        </View>
                        <View style={textContainer}>
                          <Text style={textStyleMedium}>{I18n.t("CREATED BY")}: {item.createdBy}</Text>
                          <Text style={textStyleLight}>{I18n.t("USER COUNT")}: {item.usersCount}</Text>
                        </View>
                        <View style={textContainer}>
                          <Text style={textStyleLight}>{I18n.t("DESCRIPTION")}: {item.discription}</Text>
                          <View style={buttonContainer}>
                            <TouchableOpacity style={buttonStyle1} onPress={() => this.handleeditRole(item, index)}>
                              <Image style={buttonImageStyle} source={require('../assets/images/edit.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity style={buttonStyle} onPress={() => this.handleRoledeleteaction(item, index)}>
                              <Image style={buttonImageStyle} source={require('../assets/images/delete.png')} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                />
                {/* {this.state.rolesData.length === 0 && this.state.rolesError.length > 0 && 
                                    <Text style={{ color: '#cc241d', textAlign: "center", fontFamily: "bold", fontSize: Device.isTablet ? 21 : 17, marginTop: deviceheight/3 }}>&#9888; {this.state.rolesError}</Text>
                                } */}
              </View>
            )}
            {this.state.flagOne && (
              <View>
                <FlatList
                  data={this.state.usersData}
                  style={{ marginTop: 20, }}
                  scrollEnabled={true}
                  renderItem={({ item, index }) => (
                    <View style={flatListMainContainer}>
                      <View style={flatlistSubContainer}>
                        <View style={textContainer}>
                          <Text style={highText} >{I18n.t("USER ID")}: {item.userId} </Text>
                          <Text style={textStyleLight}>{I18n.t("STATUS")}: {item.active ? "active" : "Inactive"}</Text>
                        </View>
                        <View style={textContainer}>
                          <Text style={textStyleMedium}>{I18n.t("USER NAME")}: {item.userName}</Text>
                        </View>
                        <View style={textContainer}>
                          <Text style={textStyleMedium}>{I18n.t("ROLE")}: {item.roleName} </Text>
                          <Text style={textStyleLight}>{I18n.t("STORE NAME")}: {"\n"}{item.storeName}</Text>
                        </View>
                        <View style={textContainer}>
                          <Text style={textStyleLight}>{I18n.t("CREATED DATE")}: {item.createdDate ? item.createdDate.toString().split(/T/)[0] : item.createdDate}</Text>
                          <View style={buttonContainer}>
                            <TouchableOpacity style={buttonStyle1} onPress={() => this.handleedituser(item, index)}>
                              <Image style={buttonImageStyle} source={require('../assets/images/edit.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={buttonStyle} onPress={() => this.handleuserdeleteaction(item, index)}>
                              <Image style={buttonImageStyle} source={require('../assets/images/delete.png')} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                />
                {this.state.usersData.length === 0 && this.state.usersError.length > 0 &&
                  <Text style={{ color: '#cc241d', textAlign: "center", fontFamily: "bold", fontSize: Device.isTablet ? 21 : 17, marginTop: deviceheight / 3 }}>&#9888; {this.state.usersError}</Text>
                }
              </View>
            )}
            {this.state.flagTwo && this.state.roleDelete && (
              <View>
                <Modal isVisible={this.state.modalVisible} style={{ margin: 0 }}>
                  <View style={deleteContainer}>
                    <View>
                      <View style={filterSubContainer}>
                        <View style={deleteHeader}>
                          <Text style={filterHeading} > {I18n.t("Delete Role")} </Text>
                        </View>
                        <View>
                          <TouchableOpacity style={filterCloseImage} onPress={() => this.modelCancel()}>
                            <Image style={deleteCloseBtn} source={require('../assets/images/modelcancel.png')} />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text style={{
                        height: Device.isTablet ? 2 : 1,
                        width: deviceWidth,
                        backgroundColor: 'lightgray',
                      }}></Text>
                    </View>

                    <Text style={deleteText}> {I18n.t("Are you sure want to delete Role")} ?  </Text>
                    <TouchableOpacity
                      style={filterSubmitBtn} onPress={() => this.deleteRole(item, index)}
                    >
                      <Text style={filterApplyBtnText}  > {I18n.t("DELETE")} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={filterCancelBtn} onPress={() => this.modelCancel()}
                    >
                      <Text style={filterCancelBtnText}  > {I18n.t("CANCEL")} </Text>

                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
            )}
            {this.state.flagOne && this.state.userDelete && (
              <View>
                <Modal isVisible={this.state.modalVisible} style={{ margin: 0 }}>
                  <View style={deleteContainer}>
                    <View>
                      <View style={deleteHeader}>
                        <View>
                          <Text style={deleteHeading} > {I18n.t("Delete User")} </Text>
                        </View>
                        <View>
                          <TouchableOpacity style={filterCloseImage} onPress={() => this.modelCancel()}>
                            <Image style={deleteCloseBtn} source={require('../assets/images/modalCloseWhite.png')} />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Text style={{
                        height: Device.isTablet ? 2 : 1,
                        width: deviceWidth,
                        backgroundColor: 'lightgray',
                      }}></Text>
                    </View>
                    <Text style={deleteText}> {I18n.t("Are you sure want to delete User")}?  </Text>
                    <TouchableOpacity
                      style={filterSubmitBtn}
                      onPress={() => this.deleteUser(item, index)}
                    >
                      <Text style={filterApplyBtnText}  > {I18n.t("DELETE")} </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                      style={filterCancelBtn} onPress={() => this.modelCancel()}
                    >
                      <Text style={filterCancelBtnText}  > {I18n.t("CANCEL")} </Text>

                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
            )}
            {this.state.flagFilterRoles && (
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

            {this.state.flagFilterUsers && (
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
          </ScrollView >
        </SafeAreaView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imagealign: {
    marginTop: Device.isTablet ? 25 : 20,
    marginRight: Device.isTablet ? 30 : 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#FAFAFF'
  },
  flatList: {
    marginTop: 20
  },
});
