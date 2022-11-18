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
  Dimensions,
  StatusBar,
  ScrollView,
  SafeAreaView,
  scale,
  TextInput,
  PixelRatio,
  KeyboardAvoidingView
} from 'react-native';
import styles from './style';
import Colors from '../../Theme/Colors';
import { Directions } from 'react-native-gesture-handler';
import IconF from 'react-native-vector-icons/FontAwesome';

import { ActionCreators } from '../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../../translation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API_URL } from '../../Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Age extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
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
          this.setState({ age: responseJson.age })
        }
      })
      .catch((error) => {
        alert(error);
      })
  }

  ageValidations() {
    const { age } = this.state;
    if (age < 13 || age > 100) {
      Alert.alert(i18n.t('ageValidation'));
      return false;
    } else {
      const _this = this;
      _this.props.setAgeAction(age).then(status => {
       
        this.setState({}, () => {
          if (status.status) {
            //  alert(JSON.stringify(this.props.updateAge))
            this.props.navigation.navigate('height');
          }
        });
      });
    }
  }

  normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  }
  getSize() {
    return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.ageContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -50 }}>
            <Text
              style={{
                alignItems: 'center',
                color: '#000',
                fontSize: 22,
                marginBottom: 15,
              }}>
              {i18n.t('ageWhat')}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', margin: '0%', fontSize: 100 }}>
            <TextInput
              value={this.state.age.toString()}
              onChangeText={text => {
                this.setState({ age: text });
              }}
              placeholder="0"
              underlineColorAndroid="transparent"
              placeholderTextColor="#9E9F9D"
              autoFocus={true}
              returnKeyType='done'
              maxLength={3}
              onSubmitEditing={() => {
                this.ageValidations()
              }}
              style={styles.TextInputStyle}
              keyboardType="phone-pad"
            />
          </View>
          <View style={{ marginTop: '5%', width: '100%' }} >
            <TouchableOpacity
              onPress={() => this.ageValidations()}
              style={{
                marginTop: 20,
                height: 50,
                width: 50,
                marginLeft: 'auto',
                marginRight: '10%',
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
        </KeyboardAvoidingView>
        <View style={{ marginTop: 80 }}></View>

      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    updateAge: state.UPDATE_AGE.updateAge,
    // routeName: state.ROUTE_NAME.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Age);
