import { Dimensions } from "react-native";
import Device from "react-native-device-detection";
import { RH, RW, RF } from '../../Responsive';


var deviceheight = Dimensions.get("window").height
var deviceWidth = Dimensions.get("window").width

export const headerTitleContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: RW(20),
  paddingRight: RW(20),
  height: Device.isTablet ? RH(90) : RH(70),
  backgroundColor: '#ffffff'
}

export const headerTitleSubContainer = {
  display: "flex",
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
}

export const headerTitleSubContainer2 = {
  display: "flex",
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center'
}

export const menuButton = {
  width: Device.isTablet ? RW(50) : RW(40),
  height: Device.isTablet ? RH(40) : RH(30),
  marginRight: RW(10),
}

export const headerNavigationBtn = {
  backgroundColor: '#ED1C24',
  borderRadius: 10,
  width: Device.isTablet ? RW(160) : RW(110),
  height: Device.isTablet ? RH(40) : RH(30),
  textAlign: 'center',
  marginRight: RW(10),
}

export const headerNavigationBtnText = {
  fontSize: Device.isTablet ? RF(17) : RF(12),
  marginTop: Device.isTablet ? 0 : RH(5),
  fontFamily: 'regular',
  color: '#ffffff',
  textAlign: 'center',
  alignSelf: 'center'
}

export const filterBtn = {
  backgroundColor: '#ffffff',
  borderRadius: 5,
  width: Device.isTablet ? RW(35) : RW(30),
  height: Device.isTablet ? RH(37) : RH(32),
}

export const headerTitle = {
  fontFamily: 'bold',
  fontSize: Device.isTablet ? RF(24) : RF(18),
  color: '#353C40'
}

export const urmNavigationButtons = {
  height: Device.isTablet ? RH(46) : RH(36),
  width: Device.isTablet ? RW(250) : RW(200),
  borderWidth: Device.isTablet ? 2 : 1,
  borderRadius: Device.isTablet ? 10 : 5,
  marginLeft: RW(10),
}

export const urmNavigationButtonsText = {
  fontSize: Device.isTablet ? RF(21) : RF(16),
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: Device.isTablet ? 0 : RH(5),
  fontFamily: 'regular'
}

export const flatListMainContainer = {
  backgroundColor: '#FBFBFB',
  borderBottomWidth: Device.isTablet ? 2 : 1,
  borderBottomColor: '#00000059',
  flexDirection: 'row',
  padding: 10,
  justifyContent: 'space-between',
  alignItems: 'center'

}

export const flatlistSubContainer = {
  flexDirection: 'column',
  width: '100%',
  gap: 10,
}

export const highText = {
  fontSize: Device.isTablet ? RF(21) : RF(16),
  fontFamily: 'medium',
  color: '#ED1C24',
}


export const textStyleMedium = {
  fontSize: Device.isTablet ? RF(17) : RF(12),
  fontFamily: 'medium',
  color: '#353C40'
}

export const textStyleLight = {
  fontSize: Device.isTablet ? RF(17) : RF(12),
  fontFamily: 'normal',
  color: '#808080'
}

export const textContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingTop: Device.isTablet ? 6 : 3,
  paddingRight: Device.isTablet ? 30 : 15,
  paddingLeft: Device.isTablet ? 30 : 15,
}

export const buttonContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}

export const buttonStyle = {
  width: Device.isTablet ? RW(50) : RW(30),
  height: Device.isTablet ? RW(50) : RW(30),
  borderBottomRightRadius: 5,
  borderTopRightRadius: 5,
  borderWidth: Device.isTablet ? 2 : 1,
  borderColor: '#00000059',
}

export const buttonStyle1 = {
  width: Device.isTablet ? RW(50) : RW(30),
  height: Device.isTablet ? RW(50) : RW(30),
  borderBottomLeftRadius: 5,
  borderTopLeftRadius: 5,
  borderWidth: Device.isTablet ? 2 : 1,
  borderColor: '#00000059',
}

export const imageStyle = {
  alignSelf: 'center',
  marginTop: 4,
  height: Device.isTablet ? 30 : RH(20),
  width: Device.isTablet ? 30 : RW(20)
}

export const filterMainContainer = {
  backgroundColor: '#ffffff',
  marginTop: Device.isTablet ? deviceheight - RH(500) : deviceheight - RH(400),
  height: Device.isTablet ? RH(500) : RH(400),
}

export const filterSubContainer = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: RH(5),
  height: Device.isTablet ? RH(60) : RH(50)
}

export const filterHeading = {
  marginTop: RH(15),
  fontSize: Device.isTablet ? RF(22) : RF(17),
  marginLeft: RW(20)
}

export const filterCloseImage = {
  width: Device.isTablet ? RW(60) : RW(50),
  height: Device.isTablet ? RH(60) : RH(50),
  marginTop: Device.isTablet ? RH(20) : RH(15),
}

export const filterInput = {
  justifyContent: 'center',
  marginLeft: RW(20),
  marginRight: RW(20),
  height: Device.isTablet ? RH(44) : RH(54),
  marginTop: RH(5),
  marginBottom: RH(10),
  borderColor: '#8F9EB717',
  borderRadius: 3,
  backgroundColor: '#FBFBFB',
  borderWidth: 1,
  fontFamily: 'regular',
  paddingLeft: RW(15),
  width: deviceWidth - RW(40),
  fontSize: Device.isTablet ? RF(15) : RF(20),
}

export const dateSelector = {
  width: deviceWidth - RW(40),
  marginLeft: RW(20),
  marginRight: RW(20),
  marginTop: RH(10),
  borderColor: '#8F9EB717',
  borderRadius: 3,
  height: RH(50),
  backgroundColor: "#F6F6F6", borderRadius: 5,
}

export const datePickerButton1 = {
  position: 'absolute',
  left: RW(20),
  top: RH(10),
  height: RH(30),
  backgroundColor: "#ED1C24",
  borderRadius: 5,
}

export const datePickerButton2 = {
  position: 'absolute',
  right: RW(20),
  top: RH(10),
  height: RH(30),
  backgroundColor: "#ED1C24",
  borderRadius: 5,
}

export const datePickerBtnText =  {
  textAlign: 'center',
  marginTop: RH(5),
  color: "#ffffff",
  fontSize: Device.isTablet ? RF(20) : RF(15),
  fontFamily: "regular"
  }

export const datePickerContainer = {
  height: RH(280),
  width: deviceWidth,
  backgroundColor: 'ffffff'
}

export const datePicker = {
  width: deviceWidth,
  height: RH(200),
  marginTop: RH(50),
}

export const dateText = {
  marginLeft: RW(16),
  marginTop: RW(20),
  color: "#6F6F6F",
  fontSize: RF(15),
  fontFamily: "regular"
}

export const filterSubmitBtn = {
  width: deviceWidth - RW(40),
  marginLeft: RW(20),
  marginRight: RW(20),
  marginTop: RH(20),
  height: Device.isTablet ? RH(60) : RH(50),
  backgroundColor: "#ED1C24",
  borderRadius: 5,
  borderWidth: Device.isTablet ? 2 : 1,
  borderColor: "#353C4050",
}

export const filterApplyBtnText = {
  textAlign: 'center',
  marginTop: RH(10),
  color: "#ffffff",
  fontSize: Device.isTablet ? RF(20) : RF(15),
  fontFamily: "regular"
}

export const filterCancelBtn = {
  width: deviceWidth - RW(40),
  marginLeft: RW(20),
  marginRight: RW(20),
  marginTop: RH(20),
  height: Device.isTablet ? RH(50) : RH(40),
  backgroundColor: "#ffffff",
  borderRadius: 5,
  borderWidth: Device.isTablet ? 2 : 1,
  borderColor: "#353C4050",
}

export const filterCancelBtnText = {
  textAlign: 'center',
  marginTop: RH(10),
  color: "#000000",
  fontSize: Device.isTablet ? RF(20) : RF(15),
  fontFamily: "regular"
}

export const filterRnPicker = {
  justifyContent: 'center',
  margin: RH(20),
  height: Device.isTablet ? RH(54) : RH(44),
  marginTop: RH(5),
  marginBottom: RH(10),
  borderColor: '#8F9EB717',
  borderRadius: 3,
  backgroundColor: '#FBFBFB',
  borderWidth: 1,
  fontFamily: 'regular',
  paddingLeft: RW(15),
  fontSize: Device.isTablet ? RF(20) : RF(14),
  width: deviceWidth - RW(40)
}

export const deleteContainer = {
  backgroundColor: '#ffffff',
  marginTop: Device.isTablet ? deviceheight - RH(300) : deviceheight - RH(250),
  height: Device.isTablet ? RH(300) : RH(250),
}

export const deleteText = {
  textAlign: 'center',
  fontFamily: 'regular',
  fontSize: Device.isTablet ? RF(23) : RF(18),
  color: '#353C40',
}
