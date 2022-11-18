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
  FlatList,
  PixelRatio,
  ActivityIndicator
} from 'react-native';
import styles from './style';
import IconF from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconA from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { Icon, Overlay } from 'react-native-elements'
import { ActionCreators } from '../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../../translation';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { AppIcon } from '../../Assets/Images';
import { CommonActions } from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import { setUserSignUpCheck } from '../LoginSignupMain/LoginMain/Actions/core';
import { API_URL } from '../../Actions';
import RNFetchBlob from 'rn-fetch-blob';

class recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalValue: '',
      setinfo: '',
      setinfodetail: '',
      loading: false,
      MyLoader: false,
      GoalData: [
        {
          id: 1,
          recipeImage: AppIcon.veganimage,
          detail: i18n.t("Vegan"),
          save: "vegan",
          SecretCode: "G",
          Info: i18n.t('losefat')
        },
        {
          id: 2,
          recipeImage: AppIcon.vegitimage,
          detail: i18n.t('Vegetarian'),
          save: "vegetarian",
          SecretCode: "M",
          Info: i18n.t('vagitab')
        },
        {
          id: 3,
          recipeImage: AppIcon.nonvegi,
          detail: i18n.t('Omnivore'),
          save: "omni",
          SecretCode: "V",
          Info: i18n.t('infomni')
        }
      ],
      visible: false,
      // onBoardingCheck: false,
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

  submit(data) {

    this.setState({ MyLoader: true })
    const _this = this;
    _this.props.setRecipeAction(data).then(status => {
      // console.log('signin: ', status, data);
      this.setState({}, () => {
        if (status.status) {
          //alert(JSON.stringify(this.props.updateGoal))
          this.onSubmit();
        }
      });
    });
  }

  renderLoader() {
    return (
      <View>
        <ActivityIndicator color="#6BBB41" size={50} animating={this.state.loading} />
      </View>
    )
  };

  setProfileStatus = async () => {
    fetch(`${API_URL}/user/updateprofilestatus`, {

      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': `${this.props?.token}`
      },
      body: JSON.stringify({
        profileUpdate: 1
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        let profileUpdate = 1;
        AsyncStorage.setItem('STATUSPROFILE', `${profileUpdate}`)
      })
      .catch((error) => {
        alert(error);
      })
  }

  async onSubmit() {

    const quantity = await AsyncStorage.getItem('quantity')
    const workoutDuration = await AsyncStorage.getItem('workoutDuration')

    this.props.UserAuthCheck(this.props?.token)

    let check = await AsyncStorage.getItem('STATUSPROFILE')

    if (check == "0" || check == 0) {
      this.userDataSubmit(Number(quantity), Number(workoutDuration));
      this.setProfileStatus();
    } else {
      this.userUpdateDataSubmit(Number(quantity), Number(workoutDuration));
    }

    // this.setProfileStatus();
    // if (this.props.signUpCheck == false) {
    //   this.userUpdateDataSubmit(Number(quantity), Number(workoutDuration));
    // } else {
    //   this.userUpdateDataSubmit(Number(quantity), Number(workoutDuration));
    // }
  }

  userDataSubmit = async (quantity, workoutDuration) => {

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
      workoutDuration: workoutDuration,
      durationOfWorkout: workoutDuration,
      // numberOfWorkouts: this.props.numberOfWorkouts,
      numberOfWorkouts: 3,
      RemainActivity: 0,
      WorkoutRemainActivity: 0,
      profileUpdate: 1
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
                loading: false
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

  userUpdateDataSubmit = async (quantity, workoutDuration) => {
    AsyncStorage.setItem('UserRecipe', this.props.updaterecipe);
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
      workoutDuration: workoutDuration,
      numberOfWorkouts: this.props.numberOfWorkouts,
      RemainActivity: this.props?.userdetail?.RemainActivity ? this.props?.userdetail?.RemainActivity : 0,
      WorkoutRemainActivity: this.props?.userdetail?.WorkoutRemainActivity ? this.props?.userdetail?.WorkoutRemainActivity : 0,
      profileUpdate: 1
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
                loading: false,
              },
              () => {
                if (status.status) {
                  setTimeout(() => {
                    RNRestart.Restart();
                    // this.setState({ MyLoader: false })
                  }, 1000);
                  // this.props.navigation.navigate('HomeMain');
                }
              },
            );

          });
      },
    );
  }

  ToggleOverlay = () => {
    this.setState({
      visible: !this.state.visible
    })
  };

  render() {

    if (this.state.MyLoader == true) {
      return (
        <View
          style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#ffffff' }}>
          <LottieView
            style={{ width: widthPercentageToDP('25%'), height: heightPercentageToDP('25%') }}
            source={require('../../Assets/loader.json')}
            loop={true}
            autoPlay
          />
        </View>
      )
    }


    const { GoalData } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.goal1}>
          <Text style={{ color: '#000', fontSize: 22, marginBottom: 20 }}>
            {i18n.t('recipetitle')}
          </Text>
        </View>
        <View style={{ justifyContent: 'center', width: widthPercentageToDP('95'), alignItems: 'center' }}>
          {
            GoalData?.map((item, index) => {
              return (
                <TouchableOpacity key={index} style={styles.recipe} onPress={() => {
                  this.submit(item?.save)
                }}>
                  <View style={{ width: widthPercentageToDP('20'), justifyContent: 'center', alignItems: 'center', height: heightPercentageToDP('6') }}>
                    <Image source={item?.recipeImage} style={{
                      width: 65,
                      height: 45,
                      tintColor: '#8AC24A'
                    }} />
                  </View>
                  <Text
                    style={{ color: '#757575', fontSize: 20, margin: 5, marginLeft: 25 }}>
                    {item?.detail}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
          {/* <FlatList
              data={GoalData}
              contentContainerStyle={{
                justifyContent:'center'
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.recipe} onPress={() => this.submit(item?.SecretCode)}>
                    <View style={{width:widthPercentageToDP('15'),justifyContent:'center',alignItems:'center',height:heightPercentageToDP('6')}}>
                      <Image source={item?.recipeImage} style={{
                          width:40,
                          height:40
                      }}/>
                  </View>
                      <Text
                        style={{ color: '#757575', fontSize: 17, margin: 5, marginLeft: 25 }}>
                        {item?.detail}
                      </Text>
                  </TouchableOpacity>
                )
              }}
              keyExtractor={(item, index) => item + index.toString()}
            /> */}
        </View>
        {/* <TouchableOpacity style={styles.goal2} onPress={() => this.submit('G')}>
            <View>
              <Text style={{ color: '#2B2C2E', fontSize: 19, marginLeft: 25 }}>
                {localize.t('getfitter')}
              </Text>
              <Text
                style={{ color: '#757575', fontSize: 17, margin: 5, marginLeft: 25 }}>
                {localize.t('toneUp')}
              </Text>
            </View>
            <Icon
            onPress={()=>
              this.ToggleOverlay()
            }
            size={33}
              name='info'
              type='material'
              color='#517fa4'
            />
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.goal2} onPress={() => this.submit('M')}>
            <View>
              <Text style={{ color: '#2B2C2E', fontSize: 19, marginLeft: 25 }}>
                {localize.t('gainmuscle')}
              </Text>
              <Text
                style={{ color: '#757575', fontSize: 17, margin: 5, marginLeft: 25 }}>
                {localize.t('buildmass')}
              </Text>
            </View>
            <Icon
              onPress={()=>{
                this.ToggleOverlay()
              }}
              size={33}
              name='info'
              type='material'
              color='#517fa4'
            />
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.goal2} onPress={() => this.submit('V')}>
            <View>
              <Text style={{ color: '#2B2C2E', fontSize: 19, marginLeft: 25 }}>
                {localize.t('loseweight')}
              </Text>
              <Text
                style={{ color: '#757575', fontSize: 17, margin: 5, marginLeft: 25 }}>
                {localize.t('getmotivated')}
              </Text>
            </View>
            <Icon
              onPress={()=>{
                alert("HELLO")
              }}
              size={33}
              name='info'
              type='material'
              color='#517fa4'
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.goal2} onPress={() => this.submit('V')}>
            <View>
              <Text style={{ color: '#2B2C2E', fontSize: 19, marginLeft: 25 }}>
                {'Accelerated Weightlose'}
              </Text>
              <Text
                style={{ color: '#757575', fontSize: 17, margin: 5, marginLeft: 25 }}>
                {'Lose fat & hard to Sustain'}
              </Text>
            </View>
            <Icon
              onPress={()=>{
                alert("HELLO")
              }}
              size={33}
              name='info'
              type='material'
              color='#517fa4'
            />
          </TouchableOpacity> */}
        {/* <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('routine');
            }}
            style={{
              position: 'absolute',
              right: '10%',
              bottom: '10%',
              backgroundColor: '#4C9550',
              height: '5%',
              width: '20%',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: 'white'}}>Skip</Text>
          </TouchableOpacity> */}
      </View>
    );


  }
}

function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    userID: state.USER_DATA_ID.userDataId,
    updateGoal: state.UPDATE_GOAL.updateGoal,
    updaterecipe: state.UPDATE_RECIPE.updaterecipe,
    updateGender: state.UPDATE_GENDER.updateGender,
    updateAge: state.UPDATE_AGE.updateAge,
    updateWeight: state.UPDATE_WEIGHT.updateWeight,
    updateHeight: state.UPDATE_HEIGHT.updateHeight,
    numberOfWorkouts: state.UPDATE_PHYSICAL_ACTIVITY.numberOfWorkouts,
    updateCurrentFat: state.UPDATE_CURRENTFAT.updateCurrentFat,
    updateTargetWeight: state.UPDATE_TARGETWEIGHT.updateTargetWeight,
    updateLevel: state.UPDATE_LEVEL.updateLevel,
    token: state.SESSION_KEY.sessionKey,
    userStatus: state.UPDATE_USERSTATUS.userStatus,
    signUpCheck: state.USER_SIGNUP_CHECK.userSignUpCheck,
    // routeName: state.ROUTE_NAME.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(recipe);
