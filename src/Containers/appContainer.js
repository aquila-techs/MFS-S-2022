import React, { Component } from 'react';
import ReactNative, { Platform } from 'react-native';
import { StatusBar, ImageBackground, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from 'react-redux';
import { ActionCreators } from '../Actions';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import App from '../Routes/index';

import Colors from '../Theme/Colors';
const { View, StyleSheet } = ReactNative;
const USER_KEY = 'accessToken';
const USER_DATA = 'user';
const SPLASH = 'splash';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: true,
      data: [],
      isOnboarding: true,
      animationCompleted: false,
      userType: 'cu',
      signIn: false,
      createPharmacy: false,
      a: '',
      b: [],
      login: '',
      timePassed: false,
      checkSplash: false,
    };
  }

  componentDidMount() {
    I18n.locale = this.props.languageget;

    setTimeout(() => {
      this.setState({
        animationCompleted: true,
      });
    }, 3000);

    AsyncStorage.getItem(SPLASH)
      .then(res => {


        if (Platform.OS == 'ios') {
          if (res === null) {


            this.setState({ checkSplash: true });
          } else {


            this.setState({ checkSplash: false });
            this.afterSplashCheck();
          }
        } else {
          if (res !== null) {

            this.setState({ checkSplash: true });
          } else {

            this.setState({ checkSplash: false });
            this.afterSplashCheck();
          }
        }
      })
      .catch(err => reject(err));
  }

  afterSplashCheck() {
    const _this = this;
    AsyncStorage.multiGet([USER_KEY, USER_DATA])
      .then(res => {
        if (res !== null) {
          var data = {
            accessToken: null,
            user: null,
          };
          //alert('Splash = '+JSON.stringify(res))
          res.forEach((item, index) => {

            if (item[0] == 'accessToken') {

              data.accessToken = item[1];
            } else if (item[0] == 'user') {

              data.user = JSON.parse(item[1]);
            }
          });
          if (data.accessToken == null) {
            this.setState({ signedIn: false, isOnboarding: false });
          } else {
            _this.props.setUserDataAction(data).then(status => {

              if (status.status) {
                if (data.user.type == 'p' && data.user.pharmacy == null) {
                  this.setState({
                    signedIn: true,
                    data: data.user,
                    isOnboarding: false,
                    createPharmacy: true,
                  });
                } else {
                  this.setState({
                    signedIn: true,
                    data: data.user,
                    isOnboarding: false,
                    createPharmacy: false,
                  });
                  AsyncStorage.getItem('userFeatures').then(res => {
                    var resFeatures = JSON.parse(res);

                    if (resFeatures !== false) {
                      _this.props
                        .setUserFeaturesAsyncDataAction(resFeatures)
                        .then(status => {
                          if (status.status) {

                          }
                        })
                        .catch(err => console.log(err));
                    } else {
                      this.setState({ signedIn: false, isOnboarding: true });

                    }

                  });
                }
              } else {

              }
            });
          }
        } else {
          this.setState({ signedIn: false, isOnboarding: false });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.animationCompleted) {
      return (
        <ImageBackground
          source={require('../Assets/Splash_Bg.jpg')}
          style={styles.container}>
          {Platform.OS === 'ios' ? (
            <StatusBar backgroundColor="transparent" barStyle="light-content" />
          ) : null}

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                width: '100%',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../Assets/Images/logo.png')}
                style={{ width: '100%', height: '35%' }}
              />
            </View>
            <Text style={styles.btnText}>Your Digital Personal Trainer</Text>
          </View>
        </ImageBackground>

      );
    } else {
      if (this.state.signedIn == null || this.state.isOnboarding == null) {
        return null;
      } else {
        return (
          <App />
          // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>HELLO ZOURAIZ</Text></View>
        )

      }

    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },

  logoImage: {
    height: '10%',
  },

  btnText: {
    color: 'white',
    padding: 20,
    marginBottom: 0,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -110

  },

  loginButton: {
    backgroundColor: Colors.green,
    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },

    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});


function mapStateToProps(state) {
  return {
    token: state.featuse,
    isLoggedIn: state.featuse,
    languageget: state.LANGUAGE_TRANSLATE.languageget,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
