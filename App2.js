import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './src/Reducers';

import AppContainer from './src/Containers/appContainer';
//import NavigationService from './src/Routes/NavigationService';
import localize from './src/translation';
import appContainer from './src/Routes';
console.disableYellowBox = true;
import { Button, Text, Image, Modal, ReactNative, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Splash from './src/Components/Splash/splash';
import Login from './src/Components/LoginSignupMain/LoginMain/Login';
import Login2 from './src/Components/LoginSignupMain/LoginMain2/Login';
import Signup from './src/Components/LoginSignupMain/SignupMain/Signup';
import PaymentScreen from './src/Screens/PaymentScreen';
import AddProductMeal from './src/Components/HomeMain/AddProductMeal';

//user profile
import goal from './src/Components/UserProfile/goal';
import gender from './src/Components/UserProfile/gender';
import age from './src/Components/UserProfile/age';
import height from './src/Components/UserProfile/height';
import weight from './src/Components/UserProfile/weight';
import routine from './src/Components/UserProfile/routine';

//Home Main
import HomeMain from './src/Components/HomeMain/Today';
import TodayDetail from './src/Components/HomeMain/TodayDetail';
import BlogListView from './src/Components/HomeMain/BlogListView';

//WorkOut Main
import WorkOut from './src/Components/WorkOutMain/Home';
import WorkoutFilter from './src/Components/WorkOutMain/Filter/index';
import WorkOutPreview from './src/Components/WorkOutMain/WorkOutPreview';
import WorkOutDetail from './src/Components/WorkOutMain/WorkOutDetail';
import PopularAndLists from './src/Components/WorkOutMain/PopularAndLists';
import CategoryView from './src/Components/WorkOutMain/CategoryView';

import Home from './src/Screens/LogMain/Home';
import LogMain from './src/Components/LogMain/LogMain/index';

//Meals Main
import MealsPlan from './src/Components/MealsMain/Meals';
import PackageMeal from './src/Components/MealsMain/PackageMeal';
import PlanMeal from './src/Components/MealsMain/PlanMeal';
import StartedMeal from './src/Components/MealsMain/StartedMeal';
import CreateMeal from './src/Components/MealsMain/CreateMeal/index';
import diet1 from './src/Components/MealsMain/CreateMeal/diet1';
import foods2 from './src/Components/MealsMain/CreateMeal/foods2';
import recipes3 from './src/Components/MealsMain/CreateMeal/recipes3';
import meals4 from './src/Components/MealsMain/CreateMeal/meals4';
import variety5 from './src/Components/MealsMain/CreateMeal/variety5';
import plan6 from './src/Components/MealsMain/CreateMeal/plan6';
import loading7 from './src/Components/MealsMain/CreateMeal/loading7';
import ViewMeal from './src/Components/MealsMain/ViewMeal';

//Add
import AddProduct from './src/Components/MealsMain/AddProduct';
import AddMeal from './src/Components/MealsMain/AddMeal';
import ViewProduct from './src/Components/MealsMain/ViewProduct';
import EditProduct from './src/Components/MealsMain/EditProduct';

//Recipes Main
import Recipes from './src/Components/RecipesMain/Recipes';
import RecipesDetail from './src/Components/RecipesMain/RecipesDetail';
import RecipesSearch from './src/Components/RecipesMain/RecipesSearch';
import RecipesListView from './src/Components/RecipesMain/RecipesListView';

//Profile Main
import Options from './src/Components/OptionsMain/Options';
import Settings from './src/Components/OptionsMain/Settings';
import Account from './src/Components/OptionsMain/Settings/Account';
import Subscription from './src/Components/OptionsMain/Settings/Subscription';
import AboutMyFit from './src/Components/OptionsMain/Settings/AboutMyFit';
import profile from './src/Components/OptionsMain/Settings/profile';

import updateEmail from './src/Components/OptionsMain/Settings/Account/updateEmail';
import updateIntegration from './src/Components/OptionsMain/Settings/Account/updateIntegration';
import updateLanguage from './src/Components/OptionsMain/Settings/Account/updateLanguage';
import updateNotification from './src/Components/OptionsMain/Settings/Account/updateNotification';
import updatePassword from './src/Components/OptionsMain/Settings/Account/updatePassword';
import updateUnit from './src/Components/OptionsMain/Settings/Account/updateUnit';
import updateAge from './src/Components/OptionsMain/Settings/Profile/updateAge';
import updateGender from './src/Components/OptionsMain/Settings/Profile/updateGender';
import updateHeight from './src/Components/OptionsMain/Settings/Profile/updateHeight';
import updateName from './src/Components/OptionsMain/Settings/Profile/updateName';

import IconF5 from 'react-native-vector-icons/FontAwesome5';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import IconI from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { Workroutplan } from './src/Components/UserProfile/SetWorkoutPlan';

const config = {
  key: 'primary',
  storage: AsyncStorage,
};

const USER_KEY = 'accessToken';
const USER_DATA = 'user';
const SPLASH = 'splash';
const userFeatures = 'userFeatures';

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

const MealsStack = createStackNavigator();
function MealsScreen() {
  return (
    <MealsStack.Navigator>
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
      <MealsStack.Screen
        name="MealsPlan"
        component={MealsPlan}
        options={{ headerShown: false }}
      />
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
const Stack = createStackNavigator();

const CreatePlaceholder = () => (
  <View style={{ flex: 1, backgroundColor: 'blue' }} />
);
const CreateNew = () => (
  <View style={{ width: '70%', height: '70%', marginTop: '20%' }}>
    <Modal
      style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }}
      visible={true}
      animationType="slide"
      transparent={true}
    />
  </View>
);

const PayScreenComponent = () => {
  return null;
};

let reducers = persistCombineReducers(config, reducer);
// making sure logger only works in dev mode.
const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__,
});
//const callback = () => {};
const store = createStore(
  reducers,
  undefined,
  compose(applyMiddleware(thunkMiddleware, loggerMiddleware)),
);

export default function App() {
  const [rehydrated, setRehydrated] = React.useState();
  const [signedIn, setSignedIn] = React.useState(false);
  const [isOnboarding, setIsOnboarding] = React.useState(false);
  const [data, setData] = React.useState(true);
  const [createPharmacy, setCreatePharmacy] = React.useState(false);

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
  const isHome = useSelector(state => !!state.UPDATE_HOMESTATUS.homeStatus);

  // alert("isAuth : "+isAuth+" isOnboardingCheck : "+isOnboardingCheck+" isHome : "+isHome)

  const dispatch = useDispatch();

  return (
    <NavigationContainer
      onNavigationStateChange={(prevState, newState) => {
        this._getCurrentRouteName(newState);
      }}>
      <Stack.Navigator initialRouteName="SplashScreen">
        {!isAuth && !isOnboardingCheck ? (
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
        ) : isAuth && isOnboardingCheck ? (
          <>
            <Stack.Screen name="HomeMain" options={{ headerShown: false }}>
              {() => (
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      if (route.name === 'Home') {
                        return (
                          <IconF name="calendar-o" size={28} color={color} />
                        );
                      } else if (route.name === 'WorkOut') {
                        return (
                          <IconF5 name="fire-alt" size={28} color={color} />
                        );
                      } else if (route.name === 'Logs') {
                        return (
                          <IconM name={'search'} size={28} color={'#000'} />
                        );
                      } else if (route.name === 'Meals') {
                        return (
                          <IconM name="restaurant" size={28} color={color} />
                        );
                      } else if (route.name === 'Profile') {
                        return (
                          <IconM
                            name="person-outline"
                            size={28}
                            color={color}
                          />
                        );
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
                  <Tab.Screen
                    name="Logs"
                    component={PayScreenComponent}
                    options={{
                      tabBarButton: () => <Home />,
                    }}
                  />

                  <Tab.Screen name="Meals" component={MealsScreen} />
                  <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="TodayDetail"
              component={TodayDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentScreen"
              component={PaymentScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddProductMeal"
              component={AddProductMeal}
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
              name="MealsPlan"
              component={MealsPlan}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PackageMeal"
              component={PackageMeal}
              options={{ headerShown: false }}
            />
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
              name="AddProduct"
              component={AddProduct}
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
              name="EditProduct"
              component={EditProduct}
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
              name="Home"
              component={Home}
              options={{
                animationEnabled: true,
                headerShown: false,
                mode: 'modal',
                headerMode: 'none',
              }}
            />
          </>
        ) : !isOnboardingCheck && isAuth ? (
          <>
            <Stack.Screen
              name="goal"
              component={goal}
              options={{ headerShown: true, title: localize.t('goalTitle') }}
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
              name="Workroutplan"
              component={Workroutplan}
              options={{ headerShown: true, title: localize.t('heightTitle') }}
            />
            <Stack.Screen
              name="weight"
              component={weight}
              options={{ headerShown: true, title: localize.t('weightTitle') }}
            />
            <Stack.Screen
              name="routine"
              component={routine}
              options={{ headerShown: true, title: localize.t('routineTitle') }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login2"
            component={Login2}
            options={{ headerShown: true, title: localize.t('routineTitle') }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
