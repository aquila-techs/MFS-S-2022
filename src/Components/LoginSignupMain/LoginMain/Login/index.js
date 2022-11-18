import { API_URL } from '../../../../Actions';
import { ActionCreators } from '../../../../Actions';
import { bindActionCreators } from 'redux';
import { connect, useDispatch } from 'react-redux';
import Colors from '../../../../Theme/Colors';
var Spinner = require('react-native-spinkit');
import { SocialIcon } from 'react-native-elements';
import IconF from 'react-native-vector-icons/FontAwesome5';
const { height, width: WIDTH } = Dimensions.get('window');

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
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
  I18nManager,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Responsive from 'react-native-lightweight-responsive';
import renderIf from 'render-if';

import i18n from '../../../../../translation';
import { Icon, Overlay, CheckBox } from 'react-native-elements'
import RNRestart from 'react-native-restart';
import RNFetchBlob from 'rn-fetch-blob';
import { Sociallogin } from './SocialLogin/index';
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
      emailForgot: '',
      emailUnique: false,
      email: '',
      password: '',
      visible: false,
      errorText: '',
      secure: true,
      tokenVerification: '',
      signinLoader: false,
      showVerificationLink: false,
      currentLang: null,
      Engchecked: false,
      Dutchchecked: false,
      showForgot: false,
      loadingForgot: false
    };
  }

  UNSAFE_componentWillMount() {
    if (this.props?.languageget === 'en') {
      this.setState({
        Engchecked: true
      })
    } else {
      this.setState({
        Dutchchecked: true
      })
    }

  }
  setLang(lang) {
    //	alert(lang)
    this.setState({
      currentLang: lang,
    });
  }

  signinAlert(message) {
    Alert.alert('Login', message, [{ text: 'OK', onPress: () => { } }], {
      cancelable: false,
    });
  }

  submit() {

    if (this.state.email == '') {
      this.setState({
        errorText: i18n.t('emailErrorText'),
      });
    } else if (this.state.password == '') {
      this.setState({
        errorText: i18n.t('passwordErrorText'),
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
          _this.props.signin(signindata).then(async status => {
            await AsyncStorage.setItem('IsLoggedin', 'Login');
            _this.setState(
              {
                signinLoader: false,
              },
              () => {
                if (status.status) {

                  _this.props.setUserSignUpCheck(false);
                  if (this.props.userData.type == 'cu') {

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
                    this.setState({ errorText: 'Incorrect email or password' })
                    // _this.signinAlert(status.error);
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
    _this.props
      .sendVerificationLinkFunc(this.state.tokenVerification, {
        email: this.state.email,
      })
      .then(status => {
        if (status.status) {
          _this.signinAlert(i18n.t('signInAlertText'));
        }
      });
  }

  sendForgotEmail() {
    this.setState({ loadingForgot: true })
    let data = {
      email: this.state.emailForgot,
    };
    RNFetchBlob.fetch(
      'POST',
      API_URL + '/user/send/reset/password/email',
      {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      JSON.stringify(data),
    )
      .then(response => {
        const data = JSON.parse(response.data);
        if (data?.success) {
          Alert.alert('Success!', data?.message)
          this.setState({
            showForgot: false,
            loadingForgot: false,
            emailForgotErrorText: data?.message,
            emailForgot: '',
            email: '',
            password: '',
          });
        } else {
          this.setState({
            loadingForgot: false,
            emailForgotErrorText: 'You email not exist!',
            emailForgot: '',
            email: '',
            password: '',
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  languagetouglr = value => {
    const _this = this;


    setTimeout(() => {
      this.setState({
        visible: !this.state.visible
      })
    }, 500);
    if (value === 'en') {
      AsyncStorage.setItem('LANGUAGE', value)
      _this.props.LanguageTranslation(value)
      this.setState({
        Engchecked: !this.state.Engchecked,
        Dutchchecked: false,
      })
    } else {
      AsyncStorage.setItem('LANGUAGE', value)
      _this.props.LanguageTranslation(value)
      this.setState({
        Dutchchecked: !this.state.Dutchchecked,
        Engchecked: false,
      })
    }
    setTimeout(() => {
      RNRestart.Restart();
    }, 1000);
  };
  
  ToggleOverlay = () => {
    this.setState({
      visible: !this.state.visible
    })
  };


  render() {
    const { visible } = this.state
    return (
      <SafeAreaView style={styles.root} forceInset={{ top: 'always' }}>

        {visible &&
          <Overlay overlayStyle={{ borderRadius: 10 }} isVisible={visible} onBackdropPress={() => this.ToggleOverlay()}>
            <View style={{ width: wp('85'), borderRadius: 10, height: hp('30') }}>
              <Text style={{ textAlign: 'center', fontSize: 20, padding: 10, marginTop: 10, fontWeight: 'bold' }}>{i18n.t('change_lan')}</Text>
              <View style={{ justifyContent: 'center', height: hp(20), marginTop: 0 }}>

                <TouchableOpacity onPress={() => this.languagetouglr('en')} style={{ marginTop: 5, backgroundColor: this.state.Engchecked == true ? Colors.green : '#ffffff', borderWidth: this.state.Engchecked == true ? 0 : 1, borderColor: this.state.Engchecked == true ? Colors.green : '#eeeeee', borderRadius: 5, width: 280, alignSelf: 'center' }}>
                  <Text style={{ alignSelf: 'center', color: this.state.Engchecked == true ? '#ffffff' : '#000000', fontWeight: 'bold', padding: 10, fontSize: 16 }}>English</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.languagetouglr('nl')} style={{ marginTop: 10, backgroundColor: this.state.Dutchchecked == true ? Colors.green : '#ffffff', borderWidth: this.state.Dutchchecked == true ? 0 : 1, borderColor: this.state.Dutchchecked == true ? Colors.green : '#eeeeee', borderRadius: 5, width: 280, alignSelf: 'center' }}>
                  <Text style={{ alignSelf: 'center', color: this.state.Dutchchecked == true ? '#ffffff' : '#000000', fontWeight: 'bold', padding: 10, fontSize: 16 }}>Dutch</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        }
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
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

            <View>
              <View style={{ marginTop: '2%' }}>
                <View style={styles.firstInput}>
                  <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    placeholder={i18n.t('placeholderEmail')}
                    placeholderTextColor={'#000000'}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                  />
                </View>
              </View>

              <View style={{ marginTop: '3%' }}>
                <View style={styles.firstInput}>
                  <TextInput
                    style={styles.input}
                    placeholder={i18n.t('placeholderPassword')}
                    placeholderTextColor={'#000000'}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    secureTextEntry={this.state.secure}
                  />
                  <TouchableOpacity onPress={() => { this.setState({ secure: !this.state.secure }) }}>
                    {this.state.secure ?
                      <Image style={{ width: 25, height: 25, marginTop: 10 }} source={require('../../../../Assets/icon/eye.png')} />
                      :
                      <Image style={{ width: 25, height: 25, marginTop: 10 }} source={require('../../../../Assets/icon/eye2.png')} />
                    }
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View>
              <TouchableOpacity onPress={() => this.setState({ showForgot: true })} style={{ width: 160, alignSelf: 'flex-end', marginTop: 18 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf: 'flex-end' }}>{i18n.t('placeholderForgotPassword')}</Text>
              </TouchableOpacity>
            </View>

            {this.state.signinLoader ? (
              <TouchableOpacity
                style={{
                  marginTop: 50,
                  backgroundColor: Colors.green,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  height: 50
                }}>
                <Spinner
                  style={{ margin: 0, padding: 12 }}
                  type={'ThreeBounce'}
                  isVisible={this.state.signinLoader}
                  size={36}
                  color={'#fff'}
                />
              </TouchableOpacity>

            ) : (
              <TouchableOpacity
                onPress={() => this.submit()}
                style={{
                  marginTop: 50,
                  backgroundColor: Colors.green,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: Responsive.height(15),
                    fontWeight: '500',
                    color: '#fff',
                    padding: 12
                  }}>
                  {i18n.t('login')}
                </Text>
              </TouchableOpacity>
            )}

            {this.state.errorText != '' ? (
              <View style={{ backgroundColor: '#f1f1f1', borderRadius: 5, marginTop: 10 }}>
                <Text style={{ color: '#000000', fontSize: 16, padding: 10, alignSelf: 'center' }}>  {this.state.errorText}</Text>
              </View>
            ) : null}
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: Responsive.height(30),
              }}>

            </View>
          </View>

        </KeyboardAwareScrollView>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: Responsive.height(20),
          }}>

          <TouchableOpacity onPress={() => this.ToggleOverlay()} style={{ backgroundColor: '#f1f1f1', borderRadius: 5, width: 200, marginBottom: 12 }}>
            <Text style={{ color: '#888888', padding: 10, fontSize: 16, alignSelf: 'center' }}>{i18n.t('change_language')}</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text
              onPress={() => this.props.navigation.navigate('Signup')}
              style={{
                fontSize: 16,
                padding: 5,
                color: '#000000',
              }}>
              {i18n.t('signUpAccount')}?{' '}
              <Text style={{ color: '#000000', fontWeight: 'bold' }}>{i18n.t('signUp')}</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/*Forgot Password Modal Start */}
        <Modal
          transparent={true}
          visible={this.state.showForgot}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(213,223,239,0.7)" }}>
            <View style={{ backgroundColor: "#fff", height: "100%", width: '100%' }}>
              <ScrollView>

                <View style={{ flexDirection: 'row', padding: 15, paddingTop: 25, paddingBottom: 20 }}>
                  <View style={{ width: '60%', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.setState({ showForgot: false })}>
                      <Text style={{ fontWeight: 'bold', fontSize: 22, marginLeft: 20 }}>Back</Text>
                    </TouchableOpacity>
                  </View>
                </View>


                <View style={{ marginTop: '50%' }}>

                  <Text style={{ fontWeight: 'bold', fontSize: 22, alignSelf: 'center' }}>Forgot Password?</Text>

                  <View style={{ marginTop: '20%' }}>
                    <View style={styles.firstInput}>
                      <TextInput
                        style={styles.input}
                        placeholder={i18n.t('email')}
                        placeholderTextColor={'#000000'}
                        value={this.state.emailForgot}
                        onChangeText={text => {
                          this.setState({
                            emailForgot: text,
                            emailForgotErrorText:
                              text.length > 0 && text != ''
                                ? ''
                                : "Email can't be empty",
                          });
                        }}
                      />
                    </View>
                  </View>

                  {this.state.loadingForgot == true ?

                    <TouchableOpacity
                      style={{
                        marginTop: 10,
                        backgroundColor: Colors.green,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        width: WIDTH - 60,
                        alignSelf: 'center',
                        height: 50
                      }}>
                      <Spinner
                        style={{ margin: 0, padding: 12 }}
                        type={'ThreeBounce'}
                        isVisible={this.state.loadingForgot}
                        size={36}
                        color={'#fff'}
                      />
                    </TouchableOpacity>
                    :

                    <TouchableOpacity
                      onPress={() => {
                        this.state.emailForgot == ''
                          ? this.setState({
                            emailForgotErrorText: "Email can't be empty",
                          })
                          : this.setState({ showForgot: true }, () =>
                            this.sendForgotEmail(),
                          );
                      }}
                      style={{
                        marginTop: 10,
                        backgroundColor: Colors.green,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        width: WIDTH - 60,
                        alignSelf: 'center'
                      }}>
                      <Text
                        style={{
                          fontSize: Responsive.height(15),
                          fontWeight: '500',
                          color: '#fff',
                          padding: 12
                        }}>
                        {i18n.t('send')}
                      </Text>
                    </TouchableOpacity>
                  }



                </View>

                {this.state.emailForgotErrorText == '' ? null :
                  <Text style={{ color: '#000000', fontSize: 16, padding: 10, alignSelf: 'center' }}>{this.state.emailForgotErrorText}</Text>
                }


              </ScrollView>

            </View>
          </SafeAreaView>
        </Modal >
        {/* Forgot Password Modal End */}


      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    sessionKey: state.SESSION_KEY.sessionKey,
    userData: state.USER_DATA.user,
    routeName: state.ROUTE_NAME.routeName,
    languageget: state.LANGUAGE_TRANSLATE.languageget,
    isBoardingChecked: state.UPDATE_USERDETAIL.isBoardingChecked
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
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.7,
    color: Colors.green,
  },
  womanMobile: {
    alignSelf: 'center',
    marginTop: '20%',
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
    marginTop:  Responsive.height(36),
    borderRadius:  Responsive.height(8),
    borderWidth:  Responsive.height(1),
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
    height: Responsive.height(+40),
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
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // borderWidth: 0.5,
    // borderColor: '#000',
    // height: 40,
    // borderRadius: 5,
    // margin: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },




  firstInput: {
    width: WIDTH - 60,
    marginTop: 0,
    marginHorizontal: 0,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: "#eeeeee",
    flexDirection: 'row'
  },
  input: {
    width: WIDTH - 110,
    height: 42,
    padding: 10,
    marginBottom: 0,
    backgroundColor: 'transparent',
    color: '#000000',
    fontSize: 16
  },
});
