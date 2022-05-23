import { Dimensions } from "react-native";
import Device from "react-native-device-detection";
import { RH, RW, RF } from '../../Responsive';


var deviceheight = Dimensions.get("window").height
var deviceWidth = Dimensions.get("window").width

export const inputField = {
  justifyContent: 'center',
  marginLeft: RW(20),
  marginRight: RW(20),
  height: Device.isTablet ? RH(54) : RH(44),
  marginTop: RH(5),
  marginBottom: RH(10),
  borderColor: '#8F9EB717',
  borderRadius: 3,
  backgroundColor: '#FBFBFB',
  borderWidth: 1,
  fontFamily: 'regular',
  paddingLeft: RW(15),
  width: deviceWidth - RW(40),
  fontSize: RF(14),
}

export const inputFieldDisabled = {
  justifyContent: 'center',
  marginLeft: RW(20),
  marginRight: RW(20),
  height: Device.isTablet ? RH(54) : RH(44),
  marginTop: RH(5),
  marginBottom: RH(10),
  borderColor: '#8F9EB717',
  borderRadius: 3,
  backgroundColor: '#6f6f6f43',
  borderWidth: 1,
  fontFamily: 'regular',
  paddingLeft: RW(15),
  width: deviceWidth - RW(40),
  fontSize: RF(14),
}

export const inputArea = {
  justifyContent: 'center',
  marginLeft: RW(20),
  marginRight: RW(20),
  height: Device.isTablet ? RH(254) : RH(144),
  marginTop: RH(5),
  marginBottom: RH(10),
  borderColor: '#8F9EB717',
  borderRadius: 3,
  backgroundColor: '#FBFBFB',
  borderWidth: 1,
  fontFamily: 'regular',
  paddingLeft: RW(15),
  fontSize: RF(14),
}

export const inputHeading = {
  fontSize: RF(13),
  color: '#000000',
  marginLeft: RW(20),
  marginTop: RH(10),
  marginBottom: RH(10)
}

export const rnPickerContainer = {
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
  fontSize: RF(14),
  width: deviceWidth - RW(40)
}

export const rnPicker = {
  placeholder: {
        color: "#6F6F6F",
        fontFamily: "regular",
        fontSize: RF(14),
    },
    inputIOS: {
        justifyContent: 'center',
        height: Device.isTablet ? 52 : 42,
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'regular',
        fontSize: RF(14),
        borderColor: '#FBFBFB',
        backgroundColor: '#FBFBFB',
    },
    inputAndroid: {
        justifyContent: 'center',
        height: Device.isTablet ? 52 : 42,
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'regular',
        fontSize: RF(14),
        borderColor: '#FBFBFB',
        backgroundColor: '#FBFBFB',
        color: '#001B4A',
    },
}

export const rnPickerError = {
  placeholder: {
        color: "#dd0000",
        fontFamily: "regular",
        fontSize: RF(14),
    },
    inputIOS: {
        justifyContent: 'center',
        height: Device.isTablet ? 52 : 42,
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'regular',
        fontSize: RF(14),
        borderColor: '#FBFBFB',
        backgroundColor: '#FBFBFB',
    },
    inputAndroid: {
        justifyContent: 'center',
        height: Device.isTablet ? 52 : 42,
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'regular',
        fontSize: RF(14),
        borderColor: '#FBFBFB',
        backgroundColor: '#FBFBFB',
        color: '#001B4A',
    },
}


export const submitBtn = {
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

export const submitBtnText = {
  textAlign: 'center',
  marginTop: RH(10),
  color: "#ffffff",
  fontSize: RF(15),
  fontFamily: "regular"
}

export const cancelBtn = {
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

export const cancelBtnText = {
  textAlign: 'center',
  marginTop: Device.isTablet ? RH(5) : RH(10),
  color: "#000000",
  fontSize: RF(15),
  fontFamily: "regular"
}

export const dateSelector = {
  width: deviceWidth - RW(40),
  marginLeft: RW(20),
  marginRight: RW(20),
  marginTop: RH(10),
  marginBottom: RH(10),
  borderColor: '#8F9EB717',
  borderRadius: 3,
  height: RH(50),
  backgroundColor: "#F6F6F6", borderRadius: 5,
  justifyContent: 'center'
}

export const datePickerButton1 = {
  position: 'absolute',
  left: RW(20),
  top: RH(10),
  height: Device.isTablet ? RH(50) : RH(30),
  backgroundColor: "#ED1C24",
  borderRadius: 5,
}

export const datePickerButton2 = {
  position: 'absolute',
  right: RW(20),
  top: RH(10),
  height: Device.isTablet ? RH(50) : RH(30),
  backgroundColor: "#ED1C24",
  borderRadius: 5,
}

export const datePickerBtnText =  {
  // textAlign: 'center',
  marginTop: RH(5),
  color: "#ffffff",
  fontSize: RF(14),
  fontFamily: "regular"
  }

export const datePickerContainer = {
  height: RH(280),
  width: deviceWidth,
  backgroundColor: '#ffffff'
}

export const datePicker = {
  width: deviceWidth,
  height: RH(200),
  marginTop: RH(50),
}

export const dateText = {
  marginLeft: RW(16),
  // marginTop: Device.isTablet ? 0 : RW(10),
  color: "#6F6F6F",
  fontSize: RF(15),
  fontFamily: "regular"
}