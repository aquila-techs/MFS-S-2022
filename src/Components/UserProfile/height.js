import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './style';
// import {Directions} from 'react-native-gesture-handler';
import IconF from 'react-native-vector-icons/FontAwesome';
import Colors from '../../Theme/Colors';
import { ActionCreators } from '../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../../translation';
import renderIf from 'render-if';
import { API_URL } from '../../Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Height extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '',
      heightInch: 0.0,
      heightCM: '',
      heightCMToFeet: 0,
      unit: 'cm',
      check: true,
    };
  }

  componentDidMount() {
    this.getProfile()
  }

  async getProfile() {
    let TOKEN = await AsyncStorage.getItem('PROFILETOKEN')
    fetch(`${API_URL}/user/feature/getUserFeatureProfile`, {

      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': `${TOKEN}`
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success == false || responseJson.success == 'false') {
          return null;
        } else {
          this.setState({ heightCM: (responseJson.height).toFixed() })
        }

      })
      .catch((error) => {
        alert(error);
      })
  }

  heightValidations() {
    const { height } = this.state;
    const { heightCM } = this.state;
    const { heightInch } = this.state;

    if (this.state.unit == 'ft') {
      if (height > 8 || height < 3) {
        Alert.alert(i18n.t('heightError1'));
        return false;
      } else if (heightInch < 0 || heightInch > 11) {
        Alert.alert(i18n.t('heightError2'));
        return false;
      } else {
        let h = height + '.' + heightInch;
        //alert(h * 30.48)
        h = Math.round(h * 30.48);
        this.submit(h);
      }
    } else {
      if (heightCM > 280 || heightCM < 91) {
        Alert.alert(i18n.t('heightError3'));
        return false;
      } else {
        this.submit(heightCM);
      }
    }
  }

  submit(data) {
    const _this = this;

    _this.props.setHeightAction(data).then(status => {
     
      this.setState({}, () => {
        if (status.status) {
          //     alert(JSON.stringify(this.props.updateHeight))
          this.props.navigation.navigate('weight');
        }
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={[styles.goal5, { marginTop: -20, marginBottom: -20 }]}>
            <Text
              style={{
                alignItems: 'center',
                color: '#000',
                fontSize: 25,
                marginBottom: 15,
              }}>
              {i18n.t('heightWhat')}?
            </Text>
          </View>

          {/* Text Input Start */}


          {renderIf(this.state.unit == 'ft')(
            <View style={{ flexDirection: 'row', margin: 20, justifyContent: 'center', alignItems: 'center' }}>

              <TextInput
                value={this.state.height}
                onChangeText={text => {
                  this.setState({
                    height: text,
                  });
                  if (text) this.secondTextInput.focus(); //assumption is TextInput ref is input_2
                }}
                placeholder="0"
                maxLength={1}
                returnKeyType="done"
                autoFocus={true}
                // placeholderTextColor="#9E9F9D"
                underlineColorAndroid="transparent"
                onSubmitEditing={() => {
                  this.secondTextInput.focus();
                }}
                style={[styles.heightTextInputStyle]}
                keyboardType={'numeric'}
              />

              <Text style={styles.headerSideText}>FT</Text>

          

              <TextInput
                value={this.state.heightInch}
                // value={'4'}
                ref={input => {
                  this.secondTextInput = input;
                }}
                onChangeText={text => {
                  this.setState({ heightInch: text });
                }}
                placeholder="0"
                maxLength={2}
                returnKeyType="done"
                // placeholderTextColor="#9E9F9D"
                underlineColorAndroid="transparent"
                style={styles.heightTextInputStyle}
                keyboardType={'numeric'}
              />

              <Text style={styles.headerSideText}>IN</Text>
            </View>,
          )}
          {renderIf(this.state.unit == 'cm')(

            <View style={{ flexDirection: 'row', margin: 20, justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                value={this.state.heightCM}
                onChangeText={text => {
                  this.setState({
                    heightCM: text,
                  });
                }}
                returnKeyType="done"
                placeholder="0"
                maxLength={3}
                autoFocus={true}
                onSubmitEditing={() => {
                  this.heightValidations()
                }}
                // placeholderTextColor="#9E9F9D"
                underlineColorAndroid="transparent"
                style={styles.heightTextInputStyle}
                keyboardType={'numeric'}
              />
              <Text style={styles.headerSideText}>CM</Text>
            </View>,
          )}


          <View style={styles.gendermain}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  heightCM: (this.state.height / 0.032808).toFixed(),
                  unit: 'cm',
                });
              }}
              style={[
                styles.heightbuttons,
                styles.borderRadiusLeft,
                this.state.unit == 'cm' ? styles.selectedbutton : {},
              ]}>
              <Text style={{ color: this.state.unit == 'cm' ? '#000' : '#999' }}>
                CM
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                var n = (this.state.heightCM * 0.032808) % 1;
                this.setState(
                  {
                    height: (this.state.heightCM * 0.032808).toFixed(),
                    heightInch: n.toFixed(),
                    unit: 'ft',
                  },
                  // () => {
                  //   alert(this.state.heightInch);
                  // },
                );
              }}
              style={[
                styles.heightbuttons,
                styles.borderRadiusRight,
                this.state.unit == 'ft' ? styles.selectedbutton : {},
              ]}>
              <Text style={{ color: this.state.unit == 'ft' ? '#000' : '#999' }}>
                FT
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <View style={{ marginTop: '0%', width: '100%', alignSelf: 'flex-end', }}>
          <TouchableOpacity
            onPress={() => this.heightValidations()}
            style={{
              marginTop: 20,
              height: 50,
              width: 50,
              marginLeft: 'auto',
              marginRight: '10%',
              // borderColor: '#B76EC6',
              // borderWidth: 1,
              padding: 10,
              backgroundColor: Colors.green,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
            }}>
            <IconF
              name="arrow-right"
              size={20}
              color="#ffffff"
              style={{ alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 80 }}></View>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    updateHeight: state.UPDATE_HEIGHT.updateHeight,
    // routeName: state.ROUTE_NAME.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Height);
