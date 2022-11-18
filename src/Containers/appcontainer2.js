import React, { Component } from 'react';
import ReactNative from 'react-native';
import { SafeAreaView, PermissionsAndroid, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createRootNavigator } from '../Routes';
import { connect } from 'react-redux';
import { ActionCreators } from '../Actions';
import { bindActionCreators } from 'redux';
import Colors from '../Theme/Colors';
import LottieView from 'lottie-react-native';
const USER_KEY = 'accessToken';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createSwitchNavigator,
  createCompatNavigatorFactory,
} from '@react-navigation/compat';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import IconF5 from 'react-native-vector-icons/FontAwesome5';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import IconI from 'react-native-vector-icons/Ionicons';

import localize from '../../src/translation';
import Splash from '../../src/Components/Splash/splash';
import Login from '../../src/Components/LoginSignupMain/LoginMain/Login';
import beforeSplash from '../../src/Components/Splash/beforeSplash';
import Signup from '../../src/Components/LoginSignupMain/SignupMain/Signup';

//user profile
import goal from '../../src/Components/UserProfile/goal';
import gender from '../../src/Components/UserProfile/gender';
import age from '../../src/Components/UserProfile/age';
import height from '../../src/Components/UserProfile/height';
import weight from '../../src/Components/UserProfile/weight';
import routine from '../../src/Components/UserProfile/routine';

//Home Main
import HomeMain from '../../src/Components/HomeMain/Today';
import TodayDetail from '../../src/Components/HomeMain/TodayDetail';
import BlogListView from '../../src/Components/HomeMain/BlogListView';

let granted;
const { View, StyleSheet } = ReactNative;
const USER_DATA = 'userData';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: true,
      data: [],
      isOnboarding: true,
      animationCompleted: true,
      userType: 'cu',
    };
  }

  checkUserStatus() {
    // get user data from async storage
    AsyncStorage.multiGet([USER_KEY, USER_DATA])
      .then(res => {
        if (res !== null) {
          var data = {
            accessToken: null,
            userData: null,
          };
          res.forEach((item, index) => {
            if (item[0] == 'accessToken') {
              data.accessToken = JSON.parse(item[1]);
            } else if (item[0] == 'userData') {
              data.userData = JSON.parse(item[1]);
            }
          });

          if (data.accessToken == null) {
            this.setState({ signedIn: false, isOnboarding: false });
          } else {
            this.props.setUserDataAction(data).then(status => {
              if (status.status) {
                this.props.checkSessionStatus(data.accessToken).then(res => {
                  if (res.status) {
                    if (
                      data.userData.t == 'b' &&
                      !res.data.isAssociatedWithShop
                    ) {
                      this.setState({
                        signedIn: true,
                        data: data.userData,
                        isOnboarding: false,
                        selectShop: true,
                      });
                    } else {
                      this.setState({
                        signedIn: true,
                        data: data.userData,
                        selectShop: false,
                        approvedByShop: true,
                        blocked: false,
                      });
                    }
                  }
                });
              }
            });
          }
        } else {
          this.setState({ signedIn: false, isOnboarding: false });
        }
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    // Geolocation.stopObserving()
  }
  componentDidMount() {
    // alert('aa')
    //  this.checkUserStatus()
  }

  animationCompleted() {
    this.setState({
      animationCompleted: true,
    });
  }

  componentWillReceiveProps(next) {
    if (this.props.shouldReload != next.shouldReload) {
      this.checkUserStatus();
    }
  }

  render() {
    const HomeStack = createStackNavigator();
    function HomeStackScreen() {
      return (
        <HomeStack.Navigator>
          <HomeStack.Screen
            name="Home"
            component={HomeMain}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="TodayDetail"
            component={TodayDetail}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="BlogListView"
            component={BlogListView}
            options={{ headerShown: false }}
          />
        </HomeStack.Navigator>
      );
    }
    const WorkOutStack = createStackNavigator();
    function WorkOutStackScreen() {
      return (
        <WorkOutStack.Navigator>
          <WorkOutStack.Screen
            name="WorkOut"
            component={WorkOut}
            options={{ headerShown: false }}
          />
          <WorkOutStack.Screen
            name="WorkoutFilter"
            component={WorkoutFilter}
            options={{ headerShown: false }}
          />
          <WorkOutStack.Screen
            name="WorkOutPreview"
            component={WorkOutPreview}
            options={{ headerShown: false }}
          />
          <WorkOutStack.Screen
            name="PopularAndLists"
            component={PopularAndLists}
            options={{ headerShown: false }}
          />
          <WorkOutStack.Screen
            name="CategoryView"
            component={CategoryView}
            options={{ headerShown: false }}
          />
          <WorkOutStack.Screen
            name="WorkOutDetail"
            component={WorkOutDetail}
            options={{ headerShown: false }}
          />
        </WorkOutStack.Navigator>
      );
    }
    const Tab = createBottomTabNavigator();
    function MyTabs() {
      return (
        <Tab.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            activeTintColor: '#e91e63',
            headerMode: 'none',
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') {
                return <IconF name="calendar-o" size={28} color={color} />;
              } else if (route.name === 'WorkOut') {
                return <IconF5 name="fire-alt" size={28} color={color} />;
              } else if (route.name === 'Logs') {
                return <IconM name={'search'} size={28} color={'#000'} />;
              } else if (route.name === 'Meals') {
                return <IconM name="restaurant" size={28} color={color} />;
              } else if (route.name === 'Profile') {
                return <IconM name="person-outline" size={28} color={color} />;
              }
            },
          })}
          tabBarOptions={{
            showLabel: false,
            showIcon: true,
            activeTintColor: '#2570b8',
            inactiveTintColor: '#c3c3c3',
          }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="WorkOut" component={WorkOutStackScreen} />
        </Tab.Navigator>
      );
    }
    const Stack = createStackNavigator();
    const AuthStack = createCompatNavigatorFactory(createStackNavigator)(
      {
        // beforeSplash: { screen: beforeSplash },
        Splash: { screen: Splash },
        Login: { screen: Login },
        Signup: { screen: Signup },
      },
      { headerMode: 'none' },
    );
    const OnBoardingStack = createCompatNavigatorFactory(createStackNavigator)({
      goal: {
        screen: goal,
        navigationOptions: {
          title: localize.t('goalTitle'),
        },
      },
      gender: {
        screen: gender,
        navigationOptions: {
          title: localize.t('genderTitle'),
        },
      },
      age: {
        screen: age,
        navigationOptions: {
          title: localize.t('ageTitle'),
        },
      },
      height: {
        screen: height,
        navigationOptions: {
          title: localize.t('heightTitle'),
        },
      },
      weight: {
        screen: weight,
        navigationOptions: {
          title: localize.t('weightTitle'),
        },
      },
      routine: {
        screen: routine,
        navigationOptions: {
          title: localize.t('routineTitle'),
        },
      },
    });
    const AppStack = createCompatNavigatorFactory(createStackNavigator)({
      Tab: { screen: MyTabs },
      Home: { screen: HomeStackScreen },
      WorkOut: { screen: WorkOutStackScreen },
    });
    const SwitchNavigator = createSwitchNavigator(
      {
        App: this.state.signedIn
          ? AppStack
          : this.state.isOnboarding
            ? OnBoardingStack
            : AuthStack,
      },
      {
        initialRouteName: 'App',
      },
    );
    // const Layout = createRootNavigator(this.state.signedIn, this.state.isOnboarding, this.state.userType);
    if (!this.state.animationCompleted) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
          }}>
          {/* <LottieView style={{width: wp('40%'), height: hp('40%')}} source={require('../Assets/logo.json')} loop={false} autoPlay onAnimationFinish={() => {this.animationCompleted()}} /> */}
        </View>
      );
    } else {
      if (this.state.signedIn == null || this.state.isOnboarding == null) {
        return null;
      } else {
        console.log('2', this.state.signedIn, this.state.isOnboarding);
        return <SwitchNavigator />;
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    //  shouldReload: state.TABS_STATUS.shouldReload,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
