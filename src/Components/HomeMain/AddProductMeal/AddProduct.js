//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from "../../../Theme/Colors";
import { Icon } from 'react-native-elements'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// create a component
const AddProduct = ({ onpress, title }) => {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={{ width: wp('43'), flexDirection: 'row', backgroundColor: Colors.green, borderRadius: 5, paddingLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Icon size={22} name={'add'} type={'material'} color={"white"} />
      </View>
      <Text style={{ color: '#ffffff', fontSize: 17, fontWeight: '500', alignSelf: 'center', padding: 10 }}>
        {title}
      </Text>
    </TouchableOpacity>
    // <TouchableOpacity
    //   onPress={onpress}
    //   style={{ width: wp('47'), flexDirection: 'row', backgroundColor: '#000', paddingLeft: 5, height: hp('7'), justifyContent: 'flex-start', alignItems: 'center', marginLeft: 2 }}>
    //   <View style={{ backgroundColor: '#5E5B5D' }}>
    //     <Icon size={22} name={'add'} type={'material'} color={"white"} />
    //   </View>
    //   <Text style={{ color: 'white', fontSize: 17, left: 5 }}>
    //     {title}
    //   </Text>
    // </TouchableOpacity>
  );
};

//make this component available to the app
export { AddProduct };
