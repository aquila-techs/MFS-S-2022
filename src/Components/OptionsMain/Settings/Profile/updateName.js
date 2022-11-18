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
  PixelRatio,
} from 'react-native';
//import styles from './style';
import Colors from '../../../../Theme/Colors';
import { Directions } from 'react-native-gesture-handler';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';

import { ActionCreators } from '../../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import I18n from '../../../../../translation';
import { TextInput, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

class updateName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      check: true,
      first_name: props.route.params,
    };
    // console.log('route', props.route.params);
  }

  normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  }

  submit() {
    const { first_name } = this.state;
    const _this = this;
    const updateProfileData = {
      gender: this.props.userGender,
      name: this.state.first_name,
    };
    this.setState(
      {
        updateHeightLoader: true,
      },
      () => {
        _this.props
          .updateProfile(updateProfileData, this.props.token, this.props.userID)
          .then(status => {
            //alert(JSON.stringify(status.status))
            _this.setState(
              {
                updateHeightLoader: false,
              },
              () => {
                if (status.status) {
                  this.props.setUserDataName(this.state.first_name);
                  alert(I18n.t('nameUpdate'));
                  this.props.navigation.navigate('profile');
                }
              },
            );
          });
      },
    );
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            position: 'relative',
            paddingTop: Platform.OS === 'android' ? 0 : 14,
            // marginTop: '4%',
            backgroundColor: '#fff',
            width: '100%',
            height: Platform.OS === 'android' ? '8%' : '10%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowOpacity: 0.5,
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
              {I18n.t('Name')}
            </Text>
          </View>

        </View>

        <View style={{ flexDirection: 'row', margin: '6%' }}>
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
            returnKeyType="done"
            theme={{
              colors: {
                //   placeholder: 'white',
                primary: Colors.green,
                // underlineColor: 'transparent', background: '#003489'
              },
            }}
            label={I18n.t('Name')}
            //   error = {this.state.nameError}
            onChangeText={first_name => {
              this.setState({ first_name });
            }}
            value={this.state.first_name}
          />
        </View>

        <View style={{ width: '100%', position: 'absolute', bottom: '10%' }}>
          <TouchableOpacity
            onPress={() => this.submit()}
            style={{
              height: 50,
              width: 250,
              backgroundColor: Colors.green,
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}>
            <Text style={{ color: '#fff' }}>{I18n.t('Update')}  {I18n.t('Name')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    token: state.SESSION_KEY.sessionKey,
    userName: state.USER_DATA.user.name,
    userGender: state.UPDATE_GENDER.updateGender,
    userAge: state.UPDATE_USER_AGE.updateUserAge,
    userHeight: state.UPDATE_USER_HEIGHT.updateUserHeight,
    userWeight: state.UPDATE_USER_WEIGHT.updateUserWeight,
    activityLevel: state.UPDATE_USERDETAIL.activityLevel,
    EBF: state.UPDATE_USER_EBF.updateUserEBF,
    userID: state.USER_DATA_ID.userDataId,
    // routeName: state.ROUTE_NAME.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(updateName);
