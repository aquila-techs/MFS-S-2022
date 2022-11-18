import {API_URL} from '../../../Actions';
import {ActionCreators} from '../../../Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Colors from '../../../Theme/Colors';
var Spinner = require('react-native-spinkit');
import IconF5 from 'react-native-vector-icons/FontAwesome5';
const {height, width} = Dimensions.get('window');

import IconM from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import IconFF from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Alert,
  I18nManager,
  ScrollView,
} from 'react-native';

import Responsive from 'react-native-lightweight-responsive';

import i18n from '../../../../translation';
class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: 'https://html-css-js.com/images/tiles/links.jpg',
      countryCode: '+44',
      loading: false,
      btndisable: false,
      snackVisible: false,
      phoneError: false,
      phone: '',
      emailUnique: false,
      email: '',
      password: '',
      errorText: '',
      tokenVerification: '',
      signinLoader: false,
      showVerificationLink: false,
      currentLang: null,
    };
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(256,256,256,0.5)'}}>
        <View
          style={{
            position: 'relative',
            top: 0,
            backgroundColor: '#fff',
            width: '100%',
            height: Platform.OS === 'android' ? '8%' : '10%',
            flexDirection: 'row',
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: '4%',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.05,
            borderBottomWidth: 0,
            elevation: 3,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: '7%'}}
            onPress={() => this.props.navigation.goBack()}>
            <IconM name="arrow-back" size={25} color="black" />
          </TouchableOpacity>

          <Text style={{color: '#000', fontSize: 18, alignSelf: 'center'}}>
            {i18n.t('Subscription')}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginTop: '0.5%',
            backgroundColor: 'rgba(256,256,256,0.2)',
          }}>
          <View
            style={{
              width: '100%',
              height: '4%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '0.3%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.05,
              elevation: 1.5,
            }}
          />

          <TouchableOpacity
            //onPress={() => this.props.navigation.navigate("updateEmail")}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: '10%',
              flexDirection: 'row',
              backgroundColor: 'white',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '0.3%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.05,
              elevation: 0.3,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                marginLeft: '7%',
              }}>
              {i18n.t('Plan')}
            </Text>
            <TouchableOpacity
              //  onPress={() => this.props.navigation.navigate("updateEmail")}
              style={{
                marginRight: '5%',
                width: '50%',
                flexDirection: 'row',
                marginLeft: 'auto',
              }}
              //onPress={() => this.setModalVisible(false)}
            >
              <Text
                style={{
                  color: 'rgba(0,0,0,0.3)',
                  fontSize: 15,
                  marginLeft: 'auto',
                }}>
                {i18n.t('Free')}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <View
            style={{
              width: '100%',
              height: '4%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '0.3%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.1,
              elevation: 1.5,
            }}
          />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PackageMeal')}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: '10%',
              flexDirection: 'row',
              backgroundColor: 'white',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '0.3%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.05,
              elevation: 0.3,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                marginLeft: '7%',
              }}>
              {i18n.t('choose_plan')}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('PackageMeal')}
              style={{
                right: '5%',
                width: '50%',
                flexDirection: 'row',
                marginLeft: 'auto',
              }}
              //onPress={() => this.setModalVisible(false)}
            >
              <Text
                style={{
                  color: 'rgba(0,0,0,0.3)',
                  fontSize: 14,
                  marginLeft: 'auto',
                }}
              />
              <IconF name="angle-right" size={20} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    sessionKey: state.SESSION_KEY.sessionKey,
    userData: state.USER_DATA.user,
    routeName: state.ROUTE_NAME.routeName,
    userName: state.USER_DATA.user.name,
    userEmail: state.USER_DATA.user.email,
    userGender: state.UPDATE_USERDETAIL.gender,
    userAge: state.UPDATE_USERDETAIL.age,
    userHeight: state.UPDATE_USERDETAIL.height,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Subscription);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  signUpTitle: {
    fontSize: hp('3%'),
    fontWeight: '600',
    letterSpacing: 0.7,
    color: '#000',
  },
  womanMobile: {
    alignSelf: 'center',
    marginTop: Responsive.height(20.6),
    height: Responsive.height(153),
    width: Responsive.width(224),
    backgroundColor: 'transparent',
  },
  phoneNumberWrapper: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    height: Responsive.height(40),
    width: Responsive.width(298),
    marginTop: Responsive.height(36),
    borderRadius: Responsive.height(8),
    borderWidth: Responsive.height(1),
  },
  gbFlag: {
    marginLeft: Responsive.width(10),
    height: Responsive.height(15),
    width: Responsive.width(25),
  },
  countryCode: {
    marginLeft: Responsive.width(4),
    color: 'rgba(0,0,0,1)',
    fontSize: Responsive.height(14),
  },
  line: {
    marginLeft: Responsive.width(10.5),
    width: Responsive.width(1),
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  phoneTextInput: {
    alignSelf: 'center',
    marginLeft: Responsive.width(10),
    width: '80%',
    height: '100%',
  },
  signUpWrapper: {
    marginTop: Responsive.height(24.9),
    alignSelf: 'center',
    height: Responsive.height(40),
    width: Responsive.width(298),
    backgroundColor: 'rgba(122,211,25,1)',
    borderRadius: Responsive.height(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: Responsive.height(10),
    color: '#ffffff',
    fontWeight: 'bold',
  },
  or: {
    marginTop: Responsive.height(17.4),
    opacity: 0.5,
    fontSize: Responsive.height(8),
    textAlign: 'center',
    color: '#000000',
  },
  signUpWithFacebookWrapper: {
    flexDirection: 'row',
    marginTop: Responsive.height(12.4),
    alignSelf: 'center',
    height: Responsive.height(40),
    width: Responsive.width(298),
    backgroundColor: 'rgba(59,89,152,1)',
    opacity: 0.9,
    borderRadius: 30,
    alignItems: 'center',
  },
  signUpWithFacebook: {
    marginLeft: Responsive.width(32),
    fontWeight: 'bold',
    color: 'rgba(255,255,255,1)',
    fontSize: Responsive.height(10),
  },
  facebookIcon: {
    marginLeft: Responsive.width(18),
    height: Responsive.height(32),
    width: Responsive.height(32),
    backgroundColor: 'transparent',
  },
  loginWrapper: {
    marginTop: Responsive.height(18),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alreadyHaveAnAccountText: {
    color: 'rgba(0,0,0,1)',
    fontSize: Responsive.height(10),
    fontFamily: 'helvetica',
  },
  signInText: {
    color: 'rgba(0,0,0,1)',
    fontSize: Responsive.height(10),
    fontWeight: 'bold',
    fontFamily: 'helvetica',
  },
  buttonContainer: {
    height: Responsive.height(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
    borderRadius: 5,
    margin: '5%',
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#000',
    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },
  },
  loginText: {
    color: 'white',
    fontSize: 17,
  },
});
