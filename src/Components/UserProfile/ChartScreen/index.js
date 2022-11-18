import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { Platform } from "react-native";
import { View, Text, StyleSheet, Image, Modal } from "react-native";
import { ButtonGroup, Divider } from "react-native-elements";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import IconA from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import { Monthchart } from "./Monthcart";
import { YearChart } from "./YearChart";
import I18n from '../../../../translation'
// create a component
const ChartKit = () => {
  const navigation = useNavigation();
  const [selectedIndex, setselectedIndex] = useState(0);
  const [msgpopupproduct, setMsgpopupproduct] = useState(false);
  const { user, burncalories, totalcalories, Userweightdata } = useSelector(
    (state) => state.featuse
  );
  const [month, setmonth] = useState([0, 0, 0]);
  const [grapgdata, setgraphdate] = useState([]);
  const component1 = () => (
    <Text
      style={{
        color: selectedIndex === 0 ? "white" : "#292C2F",
        fontSize: 20,
      }}
    >
      {I18n.t('Month')}
    </Text>
  );
  const component2 = () => (
    <Text
      style={{ color: selectedIndex === 1 ? "white" : "#292C2F", fontSize: 20 }}
    >
      {I18n.t('Year')}
    </Text>
  );
  // useEffect(() => {
  //   console.log("Resppnse Userweightdata check", Userweightdata);
  // }, [month]);

  // useEffect(() => {
  //   let objweight = [];
  //   let valuve = [];
  //   try {
  //     Userweightdata?.forEach((item) => {
  //       objweight.push(parseFloat(item?.wight));
  //       valuve.push(item.date);
  //       try {
  //         const result = valuve.reduce(
  //           (a, c) => {
  //             const split = c.split(" ");
  //             a.letters.push(split[0]);
  //             // a.numbers.push(split[1]);
  //             return a;
  //           },
  //           // { letters: [], numbers: [] }
  //           { letters: [] }
  //         );
  //         // const { letters, numbers } = result;
  //         const { letters } = result;
  //         setgraphdate(letters);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setmonth(objweight);
  //   // setgraphdate(valuve);
  // }, []);
  
  const updateIndex = (index) => {
    setselectedIndex(index);
  };
 
  const SelectedScreen = () => {
    if (selectedIndex === 0) {
      return (
        // <Monthchart
        //   weight={23}
        //   month={month}
        //   graphdata={grapgdata}
        //   data={Userweightdata}
        // />
        <Monthchart />
      );
    } else {
      return (
        // <YearChart
        //   weight={23}
        //   month={month}
        //   graphdata={grapgdata}
        //   data={Userweightdata}
        // />
        <YearChart />
      );
    }
  };
  const buttons = [{ element: component1 }, { element: component2 }];
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#fff",
          width: "100%",
          height: "7.5%",
          flexDirection: "row",
          shadowOpacity: Platform.OS === "android" ? 0.5 : 0,
          borderBottomWidth: 0,
          elevation: 3,
        }}
      >
        <TouchableOpacity
          style={{ width: "10%", padding: 5 }}
          onPress={() => navigation.goBack()}
        >
          <IconA name="arrowleft" style={{ marginLeft: 5, marginTop: 7 }} size={25} color="black" />
        </TouchableOpacity>

        <View style={{ width: "80%", alignItems: 'center', marginTop: 10 }}>
          <Text style={{ color: "#000", fontSize: 18 }}>
            {I18n.t('YourWeightHistory')}
          </Text>
        </View>

        <View style={{ width: '10%' }}>
          <TouchableOpacity onPress={() => setMsgpopupproduct(true)} style={{ width: 30, alignSelf: 'flex-start', marginTop: 0 }}>
            <Image style={{ width: 20, height: 20, marginTop: 13 }} source={require('../../../Assets/Images/info.png')} />
          </TouchableOpacity>
        </View>

      </View>
      <View>
        <ButtonGroup
          onPress={updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{
            height: heightPercentageToDP("5"),
            width: "50%",
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 20,
            marginTop: 10,
          }}
          selectedButtonStyle={{
            backgroundColor: "#292C2F",
          }}
        />
      </View>
      <View
        style={{
          width: widthPercentageToDP("90"),
          height: heightPercentageToDP("90"),
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        {SelectedScreen()}
      </View>
      {/* <View
        style={{
          height: '10%',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          //   margin: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 17, fontWeight: '700'}}>{'0.3 Kg'}</Text>
          <Text>{'GAINED'}</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 17, fontWeight: '700'}}>{'71.3 Kg'}</Text>
          <Text>{'TARGET WEIGHT'}</Text>
        </View>
      </View>
      <Divider />
      <View style={{flex: 1}}>
        {history.map(item => {
          return (
            <Fragment>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 20,
                  padding: 15,
                }}>
                <Text>{item.titledata}</Text>
                <Text>{item.wight}</Text>
              </View>
              <Divider />
            </Fragment>
          );
        })}
      </View> */}

      <Modal
        transparent={true}
        visible={msgpopupproduct}
        onRequestClose={() => setMsgpopupproduct(false)}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View>
            <View style={{ backgroundColor: '#ffffff', height: '100%' }}>

              <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                <TouchableOpacity onPress={() => setMsgpopupproduct(false)} style={{ width: '20%' }}>
                  <Image style={{ width: 40, height: 40 }} source={require('../../../Assets/Today/backButton.png')} />
                </TouchableOpacity>
                <View style={{ width: '80%' }}>
                  {/* <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 60, fontWeight: 'bold', color: '#58595B' }}>Overview</Text> */}
                </View>
              </View>

              <View style={{ marginTop: 50 }}>
                <Image style={{ width: 150, height: 19, alignSelf: 'center' }} source={require('../../../Assets/Images/logoBlack.png')} />
              </View>

              <View style={{ marginTop: 20, padding: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('ChartPOP1d1')}</Text>
              </View>

              <View style={{ marginTop: 10, padding: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('ChartPOP1d2')}</Text>
              </View>

              <View style={{ marginTop: 10, padding: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('ChartPOP1d3')}</Text>
              </View>

              <View style={{ width: 130, alignSelf: 'center', borderTopColor: '#000000', borderTopWidth: 2, paddingTop: 10 }}>
                <Text style={{ alignSelf: 'center', color: '#8D8D8D', fontSize: 15 }}>{I18n.t('POP1d4')}</Text>
              </View>

            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

//make this component available to the app
export default ChartKit;
