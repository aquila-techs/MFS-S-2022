import { createStackNavigator } from 'react-navigation-stack';
import Options from './Options';
import Settings from './Settings';
import profile from './Settings/profile';
import Account from './Settings/Account';

import updateName from './Settings/Profile/updateName'
import updateAge from './Settings/Profile/updateAge'
import updateGender from './Settings/Profile/updateGender'
import updateHeight from './Settings/Profile/updateHeight'

import updateEmail from './Settings/Account/updateEmail'
import updatePassword from './Settings/Account/updatePassword'
import updateLanguage from './Settings/Account/updateLanguage'
import updateUnit from './Settings/Account/updateUnit'
import updateNotification from './Settings/Account/updateNotification'
import updateIntegration from './Settings/Account/updateIntegration'

import Subscription from './Settings/Subscription'
import AboutMyFit from './Settings/AboutMyFit'




import IconF from 'react-native-vector-icons/FontAwesome5';
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';


const OptionsNavigator = createStackNavigator({


	Options: {
		screen: Options,
		navigationOptions: {
			header: null
		}
		// navigationOptions: {
		// 	headerTitle: '',
		// 	headerTitleStyle: {
		// 		alignSelf:'center',
		// 		fontSize: 16,
		// 		fontWeight: 'bold',
		// 		fontStyle: 'normal',
		// 		letterSpacing: 0.26,
		// 		color: '#fff'
		// 	},
		// 	headerStyle: { backgroundColor: '#34C6AA', alignItems:'center', justifyContent:'center' },
		// 	headerTintColor: '#ffbb2e'
		// }
	},
	Settings: {
		screen: Settings,
		navigationOptions: {
			header: null
		}
	
	},
	updateName: {
		screen: updateName,
		navigationOptions: {
			header: null
		}
	
	},
	updateAge: {
		screen: updateAge,
		navigationOptions: {
			header: null
		}
	
	},
	updateGender: {
		screen: updateGender,
		navigationOptions: {
			header: null
		}
	
	},
	updateHeight: {
		screen: updateHeight,
		navigationOptions: {
			header: null
		}
	
	},
	profile: {
		screen: profile,
		navigationOptions: {
			header: null
		}
	
	},
	Account: {
		screen: Account,
		navigationOptions: {
			header: null
		}
	
	},
	updateEmail: {
		screen: updateEmail,
		navigationOptions: {
			header: null
		}
	
	},
	updatePassword: {
		screen: updatePassword,
		navigationOptions: {
			header: null
		}
	
	},
	updateLanguage: {
		screen: updateLanguage,
		navigationOptions: {
			header: null
		}
	
	},
	updateUnit: {
		screen: updateUnit,
		navigationOptions: {
			header: null
		}
	
	},
	updateNotification:{
		screen: updateNotification,
		navigationOptions: {
			header: null
		}
	
	},
	updateIntegration:{
		screen: updateIntegration,
		navigationOptions: {
			header: null
		}
	
	},
	Subscription:{
		screen: Subscription,
		navigationOptions: {
			header: null
		}
	
	},
	AboutMyFit:{
		screen: AboutMyFit,
		navigationOptions: {
			header: null
		}
	
	},
});


OptionsNavigator.navigationOptions = ({ navigation }) => {
	let tabBarVisible;
	if (navigation.state.routes.length > 1) {
	  navigation.state.routes.map(route => {
		if (route.routeName === "Options") {
		  tabBarVisible = false;
		} else {
		  tabBarVisible = false;
		}
	  });
	}
  
	return {
	  tabBarVisible
	};
  };
  

export default OptionsNavigator;