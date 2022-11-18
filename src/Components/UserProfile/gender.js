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
  scale,
  PixelRatio,
} from 'react-native';
import styles from './style';

import { ActionCreators } from '../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../../translation';
import IconF from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native-paper';


class gender extends Component {
  constructor(props) {
    super(props);
    this.state = {

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

  getSize() {
    return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  }

  async submit(data) {
    //alert(data)
    const _this = this;

    await AsyncStorage.setItem('gender', data)
    _this.props.setGenderAction(data).then(status => {
    
      this.setState({}, () => {
        if (status.status) {
          this.props.navigation.navigate('age');
        }
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.goal5}>
          <Text style={{ color: '#000', fontSize: 22, marginBottom: 25 }}>
            {i18n.t('genderWhat')}?
          </Text>
        </View>

        <View style={styles.gendermain}>
          <TouchableOpacity
            style={styles.gender}
            onPress={() => this.submit('M')}>
            <IconF
              style={{ color: '#0E0E0E', margin: 10 }}
              name={'male'}
              size={60}
            />

            <Text style={{ color: '#757575', fontSize: 16 }}>
              {i18n.t('male')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gender}
            onPress={() => this.submit('F')}>
            <IconF
              style={{ color: '#0E0E0E', margin: 10 }}
              name={'female'}
              size={60}
            />

            <Text style={{ color: '#757575', fontSize: 16 }}>
              {i18n.t('female')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    updateGender: state.UPDATE_GENDER.updateGender,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(gender);
