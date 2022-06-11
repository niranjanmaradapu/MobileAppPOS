import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ClipboardStatic } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import Modal from 'react-native-modal';
import ThemedDialog from 'react-native-elements/dist/dialog/Dialog';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native-paper';
import Loader from "../../commonUtils/loader";
import InventoryService from '../services/InventoryService';
import UrmService from '../services/UrmService';
import { RH, RW, RF } from '../../Responsive';
import { listEmptyMessage, pageNavigationBtn, pageNavigationBtnText, filterBtn, menuButton, headerNavigationBtn, headerNavigationBtnText, headerTitle, headerTitleContainer, headerTitleSubContainer, headerTitleSubContainer2, buttonContainer, buttonStyle, buttonStyle1, flatListMainContainer, flatlistSubContainer, buttonImageStyle, textContainer, textStyleLight, textStyleMedium, highText, pageNavigationBtnContainer } from '../Styles/Styles';
import { filterMainContainer, filterSubContainer, filterHeading, filterCloseImage, deleteText, deleteHeading, deleteHeader, deleteContainer, deleteCloseBtn } from '../Styles/PopupStyles';
import { inputField, rnPickerContainer, rnPicker, submitBtn, submitBtnText, cancelBtn, cancelBtnText, datePicker, datePickerBtnText, datePickerButton1, datePickerButton2, datePickerContainer, dateSelector, dateText, } from '../Styles/FormFields';
import Barcode from './Barcode';
import ProductCombo from './ProductCombo';
import ReBarcode from './ReBarcode';


var deviceWidth = Dimensions.get("window").width;
var deviceheight = Dimensions.get("window").height;

export default class Inventory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      storeId: 1,
      storeName: "",
      privilages: [],
      subPrivilages: "",
      headerNames: [],
      error: '',
    };
    this.onEndReachedCalledDuringMomentum = true;
  }

  handleBackButtonClick() {
    this.props.navigation.openDrawer();
  }


  async componentDidMount() {
    var storeStringId = "";
    var storeName = "";

    AsyncStorage.getItem("storeId").then((value) => {
      storeStringId = value;
      this.setState({ storeId: parseInt(storeStringId) });
      console.log(this.state.storeId);

    }).catch(() => {
      this.setState({ loading: false });
      console.log('There is error getting storeId');
    });

    AsyncStorage.getItem("storeName").then((value) => {
      storeName = value;
      this.setState({ storeName: storeName });
    }).catch(() => {
      this.setState({ loading: false });
      console.log('There is error getting storeId');
    });

    AsyncStorage.getItem("rolename").then(value => {
      console.log({ value })
      axios.get(UrmService.getPrivillagesByRoleName() + value).then(res => {
        if (res) {
          if (res.data) {
            let len = res.data.parentPrivileges.length
            for (let i = 0; i < len; i++) {
              let privilege = res.data.parentPrivileges[i]
              if (privilege.name === "Inventory Portal") {
                let privilegeId = privilege.id
                let sublen = res.data.subPrivileges.length
                let subPrivileges = res.data.subPrivileges
                for (let i = 0; i < sublen; i++) {
                  if (privilegeId === subPrivileges[i].parentPrivilegeId) {
                    let routes = subPrivileges[i].name
                    this.state.headerNames.push({ name: routes })
                    console.log("Header Names", this.state.headerNames)
                  }
                }
                this.setState({ headerNames: this.state.headerNames }, () => {
                  for (let j = 0; j < this.state.headerNames.length; j++) {
                    if (j === 0) {
                      this.state.privilages.push({ bool: true, name: this.state.headerNames[j].name })
                    } else {
                      this.state.privilages.push({ bool: false, name: this.state.headerNames[j].name });
                    }
                  }
                })
                this.initialNavigation()
              }
            }
          }
        }
      })
    })
  }

  // Initial Routing
  initialNavigation() {
    if (this.state.privilages.length > 0) {
      this.setState({ privilages: this.state.privilages }, () => {
        const { privilages } = this.state
        if (privilages[0].name === "Barcode List") {
          this.setState({ flagBarcode: true })
        } else if (privilages[0].name === "Re-Barcode List") {
          this.setState({ flagRebarCode: true })
        } else if (privilages[0] === "Product Combo") {
          this.setState({ flagProductCombo: true })
        } else {
          this.setState({ flagBarcode: false, flagRebarCode: false, flagProductCombo: true })
        }
      })
    }
  }

  // Navigation Functions
  topbarAction1 = (item, index) => {
    if (item.name === "Barcode List") {
      this.setState({ flagBarcode: true, filterActive: false });
    } else {
      this.setState({ flagBarcode: false });
    }
    if (item.name === "Re-Barcode List") {
      this.setState({ flagRebarCode: true, filterActive: false });
    } else {
      this.setState({ flagRebarCode: false });
    }
    if (item.name === "Product Combo") {
      this.setState({ flagProductCombo: true, filterActive: false })
    } else {
      this.setState({ flagProductCombo: false })
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


  navigateToAddBarcode() {
    this.props.navigation.navigate('AddBarcode', {
      isEdit: false,
      onGoBack: () => this.child.getAllBarcodes(),
    });
  }

  navigateToAddProductCombo() {
    this.props.navigation.navigate('AddProduct', {
      isEdit: false,
      onGoBack: () => null
    })
  }


  render() {

    return (
      <View style={styles.mainContainer}>
        {this.state.loading &&
          <Loader
            loading={this.state.loading} />
        }
        <View style={headerTitleContainer} >
          <View style={headerTitleSubContainer}>
            <TouchableOpacity style={menuButton} onPress={() => this.handleBackButtonClick()}>
              <Image source={require('../assets/images/menu.png')} />
            </TouchableOpacity>
            <Text style={headerTitle}>
              {I18n.t("Inventory Portal")}
            </Text>
          </View>
          <View style={headerTitleSubContainer2}>
            {this.state.flagBarcode && (
              <TouchableOpacity style={headerNavigationBtn} onPress={() => this.navigateToAddBarcode()}>
                <Text style={headerNavigationBtnText}>{I18n.t("Add BarCode")}</Text>
              </TouchableOpacity>
            )}
            {this.state.flagProductCombo && (
              <TouchableOpacity style={headerNavigationBtn} onPress={() => this.navigateToAddProductCombo()}>
                <Text style={headerNavigationBtnText}>Product Combo</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView>
          <View style={styles.container}>
            <FlatList
              style={pageNavigationBtnContainer}
              horizontal
              data={this.state.privilages}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={[pageNavigationBtn, {
                  backgroundColor: item.bool ? '#ED1C24' : '#FFFFFF',
                  borderColor: item.bool ? '#ED1C24' : '#858585',
                }]} onPress={() => this.topbarAction1(item, index)} >

                  <Text style={[pageNavigationBtnText, { color: item.bool ? "#FFFFFF" : '#858585', }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />

            {this.state.flagBarcode && (
              <Barcode
                ref={instance => { this.child = instance }}
                navigation={this.props.navigation}
              />
            )}

            {this.state.flagRebarCode && (
              <View>
                <ReBarcode
                  ref={instance => { this.child = instance }}
                  navigation={this.props.navigation}
                />
              </View>
            )}
            {this.state.flagProductCombo && (
              <ProductCombo
                ref={instance => { this.child = instance }}
                navigation={this.props.navigation}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spaceText: {
    height: Device.isTablet ? 2 : 1,
    width: deviceWidth,
    backgroundColor: 'lightgray',
  },
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

});
