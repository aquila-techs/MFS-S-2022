import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  scale,
  PixelRatio,
} from 'react-native';

import renderIf from 'render-if';
import RnVerticalSlider from 'rn-vertical-slider';
import Colors from '../../Theme/Colors';
import IconF from 'react-native-vector-icons/FontAwesome';
import { ActionCreators } from '../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Video from 'react-native-video';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
var Spinner = require('react-native-spinkit');


class routine extends Component {
  normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 25,
      defaultItem: 1,
      WeightValue: 0,
      itemSelectedValue: 1,
      signinLoader: false,
      IsPaused: false,
      VideoUrl: '',
      value: 0,
    };
  }

  onSeek = (seek) => {

    this.setState({
      WeightValue: seek
    })
    this.player?.seek(seek);
  };

  slidingComplete(itemSelected) {
  }

  HandleGenderVideo = async () => {
    let VideoUrl;
    await AsyncStorage.getItem('gender').then(item => {
      if (item === 'M') {
        this.setState({
          VideoUrl: require('../../Assets/Video/Man.mp4')
        })
      }
      else {
        this.setState({
          VideoUrl: require('../../Assets/Video/Women.mp4')
        })
      }
    })
  }

  componentDidMount() {
    this.HandleGenderVideo()
  }

  submit() {
    let data;
    let d = Math.ceil(this.state.WeightValue * 3.33) + 1;
    if (d == 1) {
      data = 'S';
    } else if (d == 2) {
      data = 'L';
    } else if (d == 3) {
      data = 'A';
    } else if (d == 4) {
      data = 'V';
    }

    const _this = this;

    _this.props.setLevelAction(data).then(status => {

      this.setState({}, () => {
        if (status.status) {
          this.props.navigation.navigate("recipe")
        }
      });
    });
  }

  async onSubmit() {
    const quantity = await AsyncStorage.getItem('quantity')
    this.props.UserAuthCheck(this.props?.token)
    // alert("signUpCheck : "+this.props.signUpCheck);
    if (this.props.signUpCheck) {
      this.userDataSubmit(Number(quantity));
    } else {
      this.userUpdateDataSubmit(Number(quantity));
    }
  }

  userDataSubmit(quantity) {
    const _this = this;
    _this.props.remaincalories(0)
    const userData = {
      ebf: this.props.updateGoal,
      gender: this.props.updateGender,
      age: this.props.updateAge,
      weight: this.props.updateWeight,
      height: this.props.updateHeight,
      recipe: this.props.updaterecipe,
      activityLevel: this.props.updateLevel ?? 'L',
      WorkQuantity: quantity ?? 1,
      RemainActivity: 0,
      WorkoutRemainActivity: 0,
    };
    const userActivityData = {
      activities: [{ name: 'running', minutes: 60 }],
    };

    this.setState(
      {
        signinLoader: true,
      },
      () => {
        _this.props
          .setUserFeatureAction(userData, this.props.token)
          .then(status => {

            _this.setState(
              {
                signinLoader: false,
              },
              () => {
                if (status.status) {

                  setTimeout(() => {
                    this.props.navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [
                          {
                            name: 'HomeMain',
                          },
                        ],
                      }),
                    );
                  }, 1000);

                }
              },
            );
          });
      },
    );
  }

  userUpdateDataSubmit(quantity) {
    const _this = this;
    const userData = {
      ebf: this.props.updateGoal,
      gender: this.props.updateGender,
      age: this.props.updateAge,
      weight: this.props.updateWeight,
      height: this.props.updateHeight,
      recipe: this.props.updaterecipe,
      activityLevel: this.props.updateLevel ?? 'L',
      WorkQuantity: quantity ?? 1,
      RemainActivity: 0,
      WorkoutRemainActivity: 0

    };
    const userActivityData = {
      activities: [{ name: 'running', minutes: 60 }],
    };

    this.setState(
      {
        signinLoader: true,
      },
      () => {
        _this.props
          .setUserFeatureUpdateAction(userData, this.props.token)
          .then(status => {

            _this.setState(
              {
                signinLoader: false,
              },
              () => {
                if (status.status) {

                  this.props.navigation.navigate('HomeMain');
                }
              },
            );
          });
      },
    );
  }


  render() {
    setTimeout(() => {
      this.setState({
        IsPaused: true
      })
    }, 5000);
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>

        <View style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
          <View style={{ width: '100%', height: '100%' }}>
            <Video

              onLoad={(i) => {

              }}
              paused={this.state.IsPaused}
              ref={(ref) => {
                this.player = ref
              }}
              resizeMode="cover"

              source={this.state.VideoUrl}
              repeat
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: "black",
              }}
              volume={0.0}
            />
          </View>
          <View style={{
            width: '90%', position: "absolute", justifyContent: 'center', alignSelf: 'center', alignItems: 'flex-end', marginHorizontal: '5%',
            left: 0,
            bottom: '20%',
            right: 0,
          }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 30, color: 'white' }}>
                {Math.ceil(this.state.WeightValue * 3.43)} %
              </Text>
            </View>
            <View style={{ right: 15, top: 5 }}>
              <RnVerticalSlider
                value={this.state.value}
                min={1}
                max={29}
                onChange={(value) => {

                  this.onSeek(value)
                  this.setState({
                    value: value
                  })
                }}
                width={20}
                height={350}
                step={1}
                borderRadius={5}
                minimumTrackTintColor={Colors.green}
                maximumTrackTintColor={'gray'}
                ballIndicatorTextColor={'white'}
              />
            </View>

            <TouchableOpacity
              onPress={() => this.submit()}
              style={{
                height: 50,
                width: 50,
                marginLeft: 'auto',
                marginRight: '10%',
                top: '20%',
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
        </View>

        {renderIf(this.state.signinLoader)(
          <View
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(128,128,128, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              alignContent: 'center',
            }}>
            <Spinner
              style={{ margin: 0, padding: 0 }}
              type={'ThreeBounce'}
              isVisible={this.state.signinLoader}
              size={56}
              color={Colors.green}
            />
          </View>,
        )}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    updateGoal: state.UPDATE_GOAL.updateGoal,
    updaterecipe: state.UPDATE_RECIPE.updaterecipe,
    updateGender: state.UPDATE_GENDER.updateGender,
    updateAge: state.UPDATE_AGE.updateAge,
    updateWeight: state.UPDATE_WEIGHT.updateWeight,
    updateHeight: state.UPDATE_HEIGHT.updateHeight,
    updateCurrentFat: state.UPDATE_CURRENTFAT.updateCurrentFat,
    updateTargetWeight: state.UPDATE_TARGETWEIGHT.updateTargetWeight,
    updateLevel: state.UPDATE_LEVEL.updateLevel,
    token: state.SESSION_KEY.sessionKey,
    userStatus: state.UPDATE_USERSTATUS.userStatus,
    signUpCheck: state.USER_SIGNUP_CHECK.userSignUpCheck,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(routine);
