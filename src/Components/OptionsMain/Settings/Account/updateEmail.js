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
  scale,
  PixelRatio,
} from 'react-native';
//import styles from './style';
import Colors from '../../../../Theme/Colors';
import {Directions} from 'react-native-gesture-handler';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';

import {ActionCreators} from '../../../../Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import i18n from '../../../../../translation';
import {TextInput, Snackbar} from 'react-native-paper';
import Responsive from 'react-native-lightweight-responsive';

class updateEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      check: true,
      first_name: this.props.userEmail,
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

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            position: 'relative',
            paddingTop: Platform.OS === 'android' ? 0 : 25,
            // marginTop: '4%',
            backgroundColor: '#fff',
            width: '100%',
            height: Platform.OS === 'android' ? '8%' : '10%',
            flexDirection: 'row',
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            shadowOpacity: 0.5,
            borderBottomWidth: 0,
            elevation: 3,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: '7%', paddingTop: 25}}
            onPress={() => this.props.navigation.goBack()}>
            <IconM name="arrow-back" size={25} color="black" />
          </TouchableOpacity>

          <Text style={{color: '#000', fontSize: 18, alignSelf: 'center'}}>
            {i18n.t('Email')}
          </Text>
        </View>

        <View style={{flexDirection: 'row', margin: '6%'}}>
          <TextInput
            autoCapitalize="words"
            style={{
              marginHorizontal: '1%',
              marginTop: Responsive.height(20),
              width: '94%',
              color: '#000',
              backgroundColor: 'transparent',
              paddingHorizontal: 0,
            }}
            theme={{
              colors: {
                //   placeholder: 'white',
                primary: Colors.green,
                // underlineColor: 'transparent', background: '#003489'
              },
            }}
            label={i18n.t('Email')}
            //   error = {this.state.nameError}
            onChangeText={first_name => {
              this.setState({first_name});
            }}
            value={this.state.first_name}
          />
        </View>

        <View style={{width: '100%', marginTop: '10%'}}>
          <TouchableOpacity
            style={{
              height: 50,
              width: 150,
              // borderColor: '#B76EC6',
              // borderWidth: 1,
              backgroundColor: Colors.green,
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}>
            <Text style={{color: '#fff'}}>{i18n.t('Update')} {i18n.t('Email')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    userEmail: state.USER_DATA.user.email,

    // routeName: state.ROUTE_NAME.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(updateEmail);
