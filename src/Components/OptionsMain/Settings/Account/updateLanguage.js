import React, {Component} from 'react';
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
import {Badge, Card, CheckBox} from 'react-native-elements';
import Colors from '../../../../Theme/Colors';
import {Directions} from 'react-native-gesture-handler';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';

import {ActionCreators} from '../../../../Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import localize from '../../../../translation';

import RadioButton from './RadioButtons';
import {set} from 'react-native-reanimated';

const options = [
  {
    key: 1,
    text: 'English',
    //  subText:"I'm easy",
    // title: I18nManager.isRTL ? 'المطبخ' : 'Kitchen',
  },
  {
    key: 2,
    text: 'Dutch',
    //subText:'Vegetarian + seafood',
  },
];

class updateLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      languageValue: 0,
    };
  }

  updateTagState = value => {
    //   alert(value)
    this.setState({
      languageValue: value,
    });
  };
  normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  }

  submit(data) {
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
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(256,256,256,0.5)',
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
            shadowOpacity: Platform.OS === 'android' ? 0.5 : 0.05,
            borderBottomWidth: 0,
            elevation: 3,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: '7%', paddingTop: 25}}
            onPress={() => this.props.navigation.goBack()}>
            <IconM name="arrow-back" size={25} color="black" />
          </TouchableOpacity>

          <Text style={{color: '#000', fontSize: 18, alignSelf: 'center'}}>
            Language
          </Text>
        </View>

        <View style={{height: '100%'}}>
          <RadioButton options={options} tag={this.updateTagState} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    updateGoal: state.UPDATE_GOAL.updateGoal,
    // routeName: state.ROUTE_NAME.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(updateLanguage);
