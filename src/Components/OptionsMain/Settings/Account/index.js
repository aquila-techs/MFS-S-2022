import { ActionCreators } from '../../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
var Spinner = require('react-native-spinkit');
const { height, width } = Dimensions.get('window');

import IconM from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/FontAwesome';

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
  Alert,
} from 'react-native';

import Responsive from 'react-native-lightweight-responsive';

import i18n from '../../../../../translation';

import { Platform } from 'react-native';

const HEIGHT = Dimensions.get('window').height;

class Account extends React.Component {
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

  UNSAFE_componentWillMount() {

    // this.getLang();

    // this will check and manage session locally
    // if (props.hasSession) {
    //     props.navigation.navigate('drawerNav');
    // }
  }
  componentDidMount() {
    //alert(this.props.userId)
    //this.signinAlert()
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
    Alert.alert(
      'Delete Account : ',
      message,
      [{ text: 'Ok', onPress: () => { } }],
      { cancelable: false },
    );
  }

  deleteAccountAlert(message) {
    Alert.alert(
      'Do you Want Do Delete Your Account?',
      message,
      [
        {
          text: 'Yes',
          onPress: () => {
            this.deleteSubmit();
          },
        },
        { text: 'No' },
      ],
      { cancelable: false },
    );
  }

  deleteSubmit() {
    const _this = this;
    this.setState(
      {
        signinLoader: true,
      },
      () => {
        _this.props
          .deleteUserAccount(this.props.token, this.props.userId)
          .then(status => {
            //alert(JSON.stringify(status.status))
            _this.setState(
              {
                signinLoader: false,
              },
              () => {
                if (status.status) {
                  _this.props.navigation.navigate('signup');
                } else {
                  _this.signinAlert(status.error);
                }
              },
            );
          });
      },
    );
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
            paddingTop: Platform.OS === 'android' ? 0 : 10,
            backgroundColor: '#fff',
            width: '100%',
            height: Platform.OS === 'android' ? '8%' : '10%',
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: '4%',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.01,
            borderBottomWidth: 0,
            elevation: 3,
          }}>
          <View style={{ width: '10%', justifyContent: 'center' }}>
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => this.props.navigation.goBack()}>
              <IconM name="arrow-back" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ width: '90%', justifyContent: 'center' }}>
            <Text style={{ color: '#000', fontSize: 18, alignSelf: 'center', marginLeft: -30 }}>
              {i18n.t('Account')}
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
          <View
            style={{
              width: '100%',
              height: '8%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '0.3%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.01,
              elevation: 1.5,
            }}>
            <Text
              style={{
                color: 'rgba(0,0,0,0.4)',
                fontSize: 14,
                marginLeft: '7%',
              }}>
              {i18n.t('account_detail')}
            </Text>
          </View>

          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('updateEmail')}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: '9%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '0.3%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.01,
              elevation: 0.3,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                marginLeft: '7%',
              }}>
              {i18n.t('Email')} {i18n.t('Address')}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('updateEmail')}
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
                {this.props.userEmail}
              </Text>
              <IconF name="angle-right" size={20} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('updatePassword')}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: '9%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '0.3%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.01,
              elevation: 0.3,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                marginLeft: '7%',
              }}>
              {i18n.t('Change')} {i18n.t('password')}
            </Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('updatePassword')}
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

          {/* <View
            style={{
              width: '100%',
              height: '8%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '0.3%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.01,
              elevation: 1.5,
            }}>
            <Text
              style={{
                color: 'rgba(0,0,0,0.4)',
                fontSize: 14,
                marginLeft: '7%',
              }}>
              {i18n.t('PREFERENCES')}
            </Text>
          </View> */}

          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('updateUnit')}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: '9%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '6.5%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.01,
              elevation: 0.3,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                marginLeft: '7%',
              }}>
              {i18n.t('Units')}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('updateUnit')}
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
                  fontSize: 15,
                  marginLeft: 'auto',
                }}>
                {i18n.t('mtrk')}
              </Text>
              <IconF name="angle-right" size={20} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('updateIntegration')}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: '9%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '6.5%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.01,
              elevation: 0.3,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                marginLeft: '7%',
              }}>
              {i18n.t('Integrations')}
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('updateIntegration')
              }
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
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('updateNotification')}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: '9%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '6.5%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.01,
              elevation: 0.3,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                marginLeft: '7%',
              }}>
              {i18n.t('Notifications')}
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('updateNotification')
              }
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
                  fontSize: 15,
                  marginLeft: 'auto',
                }}>
                {i18n.t('On')}
              </Text>
              <IconF name="angle-right" size={20} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            onPress={() => this.deleteAccountAlert()}
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: '9%',
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '0.3%',
              shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.01,
              elevation: 0.3,
            }}>
            <Text
              style={{
                color: 'red',
                justifyContent: 'center',
                fontSize: 14,
              }}>
              {i18n.t('dlt_m_Acc')}
            </Text>
            <TouchableOpacity
              style={{position: 'absolute', flexDirection: 'row'}}
              onPress={() => this.setModalVisible(false)}>
            </TouchableOpacity>
          </TouchableOpacity> */}

        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    userData: state.USER_DATA.user,
    routeName: state.ROUTE_NAME.routeName,
    userName: state.USER_DATA.user.name,
    userEmail: state.USER_DATA.user.email,
    userGender: state.UPDATE_USERDETAIL.gender,
    userAge: state.UPDATE_USERDETAIL.age,
    userHeight: state.UPDATE_USERDETAIL.height,
    userId: state.USER_DATA.user._id,
    token: state.SESSION_KEY.sessionKey,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);

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
