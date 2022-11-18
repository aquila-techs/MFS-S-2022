import { createStackNavigator } from 'react-navigation-stack';
import Home from './Home';
import IconF from 'react-native-vector-icons/FontAwesome5';
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';


const WorkOutMainNavigator = createStackNavigator({


	Home: {
		screen: Home,
		navigationOptions: {
			headerTitle: 'Work Out',
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

	
});


WorkOutMainNavigator.navigationOptions = ({ navigation }) => {
	let tabBarVisible;
	if (navigation.state.routes.length > 1) {
	  navigation.state.routes.map(route => {
		if (route.routeName === "Home") {
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
  

export default WorkOutMainNavigator;