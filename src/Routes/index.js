import React, { Component, useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from '../Reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

import localize from '../translation';

console.disableYellowBox = true;
import { Button, Text, Image, Modal, ReactNative, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Splash from '../Components/Splash/splash';
import Login from '../Components/LoginSignupMain/LoginMain/Login';
import Login2 from '../Components/LoginSignupMain/LoginMain2/Login';
import Signup from '../Components/LoginSignupMain/SignupMain/Signup';

// Error in this screen Start
// import PaymentScreen from '../Screens/PaymentScreen';
// Error in this screen End

import AddProductMeal from '../Components/HomeMain/AddProductMeal';

//user profile
import goal from '../Components/UserProfile/goal';
import physicalActivity from '../Components/UserProfile/physicalActivity';
import { WorkroutDuration } from '../Components/UserProfile/workoutDuration';
import gender from '../Components/UserProfile/gender';
import age from '../Components/UserProfile/age';
import height from '../Components/UserProfile/height';
import weight from '../Components/UserProfile/weight';
import routine from '../Components/UserProfile/routine';

import recipe from '../Components/UserProfile/recipe';
import { UserProfile } from '../Components/UserProfile/GetProfile';

//Home Main
import HomeMain from '../Components/HomeMain/Today';
import TodayDetail from '../Components/HomeMain/TodayDetail';
import BlogListView from '../Components/HomeMain/BlogListView';

//WorkOut Main
import WorkOut from '../Components/WorkOutMain/Home';
import WorkoutFilter from '../Components/WorkOutMain/Filter/index';
import WorkOutPreview from '../Components/WorkOutMain/WorkOutPreview';
import WorkOutDetail from '../Components/WorkOutMain/WorkOutDetail';
import PopularAndLists from '../Components/WorkOutMain/PopularAndLists';
import CategoryView from '../Components/WorkOutMain/CategoryView';

import Home from '../Screens/LogMain/Home';
import LogMain from '../Components/LogMain/LogMain/index';

//Meals Main

// Error in this screen Start
import MealsPlan from '../Components/MealsMain/Meals';
import PackageMeal from '../Components/MealsMain/PackageMeal';
// Error in this screen End


import PlanMeal from '../Components/MealsMain/PlanMeal';
import StartedMeal from '../Components/MealsMain/StartedMeal';
import CreateMeal from '../Components/MealsMain/CreateMeal/index';
import diet1 from '../Components/MealsMain/CreateMeal/diet1';
import foods2 from '../Components/MealsMain/CreateMeal/foods2';
import recipes3 from '../Components/MealsMain/CreateMeal/recipes3';
import meals4 from '../Components/MealsMain/CreateMeal/meals4';
import variety5 from '../Components/MealsMain/CreateMeal/variety5';
import plan6 from '../Components/MealsMain/CreateMeal/plan6';
import loading7 from '../Components/MealsMain/CreateMeal/loading7';
import ViewMeal from '../Components/MealsMain/ViewMeal';

//Recipes Main
import Recipes from '../Components/RecipesMain/Recipes';
import RecipesDetail from '../Components/RecipesMain/RecipesDetail';
import RecipesSearch from '../Components/RecipesMain/RecipesSearch';
import RecipesListView from '../Components/RecipesMain/RecipesListView';

//Profile Main
import Options from '../Components/OptionsMain/Options';
import Settings from '../Components/OptionsMain/Settings';
import Account from '../Components/OptionsMain/Settings/Account';
import Subscription from '../Components/OptionsMain/Settings/Subscription';
import AboutMyFit from '../Components/OptionsMain/Settings/AboutMyFit';
import profile from '../Components/OptionsMain/Settings/profile';

import updateEmail from '../Components/OptionsMain/Settings/Account/updateEmail';
import updateIntegration from '../Components/OptionsMain/Settings/Account/updateIntegration';
import updateLanguage from '../Components/OptionsMain/Settings/Account/updateLanguage';
import updateNotification from '../Components/OptionsMain/Settings/Account/updateNotification';
import updatePassword from '../Components/OptionsMain/Settings/Account/updatePassword';
import updateUnit from '../Components/OptionsMain/Settings/Account/updateUnit';
import updateAge from '../Components/OptionsMain/Settings/Profile/updateAge';
import updateGender from '../Components/OptionsMain/Settings/Profile/updateGender';
import updateHeight from '../Components/OptionsMain/Settings/Profile/updateHeight';
import updateName from '../Components/OptionsMain/Settings/Profile/updateName';

//  Add product
import AddMeal from '../Components/MealsMain/AddMeal';
import ViewProduct from '../Components/MealsMain/ViewProduct';
import EditProduct from '../Components/MealsMain/EditProduct';
import AddProductRecipe from '../Components/HomeMain/AddProductMeal/addProductRecipe';
import AddProduct from '../Components/MealsMain/AddProduct/staple';
import AddCustomRecipe from '../Components/MealsMain/AddProduct/AddCustomRecipe';

import IconM from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { BarcodeScan } from '../Components/MealsMain/AddProduct/BarcodeScan';
import ChartKit from '../Components/UserProfile/ChartScreen';
// Error in this screen Start
import Fitness from '../Components/OptionsMain/Settings/FatAni';
// Error in this screen End
import { Rest } from '../Components/WorkOutMain/WorkOutDetail/WorkoutRest';
import TrainerProfile from '../Components/WorkOutMain/TrainerProfile';
import { Redeam } from '../Components/OptionsMain/Options/Redeam';
import ExerciceLib from '../Components/OptionsMain/Settings/ExerciceLib';
import { Workroutplan } from '../Components/UserProfile/SetWorkoutPlan';
import { RemainActivity } from '../Components/HomeMain/Today/ActivityRemain';

const config = {
  key: 'primary',
  storage: AsyncStorage,
};

const USER_KEY = 'accessToken';
const USER_DATA = 'user';

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

const MealsStack = createStackNavigator();
function MealsScreen() {
  return (
    <MealsStack.Navigator initialRouteName={"Recipes"}>
      <MealsStack.Screen
        name="Recipes"
        component={Recipes}
        options={{ headerShown: false }}
      />
      <MealsStack.Screen
        name="RecipesDetail"
        component={RecipesDetail}
        options={{ headerShown: false }}
      />
      <MealsStack.Screen
        name="RecipesSearch"
        component={RecipesSearch}
        options={{ headerShown: false }}
      />
      {/* Error Screen Start */}
      <MealsStack.Screen
        name="MealsPlan"
        component={MealsPlan}
        options={{ headerShown: false }}
      />
      {/* Error Screen End */}
      <MealsStack.Screen
        name="RecipesListView"
        component={RecipesListView}
        options={{ headerShown: false }}
      />
    </MealsStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Options"
        component={Options}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="MealsPlan"
        component={MealsPlan}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}

const LoginSignupStack = createStackNavigator();
function LoginSignupScreen() {
  return (
    <LoginSignupStack.Navigator>
      <LoginSignupStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <LoginSignupStack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
    </LoginSignupStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PayScreenComponent = () => {
  return null;
};

let reducers = persistCombineReducers(config, reducer);

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__,
});

const store = createStore(
  reducers,
  undefined,
  compose(applyMiddleware(thunkMiddleware, loggerMiddleware)),
);

export default function Routes() {

  const [rehydrated, setRehydrated] = React.useState();
  const [signedIn, setSignedIn] = React.useState(false);
  const [isOnboarding, setIsOnboarding] = React.useState(false);
  const [data, setData] = React.useState(true);
  const [logincheck, setlogincheck] = React.useState('');
  const [createPharmacy, setCreatePharmacy] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setData(false);
    }, 2000);
    (async () => {
      try {
        let user = await AsyncStorage.getItem('login');
        let parsed = JSON.parse(user);
        setlogincheck(parsed);

      } catch (error) {

      }
    })();
    const _this = this;
    AsyncStorage.multiGet([USER_KEY, USER_DATA])
      .then(res => {

        var data = {
          accessToken: '',
          user: '',
        };
        res.forEach((item, index) => {

          if (item[0] == 'accessToken') {
            data.accessToken = JSON.parse(item[1]);

          } else if (item[0] == 'user') {
            data.user = JSON.parse(item[1]);
          }
        });

        if (data.accessToken == null) {

          setSignedIn(false);
          setIsOnboarding(false);
        } else {

          if (data.accessToken == null) {
            setSignedIn(false);
            setIsOnboarding(false);

          } else {
            setSignedIn(true);
            setIsOnboarding(false);
            setCreatePharmacy(false);

            AsyncStorage.getItem('userFeaturesCheck').then(res2 => {
              var resFeatures = JSON.parse(res2);
              if (resFeatures == false) {
                setSignedIn(true);
              } else {
                setSignedIn(true);
                setIsOnboarding(true);
                setCreatePharmacy(false);
              }
            });
          }
        }
      })
      .catch(err => reject(err));
  }, []);

  React.useEffect(() => {
    persistStore(store, null, (err, restoredState) => {
      store.getState();
      setRehydrated(true);
    });
  });
  React.useEffect(() => {
    persistStore(store, null, (err, restoredState) => {
      store.getState();
      setRehydrated(true);
    });
    _getCurrentRouteName = navState => {
      if (navState.hasOwnProperty('index')) {
        this._getCurrentRouteName(navState.routes[navState.index]);
      } else {

        // can then save this to the state (I used redux)
        store.dispatch(setCurrentRouteName(navState.routeName));
      }
    };
  });

  function ModalScreen({ navigation }) {
    return <Home />;
  }

  conditionalRendering = (signedIn, isOnboarding, createPharmacy) => {
    if (isOnboarding) {
      return 'OnBoarding';
    } else if (signedIn) {
      return 'HomeMain';
    } else {
      return 'Login';
    }
  };
  const isAuth = useSelector(state => !!state.SESSION_KEY.sessionKey);
  const isSplash = useSelector(
    state => !!state.UPDATE_SPLASHSTATUS.splashStatus,
  );
  const isOnboardingCheck = useSelector(
    state => !!state.UPDATE_USERFEATURESTATUS.userFeatureStatus,
  );
  const isBoardingChecked = useSelector(
    state => !!state.UPDATE_USERDETAIL.isBoardingChecked,
  );
  const isHome = useSelector(state => !!state.UPDATE_HOMESTATUS.homeStatus);

  const dispatch = useDispatch();

  useEffect(() => {

  }, [])
  return (
    <NavigationContainer
      onNavigationStateChange={(prevState, newState) => {
        this._getCurrentRouteName(newState);
      }}>

      <Stack.Navigator initialRouteName="SplashScreen">
        {!isAuth ? (
          <>
            {isSplash ? (
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
              />
            ) : null}
            <Stack.Screen
              name="LoginSignupScreen"
              component={LoginSignupScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : isAuth ? (
          <>
            <Stack.Screen name="HomeMain" options={{ headerShown: false }}>
              {() => (
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      if (route.name === 'Home') {
                        if (focused) {
                          return (
                            <Image
                              style={{ width: 42, height: 42 }}
                              source={require('../Assets/Images/homeIconActive.png')}
                            />
                          );
                        } else {
                          return (
                            <Image
                              style={{ width: 40, height: 40 }}
                              source={require('../Assets/Images/homeIcon.png')}
                            />
                          );
                        }
                      } else if (route.name === 'WorkOut') {
                        if (focused) {
                          return (
                            <Image
                              style={{ width: 42, height: 42 }}
                              source={require('../Assets/Images/workoutIconActive.png')}
                            />
                          );
                        } else {
                          return (
                            <Image
                              style={{ width: 40, height: 40 }}
                              source={require('../Assets/Images/workoutIcon.png')}
                            />
                          );
                        }
                      } else if (route.name === 'Logs') {
                        return (
                          <IconM name={'search'} size={28} color={'#000'} />
                        );
                      } else if (route.name === 'Meals') {
                        if (focused) {
                          return (
                            <Image
                              style={{ width: 42, height: 42 }}
                              source={require('../Assets/Images/mealsIconActive.png')}
                            />
                          );
                        } else {
                          return (
                            <Image
                              style={{ width: 40, height: 40 }}
                              source={require('../Assets/Images/mealsIcon.png')}
                            />
                          );
                        }
                      } else if (route.name === 'Profile') {
                        if (focused) {
                          return (
                            <Image
                              style={{ width: 40, height: 40 }}
                              source={require('../Assets/Images/profileIconActive.png')}
                            />
                          );
                        } else {
                          return (
                            <Image
                              style={{ width: 38, height: 38 }}
                              source={require('../Assets/Images/profileIcon.png')}
                            />
                          );
                        }
                      }
                    },
                  })}
                  tabBarOptions={{
                    showLabel: false,
                    showIcon: true,
                    activeTintColor: '#2570b8',
                    inactiveTintColor: '#c3c3c3',
                  }}>
                  <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
                  <Tab.Screen name="WorkOut" component={WorkOutStackScreen} options={{ headerShown: false }} />
                  <Tab.Screen
                    name="Logs"
                    component={PayScreenComponent}
                    options={{
                      tabBarButton: () => <Home />,
                      headerShown: false
                    }}
                  />
                  <Tab.Screen name="Meals" component={MealsScreen} options={{ headerShown: false }} />
                  <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
                </Tab.Navigator>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="AddCustomRecipe"
              component={AddCustomRecipe}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddProduct"
              component={AddProduct}
              options={{ headerShown: false }}>
            </Stack.Screen>
            <Stack.Screen
              name="TodayDetail"
              component={TodayDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BarcodeScan"
              component={BarcodeScan}
              options={{ headerShown: false }}
            />
            {/* Error Screen Start */}
            {/* <Stack.Screen
              name="PaymentScreen"
              component={PaymentScreen}
              options={{ headerShown: false }}
            /> */}
            {/* Error Screen End */}
            <Stack.Screen
              name="Redeam"
              component={Redeam}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExerciceLib"
              component={ExerciceLib}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddProductMeal"
              component={AddProductMeal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Homecee"
              component={HomeMain}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="diet1"
              component={diet1}
              options={{ headerShown: true, title: localize.t('createMeal1') }}
            />
            <Stack.Screen
              name="foods2"
              component={foods2}
              options={{ headerShown: true, title: localize.t('createMeal2') }}
            />
            <Stack.Screen
              name="PopularAndLists"
              component={PopularAndLists}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="recipes3"
              component={recipes3}
              options={{ headerShown: true, title: localize.t('createMeal3') }}
            />
            <Stack.Screen
              name="meals4"
              component={meals4}
              options={{ headerShown: true, title: localize.t('createMeal4') }}
            />
            <Stack.Screen
              name="variety5"
              component={variety5}
              options={{ headerShown: true, title: localize.t('createMeal5') }}
            />
            <Stack.Screen
              name="plan6"
              component={plan6}
              options={{ headerShown: true, title: localize.t('createMeal6') }}
            />
            <Stack.Screen
              name="loading7"
              component={loading7}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChartKit"
              component={ChartKit}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="MealsPlan"
              component={MealsPlan}
              options={{ headerShown: false }}
            />
            {/* Error Screen Start */}
            <Stack.Screen
              name="PackageMeal"
              component={PackageMeal}
              options={{ headerShown: false }}
            />
            {/* Error Screen End */}
            <Stack.Screen
              name="PlanMeal"
              component={PlanMeal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StartedMeal"
              component={StartedMeal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateMeal"
              component={CreateMeal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddMeal"
              component={AddMeal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewProduct"
              component={ViewProduct}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewMeal"
              component={ViewMeal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TrainerProfile"
              component={TrainerProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProduct"
              component={EditProduct}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddProductRecipe"
              component={AddProductRecipe}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Options"
              component={Options}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Account"
              component={Account}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Subscription"
              component={Subscription}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AboutMyFit"
              component={AboutMyFit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profile"
              component={profile}
              options={{ headerShown: false }}
            />
            {/* Error Screen Start */}
            <Stack.Screen
              name="Fitness"
              component={Fitness}
              options={{ headerShown: false }}
            />
            {/* Error Screen End */}
            <Stack.Screen
              name="updateEmail"
              component={updateEmail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="updateIntegration"
              component={updateIntegration}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="updateLanguage"
              component={updateLanguage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="updateNotification"
              component={updateNotification}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="updatePassword"
              component={updatePassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="updateUnit"
              component={updateUnit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="updateAge"
              component={updateAge}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="updateGender"
              component={updateGender}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="updateHeight"
              component={updateHeight}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="updateName"
              component={updateName}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Recipes"
              component={Recipes}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RecipesDetail"
              component={RecipesDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RemainActivity"
              component={RemainActivity}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RecipesSearch"
              component={RecipesSearch}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="WorkOut"
              component={WorkOut}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WorkoutFilter"
              component={WorkoutFilter}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WorkOutPreview"
              component={WorkOutPreview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WorkOutDetail"
              component={WorkOutDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="rest"
              component={Rest}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                animationEnabled: true,
                headerShown: false,
                mode: 'modal',
                headerMode: 'none',
              }}
            />
            <Stack.Screen
              name="gender"
              component={gender}
              options={{ headerShown: true, title: localize.t('genderTitle') }}
            />
            <Stack.Screen
              name="age"
              component={age}
              options={{ headerShown: true, title: localize.t('ageTitle') }}
            />
            <Stack.Screen
              name="height"
              component={height}
              options={{ headerShown: true, title: localize.t('heightTitle') }}
            />
            <Stack.Screen
              name="weight"
              component={weight}
              options={{ headerShown: true, title: localize.t('weightTitle') }}
            />
            <Stack.Screen
              name="goal"
              component={goal}
              options={{ headerShown: true, title: localize.t('goalTitle') }}
            />
            <Stack.Screen
              name="physicalActivity"
              component={physicalActivity}
              options={{ headerShown: true, title: localize.t('physicalActivityTitle') }}
            />
            <Stack.Screen
              name="Workroutplan"
              component={Workroutplan}
              options={{ headerShown: true, title: localize.t('quantity') }}
            />
            <Stack.Screen
              name="workoutDuration"
              component={WorkroutDuration}
              options={{ headerShown: true, title: localize.t('workoutDurationTitle') }}
            />
            {/* Error Screen Start */}
            <Stack.Screen
              name="routine"
              component={routine}
              options={{ headerShown: true, title: localize.t('routineTitle') }}
            />
            {/* Error Screen End */}
            <Stack.Screen
              name="recipe"
              component={recipe}
              options={{ headerShown: true, title: localize.t('RecipeTitle') }}
            />
          </>
        ) : <Stack.Screen
          name="LoginSignupScreen"
          component={LoginSignupScreen}
          options={{ headerShown: false }}
        />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
