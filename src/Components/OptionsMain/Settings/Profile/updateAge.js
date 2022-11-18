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
  TextInput,
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
import AsyncStorage from '@react-native-async-storage/async-storage';

class updateAge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: true,
      age: this.props.route.params,
    };
  }

  componentDidMount() {
    this.setState({
      age: this.props.route.params
    })
  }

  normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  }
  ageValidations() {
    const { age } = this.state;
    // AsyncStorage.setItem('userage', age);
    if (age === 0 || age < 18 || age > 120) {
      Alert.alert(I18n.t('ageValidation'));
      return false;
    }
    else {
      this.submit(age);
      // console.log('Age params', typeof age);
    }
  }

  submit(data) {
    const _this = this;
    _this.props.setAgeAction(data).then(status => {
      // console.log(' setAgeAction gender : ', status, data);
      this.setState({}, () => {
        if (status.status) {
          const updateFeatureData = {
            userGender: this.props.userGender,
            userAge: data,
            userHeight: this.props.userHeight,
            userWeight: this.props.userWeight,
            activityLevel: this.props.activityLevel,
            EBF: this.props.EBF,
          };
          this.setState(
            {
              updateHeightLoader: true,
            },
            () => {
              _this.props
                .setUserFeatureUpdateAction(updateFeatureData, this.props.token)
                .then(status => {
                  _this.setState(
                    {
                      updateHeightLoader: false,
                    },
                    () => {
                      if (status.status) {
                        _this.props.setUpdateUserAge(data);
                        alert('Age Update!');
                        this.props.navigation.navigate('profile');
                      }
                    },
                  );
                });
            },
          );
        }
      });
    });
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff'
        }}>
        <View
          style={{
            position: 'relative',
            paddingTop: Platform.OS === 'android' ? 0 : 14,
            // marginBottom: '4%',
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
          <TouchableOpacity
            style={{ position: 'absolute', left: '7%', paddingTop: 15 }}
            onPress={() => this.props.navigation.goBack()}>
            <IconM name="arrow-back" size={25} color="black" />
          </TouchableOpacity>

          <Text style={{ color: '#000', fontSize: 18, alignSelf: 'center' }}>
            {I18n.t('Age')}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', margin: '6%' }}>

          <TextInput
            autoCapitalize="words"
            style={{
              width: '94%',
              color: '#000',
              borderWidth: 1,
              borderColor: '#eaeaea',
              borderRadius: 10,
              paddingLeft: 20
            }}
            placeholder={I18n.t('Age')}
            keyboardType={'phone-pad'}
            onChangeText={age => {
              this.setState({ age });
            }}
            value={`${this.state.age}`}
          />
        </View>

        <View style={{ width: '100%', position: 'absolute', bottom: '10%' }}>
          <TouchableOpacity
            onPress={() => this.ageValidations()}
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
            <Text style={{ color: '#fff' }}>{I18n.t('Update')} {I18n.t('Age')}</Text>
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
    userGender: state.UPDATE_GENDER.updateGender,
    userAge: state.UPDATE_USER_AGE.updateUserAge,
    userHeight: state.UPDATE_USER_HEIGHT.updateUserHeight,
    userWeight: state.UPDATE_USER_WEIGHT.updateUserWeight,
    activityLevel: state.UPDATE_USERDETAIL.activityLevel,
    EBF: state.UPDATE_USER_EBF.updateUserEBF,
    // routeName: state.ROUTE_NAME.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(updateAge);
