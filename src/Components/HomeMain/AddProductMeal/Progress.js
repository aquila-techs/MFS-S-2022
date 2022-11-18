//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Colors from '../../../Theme/Colors';
import ProgressCircle from "react-native-progress-circle";
// create a component
const Progress = ({ name, value }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ProgressCircle
                percent={value}
                radius={heightPercentageToDP("4")}
                borderWidth={4}
                color={Colors.green}
                shadowColor="#F0F0F0"
                bgColor="#fff"
            >
                <Text
                    style={styles.pgrCircle}
                >
                    {parseFloat(value).toFixed(0)}
                </Text>
                <Text
                    style={styles.pgrCircle}>
                    {"g"}
                </Text>
            </ProgressCircle>
            <Text
                style={{
                    color: '#71886E',
                    fontSize: 13,
                    fontWeight: '600',
                }}>
                {name}
            </Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    pgrCircle: {
        fontSize: heightPercentageToDP('1.5%'),
        width: widthPercentageToDP('20'),
        textAlign: 'center',
        color: Colors.green,
        fontWeight: '600',
    },
});

//make this component available to the app
export { Progress };
