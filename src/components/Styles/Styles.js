import Device from 'react-native-device-detection';
import { RH, RW, RF } from '../../Responsive';

import { Dimensions } from 'react-native';

var deviceheight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export const listEmptyMessage = {
  fontSize: Device.isTablet ? RF(21) : RF(17),
  color: "#ff0000",
  textAlign: 'center',
  fontFamily: "bold",
  marginTop: deviceheight/3,
}

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

export const backButton = {
  width: Device.isTablet ? RW(50) : RW(40),
  height: Device.isTablet ? RH(40) : RH(30),
  marginRight: RW(20),
}

export const backButtonImage = {
  marginTop: Device.isTablet ? 0 : RH(-10)
}

export const headerNavigationBtn = {
  backgroundColor: '#ED1C24',
  borderRadius: 10,
  minWidth: Device.isTablet ? RW(160) : RW(110),
  height: Device.isTablet ? RH(40) : RH(30),
  paddingHorizontal: RW(10),
  textAlign: 'center',
  marginRight: RW(10),
}

export const headerNavigationBtnText = {
  fontSize: RF(12),
  marginTop: RH(5),
  fontFamily: 'regular',
  color: '#ffffff',
  textAlign: 'center',
  alignSelf: 'center'
}

export const filterBtn = {
  backgroundColor: '#ffffff',
  borderRadius: 5,
  width: Device.isTablet ? RW(40) : RW(30),
  height: Device.isTablet ? RH(42) : RH(32),
}

export const headerTitle = {
  fontFamily: 'bold',
  fontSize: RF(18),
  color: '#353C40'
}

export const pageNavigationBtn = {
  height: Device.isTablet ? RH(46) : RH(36),
  minWidth: Device.isTablet ? RW(250) : RW(200),
  borderWidth: Device.isTablet ? 2 : 1,
  borderRadius: Device.isTablet ? 10 : 5,
  paddingHorizontal: RW(10),
  marginLeft: RW(10),
}

export const pageNavigationBtnText = {
  fontSize: RF(16),
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: RH(5),
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
  fontSize: RF(16),
  fontFamily: 'medium',
  color: '#ED1C24',
}


export const textStyleMedium = {
  fontSize: RF(12),
  fontFamily: 'medium',
  color: '#353C40'
}

export const textStyleLight = {
  fontSize: RF(12),
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

export const buttonImageStyle = {
  alignSelf: 'center',
  marginTop: 4,
  height: Device.isTablet ? RH(30) : RH(20),
  width: Device.isTablet ? RW(30) : RW(20)
}