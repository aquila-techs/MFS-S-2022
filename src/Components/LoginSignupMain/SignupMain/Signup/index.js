import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  Dimensions,
  TextInput,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import styles from './Styles';

import IconF from 'react-native-vector-icons/FontAwesome5';
import { API_URL } from '../../../../Actions';
import Colors from '../../../../Theme/Colors';
var Spinner = require('react-native-spinkit');
import { ActionCreators } from '../../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Responsive from 'react-native-lightweight-responsive';
import RNFetchBlob from 'rn-fetch-blob';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import localize from '../../../../translation';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
let dataCommunity = [
  {
    value: 'Texas City',
  },
  {
    value: 'Dallas',
  },
  {
    value: 'Houston',
  },
];

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorText: '',
      gender: '',
      type: 'c',
      age: '',
      termsAccepted: false,
      community: '',
      agreementText: '',
      signupLoader: false,
      passwordText: '',
      visibleConfirmation: false,
      notavailableemail: '',
      validationcheck: false,
    };
  }
  async checkemail(value) {
    let data = {
      email: value,
    };
    await RNFetchBlob.fetch(
      'POST',
      API_URL + '/user/email/availabilityCheck',
      {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      JSON.stringify(data),
    )
      .then(response => {
        const data = JSON.parse(response.data);
        if (data?.success) {
          this.setState({
            validationcheck: false,
          });
        } else {
          this.setState({
            notavailableemail: data?.message,
            validationcheck: true,
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  signupAlert(message) {
    Alert.alert(
      localize.t('signUp'),
      message,
      [
        {
          text: localize.t('ok'),
          onPress: () => {
            this.props.navigation.navigate('Login');
          },
        },
      ],
      { cancelable: false },
    );
  }

  submit() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.firstName === '') {
      this.setState({
        errorText: localize.t('firstNameErrorText'),
      });
    } else if (this.state.email === '') {
      this.setState({
        errorText: localize.t('emailErrorText'),
      });
    } else if (reg.test(this.state.email) === false) {
      this.setState({
        errorText: 'Email is not valid',
      });
    } else if (this.state.password === '') {
      this.setState({
        errorText: localize.t('passwordErrorText'),
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        passwordText: localize.t('passwordText'),
      });
    } else {
      const _this = this;
      const signupdata = {
        email: this.state.email,
        password: this.state.password,
        name: this.state.firstName,
      };
      const signindata = {
        email: this.state.email,
        password: this.state.password,
      };
      this.setState(
        {
          signupLoader: true,
        },
        () => {
          _this.signup(signupdata).then(status => {
            if (status.status) {
              _this.props.navigation.pop()
              _this.setState({
                signupLoader: false,
              });
            } else {
              _this.setState(
                {
                  signupLoader: false,
                },
                () => {
                  _this.signupAlert(status.error);
                },
              );
            }
          });
        },
      );
    }
  }

  signup(signupdata) {
    return new Promise((resolve, reject) => {


      RNFetchBlob.fetch(
        'POST',
        API_URL + '/user/register',
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        JSON.stringify(signupdata),
      )
        .then(response => {
          const data = JSON.parse(response.data);
      
          if (data && data.registered) {
            resolve({
              status: true,
              data: data,
            });
          } else {
            resolve({
              status: false,
              error: data.message,
            });
          }
        })
        .catch(() => {
          resolve({
            status: false,
          });
        });
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.mainViewStyle} forceInset={{ top: 'always' }}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
          style={{ flex: 1 }}>
          <KeyboardAwareScrollView>

            <Image
              ref={component => {
                this._proPic = component;
              }}
              resizeMode="contain"
              source={require('../../../../Assets/Images/logoBlack.png')}
              style={{
                alignSelf: 'center',
                marginTop: '15%',
                height: Responsive.height(153),
                width: Responsive.width(224),
                backgroundColor: 'transparent',
              }}
            />

            <View
              style={{
                marginTop: Responsive.height(1),
                justifyContent: 'center',
                padding: 1,
                paddingHorizontal: 40,
              }}>

              <View>
                <View style={{ marginTop: '5%' }}>
                  <View style={styles.firstInput}>
                    <TextInput
                      style={styles.input}
                      placeholder={localize.t('firstName')}
                      placeholderTextColor={'#000000'}
                      value={this.state.firstName}
                      onChangeText={firstName => this.setState({ firstName })}
                    />
                  </View>
                </View>

                <View style={{ marginTop: '5%' }}>
                  <View style={styles.firstInput}>
                    <TextInput
                      style={styles.input}
                      placeholder={localize.t('lastName')}
                      placeholderTextColor={'#000000'}
                      value={this.state.lastName}
                      onChangeText={lastName => this.setState({ lastName })}
                    />
                  </View>
                </View>

                <View style={{ marginTop: '5%' }}>
                  <View style={styles.firstInput}>
                    <TextInput
                      style={styles.input}
                      placeholder={localize.t('email')}
                      placeholderTextColor={'#000000'}
                      value={this.state.email}
                      onChangeText={text => {
                        this.checkemail(text);
                        this.setState({
                          email: text,
                        });
                      }}
                    />
                  </View>
                </View>

                <View style={{ marginTop: '5%' }}>
                  <View style={styles.firstInput}>
                    <TextInput
                      style={styles.input}
                      placeholder={localize.t('password')}
                      placeholderTextColor={'#000000'}
                      value={this.state.password}
                      onChangeText={password => this.setState({ password })}
                      secureTextEntry={true}
                    />
                  </View>
                </View>

              </View>

              {this.state.signupLoader ? (
                <TouchableOpacity
                  style={{
                    marginTop: 50,
                    backgroundColor: Colors.green,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    height: 50
                  }}>
                  <Spinner
                    style={{ margin: 0, padding: 12 }}
                    type={'ThreeBounce'}
                    isVisible={this.state.signinLoader}
                    size={36}
                    color={'#fff'}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.state.validationcheck
                      ? alert('Please enter valid Email')
                      : this.submit();
                  }}
                  style={{
                    marginTop: 50,
                    backgroundColor: Colors.green,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: Responsive.height(15),
                      fontWeight: '500',
                      color: '#fff',
                      padding: 12
                    }}>
                    {localize.t('signUp')}
                  </Text>
                </TouchableOpacity>
              )}

              {this.state.validationcheck ? (
                <View style={{ backgroundColor: '#f1f1f1', borderRadius: 5, marginTop: 10 }}>
                  <Text style={{ color: '#000000', fontSize: 16, padding: 10, alignSelf: 'center' }}>{this.state?.notavailableemail}</Text>
                </View>
              ) : null}
              {this.state.errorText != '' ? (
                <View style={{ backgroundColor: '#f1f1f1', borderRadius: 5, marginTop: 10 }}>
                  <Text style={{ color: '#000000', fontSize: 16, padding: 10, alignSelf: 'center' }}>{this.state.errorText}</Text>
                </View>
              ) : null}
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: Responsive.height(20),
          }}>

          <TouchableOpacity>
            <Text
              onPress={() => this.props.navigation.navigate('Login')}
              style={{
                fontSize: 16,
                padding: 5,
                color: '#000000',
              }}>
              {localize.t('gotAnAccount')}?{' '}
              <Text style={{ color: '#000000', fontWeight: 'bold' }}>Login</Text>
            </Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.USER_DATA.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
