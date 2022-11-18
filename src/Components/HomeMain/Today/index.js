import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Platform,
  ActivityIndicator,
  Image,
  FlatList,
  Modal,
  SafeAreaView,

} from "react-native";
import { styles } from "./Styles";
import LottieView from 'lottie-react-native';
import { Icon, Overlay } from "react-native-elements";
import { FontAwesome5 } from 'react-native-vector-icons';
import ProgressCircle from "react-native-progress-circle";
import { ActionCreators } from "../../../Actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { API_URL, SERVER_URL } from "../../../Actions";

import Moment from "moment";
import ImagePicker from "react-native-image-picker";
import Colors from "../../../Theme/Colors";
import Responsive from "react-native-lightweight-responsive";
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;
var TodayDate = moment().format('YYYY-MM-DD');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { State } from "react-native-gesture-handler";
import { CommonImage } from "../../../Screens/LogMain/CommonImage";
import { remaincalories } from "../../UserProfile/Actions/core";
import I18n from "../../../../translation";
import { PostItem } from "../../WorkOutMain/Home/PostItem";
import RNFetchBlob from "rn-fetch-blob";
import { DailyCaloriesBurn } from "../../../redux/actions";
import { parse } from "react-native-svg";
var day = String(new Date().getDate()).padStart(2, "0");
var mon = String(new Date().getMonth() + 1).padStart(2, "0"); //January is 0!
var yy = new Date().getFullYear();

const MYCAL = [];
const BURNCALWORKOT = [];
const BURNCALWORKOTACTIVITY = [];
const TOTALWEEKCAL = []

class Today extends React.Component {
  constructor(props) {
    super(props);
    let ischecked = this.props?.RemainCal === NaN || this.props?.RemainCal === undefined || this.props?.RemainCal === null ? 0 : this.props?.RemainCal
    this.state = {
      ischecked2: this.props?.RemainCal === NaN || this.props?.RemainCal === undefined || this.props?.RemainCal === null ? 0 : this.props?.RemainCal,
      msgpopup: false,
      msgpopup2: false,
      ARR: MYCAL,
      avatarSource: "",
      avatarData: "",
      imageshow: false,
      ProgressHide: false,
      todayDate:
        Moment(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
        ).format("YYYY MM DD") +
        ", " +
        Moment(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
        ).format("DD MMM"),
      blogList: [],
      TodayCurrentDate: "",
      loader: false,
      firstDay: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      lastDay: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      breakfastCheck: false,
      lunchCheck: false,
      dinnerCheck: false,
      snackCheck: false,

      breakfastDailyActivity: [],
      lunchDailyActivity: [],
      dinnerDailyActivity: [],
      snackDailyActivity: [],
      carbs: "",
      fat: "",
      protien: "",
      Wcarbs: "",
      Wfat: "",
      Wprotien: "",
      breakfastData: '',
      crb: 0,
      frt: 0,
      prt: 0,
      breakfastImage: "",
      lunchImage: "",
      snackData: '',
      lunchData: '',
      dinnerData: '',
      dinnerImage: "",
      snackImage: "",
      dailygoal: 0,
      weeklygoal: "",
      collapsed: false,
      collapsedDuration: false,
      weightKG: "",
      weightLB: "",
      CurrentDate: "",
      unit: "kg",
      locationSearch: "",
      temp: [],
      itemNumberShow: 0,
      random: 0,
      selectColor: "",
      DATA: [],
      activestatus: 'today',
      filterType: 0,
      dailycal: JSON.stringify(this?.props?.totalDailyKCal) ?? 0,
      weeklycal: JSON.stringify(this.props?.totalWeeklyKCal) ?? 0,
      multiple: false,
      loading: true,
      isDailyPercent: 0,
      isWeeklyPercent: 0,
      // isDailyPercent: ((ischecked / this?.props?.totalDailyKCal) * 100) ?? 0,
      // isWeeklyPercent: ((((ischecked * 7) ?? 0) / this?.props?.totalWeeklyKCal) * 100) ?? 0,
      profileLoader: false,
      DAYS: [],
      CALCULATE: [],
      WEEKCAL1: '',
      WEEKCAL2: '',
      WEEKCAL3: '',
      workoutQuantity: [],
      RemainActivity: 0,
      WorkoutRemainActivity: [],
      SELECTDATE: '',
      dailycal1: 0,
      myloader: false,

      wcrb: 0,
      wfrt: 0,
      wprt: 0,
      wcarbs: 0,
      wprotien: 0,
      wfat: 0,
      modal: false,
      dateSelected: '',
      burnCalWorkout: 0,
      disable: false,
      msgpopupoverview: false,
      show: false,
      img: '',

      IsRemaiNCalories: (this?.props?.totalDailyKCal - ischecked ?? 0) < 0 ? 0 : (this?.props?.totalDailyKCal - ischecked ?? 0) ?? 0
    };
  }


  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  async dailyneutrions() {
    // AsyncStorage.setItem("daily", JSON.stringify(this?.props?.totalDailyKCal));
    try {
      let user = await AsyncStorage.getItem("daily");
      let parsed = JSON.parse(user);

      this.setState({
        carbs: parseFloat(this.state.crb).toFixed(0),
        protien: parseFloat(this.state.prt).toFixed(0),
        fat: parseFloat(this.state.frt).toFixed(0),
        dailygoal: (parseFloat(parsed * 0.5).toFixed(0) / parseFloat(parsed).toFixed(0)) * 100,
      });
    } catch (error) {
      console.log(error);
    }
  }

  weeklyneutrionsCal() {

    let CAL = MYCAL;

    let crb = CAL.reduce(function (prev, current) {
      return prev + +current.crb
    }, 0);
    let frt = CAL.reduce(function (prev, current) {
      return prev + +current.frt
    }, 0);
    let prt = CAL.reduce(function (prev, current) {
      return prev + +current.prt
    }, 0);

    this.setState({
      Wcarbs: parseFloat(crb).toFixed(0),
      Wprotien: parseFloat(prt).toFixed(0),
      Wfat: parseFloat(frt).toFixed(0),
    });

  }

  async weeklyneutrions(DATE) {

    const MYDATE = DATE == '' ? moment().format('YYYY-MM-DD') : moment(DATE).format('YYYY-MM-DD')

    var startOfWeek = moment(MYDATE).startOf('isoWeek').weekday(1);
    var endOfWeek = moment(MYDATE).endOf('isoWeek')

    var endOfWeek = endOfWeek;
    // var endOfWeek = moment('2022-02-14');

    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(day.toDate());
      day = day.clone().add(1, 'd');
    }
    days.forEach((item, index) => {
      this.WeekCalFetchCalories(item);
    })

    MYCAL.length = 0;
    this.weeklyneutrionsCal()


    try {

      let user = await AsyncStorage.getItem("week");
      let parsed = JSON.parse(user);

      this.setState({
        // carbs: Math.ceil(this.state.crb * 7),
        // protien: Math.ceil(this.state.prt * 7),
        // fat: Math.ceil(this.state.frt * 7),
        weeklygoal: (parseFloat(parsed * 0.5).toFixed(1) / parseFloat(parsed).toFixed(1)) * 100,
      });

    } catch (error) {
      console.log(error);
    }

    // var startOfWeek = moment('2022-02-07');
    // var endOfWeek = moment().endOf('isoWeek')


  }

  updateNeutronts = async () => {
    try {
      let set = new Set();
      AsyncStorage.getItem("Neutronts").then((val) => {
        let obj = JSON.parse(val);
        set.add(obj);
        this.setState({
          carbs: this.state.carbs + obj.carbs,
          protien: this.state.protien + obj?.protein,
          fat: this.state.fat + obj?.fats,
        });
      });
    } catch (error) {
      console.log(error)
    }
  }

  getProfileIMG() {
    const _this = this;
    this.setState(
      {
        profileLoader: true,
      },
      () => {
        _this.props
          .getProfilePicture(this.props?.token, this.props?.userId)
          .then((status) => {
            _this.setState(
              {
                profileLoader: false,
              },
              () => {
                if (status.status) {

                  this.setState({
                    avatarSource: SERVER_URL + status.profile,
                    imageshow: true,
                    img: SERVER_URL + status.profile
                  });
                }
              }
            );
          });
      }
    );

  }

  UNSAFE_componentWillMount() {
    this.getProfileIMG();
  }

  openOnlyLibrary = () => {
    const options = {
      //  title: 'Select Profile Image',
      //  maxWidth: 400,
      //  maxHeight: 600,
      quality: 0.5,
      mediaType: "photo",
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {

      } else if (response.error) {

      } else if (response.customButton) {

      } else {

        let photoName =
          response.fileName === undefined ? "abc.jpg" : response.fileName;
        let source = {
          uri: response.uri,
          name: photoName,
          type: "image/jpg",
        };

        const _this = this;

        this.setState(
          {
            profileLoader: true,
          },
          () => {
            _this.props
              .setProfilePicture(
                response.data,
                this.props.token,
                this.props?.userId
              )
              .then((status) => {
                _this.setState(
                  {
                    profileLoader: false,
                  },
                  () => {
                    if (status.status) {
                      this.setState({
                        avatarSource: source,
                        avatarData: response.data,
                        imageshow: true,
                        // profilePhotoError:false,
                      });
                    } else {
                      console.log(status.error)
                    }
                  }
                );
              });
          }
        );
        // console.warn("Image source =",this.state.avatarSource);
        this.setState({ Secondtime: true });
        //   this.updateProfileImage(this.state.avatarSource);
      }
    });
  };

  jsutWeekCal() {
    let DATE = new Date();
    this.weeklyneutrions(DATE);
  }

  getWorkotCal = async () => {

    const MYDATE = moment().format('YYYY-MM-DD')

    var startOfWeek = moment(MYDATE).startOf('isoWeek').weekday(1);
    var endOfWeek = moment(MYDATE).endOf('isoWeek')

    fetch(`${API_URL}/user/workout/all`, {

      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': `${this.props?.token}`
      }
    }).then((response) => response.json())
      .then((responseJson) => {

        const data = responseJson.data;

        var startDate = moment(startOfWeek).format('YYYY-MM-DD');
        var endDate = moment(endOfWeek).format('YYYY-MM-DD');

        var resultProductData = data.filter(a => {
          var date = moment(a.createdAt).format('YYYY-MM-DD');
          return (date >= startDate && date <= endDate);
        });



        let burnWorkout = resultProductData.reduce(function (prev, current) {
          return prev + +current.workoutId.numberOfCalories
        }, 0);

        BURNCALWORKOT.length = 0;
        BURNCALWORKOT.push(burnWorkout)

      })
      .catch((error) => {
        console.log(error)
      })

    this.getWorkotActivityCal();
  }

  getWorkotActivityCal = async () => {


    const MYDATE = moment().format('YYYY-MM-DD')

    var startOfWeek = moment(MYDATE).startOf('isoWeek').weekday(1);
    var endOfWeek = moment(MYDATE).endOf('isoWeek')


    fetch(`${API_URL}/user/workout/getcreateActivity`, {

      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': `${this.props?.token}`
      }
    }).then((response) => response.json())
      .then((responseJson) => {

        const data = responseJson.user;

        var startDate = moment(startOfWeek).format('YYYY-MM-DD');
        var endDate = moment(endOfWeek).format('YYYY-MM-DD');

        var resultProductData = data.filter(a => {
          var date = moment(a.createdAt).format('YYYY-MM-DD');
          return (date >= startDate && date <= endDate);
        });

        let burnWorkout = resultProductData.reduce(function (prev, current) {
          return prev + +current.Cal
        }, 0);

        BURNCALWORKOTACTIVITY.length = 0;
        BURNCALWORKOTACTIVITY.push(burnWorkout)

      })
      .catch((error) => {
        console.log(error)
      })
  }

  setVal = async () => {
    try {
      let WorkoutRemainActivity = `${this?.props?.userdetail?.WorkoutRemainActivity}`;
      await AsyncStorage.setItem('WorkoutRemainActivity', WorkoutRemainActivity);


      let RemainActivity = `${this.props?.userdetail?.RemainActivity}`;
      await AsyncStorage.setItem('RemainActivity', RemainActivity);
    } catch (error) {
      console.log(error)
    }

  }

  async check() {
    try {
      let TOKEN = await AsyncStorage.getItem('PROFILETOKEN')
      fetch(`${API_URL}/user/feature/getUserFeatureProfile`, {

        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'auth-token': `${TOKEN}`
        }
      }).then((response) => response.json())
        .then((responseJson) => {

          try {

            if (responseJson.success == false || responseJson.success == 'false') {

              AsyncStorage.setItem('UserRecipe', null)
              this.props.navigation.navigate('gender')

              return;
            } else {



              this.userUpdateDataSubmit(responseJson)
              this.setAsync()
            }

          } catch (error) {
            console.log(error)
          }

        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }

  }

  getCurrentUser = async () => {

    try {
      let TOKEN = await AsyncStorage.getItem('PROFILETOKEN')
      fetch(`${API_URL}/user/${this.props?.userId}`, {

        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'auth-token': `${TOKEN}`
        }
      }).then((response) => response.json())
        .then((responseJson) => {

          AsyncStorage.setItem('referrelUse', responseJson.referrelUse.toString());
          AsyncStorage.setItem('referrelPurchaseValid', responseJson.referrelPurchaseValid.toString());

        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }

  }

  setAsync = async () => {
    const recipe = this.props?.userdetail.recipe
    const userQuantity = parseInt(this.props?.userdetail.WorkQuantity)
    await AsyncStorage.setItem('UserWorkQTY', `${userQuantity}`);
    await AsyncStorage.setItem('UserRecipe', recipe);
  }

  userUpdateDataSubmit = async (data) => {

    try {
      var today = new Date();
      let getDay = today.getDay()

      if (getDay == 1) {
        const _this = this;
        const userData = {
          ebf: data.EBF,
          gender: data.gender,
          age: data.age,
          weight: data.weight,
          height: data.height,
          recipe: data.recipe,
          activityLevel: data.activityLevel ?? 'L',
          WorkQuantity: data.WorkQuantity ?? 1,
          WorkQuantity: data.WorkQuantity ?? 1,
          workoutDuration: data.durationOfWorkout,
          numberOfWorkouts: data.numberOfWorkouts,
          RemainActivity: this.props?.userdetail?.RemainActivity,
          WorkoutRemainActivity: this.props?.userdetail?.WorkoutRemainActivity,
          profileUpdate: 1
        };

        const userActivityData = {
          activities: [{ name: 'running', minutes: 60 }],
        };

        this.setState(
          {
            signinLoader: true,
          },
          () => {
            _this.props
              .setUserFeatureUpdateAction(userData, this.props.token)
              .then(status => {

                _this.setState(
                  {
                    random: 1,
                    myloader: false,
                  },
                  () => {
                    if (status.status) {
                      this.props.navigation.navigate('HomeMain');
                    }
                  },
                );
              });
          },
        );
      } else {
        const _this = this;
        const userData = {
          ebf: data.EBF,
          gender: data.gender,
          age: data.age,
          weight: data.weight,
          height: data.height,
          recipe: data.recipe,
          activityLevel: data.activityLevel ?? 'L',
          WorkQuantity: data.WorkQuantity ?? 1,
          workoutDuration: data.durationOfWorkout,
          numberOfWorkouts: data.numberOfWorkouts,
          RemainActivity: this.props?.userdetail?.RemainActivity,
          WorkoutRemainActivity: this.props?.userdetail?.WorkoutRemainActivity,
          profileUpdate: 1
        };

        const userActivityData = {
          activities: [{ name: 'running', minutes: 60 }],
        };

        this.setState(
          {
            signinLoader: true,
          },
          () => {
            _this.props
              .setUserFeatureUpdateAction(userData, this.props.token)
              .then(status => {
                _this.setState(
                  {
                    random: 1,
                    myloader: false,
                    myloader: false,
                  },
                  () => {
                    if (status.status) {
                      this.props.navigation.navigate('HomeMain');
                    }
                  },
                );

              });
          },
        );
      }
    } catch (error) {
      console.log(error)
    }

  }

  async setRemainActivityRecordWithTimeer() {
    try {
      let RemainActivity = `${this.props?.userdetail?.RemainActivity}`;
      await AsyncStorage.setItem('RemainActivity', RemainActivity);
    } catch (error) {
      console.log(error)
    }

  }

  async totalDailyKCalValueSetToAsync() {
    let totalDailyKCal = parseFloat(this?.props?.totalDailyKCal).toFixed(0);
    let Total = totalDailyKCal == NaN || totalDailyKCal == 'NaN' ? '0' : totalDailyKCal

    await AsyncStorage.setItem('totalDailyKCal', Total);
  }

  setAsyncValues = async () => {
    try {
      await AsyncStorage.setItem('totalDailyKCal', parseFloat(this?.props?.totalDailyKCal).toFixed(0));

      let WorkoutRemainActivity = `${this?.props?.userdetail?.WorkoutRemainActivity}`;
      await AsyncStorage.setItem('WorkoutRemainActivity', WorkoutRemainActivity);

      let RemainActivity = `${this.props?.userdetail?.RemainActivity}`;
      await AsyncStorage.setItem('RemainActivity', RemainActivity);

      let TotalWorkouts = `${this.props?.userdetail?.WorkQuantity}`;
      await AsyncStorage.setItem('TotalWorkouts', TotalWorkouts);

    } catch (error) {
      alert(JSON.stringify(error))
    }

  }

  async componentDidMount() {

    try {
      this.scroll.scrollTo({ x: 0, y: 0 })
      const { navigation } = this.props;
      const unsubscribe = navigation.addListener('focus', () => {

        if (this.props.userName == undefined || this?.props?.userdetail?.WorkoutRemainActivity == null || this.props?.userdetail?.RemainActivity == null) {
          this.setState({ myloader: false })
          this.props.navigation.navigate('gender');
          return;
        }

        this.setState({
          workoutQuantity: this.props?.userdetail?.WorkQuantity,
          RemainActivity: this.props?.userdetail?.RemainActivity,
          WorkoutRemainActivity: this?.props?.userdetail?.WorkoutRemainActivity,
        })


        this.scroll.scrollTo({ x: 0, y: 0 })
        this.getProfileIMG()
        this.getCurrentUser()
        this.check()
        this.CalculateWeekCal()
        this.weeklyneutrions('');
        this.setVal()
        this.FetchCalories()
        this.totalDailyKCalValueSetToAsync()
        this.move222()
        this.getWorkotCal();
        this.getWorkotActivityCal();
        this.setState({ show: true })
      });

      setInterval(() => {
        this.move222()
      }, 3000);

      var bar = new Promise((resolve, reject) => {

        this.setState({ myloader: false })

        if (this.props.userName == undefined || this?.props?.userdetail?.WorkoutRemainActivity == null || this.props?.userdetail?.RemainActivity == null) {
          this.setState({ myloader: false })
          this.props.navigation.navigate('gender');
          return;
        }

        this.getProfileIMG()
        this.getCurrentUser()
        this.check()
        this.CalculateWeekCal()
        this.weeklyneutrions('');
        this.setVal()
        this.FetchCalories()
        this.getWorkotCal();
        this.getWorkotActivityCal();
        this.submit();
        this.setAsyncValues()
        this.props.DailyCaloriesBurn(0);
        this.props.TotalDailyCalories(0);
        this.jsutWeekCal()
        this.dailyneutrions();
        this.updateNeutronts();

        this.setState({
          workoutQuantity: this.props?.userdetail?.WorkQuantity,
          RemainActivity: this.props?.userdetail?.RemainActivity,
          WorkoutRemainActivity: this?.props?.userdetail?.WorkoutRemainActivity,
        })

        this.setState({ show: true })

        const interval = setInterval(() => {
          this.setRemainActivityRecordWithTimeer();
        }, 3000);

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();
        this.setState({
          CurrentDate: yyyy + "-" + mm + "-" + dd,
        });

        var utcFormate = moment.utc(new Date()).format('YYYY-MM-DD');
        TodayDate = utcFormate;

        if (this.state.activestatus === "today") {
          this.dailyneutrions();
        }

        this.setState({
          name: this.props.userName,
          breakfastCheck: this.props.breakfastActive,
          lunchCheck: this.props.lunchActive,
          dinnerCheck: this.props.dinnerActive,
          snackCheck: this.props.snackActive,
          snackData: this.props.snackData,
          breakfastData: this.props.breakfastData,
          lunchData: this.props.lunchData,
          dinnerData: this.props.dinnerData,
          snackData: this.props.snackData
        });


      });

      bar.then(() => {
        this.setState({ myloader: false })
      });


    } catch (error) {
      console.log(error)
    }
  }

  // componentWillUnmount() {
  //   this._unsubscribe();
  // }

  componentWillReceiveProps(next) {
    this.setState({
      breakfastCheck: next.breakfastActive,
      lunchCheck: next.lunchActive,
      dinnerCheck: next.dinnerActive,
      snackCheck: next.snackActive,
      breakfastDailyActivity: next.breakfastDailyActivity,
      lunchDailyActivity: next.lunchDailyActivity,
      dinnerDailyActivity: next.dinnerDailyActivity,
      snackDailyActivity: next.snackDailyActivity,

      breakfastImage: next.breakfastActive
        ? SERVER_URL + next?.breakfastDailyActivity?.featureImage?.l
        : null,
      lunchImage: next.lunchActive
        ? SERVER_URL + next?.lunchDailyActivity?.featureImage?.l
        : null,
      dinnerImage: next.dinnerActive
        ? SERVER_URL + next?.dinnerDailyActivity?.featureImage?.l
        : null,
      snackImage: next.snackActive
        ? SERVER_URL + next?.snackDailyActivity?.featureImage?.l
        : null,
    });
  }

  move222() {

    this.getWorkotActivityCal()
    this.getWorkotCal();
    this.setState({ dailycal1: BURNCALWORKOTACTIVITY })
    this.setState({
      workoutQuantity: this.props?.userdetail?.WorkQuantity,
      RemainActivity: this.props?.userdetail?.RemainActivity,
      WorkoutRemainActivity: this?.props?.userdetail?.WorkoutRemainActivity,

    })
  }

  move() {

    this.getWorkotActivityCal()
    this.getWorkotCal();
    this.setState({ dailycal1: BURNCALWORKOTACTIVITY })
    this.setState({
      workoutQuantity: this.props?.userdetail?.WorkQuantity,
      RemainActivity: this.props?.userdetail?.RemainActivity,
      WorkoutRemainActivity: this?.props?.userdetail?.WorkoutRemainActivity,
      myloader: true
    })
    setTimeout(() => {
      this.setState({
        myloader: false,
        modal: true
      })
    }, 3000);
  }

  submit() {
    const _this = this;

    this.setState(
      {
        loader: true,
      },
      () => {
        _this.props.getBlogListRequests(this.props.token).then((status) => {

          _this.setState(
            {
              //	signinLoader: false
            },
            () => {
              if (status.status) {
                this.setState({
                  blogList: this.props.blogsList,
                  loader: false,
                });
              } else {
                this.setState({
                  loader: false,
                });
              }
            }
          );
        });
        var data = {
          mealType: this.props.updaterecipe
        };
        _this.props.getRecipesList(data, this.props.token).then((status) => {

          if (status.status) {
            // this.setState({
            // 	blogList:this.props.blogsList
            // })
          } else {
          }
        });
        _this.props.getWorkoutsList(this.props.token).then((status) => {

          if (status.status) {

          } else {
          }
        });
        _this.props.getProductList(this.props.token).then((status) => {
          if (status.status) {
          } else {
          }
        });
      }
    );
  }

  async addDailyActivity(value) {

    if (this.state.dateSelected == '') {
      const date = new Date();
      const format = moment.utc(date).format('YYYY-MM-DD')
      await AsyncStorage.setItem('type', value)
      const _this = this;
      this.setState(
        {
          //loader: true
        },
        () => {
          _this.props.getDailyActivityType(value).then((status) => {
            if (status.status) {
              this.props.navigation.navigate("AddProductMeal", {
                RecipeType: value,
                dateSelected: format
              });
            }
          });
        }
      );
    } else {
      await AsyncStorage.setItem('type', value)
      const _this = this;
      this.setState(
        {
          //loader: true
        },
        () => {
          _this.props.getDailyActivityType(value).then((status) => {
            if (status.status) {
              this.props.navigation.navigate("AddProductMeal", {
                RecipeType: value,
                dateSelected: this.state.dateSelected
              });
            }
          });
        }
      );
    }

  }

  calculatecalories = (value) => {
    if (value) {
      let cal = 0
      value.map(item => {
        cal = item?.calories + cal
      })
      return cal
    }
  }

  CalculateWeekCal(DATE) {

    this.setState({ loading: true })

    const MYDATE = DATE == undefined ? moment().format('YYYY-MM-DD') : moment(DATE).format('YYYY-MM-DD')

    var startOfWeek = moment(MYDATE).startOf('week').weekday(0);
    var endOfWeek = moment(MYDATE).endOf('week').weekday(6);

    var endOfWeek = endOfWeek;

    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(day.toDate());
      day = day.clone().add(1, 'd');
    }

    TOTALWEEKCAL.splice(0)

    days.forEach((item) => {
      this.FetchCaloriesForWeek(item);
    })

    setTimeout(() => { this.FindSumOfWeekCal() }, 3000);
    setTimeout(() => { this.FindSumOfWeekCal() }, 5000);

  }

  FindSumOfWeekCal() {

    let CAL = TOTALWEEKCAL;

    const breakfast = CAL.reduce((total, currentValue) => total = total + currentValue.breakfastData, 0);
    const lunch = CAL.reduce((total, currentValue) => total = total + currentValue.lunchData, 0);
    const dinner = CAL.reduce((total, currentValue) => total = total + currentValue.dinnerData, 0);
    const snack = CAL.reduce((total, currentValue) => total = total + currentValue.snackData, 0);

    let SUM = breakfast + lunch + dinner + snack


    this.setState({ WEEKMINUS: SUM })
    this.setState({ loading: false })
  }

  async FetchCaloriesForWeek(DATE) {

    let SELECTDATE = moment.utc(DATE).format('YYYY-MM-DD')

    this.setState(
      {
        loader: true,
      },
      async () => {
        const data = {
          date: SELECTDATE
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

          if (data?.success === true) {

            var list = data?.data;
            let ft = 0, pt = 0, cr = 0;
            let calories = 0 - this.props.totalcalories
            if (list) {
              list?.map(item => {
                calories = item?.calories + calories,
                  ft = ft + item?.fats,
                  cr = cr + item?.carbs
                pt = pt + item?.proteins
              })
              ////Break Fast
              var breakfastArray = list?.filter(
                addedItem => addedItem.type === 'breakfast',
              );
              const breakfast = this.calculatecalories(breakfastArray)

              ////Snack
              var snackArray = list.filter(addedItem => addedItem.type === 'snack');
              const snack = this.calculatecalories(snackArray)

              ////Dinner
              var dinnerArray = list.filter(
                addedItem => addedItem.type === 'dinner',
              );
              const dinner = this.calculatecalories(dinnerArray)

              /////Lunch
              var lunchArray = list.filter(addedItem => addedItem.type === 'lunch');
              const lunch = this.calculatecalories(lunchArray)


              TOTALWEEKCAL.push({
                date: SELECTDATE,
                breakfastData: breakfast,
                snackData: snack,
                dinnerData: dinner,
                lunchData: lunch
              })

              this.setState({ loading: false })

            }

          }

        });
      },
    );
  }

  async FetchCalories() {

    this.setState(
      {
        loader: true,
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

          this.setState({ DAYS: res })

          this.setState({
            loader: false
          })

          if (data?.success === true) {

            var list = data?.data;
            let ft = 0, pt = 0, cr = 0;
            let calories = 0 - this.props.totalcalories
            if (list) {
              list?.map(item => {
                calories = item?.calories + calories,
                  ft = ft + item?.fats,
                  cr = cr + item?.carbs
                pt = pt + item?.proteins
              })
              ////Break Fast
              var breakfastArray = list?.filter(
                addedItem => addedItem.type === 'breakfast',
              );
              const breakfast = this.calculatecalories(breakfastArray)

              ////Snack
              var snackArray = list.filter(addedItem => addedItem.type === 'snack');
              const snack = this.calculatecalories(snackArray)

              ////Dinner
              var dinnerArray = list.filter(
                addedItem => addedItem.type === 'dinner',
              );
              const dinner = this.calculatecalories(dinnerArray)

              /////Lunch
              var lunchArray = list.filter(addedItem => addedItem.type === 'lunch');
              const lunch = this.calculatecalories(lunchArray)


              this.setState({
                breakfastData: breakfast,
                snackData: snack,
                dinnerData: dinner,
                lunchData: lunch
              })
            }

            this.setState({
              crb: Math.ceil(cr),
              frt: Math.ceil(ft),
              prt: Math.ceil(pt),
              carbs: Math.ceil(cr),
              protien: Math.ceil(pt),
              fat: Math.ceil(ft),
              dailygoal: (Math.ceil(calories * 0.5) / Math.ceil(calories)) * 100,
              IsRemaiNCalories: (this?.props?.totalDailyKCal - calories ?? 0) < 0 ? 0 : (this?.props?.totalDailyKCal - calories ?? 0) ?? 0,
              isDailyPercent: ((calories / this?.props?.totalDailyKCal) * 100) ?? 0,
              isWeeklyPercent: ((((calories * 7) ?? 0) / this?.props?.totalWeeklyKCal) * 100) ?? 0,
            });
            this.dailyweeklyAsyncSet()

          }

          if (data?.status === false) {
            this.setState({
              breakfastData: 0,
              snackData: 0,
              dinnerData: 0,
              lunchData: 0,
            })
            this.setState({
              dailygoal: (Math.ceil(0 * 0.5) / Math.ceil(0)) * 100,
              IsRemaiNCalories: (this?.props?.totalDailyKCal - 0 ?? 0) < 0 ? 0 : (this?.props?.totalDailyKCal - 0 ?? 0) ?? 0,
              isDailyPercent: ((0 / this?.props?.totalDailyKCal) * 100) ?? 0,
              isWeeklyPercent: ((((0 * 7) ?? 0) / this?.props?.totalWeeklyKCal) * 100) ?? 0,
            });
          }
        });
      },
    );
  }

  async dailyweeklyAsyncSet() {
    try {
      await AsyncStorage.setItem("daily", JSON.stringify(calories));
      await AsyncStorage.setItem("week", JSON.stringify(calories * 7));
    } catch (error) {
      console.log(error)
    }
  }

  async WeekCalFetchCalories(Date) {

    let saveDate = moment(Date).format('YYYY-MM-DD');

    this.setState(
      {
        loader: true,
      },
      async () => {
        const data = {
          date: saveDate
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

          var list = data?.data;
          let ft = 0, pt = 0, cr = 0;
          let calories = 0 - this.props.totalcalories
          if (list) {
            list?.map(item => {
              calories = item?.calories + calories,
                ft = ft + item?.fats,
                cr = cr + item?.carbs
              pt = pt + item?.proteins
            })
          }

          MYCAL.push({
            crb: Math.ceil(cr),
            frt: Math.ceil(ft),
            prt: Math.ceil(pt),
            carbs: Math.ceil(cr),
            protien: Math.ceil(pt),
            fat: Math.ceil(ft),
          })

          this.weeklyneutrionsCal()

        });
      },
    );
  }

  cleanArray(date) {
    // MYCAL.length = 0;
    this.weekCalculate(date)
  }

  weekCalculate(date) {
    this.weeklyneutrions(date);
  }



  render() {

    const { dailycal1, img } = this.state;

    const deviceLanguage = I18n.currentLocale();

    if (this.state.myloader == true) {
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
      <SafeAreaView
        style={{ backgroundColor: "#fff", flex: 1, height: '4%' }}
      >

        <ScrollView ref={ref => { this.scroll = ref }} showsVerticalScrollIndicator={false}>

          <View style={{ paddingHorizontal: Platform.OS == 'android' ? "3%" : "4.5%" }}>

            <View style={{ flexDirection: 'row', padding: 10, paddingTop: 25, paddingBottom: 10, }}>
              <View style={{ width: '15%', justifyContent: 'center', paddingTop: 3 }}>
                {img == undefined || img == "https://api.myfitspot.com/undefined" ?
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                    <Image style={{ width: 40, height: 40, marginLeft: 5 }} source={require('../../../Assets/user.png')} />
                  </TouchableOpacity>
                  :
                  // <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                  <TouchableOpacity>
                    <Image style={{ width: 40, height: 40, marginLeft: 5, borderRadius: 500 }} source={{ uri: img }} />
                  </TouchableOpacity>
                }

              </View>
              <View style={{ width: '60%', justifyContent: 'center' }}>
                <Text style={styles.headerText}>{I18n.t('Hi')}, {this.state?.name}</Text>
              </View>
              <View style={{ width: '25%', justifyContent: 'center', alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => this.setState({ msgpopup: true })} style={{ width: 30 }}>
                  <Image style={{ width: 20, height: 20 }} source={require('../../../Assets/Images/info.png')} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: 20, paddingTop: 18, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee' }}>
              <View style={{ height: hp('1'), marginVertical: hp(4), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(2), width: wp('85'), alignSelf: 'center', alignItems: 'center' }}>
                <View style={{ width: wp(85) }}>

                  {deviceLanguage == 'en' ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: -60 }}>
                      <Text style={{ padding: 5, paddingRight: 17, fontSize: 8, marginLeft: -4 }}>{I18n.t('MON')}</Text>
                      <Text style={{ padding: 5, paddingRight: 17, fontSize: 8, marginLeft: 1 }}>{I18n.t('TUE')}</Text>
                      <Text style={{ padding: 5, paddingRight: 17, fontSize: 8, marginLeft: 2 }}>{I18n.t('WED')}</Text>
                      <Text style={{ padding: 5, paddingRight: 17, fontSize: 8 }}>{I18n.t('THU')}</Text>
                      <Text style={{ padding: 5, paddingRight: 17, fontSize: 8, marginLeft: 5 }}>{I18n.t('FRI')}</Text>
                      <Text style={{ padding: 5, paddingRight: 17, fontSize: 8, marginLeft: 5 }}>{I18n.t('SAT')}</Text>
                      <Text style={{ padding: 5, paddingRight: 17, fontSize: 8, marginLeft: 3 }}>{I18n.t('SUN')}</Text>
                    </View>
                    :
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: -60 }}>
                      <Text style={{ padding: 5, paddingRight: 17, fontSize: 9, marginLeft: -3 }}>{I18n.t('MON')}</Text>
                      <Text style={{ padding: 5, paddingRight: 17, fontSize: 9, marginLeft: 5 }}>{I18n.t('TUE')}</Text>
                      <Text style={{ padding: 5, paddingRight: 17, fontSize: 9, marginLeft: 5 }}>{I18n.t('WED')}</Text>
                      <Text style={{ padding: 5, paddingRight: 17, fontSize: 9, marginLeft: 2 }}>{I18n.t('THU')}</Text>
                      <Text style={{ padding: 5, paddingRight: 17, fontSize: 9, marginLeft: 5 }}>{I18n.t('FRI')}</Text>
                      <Text style={{ padding: 5, paddingRight: 17, fontSize: 9, marginLeft: 6 }}>{I18n.t('SAT')}</Text>
                      <Text style={{ padding: 5, paddingRight: 17, fontSize: 9, marginLeft: 6 }}>{I18n.t('SUN')}</Text>
                    </View>
                  }

                  <View style={{ marginTop: Platform.OS == 'android' ? 0 : 2 }}>
                    <CalendarStrip
                      showDayName={false}
                      calendarAnimation={{ type: 'sequence', duration: 10 }}
                      onDateSelected={date => {
                        var utcFormate = moment.utc(date).format('YYYY-MM-DD');
                        TodayDate = utcFormate;
                        this.setState({ dateSelected: TodayDate })
                        this.CalculateWeekCal(date)
                        this.FetchCalories()
                        this.cleanArray(date)
                        // getAllReserVation(utcFormate);
                      }}
                      daySelectionAnimation={{
                        type: 'border',
                        duration: 200,
                      }}
                      selectedDate={moment()}
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
            </View>

            <View style={{ marginTop: 10, paddingTop: 18, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee' }}>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 10,
                  paddingLeft: 18,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View style={styles.CalView}>
                  <Text style={styles.textstyle}>{I18n.t('DailyGoal')} :</Text>
                </View>
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: "lightgray",
                    width: "40%",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      backgroundColor: Colors.green,
                      width: `${Math.round(this.state.isDailyPercent ?? 0) > 100 ? 100 : Math.round(this.state.isDailyPercent) ?? 0} %`,
                      height: 16,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>

                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={{
                    fontSize: 15, left: 5,
                    width: wp(27), fontWeight: "600"
                  }}>
                    {Number.isNaN(this.state?.IsRemaiNCalories) === Number.isNaN(Number.NaN) || this.state?.IsRemaiNCalories === undefined || this.state?.IsRemaiNCalories === null ? 0 : parseInt(this.state?.IsRemaiNCalories ?? 0) ?? 0}

                    {" "} KCAL
                  </Text>
                  <Text style={{ color: '#8D8D8D', fontSize: 12, width: wp(27), left: 5, alignSelf: 'flex-end' }}>{parseFloat(this?.props?.totalDailyKCal).toFixed(0)} KCAL</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 18,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginTop: 5,
                  marginBottom: 15
                }}
              >
                <View style={styles.CalView}>
                  <Text style={styles.textstyle}>{I18n.t('WeeklyGoal')} :</Text>
                </View>
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: "lightgray",
                    // borderWidth: 1,
                    width: "40%",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      backgroundColor: Colors.green,
                      // width: `${Math.round(this.state.isWeeklyPercent) > 100 ? 100 : Math.round(this.state.isWeeklyPercent) ?? 0} %`,
                      width: `${this.state.WEEKMINUS / parseFloat(this?.props?.totalWeeklyKCal).toFixed(0) * 100 ?? 0} %`,
                      height: 16,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {/* {this.state.isWeeklyPercent === NaN ||
                      this.state.isWeeklyPercent === undefined
                      ? 0
                      : parseFloat(this.state.WEEKMINUS / parseFloat(this?.props?.totalWeeklyKCal).toFixed(0) * 100 > 100 ? '100 +' : this.state.WEEKMINUS / parseFloat(this?.props?.totalWeeklyKCal).toFixed(0) * 100 ?? 0).toFixed(0)
                    }
                    % */}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text numberOfLines={1} style={{ fontSize: 15, width: wp(27), left: 5, fontWeight: "600", alignSelf: 'flex-end' }}>
                    {parseInt((Math.round(this?.props?.totalWeeklyKCal) - 1) - (this.state.WEEKMINUS)).toFixed(0)}
                    {" "} KCAL
                  </Text>
                  <Text style={{ color: '#8D8D8D', fontSize: 12, width: wp(27), left: 5, alignSelf: 'flex-end' }}>{Math.round(this?.props?.totalWeeklyKCal) - 1} KCAL</Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 10, paddingTop: 18, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee' }}>
              <View style={styles.section}>
                <View style={{}}>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: hp(1),
                      marginVertical: "2%",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row", }}>
                      <Text style={[styles.infoName]}>{I18n.t('NutritionInfo')}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          ProgressHide: !this.state.ProgressHide,
                        });
                      }}
                    >
                      <Icon
                        name={
                          this.state.ProgressHide === true
                            ? "keyboard-arrow-up"
                            : "keyboard-arrow-down"
                        }
                        type="material"
                        color="#517fa4"
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    {this.state?.ProgressHide === true ? (
                      <>
                        {this.state.activestatus == "today" ?
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: 15,
                              alignSelf: 'center',
                              marginLeft: 10
                            }}
                          >


                            <View
                              style={{ flexDirection: "column", marginTop: "3%", marginRight: 10 }}
                            >
                              <ProgressCircle
                                percent={this.state?.carbs}
                                radius={50}
                                borderWidth={4}
                                color={Colors.green}
                                shadowColor="#F0F0F0"
                                bgColor="#fff"
                              >
                                <Text
                                  style={{
                                    fontSize: hp("2.6%"),
                                    color: Colors.green,
                                    fontWeight: "600",
                                  }}
                                >
                                  {this.state?.carbs} g
                                </Text>
                              </ProgressCircle>
                              <Text style={[styles.carbsText, { marginTop: 5, fontWeight: 'bold' }]}>{I18n.t('CARBS')}</Text>
                            </View>

                            <View style={{ flexDirection: "column", marginTop: "3%" }}>
                              <ProgressCircle
                                percent={this.state?.protien}
                                radius={50}
                                borderWidth={4}
                                color={Colors.green}
                                shadowColor="#F0F0F0"
                                bgColor="#fff"
                              >
                                <Text
                                  style={{
                                    fontSize: hp("2.6%"),
                                    color: Colors.green,
                                    fontWeight: "600",
                                  }}
                                >
                                  {this.state?.protien} g
                                </Text>
                              </ProgressCircle>
                              <Text style={[styles.carbsText, { marginTop: 5, fontWeight: 'bold' }]}>{I18n.t('PROTEIN')}</Text>
                            </View>

                            <View
                              style={{ flexDirection: "column", marginTop: "3%", marginLeft: 10 }}
                            >
                              <ProgressCircle
                                percent={this.state?.fat}
                                radius={50}
                                borderWidth={4}
                                color={Colors.green}
                                shadowColor="#F0F0F0"
                                bgColor="#fff"
                              >
                                <Text
                                  style={{
                                    fontSize: hp("2.6%"),
                                    color: Colors.green,
                                    fontWeight: "600",
                                  }}
                                >
                                  {this.state?.fat} g
                                </Text>
                              </ProgressCircle>
                              <Text style={[styles.carbsText, { marginTop: 5, fontWeight: 'bold' }]}>{I18n.t('FAT')}</Text>
                            </View>

                          </View>
                          :

                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: 15,
                              alignSelf: 'center',
                              marginLeft: 10
                            }}
                          >


                            <View
                              style={{ flexDirection: "column", marginTop: "3%", marginRight: 10 }}
                            >
                              <ProgressCircle
                                percent={this.state?.Wcarbs}
                                radius={50}
                                borderWidth={4}
                                color={Colors.green}
                                shadowColor="#F0F0F0"
                                bgColor="#fff"
                              >
                                <Text
                                  style={{
                                    fontSize: hp("2.6%"),
                                    color: Colors.green,
                                    fontWeight: "600",
                                  }}
                                >
                                  {this.state?.Wcarbs} g
                                </Text>
                              </ProgressCircle>
                              <Text style={[styles.carbsText, { marginTop: 5, fontWeight: 'bold' }]}>{I18n.t('CARBS')}</Text>
                            </View>

                            <View style={{ flexDirection: "column", marginTop: "3%" }}>
                              <ProgressCircle
                                percent={this.state?.Wprotien}
                                radius={50}
                                borderWidth={4}
                                color={Colors.green}
                                shadowColor="#F0F0F0"
                                bgColor="#fff"
                              >
                                <Text
                                  style={{
                                    fontSize: hp("2.6%"),
                                    color: Colors.green,
                                    fontWeight: "600",
                                  }}
                                >
                                  {this.state?.Wprotien} g
                                </Text>
                              </ProgressCircle>
                              <Text style={[styles.carbsText, { marginTop: 5, fontWeight: 'bold' }]}>{I18n.t('PROTEIN')}</Text>
                            </View>

                            <View
                              style={{ flexDirection: "column", marginTop: "3%", marginLeft: 10 }}
                            >
                              <ProgressCircle
                                percent={this.state?.Wfat}
                                radius={50}
                                borderWidth={4}
                                color={Colors.green}
                                shadowColor="#F0F0F0"
                                bgColor="#fff"
                              >
                                <Text
                                  style={{
                                    fontSize: hp("2.6%"),
                                    color: Colors.green,
                                    fontWeight: "600",
                                  }}
                                >
                                  {this.state?.Wfat} g
                                </Text>
                              </ProgressCircle>
                              <Text style={[styles.carbsText, { marginTop: 5, fontWeight: 'bold' }]}>{I18n.t('FAT')}</Text>
                            </View>

                          </View>


                          // <View
                          //   style={{
                          //     flexDirection: "row",
                          //     justifyContent: "center",
                          //     alignItems: "center",
                          //     marginBottom: 15,
                          //     alignSelf: 'center',
                          //     marginLeft: 10
                          //   }}
                          // >
                          //   <View
                          //     style={{ flexDirection: "column", marginTop: "3%" }}
                          //   >
                          //     <ProgressCircle
                          //       percent={this.state?.Wcarbs}
                          //       radius={hp("6.5%")}
                          //       borderWidth={4}
                          //       color={Colors.green}
                          //       shadowColor="#F0F0F0"
                          //       bgColor="#fff"
                          //     >
                          //       <Text
                          //         style={{
                          //           fontSize: hp("2.6%"),
                          //           color: Colors.green,
                          //           fontWeight: "600",
                          //         }}
                          //       >
                          //         {this.state?.Wcarbs} g
                          //       </Text>
                          //     </ProgressCircle>
                          //     <Text style={styles.carbsText}>{I18n.t('CARBS')}</Text>
                          //   </View>
                          //   <View style={{ flexDirection: "column", margin: "3%" }}>
                          //     <ProgressCircle
                          //       percent={this.state?.Wprotien}
                          //       radius={hp("6.5%")}
                          //       borderWidth={4}
                          //       color={Colors.green}
                          //       shadowColor="#F0F0F0"
                          //       bgColor="#fff"
                          //     >
                          //       <Text
                          //         style={{
                          //           fontSize: hp("2.6%"),
                          //           color: Colors.green,
                          //           fontWeight: "600",
                          //         }}
                          //       >
                          //         {this.state?.Wprotien} g
                          //       </Text>
                          //     </ProgressCircle>
                          //     <Text style={styles.carbsText}>{I18n.t('PROTEIN')}</Text>
                          //   </View>
                          //   <View
                          //     style={{ flexDirection: "column", marginTop: "3%" }}
                          //   >
                          //     <ProgressCircle
                          //       percent={this.state?.Wfat}
                          //       radius={hp("6.5%")}
                          //       borderWidth={4}
                          //       color={Colors.green}
                          //       shadowColor="#F0F0F0"
                          //       bgColor="#fff"
                          //     >
                          //       <Text
                          //         style={{
                          //           fontSize: hp("2.6%"),
                          //           color: Colors.green,
                          //           fontWeight: "600",
                          //         }}
                          //       >
                          //         {this.state?.Wfat} g
                          //       </Text>
                          //     </ProgressCircle>
                          //     <Text style={styles.carbsText}>{I18n.t('FAT')}</Text>
                          //   </View>
                          // </View>
                        }

                        <View style={styles.gendermain}>
                          <TouchableOpacity
                            onPress={() => {
                              this.dailyneutrions();
                              this.setState({
                                activestatus: "today",
                              });
                            }}
                            style={[
                              styles.heightbuttons,
                              styles.borderRadiusLeft,
                              // this.state.unit == 'today' ? styles.selectedbutton : {},
                            ]}
                          >
                            <Text
                              style={{
                                color:
                                  this.state?.activestatus == "today"
                                    ? "#000"
                                    : "#999",
                              }}
                            >
                              {I18n.t('today')}
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity

                            onPress={() => {
                              {
                                this.state.disable == true ? null :
                                  this.weeklyneutrions('');
                                this.setState({ disable: true })
                                this.setState({
                                  activestatus: "week",
                                });
                              }

                            }}
                            style={[
                              styles.heightbuttons,
                              styles.borderRadiusRight,
                              // this.state.unit == 'week' ? styles.selectedbutton : {},
                            ]}
                          >
                            <Text
                              style={{
                                color:
                                  this.state.activestatus == "week"
                                    ? "#000"
                                    : "#999",
                              }}
                            >
                              {I18n.t('Weekly')}
                            </Text>
                          </TouchableOpacity>

                        </View>
                      </>
                    ) : null}

                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 10, paddingTop: 18, paddingBottom: 15, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee' }}>

              <View style={[styles.headerGoalStyle, { flexDirection: 'row', padding: 10, paddingTop: 0, paddingBottom: 10 }]}>
                <View style={{ width: '80%' }}>
                  <Text style={[styles.headerGoalText, { marginLeft: 20, fontSize: 18 }]}>
                    {I18n.t('logcal')}
                  </Text>
                </View>
                <View style={{ width: '20%' }}>
                  <View style={{ width: '100%' }}>
                    <TouchableOpacity onPress={() => this.setState({ msgpopup2: true })} style={{ width: 30, marginRight: 20, alignSelf: 'flex-end', marginTop: 0 }}>
                      <Image style={{ width: 20, height: 20, alignSelf: 'flex-end' }} source={require('../../../Assets/Images/info.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

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
                    onPress={async () => {
                      this.addDailyActivity("breakfast")

                    }}
                  >
                    <ImageBackground
                      imageStyle={{ borderRadius: 15 }}
                      resizeMode={"cover"}
                      source={require("./../../../Assets/Today/breakfastBackgroundNew.png")}
                      style={{
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: 15,
                        height: Responsive.height(100),
                      }}
                    >
                      <CommonImage calories={this.state.breakfastData ?? 0} />
                      <View style={{ marginHorizontal: "10%" }}>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: hp("2.1%"),
                            // textAlign:'center',
                            fontWeight: "600",
                          }}
                        >
                          {I18n.t('BREAKFAST')}
                        </Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.gender}
                    onPress={() =>
                      this.addDailyActivity("lunch")}
                  >
                    <ImageBackground
                      resizeMode={"cover"}
                      imageStyle={{ borderRadius: 15 }}
                      source={require("./../../../Assets/Today/lunchBackgroundNew.png")}
                      style={{
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: 15,
                        height: Responsive.height(100),
                      }}
                    >
                      <CommonImage calories={this.state.lunchData ?? 0} />
                      <View style={{ marginHorizontal: "10%" }}>
                        <Text
                          style={{
                            // textAlign:'center',
                            color: "#fff",
                            fontSize: hp("2.1%"),
                            fontWeight: "600",
                          }}
                        >
                          {I18n.t('LUNCH')}
                        </Text>
                        {/* <Text
                        style={{
                          fontSize: hp("1.1%"),
                          color: "#fff",
                        }}
                      >
                        Didn't find the items in previous lists? No problem
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
                  <TouchableOpacity
                    style={styles.gender}
                    onPress={() => this.addDailyActivity("dinner")}
                  >
                    <ImageBackground
                      resizeMethod={'auto'}
                      source={require("./../../../Assets/Today/dinnerBackgroundNew.png")}
                      style={{
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: 15,
                        // resizeMode: 'contain',
                        height: Responsive.height(100),
                      }}
                    >
                      <CommonImage calories={this.state.dinnerData ?? 0} />
                      <View style={{ marginHorizontal: "10%" }}>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: hp("2.1%"),
                            fontWeight: "600",
                          }}
                        >
                          {I18n.t('DINNER')}
                        </Text>
                        {/* <Text
                        style={{
                          fontSize: hp("1.1%"),
                          color: "#fff",
                        }}
                      >
                        Didn't find the items in previous lists? No problem
                      </Text> */}
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.gender}
                    onPress={() => this.addDailyActivity("snack")}
                  >
                    <ImageBackground
                      resizeMode={"cover"}
                      source={require("./../../../Assets/Today/snackBackgroundNew.png")}
                      style={{
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: 12,
                        height: Responsive.height(99),
                      }}
                    >
                      <CommonImage calories={this.state.snackData ?? 0} />
                      {/* <Image
                      source={require("./../../../Assets/Today/plusIcon.png")}
                      style={{
                        width: Responsive.height(50),
                        height: Responsive.height(50),
                      }}
                    /> */}
                      <View style={{ marginHorizontal: "10%" }}>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: hp("2.1%"),
                            fontWeight: "600",
                          }}
                        >
                          {I18n.t('SNACKS')}
                        </Text>
                        {/* <Text
                        style={{
                          fontSize: hp("1.1%"),
                          color: "#fff",
                        }}
                      >
                        Didn't find the items in previous lists? No problem
                      </Text> */}
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 10, paddingTop: 18, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee' }}>

              <View style={{ flexDirection: 'row', paddingLeft: 20, marginVertical: 0 }}>
                <View style={{ width: '78%' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: -5 }}>{I18n.t('YourWorkoutGoal')}</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <TouchableOpacity onPress={() => this.move()}>
                    <Text style={{ fontSize: 15, marginTop: 5, color: '#9E9F9D', }}>{I18n.t('ViewAll')}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 10 }}>
                <View style={{ width: '10%', paddingTop: 7, marginLeft: 5 }}>
                  <Image style={{ width: 30, height: 30, marginLeft: 15, marginTop: -3, alignSelf: 'flex-end' }} source={require('../../../Assets/body.png')} />
                </View>
                <View style={{ width: '70%', paddingLeft: 0 }}>
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={{ height: hp(5), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>


                      {
                        this.state.show == true ?
                          [...Array(this.state.RemainActivity ?? 0)].map((u, i) => {
                            return <View>
                              <Image style={{ width: 20, height: 20, marginLeft: 6, marginRight: 6 }} source={require('../../../Assets/Today/target_mark.png')} />
                            </View>
                          }) : null
                      }


                      {
                        this.state.show == true ?
                          [...Array(this.state.WorkoutRemainActivity ?? 0)].map((u, i) => {
                            return <View>
                              <Image style={{ width: 20, height: 20, marginLeft: 6, marginRight: 6 }} source={require('../../../Assets/Today/target_mark.png')} />
                            </View>
                          }) : null
                      }

                      {this.state.RemainActivity > this.state.workoutQuantity ?
                        null
                        :
                        this.state.show == true ?
                          [...Array(this.state.workoutQuantity - this.state.RemainActivity - this.state.WorkoutRemainActivity ?? 0)].map((u, i) => {
                            return <View>
                              <Image style={{ width: 20, height: 20, marginLeft: 6, marginRight: 6 }} source={require('../../../Assets/Today/target.png')} />
                            </View>
                          }) : null
                      }
                    </View>

                  </ScrollView>
                </View>
                <View style={{ width: '15%', justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'flex-end' }}>{this.props?.userdetail?.RemainActivity + this.state.WorkoutRemainActivity} / {this.props?.userdetail?.WorkQuantity}</Text>
                </View>
              </View>

            </View>

            <View style={{ marginTop: -5, paddingTop: 18, borderRadius: 10 }}>

              <TouchableOpacity onPress={() => this.props.navigation.navigate("WorkOut")}>
                <ImageBackground
                  resizeMode={"cover"}
                  source={require("./../../../Assets/Today/workoutBackground.png")}
                  imageStyle={{ borderRadius: 15 }}
                  style={[styles.weeklyImage, { marginLeft: 2, width: '99%', justifyContent: 'center' }]}
                >
                  <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: hp("2.6%"), color: "white", fontWeight: "500", letterSpacing: 2 }}  >
                      {I18n.t('TRAININGPROGRAMS')}{" "}
                    </Text>
                    <View style={{ backgroundColor: Colors.green, width: 120, borderRadius: 5, marginTop: 8 }}>
                      <Text style={{ color: "#ffffff", padding: 5, alignSelf: 'center' }}>{I18n.t('Viewnow')}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

            </View>

            <View style={{ marginTop: -5, paddingTop: 18, borderRadius: 10 }}>

              <TouchableOpacity onPress={() => this.props.navigation.navigate("Recipes")}>
                <ImageBackground
                  resizeMode={"cover"}
                  source={require("./../../../Assets/Today/mealBackground.jpeg")}
                  imageStyle={{ borderRadius: 15 }}
                  style={[styles.weeklyImage, { marginLeft: 2, width: '99%', justifyContent: 'center' }]}
                >
                  <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: hp("2.6%"), color: "white", fontWeight: "500", letterSpacing: 2 }}  >
                      {I18n.t('plan')}{" "}
                    </Text>
                    <View style={{ backgroundColor: Colors.green, width: 120, borderRadius: 5, marginTop: 8 }}>
                      <Text style={{ color: "#ffffff", padding: 5, alignSelf: 'center' }}>{I18n.t('Viewnow')}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>

            </View>

            <View style={{ marginTop: 10, paddingTop: 10, paddingBottom: 10, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee' }}>

              {
                this.props.blogsList?.length === 0 ? null :
                  <View style={{ height: heightPercentageToDP('37') }}>
                    <View style={styles.headerGoalText}>
                      <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, marginLeft: 13 }}>{I18n.t('Articlesguides')}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("BlogListView")
                        }
                        style={{
                          marginTop: Responsive.height(10),
                          marginLeft: 'auto',
                          marginRight: 10,
                        }}>
                        <Text
                          style={{
                            color: '#9E9F9D',
                            fontSize: 15,
                            fontWeight: '500',
                          }}>
                          {I18n.t('ViewAll')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                      <FlatList
                        horizontal
                        scrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => (
                          <View
                            style={{
                              borderColor: '#707070',
                              opacity: 0.2,
                              alignSelf: 'center',
                            }}
                          />
                        )}
                        data={this.props.blogsList}
                        // data={this.state.postdata?.data}
                        renderItem={({ item, index }) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                this.props.navigation.navigate('TodayDetail', {
                                  blogItem: item,
                                })
                              }}>
                              {item.featureImage !== undefined && (
                                <PostItem
                                  item={item}
                                  index={index}
                                  isdetailhide={true}
                                  that={this}
                                  Language={deviceLanguage}
                                />
                              )}
                            </TouchableOpacity>
                          )
                        }}
                        keyExtractor={(item, index) => item + index.toString()}
                      />
                    </View>
                  </View>
              }

            </View>

          </View>

          <View style={{ marginTop: 20 }}></View>

        </ScrollView>

        <Modal
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => this.setState({ modal: false })}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View>
              <View style={{ backgroundColor: '#ffffff', height: '100%' }}>

                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                  <TouchableOpacity onPress={() => this.setState({ modal: false })} style={{ width: '20%' }}>
                    <Image style={{ width: 40, height: 40 }} source={require('../../../Assets/Today/backButton.png')} />
                  </TouchableOpacity>
                  <View style={{ width: '70%' }}>
                    <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 60, fontWeight: 'bold', color: '#58595B' }}>{I18n.t('Overview')}</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <TouchableOpacity onPress={() => this.setState({ modal: false, msgpopupoverview: true })} style={{ width: 30, alignSelf: 'flex-start', marginTop: 0 }}>
                      <Image style={{ width: 20, height: 20, marginTop: 13 }} source={require('../../../Assets/Images/info.png')} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ marginTop: 50 }}>

                  <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 30 }}>{I18n.t('Yourweeklyachievement')}</Text>

                  <View style={{ marginHorizontal: 7 }}>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                      <View style={{ width: '10%', paddingTop: 7 }}>
                        <Image style={{ width: 30, height: 30, marginLeft: 15, marginTop: -3, alignSelf: 'flex-end' }} source={require('../../../Assets/body.png')} />
                        {/* <Icon style={{ marginLeft: 15, alignSelf: 'flex-end' }} name="human-handsup" type="material-community" /> */}
                      </View>
                      <View style={{ width: '80%', paddingLeft: 5 }}>
                        <ScrollView horizontal>


                          <View style={{ height: hp(5), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>

                            {
                              this.state.show == true ?
                                [...Array(this.state.RemainActivity ?? 0)].map((u, i) => {
                                  return <View>
                                    <Image style={{ width: 20, height: 20, marginLeft: 6, marginRight: 6 }} source={require('../../../Assets/Today/target_mark.png')} />
                                  </View>
                                }) : null
                            }

                            {
                              this.state.show == true ?
                                [...Array(this.state.WorkoutRemainActivity ?? 0)].map((u, i) => {
                                  return <View>
                                    <Image style={{ width: 20, height: 20, marginLeft: 6, marginRight: 6 }} source={require('../../../Assets/Today/target_mark.png')} />
                                  </View>
                                }) : null
                            }

                            {this.state.RemainActivity > this.state.workoutQuantity ?
                              null
                              :
                              this.state.show == true ?
                                [...Array(this.state.workoutQuantity - this.state.RemainActivity - this.state.WorkoutRemainActivity ?? 0)].map((u, i) => {
                                  return <View>
                                    <Image style={{ width: 20, height: 20, marginLeft: 6, marginRight: 6 }} source={require('../../../Assets/Today/target.png')} />
                                  </View>
                                }) : null

                            }
                          </View>


                        </ScrollView>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>
                      <Text style={{ alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold', marginRight: 10, color: '#58595B' }}>{this.props?.userdetail?.RemainActivity + this.state.WorkoutRemainActivity} / {this.props?.userdetail?.WorkQuantity}</Text>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#58595B' }}>{I18n.t('WORKOUTS')}</Text>
                    </View>
                  </View>

                </View>

                <View style={{ marginTop: 50 }}>

                  <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 16, letterSpacing: 3, color: '#BFBFBF', marginBottom: 30 }}>{I18n.t('THISWEEKSPROGRESS')}</Text>

                  <View style={{ marginHorizontal: 20 }}>

                    <View style={{ marginTop: 10 }}>

                      <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '60%' }}>
                          <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#BFBFBF', alignSelf: 'flex-start', marginBottom: 15 }}>{I18n.t('OtherWorkouts')}</Text>
                        </View>
                        <View style={{ width: '40%' }}>
                          <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#000000', alignSelf: 'flex-end', marginBottom: 15 }}>{parseFloat(dailycal1).toFixed(0)} {I18n.t('CAL')}</Text>
                        </View>
                      </View>

                      <View style={{ width: '100%' }}>

                        <Text style={{ color: '#ffffff' }}>{this.state.RemainActivity}</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                          <View style={{ height: hp(5), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10 }}>
                            {
                              this.state.show == true ?
                                [...Array(this.state.RemainActivity ?? 0)].map((u, i) => {
                                  return <View>
                                    <Image style={{ width: 20, height: 20, marginLeft: 6, marginRight: 6 }} source={require('../../../Assets/Today/target_mark.png')} />
                                  </View>
                                }) : null
                            }

                            {this.state.RemainActivity > this.state.workoutQuantity ?
                              null
                              :
                              this.state.show == true ?
                                [...Array(this.state.workoutQuantity - this.state.RemainActivity ?? 0)].map((u, i) => {
                                  return <View>
                                    <Image style={{ width: 20, height: 20, marginLeft: 6, marginRight: 6 }} source={require('../../../Assets/Today/target.png')} />
                                  </View>
                                }) : null

                            }
                          </View>

                        </ScrollView>
                      </View>

                    </View>

                    <View style={{ marginTop: 10 }}>

                      <View style={{ width: '100%' }}>

                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ width: '60%' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#BFBFBF', alignSelf: 'flex-start', marginRight: 8, marginBottom: 10, marginTop: 15 }}>{I18n.t('Workouts')}</Text>
                          </View>
                          <View style={{ width: '40%' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#000000', alignSelf: 'flex-end', marginTop: 15 }}>{BURNCALWORKOT} {I18n.t('CAL')}</Text>
                          </View>
                        </View>

                        <ScrollView showsHorizontalScrollIndicator={false} horizontal>

                          <View style={{ height: hp(5), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10 }}>

                            {
                              this.state.show == true ?
                                [...Array(this.state.WorkoutRemainActivity ?? 0)].map((u, i) => {
                                  return <View>
                                    <Image style={{ width: 20, height: 20, marginLeft: 6, marginRight: 6 }} source={require('../../../Assets/Today/target_mark.png')} />
                                  </View>
                                }) : null
                            }

                            {this.state.WorkoutRemainActivity > this.state.workoutQuantity ?
                              null
                              :
                              this.state.show == true ?
                                [...Array(this.state.workoutQuantity - this.state.WorkoutRemainActivity ?? 0)].map((u, i) => {
                                  return <View>
                                    <Image style={{ width: 20, height: 20, marginLeft: 6, marginRight: 6 }} source={require('../../../Assets/Today/target.png')} />
                                  </View>
                                }) : null

                            }

                          </View>

                        </ScrollView>
                      </View>
                    </View>

                  </View>

                </View>

              </View>
            </View>
          </SafeAreaView>
        </Modal>

        <Modal
          transparent={true}
          visible={this.state.msgpopup}
          onRequestClose={() => this.setState({ msgpopup: false })}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View>
              <View style={{ backgroundColor: '#ffffff', height: '100%' }}>

                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                  <TouchableOpacity onPress={() => this.setState({ msgpopup: false })} style={{ width: '20%' }}>
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
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('POP1d1')}</Text>
                </View>

                <View style={{ marginTop: 10, padding: 20 }}>
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('POP1d2')}</Text>
                </View>

                <View style={{ marginTop: 10, padding: 20 }}>
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('POP1d3')}</Text>
                </View>

                <View style={{ width: 130, alignSelf: 'center', borderTopColor: '#000000', borderTopWidth: 2, paddingTop: 10 }}>
                  <Text style={{ alignSelf: 'center', color: '#8D8D8D', fontSize: 15 }}>{I18n.t('POP1d4')}</Text>
                </View>

              </View>
            </View>
          </SafeAreaView>
        </Modal>

        <Modal
          transparent={true}
          visible={this.state.msgpopup2}
          onRequestClose={() => this.setState({ msgpopup2: false })}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View>
              <View style={{ backgroundColor: '#ffffff', height: '100%' }}>

                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                  <TouchableOpacity onPress={() => this.setState({ msgpopup2: false })} style={{ width: '20%' }}>
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
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('POP2d1')}</Text>
                </View>

                <View style={{ marginTop: 10, padding: 20 }}>
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('POP2d2')}</Text>
                </View>

                <View style={{ marginTop: 10, padding: 20 }}>
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('POP2d3')}</Text>
                </View>

                <View style={{ width: 130, alignSelf: 'center', borderTopColor: '#000000', borderTopWidth: 2, paddingTop: 10 }}>
                  <Text style={{ alignSelf: 'center', color: '#8D8D8D', fontSize: 15 }}>{I18n.t('POP2d4')}</Text>
                </View>

              </View>
            </View>
          </SafeAreaView>
        </Modal>

        <Modal
          transparent={true}
          visible={this.state.msgpopupoverview}
          onRequestClose={() => this.setState({ msgpopupoverview: false, modal: true })}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View>
              <View style={{ backgroundColor: '#ffffff', height: '100%' }}>

                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                  <TouchableOpacity onPress={() => this.setState({ msgpopupoverview: false, modal: true })} style={{ width: '20%' }}>
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
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('OVPOP1d1')}</Text>
                </View>

                <View style={{ marginTop: -20, padding: 20 }}>
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('OVPOP1d2')}</Text>
                </View>

                <View style={{ marginTop: -20, padding: 20 }}>
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('OVPOP1d3')}</Text>
                </View>

                <View style={{ marginTop: -20, padding: 20 }}>
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('OVPOP1d4')}</Text>
                </View>

                <View style={{ width: 130, alignSelf: 'center', borderTopColor: '#000000', borderTopWidth: 2, paddingTop: 10 }}>
                  <Text style={{ alignSelf: 'center', color: '#8D8D8D', fontSize: 15 }}>{I18n.t('POP1d4')}</Text>
                </View>

              </View>
            </View>
          </SafeAreaView>
        </Modal>


      </SafeAreaView >
    );
  }
}

function mapStateToProps(state) {
  return {
    blogsList: state.BLOG_LIST_SHOW.blogsList,
    userName: state.USER_DATA_NAME.userDataName,
    token: state.SESSION_KEY.sessionKey,
    totalDailyKCal: state.UPDATE_USERDETAIL.totalDailyKCal,
    totalWeeklyKCal: state.UPDATE_USERDETAIL.totalWeeklyKCal,

    recipesList: state.RECIPES_LIST_SHOW.recipesList,
    workoutsList: state.WORKOUTS_LIST_SHOW.workoutsList,
    productsList: state.WORKOUTS_LIST_SHOW.productsList,
    userSubscription: state.USER_SUBSCRIPTION.userSubscription,
    totalcalories: state.featuse?.totalcalories,
    breakfastActive: state.BREAKFAST_ACTIVE.breakfastActive,
    breakfastDailyActivity:
      state.BREAKFAST_DAILY_ACTIVITY.breakfastDailyActivity,
    lunchActive: state.LUNCH_ACTIVE.lunchActive,
    lunchDailyActivity: state.LUNCH_DAILY_ACTIVITY.lunchDailyActivity,
    dinnerActive: state.DINNER_ACTIVE.dinnerActive,
    dinnerDailyActivity: state.DINNER_DAILY_ACTIVITY.dinnerDailyActivity,
    snackActive: state.SNACK_ACTIVE.snackActive,
    snackDailyActivity: state.SNACK_DAILY_ACTIVITY.snackDailyActivity,
    userId: state.USER_DATA?.user?._id,
    remaincalories: state.featuse,
    userdetail: state.UPDATE_USERDETAIL.userdetail,
    breakfastData: state.BREAKFAST_CALORIES.breakfastData,
    lunchData: state.LUNCH_CALORIES.lunchData,
    dinnerData: state.DINNER_CALORIES.dinnerData,
    snackData: state.SNACK_CALORIES.snackData,
    RemainCal: state.REMAINING_CALORIES.remainCalories,
  };
}

// const { burncalories, totalcalories, Userweightdata } = useSelector(
//   (state) => state.featuse
// );

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Today);
