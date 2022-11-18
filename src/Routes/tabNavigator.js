// import React, { Component } from 'react';
// import { createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createSwitchNavigator, } from 'react-navigation';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import IconI from 'react-native-vector-icons/Ionicons';

import HomeMainNavigator from '../Components/HomeMain/HomeMainNavigator';
//import UserProfileNavigator from '../Components/UserProfile/UserProfileNavigator'
import LoginSignupNavigator from '../Components/LoginSignupMain/LoginSignupNavigator';
import OptionsNavigator from '../Components/OptionsMain/OptionsNavigator';
import MealsMainNavigator from '../Components/MealsMain/MealsMainNavigator';
import WorkOutMainNavigator from '../Components/WorkOutMain/WorkOutMainNavigator';
import LogMainNavigator from '../Components/LogMain/LogMainNavigator';

import {View} from 'react-native';

// const USER_DATA = 'userData';

// var boolCheck = false;
// class CustomTabsNavigator extends Component {
// 	// Final navigation setup with screens
// 	TabsNavigation;
// 	constructor(props) {
// 		super(props);
// 		// Only this is necessary if you just want to hide/show without change it.
// 	}

// 	componentDidMount() {
// 		const _this = this;
// 		console.log('hey')
// 		AsyncStorage.getItem(USER_DATA)
// 			.then((res) => {
// 				res = JSON.parse(res);
// 				_this._setScreens(res);
// 			})
// 			.catch((err) => { });
// 	}

// 	// This is necessary if you want to hide/show depending on some user behavior
// 	componentDidUpdate(prevProps) {
// 		// Add your condition to avoid infinite renders
// 		if (prevProps.foo === this.props.foo) return;
// 		this._setScreens();
// 	}

// 	// Actual code to show/hide based on props.
// 	_setScreens = (res) => {
// 		const _this = this;
// 		const screens = {};
// 		const settings = {
// 			backBehavior: 'none',
// 			tabBarOptions: {
// 				activeTintColor: '#3db232',
// 				inactiveTintColor: '#c1c1c1',
// 				showLabel: false,
// 				style: {
// 					borderTopWidth: 1,
// 					borderTopColor: '#D3D3D3'
// 				},

// 			},
// 			navigationOptions: {
// 				header: null
// 			}
// 		};

// 		screens.Home = {
// 			screen: HomeMainNavigator,
// 			navigationOptions: {
// 				tabBarIcon: ({ tintColor }) => <Icon name="home" size={24} color={tintColor} />
// 			}
// 		};
// 		_this.TabsNavigation = createBottomTabNavigator(screens, settings);

// 		boolCheck = true;
// 		console.log(_this.TabsNavigation)
// 		_this.forceUpdate();
// 	};

// 	render() {
// 		const { props } = this;
// 		if (boolCheck) {
// 			boolCheck = false;
// 			const NavigatorTabs = createAppContainer(this.TabsNavigation);
// 			return <NavigatorTabs screenProps={{ ...props }} />;
// 		} else {
// 			return null;
// 		}
// 	}
// }

// export default CustomTabsNavigator

import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeMainNavigator,
      navigationOptions: {
        headerTintColor: '#000',
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <IconF name="calendar-o" size={24} color={tintColor} />
        ),
      },
    },
    WorkOut: {
      screen: WorkOutMainNavigator,
      navigationOptions: {
        tabBarLabel: 'Work Out',
        tabBarIcon: ({tintColor}) => (
          <IconF5 name="fire-alt" size={30} color={tintColor} />
        ),
      },
    },
    LogMain: {
      screen: () => null,
      //screen: LogMainNavigator,
      navigationOptions: {
        tabBarLabel: 'Log',
        mode: 'modal',
        tabBarIcon: ({tintColor}) => (
          <IconM name="add-box" size={30} color={tintColor} />
        ),
      },
    },
    Meals: {
      screen: MealsMainNavigator,
      navigationOptions: {
        tabBarLabel: 'Meals',
        tabBarIcon: ({tintColor}) => (
          <IconM name="restaurant" size={30} color={tintColor} />
        ),
      },
    },
    Options: {
      screen: OptionsNavigator,
      navigationOptions: {
        tabBarLabel: 'Options',
        tabBarIcon: ({tintColor}) => (
          <IconM name="person-outline" size={30} color={tintColor} />
        ),
      },
    },

    // UserProfile: {
    // 	screen: UserProfileNavigator,
    // 	navigationOptions: {
    // 		tabBarLabel: 'Home',
    // 		tabBarIcon: ({ tintColor }) => (
    // 			<IconF name="home" size={24} color={tintColor} />
    // 		)
    // 	}
    // },

    // Orders: {
    // 	screen: OrdersMainNavigator,
    // 	navigationOptions: {
    // 		tabBarIcon: ({ tintColor }) => (
    // 			<IconF name="list" size={24} color={tintColor} />
    // 		)
    // 	}
    // },
    // Profile: {
    // 	screen: ProfileMainNavigator,
    // 	navigationOptions: {
    // 		tabBarIcon: ({ tintColor }) => (
    // 			<Icon name="account" size={24} color={tintColor} />
    // 		)
    // 	}
    // },
  },
  {
    tabBarOptions: {
      activeTintColor: '#2570b8',
      inactiveTintColor: '#c3c3c3',
      showLabel: false,
      style: {
        paddingVertical: 5,
      },
    },
    navigationOptions: {
      header: null,
    },
  },
);

export default TabNavigator;
