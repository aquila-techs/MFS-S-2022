//import liraries
import React, { Component, useEffect, useState } from "react";
import { Fragment } from "react";
import { Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from "react-native-chart-kit";
import { Divider, Overlay } from "react-native-elements";
import I18n from '../../../../translation'
import { API_URL } from '../../../Actions';
import moment from "moment";
import '../../../../node_modules/moment/locale/nl';
import '../../../../node_modules/moment/locale/es';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { Getvalue } from "./../../../redux/actions/features";
// create a component
const YearChart = ({ weight, graphdata, data }) => {
  const dispatch = useDispatch();
  const { user, burncalories, totalcalories, Userweightdata } = useSelector(
    (state) => state.featuse
  );
  const [state, setstate] = useState("My Fit Spot");
  const [targetweight, settargetweight] = useState(0);
  const [gainweight, setgainweight] = useState(0);
  // const [history, sethistory] = useState(data);
  const [history, sethistory] = useState();
  const [month, setmonth] = useState([]);
  const [labels, setLabel] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getUserWeights();
  }, []);

  const getUserWeights = async () => {

    let TOKEN = await AsyncStorage.getItem('PROFILETOKEN')

    setLoader(true)

    fetch(`${API_URL}/user/getUserWeightList`, {

      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': `${TOKEN}`
      }
    }).then((response) => response.json())
      .then((responseJson) => {

        const listing = []
        const days = []

        responseJson.user.map((item) => {

          let check = moment(item.createdAt).locale(I18n.locale == undefined ? 'nl' : I18n.locale).format('MMMM')
          days.push(check)

          var str = item.weight;
          var res = str.replace(/\D/g, "");
          const valuetoInt = parseInt(res)
          listing.push(valuetoInt)

        })

        const data = Array.from(new Set(days.map(JSON.stringify))).map(JSON.parse);

        setLabel(data)
        setmonth(listing)
        sethistory(responseJson.user)
        setLoader(false)

      })
      .catch((error) => {
        alert(JSON.stringify(error));
      })
  }

  const remove = async (id) => {
    let TOKEN = await AsyncStorage.getItem('PROFILETOKEN')
    setLoader(true)

    fetch(`${API_URL}/user/getUserWeightList/${id}`, {

      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': `${TOKEN}`
      }
    }).then((response) => response.json())
      .then((responseJson) => {

        getUserWeights();
        setLoader(false)

      })
      .catch((error) => {
        alert(JSON.stringify(error));
      })

  }

  if (loader == true) {
    return (
      <View
        style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={'#4CAC50'} />
      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>
        {loader && (
          <Overlay overlayStyle={{
            width: widthPercentageToDP(30),
            height: heightPercentageToDP(15),
            justifyContent: 'center',
            alignItems: 'center',
          }} isVisible={loader}>
            <ActivityIndicator color={'rgba(128,128,128, 0.5)'} size={'large'} />
          </Overlay>
        )}
        <Text style={{ textAlign: "left" }}>{I18n.t('YearChart')}</Text>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data:
                  month === null || month.length === 0 || month === undefined
                    ? [0, 0, 0, 0]
                    : month,
              },
            ],
          }}
          width={Dimensions.get("window").width - 16} // from react-native
          height={220}
          yAxisLabel={""}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View
          style={{
            height: "10%",
            width: widthPercentageToDP(100),
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            //   margin: 10,
          }}
        >

        </View>
        <Divider style={{ width: widthPercentageToDP(90) }} />
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            width: widthPercentageToDP(90),
            padding: 10,
          }}
        >
          {I18n.t('WeightHistory')}
        </Text>
        <Divider style={{ width: widthPercentageToDP(90) }} />
        <View style={{ flex: 1, width: widthPercentageToDP(90) }}>
          {history?.length === 0 || history === null || history === undefined ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 15,
              }}
            >
              <Text>{I18n.t('NoWorkHistoryFound')}</Text>
            </View>
          ) : (
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
              {
                history?.map((item) => {
                  return (
                    <Fragment>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 15,
                        }}
                      >
                        <Text>{moment(item?.date).locale(I18n.locale == undefined ? 'nl' : I18n.locale).format('dddd, LL')}</Text>
                        <Text>{`${item.weight}`}</Text>
                        <TouchableOpacity onPress={() => remove(item._id)}>
                          <Text>Remove</Text>
                        </TouchableOpacity>
                      </View>
                      <Divider />
                    </Fragment>
                  );
                })
              }
            </ScrollView>
          )
          }
        </View>
      </View>
    );
  }

};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
  },
});

//make this component available to the app
export { YearChart };
