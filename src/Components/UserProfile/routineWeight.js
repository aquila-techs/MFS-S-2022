import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  scale,
  PixelRatio

} from 'react-native';
//import Slider from '@react-native-community/slider';
import styles from './style';
var SnapSlider = require('react-native-snap-slider');

import Colors from '../../Theme/Colors'
import { Directions } from 'react-native-gesture-handler';
import IconF from 'react-native-vector-icons/FontAwesome'

import { ActionCreators } from '../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import localize from '../../translation';


var sliderOptions = [
  { value: 0, label: 'G' },
  { value: 1, label: 'M' },
  { value: 2, label: 'V' },

]

class routineWeight extends Component {
  normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      defaultItem: 1,
      itemSelectedValue: 1,
      signinLoader: false,


    }
  }


  slidingComplete(itemSelected) {
    // this.valueUpdate(itemSelected)
    // console.log("slidingComplete");
    // console.log("item selected " + this.refs.slider.state.item);
    // console.log("item selected(from callback)" + itemSelected);
    // console.log("value " + this.sliderOptions[this.refs.slider.state.item].value);
  }


  submit() {
    let data = this.state.itemSelectedValue + 1
    //alert(data)
    const _this = this;

    _this.props.setLevelAction(data).then((status) => {
  
      this.setState({
      }, () => {
        if (status.status) {
          // alert("CHECK: "+JSON.stringify(this.props.updateLevel))
          //alert(JSON.stringify(this.props.token))
          this.userDataSubmit()
          //       this.props.navigation.navigate("HomeMain")

        }
      })
    })

  }

  userDataSubmit() {
    this.props.navigation.navigate("routine")

    // const _this = this;
    // const userData = {
    //   goal: this.props.updateGoal,
    //   gender: this.props.updateGender,
    //   age: this.props.updateAge,
    //   weight: this.props.updateWeight,
    //   height: this.props.updateHeight,
    //   fat: this.props.updateCurrentFat,
    //   target: this.props.updateTargetWeight,
    //   level: this.props.updateLevel,
    // }
    // console.log(userData)
    // this.setState({
    //   signinLoader: true
    // }, () => {
    //   _this.props.setUserFeatureAction(userData,this.props.token).then((status) => {
    //   //  console.log('signin: ',status, this.props.userData)
    //    // alert(JSON.stringify(status.status))
    //     _this.setState({
    //       signinLoader: false
    //     }, () => {
    //       if (status.status) {
    //        // alert("UserData : "+this.props.userStatus)
    //         this.props.navigation.navigate("HomeMain")
    //       } 
    //     })
    //   })
    // })

  }


  render() {


    return (

      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
        <View style={{ marginHorizontal: 15 }}>
          <View style={{ alignItems: 'center', }}>
            <Text style={{ color: "#000", fontSize: 25, marginBottom: 29 }}>{localize.t('routineWeightLoss')}?</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            {/* <Text style={{color: "#000",fontSize:16,marginBottom:29}}>{localize.t('routineText')}</Text> */}
          </View>
          <View>
            <SnapSlider
              ref="slider"
              containerStyle={styles.snapsliderContainer}
              style={styles.snapslider}
              itemWrapperStyle={styles.snapsliderItemWrapper}
              itemStyle={styles.snapsliderItem}
              items={sliderOptions}
              labelPosition="bottom"
              maximumValue={3}

              step={1}
              defaultItem={this.state.defaultItem}
              onSlidingComplete={this.slidingComplete}
              onValueChange={(i) => { this.setState({ itemSelectedValue: i }) }} />
            {/* <Slider
            // onValueChange={(i) => { this.setVolume(i) }}
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            value={0.5}
            step={0.25}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          /> */}

          </View>

          <View style={{ marginTop: '5%', width: '100%' }}>
            <TouchableOpacity
              onPress={() => this.submit()}
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
                borderRadius: 50
              }}>
              <IconF name="arrow-right" size={20} color='#ffffff' style={{ alignSelf: "center" }} />
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
    updateGoal: state.UPDATE_GOAL.updateGoal,
    updateGender: state.UPDATE_GENDER.updateGender,
    updateAge: state.UPDATE_AGE.updateAge,
    updateWeight: state.UPDATE_WEIGHT.updateWeight,
    updateHeight: state.UPDATE_HEIGHT.updateHeight,
    updateCurrentFat: state.UPDATE_CURRENTFAT.updateCurrentFat,
    updateTargetWeight: state.UPDATE_TARGETWEIGHT.updateTargetWeight,
    updateLevel: state.UPDATE_LEVEL.updateLevel,
    token: state.SESSION_KEY.sessionKey,
    userStatus: state.UPDATE_USERSTATUS.userStatus
    // routeName: state.ROUTE_NAME.routeName,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(routineWeight);

