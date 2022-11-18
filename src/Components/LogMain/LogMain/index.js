import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  RefreshControl,
  Platform,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./Styles";
import IconF from "react-native-vector-icons/FontAwesome5";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL, SERVER_URL } from "../../../Actions";
import { ActionCreators } from "../../../Actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import ImageResizer from "react-native-image-resizer";
//import Modal from 'react-native-modal';
let deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;
import Moment from "moment";
import _ from "lodash";
import renderIf from "render-if";
import localize from "../../../translation";
import Colors from "../../../Theme/Colors";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import {
  WheelPicker,
  TimePicker,
  DatePicker,
} from "react-native-wheel-picker-android";
import Responsive from "react-native-lightweight-responsive";

const wheelPickerData = [
  Moment(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 5
    )
  ).format("dddd") +
    ", " +
    Moment(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 5
      )
    ).format("DD MMM"),

  Moment(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 4
    )
  ).format("dddd") +
    ", " +
    Moment(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 4
      )
    ).format("DD MMM"),

  Moment(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 3
    )
  ).format("dddd") +
    ", " +
    Moment(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 3
      )
    ).format("DD MMM"),

  Moment(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 2
    )
  ).format("dddd") +
    ", " +
    Moment(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 2
      )
    ).format("DD MMM"),

  "Yesterday" +
    ", " +
    Moment(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 1
      )
    ).format("DD MMM"),
  "Today" +
    ", " +
    Moment(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
    ).format("DD MMM"),
];
const distanceUnit = ["km", "mi"];
const mData = [".0", ".1", ".2", ".3", ".4", ".5", ".6", ".7", ".8", ".9"];

const kmData = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];

const minuteData = [
  "0 mins",
  "1 mins",
  "2 mins",
  "3 mins",
  "4 mins",
  "5 mins",
  "6 mins",
  "7 mins",
  "8 mins",
  "9 mins",
  "10 mins",
  "11 mins",
  "12 mins",
  "13 mins",
  "14 mins",
  "15 mins",
  "16 mins",
  "17 mins",
  "18 mins",
  "19 mins",
  "20 mins",
  "21 mins",
  "22 mins",
  "23 mins",
  "24 mins",
  "25 mins",
  "26 mins",
  "27 mins",
  "28 mins",
  "29 mins",
  "30 mins",
  "31 mins",
  "32 mins",
  "33 mins",
  "34 mins",
  "35 mins",
  "36 mins",
  "37 mins",
  "38 mins",
  "39 mins",
  "40 mins",
  "41 mins",
  "42 mins",
  "43 mins",
  "44 mins",
  "45 mins",
  "46 mins",
  "47 mins",
  "48 mins",
  "49 mins",
  "50 mins",
  "51 mins",
  "52 mins",
  "53 mins",
  "54 mins",
  "55 mins",
  "56 mins",
  "57 mins",
  "58 mins",
  "59 mins",
];

const hourData = [
  "0 hours",
  "1 hours",
  "2 hours",
  "3 hours",
  "4 hours",
  "5 hours",
  "6 hours",
  "7 hours",
  "8 hours",
  "9 hours",
  "10 hours",
  "11 hours",
];

const DATA = [
  {
    id: "1",
    title: "Running",
    formulaValue: "",
    date: true,
    distance: true,
    duration: true,
    image: require("../../../Assets/run1.png"),
  },
  {
    id: "2",
    title: "Walking",
    formulaValue: "",
    date: false,
    distance: true,
    duration: true,
    image: require("../../../Assets/walk1.png"),
  },
  {
    id: "3",
    title: "Biking",
    formulaValue: "",
    date: true,
    distance: true,
    duration: true,
    image: require("../../../Assets/starIcon.png"),
  },
  {
    id: "4",
    title: "Swimming",
    formulaValue: "",
    date: false,
    distance: true,
    duration: true,
    image: require("../../../Assets/starIcon.png"),
  },
  {
    id: "5",
    title: "Sexual Activity",
    formulaValue: "",
    date: true,
    distance: true,
    duration: true,
    image: require("../../../Assets/starIcon.png"),
  },
  {
    id: "6",
    title: "Weight Lifting",
    formulaValue: "",
    date: true,
    distance: true,
    duration: true,
    image: require("../../../Assets/starIcon.png"),
  },

  {
    id: "7",
    title: "HIIT",
    formulaValue: "",
    date: true,
    distance: true,
    duration: true,
    image: require("../../../Assets/starIcon.png"),
  },
];

function ListItem({ item }) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        marginBottom: "4%",
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "4%",
      }}
    >
      <Image
        style={{ width: 20, height: 20, marginRight: "3%" }}
        source={item.image}
      />
      <View style={{}}>
        <Text style={{ fontSize: 15, color: "#000" }}>{item.title}</Text>
      </View>

      <View style={{ marginRight: "10%", marginLeft: "auto" }}>
        <IconF name="angle-right" size={25} color="rgba(0,0,0,0.3)" />
      </View>
    </View>
  );
}

class LogMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityList: [
        {
          id: 0,
          acitivityName: "Shoes",
          duration: "0 mins",
          distance: ".0 km",
          date:
            Moment(
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
              )
            ).format("dddd") +
            ", " +
            Moment(
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
              )
            ).format("DD MMM"),
        },
      ],
      collapsed: false,
      collapsedDuration: false,
      weightKG: "",
      weightLB: "",
      unit: "kg",
      // modalVisible: true,
      locationSearch: "",
      temp: [],
      itemNumberShow: 0,
      bottomBorder1: 0,
      bottomBorder2: 2,
      bottomBorder3: 0,
      whichScreen: 1,
      modalVisible: false,
      selectColor: "",
      allChecked: true,
      postChecked: false,
      collectionChecked: false,
      DATA: [],
      postColor: "grey",
      collectionColor: "grey",
      filterType: 0,
      multiple: false,
      loading: true,
      logActivity: [],
      activityShow: false,
      dateToday:
        Moment(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
        ).format("dddd") +
        ", " +
        Moment(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
        ).format("DD MMM"),

      selectedItem: 5,

      selectedItemDistanceKm: "",
      selectedItemDistanceMeter: ".0",
      selectedItemDistanceUnit: "km",
      distanceKm: "0",
      distanceMeter: ".0",
      distanceUnit: "km",

      selectedItemMinutes: "0 mins",
      selectedItemHours: "",
      durationMinutes: "0 mins",
      durationHours: "",

      dateShow: false,
      distanceShow: false,
      durationShow: false,
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    this.props.navigation.navigate("HomeMain");
  }

  componentDidMount() {
    this.setState({ modalVisible: true });
  }

  onTabSelect(whichDay) {
    if (whichDay == 0) {
      this.setState({
        bottomBorder1: 2,
        bottomBorder2: 0,
        bottomBorder3: 0,
        whichScreen: 0,
        dayCheck: "today",
        multiple: false,
        loading: true,
      });
      this._textInput1.setNativeProps({ style: { color: "#7AD319" } });
      this._textInput2.setNativeProps({ style: { color: "rgba(0,0,0,0.5)" } });
      this._textInput3.setNativeProps({ style: { color: "rgba(0,0,0,0.5)" } });
    } else if (whichDay == 1) {
      this.setState({
        bottomBorder1: 0,
        bottomBorder2: 2,
        bottomBorder3: 0,
        whichScreen: 1,
        dayCheck: "today",
        multiple: false,
        loading: true,
      });
      this._textInput2.setNativeProps({ style: { color: "#7AD319" } });
      this._textInput1.setNativeProps({ style: { color: "rgba(0,0,0,0.5)" } });
      this._textInput3.setNativeProps({ style: { color: "rgba(0,0,0,0.5)" } });
    } else {
      this.setState({
        bottomBorder1: 0,
        bottomBorder2: 0,
        bottomBorder3: 2,
        whichScreen: 2,
        dayCheck: "later",
        multiple: false,
        loading: true,
      });
      this._textInput3.setNativeProps({ style: { color: "#7AD319" } });
      this._textInput1.setNativeProps({ style: { color: "rgba(0,0,0,0.5)" } });
      this._textInput2.setNativeProps({ style: { color: "rgba(0,0,0,0.5)" } });
    }
  }

  actionActivity(item) {
    this.setState({
      logActivity: item,
      activityShow: true,
    });
  }
  createActivity() {
    //   var {groupCount}=this.state;
    //   var {groupName}=this.state;
    //   if(groupName !== ''){
    //   this.array.push({
    //     id:groupCount+1,
    //     groupName : this.state.groupName,
    //   });
    //   this.setState({ groupList: [...this.array],groupCount:groupCount+1, abc:true,groupName:'', })
    //  // alert(JSON.stringify(this.state.groupList))
    // }
  }

  onItemSelected = (selectedItem) => {
    this.setState({ dateToday: wheelPickerData[selectedItem] });
  };

  onItemSelectedHours = (selectedItemHours) => {
    this.setState({ selectedItemHours: hourData[selectedItemHours] });
  };

  onItemSelectedMinutes = (m) => {
    this.setState({ selectedItemMinutes: minuteData[m] });
  };

  onItemSelectedDistanceUnit = (selectedItemDistanceUnit) => {
    this.setState({
      selectedItemDistanceUnit: distanceUnit[selectedItemDistanceUnit],
    });
  };
  onItemSelectedDistanceMeter = (selectedItemDistanceMeter) => {
    this.setState({
      selectedItemDistanceMeter: mData[selectedItemDistanceMeter],
    });
  };
  onItemSelectedDistanceKm = (selectedItemDistanceKm) => {
    this.setState({ selectedItemDistanceKm: kmData[selectedItemDistanceKm] });
  };

  render() {
    const { logActivity } = this.state;
    return (
      //   <>
      //   <Button onPress={() => this.setModalVisible(true)}
      //   buttonStyle={styles.buttonStyle}
      //   icon={
      //     <IconM name="add-box" size={35} color={'#000'} />
      //   }
      // />
      <View style={styles.mainViewStyle}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          {renderIf(!this.state.activityShow)(
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(128,128,128, 0.5)",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  //       height: Responsive.height(370),
                  height: "90%",
                  width: "100%",
                  backgroundColor: "#fff",
                  borderTopLeftRadius: Responsive.height(10),
                  borderTopRightRadius: Responsive.height(10),
                }}
              >
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      this.setModalVisible(false);
                    }}
                  >
                    <Text
                      style={{
                        opacity: 0.5,
                        marginTop: Responsive.height(10),
                      }}
                    >
                      Tap to close{" "}
                    </Text>
                  </TouchableOpacity>

                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        shadowOpacity: 0.5,
                        borderBottomWidth: 0.5,
                        borderBottomColor: "grey",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          textAlign: "center",
                          width: "100%",
                          alignContent: "center",
                          alignSelf: "center",
                          alignItems: "center",
                          marginTop: Responsive.height(10),
                          marginBottom: Responsive.height(10),
                          backgroundColor: "white",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "helvetica",
                            fontSize: Responsive.height(12),
                            color: "#000",
                          }}
                        >
                          Log
                        </Text>
                        {/* <Text style={styles.address}>{params.pickup_location}</Text> */}
                      </View>
                    </View>
                  </ScrollView>
                </View>

                <View style={styles.tabBar}>
                  <TouchableOpacity
                    style={[
                      styles.tabTextWrapper,
                      {
                        borderBottomWidth: this.state.bottomBorder1,
                      },
                    ]}
                    onPress={() => this.onTabSelect(0)}
                  >
                    <Text
                      style={styles.tabText}
                      ref={(component) => (this._textInput1 = component)}
                    >
                      ACTIVITY
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.tabTextWrapper,
                      {
                        borderBottomWidth: this.state.bottomBorder2,
                      },
                    ]}
                    onPress={() => this.onTabSelect(1)}
                  >
                    <Text
                      style={[styles.tabText, { color: "#7AD319" }]}
                      ref={(component) => (this._textInput2 = component)}
                    >
                      TODAY
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tabTextWrapper,
                      {
                        borderBottomWidth: this.state.bottomBorder3,
                      },
                    ]}
                    onPress={() => this.onTabSelect(2)}
                  >
                    <Text
                      style={styles.tabText}
                      ref={(component) => (this._textInput3 = component)}
                    >
                      FOOD
                    </Text>
                  </TouchableOpacity>
                </View>

                {renderIf(this.state.whichScreen == 0)(
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      flex: 1,
                      flexDirection: "column",
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.green,
                        margin: "3%",
                        fontSize: 14,
                      }}
                    >
                      {localize.t("activityQuestion")}?
                    </Text>
                    <FlatList
                      style={{
                        marginTop: Responsive.height(5),
                        marginBottom: Responsive.height(5),
                      }}
                      ItemSeparatorComponent={() => (
                        <View
                          style={{
                            width: "100%",
                            borderColor: "#707070",
                            borderWidth: 0.5,
                            opacity: 0.2,
                            alignSelf: "center",
                          }}
                        />
                      )}
                      data={DATA}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => this.actionActivity(item)}
                        >
                          <ListItem item={item} />
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item, index) => item + index.toString()}
                    />
                  </View>
                )}
                {renderIf(this.state.whichScreen == 1)(
                  <View style={styles.container}>
                    <View
                      style={{
                        backgroundColor: Colors.green,
                        height: "40%",
                        width: "100%",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: "column", margin: "3%" }}>
                          <Text
                            style={{
                              color: "rgba(256,256,256,0.7)",
                              borderBottomColor: "rgba(256,256,256,0.7)",
                              borderBottomWidth: 1,
                              fontSize: 14,
                            }}
                          >
                            Weekly Caleories
                          </Text>
                          <Text
                            style={{
                              color: "rgba(256,256,256,0.7)",
                              fontSize: 14,
                            }}
                          >
                            {Math.round(this.props.totalWeeklyKCal).toFixed(2)}{" "}
                            KCAL
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            margin: "3%",
                            marginLeft: "auto",
                            marginRight: "5%",
                          }}
                        >
                          <Text
                            style={{
                              color: "rgba(256,256,256,0.7)",
                              borderBottomColor: "rgba(256,256,256,0.7)",
                              borderBottomWidth: 1,
                              fontSize: 14,
                            }}
                          >
                            Daily Caleories
                          </Text>
                          <Text
                            style={{
                              color: "rgba(256,256,256,0.7)",
                              fontSize: 14,
                            }}
                          >
                            {Math.round(this.props.totalDailyKCal).toFixed(2)}{" "}
                            KCAL
                          </Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            flexDirection: "column",
                            marginLeft: "10%",
                            marginTop: "10%",
                            marginRight: "5%",
                          }}
                        >
                          <Text
                            style={{
                              color: "rgba(256,256,256,0.7)",
                              fontSize: 14,
                              textAlign: "center",
                            }}
                          >
                            500
                          </Text>
                          <Text
                            style={{
                              color: "rgba(256,256,256,0.7)",
                              fontSize: 14,
                              textAlign: "center",
                            }}
                          >
                            BURNED
                          </Text>
                        </View>
                        <View
                          style={{
                            backgroundColor: "rgba(256,256,256,0.2)",
                            height: Responsive.height(125),
                            width: Responsive.width(145),
                            alignSelf: "center",
                            alignContent: "center",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{
                              borderColor: "rgba(256,256,256,0.4)",
                              borderWidth: 2,
                              width: "80%",
                              height: "90%",
                              borderRadius: 100,
                              alignItems: "center",
                              alignContent: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "rgba(256,256,256,0.9)",
                                fontSize: 30,
                                textAlign: "center",
                              }}
                            >
                              {Math.round(this.props.totalDailyKCal)}
                             
                            </Text>
                            <Text
                              style={{
                                color: "rgba(256,256,256,0.9)",
                                fontSize: 14,
                                textAlign: "center",
                              }}
                            >
                              KCAL OVER
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            marginRight: "10%",
                            marginTop: "10%",
                            marginLeft: "auto",
                          }}
                        >
                          <Text
                            style={{
                              color: "rgba(256,256,256,0.7)",
                              fontSize: 14,
                              textAlign: "center",
                            }}
                          >
                            900
                          </Text>
                          <Text
                            style={{
                              color: "rgba(256,256,256,0.7)",
                              fontSize: 14,
                              textAlign: "center",
                            }}
                          >
                            EATEN
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.goal1}>
                      <Text
                        style={{ color: "#000", fontSize: 20, marginBottom: 5 }}
                      >
                        {localize.t("weightToday")}?
                      </Text>
                    </View>

                    {renderIf(this.state.unit == "kg")(
                      <View style={{ flexDirection: "row", margin: 5 }}>
                        <TextInput
                          value={this.state.weightKG}
                          onChangeText={(text) => {
                            this.setState({
                              weightKG: text,
                            });
                          }}
                          placeholder="0"
                          maxLength={3}
                          // placeholderTextColor="#9E9F9D"
                          underlineColorAndroid="transparent"
                          style={styles.heightTextInputStyle}
                          keyboardType={"numeric"}
                        />
                        <Text style={styles.headerSideText}>KG</Text>
                      </View>
                    )}
                    {renderIf(this.state.unit == "lb")(
                      <View style={{ flexDirection: "row", margin: 5 }}>
                        <TextInput
                          value={this.state.weightLB}
                          onChangeText={(text) => {
                            this.setState({
                              weightLB: text,
                            });
                          }}
                          placeholder="0"
                          // placeholderTextColor="#9E9F9D"
                          underlineColorAndroid="transparent"
                          style={styles.heightTextInputStyle}
                          maxLength={3}
                          keyboardType={"numeric"}
                        />
                        <Text style={styles.headerSideText}>LB</Text>
                      </View>
                    )}
                    <View style={styles.gendermain}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ unit: "kg" });
                        }}
                        style={[
                          styles.heightbuttons,
                          styles.borderRadiusLeft,
                          this.state.unit == "kg" ? styles.selectedbutton : {},
                        ]}
                      >
                        <Text
                          style={{
                            color: this.state.unit == "kg" ? "#000" : "#999",
                          }}
                        >
                          KG
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ unit: "lb" });
                        }}
                        style={[
                          styles.heightbuttons,
                          styles.borderRadiusRight,
                          this.state.unit == "lb" ? styles.selectedbutton : {},
                        ]}
                      >
                        <Text
                          style={{
                            color: this.state.unit == "lb" ? "#000" : "#999",
                          }}
                        >
                          LB
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: "5%", width: "100%" }}>
                      <TouchableOpacity
                        style={{
                          marginTop: 20,
                          height: 50,
                          width: 150,
                          // borderColor: '#B76EC6',
                          // borderWidth: 1,
                          backgroundColor: Colors.green,
                          alignItems: "center",
                          alignContent: "center",
                          alignSelf: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                        }}
                      >
                        <Text style={{ color: "#fff" }}>Update Weight</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {renderIf(this.state.whichScreen == 2)(
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: "#ffffff",
                      flex: 1,
                      flexDirection: "column",
                    }}
                  >
                    <View style={styles.goal1}>
                      <Text
                        style={{ color: "#000", fontSize: 20, margin: "10%" }}
                      >
                        {localize.t("foodQuestion")}?
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <TextInput
                        value={this.state.weightKG}
                        onChangeText={(text) => {
                          this.setState({
                            weightKG: text,
                          });
                        }}
                        placeholder="0.0"
                        maxLength={3}
                        // placeholderTextColor="#9E9F9D"
                        underlineColorAndroid="transparent"
                        style={styles.heightTextInputStyle}
                        keyboardType={"numeric"}
                      />
                      <Text style={styles.headerSideText}>KCAL</Text>
                    </View>

                    <View style={{ marginTop: "5%", width: "100%" }}>
                      <TouchableOpacity
                        style={{
                          marginTop: 20,
                          height: 50,
                          width: 150,
                          // borderColor: '#B76EC6',
                          // borderWidth: 1,
                          backgroundColor: Colors.green,
                          alignItems: "center",
                          alignContent: "center",
                          alignSelf: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                        }}
                      >
                        <Text style={{ color: "#fff" }}>Update KCAL</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}

          {renderIf(this.state.activityShow)(
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(128,128,128, 0.5)",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  //       height: Responsive.height(370),
                  height: "90%",
                  width: "100%",
                  backgroundColor: "#fff",
                  borderTopLeftRadius: Responsive.height(10),
                  borderTopRightRadius: Responsive.height(10),
                }}
              >
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      this.setModalVisible(false);
                    }}
                  >
                    <Text
                      style={{
                        opacity: 0.5,
                        marginTop: Responsive.height(10),
                      }}
                    >
                      {" "}
                      Tap to close{" "}
                    </Text>
                  </TouchableOpacity>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        shadowOpacity: 0.5,
                        borderBottomWidth: 0.5,
                        borderBottomColor: "grey",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          alignContent: "center",
                          alignSelf: "center",
                          alignItems: "center",
                          marginTop: Responsive.height(10),
                          marginBottom: Responsive.height(10),
                          backgroundColor: "white",
                          justifyContent: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: "10%",
                            position: "absolute",
                            left: "3%",
                          }}
                          onPress={() => this.setState({ activityShow: false })}
                        >
                          <Text
                            style={{
                              opacity: 0.5,
                              marginTop: Responsive.height(10),
                            }}
                          >
                            Back{" "}
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: "helvetica",
                            fontSize: Responsive.height(12),
                            color: "#000",
                          }}
                        >
                          {logActivity.title}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        height: Responsive.height(200),
                        width: "100%",
                        backgroundColor: "rgba(0,0,0,0.1)",
                        alignContent: "center",
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        style={{ marginTop: "5%" }}
                        source={logActivity.image}
                      />
                      <Text
                        style={{
                          opacity: 0.5,
                          marginRight: "auto",
                          marginTop: "auto",
                          marginBottom: "2%",
                          marginLeft: "3%",
                        }}
                      >
                        HOW DID IT GO?
                      </Text>
                    </View>

                    {renderIf(!this.state.dateShow)(
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            dateShow: true,
                            distanceShow: false,
                            durationShow: false,
                          });
                        }}
                        style={{
                          height: Responsive.height(35),
                          width: "100%",
                          borderBottomColor: "rgba(0,0,0,0.1)",
                          borderBottomWidth: 0.5,
                        }}
                      >
                        <View style={{ flexDirection: "row", marginTop: "2%" }}>
                          <View style={{ marginLeft: "5%" }}>
                            <Text style={{ fontSize: 15, color: "#000" }}>
                              Date
                            </Text>
                          </View>

                          <View
                            style={{ marginRight: "5%", marginLeft: "auto" }}
                          >
                            <Text
                              style={{
                                fontSize: 15,
                                color: "#000",
                                opacity: 0.5,
                              }}
                            >
                              {this.state.dateToday}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}

                    {renderIf(this.state.dateShow)(
                      <View
                        style={{
                          height: Responsive.height(150),
                          width: "100%",
                          borderBottomColor: "rgba(0,0,0,0.1)",
                          borderBottomWidth: 0.5,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ dateShow: false });
                          }}
                          style={{
                            flexDirection: "row",
                            marginTop: "2%",
                            borderBottomColor: "rgba(0,0,0,0.1)",
                            borderBottomWidth: 0.5,
                            height: Responsive.height(30),
                          }}
                        >
                          <View style={{ marginLeft: "5%" }}>
                            <Text style={{ fontSize: 15, color: "#000" }}>
                              Date
                            </Text>
                          </View>

                          <View
                            style={{ marginRight: "5%", marginLeft: "auto" }}
                          >
                            <Text
                              style={{
                                fontSize: 15,
                                color: "#000",
                                opacity: 0.5,
                              }}
                            >
                              {this.state.dateToday}
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <View
                          style={{
                            justifyContent: "center",
                            alignContent: "center",
                            alignSelf: "center",
                          }}
                        >
                          <WheelPicker
                            // selectedItem={this.state.selectedItem}
                            value={this.state.selectedItem}
                            data={wheelPickerData}
                            onItemSelected={this.onItemSelected}
                          />
                        </View>
                      </View>
                    )}

                    {renderIf(!this.state.distanceShow)(
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            dateShow: false,
                            distanceShow: true,
                            durationShow: false,
                          });
                        }}
                        style={{
                          height: Responsive.height(35),
                          width: "100%",
                          borderBottomColor: "rgba(0,0,0,0.1)",
                          borderBottomWidth: 0.5,
                        }}
                      >
                        <View style={{ flexDirection: "row", marginTop: "2%" }}>
                          <View style={{ marginLeft: "5%" }}>
                            <Text style={{ fontSize: 15, color: "#000" }}>
                              Distance
                            </Text>
                          </View>

                          <View
                            style={{ marginRight: "5%", marginLeft: "auto" }}
                          >
                            <Text
                              style={{
                                fontSize: 15,
                                color: "#000",
                                opacity: 0.5,
                              }}
                            >
                              {this.state.selectedItemDistanceKm}
                              {this.state.selectedItemDistanceMeter}{" "}
                              {this.state.selectedItemDistanceUnit}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}

                    {renderIf(this.state.distanceShow)(
                      <View
                        style={{
                          height: Responsive.height(150),
                          width: "100%",
                          borderBottomColor: "rgba(0,0,0,0.1)",
                          borderBottomWidth: 0.5,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ distanceShow: false });
                          }}
                          style={{
                            flexDirection: "row",
                            marginTop: "2%",
                            borderBottomColor: "rgba(0,0,0,0.1)",
                            borderBottomWidth: 0.5,
                            height: Responsive.height(30),
                          }}
                        >
                          <View style={{ marginLeft: "5%" }}>
                            <Text style={{ fontSize: 15, color: "#000" }}>
                              Distance
                            </Text>
                          </View>

                          <View
                            style={{ marginRight: "5%", marginLeft: "auto" }}
                          >
                            <Text
                              style={{
                                fontSize: 15,
                                color: "#000",
                                opacity: 0.5,
                              }}
                            >
                              {this.state.selectedItemDistanceKm}
                              {this.state.selectedItemDistanceMeter}{" "}
                              {this.state.selectedItemDistanceUnit}
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <View style={{ width: "33%" }}>
                            <WheelPicker
                              selectedItemDistanceKm={
                                this.state.selectedItemDistanceKm
                              }
                              data={kmData}
                              onItemSelected={this.onItemSelectedDistanceKm}
                            />
                          </View>
                          <View style={{ width: "33%" }}>
                            <WheelPicker
                              selectedItemDistanceMeter={
                                this.state.selectedItemDistanceMeter
                              }
                              data={mData}
                              onItemSelected={this.onItemSelectedDistanceMeter}
                            />
                          </View>
                          <View style={{ width: "33%" }}>
                            <WheelPicker
                              selectedItemDistanceUnit={
                                this.state.selectedItemDistanceUnit
                              }
                              data={distanceUnit}
                              onItemSelected={this.onItemSelectedDistanceUnit}
                            />
                          </View>
                        </View>
                      </View>
                    )}

                    {renderIf(!this.state.durationShow)(
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            dateShow: false,
                            distanceShow: false,
                            durationShow: true,
                          });
                        }}
                        style={{
                          height: Responsive.height(35),
                          width: "100%",
                          borderBottomColor: "rgba(0,0,0,0.1)",
                          borderBottomWidth: 0.5,
                        }}
                      >
                        <View style={{ flexDirection: "row", marginTop: "2%" }}>
                          <View style={{ marginLeft: "5%" }}>
                            <Text style={{ fontSize: 15, color: "#000" }}>
                              Duration
                            </Text>
                          </View>

                          <View
                            style={{ marginRight: "5%", marginLeft: "auto" }}
                          >
                            <Text
                              style={{
                                fontSize: 15,
                                color: "#000",
                                opacity: 0.5,
                              }}
                            >
                              {this.state.selectedItemHours},
                              {this.state.selectedItemMinutes}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}

                    {renderIf(this.state.durationShow)(
                      <View
                        style={{
                          height: Responsive.height(150),
                          width: "100%",
                          borderBottomColor: "rgba(0,0,0,0.1)",
                          borderBottomWidth: 0.5,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ durationShow: false });
                          }}
                          style={{
                            flexDirection: "row",
                            marginTop: "2%",
                            borderBottomColor: "rgba(0,0,0,0.1)",
                            borderBottomWidth: 0.5,
                            height: Responsive.height(30),
                          }}
                        >
                          <View style={{ marginLeft: "5%" }}>
                            <Text style={{ fontSize: 15, color: "#000" }}>
                              Duration
                            </Text>
                          </View>

                          <View
                            style={{ marginRight: "5%", marginLeft: "auto" }}
                          >
                            <Text
                              style={{
                                fontSize: 15,
                                color: "#000",
                                opacity: 0.5,
                              }}
                            >
                              {this.state.selectedItemHours},
                              {this.state.selectedItemMinutes}
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <WheelPicker
                            selectedItemHours={this.state.selectedItemHours}
                            data={hourData}
                            onItemSelected={this.onItemSelectedHours}
                          />

                          <WheelPicker
                            selectedItemMinutes={this.state.selectedItemMinutes}
                            data={minuteData}
                            onItemSelected={this.onItemSelectedMinutes}
                          />
                        </View>
                      </View>
                    )}
                  </ScrollView>
                </View>
              </View>
            </View>
          )}
        </Modal>

        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
            }}
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <Text
              style={{
                opacity: 0.5,
                fontSize: 20,
                marginTop: Responsive.height(20),
              }}
            >
              Tap to Open
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      //</>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalDailyKCal: state.UPDATE_USERDETAIL.totalDailyKCal,
    totalWeeklyKCal: state.UPDATE_USERDETAIL.totalWeeklyKCal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogMain);
