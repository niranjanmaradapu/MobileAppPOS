import Device from 'react-native-device-detection';
import { RH, RW, RF } from '../Responsive';

import { Dimensions } from 'react-native';

var deviceheight = Dimensions.get("window").height;

export const listEmptyMessage = {
  fontSize: Device.isTablet ? RF(21) : RF(17),
  color: "#ff0000",
  textAlign: 'center',
  fontFamily: "bold",
  marginTop: deviceheight/3,
}