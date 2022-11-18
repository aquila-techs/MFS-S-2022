
import {API_URL} from '../../../../Actions';
import {ActionCreators} from '../../../../Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Colors from '../../../../Theme/Colors';
var Spinner = require('react-native-spinkit');
import IconF from 'react-native-vector-icons/FontAwesome5';
const {height, width} = Dimensions.get('window');

import I18n from 'react-native-i18n';

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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Responsive from 'react-native-lightweight-responsive';
import renderIf from 'render-if';

import localize from '../../../../translation';
import LocalizeController from '../../../../translation/LocalizeController';

import RNRestart from 'react-native-restart';

const HEIGHT = Dimensions.get('window').height;

class Login extends React.Component {
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
    this.setState({});

  }

  setLang(lang) {
 
    this.setState({
      currentLang: lang,
    });
  }

  _onSetLanguageToItalian = () => {
   
    const {currentLang} = this.state;
    if (currentLang === 'English' || currentLang === null) {
      this.setLang('Dutch');
      AsyncStorage.setItem('lang', 'Dutch')
        .then(() => {
          LocalizeController.setLanguage('nl');
          localize.locale = 'nl';
          RNRestart.Restart();
          I18nManager.forceRTL(false);
        })
        .catch(err => console.log('error:', err));
    } else if (currentLang === 'Dutch') {
      this.setLang('English');
      AsyncStorage.setItem('lang', 'English')
        .then(() => {
          LocalizeController.setLanguage('en');
          localize.locale = 'en';
          I18nManager.forceRTL(false);
          RNRestart.Restart();
        })
        .catch(err => console.log('error:', err));
    }
  };

  signinAlert(message) {
    Alert.alert('Login', message, [{text: 'OK', onPress: () => {}}], {
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
                  _this.props.setUserSignUpCheck(false);
                  if (this.props.userData.type == 'cu') {
                    _this.props.navigation.navigate('goal');
                    // AsyncStorage.setItem('userFeaturesCheck', 'true').then(() => {
                    // }).catch(err => console.log('error:', err));
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
      .sendForgotEmailFunc({email: this.state.emailForgot})
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
      <SafeAreaView style={styles.root} forceInset={{top: 'always'}}>
        <View
          style={{
            marginTop: hp(30),
            margin: 20,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text style={styles.signUpTitle}>{localize.t('login')}</Text>
        </View>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          style={{}}>
          <Image
            ref={component => {
              this._proPic = component;
            }}
            resizeMode="contain"
            source={require('../../../../Assets/Images/logoBlack.png')}
            style={styles.womanMobile}
          />

          <View
            style={{
              justifyContent: 'center',
              padding: 23,
              paddingHorizontal: 40,
            }}>
            <TextInput
              placeholder={localize.t('email')}
              placeholderTextColor={Colors.grey}
              style={{
                height: hp(32),
                borderColor: Colors.lightGrey,
                borderWidth: 1,
                paddingHorizontal: 10,
                marginTop: 10,
                borderRadius: hp(5),
                color: '#353635',
              }}
              autoCapitalize={false}
              onChangeText={text => {
                this.setState({
                  email: text,
                });
              }}
              value={this.state.email}
            />
            <TextInput
              placeholder={localize.t('password')}
              placeholderTextColor={Colors.grey}
              style={{
                height: hp(32),
                borderColor: Colors.lightGrey,
                borderWidth: 1,
                paddingHorizontal: 10,
                marginTop: 10,
                borderRadius: hp(5),
                color: '#353635',
              }}
              onChangeText={text => {
                this.setState({
                  password: text,
                });
              }}
              autoCapitalize={false}
              secureTextEntry={true}
              value={this.state.password}
            />

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 25,
              }}>
              <Text
                onPress={() => this.setState({showForgot: true})}
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: Colors.grey,
                }}>
                {localize.t('forgotPassword')}?
              </Text>
            </View>
            {this.state.signinLoader ? (
              <View
                style={{
                  marginTop: hp(15),
                  // borderColor: '#B76EC6',
                  // borderWidth: 1,
                  backgroundColor: Colors.green,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: hp(5),
                }}>
                <Spinner
                  style={{margin: 0, padding: 0}}
                  type={'ThreeBounce'}
                  isVisible={this.state.signinLoader}
                  size={36}
                  color={'#fff'}
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => this.submit()}
                style={{
                  marginTop: hp(15),
                  height: hp(32),
                  // borderColor: '#B76EC6',
                  // borderWidth: 1,
                  backgroundColor: Colors.green,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: hp(5),
                }}>
                <Text
                  style={{
                    fontSize: hp(15),
                    fontWeight: '500',
                    color: '#fff', //'#353635'
                  }}>
                  {localize.t('login')}
                </Text>
              </TouchableOpacity>
            )}

            {this.state.errorText != '' ? (
              <Text
                style={{
                  color: Colors.error,
                  fontSize: 12,
                  padding: 5,
                  textAlign: 'center',
                }}>
                {this.state.errorText}
              </Text>
            ) : null}
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: hp(30),
              }}>
              <View
                style={{
                  marginVertical: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 40,
                }}>
                <View
                  style={{
                    backgroundColor: Colors.lightGrey,
                    flex: 1,
                    padding: 1,
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: Colors.grey,
                    marginHorizontal: 12,
                  }}>
                  {localize.t('or')}
                </Text>
                <View
                  style={{
                    backgroundColor: Colors.lightGrey,
                    flex: 1,
                    padding: 1,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '500',
                  color: 'black',
                  marginHorizontal: 12,
                }}>
                {localize.t('languageWord')}:
              </Text>
              <TouchableOpacity onPress={() => this._onSetLanguageToItalian()}>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: '#000',
                    fontSize: 15,
                  }}>
                  {localize.locale == 'nl' ? 'English' : 'Dutch'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: hp(20),
          }}>
          <Text
            onPress={() => this.props.navigation.navigate('Signup')}
            style={{
              fontSize: 13,
              padding: 5,
              fontWeight: '600',
              color: Colors.grey,
            }}>
            {localize.t('signUpAccount')}?{' '}
            <Text style={{color: Colors.green}}>{localize.t('signUp')}</Text>
          </Text>
        </View>

        {this.state.showForgot ? (
          <Modal
            isVisible={this.state.showForgot}
            animationType="slide"
            transparent={true}
            onDismiss={() => {
              this.setState({showForgot: false});
            }}
            onRequestClose={() => {
              this.setState({showForgot: false});
            }}>
            <TouchableOpacity
              style={{flex: 1}}
              activeOpacity={1}
              onPressOut={() => {
                this.setState({showForgot: false});
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}>
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      padding: 15,
                      marginHorizontal: 20,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      alignSelf: 'center',
                      width: '80%',
                    }}>
                    <TextInput
                      placeholder={localize.t('email')}
                      placeholderTextColor={Colors.grey}
                      style={{
                        height: hp(28),
                        borderColor: Colors.lightGrey,
                        borderWidth: 1,
                        borderRadius: hp(5),
                        paddingHorizontal: 5,
                      }}
                      onChangeText={text => {
                        this.setState({
                          emailForgot: text,
                          emailForgotErrorText:
                            text.length > 0 && text != ''
                              ? ''
                              : "Email can't be empty",
                        });
                      }}
                      value={this.state.emailForgot}
                    />
                    {this.state.emailForgotErrorText != '' ? (
                      <Text
                        style={{
                          color: Colors.error,
                          fontSize: 12,
                          padding: 5,
                          textAlign: 'center',
                        }}>
                        {this.state.emailForgotErrorText}
                      </Text>
                    ) : null}

                    <TouchableOpacity
                      onPress={() => {
                        this.state.emailForgot == ''
                          ? this.setState({
                              emailForgotErrorText: "Email can't be empty",
                            })
                          : this.setState({showForgot: false}, () =>
                              this.sendForgotEmail(),
                            );
                      }}
                      style={{
                        marginTop: hp(8),
                        height: hp(28),
                        // borderColor: '#B76EC6',
                        // borderWidth: 1,
                        padding: 5,
                        alignItems: 'center',
                        backgroundColor: Colors.green,
                        justifyContent: 'center',
                        borderRadius: hp(5),
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '500',
                          color: '#fff', //'#353635'
                        }}>
                        {localize.t('send')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableOpacity>
          </Modal>
        ) : null}
        {this.state.showVerificationLink ? (
          <Modal
            isVisible={this.state.showVerificationLink}
            animationType="slide"
            transparent={true}
            onDismiss={() => {
              this.setState({showVerificationLink: false});
            }}
            onRequestClose={() => {
              this.setState({showVerificationLink: false});
            }}>
            <TouchableOpacity
              style={{flex: 1}}
              activeOpacity={1}
              onPressOut={() => {
                this.setState({showVerificationLink: false});
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}>
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      padding: 15,
                      marginHorizontal: 20,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      alignSelf: 'center',
                      width: '80%',
                    }}>
                    <Text>{localize.t('accountVerifiedText')}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({showVerificationLink: false}, () =>
                          this.sendVerificationLink(),
                        );
                      }}
                      style={{
                        marginTop: hp(8),
                        // borderColor: '#B76EC6',
                        // borderWidth: 1,
                        padding: 10,
                        backgroundColor: '#B76EC6',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: hp(5),
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '500',
                          color: '#fff', //'#353635'
                        }}>
                        {localize.t('resendText')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableOpacity>
          </Modal>
        ) : null}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    sessionKey: state.SESSION_KEY.sessionKey,
    userData: state.USER_DATA.user,
    routeName: state.ROUTE_NAME.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  signUpTitle: {
    // marginLeft: wp(20.1),
    // backgroundColor: "transparent",
    // color: "rgba(0,0,0,1)",
    // fontSize: hp(18),
    // fontFamily: "helvetica",
    // marginTop:hp(10),
    fontSize: hp('4%'),
    fontWeight: '600',
    letterSpacing: 0.7,
    color: Colors.green,
  },
  womanMobile: {
    alignSelf: 'center',
    marginTop: hp(20.6),
    height: hp(153),
    width: wp(224),
    backgroundColor: 'transparent',
  },
  phoneNumberWrapper: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    height: hp(40),
    width: wp(298),
    marginTop: hp(36),
    borderRadius: hp(8),
    borderWidth: hp(1),
  },
  gbFlag: {
    marginLeft: wp(10),
    height: hp(15),
    width: wp(25),
  },
  countryCode: {
    marginLeft: wp(4),
    color: 'rgba(0,0,0,1)',
    fontSize: hp(14),
  },
  line: {
    marginLeft: wp(10.5),
    width: wp(1),
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  phoneTextInput: {
    alignSelf: 'center',
    marginLeft: wp(10),
    width: '80%',
    height: '100%',
  },
  signUpWrapper: {
    marginTop: hp(24.9),
    alignSelf: 'center',
    height: hp(40),
    width: wp(298),
    backgroundColor: 'rgba(122,211,25,1)',
    borderRadius: hp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: hp(10),
    color: '#ffffff',
    fontWeight: 'bold',
  },
  or: {
    marginTop: hp(17.4),
    opacity: 0.5,
    fontSize: hp(8),
    textAlign: 'center',
    color: '#000000',
  },
  signUpWithFacebookWrapper: {
    flexDirection: 'row',
    marginTop: hp(12.4),
    alignSelf: 'center',
    height: hp(40),
    width: wp(298),
    backgroundColor: 'rgba(59,89,152,1)',
    opacity: 0.9,
    borderRadius: 30,
    alignItems: 'center',
  },
  signUpWithFacebook: {
    marginLeft: wp(32),
    fontWeight: 'bold',
    color: 'rgba(255,255,255,1)',
    fontSize: hp(10),
  },
  facebookIcon: {
    marginLeft: wp(18),
    height: hp(32),
    width: hp(32),
    backgroundColor: 'transparent',
  },
  loginWrapper: {
    marginTop: hp(18),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alreadyHaveAnAccountText: {
    color: 'rgba(0,0,0,1)',
    fontSize: hp(10),
    fontFamily: 'helvetica',
  },
  signInText: {
    color: 'rgba(0,0,0,1)',
    fontSize: hp(10),
    fontWeight: 'bold',
    fontFamily: 'helvetica',
  },
});
