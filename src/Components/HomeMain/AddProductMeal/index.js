/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Platform,
  ActivityIndicator,
  Image,
  StatusBar,
  ScrollView
} from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Styles';
import { API_URL } from '../../../Actions';
import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CalendarStrip from 'react-native-calendar-strip';
import Colors from "../../../Theme/Colors";
import IconA from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'rn-fetch-blob';
import LottieView from 'lottie-react-native';
import _ from 'lodash';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import i18n from '../../../../translation'
import { Progress } from './Progress';
import { AddProduct } from './AddProduct';

let CRB = 0
let PRT = 0
let Fat = 0
let Tot = 0
let today = ''
var TodayDate = moment().format('YYYY-MM-DD');
let datesBlacklist = [
  {
    start: moment()?.subtract(1, 'week'),
    end: moment()?.subtract(1, 'day'),
  },
];
class AddProductMeal extends Component {
  constructor(props) {
    super(props);
    const timeElapsed = Date.now();
    today = new Date(timeElapsed);
    this.state = {
      name: '',
      loader: false,
      response: '',
      item: '',
      carbs: '',
      protein: '',
      refreshing: false,
      fats: '',
      mssg: "",
      todaydata: new Date(timeElapsed).toDateString(),
      token: props.token,
      breakfastCheck: false,
      lunchCheck: false,
      dinnerCheck: false,
      snackCheck: false,
      Responsedata: [],
      forcerender: true,
      breakfastDailyActivity: [],
      lunchDailyActivity: [],
      dinnerDailyActivity: [],
      snackDailyActivity: [],
      rendercon: true,
      isCalendar: false,
      breakfastImage: '',
      lunchImage: '',
      dinnerImage: '',
      snackImage: '',
      Recipedata: [
        {
          catigoryname: 'Add Meal',
          Description: 'Meal should be like that.Meal should be like that',
          carbs: '',
          protein: '',
          fats: '',
        },
      ],
      //custom
      customBreakfastCheck: false,
      customLunchCheck: false,
      customDinnerCheck: false,
      customSnackCheck: false,

      customBreakfastDailyResponse: [],
      customLunchDailyResponse: [],
      customDinnerDailyResponse: [],
      customSnackDailyResponse: [],

      activity: [],
      activityCheck: false,
      customResponses: [],
      productActivityChecks: false,
      Engchecked: false,
      productResponses: [],
      productData: [],
      dateSelected: this.props?.route?.params?.dateSelected,
    };
    setTimeout(() => {
      this.setState({
        forcerender: false
      })
    }, 500);
  }
  async componentDidMount() {

    await AsyncStorage.setItem('DATESELECTED', this.state.dateSelected)

    this.submit3()
    setTimeout(() => {
      this.setState({ isCalendar: true })
    }, 3000);

    const { navigation } = this.props
    this.unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        this.setState({ isCalendar: true })
      }, 3000);
      this.submit3()
      this._onRefresh()
    });
    await AsyncStorage.setItem('todaydate', TodayDate)
    if (this.props?.languageget === 'en') {
      this.setState({
        Engchecked: true
      })
    } else {
      this.setState({
        Engchecked: false
      })
    }
  }


  async submit3() {

    const typedata = await AsyncStorage.getItem('type')
    const DATESELECTED = await AsyncStorage.getItem('DATESELECTED')

    this.setState(
      {
        loader: true,
        refreshing: false,
      },
      async () => {
        const data = {
          date: DATESELECTED
        }
        await RNFetchBlob.fetch(
          'POST',
          API_URL + '/user/activity/recipe/getAll/related/to/user',
          {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'auth-token': this.props.token,
          },
          JSON.stringify(data),
        ).then(res => {
          const data = JSON.parse(res.data);

          this.setState({
            loader: false
          })
          if (data?.success === true) {
            if (typedata === 'breakfast') {
              var list = data?.data;
              var breakfastArray = list?.filter(
                addedItem => addedItem.type === 'breakfast',
              );

              this.setState({
                Responsedata: breakfastArray,
              });
            } else if (typedata === 'snack') {
              var list = data?.data;
              var snack = list.filter(addedItem => addedItem.type === 'snack');
              this.setState({
                Responsedata: snack,
              });
            } else if (typedata === 'dinner') {
              var list = data?.data;
              var dinner = list.filter(
                addedItem => addedItem.type === 'dinner',
              );
              this.setState({
                Responsedata: dinner,
              });
            } else if (typedata === 'lunch') {
              var list = data?.data;
              var lunch = list.filter(addedItem => addedItem.type === 'lunch');
              this.setState({
                Responsedata: lunch,
              });
            }

          }

          if (data?.status === false) {
            this.setState({
              Responsedata: [],
            });
          }
        });
      },
    );
  }

  async submit2() {
    const typedata = await AsyncStorage.getItem('type')
    this.setState(
      {
        loader: true,
        refreshing: false,
      },
      async () => {
        const data = {
          date: TodayDate
        }
        await RNFetchBlob.fetch(
          'POST',
          API_URL + '/user/activity/recipe/getAll/related/to/user',
          {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'auth-token': this.props.token,
          },
          JSON.stringify(data),
        ).then(res => {
          const data = JSON.parse(res.data);

          this.setState({
            loader: false
          })
          if (data?.success === true) {
            if (typedata === 'breakfast') {
              var list = data?.data;
              var breakfastArray = list?.filter(
                addedItem => addedItem.type === 'breakfast',
              );
              this.setState({
                Responsedata: breakfastArray,
              });
            } else if (typedata === 'snack') {
              var list = data?.data;
              var snack = list.filter(addedItem => addedItem.type === 'snack');
              this.setState({
                Responsedata: snack,
              });
            } else if (typedata === 'dinner') {
              var list = data?.data;
              var dinner = list.filter(
                addedItem => addedItem.type === 'dinner',
              );
              this.setState({
                Responsedata: dinner,
              });
            } else if (typedata === 'lunch') {
              var list = data?.data;
              var lunch = list.filter(addedItem => addedItem.type === 'lunch');
              this.setState({
                Responsedata: lunch,
              });
            }
          }
        });
      },
    );
  }

  async submit() {
    const typedata = await AsyncStorage.getItem('type')
    this.setState(
      {
        loader: true,
        refreshing: false,
      },
      async () => {
        const data = {
          date: this.state.dateSelected == '' ? moment().format('YYYY-MM-DD') : moment(this.state.dateSelected).format('YYYY-MM-DD')
        }
        await RNFetchBlob.fetch(
          'POST',
          API_URL + '/user/activity/recipe/getAll/related/to/user',
          {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'auth-token': this.props.token,
          },
          JSON.stringify(data),
        ).then(res => {
          const data = JSON.parse(res.data);

          // alert(JSON.stringify(data))

          this.setState({
            loader: false
          })
          if (data?.success === true) {
            if (typedata === 'breakfast') {
              var list = data?.data;
              var breakfastArray = list?.filter(
                addedItem => addedItem.type === 'breakfast',
              );
              this.setState({
                Responsedata: breakfastArray,
              });
            } else if (typedata === 'snack') {
              var list = data?.data;
              var snack = list.filter(addedItem => addedItem.type === 'snack');
              this.setState({
                Responsedata: snack,
              });
            } else if (typedata === 'dinner') {
              var list = data?.data;
              var dinner = list.filter(
                addedItem => addedItem.type === 'dinner',
              );
              this.setState({
                Responsedata: dinner,
              });
            } else if (typedata === 'lunch') {
              var list = data?.data;
              var lunch = list.filter(addedItem => addedItem.type === 'lunch');
              this.setState({
                Responsedata: lunch,
              });
            }
          }

          if (data?.status === false) {
            this.setState({
              Responsedata: [],
            });
          }

        });
      },
    );
  }

  _onRefresh() {
    this.setState({ refreshing: true, rendercon: true });
    this.submit()
  }

  deleteDailyActivityMeal = async (itemid) => {

    await RNFetchBlob.fetch(
      'DELETE',
      'https://api.myfitspot.com/api/user/activity/recipe/delete/' + itemid,
      {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
        'auth-token': this.props.token,
      },
    ).then(res => {
      const data = JSON.parse(res.data);
      this.submit3();
      if (data?.success === true) {
        this._onRefresh()
      }
    });
  }
  CaloriesCalculate = (C, P, F, Total) => {
    CRB = C
    PRT = P
    Fat = F
    Tot = Total
    if (this.state.rendercon) {
      this.setState({
        rendercon: false
      })
    }
  }
  CaloriesDeleteCalculate = (item) => {
    CRB = CRB - parseFloat(item?.calories * 0.25).toFixed(1)
    PRT = PRT - parseFloat(item?.calories * 0.25).toFixed(1)
    Fat = Fat - parseFloat(item?.calories * 0.15).toFixed(1)
    Tot = Tot - parseFloat(item?.calories).toFixed(1)
  }
  yesterdaydate = () => {
    var yesterday = new Date(this.state.todaydata);
    yesterday.setDate(today.getDate() - 1);
    today = yesterday
    this.setState({})
  }
  tomorrowdate = () => {
    var yesterday = new Date(this.state.todaydata);
    yesterday.setDate(today.getDate() + 1);
    today = yesterday
    this.setState({})
  }
  ResetCalories = () => {
    CRB = 0
    PRT = 0
    Fat = 0
    Tot = 0
  }
  DeleteProduct = () => {

  }
  async move() {
    await AsyncStorage.setItem('DATESELECTED', this.state.dateSelected)
    this.props.navigation.navigate('AddProduct')
  }
  async move2() {

    const typedata = await AsyncStorage.getItem('type')

    await AsyncStorage.setItem('DATESELECTED', this.state.dateSelected)
    this.props.navigation.navigate('AddProductRecipe', { RECIPETYPE: typedata })
    // this.props.navigation.navigate('Meals')
  }
  render() {
    const deviceLanguage = i18n.currentLocale();
    var type = this.props.dailyActivityType;
    if (type === 'breakfast') {
      this.props.setBreakfastCalories(Tot)
    } else if (type === 'lunch') {
      this.props.setlunchCalories(Tot)
    } else if (type === 'dinner') {
      this.props.setdinnerCalories(Tot)
    } else if (type === 'snack') {
      this.props.setsnackCalories(Tot)
    }
    let cal = 0, C = 0, P = 0, F = 0
    this.state.Responsedata.length === 0 ? this.ResetCalories() : console.log("false");
    const { productData, Engchecked } = this.state

    if (this.state.loader == true) {
      return (
        <View
          style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#ffffff' }}>
          <LottieView
            style={{ width: wp('25%'), height: hp('25%') }}
            source={require('../../../Assets/loader.json')}
            loop={true}
            autoPlay
          />
        </View>
      )
    }

    return (
      <SafeAreaView style={styles.mainViewStyle}>
        <StatusBar hidden={false} />

        <ScrollView>

          <View
            style={{
              backgroundColor: '#fff',
              width: '95%',
              height: 50,
              flexDirection: 'row',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#eeeeee',
              marginRight: 10,
              marginLeft: 10,
              marginTop: 10,
              marginBottom: -6
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                marginLeft: '5%',
                width: '20%',
                padding: 10,
              }}
              onPress={() => this.props.navigation.navigate('HomeMain')}
            // onPress={() =>
            //   // this.props.navigation.goBack(null)
            //   this.state.activityCheck
            //     ? this.props.navigation.navigate('HomeMain')
            //     : this.props.navigation.navigate('HomeMain')
            // }
            >
              <IconA name="arrowleft" size={28} color="black" />
            </TouchableOpacity>
            <View
              style={{
                alignContent: 'center',
                width: '70%',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              {/* <Text style={{color: "#000",fontSize:19,
          }}> Food</Text>   */}
            </View>
          </View>

          <View style={{ paddingHorizontal: "3%" }}>

            <View style={{ marginTop: 20, paddingTop: 18, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', padding: 20 }}>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '40%', justifyContent: 'center' }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: hp('2.5'),
                      fontWeight: 'bold',
                    }}>
                    {this.props?.dailyActivityType == "breakfast" ? i18n.t('BREAKFAST') : null}
                    {this.props?.dailyActivityType == "lunch" ? i18n.t('LUNCH') : null}
                    {this.props?.dailyActivityType == "dinner" ? i18n.t('DINNER') : null}
                    {this.props?.dailyActivityType == "snack" ? i18n.t('SNACKS') : null}
                  </Text>
                  <Text
                    style={{
                      color: '#71886E',
                      fontSize: hp('2.5'),
                      fontWeight: '600',
                    }}>
                    {`${parseFloat(Tot).toFixed(0)}`} <Text style={{ color: Colors.green }}>kcal</Text>
                  </Text>
                </View>
                <View style={{ width: '65%', justifyContent: 'center', alignItems: 'center' }}>

                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    <View style={{ width: '27%', marginRight: 13 }}>
                      <Progress name={i18n.t('FAT')} value={Fat} />
                    </View>
                    <View style={{ width: '27%', marginRight: 13 }}>
                      <Progress name={i18n.t('PROTEIN')} value={PRT} />
                    </View>
                    <View style={{ width: '27%', marginRight: 13 }}>
                      <Progress name={i18n.t('CARBS')} value={CRB} />
                    </View>
                  </View>

                </View>
              </View>

            </View>

            <View style={{ marginTop: 10, paddingTop: 18, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: wp(85) }}>

                {deviceLanguage == 'en' ?
                  <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: -60 }}>
                    <Text style={{ padding: 5, paddingRight: 17, fontSize: 8, marginLeft: -4 }}>{i18n.t('MON')}</Text>
                    <Text style={{ padding: 5, paddingRight: 17, fontSize: 8, marginLeft: 1 }}>{i18n.t('TUE')}</Text>
                    <Text style={{ padding: 5, paddingRight: 17, fontSize: 8, marginLeft: 2 }}>{i18n.t('WED')}</Text>
                    <Text style={{ padding: 5, paddingRight: 17, fontSize: 8 }}>{i18n.t('THU')}</Text>
                    <Text style={{ padding: 5, paddingRight: 17, fontSize: 8, marginLeft: 5 }}>{i18n.t('FRI')}</Text>
                    <Text style={{ padding: 5, paddingRight: 17, fontSize: 8, marginLeft: 5 }}>{i18n.t('SAT')}</Text>
                    <Text style={{ padding: 5, paddingRight: 17, fontSize: 8, marginLeft: 3 }}>{i18n.t('SUN')}</Text>
                  </View>
                  :
                  <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: -60 }}>
                    <Text style={{ padding: 5, paddingRight: 17, fontSize: 9, marginLeft: -3 }}>{i18n.t('MON')}</Text>
                    <Text style={{ padding: 5, paddingRight: 17, fontSize: 9, marginLeft: 5 }}>{i18n.t('TUE')}</Text>
                    <Text style={{ padding: 5, paddingRight: 17, fontSize: 9, marginLeft: 5 }}>{i18n.t('WED')}</Text>
                    <Text style={{ padding: 5, paddingRight: 17, fontSize: 9, marginLeft: 2 }}>{i18n.t('THU')}</Text>
                    <Text style={{ padding: 5, paddingRight: 17, fontSize: 9, marginLeft: 5 }}>{i18n.t('FRI')}</Text>
                    <Text style={{ padding: 5, paddingRight: 17, fontSize: 9, marginLeft: 6 }}>{i18n.t('SAT')}</Text>
                    <Text style={{ padding: 5, paddingRight: 17, fontSize: 9, marginLeft: 6 }}>{i18n.t('SUN')}</Text>
                  </View>
                }

         
                  <View style={{ marginTop: Platform.OS == 'android' ? 0 : 2 }}>
                    <CalendarStrip
                      showDayName={false}
                      calendarAnimation={{ type: 'sequence', duration: 10 }}
                      onDateSelected={async date => {
                        var utcFormate = moment(date).format('YYYY-MM-DD');
                        TodayDate = utcFormate;
                        await AsyncStorage.setItem('todaydate', utcFormate)
                        this.setState({ dateSelected: utcFormate })
                        this.submit2()
                      }}
                      daySelectionAnimation={{
                        type: 'border',
                        duration: 200,
                      }}
                      selectedDate={this.state.dateSelected == '' ? moment() : moment(this.state.dateSelected).format('YYYY-MM-DD')}
                      style={{
                        height: 100,
                        paddingTop: 10,
                        left: wp(-2),
                      }}
                      highlightDateContainerStyle={{
                        backgroundColor: 'rgba(76, 172, 80, 0.8)',
                        width: wp(12),
                        borderRadius: hp(1),
                        height: hp(6),
                      }}
                      showMonth={true}
                      iconLeft={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Chevron_left_font_awesome.svg/512px-Chevron_left_font_awesome.svg.png',
                      }}
                      iconRight={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Chevron_right_font_awesome.svg/1200px-Chevron_right_font_awesome.svg.png',
                      }}
                      iconLeftStyle={{ tintColor: 'black' }}
                      iconRightStyle={{ tintColor: 'black' }}
                      dateNumberStyle={{ color: 'black' }}
                      dateNameStyle={{ color: 'black' }}
                      highlightDateNumberStyle={{ color: 'white' }}
                      highlightDateNameStyle={{ color: 'white' }}
                      calendarHeaderStyle={{ color: 'white' }}
                      disabledDateNameStyle={{ color: 'gray' }}
                      disabledDateNumberStyle={{ color: 'gray' }}
                      iconContainer={{ flex: 0.1 }}
                      headerText={''}
                    />
                  </View>
               

              </View>
            </View>

            <View style={{ marginTop: 10, paddingTop: 0, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>

              <View
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }
                contentContainerStyle={{

                  width: '92%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingBottom: 40,
                }}>
                {this.state.Responsedata === null ||
                  this.state.Responsedata === '' ||
                  this.state.Responsedata === undefined ||
                  this.state.Responsedata.length === 0 ? null
                  : (
                    <View
                      style={{
                        width: '100%',
                      }}>
                      {this.state?.Responsedata?.map((item, index) => {

                        // cal = cal + parseFloat(item?.calories).toFixed(1)
                        // P = P + parseFloat(item?.proteins).toFixed(1)
                        // F = F + parseFloat(item?.fats).toFixed(1)
                        // C = C + parseFloat(item?.carbs).toFixed(1)

                        cal = cal + item?.calories
                        P = P + item?.proteins
                        F = F + item?.fats
                        C = C + item?.carbs

                        this.CaloriesCalculate(C, P, F, cal)
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              this.props.navigation.navigate('EditProduct', {
                                data: item,
                              });
                            }}
                            style={{
                              flexDirection: 'row',
                              height: hp('10%'),
                              width: '100%',
                              borderRadius: 10,
                              alignItems: 'center',
                              alignSelf: 'center',
                              backgroundColor: 'white',
                              justifyContent: 'space-between',
                              borderWidth: 1,
                              borderColor: '#eeeeee',
                              marginTop: 10
                            }}>
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                              }}>
                              <Image
                                source={
                                  item?.image === null ||
                                    item?.image === undefined
                                    ? require('./../../../Assets/Images/recipes-category-1.png')
                                    : {
                                      uri: item?.image,
                                    }
                                }
                                style={{
                                  width: 50,
                                  borderRadius: 50 / 2,
                                  height: 50,
                                  left: 10,
                                  borderWidth: 1,
                                  borderColor: 'gray',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                resizeMode={'cover'}
                              />
                              <View
                                style={{
                                  width: 13,
                                  height: 13,
                                  borderRadius: 13 / 2,
                                  top: 15,
                                  // right: 25,
                                  zIndex: 1,
                                  backgroundColor: 'green',
                                }}
                              />
                              <View
                                style={{
                                  justifyContent: 'center',
                                  left: 10,
                                  width: '72%',
                                }}>
                                <Text
                                  numberOfLines={2}
                                  style={{
                                    color: '#000',
                                    fontWeight: 'bold',
                                    top: 7
                                  }}>
                                  {item.recipe == null ?
                                    `${item?.value ?? ''}${item?.value ? 'g' : ' '} ${this.state.Engchecked ? item?.recipeName : item?.recipeNameNl ?? ''}`
                                    :
                                    `${this.state.Engchecked ? item?.recipeName : item?.recipeNameNl ?? ''}`
                                  }
                                  {/* {`${item?.value ?? ''}${item?.value ? 'g' : ' '} ${this.state.Engchecked ? item?.recipeName : item?.recipeNameNl ?? ''}`} */}
                                  {/* {`${this.state.Engchecked ? item?.recipeName : item?.recipeNameNl ?? ''}`} */}
                                </Text>
                                <Text style={{ color: Colors.green, top: 7, fontWeight: 'bold' }}>{`Kcal`} <Text style={{ color: '#000000', fontWeight: 'normal' }}>{parseFloat(item?.calories).toFixed(0)}</Text></Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    top: 2,
                                    width: '100%',
                                    left: 15,
                                    overflow: 'hidden',
                                  }}>
                                  <Text
                                    numberOfLines={1}
                                    style={{
                                      fontSize: 14,
                                      color: '#C3C6C3',
                                      fontWeight: '500',
                                    }}>
                                    {`${parseFloat(item?.proteins).toFixed(1)}`}
                                    <Text
                                      style={{ color: Colors.green }}>{`${' '}${i18n.t('P')} `}</Text>
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      fontWeight: '500',
                                      color: '#C3C6C3',
                                    }}>
                                    {`${parseFloat(item?.carbs).toFixed(1)}`}
                                    <Text
                                      style={{ color: Colors.green }}>{`${' '}${i18n.t('K')} `}</Text>
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 15,
                                      fontWeight: '500',
                                      color: '#C3C6C3',
                                    }}>
                                    {`${parseFloat(item?.fats).toFixed(1)}`}
                                    <Text
                                      style={{ color: Colors.green }}>{`${' '}${i18n.t('V')} `}</Text>
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View
                              style={{
                                flexDirection: 'column',
                                right: 5,
                                height: hp('10%'),
                              }}>
                              <TouchableOpacity
                                style={{
                                  justifyContent: 'flex-end',
                                  alignItems: 'flex-end',
                                }}
                                onPress={() => {
                                  this.setState({
                                    rendercon: true
                                  })
                                  this.deleteDailyActivityMeal(item?._id)
                                }
                                }>
                                <Image
                                  resizeMode={'cover'}
                                  source={require('./../../../Assets/Today/deleteIcon.png')}
                                  style={{
                                    width: hp('5%'),
                                    marginBottom: '2%',
                                    height: hp('5%'),
                                  }}
                                />
                              </TouchableOpacity>

                            </View>

                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
              </View>

            </View>

            <View style={{ marginTop: 10, paddingTop: 18, paddingBottom: 18, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center', alignItems: 'center' }}>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '45%', marginRight: 10 }}>
                  <AddProduct title={i18n.t('addproduct')} onpress={() => this.move()} />
                </View>
                <View style={{ width: '45%' }}>
                  <AddProduct title={i18n.t('Addrecipe')} onpress={() => this.move2()} />
                </View>
              </View>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCustomRecipe')} style={{ marginTop: 10, flexDirection: 'row', borderRadius: 5, borderWidth: 1, borderStyle: 'dashed', width: '93.5%', padding: 12 }}>
                <View style={{ width: '10%', justifyContent: 'center' }}>
                  <View style={{ width: 25, height: 25, borderRadius: 35 / 2, backgroundColor: Colors.green, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon size={20} name={'add'} type={'material'} color={"white"} />
                  </View>
                </View>
                <View style={{ width: '75%' }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#000',
                      fontSize: 18,
                      paddingLeft: '2%',
                      fontWeight: 'bold',
                    }}>
                    {i18n.t('AddPersonalized')}
                  </Text>
                </View>
              </TouchableOpacity>

            </View>

          </View>

          <View style={{ marginBottom: 50 }}></View>
        </ScrollView>

      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    dailyActivityType: state.DAILY_ACTIVITY_TYPE.dailyActivityType,
    blogsList: state.BLOG_LIST_SHOW.blogsList,
    userName: state.USER_DATA_NAME.userDataName,
    token: state.SESSION_KEY.sessionKey,
    totalDailyKCal: state.UPDATE_USERDETAIL.totalDailyKCal,
    totalWeeklyKCal: state.UPDATE_USERDETAIL.totalWeeklyKCal,
    recipesList: state.RECIPES_LIST_SHOW.recipesList,
    breakfastActive: state.BREAKFAST_ACTIVE.breakfastActive,
    breakfastDailyActivity:
      state.BREAKFAST_DAILY_ACTIVITY.breakfastDailyActivity,
    lunchActive: state.LUNCH_ACTIVE.lunchActive,
    lunchDailyActivity: state.LUNCH_DAILY_ACTIVITY.lunchDailyActivity,
    dinnerActive: state.DINNER_ACTIVE.dinnerActive,
    dinnerDailyActivity: state.DINNER_DAILY_ACTIVITY.dinnerDailyActivity,
    snackActive: state.SNACK_ACTIVE.snackActive,
    snackDailyActivity: state.SNACK_DAILY_ACTIVITY.snackDailyActivity,
    userId: state.USER_DATA.user._id,
    breakfastDailyResponse:
      state.BREAKFAST_DAILY_RESPONSE.breakfastDailyResponse,
    lunchDailyResponse: state.LUNCH_DAILY_RESPONSE.lunchDailyResponse,
    dinnerDailyResponse: state.DINNER_DAILY_RESPONSE.dinnerDailyResponse,
    snackDailyResponse: state.SNACK_DAILY_RESPONSE.snackDailyResponse,

    customBreakfastActive: state.CUSTOM_BREAKFAST_ACTIVE.customBreakfastActive,
    customBreakfastDailyResponse:
      state.CUSTOM_BREAKFAST_DAILY_RESPONSE.customBreakfastDailyResponse,
    customLunchActive: state.CUSTOM_LUNCH_ACTIVE.customLunchActive,
    customLunchDailyResponse:
      state.CUSTOM_LUNCH_DAILY_RESPONSE.customLunchDailyResponse,
    customDinnerActive: state.CUSTOM_DINNER_ACTIVE.customDinnerActive,
    customDinnerDailyResponse:
      state.CUSTOM_DINNER_DAILY_RESPONSE.customDinnerDailyResponse,
    customSnackActive: state.CUSTOM_SNACK_ACTIVE.customSnackActive,
    customSnackDailyResponse:
      state.CUSTOM_SNACK_DAILY_RESPONSE.customSnackDailyResponse,
    productBreakfastActive:
      state.PRODUCT_BREAKFAST_ACTIVE.productBreakfastActive,
    productBreakfastResponse:
      state.PRODUCT_BREAKFAST_ACTIVE_RESPONSE.productBreakfastResponse,
    productBreakfastData:
      state.PRODUCT_BREAKFAST_ACTIVE_DATA.productBreakfastData,
    productLunchActive: state.PRODUCT_LUNCH_ACTIVE.productLunchActive,
    productLunchResponse:
      state.PRODUCT_LUNCH_ACTIVE_RESPONSE.productLunchResponse,
    productLunchData: state.PRODUCT_LUNCH_ACTIVE_DATA.productLunchData,

    productDinnerActive: state.PRODUCT_DINNER_ACTIVE.productDinnerActive,
    productDinnerResponse:
      state.PRODUCT_DINNER_ACTIVE_RESPONSE.productDinnerResponse,
    productDinnerData: state.PRODUCT_DINNER_ACTIVE_DATA.productDinnerData,

    productSnackActive: state.PRODUCT_SNACK_ACTIVE.productSnackActive,
    productSnackResponse:
      state.PRODUCT_SNACK_ACTIVE_RESPONSE.productSnackResponse,
    productSnackData: state.PRODUCT_SNACK_ACTIVE_DATA.productSnackData,
    ////////// 
    breakfastData: state.BREAKFAST_CALORIES.breakfastData,
    lunchData: state.LUNCH_CALORIES.lunchData,
    dinnerData: state.DINNER_CALORIES.dinnerData,
    snackData: state.SNACK_CALORIES.snackData,
    languageget: state.LANGUAGE_TRANSLATE.languageget,
    dinnerProduct: state.DINNER_PRODUCT.dinnerProduct,
    lunchProduct: state.LUNCH_PRODUCT.lunchProduct,
    breakfastProduct: state.BREAKFAST_PRODUCT.breakfastProduct,
    snackProduct: state.SNACK_PRODUCT.snackProduct
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProductMeal);
