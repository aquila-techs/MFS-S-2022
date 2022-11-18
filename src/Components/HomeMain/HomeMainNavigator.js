import { createStackNavigator } from 'react-navigation-stack';
import Home from './Home';
import Today from './Today';
import TodayDetail from './TodayDetail';
import BlogListView from './BlogListView';
import IconF from 'react-native-vector-icons/FontAwesome5';
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';


const HomeMainNavigator = createStackNavigator({


	Home: {
		screen: Today,
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
	Today: {
		screen: Today,
		navigationOptions: {
			header: null
		}
	},
	TodayDetail:{
		screen: TodayDetail,
		navigationOptions: {
			header: null
		}
	},
	BlogListView:{
		screen: BlogListView,
		navigationOptions: {
			header: null
		}
	},
	
});


HomeMainNavigator.navigationOptions = ({ navigation }) => {
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
  

export default HomeMainNavigator;