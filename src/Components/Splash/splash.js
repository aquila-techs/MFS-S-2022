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
  PixelRatio,
} from 'react-native';
import Colors from '../../Theme/Colors';
import IconF from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Responsive from 'react-native-lightweight-responsive';

import {ActionCreators} from '../../Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'accessToken';
const USER_DATA = 'user';
const SPLASH = 'splash';

class splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
      data: [],
      isOnboarding: false,
      createPharmacy: false,
      a: '',
      b: [],
      splashCheck: false,
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
    let value = AsyncStorage.getItem('IsLoggedin');
  
    const _this = this;
  
  }

  checkLogin() {
    const _this = this;
    _this.props.setSplashAction().then(status => {
      if (status.status) {
        _this.props.updateSubscriptionPlan('Free');
        this.props.navigation.navigate('Login');
      }
    });
  }

  onClickListener = viewId => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };
  check() {
    const a = 'abcdhhj';
    this.props.checkValue(a);
    this.props.navigation.navigate('Splash2');
  }

  render() {
    return (
      <ImageBackground
        source={require('../../../src/Assets/splash-bg.jpg')}
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
              source={require('./../../Assets/Images/logo.png')}
              style={{width: '100%', height: '35%'}}
            />
          </View>
          {/* <Text style={styles.btnText}>Di Lorenzo Nutrition App</Text> */}
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          //onPress={()=>this.check()}

          onPress={() => this.checkLogin()}>
          <Text style={styles.loginText}>START</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    abc: state.abc,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(splash);

const resizeMode = 'center';
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
    marginBottom: 160,
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  buttonContainer: {
    height: hp(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(300),
    borderRadius: 5,
    backgroundColor: 'transparent',
    marginBottom: hp(200),
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
