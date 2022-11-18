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
  ScrollView,
  Modal,
} from 'react-native';
import { Badge, Card, CheckBox } from 'react-native-elements';
import Colors from '../../../../Theme/Colors'
import { Directions } from 'react-native-gesture-handler';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';


import { ActionCreators } from '../../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../../../../translation';

import RadioButton from './RadioButtons'
import { set } from 'react-native-reanimated';

const options = [
  {
    key: 1,
    text: i18n.t('mtrk'),
    //  subText:"I'm easy",
    // title: I18nManager.isRTL ? 'المطبخ' : 'Kitchen',

  },
  {
    key: 2,
    text: i18n.t('pnd'),
    //subText:'Vegetarian + seafood',
  },

];

class updateUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitValue: 0,
    };
  }

  updateTagState = (value) => {
    //  alert(value)
    this.setState({
      unitValue: value
    })
  }
  normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }

  submit(data) {
    // this.props.navigation.pop()
    // //  alert(data)
    //   const _this = this;

    //   _this.props.setGoalAction(data).then((status) => {
    //       console.log('signin: ',status, data)
    //       this.setState({
    //       }, () => {
    //         if (status.status) {
    //           //alert(JSON.stringify(this.props.updateGoal))
    //           this.props.navigation.navigate("foods2")

    //         } 
    //       })
    //     })



  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (

      <View style={{
        width: '100%',
        height: '100%', backgroundColor: 'rgba(256,256,256,0.5)'
      }}>
        <View style={{
          position: 'relative', paddingTop: Platform.OS === 'android' ? 0 : 10, marginTop: '4%',
          backgroundColor: '#fff', width: '100%', height: Platform.OS === 'android' ? '8%' : '10%',
          flexDirection: 'row', backgroundColor: 'white', alignSelf: 'center',
          alignContent: 'center', alignItems: 'center', justifyContent: 'center',
          shadowOpacity: Platform.OS === 'android' ? 0.5 : 0, borderBottomWidth: 0, elevation: 3,
        }}>
          <TouchableOpacity
            style={{ position: 'absolute', left: '7%' }}
            onPress={() => this.props.navigation.goBack()}>
            <IconM name="arrow-back" size={25} color='black' />
          </TouchableOpacity>

          <Text style={{ color: "#000", fontSize: 18, alignSelf: 'center' }}>{i18n.t('Units')}</Text>


        </View>

        <View style={{ height: '100%' }}>
          <RadioButton options={options}
            tag={this.updateTagState}
          />
        </View>




      </View>
    )
  }
}


function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    updateGoal: state.UPDATE_GOAL.updateGoal,
    // routeName: state.ROUTE_NAME.routeName,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(updateUnit);
