import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../Theme/Colors';
import IconF from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Responsive from 'react-native-lightweight-responsive';
import {Fold} from 'react-native-animated-spinkit';

import {ActionCreators} from '../../Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const USER_KEY = 'accessToken';
const USER_DATA = 'user';
const SPLASH = 'splash';
const userFeatures = 'userFeatures';

class beforeSplash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
      data: [],
      isOnboarding: false,
      createPharmacy: false,
      a: '',
      b: [],
      timePassed: false,
      checkSplash: false,
    };
  }

  normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  }

  componentDidMount() {
    // this.props.navigation.navigate('Splash')
    AsyncStorage.getItem(SPLASH)
      .then(res => {
       
        if (res == null) {
        
          this.setState({checkSplash: true});
          setTimeout(() => {
            this.props.navigation.navigate('Splash');
          }, 3000);
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
            this.checkLogin();
          } else {
            //_this.props.navigation.setParams({ userD: data });
            // console.log('case else: ',JSON.stringify(data))
            //   return
            _this.props.setUserDataAction(data).then(status => {
              if (status.status) {
                if (data.user.type == 'p' && data.user.pharmacy == null) {
                  this.setState({
                    signedIn: true,
                    data: data.user,
                    isOnboarding: false,
                    createPharmacy: true,
                  });
                  this.checkLogin();
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
                            // alert("ffass")
                            this.checkLogin();
                          }
                        })
                        .catch(err => reject(err));
                    } else {
                      this.setState({signedIn: false, isOnboarding: true});
                      const data = {
                        signedIn: false,
                        isOnboarding: true,
                        beforeSplash: false,
                      };
                      this.props.navigation.navigate('goal');
                    }
                  });
                }
              } else {
                // this.props.navigation.navigate('Login')
              }
            });
          }
        } else {
          this.checkLogin();
          this.setState({signedIn: false, isOnboarding: false});
        }
      })
      .catch(err => reject(err));
  }

  checkLogin() {
    //alert('checkLogin')
    if (this.state.isOnboarding) {
      setTimeout(() => {
        this.props.navigation.navigate('goal');
      }, 2000);
    } else if (this.state.signedIn && this.state.data.type == 'cu') {
      setTimeout(() => {
        this.props.navigation.navigate('HomeMain');
      }, 2000);
    } else {
      setTimeout(() => {
        this.props.navigation.navigate('Login');
      }, 2000);
    }
  }

  render() {
    return (
      <ImageBackground style={styles.container}>
        {Platform.OS === 'ios' ? (
          <StatusBar backgroundColor="transparent" barStyle="light-content" />
        ) : null}
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            resizeMode="contain"
            source={require('./../../Assets/Images/Icon-01.png')}
            style={{
              height: Responsive.height(54),
              width: Responsive.width(54),
              marginBottom: Responsive.height(24),
            }}
          />
          <Fold size={30} color="#000" />
        </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    // abc:state.abc,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(beforeSplash);

const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  logoImage: {
    height: '10%',
  },

  btnText: {
    color: 'white',
    padding: 20,
    marginBottom: 160,
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  buttonContainer: {
    height: Responsive.height(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: Responsive.width(300),
    borderRadius: 5,
    backgroundColor: 'transparent',
    marginBottom: Responsive.height(200),
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
