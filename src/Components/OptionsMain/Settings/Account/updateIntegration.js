import React, { Component } from 'react';
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
  PixelRatio

} from 'react-native';
//import styles from './style';
import Colors from '../../../../Theme/Colors'
import { Directions } from 'react-native-gesture-handler';
import IconF from 'react-native-vector-icons/FontAwesome'
import IconM from 'react-native-vector-icons/MaterialIcons';

import { ActionCreators } from '../../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../../../../translation';
import { TextInput, Snackbar } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';


class updateIntegration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      check: true,
      first_name: this.props.userEmail,
    }
  }



  normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }

  render() {
    return (
      <View style={{
        width: '100%', height: '100%', backgroundColor: '#fff',
      }}>

        <View style={{
          paddingTop: Platform.OS === 'android' ? heightPercentageToDP(5) : 10,
          backgroundColor: '#fff', width: '100%', height: Platform.OS === 'android' ? '8%' : '10%',
          flexDirection: 'row', backgroundColor: 'white', alignSelf: 'center',
          alignContent: 'center', alignItems: 'center', justifyContent: 'center',
          shadowOpacity: 0.5, borderBottomWidth: 0, elevation: 3,
        }}>
          <TouchableOpacity
            style={{ position: 'absolute', left: '7%' ,top:45}}
            onPress={() => this.props.navigation.goBack()}>
            <IconM name="arrow-back" size={25} color='black' />
          </TouchableOpacity>

          <Text style={{ color: "#000", fontSize: 18, alignSelf: 'center' }}>{i18n.t('Integration')}</Text>


        </View>


        <View style={{
          flexDirection: 'row', margin: '6%', width: '100%', justifyContent: 'center',
          alignSelf: 'center', alignContent: 'center', alignItems: 'center',
        }}>

          <Text style={{ color: Colors.green, fontSize: 14 }}>{i18n.t('system_seting')}</Text>

        </View>

        <View style={{ width: '90%', marginTop: '5%', margin: '6%', }}>
          <Text style={{ color: 'rgba(0,0,0,0.3)', fontSize: 13 }}>{i18n.t('system_str')}</Text>

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
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(updateIntegration);
