import { createStackNavigator } from 'react-navigation-stack';
import Meals from './Meals';
import PlanMeal from './PlanMeal';
import StartedMeal from './StartedMeal';
import PackageMeal from './PackageMeal';

import CreateMeal from './CreateMeal';
import IconF from 'react-native-vector-icons/FontAwesome5';
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';
import diet1 from './CreateMeal/diet1';
import foods2 from './CreateMeal/foods2'
import recipes3 from './CreateMeal/recipes3';
import meals4 from './CreateMeal/meals4';
import variety5 from './CreateMeal/variety5';
import plan6 from './CreateMeal/plan6'; 
import loading7 from './CreateMeal/loading7'; 
import localize from '../../translation';



const MealsMainNavigator = createStackNavigator({


	Meals: {
		screen: Meals,
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
	PlanMeal: {
		screen: PlanMeal,
		navigationOptions: {
			header: null
		}
	},
	StartedMeal: {
		screen: StartedMeal,
		navigationOptions: {
			header: null
		}
	},

	diet1: {
		screen: diet1,
		navigationOptions: ({ navigation }) => ({
			title: localize.t('createMeal1'),
			headerTintColor: 'black',
			headerStyle: {
				backgroundColor: 'white',
				//	elevation: 0, // remove shadow on Android
					shadowOpacity: 0.5,
					borderBottomWidth: 0,
				// borderStyle:"solid",
				// borderBottomWidth:7,
				// borderBottomColor:Colors.green,
			  },
		  }),
	},

	foods2: {
		screen: foods2,
		navigationOptions: ({ navigation }) => ({
			title: localize.t('createMeal2'),
			headerTintColor: 'black',
			headerStyle: {
				backgroundColor: 'white',
			//	elevation: 0, // remove shadow on Android
				shadowOpacity: 0.5,
				borderBottomWidth: 0,
			  },
		  }),
	},
	recipes3: {
		screen: recipes3,
		navigationOptions: ({ navigation }) => ({
			title: localize.t('createMeal3'),
			headerTintColor: 'black',
			headerStyle: {
				backgroundColor: 'white',
			//	elevation: 0, // remove shadow on Android
				shadowOpacity: 0.5,
				borderBottomWidth: 0,
			  },
		  }),
	},
	meals4: {
		screen: meals4,
		navigationOptions: ({ navigation }) => ({
			title: localize.t('createMeal4'),
			headerTintColor: 'black',
			headerStyle: {
				backgroundColor: 'white',
			//	elevation: 0, // remove shadow on Android
			shadowOpacity: 0.5,
				borderBottomWidth: 0,
			  },
		  }),
	},
	variety5: {
		screen: variety5,
		navigationOptions: ({ navigation }) => ({
			title: localize.t('createMeal5'),
			headerTintColor: 'black',
			headerStyle: {
				backgroundColor: 'white',
			//	elevation: 0, // remove shadow on Android
				shadowOpacity: 0.5,
				borderBottomWidth: 0,
			  },
		  }),
	},
	plan6: {
		screen: plan6,
		navigationOptions: ({ navigation }) => ({
			title: localize.t('createMeal6'),
			headerTintColor: 'black',
			headerStyle: {
				backgroundColor: 'white',
			//	elevation: 0, // remove shadow on Android
				shadowOpacity: 0.5,
				borderBottomWidth: 0,
			  },
		  }),
	},
	loading7: {
		screen: loading7,
		navigationOptions: {
			header: null
		}
	},

	PackageMeal: {
		screen: PackageMeal,
		navigationOptions: {
			header: null
		}
	},

	
});


MealsMainNavigator.navigationOptions = ({ navigation }) => {
	let tabBarVisible;
	if (navigation.state.routes.length > 1) {
	  navigation.state.routes.map(route => {
		if (route.routeName === "diet1") {
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
  

export default MealsMainNavigator;