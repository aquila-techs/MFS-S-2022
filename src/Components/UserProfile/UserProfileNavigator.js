import { createStackNavigator } from '@react-navigation/stack';
import goal from './goal';
import gender from './gender'
import age from './age';
import height from './height';
import weight from './weight';
import recipe from './recipe';
import routineWeight from './routineWeight';
import targetweight from './targetweight'; 
import routine from './routine';
//import currentfat from './currentfat';
import Colors from '../../Theme/Colors'
import localize from '../../translation';


const UserProfileNavigator = createStackNavigator({
	physicalActivity: {
		screen: physicalActivity,
		navigationOptions: ({ navigation }) => ({
			headerShown: false,
			title: localize.t('physicalActivityTitle'),
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
	goal: {
		screen: goal,
		navigationOptions: ({ navigation }) => ({
			headerShown: false,
			title: localize.t('goalTitle'),
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
	recipe: {
		screen: recipe,
		navigationOptions: ({ navigation }) => ({
			headerShown: false,
			title: localize.t('RecipeTitle'),
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
	gender: {
		screen: gender,
		navigationOptions: ({ navigation }) => ({
			headerShown: false,
			title: localize.t('genderTitle'),
			headerTintColor: 'black',
			headerStyle: {
				backgroundColor: 'white',
			//	elevation: 0, // remove shadow on Android
				shadowOpacity: 0.5,
				borderBottomWidth: 0,
			  },
		  }),
	},
	age: {
		screen: age,
		navigationOptions: ({ navigation }) => ({
			headerShown: false,
			title: localize.t('ageTitle'),
			headerTintColor: 'black',
			headerStyle: {
				backgroundColor: 'white',
			//	elevation: 0, // remove shadow on Android
				shadowOpacity: 0.5,
				borderBottomWidth: 0,
			  },
		  }),
	},
	height: {
		screen: height,
		navigationOptions: ({ navigation }) => ({
			headerShown: false,
			title: localize.t('heightTitle'),
			headerTintColor: 'black',
			headerStyle: {
				backgroundColor: 'white',
			//	elevation: 0, // remove shadow on Android
			shadowOpacity: 0.5,
				borderBottomWidth: 0,
			  },
		  }),
	},
	weight: {
		screen: weight,
		navigationOptions: ({ navigation }) => ({
			headerShown: false,
			title: localize.t('weightTitle'),
			headerTintColor: 'black',
			headerStyle: {
				backgroundColor: 'white',
			//	elevation: 0, // remove shadow on Android
			shadowOpacity: 0.5,
				borderBottomWidth: 0,
			  },
		  }),
	},
	
	routine: {
		screen: routine,
	    navigationOptions: ({ navigation }) => ({
			headerShown: false,
			title: localize.t('routineTitle'),
			headerTintColor: 'black',
			headerStyle: {
				backgroundColor: 'white',
			//	elevation: 0, // remove shadow on Android
				shadowOpacity: 0.5,
				borderBottomWidth: 0,
			  },
		  }),
	},


    
});
export default UserProfileNavigator;