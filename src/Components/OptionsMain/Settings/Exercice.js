//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IconF from "react-native-vector-icons/FontAwesome";
// create a component
const Exercice = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        width: "100%",
        height: "70%",
        marginBottom: "1%",
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        shadowOpacity: Platform.OS === "android" ? 0.5 : 0.05,
        elevation: 0.5,
      }}
    >
      <Text
        style={{
          color: "#000",
          fontSize: 17,
          marginLeft: "5%",
        }}
      >
        {title}
      </Text>
      <View
        style={{ position: "absolute", right: "5%" }}
      // onPress={() => this.setModalVisible(false)}>
      >
        <IconF name="angle-right" size={25} color="rgba(0,0,0,0.3)" />
      </View>
    </TouchableOpacity>
  );
};

//make this component available to the app
export { Exercice };
