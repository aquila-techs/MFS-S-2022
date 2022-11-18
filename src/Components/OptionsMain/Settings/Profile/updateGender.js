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
import IconF from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialIcons';

import { ActionCreators } from '../../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../../../../translation';

class updateGender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      check: true,
      gender: this.props.userGender,
      defaultcolorM: '#fff',
      defaultTextcolorM: '#fff',
      defaultcolorF: '#fff',
      defaultTextcolorF: '#fff',
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

    if (this.props.route.params === 'M') {
      this.setState({
        defaultcolorM: '#4CAC50',
        defaultcolorF: '#fff',
        defaultTextcolorM: '#fff',
        defaultTextcolorF: '#0E0E0E',
      });
    } else {
      this.setState({
        defaultcolorM: '#fff',
        defaultcolorF: '#4CAC50',
        defaultTextcolorM: '#0E0E0E',
        defaultTextcolorF: '#fff',
      });
    }
  }

  submit(data) {

    const _this = this;
    _this.props.setGenderAction(data).then(status => {
      this.setState({}, () => {
        if (status.status) {
          const updateProfileData = {
            gender: data,
            name: this.props.userName,
          };

          this.setState(
            {
              updateHeightLoader: true,
            },
            () => {
              _this.props
                .updateProfile(
                  updateProfileData,
                  this.props.token,
                  this.props.userID,
                )
                .then(status => {
                  //alert(JSON.stringify(status.status))
                  _this.setState(
                    {
                      updateHeightLoader: false,
                    },
                    () => {
                      if (status.status) {
                        this.props.setUpdateUserGender(data);
                        alert(i18n.t('genderUpdate'));
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
          backgroundColor: '#ffffff',
          flex: 1,
          flexDirection: 'column',
        }}>

        <View
          style={{
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

          <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ paddingTop: 5, marginLeft: 20 }}
              onPress={() => this.props.navigation.goBack()}>
              <IconM name="arrow-back" size={25} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000', fontSize: 18, marginLeft: -30, marginTop: 5 }}>
            {i18n.t('Gender')}
            </Text>
          </View>

        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            alignContent: 'center',
          }}>
          <View style={{ flexDirection: 'row', marginTop: '40%' }}>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                margin: 8,
                height: 120,
                width: 120,
                alignItems: 'center',
                padding: 8,
                // backgroundColor: '#ffffff',
                backgroundColor: this.state.defaultcolorM,
                shadowColor: '#D8D8D8',
                shadowOpacity: 1,
                shadowRadius: 5,
                borderRadius: 7,
                elevation: 10,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#D8D8D8',
                shadowOffset: {
                  height: 4,
                  width: 3,
                },
              }}
              onPress={() => {
                this.setState({
                  defaultcolorM: '#4CAC50',
                  defaultcolorF: '#fff',
                  defaultTextcolorM: '#fff',
                  defaultTextcolorF: '#0E0E0E',
                }),
                  this.submit('M');
              }}>
              <IconF
                style={{ color: this.state.defaultTextcolorM, margin: 10 }}
                name={'male'}
                size={60}
              />

              <Text style={{ color: this.state.defaultTextcolorM, fontSize: 16 }}>
                {i18n.t('male')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                margin: 8,
                height: 120,
                width: 120,
                alignItems: 'center',
                padding: 8,
                backgroundColor: this.state.defaultcolorF,
                shadowColor: '#D8D8D8',
                shadowOpacity: 1,
                shadowRadius: 5,
                borderRadius: 7,
                elevation: 10,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#D8D8D8',
                shadowOffset: {
                  height: 4,
                  width: 3,
                },
              }}
              onPress={() => {
                this.setState({
                  defaultcolorM: '#fff',
                  defaultcolorF: '#4CAC50',
                  defaultTextcolorM: '#0E0E0E',
                  defaultTextcolorF: '#fff',
                }),
                  this.submit('F');
              }}>

              <IconF
                style={{ color: this.state.defaultTextcolorF, margin: 10 }}
                name={'female'}
                size={60}
              />

              <Text style={{ color: this.state.defaultTextcolorF, fontSize: 16 }}>
                {i18n.t('female')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    // routeName: state.ROUTE_NAME.routeName,
    token: state.SESSION_KEY.sessionKey,
    userName: state.USER_DATA.user.name,
    userGender: state.UPDATE_USER_GENDER.updateUserGender,
    userAge: state.UPDATE_USER_AGE.updateUserAge,
    userHeight: state.UPDATE_USER_HEIGHT.updateUserHeight,
    userWeight: state.UPDATE_USER_WEIGHT.updateUserWeight,
    activityLevel: state.UPDATE_USERDETAIL.activityLevel,
    EBF: state.UPDATE_USER_EBF.updateUserEBF,
    userID: state.USER_DATA_ID.userDataId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(updateGender);
