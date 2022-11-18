import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from '../../src/Reducers';

//import AppContainer from './src/Containers/appContainer';
//import NavigationService from './src/Routes/NavigationService';
import localize from '../../src/translation';
import appContainer from '../../src/Routes';
console.disableYellowBox = true;
import {Button, Text, Image, Modal, ReactNative, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createSwitchNavigator} from '@react-navigation/compat';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createAppContainer} from '@react-navigation/stack';
import {block} from 'react-native-reanimated';

import Splash from '../../src/Components/Splash/splash';
import beforeSplash from '../../src/Components/Splash/beforeSplash';
import Login from '../../src/Components/LoginSignupMain/LoginMain/Login';
import Signup from '../../src/Components/LoginSignupMain/SignupMain/Signup';
import PaymentScreen from '../../src/Screens/PaymentScreen';
import AddProductMeal from '../../src/Components/HomeMain/AddProductMeal';

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

//WorkOut Main
import WorkOut from '../../src/Components/WorkOutMain/Home';
import WorkOutPreview from '../../src/Components/WorkOutMain/WorkOutPreview';
import WorkOutDetail from '../../src/Components/WorkOutMain/WorkOutDetail';
import PopularAndLists from '../../src/Components/WorkOutMain/PopularAndLists';
import CategoryView from '../../src/Components/WorkOutMain/CategoryView';

import Home from '../../src/Screens/LogMain/Home';
import LogMain from '../../src/Components/LogMain/LogMain/index';

//Meals Main
import MealsPlan from '../../src/Components/MealsMain/Meals';
import PackageMeal from '../../src/Components/MealsMain/PackageMeal';
import PlanMeal from '../../src/Components/MealsMain/PlanMeal';
import StartedMeal from '../../src/Components/MealsMain/StartedMeal';
import CreateMeal from '../../src/Components/MealsMain/CreateMeal/index';
import diet1 from '../../src/Components/MealsMain/CreateMeal/diet1';
import foods2 from '../../src/Components/MealsMain/CreateMeal/foods2';
import recipes3 from '../../src/Components/MealsMain/CreateMeal/recipes3';
import meals4 from '../../src/Components/MealsMain/CreateMeal/meals4';
import variety5 from '../../src/Components/MealsMain/CreateMeal/variety5';
import plan6 from '../../src/Components/MealsMain/CreateMeal/plan6';
import loading7 from '../../src/Components/MealsMain/CreateMeal/loading7';
import ViewMeal from '../../src/Components/MealsMain/ViewMeal';

//Add
import AddProduct from '../../src/Components/MealsMain/AddProduct';
import AddMeal from '../../src/Components/MealsMain/AddMeal';
import ViewProduct from '../../src/Components/MealsMain/ViewProduct';
import EditProduct from '../../src/Components/MealsMain/EditProduct';

//Recipes Main
import Recipes from '../../src/Components/RecipesMain/Recipes';
import RecipesDetail from '../../src/Components/RecipesMain/RecipesDetail';
import RecipesSearch from '../../src/Components/RecipesMain/RecipesSearch';
import RecipesListView from '../../src/Components/RecipesMain/RecipesListView';

//Profile Main
import Options from '../../src/Components/OptionsMain/Options';
import Settings from '../../src/Components/OptionsMain/Settings';
import Account from '../../src/Components/OptionsMain/Settings/Account';
import Subscription from '../../src/Components/OptionsMain/Settings/Subscription';
import AboutMyFit from '../../src/Components/OptionsMain/Settings/AboutMyFit';
import profile from '../../src/Components/OptionsMain/Settings/profile';

import updateEmail from '../../src/Components/OptionsMain/Settings/Account/updateEmail';
import updateIntegration from '../../src/Components/OptionsMain/Settings/Account/updateIntegration';
import updateLanguage from '../../src/Components/OptionsMain/Settings/Account/updateLanguage';
import updateNotification from '../../src/Components/OptionsMain/Settings/Account/updateNotification';
import updatePassword from '../../src/Components/OptionsMain/Settings/Account/updatePassword';
import updateUnit from '../../src/Components/OptionsMain/Settings/Account/updateUnit';
import updateAge from '../../src/Components/OptionsMain/Settings/Profile/updateAge';
import updateGender from '../../src/Components/OptionsMain/Settings/Profile/updateGender';
import updateHeight from '../../src/Components/OptionsMain/Settings/Profile/updateHeight';
import updateName from '../../src/Components/OptionsMain/Settings/Profile/updateName';

// export const HomeMainScreen = createStackNavigator();
// function HomeMainStackScreen() {
//   return (
//     <HomeMainScreen.Navigator>
//       <HomeMainScreen.Screen name="Home" component={HomeMain} options={{headerShown:false}}/>
//       <HomeMainScreen.Screen name="TodayDetail" component={TodayDetail} options={{headerShown:false}}/>
//       <HomeMainScreen.Screen name="BlogListView" component={BlogListView} options={{headerShown:false}}/>
//     </HomeMainScreen.Navigator>
//   );
// }

// const SplashMainScreen = createStackNavigator();
// function SplashScreen() {
//   return (
//     <SplashMainScreen.Navigator>
//       <SplashMainScreen.Screen name="beforeSplash" component={beforeSplash} options={{headerShown:false}} />
//       <SplashMainScreen.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
//       <SplashMainScreen.Screen name="Login" component={Login} options={{headerShown:false}}/>
//       <SplashMainScreen.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
//     </SplashMainScreen.Navigator>
//   );
// }

function conditionalRendering(
  signedIn,
  onBoarding,
  selectShop,
  userType,
  blocked,
  approvedByShop,
) {
  if (userType == 'c') {
    if (signedIn) {
      if (blocked) {
        return 'Blocked';
      } else {
        return 'CustomerMain';
      }
    } else {
      return 'CustomerMain';
    }
  } else {
    if (signedIn) {
      if (selectShop) {
        return 'ShopSelection';
      } else if (blocked) {
        return 'Blocked';
      } else if (!approvedByShop) {
        return 'NotApproved';
      } else {
        return 'BarberMain';
      }
    } else {
      return 'CustomerMain';
    }
  }
}

// export const createRootNavigator = (signedIn = true, onBoarding = true, userType = 'cu') => {
//     // var appcontainer = createSwitchNavigator(
//     //     {
//     //       HomeMainScreen:  HomeMainScreen ,
//     //         SplashMainScreen: {
//     //             screen: SplashMainScreen,
//     //         },
//     //     },
//     //     {
//     //         initialRouteName: SplashMainScreen
//     //     }
//     // );
//     const Stack = createStackNavigator();

//     return (
//       <NavigationContainer>
//       <Stack.Navigator  initialRouteName="Splash">
//                   <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}} />
//       </Stack.Navigator>
//       </NavigationContainer>
//     )

// };
