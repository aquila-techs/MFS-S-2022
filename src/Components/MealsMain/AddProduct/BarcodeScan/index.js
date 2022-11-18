import { useNavigation } from "@react-navigation/core";
import React, { Component, useRef, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text, View, TouchableOpacity } from "react-native";
// import { RNCamera } from "react-native-camera";
import { Icon } from "react-native-elements";
const BarcodeScan = () => {
  const navigation = useNavigation();
  // const dispatch = useDispatch();
  const cameraRef = useRef(null);
  const [barcodeReaded, setbarcodeReaded] = useState(false);
  const [barcodevalue, setbarcodevalue] = useState("");
  const [value, setvalue] = useState("");

  const onBarCodeRead = (e) => {
    setbarcodeReaded(true);
    setvalue(e.data);
    BarcodeConfirm();
  };

  const BarcodeConfirm = () => {
    Alert.alert(
      `Scan Successfully`,
      `Are you sure you want to Rescan the Recipe`,
      [
        {
          text: "Rescan",
          onPress: () => {
            setbarcodeReaded(false);
          },
        },
        {
          text: "Done",
          onPress: () => {},
        },
      ]
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: "8%",
          // backgroundColor: "white",
          justifyContent: "center",
          paddingLeft: 20,
        }}
      >
        <Icon
          onPress={() => {
            navigation.pop();
          }}
          name={"arrow-back"}
          type={"material"}
          size={30}
          iconStyle={{ width: "100%" }}
          style={{ width: "8%" }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <RNCamera
          style={{ width: "90%", height: "85%", borderRadius: 5 }}
          onBarCodeRead={(e) => {
            if (!barcodeReaded) {
              onBarCodeRead(e);
            }
          }}
          ref={cameraRef}
          aspect={RNCamera.Constants.BarCodeType.qr}
        /> */}
      </View>
      <TouchableOpacity
        onPress={() => {
          setbarcodeReaded(false);
        }}
        style={{
          backgroundColor: "red",
          width: "40%",
          alignSelf: "center",
          height: "6%",
          borderRadius: 9,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>{"Rescan"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export { BarcodeScan };
