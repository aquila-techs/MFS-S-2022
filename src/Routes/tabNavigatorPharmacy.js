// import React, { Component } from 'react';
// import { createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createSwitchNavigator, } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/FontAwesome';
import HomeMainNavigator from '../Components/HomeMain/HomeMainNavigator';

import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
const TabNavigator = createBottomTabNavigator(
  {
    Orders: {
      screen: PharmacyOrdersMainNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <IconF name="list" size={24} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: ProfileMainNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="account" size={24} color={tintColor} />
        ),
      },
    },
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
