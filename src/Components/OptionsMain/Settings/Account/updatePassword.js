import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
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
const { height, width: WIDTH } = Dimensions.get('window');

import { ActionCreators, API_URL } from '../../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../../../../translation';
// import { TextInput, Snackbar } from 'react-native-paper';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

class updatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      check: true,
      first_name: this.props.userEmail,
      old_password: '',
      new_password: '',
      secure: true,
      secure2: true,
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
  Validation = () => {
    if (this.state.old_password === '' || this.state.new_password === '') {
      alert('Please fill the field');
    } else {
      this.changePassword();
    }
  };
  changePassword = async () => {
    let data = {
      oldPassword: this.state.old_password,
      newPassword: this.state.new_password,
    };
    RNFetchBlob.fetch(
      'POST',
      API_URL + '/user/change/Password',
      {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'auth-token': this.props.token,
      },
      JSON.stringify(data),
    ).then(res => {
      const data = JSON.parse(res.data);
      if (data?.success === true) {
        alert(data?.message);
        this.props.navigation.goBack();
      } else {
        alert(data?.message);
      }
    });
  };
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
            {i18n.t('Change')} {i18n.t('password')}
            </Text>
          </View>

        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: '10%',
            marginLeft: '6%',
            marginRight: '6%',
          }}>

          <View style={styles.firstInput}>
            <TextInput
              style={styles.input}
              placeholder={i18n.t('old_pass')}
              placeholderTextColor={'#000000'}
              value={this.state.old_password}
              onChangeText={old_password => this.setState({ old_password })}
              secureTextEntry={this.state.secure}
            />
            <TouchableOpacity onPress={() => { this.setState({ secure: !this.state.secure }) }}>
              {this.state.secure ?
                <Image style={{ width: 25, height: 25, marginTop: 10 }} source={require('../../../../Assets/icon/eye.png')} />
                :
                <Image style={{ width: 25, height: 25, marginTop: 10 }} source={require('../../../../Assets/icon/eye2.png')} />
              }
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: '6%',
            marginRight: '6%',
            marginTop: '5%',
          }}>

          <View style={styles.firstInput}>
            <TextInput
              style={styles.input}
              placeholder={i18n.t('new_pass2')}
              placeholderTextColor={'#000000'}
              value={this.state.new_password}
              onChangeText={new_password => this.setState({ new_password })}
              secureTextEntry={this.state.secure2}
            />
            <TouchableOpacity onPress={() => { this.setState({ secure2: !this.state.secure2 }) }}>
              {this.state.secure2 ?
                <Image style={{ width: 25, height: 25, marginTop: 10 }} source={require('../../../../Assets/icon/eye.png')} />
                :
                <Image style={{ width: 25, height: 25, marginTop: 10 }} source={require('../../../../Assets/icon/eye2.png')} />
              }
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: '100%', marginTop: '15%' }}>
          <TouchableOpacity
            onPress={() => {
              this.Validation();
            }}
            style={{
              height: 50,
              width: 150,
              backgroundColor: Colors.green,
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}>
            <Text style={{ color: '#fff' }}>{i18n.t('new_pass')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.SESSION_KEY.sessionKey,
    // userEmail: state.USER_DATA.user.email,
    // routeName: state.ROUTE_NAME.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(updatePassword);

const styles = StyleSheet.create({
  firstInput: {
    width: WIDTH - 60,
    marginTop: 0,
    marginHorizontal: 0,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: "#eeeeee",
    flexDirection: 'row'
  },
  input: {
    width: WIDTH - 110,
    height: 42,
    padding: 10,
    marginBottom: 0,
    backgroundColor: 'transparent',
    color: '#000000',
    fontSize: 16
  },
});
