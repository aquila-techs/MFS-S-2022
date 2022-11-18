//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Responsive from 'react-native-lightweight-responsive';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

// create a component
const CommonImage = ({ calories }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Image
                source={require("./../../Assets/Today/plusIcon.png")}
                style={{
                    width: Responsive.height(50),
                    height: Responsive.height(50),
                }}
            />
            <Text
                numberOfLines={1}
                style={{
                    color: "#fff",
                    width: widthPercentageToDP(25),
                    height: heightPercentageToDP(3),
                    fontSize: heightPercentageToDP("2%"),
                    textAlign: 'center',
                    fontWeight: "600",
                    right: 10
                }}
            >
                {parseFloat(calories).toFixed(0)} kcal
            </Text>
        </View>
    );
};
//make this component available to the app
export { CommonImage };
