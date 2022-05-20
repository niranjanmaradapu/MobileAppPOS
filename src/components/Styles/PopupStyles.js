import { Dimensions } from "react-native";
import Device from "react-native-device-detection";
import { RH, RW, RF } from '../../Responsive';


var deviceHeight = Dimensions.get("window").height
var deviceWidth = Dimensions.get("window").width

export const filterMainContainer = {
  backgroundColor: '#ffffff',
  // marginTop: Device.isTablet ? deviceHeight - RH(500) : deviceHeight - RH(400),
  minHeight: Device.isTablet ? RH(500) : RH(400),
  paddingBottom: Device.isTablet ? RH(20) : RH(10),
  position: 'absolute',
  bottom: 0
}

export const filterSubContainer = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: RH(5),
  height: Device.isTablet ? RH(60) : RH(50)
}

export const filterHeading = {
  marginTop: Device.isTablet ? RH(0) : RH(15),
  fontSize: RF(17),
  marginLeft: RW(20)
}

export const filterCloseImage = {
  width: Device.isTablet ? RW(70) : RW(50),
  height: Device.isTablet ? RH(50) : RH(50),
  marginTop: Device.isTablet ? RH(30) : RH(15),
}

export const deleteContainer = {
  backgroundColor: '#ffffff',
  marginTop: Device.isTablet ? deviceHeight - RH(300) : deviceHeight - RH(250),
  height: Device.isTablet ? RH(300) : RH(250),
}

export const deleteText = {
  textAlign: 'center',
  fontFamily: 'regular',
  fontSize: RF(18),
  color: '#353C40',
}

export const deleteHeading = {
  color: '#ffffff',
  marginTop: Device.isTablet ? RH(5) : RH(15),
  marginLeft: RW(20),
  fontFamily: 'medium',
  fontSize: RF(15)
}

export const deleteHeader = {
  backgroundColor: "#ED1c24",
  width: deviceWidth,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddinRight: 10,
  paddingHorizontal: Device.isTablet ? 30 : 10,
  height: Device.isTablet ? RH(60) : RH(50)
}

export const deleteCloseBtn = {
  margin: 5,
  height: Device.isTablet ? RH(20) : RH(15),
  width: Device.isTablet ? RW(20) : RW(15) 
}
