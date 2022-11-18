import { createStackNavigator } from 'react-navigation-stack';
import LogMain from './LogMain';
import IconF from 'react-native-vector-icons/FontAwesome5';
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';


const LogMainNavigator = createStackNavigator({


	LogMain: {
		screen: LogMain,
		navigationOptions: {
			header: null,
			//	mode:'modal',
		}
		// navigationOptions: {
		// 	headerTitle: '',r
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


LogMainNavigator.navigationOptions = ({ navigation }) => {
	let tabBarVisible;
	if (navigation.state.routes.length > 1) {
		navigation.state.routes.map(route => {
			// if (route.routeName === "LogMain") {
			//   tabBarVisible = false;
			// } else {
			//   tabBarVisible = false;
			// }
		});
	}

	return {
		tabBarVisible
	};
};


export default LogMainNavigator;