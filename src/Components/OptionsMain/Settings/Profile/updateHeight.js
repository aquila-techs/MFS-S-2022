import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import renderIf from 'render-if';
import Colors from '../../../../Theme/Colors';
import {Directions} from 'react-native-gesture-handler';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';

import {ActionCreators} from '../../../../Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import i18n from '../../../../../translation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

class updateHeight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      heightInch: 0,
      heightCM: 0,
      unit: 'ft',
      check: true,
      updateHeightLoader: false,
    };
  }

  heightValidations() {
    const {height} = this.state;
    const {heightCM} = this.state;
    const {heightInch} = this.state;
    if (this.state.unit === 'ft') {
      if (height > 8 || height < 3) {
        Alert.alert(i18n.t('heightError1'));
        return false;
      } else if (heightInch < 0 || heightInch > 11) {
        Alert.alert(i18n.t('heightError2'));
        return false;
      } else {
        let h = JSON.stringify(height) + '.' + JSON.stringify(heightInch);
        //alert(h * 30.48)
        h = Math.round(h * 30.48);
        this.submit(JSON.stringify(h));
      }
    } else {
      if (heightCM > 280 || heightCM < 91) {
        Alert.alert(i18n.t('heightError3'));
        return false;
      } else {
        this.submit(JSON.stringify(heightCM));
      }
    }
  }

  submit(data) {
    //alert(data)
    const _this = this;
    AsyncStorage.setItem('userHeight', data);
    _this.props?.setHeightAction(data).then(status => {
      this.setState({}, () => {
        if (status.status) {
          const updateFeatureData = {
            userGender: this.props?.userGender,
            userAge: this.props?.userAge,
            userHeight: data,
            userWeight: this.props?.userWeight,
            activityLevel: this.props?.activityLevel,
            EBF: this.props?.EBF,
          };
        
          this.setState(
            {
              updateHeightLoader: true,
            },
            () => {
              _this.props
                .setUserFeatureUpdateAction(
                  updateFeatureData,
                  this.props?.token,
                )
                .then(status => {
                  //alert(JSON.stringify(status.status))
                  // alert(status.status+" setUserFeatureUpdateAction "+data+" bbb")
                  _this.setState(
                    {
                      updateHeightLoader: false,
                    },
                    () => {
                      if (status.status) {
                        _this.props?.setUpdateUserHeight(data);
                        alert('Height Update!');
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
    const {heightInch} = this.state;
    return (
      <View
        style={{
          backgroundColor: '#ffffff',
          flex: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            height: Platform.OS === 'android' ? '8%' : '10%',
            paddingTop: Platform.OS === 'android' ? 0 : 25,
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
            {i18n.t('Height')}
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            alignContent: 'center',
            marginTop: '20%',
          }}>
          {renderIf(this.state.unit == 'ft')(
            <View style={{flexDirection: 'row', margin: 20}}>
              <TextInput
                value={this.state.height}
                returnKeyType="done"
                onChangeText={text => {
                  this.setState({
                    height: text,
                  });
                  {
                    text ? this.secondTextInput.focus() : null;
                  } //assumption is TextInput ref is input_2
                }}
                placeholder="0"
                maxLength={1}
                // placeholderTextColor="#9E9F9D"
                underlineColorAndroid="transparent"
                onSubmitEditing={() => {
                  this.secondTextInput.focus();
                }}
                style={{
                  textAlign: 'center',
                  height: '100%',
                  color: '#000',
                  marginLeft: '5%',
                  // borderRadius: 10,
                  // borderWidth: 2,
                  fontSize: 60,
                  // borderColor: '#009688',
                }}
                keyboardType={'numeric'}
              />
              <Text style={{textAlign: 'center', marginTop: 'auto'}}>FT</Text>
              <TextInput
                value={this.state.heightInch}
                returnKeyType="done"
                ref={input => {
                  this.secondTextInput = input;
                }}
                onChangeText={text => {
                  this.setState({heightInch: text});
                }}
                placeholder="0"
                maxLength={2}
                // placeholderTextColor="#9E9F9D"
                underlineColorAndroid="transparent"
                style={{
                  textAlign: 'center',
                  height: '100%',
                  color: '#000',
                  marginLeft: '5%',
                  // borderRadius: 10,
                  // borderWidth: 2,
                  fontSize: 60,
                  // borderColor: '#009688',
                }}
                keyboardType={'numeric'}
              />
              <Text style={{textAlign: 'center', marginTop: 'auto'}}>IN</Text>
            </View>,
          )}
          {renderIf(this.state.unit == 'cm')(
            <View style={{flexDirection: 'row', margin: 20}}>
              <TextInput
                value={this.state.heightCM}
                returnKeyType="done"
                onChangeText={text => {
                  this.setState({
                    heightCM: text,
                  });
                }}
                placeholder="0"
                maxLength={3}
                // placeholderTextColor="#9E9F9D"
                underlineColorAndroid="transparent"
                style={{
                  textAlign: 'center',
                  height: '100%',
                  color: '#000',
                  marginLeft: '5%',
                  // borderRadius: 10,
                  // borderWidth: 2,
                  fontSize: 60,
                  // borderColor: '#009688',
                }}
                keyboardType={'numeric'}
              />
              <Text style={{textAlign: 'center', marginTop: 'auto'}}>CM</Text>
            </View>,
          )}
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                this.setState({unit: 'ft'});
              }}
              style={[
                styles.heightbuttons,
                styles.borderRadiusLeft,
                this.state.unit == 'ft' ? styles.selectedbutton : {},
              ]}>
              <Text style={{color: this.state.unit == 'ft' ? '#000' : '#999'}}>
                FT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({unit: 'cm'});
              }}
              style={[
                styles.heightbuttons,
                styles.borderRadiusRight,
                this.state.unit == 'cm' ? styles.selectedbutton : {},
              ]}>
              <Text style={{color: this.state.unit == 'cm' ? '#000' : '#999'}}>
                CM
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: '15%', width: '100%'}}>
            <TouchableOpacity
              onPress={() => this.heightValidations()}
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
              <Text style={{color: '#fff'}}>{i18n.t('Update')} {i18n.t('Height')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.SESSION_KEY.sessionKey,
    userGender: state.UPDATE_GENDER.updateGender,
    userAge: state.UPDATE_USER_AGE.updateUserAge,
    userHeight: state.UPDATE_USER_HEIGHT.updateUserHeight,
    userWeight: state.UPDATE_USER_WEIGHT.updateUserWeight,
    activityLevel: state.UPDATE_USERDETAIL.activityLevel,
    EBF: state.UPDATE_USER_EBF.updateUserEBF,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(updateHeight);

const styles = StyleSheet.create({
  gendermain: {
    flexDirection: 'row',
  },
  gender: {
    marginHorizontal: 10,
    margin: 8,
    height: 120,
    width: 120,
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#ffffff',
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
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  TextInputStyle: {
    textAlign: 'center',
    height: '100%',
    color: '#000',
    // borderRadius: 10,
    // borderWidth: 2,
    flex: 1,
    fontSize: 80,
    // borderColor: '#009688',
  },
  heightTextInputStyle: {
    textAlign: 'center',
    height: '100%',
    color: '#000',
    marginLeft: '5%',
    // borderRadius: 10,
    // borderWidth: 2,
    fontSize: 60,
    // borderColor: '#009688',
  },
  headerSideText: {
    textAlign: 'center',
    marginTop: 'auto',
  },
  weightTextInputStyle: {
    textAlign: 'center',
    height: 60,
    color: '#000',
    // borderRadius: 10,
    // borderWidth: 2,
    flex: 1,
    fontSize: 50,
    // borderColor: '#009688',
  },
  targetWeightTextInputStyle: {
    textAlign: 'center',
    height: 60,
    color: '#000',
    // borderRadius: 10,
    // borderWidth: 2,
    flex: 1,
    fontSize: 50,
    // borderColor: '#009688',
  },
  heightbuttons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D8D8D8',
  },
  borderRadiusLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  borderRadiusRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  selectedbutton: {
    backgroundColor: '#fff',
  },
  snapsliderContainer: {
    color: '#fff',
  },
  snapslider: {},
  snapsliderItemWrapper: {},
  snapsliderItem: {
    color: '#9E9F9D',
    fontSize: 12,
  },
  carouselContainer: {
    height: 200,
  },
  carousel: {
    flex: 1,
  },
});
