import React, {Component} from 'react';
import ReactNative from 'react-native';
import {SafeAreaView, PermissionsAndroid, Linking, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createRootNavigator } from "../Routes";
import {connect} from 'react-redux';
import {ActionCreators} from './src/Actions';
import {bindActionCreators} from 'redux';
import App from './App2';
import Colors from './src/Theme/Colors';
import LottieView from 'lottie-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createSwitchNavigator,
  createCompatNavigatorFactory,
} from '@react-navigation/compat';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import IconF5 from 'react-native-vector-icons/FontAwesome5';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import IconI from 'react-native-vector-icons/Ionicons';

import localize from './src/translation';
import Responsive from 'react-native-lightweight-responsive';

let granted;
const {View, StyleSheet} = ReactNative;
const USER_KEY = 'accessToken';
const USER_DATA = 'user';
const SPLASH = 'splash';
const userFeatures = 'userFeatures';

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
      timePassed: false,
      checkSplash: false,
    };
  }

  componentDidMount() {
    // this.props.navigation.navigate('Splash')
    AsyncStorage.getItem(SPLASH)
      .then(res => {

        if (res == null) {
       
          this.setState({checkSplash: true});
        } else {
       
          //alert(JSON.stringify(res))
          this.setState({checkSplash: false});
          this.afterSplashCheck();
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
          res.forEach((item, index) => {
         
            if (item[0] == 'accessToken') {
             
              data.accessToken = item[1];
            } else if (item[0] == 'user') {
             
              data.user = JSON.parse(item[1]);
            }
          });
          if (data.accessToken == null) {
            this.setState({signedIn: false, isOnboarding: false});
          } else {
            _this.props.setUserDataAction(data).then(status => {
              //    alert(JSON.stringify(data))
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
                    // alert(resFeatures)
                    if (resFeatures !== false) {
                      _this.props
                        .setUserFeaturesAsyncDataAction(resFeatures)
                        .then(status => {
                          if (status.status) {
                            //alert(JSON.stringify(resFeatures))
                            // this.checkLogin()
                          }
                        })
                        .catch(err => reject(err));
                    } else {
                      this.setState({signedIn: false, isOnboarding: true});
                      //    this.props.navigation.navigate('goal')
                    }
                  });
                }
              } else {
                // this.props.navigation.navigate('Login')
              }
            });
          }
        } else {
          this.setState({signedIn: false, isOnboarding: false});
        }
      })
      .catch(err => reject(err));
  }

  //    checkLogin(){
  //      //alert('checkLogin')
  //        if (this.state.isOnboarding) {
  //          setTimeout(() => {
  //              this.props.navigation.navigate('goal')
  //          }, 2000);
  //        }else if (this.state.signedIn && this.state.data.type == 'cu'){
  //          setTimeout(() => {
  //              this.props.navigation.navigate('HomeMain')
  //          }, 2000);
  //        }
  //        else {
  //          setTimeout(() => {
  //              this.props.navigation.navigate('Login')
  //          }, 2000);

  //        }

  //    }

  animationCompleted() {
    this.setState({
      animationCompleted: true,
    });
  }

  render() {
    //const Layout = createRootNavigator(this.state.signedIn, this.state.isOnboarding, this.state.userType);
    if (!this.state.animationCompleted) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            resizeMode="contain"
            source={require('./src/Assets/Images/Icon-01.png')}
            style={{height: Responsive.height(54), width: Responsive.width(54)}}
          />
          <LottieView
            style={{width: wp('25%'), height: hp('25%')}}
            source={require('./src/Assets/logo.json')}
            loop={false}
            autoPlay
            onAnimationFinish={() => {
              this.animationCompleted();
            }}
          />
        </View>
      );
    } else {
      if (this.state.signedIn == null || this.state.isOnboarding == null) {
        return null;
      } else {
      
        return <App />;
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    //  shouldReload: state.TABS_STATUS.shouldReload,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
