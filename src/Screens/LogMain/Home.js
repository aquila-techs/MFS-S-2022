import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Platform,
  FlatList,
  Image,
  Dimensions,
  Alert,
  TextInput,
} from "react-native";
import { styles } from "../../Components/LogMain/LogMain/Styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ActionCreators } from "../../Actions";
import { bindActionCreators } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import { API_URL } from '../../Actions';

import IconF from "react-native-vector-icons/FontAwesome5";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import RNFetchBlob from "rn-fetch-blob";
let deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;
import Moment from "moment";
import '../../../node_modules/moment/locale/nl';
import '../../../node_modules/moment/locale/es';
import _ from "lodash";
import renderIf from "render-if";
import i18n from '../../../translation'
import Colors from "../../Theme/Colors";
// import {
//   WheelPicker,
// } from "react-native-wheel-picker-android";
import WheelPicker from 'react-native-wheely';
import Responsive from "react-native-lightweight-responsive";
import { useNavigation } from "@react-navigation/native";
import {
  DailyCaloriesBurn,
  userweightaction,
} from "../../redux/actions";
import { CommonImage } from "./CommonImage";
import { AppIcon } from "../../Assets/Images";
let cal;
const TODAYCAL = [];

function ListItemActivity({ item }) {
  return (
    <View>
      {renderIf(!item.recentActivityCheck)(
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
            style={{ width: 25, height: 25, marginRight: "3%" }}
            source={item.image}
          />
          <View style={{}}>
            <Text style={{ fontSize: 15, color: "#000" }}>{item.title}</Text>
          </View>

          <View style={{ marginRight: "10%", marginLeft: "auto" }}>
            <IconF name="angle-right" size={25} color="rgba(0,0,0,0.3)" />
          </View>
        </View>
      )}
    </View>
  );
}

function Home(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { totalcalories, Userweightdata } = useSelector(
    (state) => state.featuse
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [weightKG, setWeightKG] = useState(0);
  const [weightLB, setWeightLB] = useState(0);
  const [unit, setUnit] = useState("kg");
  const [Activitycolor, setactcolor] = useState("");
  const [todaycolor, settodaycolor] = useState("#7AD319");
  const [mealcolor, setmealcolor] = useState("");
  const [TotalCal, settotalcal] = useState(Math.ceil(props?.totalDailyKCal));
  const [Language, setLanguage] = useState(props);
  const [WHEEL, setWheel] = useState([]);
  const [minuteData, setMinuteData] = useState([
    "0 min",
    "1 min",
    "2 min",
    "3 min",
    "4 min",
    "5 min",
    "6 min",
    "7 min",
    "8 min",
    "9 min",
    "10 min",
    "11 min",
    "12 min",
    "13 min",
    "14 min",
    "15 min",
    "16 min",
    "17 min",
    "18 min",
    "19 min",
    "20 min",
    "21 min",
    "22 min",
    "23 min",
    "24 min",
    "25 min",
    "26 min",
    "27 min",
    "28 min",
    "29 min",
    "30 min",
    "31 min",
    "32 min",
    "33 min",
    "34 min",
    "35 min",
    "36 min",
    "37 min",
    "38 min",
    "39 min",
    "40 min",
    "41 min",
    "42 min",
    "43 min",
    "44 min",
    "45 min",
    "46 min",
    "47 min",
    "48 min",
    "49 min",
    "50 min",
    "51 min",
    "52 min",
    "53 min",
    "54 min",
    "55 min",
    "56 min",
    "57 min",
    "58 min",
    "59 min",
  ]);

  const [hourData, sethourData] = useState([
    `0 ${i18n.t('hour')}`,
    `1 ${i18n.t('hour')}`,
    `2 ${i18n.t('hour')}`,
    `3 ${i18n.t('hour')}`,
    `4 ${i18n.t('hour')}`,
    `5 ${i18n.t('hour')}`,
    `6 ${i18n.t('hour')}`,
    `7 ${i18n.t('hour')}`,
    `8 ${i18n.t('hour')}`,
    `9 ${i18n.t('hour')}`,
    `10 ${i18n.t('hour')}`,
    `11 ${i18n.t('hour')}`,
  ]);


  useEffect(() => { }, [TotalCal]);

  // const [locationSearch, setLocationSearch] = useState('');
  // const [temp, setTemp] = useState([]);
  // const [itemNumberShow, setitemNumberShow] = useState(0);
  const [bottomBorder1, setbottomBorder1] = useState(0);
  const [bottomBorder2, setbottomBorder2] = useState(2);
  const [bottomBorder3, setbottomBorder3] = useState(0);
  const [whichScreen, setwhichScreen] = useState(1);
  // const [selectColor, setselectColor] = useState('');
  const [multiple, setmultiple] = useState(0);
  const [loading, setloading] = useState(false);
  const [logActivity, setlogActivity] = useState([]);
  const [activityShow, setactivityShow] = useState(false);
  const [dateToday, setdateToday] = useState(
    Moment(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
    ).locale(i18n.locale == undefined ? 'nl' : i18n.locale).format("dddd") +
    ", " +
    Moment(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
    ).locale(i18n.locale == undefined ? 'nl' : i18n.locale).format("DD MMM")
  );
  const [selectedItemDay, setselectedItemDay] = useState(5);
  const [selectedItemDistanceKm, setselectedItemDistanceKm] = useState("");
  const [selectedItemDistanceMeter, setselectedItemDistanceMeter] = useState(
    ".0"
  );
  const [selectedItemDistanceUnit, setselectedItemDistanceUnit] = useState(
    "km"
  );
  const [userweight, setuserweight] = useState([]);
  const [distanceKm, setdistanceKm] = useState(0);
  const [distanceMeter, setdistanceMeter] = useState(0);
  const [distanceUnit, setdistanceUnit] = useState(0);
  const [selectedItemMinutes, setselectedItemMinutes] = useState("0 min");
  const [selectedItemHours, setselectedItemHours] = useState("");
  const [durationMinutes, setdurationMinutes] = useState(0);
  const [durationHours, setdurationHours] = useState(0);
  const [dateShow, setdateShow] = useState(false);
  const [recentcheck, setrecent] = useState(false);
  const [distanceShow, setdistanceShow] = useState(false);
  const [durationShow, setdurationShow] = useState(false);
  const [dayCheck, setdayCheck] = useState("today");
  const [isremain, setisremain] = useState(0);
  const [TODAYCARBS, setTODAYCARBS] = useState(0);
  const [TODAYPROTIEN, setTODAYPROTIEN] = useState(0);
  const [TODAYFAT, setTODAYFAT] = useState(0);
  const [SelectedDate, setSelectedDate] = useState('');


  const addDailyActivity = async (value) => {

    const date = new Date();
    const format = Moment.utc(date).format('YYYY-MM-DD')
    await AsyncStorage.setItem('type', value)

    props.getDailyActivityType(value).then((status) => {
      if (status.status) {
        setModalVisible(false);
        navigation.navigate("AddProductMeal", {
          RecipeType: value,
          dateSelected: format
        });
      }
    });
  };

  const CaloriesCounter = async (value) => {
    dispatch(DailyCaloriesBurn(value));
    try {
      settodaycolor("#7AD319"), onTabSelect(1), setmealcolor("black");
      setactcolor("black");
      setactivityShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updation = (value) => {

    const hour = Math.ceil(durationHours * 60)
    const min = Math.ceil(hour + durationMinutes)
    const cal = value * min * props.userWeight

    setActivity(cal)
    CaloriesCounter(cal);
    setactivityShow(false);
    return;
  };

  const updateLog = (title) => {

    if (selectedItemDistanceKm == "0") {
      alert("Select Distance");
    }
    else if (selectedItemHours == "0 hours" && selectedItemMinutes == "0 min") {
      alert("Select Duration");
    }
    else {
      if (title === "Aerobic Dance") {
        updation(0.136)
      } else if (title === "Basketball") {
        updation(0.213)
      } else if (title === "Bicycling (basic)") {
        updation(0.1)
      } else if (title === "Bicycling (fast)") {
        updation(0.167);
      } else if (title === "Running (basic)") {
        updation(0.134);
      } else if (title === "Running (fast)") {
        updation(0.22);
      } else if (title === "Soccer") {
        updation(0.213)
      } else if (title === "Swimming (basic)") {
        updation(0.07)
      } else if (title === "Swimming (fast)") {
        updation(0.145)
      } else if (title === "Tennis") {
        updation(0.07)
      } else if (title === "Walking (basic)") {
        updation(0.077)
      } else if (title === "Walking (speedy)") {
        updation(0.106)
      } else if (title === "Weight lifting (basic)") {
        updation(0.106)
      } else if (title === "Weight lifting (power)") {
        updation(0.047)
      } else if (title === "Others Activity") {
        updation(0.106)
      }
      else updation(0.106)
    }

  };


  useEffect(() => {
    dailyneutrions();
  }, [cal]);

  const dailyneutrions = async () => {
    TodayCalFetchCalories()
  };

  const onTabSelect = (whichDay) => {
    if (whichDay == 0) {
      {
        setbottomBorder1(2),
          setbottomBorder2(0),
          setbottomBorder3(0),
          setwhichScreen(0),
          setdayCheck("today"),
          setmultiple(false),
          setloading(true);
      }

    } else if (whichDay == 1) {
      {
        setbottomBorder1(0),
          setbottomBorder2(2),
          setbottomBorder3(0),
          setwhichScreen(1),
          setdayCheck("today"),
          setmultiple(false),
          setloading(true);
      }

    } else {
      {
        setbottomBorder1(0),
          setbottomBorder2(0),
          setbottomBorder3(2),
          setwhichScreen(2),
          setdayCheck("later"),
          setmultiple(false),
          setloading(true);
      }

    }
  };

  const actionActivity = (item) => {
    {
      setlogActivity(item), setactivityShow(true);
    }
  };

  const recentactionActivity = (item) => {
    {
      setlogActivity({
        ...item,
        title: item.name,
        image: AppIcon?.running,
        date: true,
        distance: true,
        duration: true,
        formulaValue: "",
        id: 1,
        recentActivityCheck: false,
      }),
        setactivityShow(true);
    }
  };

  const weightValidations = () => {

    if (unit == "kg") {
      if (weightKG > 200 || weightKG < 20) {
        Alert.alert(i18n.t("weightError1"));
        return false;
      } else {
        let weight = {
          unit: "kg",
          wight: weightKG,
          date: dateToday,
        };
        setuserweight([...userweight, weight]);
        submit("kg", weightKG, dateToday);
      }
    } else {
      if (weightLB > 440 || weightLB < 44) {
        Alert.alert(i18n.t("weightError2"));
        return false;
      } else {
        let h = Math.round(weightLB / 2.2046);

        let weight = {
          unit: "kg",
          wight: h,
          date: dateToday,
        };
        setuserweight([...userweight, weight]);
        submit("kg", h, dateToday);
      }
    }
  };

  useEffect(() => {
    dispatch(userweightaction(userweight));
  }, [userweight]);

  const submit = (unit, data, todayDate) => {

    const _this = this;
    const _props = props;

    fetch(`${API_URL}/user/addUserWeight`, {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': `${_props.token}`
      },
      body: JSON.stringify({
        weight: `${data} ${unit}`,
        date: Moment().format(),
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == true) {

          const updateFeatureData = {
            userWeight: parseInt(data),
            RemainActivity: _props.userdetail?.RemainActivity,
            WorkoutRemainActivity: _props.userdetail?.WorkoutRemainActivity
          };

          setloading(true);
          _props
            .setUserFeatureUpdateAction(updateFeatureData, _props.token)
            .then((status) => {
              setloading(false);
              if (status.status) {
                _props.setUpdateUserWeight(parseInt(data));
                Alert.alert('', `${i18n.t('WEIGHTUPDATE')}`);
                setWeightKG(0);
                setWeightLB(0);
              }
            });
          return;
        } else {
          alert('Something Went Wrong Please Try Again In A While!');
        }

      })
      .catch((error) => {
        alert(error);
      })

    return;

    // const _this = this;
    // const _props = props;
    let obj = {
      ..._props.userdetail,
      weight: parseInt(data),
    };

    return;
    _props.setUserDetail(obj);
    _props.setWeightAction(parseInt(data)).then((status) => {
      // console.log(" setWeightAction gender : ", status, data);
      if (status?.status) {
        const updateFeatureData = {
          userGender: _props.userGender,
          userAge: _props.userAge,
          userHeight: _props.userWeight,
          userWeight: parseInt(data),
          activityLevel: _props.activityLevel,
          EBF: _props.EBF,
        };

        setloading(true);
        //alert("Submit setWeightAction : "+JSON.stringify(status))
        _props
          .setUserFeatureUpdateAction(updateFeatureData, _props.token)
          .then((status) => {
            //alert(JSON.stringify(status.status))
            //  alert(status.status+" setUserFeatureUpdateAction "+data+" bbb")
            setloading(false);
            if (status.status) {
              _props.setUpdateUserWeight(parseInt(data));
              alert("Weight Update!");
              setWeightKG(0);
              setWeightLB(0);
            }
          });
      }
    });
  };

  useEffect(() => {
    settotalcal(Math.ceil(props?.totalDailyKCal) + totalcalories);
    setisremain(Math.ceil(props?.totalDailyKCal) + totalcalories)
    Checklanguage();


  }, [totalcalories]);

  const Checklanguage = async () => {
    const MYDATE = new Date();
    setWheel([

      i18n.t('Monday') +
      ", " +
      Moment(MYDATE).startOf('week').weekday(0).format("DD MMM"),

      i18n.t('Tuesday') +
      ", " +
      Moment(MYDATE).startOf('week').weekday(1).format("DD MMM"),

      i18n.t('Wednesday') +
      ", " +
      Moment(MYDATE).startOf('week').weekday(2).format("DD MMM"),

      i18n.t('Thursday') +
      ", " +
      Moment(MYDATE).startOf('week').weekday(3).format("DD MMM"),

      i18n.t('Friday') +
      ", " +
      Moment(MYDATE).startOf('week').weekday(4).format("DD MMM"),

      i18n.t('Saturday') +
      ", " +
      Moment(MYDATE).startOf('week').weekday(5).format("DD MMM"),

      i18n.t('Sunday') +
      ", " +
      Moment(MYDATE).startOf('week').weekday(6).format("DD MMM"),

    ])
    setLanguage(i18n.locale == undefined ? 'nl' : i18n.locale)
  }


  const TodayCalFetchCalories = async () => {

    const saveDate = Moment().format('YYYY-MM-DD');

    const data = {
      date: saveDate
    }
    await RNFetchBlob.fetch(
      'POST',
      API_URL + '/user/activity/recipe/getAll/related/to/user',
      {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'auth-token': props.token,
      },
      JSON.stringify(data),
    ).then(res => {

      const data = JSON.parse(res.data);

      var list = data?.data;
      let ft = 0, pt = 0, cr = 0;
      let calories = 0 - props.totalcalories
      if (list) {
        list?.map(item => {
          calories = item?.calories + calories,
            ft = ft + item?.fats,
            cr = cr + item?.carbs
          pt = pt + item?.proteins
        })
      }

      TODAYCAL.push({
        crb: Math.ceil(cr),
        frt: Math.ceil(ft),
        prt: Math.ceil(pt),
        carbs: Math.ceil(cr),
        protien: Math.ceil(pt),
        fat: Math.ceil(ft),
      })

      setTODAYCARBS(Math.ceil(cr))
      setTODAYPROTIEN(Math.ceil(pt))
      setTODAYFAT(Math.ceil(ft))

    });


  }


  const userUpdateDataSubmit = async () => {

    try {

      let WorkoutRemainActivity = await AsyncStorage.getItem('WorkoutRemainActivity')

      const w1 = WorkoutRemainActivity;
      const w2 = props?.userdetail?.RemainActivity
      let total = parseInt(w1) + parseInt(w2)

      // if (total == props?.userdetail?.WorkQuantity) {
      //   alert(i18n.t('WorkoutLimit'));
      //   return;
      // } else {

      const RemainActivity = (props?.userdetail?.RemainActivity ?? 0) + 1

      setloading(true)
      const userData = {
        RemainActivity: RemainActivity,
        WorkoutRemainActivity: WorkoutRemainActivity
      }

      const _props = props;
      _props
        .setUserFeatureUpdateAction(userData, _props.token)
        .then(status => {
          setValue()
          updateLog(logActivity?.title)
        })
      // }
    } catch (error) {
      alert(JSON.stringify(error))
    }

  }

  const setValue = async () => {
    await AsyncStorage.setItem('RemainActivity', RemainActivity)
  }

  const setActivity = async (cal) => {

    fetch(`${API_URL}/user/workout/createActivity`, {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': `${props.token}`
      },
      body: JSON.stringify({
        activity: logActivity?.title,
        Cal: cal,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        setloading(false)
        Alert.alert(`${i18n.t('Greatjob')}`, `${i18n.t('Greatjobdes')}`)
      })
      .catch((error) => {
        alert(error);
      })
  }

  const DATAActivity = [
    {
      id: 1,
      title: i18n.t('Aerobic'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/icon1.png"),
    },
    {
      id: 2,
      title: i18n.t('Basketball'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/basketball.png"),
    },
    {
      id: 3,
      title: i18n.t('Bicycling'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/icon3.png"),
    },
    {
      id: 4,
      title: i18n.t('BicyclingFast'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/icon3.png"),
    },
    {
      id: 5,
      title: i18n.t('Run'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/runner.png"),
    },
    {
      id: 6,
      title: i18n.t('RunFast'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/runner.png"),
    },
    {
      id: 7,
      title: i18n.t('Soccer'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/soccer.png"),
    },
    {
      id: 8,
      title: i18n.t('Swim'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/icon4.png"),
    },
    {
      id: 9,
      title: i18n.t('SwimFast'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/icon4.png"),
    },
    {
      id: 10,
      title: i18n.t('Tennis'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/tennis.png"),
    },
    {
      id: 11,
      title: i18n.t('Walk'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/icon2.png"),
    },
    {
      id: 12,
      title: i18n.t('WalkFast'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/icon2.png"),
    },
    {
      id: 13,
      title: i18n.t('Weigh'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/weight.png"),
    },
    {
      id: 14,
      title: i18n.t('WeighPower'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/weight.png"),
    },
    {
      id: 15,
      title: i18n.t('OthersActivity'),
      formulaValue: "",
      recentActivityCheck: false,
      date: true,
      distance: true,
      duration: true,
      image: require("../../Assets/Today/others.png"),
    },
  ];

  return (
    <>
      <TouchableOpacity onPress={() => {
        setModalVisible(true);
      }} style={styles.buttonStyle}>
        <Image
          style={{
            height: hp(7),
            width: wp(19), alignItems: 'center', justifyContent: 'center'
          }}
          source={require("../../Assets/Images/addIcon.png")}
        />
      </TouchableOpacity>

      <View
        style={{
          alignSelf: "center",
          backgroundColor: "red",
        }}
      >
        <Modal
          style={{
            // backgroundColor: 'blue',
            width: "100%",
            height: "100%",
            alignSelf: "center",
            position: "absolute",
            top: 0,
          }}
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          {renderIf(!activityShow)(
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
                      navigation.navigate('HomeMain')
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      style={{
                        opacity: 0.5,
                        fontSize: 10,
                        marginTop: Responsive.height(10),
                      }}
                    >
                      {i18n.t('Tapclose')}
                    </Text>
                  </TouchableOpacity>

                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        shadowOpacity: Platform.OS === "android" ? 0.5 : 0,
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
                            fontWeight: "700",
                            fontFamily: "helvetica",
                            fontSize: Responsive.height(16),
                            color: "#000",
                          }}
                        >
                          {i18n.t('Log')}
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
                        borderBottomWidth: bottomBorder1,
                        width: '33%',
                      },
                    ]}
                    onPress={() => {
                      setactcolor("#7AD319"), onTabSelect(0);
                      setmealcolor("black");
                      settodaycolor("black");
                    }}
                  >
                    <Text
                      style={[styles.tabText, { color: Activitycolor }]}
                    //  ref={component => this._textInput1 = component}
                    >
                      {i18n.t('ACTIVITY')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.tabTextWrapper,
                      {
                        borderBottomWidth: bottomBorder2,
                        width: '33%'
                      },
                    ]}
                    onPress={() => {
                      settodaycolor("#7AD319"),
                        onTabSelect(1),
                        setmealcolor("black");
                      setactcolor("black");
                    }}
                  >
                    <Text
                      style={[styles.tabText, { color: todaycolor }]}
                    >
                      {i18n.t('TODAY')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tabTextWrapper,
                      {
                        borderBottomWidth: bottomBorder3,
                        width: '33%',
                      },
                    ]}
                    onPress={() => {
                      onTabSelect(2),
                        settodaycolor("black"),
                        setactcolor("black");
                      setmealcolor("#7AD319");
                    }}
                  >
                    <Text
                      style={[styles.tabText, { color: mealcolor }]}
                    //  ref={component => this._textInput3 = component}
                    >
                      {i18n.t('MEAL')}
                    </Text>
                  </TouchableOpacity>
                </View>

                {renderIf(whichScreen == 0)(
                  <ScrollView>
                    <View
                      style={{
                        backgroundColor: "#ffffff",
                        marginBottom: Responsive.height(10),
                        flexDirection: "column",
                      }}
                    >

                      {/* <Text
                      style={{
                        color: Colors.green,
                        margin: "3%",
                        fontSize: 14,
                      }}
                    >
                      {i18n.t('RecentActivity')}
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
                            borderWidth: 0.3,
                            opacity: 0.1,
                            alignSelf: "center",
                          }}
                        />
                      )}
                      data={props.activities}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => recentactionActivity(item)}
                        >
                          <ListItemRecentActivity item={item} />
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item, index) => item + index.toString()}
                    /> */}

                      <Text
                        style={{
                          color: Colors.green,
                          margin: "3%",
                          fontSize: 14,
                        }}
                      >
                        {i18n.t("activityQuestion")}?
                      </Text>

                      <FlatList
                        initialNumToRender={20}
                        style={{
                          marginTop: Responsive.height(5),
                          marginBottom: Responsive.height(5),
                        }}
                        ItemSeparatorComponent={() => (
                          <View
                            style={{
                              width: "100%",
                              borderColor: "#707070",
                              borderWidth: 0.3,
                              opacity: 0.1,
                              alignSelf: "center",
                            }}
                          />
                        )}
                        data={DATAActivity}
                        renderItem={({ item }) => (
                          <TouchableOpacity onPress={() => actionActivity(item)}>
                            <ListItemActivity item={item} />
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => item + index.toString()}
                      // showsVerticalScrollIndicator={false}

                      />


                    </View>
                  </ScrollView>
                )}

                {renderIf(whichScreen == 1)(
                  <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>
                    <View
                      style={{
                        backgroundColor: Colors.green,
                        height: "40%",
                        width: "100%",
                        borderBottomLeftRadius: 100,
                        borderBottomRightRadius: 100,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>

                        <View style={{ width: '33%', margin: "3%" }}>
                          <View
                            style={{
                              borderBottomColor: "rgba(256,256,256,0.7)",
                              borderBottomWidth: 1,
                              paddingHorizontal: 10,
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Text
                              style={{
                                color: "rgba(256,256,256,1.0)",
                                fontSize: 13,
                                fontWeight: "600",
                                borderBottomColor: "rgba(256,256,256,1.0)",
                                borderBottomWidth: 1,
                              }}
                            >
                              {i18n.t('CARBS').toUpperCase()}
                            </Text>
                          </View>
                          <Text
                            style={{
                              color: "rgba(256,256,256,0.7)",
                              paddingTop: 5,
                              fontSize: 11,
                              alignSelf: "center",
                            }}
                          >
                            {TODAYCARBS} g
                          </Text>
                        </View>

                        <View
                          style={{
                            margin: "3%",
                            width: '25%',
                          }}
                        >
                          <View
                            style={{
                              borderBottomColor: "rgba(256,256,256,0.7)",
                              borderBottomWidth: 1,
                              paddingHorizontal: 10,
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Text
                              style={{
                                color: "rgba(256,256,256,1.0)",
                                fontSize: 13,
                                fontWeight: "600",
                                borderBottomColor: "rgba(256,256,256,1.0)",
                                borderBottomWidth: 1,
                              }}
                            >
                              {i18n.t('PROTEIN')}
                            </Text>
                          </View>
                          <Text
                            style={{
                              color: "rgba(256,256,256,0.7)",
                              paddingTop: 5,
                              fontSize: 11,
                              alignSelf: "center",
                            }}
                          >
                            {TODAYPROTIEN} g
                            {/* {Math.round(props.totalWeeklyKCal).toFixed(2)}KCAL */}
                          </Text>
                        </View>

                        <View
                          style={{
                            margin: "3%",
                            width: '25%',
                          }}
                        >
                          <View
                            style={{
                              borderBottomColor: "rgba(256,256,256,0.7)",
                              borderBottomWidth: 1,
                              paddingHorizontal: 0,
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Text
                              style={{
                                color: "rgba(256,256,256,1.0)",
                                fontSize: 13,
                                fontWeight: "600",
                                borderBottomColor: "rgba(256,256,256,1.0)",
                                borderBottomWidth: 1,
                              }}
                            >
                              {i18n.t('FAT')}
                            </Text>
                          </View>
                          <Text
                            style={{
                              color: "rgba(256,256,256,0.7)",
                              paddingTop: 5,
                              fontSize: 11,
                              alignSelf: "center",
                            }}
                          >
                            {TODAYFAT} g
                            {/* {Math.round(props.totalWeeklyKCal).toFixed(2)}KCAL */}
                          </Text>
                        </View>


                      </View>
                      <View style={{ flexDirection: "row", alignSelf: 'center' }}>
                        <View
                          style={{
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
                              borderColor: "rgba(256,256,256,0.3)",
                              borderWidth: 3,
                              width: 130,
                              height: Platform.OS === "android" ? "90%" : 130,
                              borderRadius: 130 / 2,
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

                              {/* {isNaN(isremain) ? 0 : isremain} */}
                              <Text numberOfLines={1} style={{ fontSize: 18, }}>{props?.userdetail?.WorkQuantity - props?.userdetail?.RemainActivity ?? "00"}</Text> / {props?.userdetail?.WorkQuantity ?? "00"}
                            </Text>
                            <Text
                              style={{
                                color: "rgba(256,256,256,0.9)",
                                fontSize: 12,
                                top: 5,
                                textAlign: "center",
                              }}
                            >
                              {i18n.t('Workouts')}
                            </Text>
                          </View>
                        </View>

                      </View>


                    </View>

                    <View
                      style={{
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        marginTop: Responsive.height(10),
                      }}
                    >
                      <View style={styles.goal1}>
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 20,
                            marginBottom: 5,
                          }}
                        >
                          {i18n.t("weightToday")}?
                        </Text>
                      </View>

                      {renderIf(unit == "kg")(
                        <View style={{ flexDirection: "row", margin: 5 }}>
                          <TextInput
                            value={weightKG}
                            onChangeText={(text) => {
                              setWeightKG(text);
                            }}
                            placeholder="00"
                            // placeholderTextColor="#000"
                            maxLength={3}
                            placeholderTextColor="#9E9F9D"
                            underlineColorAndroid="transparent"
                            style={styles.heightTextInputStyle}
                            keyboardType={"numeric"}
                          />
                          <Text style={styles.headerSideText}>KG</Text>
                        </View>
                      )}
                      {renderIf(unit == "lb")(
                        <View style={{ flexDirection: "row", margin: 5 }}>
                          <TextInput
                            value={weightLB}
                            onChangeText={(text) => {
                              setWeightLB(text);
                            }}
                            placeholder="000"
                            //  placeholderTextColor="#000"
                            placeholderTextColor="#9E9F9D"
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
                            setUnit("kg");
                          }}
                          style={[
                            styles.heightbuttons,
                            styles.borderRadiusLeft,
                            unit == "kg" ? styles.selectedbutton : {},
                          ]}
                        >
                          <Text
                            style={{ color: unit == "kg" ? "#000" : "#999" }}
                          >
                            KG
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setUnit("lb");
                          }}
                          style={[
                            styles.heightbuttons,
                            styles.borderRadiusRight,
                            unit == "lb" ? styles.selectedbutton : {},
                          ]}
                        >
                          <Text
                            style={{ color: unit == "lb" ? "#000" : "#999" }}
                          >
                            LB
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginTop: "5%", width: "100%" }}>
                        <TouchableOpacity
                          onPress={() => weightValidations()}
                          style={{
                            marginBottom: 20,
                            height: 50,
                            width: 150,
                            // borderColor: '#B76EC6',
                            // borderWidth: 1,
                            backgroundColor: Colors.green,
                            alignItems: "center",
                            alignContent: "center",
                            alignSelf: "center",
                            justifyContent: "center",
                            borderRadius: 5,
                          }}
                        >
                          <Text style={{ color: "#fff" }}>{i18n.t('UpdateWeight')}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                )}

                {renderIf(whichScreen == 2)(
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: "#ffffff",
                      flex: 1,
                      marginTop: "10%",
                      flexDirection: "column",
                    }}
                  >
                    <View style={styles.todayTrackingView}>
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {/* {renderIf(!this.state.breakfastCheck)( */}
                        <TouchableOpacity
                          style={styles.gender}
                          onPress={() => addDailyActivity("breakfast")}
                        >
                          <ImageBackground
                            resizeMode={"cover"}
                            source={require("./../../Assets/Today/breakfastBackgroundNew.png")}
                            imageStyle={{ borderRadius: 13 }}
                            style={{
                              width: "100%",
                              height: Responsive.height(100),
                            }}
                          >
                            <View style={{}}>
                              {/* <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
                              <Image
                                source={require("./../../Assets/Today/plusIcon.png")}
                                style={{
                                  width: Responsive.height(50),
                                  height: Responsive.height(50),
                                }}
                              />
                                <Text
                                  style={{
                                    color: "#fff",
                                    width:wp(20),
                                    height:hp(3),
                                    fontSize: hp("2.1%"),
                                    textAlign:'center',
                                    fontWeight: "600",
                                  }}
                                >
                                  {200} kcal
                                </Text>
                              </View> */}
                              <CommonImage calories={props?.breakfastData ?? 0} />
                              <View style={{ marginLeft: "10%" }}>
                                <Text
                                  style={{
                                    color: "#fff",
                                    fontSize: hp("2.1%"),
                                    fontWeight: "600",
                                  }}
                                >
                                  {i18n.t('BREAKFAST')}
                                </Text>
                                {/* <Text
                                  style={{
                                    fontSize: hp("1.1%"),
                                    color: "#fff",
                                  }}
                                >
                                  Didn't find the items in previous lists? No
                                  problem
                                </Text> */}
                              </View>
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.gender}
                          onPress={() => addDailyActivity("lunch")}
                        >
                          <ImageBackground
                            resizeMode={"cover"}
                            imageStyle={{ borderRadius: 10 }}
                            source={require("./../../Assets/Today/lunchBackgroundNew.png")}
                            style={{
                              width: "100%",
                              height: Responsive.height(100),
                            }}
                          >
                            <CommonImage calories={props.lunchData ?? 0} />
                            {/* <Image
                              source={require("./../../Assets/Today/plusIcon.png")}
                              style={{
                                width: Responsive.height(50),
                                height: Responsive.height(50),
                              }}
                            /> */}
                            <View style={{ marginLeft: "10%" }}>
                              <Text
                                style={{
                                  color: "#fff",
                                  fontSize: hp("2.1%"),
                                  fontWeight: "600",
                                }}
                              >
                                {i18n.t('LUNCH')}
                              </Text>
                              {/* <Text
                                style={{ fontSize: hp("1.1%"), color: "#fff" }}
                              >
                                Didn't find the items in previous lists? No
                                problem
                              </Text> */}
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center",
                          alignSelf: "center",
                        }}
                      >
                        {/* {renderIf(!this.state.dinnerCheck)( */}
                        <TouchableOpacity
                          style={styles.gender}
                          onPress={() => addDailyActivity("dinner")}
                        >
                          <ImageBackground
                            resizeMode={"cover"}
                            source={require("./../../Assets/Today/dinnerBackgroundNew.png")}
                            imageStyle={{ borderRadius: 10 }}
                            style={{
                              width: "100%",
                              height: Responsive.height(100),
                            }}
                          >
                            <CommonImage calories={props.dinnerData ?? 0} />
                            {/* <Image
                              source={require("./../../Assets/Today/plusIcon.png")}
                              style={{
                                width: Responsive.height(50),
                                height: Responsive.height(50),
                              }}
                            /> */}
                            <View style={{ marginLeft: "10%" }}>
                              <Text
                                style={{
                                  color: "#fff",
                                  fontSize: hp("2.1%"),
                                  fontWeight: "600",
                                }}
                              >
                                {i18n.t('DINNER')}
                              </Text>
                              {/* <Text
                                style={{ fontSize: hp("1.1%"), color: "#fff" }}
                              >
                                Didn't find the items in previous lists? No
                                problem
                              </Text> */}
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.gender}
                          onPress={() => addDailyActivity("snack")}
                        >
                          <ImageBackground
                            resizeMode={"cover"}
                            imageStyle={{ borderRadius: 10 }}
                            source={require("./../../Assets/Today/snackBackgroundNew.png")}
                            style={{
                              width: "100%",
                              height: Responsive.height(100),
                            }}
                          >
                            <CommonImage calories={props.snackData ?? 0} />
                            {/* <Image
                              source={require("./../../Assets/Today/plusIcon.png")}
                              style={{
                                width: Responsive.height(50),
                                height: Responsive.height(50),
                              }}
                            /> */}
                            <View style={{ marginLeft: "10%" }}>
                              <Text
                                style={{
                                  color: "#fff",
                                  fontSize: hp("2.1%"),
                                  fontWeight: "600",
                                }}
                              >
                                {i18n.t('SNACKS')}
                              </Text>
                              {/* <Text
                                style={{ fontSize: hp("1.1%"), color: "#fff" }}
                              >
                                Didn't find the items in previous lists? No
                                problem
                              </Text> */}
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}

          {renderIf(activityShow)(
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
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      style={{
                        opacity: 0.5,
                        fontSize: 10,
                        marginTop: Responsive.height(10),
                      }}
                    >
                      {i18n.t('Tapclose')}
                      {" "}
                    </Text>
                  </TouchableOpacity>

                  {/* <WheelPicker
                      selectedIndex={selectedIndex}
                      options={WHEEL}
                      onChange={(index) => setSelectedIndex(index)}
                    /> */}

                  <ScrollView showsVerticalScrollIndicator={false}>

                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        shadowOpacity: Platform.OS === "ios" ? 0.05 : 0.5,
                        borderBottomWidth: Platform.OS === "ios" ? 0.2 : 0.5,
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
                          onPress={() => setactivityShow(false)}
                        >
                          <Text
                            style={{
                              opacity: 0.5,
                              marginTop: Responsive.height(10),
                            }}
                          >
                            {i18n.t('Back')}
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: "helvetica",
                            fontSize: Responsive.height(12),
                            color: "#000",
                          }}
                        >
                          {logActivity?.title}
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
                        style={{
                          marginTop: "5%",
                          width: Responsive.width(100),
                          height: Responsive.height(100),
                        }}
                        source={logActivity?.image}
                      />
                      <Text
                        style={{
                          opacity: 0.5,
                          marginRight: "auto",
                          marginTop: "auto",
                          marginBottom: "2%",
                          marginLeft: "7%",
                          fontSize: hp("1.6%"),
                        }}
                      >
                        {i18n.t('howdid')}
                      </Text>
                    </View>

                    {renderIf(!dateShow)(
                      <TouchableOpacity
                        onPress={() => {
                          setdateShow(true),
                            setdistanceShow(false),
                            setdurationShow(false);
                        }}
                        style={{
                          height: Responsive.height(35),
                          width: "100%",
                          borderBottomColor: "rgba(0,0,0,0.1)",
                          marginTop: Responsive.height(15),
                          borderBottomWidth: 0.5,
                        }}
                      >
                        <View style={{ flexDirection: "row", marginTop: "2%" }}>
                          <View style={{ marginLeft: "7%" }}>
                            <Text style={{ fontSize: 15, color: "#000" }}>
                              {i18n.t('Date')}
                            </Text>
                          </View>

                          <View
                            style={{ marginRight: "7%", marginLeft: "auto" }}
                          >
                            <Text
                              style={{
                                fontSize: 15,
                                color: "#000",
                                opacity: 0.5,
                              }}
                            >
                              {dateToday}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}

                    {renderIf(dateShow)(
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
                            setdateShow(false);
                          }}
                          style={{
                            flexDirection: "row",
                            marginTop: "2%",
                            borderBottomColor: "rgba(0,0,0,0.1)",
                            borderBottomWidth: 0.5,
                            height: Responsive.height(30),
                          }}
                        >
                          <View style={{ marginLeft: "7%" }}>
                            <Text style={{ fontSize: 15, color: "#000" }}>
                              {i18n.t('Date')}
                            </Text>
                          </View>

                          <View
                            style={{ marginRight: "7%", marginLeft: "auto" }}
                          >
                            <Text
                              style={{
                                fontSize: 15,
                                color: "#000",
                                opacity: 0.5,
                              }}
                            >
                              {dateToday}
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
                            selectedIndex={selectedItemDay}
                            options={WHEEL}
                            onChange={(index) => {
                              setdateToday(WHEEL[index]),
                                setselectedItemDay(index);
                            }}
                          />
                          {/* <WheelPicker
                            selectedItem={selectedItemDay}
                            data={WHEEL}
                            onItemSelected={(index) => {
                              setdateToday(WHEEL[index]),
                                setselectedItemDay(index);
                            }}
                          /> */}
                        </View>
                      </View>
                    )}

                    {renderIf(!durationShow)(
                      <TouchableOpacity
                        onPress={() => {
                          setdateShow(false),
                            setdistanceShow(false),
                            setdurationShow(true);
                        }}
                        style={{
                          height: Responsive.height(35),
                          width: "100%",
                          borderBottomColor: "rgba(0,0,0,0.1)",
                          borderBottomWidth: 0.5,
                        }}
                      >
                        <View style={{ flexDirection: "row", marginTop: "2%" }}>
                          <View style={{ marginLeft: "7%" }}>
                            <Text style={{ fontSize: 15, color: "#000" }}>
                              {i18n.t('Duration')}
                            </Text>
                          </View>

                          <View
                            style={{ marginRight: "7%", marginLeft: "auto" }}
                          >
                            <Text
                              style={{
                                fontSize: 15,
                                color: "#000",
                                opacity: 0.5,
                              }}
                            >
                              {selectedItemHours},{selectedItemMinutes}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}

                    {renderIf(durationShow)(
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
                            setdurationShow(false);
                          }}
                          style={{
                            flexDirection: "row",
                            marginTop: "2%",
                            borderBottomColor: "rgba(0,0,0,0.1)",
                            borderBottomWidth: 0.5,
                            height: Responsive.height(30),
                          }}
                        >
                          <View style={{ marginLeft: "7%" }}>
                            <Text style={{ fontSize: 15, color: "#000" }}>
                              {i18n.t('Duration')}
                            </Text>
                          </View>

                          <View
                            style={{ marginRight: "7%", marginLeft: "auto" }}
                          >
                            <Text
                              style={{
                                fontSize: 15,
                                color: "#000",
                                opacity: 0.5,
                              }}
                            >
                              {selectedItemHours},{selectedItemMinutes}
                            </Text>
                          </View>
                        </TouchableOpacity>


                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignContent: "center",
                            alignSelf: "center",
                            width: '80%'
                          }}
                        >
                          <WheelPicker
                            selectedIndex={durationHours}
                            options={hourData}
                            onChange={(index) => {
                              setselectedItemHours(hourData[index]),
                                setdurationHours(index);
                            }}
                          />
                          <WheelPicker
                            selectedIndex={durationMinutes}
                            options={minuteData}
                            onChange={(index) => {
                              setselectedItemMinutes(minuteData[index]),
                                setdurationMinutes(index);
                            }}
                          />
                          {/* <WheelPicker
                            selectedItem={durationHours}
                            data={hourData}
                            onItemSelected={(index) => {
                              setselectedItemHours(hourData[index]),
                                setdurationHours(index);
                            }}
                          /> */}

                          {/* <WheelPicker
                            selectedItem={durationMinutes}
                            data={minuteData}
                            onItemSelected={(index) => {
                              setselectedItemMinutes(minuteData[index]),
                                setdurationMinutes(index);
                            }}
                          /> */}
                        </View>
                      </View>
                    )}

                    <View style={{ marginTop: "20%", width: "100%" }}>
                      <TouchableOpacity
                        onPress={() => {
                          userUpdateDataSubmit()
                          // updateLog(logActivity?.title)
                        }}
                        style={{
                          marginBottom: 20,
                          height: Responsive.height(30),
                          width: "60%",
                          // borderColor: '#B76EC6',
                          // borderWidth: 1,
                          backgroundColor: Colors.green,
                          alignItems: "center",
                          alignContent: "center",
                          alignSelf: "center",
                          justifyContent: "center",
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ color: "#fff", fontWeight: "600" }}>
                          {i18n.t('AddActivity')}
                        </Text>
                      </TouchableOpacity>
                    </View>

                  </ScrollView>
                </View>
              </View>
            </View>
          )}
        </Modal>
      </View>
    </>
  );
}

// export default Home;
function mapStateToProps(state) {
  return {
    sessionKey: state.SESSION_KEY.sessionKey,
    userData: state.USER_DATA.user,
    routeName: state.ROUTE_NAME.routeName,
    // totalDailyKCal: state.UPDATE_USER_TOTALDAILYKCAL.updateUserTotalDailyKcal,
    totalWeeklyKCal:
      state.UPDATE_USER_TOTALWEEKLYKCAL.updateUserTotalWeeklyKcal,
    token: state.SESSION_KEY.sessionKey,
    userGender: state.UPDATE_GENDER.updateGender,
    userAge: state.UPDATE_USER_AGE.updateUserAge,
    userHeight: state.UPDATE_USER_HEIGHT.updateUserHeight,
    userWeight: state.UPDATE_USER_WEIGHT.updateUserWeight,
    activityLevel: state.UPDATE_USERDETAIL.activityLevel,
    EBF: state.UPDATE_USER_EBF.updateUserEBF,
    userdetail: state.UPDATE_USERDETAIL.userdetail,
    activities: state.UPDATE_USER_ACTIVITIES.updateUserTotalActivities,
    breakfastData: state.BREAKFAST_CALORIES.breakfastData,
    lunchData: state.LUNCH_CALORIES.lunchData,
    dinnerData: state.DINNER_CALORIES.dinnerData,
    snackData: state.SNACK_CALORIES.snackData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

// export default Home;



