import { Dimensions } from "react-native";
import Device from "react-native-device-detection";
import { RH, RW, RF } from '../../Responsive';


var deviceheight = Dimensions.get("window").height
var deviceWidth = Dimensions.get("window").width
export const flatListMainContainer = {
  backgroundColor: '#FBFBFB',
  borderBottomWidth: 5,
  borderBottomColor: '#FBFBFB',
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
  width:RW(30),
  height: RH(30),
  borderBottomRightRadius: 5,
  borderTopRightRadius: 5,
  borderWidth: Device.isTablet ? 2 : 1,
}

export const buttonStyle1 = {
  width:RW(30),
  height: RH(30),
  borderBottomLeftRadius: 5,
  borderTopLeftRadius: 5,
  borderWidth: Device.isTablet ? 2 : 1,
}

export const imageStyle = {
  alignSelf: 'center',
  marginTop: 4,
  height: Device.isTablet ? 30 : RH(20),
  width: Device.isTablet ? 30 : RW(20)
}
