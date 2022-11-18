import { API_URL } from '../../../Actions';
import { ActionCreators } from '../../../Actions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Colors from '../../../Theme/Colors';
var Spinner = require('react-native-spinkit');
import IconF5 from 'react-native-vector-icons/FontAwesome5';
const { height, width } = Dimensions.get('window');

import IconM from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import IconFF from 'react-native-vector-icons/Feather';

import I18n from 'react-native-i18n';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import React, { useEffect, useState } from 'react';
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
  Platform,
  I18nManager,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Responsive from 'react-native-lightweight-responsive';
import renderIf from 'render-if';

import localize from '../../../translation';
import LocalizeController from '../../../translation/LocalizeController';

import RNRestart from 'react-native-restart';

const HEIGHT = Dimensions.get('window').height;

class Profile extends React.Component {
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
      userHeight: props.userHeight,
      userage: this.props.userAge,
      showVerificationLink: false,
      currentLang: null,
      userN: this.props.userName,
    };
    AsyncStorage.getItem('userage').then(age => {
      this.setState({
        userage: JSON.parse(age),
      });
    });
    AsyncStorage.getItem('userHeight').then(userHeight => {

      this.setState({
        userHeight: JSON.parse(userHeight),
      });
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  UNSAFE_componentWillMount() {

    // this.getLang();
  }
  setLang(lang) {
    //	alert(lang)
    this.setState({
      currentLang: lang,
    });
  }
  // getLang = async () => {
  //   await AsyncStorage.getItem('lang')
  //     .then(lang => {
  //       this.setLang(lang);
  //       //	alert(lang)
  //     })
  //     .catch(err => {
  //       console.log('err===>>>', err);
  //     });
  // };
  signinAlert(message) {
    Alert.alert('Login', message, [{ text: 'OK', onPress: () => { } }], {
      cancelable: false,
    });
  }

  submit() {
    if (this.state.email == '') {
      this.setState({
        errorText: localize.t('emailErrorText'),
      });
    } else if (this.state.password == '') {
      this.setState({
        errorText: localize.t('passwordErrorText'),
      });
    } else {
      const _this = this;
      const signindata = {
        email: this.state.email,
        password: this.state.password,
      };

      this.setState(
        {
          signinLoader: true,
        },
        () => {
          _this.props.signin(signindata).then(status => {

            //alert(JSON.stringify(status.status))
            _this.setState(
              {
                signinLoader: false,
              },
              () => {
                if (status.status) {
                  if (this.props.userData.type == 'cu') {
                    _this.props.navigation.navigate('goal');
                  } else if (
                    this.props.userData.type == 'p' &&
                    this.props.userData.pharmacy == null
                  ) {
                    _this.props.navigation.navigate('CreatePharmacy');
                  } else {
                    _this.props.navigation.navigate('PharmacyMain');
                  }
                } else {
                  if (status.showVerification) {
                    _this.setState({
                      showVerificationLink: true,
                      tokenVerification: status.token,
                    });
                  } else {
                    _this.signinAlert(status.error);
                  }
                }
              },
            );
          });
        },
      );
    }
  }

  sendVerificationLink() {
    const _this = this;
    console.log('sendVerificationLink');
    _this.props
      .sendVerificationLinkFunc(this.state.tokenVerification, {
        email: this.state.email,
      })
      .then(status => {
        if (status.status) {
          _this.signinAlert(localize.t('signInAlertText'));
        }
      });
  }

  sendForgotEmail() {
    const _this = this;

    _this.props
      .sendForgotEmailFunc({ email: this.state.emailForgot })
      .then(status => {
        if (status.status == false) {
          _this.setState(
            {
              emailForgot: '',
              emailForgotErrorText: '',
            },
            () => {
              _this.signinAlert(status.error);
            },
          );
        }
      });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(256,256,256,0.5)' }}>
        <View
          style={{
            position: 'relative',
            paddingTop: Platform.OS === 'android' ? 0 : 20,
            // marginTop: '4%',
            backgroundColor: '#fff',
            width: '100%',
            height: Platform.OS === 'android' ? '8%' : '10%',
            flexDirection: 'row',
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            shadowOpacity: Platform.OS === 'android' ? 0.5 : 0.05,
            borderBottomWidth: 0,
            elevation: 3,
          }}>

          <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ paddingTop: 5, marginLeft: 20 }}
              onPress={() => this.props.navigation.goBack()}>
              <IconM name="arrow-back" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000', fontSize: 18, marginLeft: -30, marginTop: 5 }}>
              {I18n.t('Profile')}
            </Text>
          </View>
          
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginTop: '0.5%',
            backgroundColor: 'rgba(256,256,256,0.2)',
          }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('updateName', this.props.userName)
            }
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: '9%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '0.3%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.05,
              elevation: 0.3,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                marginLeft: '7%',
              }}>
              {I18n.t('Name')}
            </Text>
            <TouchableOpacity
              style={{
                marginRight: '5%',
                width: '50%',
                flexDirection: 'row',
                marginLeft: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            //onPress={() => this.setModalVisible(false)}
            >
              <Text
                style={{
                  color: 'rgba(0,0,0,0.3)',
                  fontSize: 14,
                  marginLeft: 'auto',
                  textAlign: 'center',
                  right: 10,
                }}>
                {this.props.userName}
              </Text>
              <IconF name="angle-right" size={20} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(
                'updateGender',
                this.props.userGender,
              )
            }
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: '9%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '0.3%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.05,
              elevation: 0.3,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                marginLeft: '7%',
              }}>
              {I18n.t('Gender')}
            </Text>
            <TouchableOpacity
              style={{
                right: '5%',
                width: '50%',
                flexDirection: 'row',
                marginLeft: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
              }}

            >
              <Text
                style={{
                  color: 'rgba(0,0,0,0.3)',
                  fontSize: 14,
                  marginLeft: 'auto',
                  textAlign: 'center',
                  right: 10,
                }}>
                {this.props.userGender === 'M' ? I18n.t('Male') : I18n.t('Female')}
              </Text>
              <IconF name="angle-right" size={20} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(
                'updateAge',
                this.props.userAge,
              )
            }
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: '9%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '0.3%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.05,
              elevation: 0.3,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                marginLeft: '7%',
              }}>
              {I18n.t('Age')}
            </Text>
            <TouchableOpacity
              style={{
                right: '5%',
                width: '50%',
                flexDirection: 'row',
                marginLeft: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: 'rgba(0,0,0,0.3)',
                  fontSize: 14,
                  marginLeft: 'auto',
                  textAlign: 'center',
                  right: 10,
                }}>
                {this.props.userAge}
              </Text>
              <IconF name="angle-right" size={20} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
           
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: '9%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '0.3%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.05,
              elevation: 0.3,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                marginLeft: '7%',
              }}>
              {I18n.t('Height')}
            </Text>
            <TouchableOpacity
              style={{
                right: '5%',
                width: '50%',
                flexDirection: 'row',
                marginLeft: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
              }}
         
            >
              <Text
                style={{
                  color: 'rgba(0,0,0,0.3)',
                  fontSize: 14,
                  marginLeft: 'auto',
                  textAlign: 'center',
                  right: 10,
                }}>
                {this.props.userHeight} cm{' '}
              </Text>
              <IconF name="angle-right" size={20} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>
          </TouchableOpacity> */}

        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    sessionKey: state.SESSION_KEY.sessionKey,
    userData: state.USER_DATA.user,
    userName: state.USER_DATA_NAME.userDataName,
    userGender: state.UPDATE_USER_GENDER.updateUserGender,
    userAge: state.UPDATE_USER_AGE.updateUserAge,
    userHeight: state.UPDATE_USER_HEIGHT.updateUserHeight,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

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
