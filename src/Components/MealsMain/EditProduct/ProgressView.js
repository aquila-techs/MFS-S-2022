//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Colors from '../../../Theme/Colors';
import ProgressCircle from 'react-native-progress-circle';
import {styles} from './Styles'
// create a component
const ProgressView = ({protein,title}) => {
    return (
        <View style={{ flexDirection: 'column', margin: '3%' }}>
        <ProgressCircle
          percent={protein}
          radius={heightPercentageToDP('5%')}
          borderWidth={4}
          color={Colors.green}
          shadowColor="#F0F0F0"
          bgColor="#fff">
          <Text
            numberOfLines={1}
            style={styles.pgrCircle}>
            {protein}
          </Text>
          <Text
            style={styles.pgrCircle}>
            {"g"}
          </Text>
        </ProgressCircle>
        <Text style={styles.carbsText}>{title}</Text>
      </View>
    );
};

//make this component available to the app
export {ProgressView};
