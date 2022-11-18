import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Linking,
  Platform,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';


import IconA from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { Divider, Overlay } from 'react-native-elements'
import { ActionCreators } from '../../../../Actions';
import { bindActionCreators } from 'redux';
import Colors from '../../../../Theme/Colors';

// For IOS
// import ImagePicker from 'react-native-image-picker';

//For Android & IOS
import * as ImagePicker from "react-native-image-picker"


import LottieView from 'lottie-react-native';
const { height, width: WIDTH } = Dimensions.get('window');


import i18n from '../../../../../translation'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Responsive from 'react-native-lightweight-responsive';
import RNFetchBlob from 'rn-fetch-blob';
import { Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class AddProductMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavTitle: false,
      avatarSource: '',
      avatarData: '',
      name: '',
      carbs: '',
      proteins: '',
      fats: '',
      description: '',
      caleories: 0,
      gram: '',
      imageshow: false,
      response: [],
      blogItem: '',
      Message: "",
      calories: '',
      visible: false,
      loader: false
    };
  }

  openOnlyLibrary = async () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.5,
      mediaType: 'photo',
    };

    ImagePicker.launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {

        this.setState({ avatarSource: response.assets[0].uri, imageshow: true, avatarData: response.assets[0] })
        // let photoName = response.fileName === undefined ? 'abc.jpg' : response.fileName;
        // let source = {
        //   uri: response.uri,
        //   name: photoName,
        //   type: 'image/jpg',
        // };
        // const _this = this;

        // this.setState({
        //   avatarSource: source,
        //   avatarData: response.data,
        //   imageshow: true,

        // });

        this.setState({ Secondtime: true });
      }

    });
  };

  addUpdateDailyActiavityCustom = async () => {

    const dat = await AsyncStorage.getItem('todaydate')
    const { fats, proteins, carbs, gram } = this.state;
    const { item } = this.state;
    const { blogItem } = this.state;
    const { name } = this.state;
    const { description } = this.state;
    const { calories } = this.state;
    if (name === '' || calories === '' || fats === '' || proteins === '' || carbs === '' || gram === '') {
      alert(i18n.t('namevalid'))
    }
    else if (this.state.avatarSource === '') {
      alert(i18n.t('imgvalid'))
    }
    else {
      let r = Math.random().toString(36).substring(2)
      const data = {
        type: this.props.dailyActivityType,
        portion: 'full',
        recipeName: name,
        recipeNameNl: name,
        activeStatus: 3,
        image: this.state.avatarSource,
        calories: calories,
        date: dat,
        proteins: parseInt(this.state.proteins),
        fats: parseInt(this.state.fats),
        carbs: parseInt(this.state.carbs),
        recommended: calories * 0.25,
        value: parseInt(this.state.gram),
      };
      const _this = this;
      this.setState(
        {
          loader: true
        },
        async () => {
          await RNFetchBlob.fetch(
            'POST',
            'https://api.myfitspot.com/api/user/activity/recipe/or/product/create',
            {
              'Content-Type': 'application/json',
              'auth-token': this.props.token,
            },
            JSON.stringify(data)
          ).then(res => {
            const data = JSON.parse(res.data);
            console.log("nabsdc bns ", data);
            this.setState({
              loader: false
            })
            if (data.success === true) {
              this.props.navigation.goBack(null);
              // _this.props.navigation.navigate("AddProductMeal", {
              //   RecipeType: this.props.dailyActivityType?.toLowerCase(),
              // });
            }
          });
        },
      );
    }
  };


  render() {
    if (this.state.loader == true) {
      return (
        <View
          style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#ffffff' }}>
          <LottieView
            style={{ width: wp('25%'), height: hp('25%') }}
            source={require('../../../../Assets/loader.json')}
            loop={true}
            autoPlay
          />
        </View>
      )
    }
    return (
      <SafeAreaView style={styles.mainViewStyle}>
        <StatusBar hidden={false} />
        <KeyboardAvoidingView behavior={"position"}>
          <ScrollView>

            <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#eeeeee', justifyContent: 'center' }}>
              <TouchableOpacity style={{ width: 50, alignSelf: 'flex-start' }} onPress={() => this.props.navigation.goBack(null)} >
                <Image
                  source={require('./../../../../Assets/Today/backButton.png')}
                  style={{
                    width: 50,
                    tintColor: 'black',
                    height: 50,
                    marginTop: 0, marginBottom: 10
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20, marginBottom: -10 }}>
              <TouchableOpacity onPress={() => { this.openOnlyLibrary(); }}>
                {this.state.avatarSource === '' ?
                  <Image
                    source={i18n.locale == undefined || i18n.locale == 'nl' ? require('./../../../../Assets/Images/imgplaceDutch.png') : require('./../../../../Assets/Images/imgplace.png')}
                    style={{
                      width: '96%',
                      height: 165,
                      borderRadius: 10,
                      alignSelf: 'center'
                    }}
                  />
                  :
                  <Image
                    source={{ uri: this.state.avatarSource }}
                    style={{
                      width: '96%',
                      height: 180,
                      borderRadius: 10,
                      alignSelf: 'center'
                    }}
                  />

                }
              </TouchableOpacity>
            </View>

            <View>
              <View style={{ marginTop: '10%' }}>
                <View style={styles.firstInput}>
                  <TextInput
                    style={styles.input}
                    placeholder={i18n.t('Name')}
                    placeholderTextColor={'#000000'}
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                  />
                </View>
              </View>

              <View style={{ marginTop: '2%' }}>
                <View style={styles.firstInput}>
                  <TextInput
                    style={styles.input}
                    placeholder={i18n.t('gram')}
                    placeholderTextColor={'#000000'}
                    value={this.state.gram}
                    onChangeText={gram => this.setState({ gram })}
                    keyboardType={'phone-pad'}
                  />
                </View>
              </View>

              <View style={{ marginTop: '2%' }}>
                <View style={styles.firstInput}>
                  <TextInput
                    style={styles.input}
                    placeholder={i18n.t('Calories')}
                    placeholderTextColor={'#000000'}
                    value={this.state.calories}
                    onChangeText={calories => this.setState({ calories })}
                    keyboardType={'phone-pad'}
                  />
                </View>
              </View>

              <View style={{ marginTop: '2%' }}>
                <View style={styles.firstInput}>
                  <TextInput
                    style={styles.input}
                    placeholder={i18n.t('CARBS')?.charAt(0).toUpperCase() + i18n.t('CARBS').toLowerCase()?.slice(1)}
                    placeholderTextColor={'#000000'}
                    value={this.state.carbs}
                    onChangeText={carbs => this.setState({ carbs })}
                    keyboardType={'phone-pad'}
                  />
                </View>
              </View>

              <View style={{ marginTop: '2%' }}>
                <View style={styles.firstInput}>
                  <TextInput
                    style={styles.input}
                    placeholder={i18n.t('PROTEIN')?.charAt(0).toUpperCase() + i18n.t('PROTEIN').toLowerCase()?.slice(1)}
                    placeholderTextColor={'#000000'}
                    value={this.state.proteins}
                    onChangeText={proteins => this.setState({ proteins })}
                    keyboardType={'phone-pad'}
                  />
                </View>
              </View>

              <View style={{ marginTop: '2%' }}>
                <View style={styles.firstInput}>
                  <TextInput
                    style={styles.input}
                    placeholder={i18n.t('FAT')?.charAt(0).toUpperCase() + i18n.t('FAT').toLowerCase()?.slice(1)}
                    placeholderTextColor={'#000000'}
                    value={this.state.fats}
                    onChangeText={fats => this.setState({ fats })}
                    keyboardType={'phone-pad'}
                  />
                </View>
              </View>

            </View>

            <TouchableOpacity
              onPress={() => this.addUpdateDailyActiavityCustom()}
              style={{
                marginTop: 20,
                backgroundColor: Colors.green,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                width: '85%',
                alignSelf: 'center'
              }}>
              <Text
                style={{
                  fontSize: Responsive.height(15),
                  fontWeight: '500',
                  color: '#fff',
                  padding: 12
                }}>
                {i18n.t('Add')}
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>

      </SafeAreaView>
    );
  }
}

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
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  titleView: {
    fontSize: 20,
    marginTop: Responsive.height(20),
  },
  name: {
    marginLeft: Responsive.width(5),
    color: '#000',
    fontWeight: '600',
    fontSize: 20,
  },
  infoName: {
    marginLeft: Responsive.width(5),
    color: '#000',
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 0.4,
  },
  infoSection: {
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#cccccc',
  },
  section: {
    paddingLeft: Responsive.width(20),
    paddingRight: Responsive.width(20),
    paddingBottom: Responsive.width(20),
    //  borderBottomWidth: 6.5,
    shadowColor: 'red',
    borderBottomColor: '#cccccc',
    shadowOpacity: Platform.OS === 'android' ? 0.5 : 0,
  },
  lastSection: {
    shadowOpacity: Platform.OS === 'android' ? 0.5 : 0,
  },
  writtenSection: {
    height: Responsive.height(65),
    paddingLeft: Responsive.width(20),
    paddingRight: Responsive.width(20),
    paddingBottom: Responsive.width(20),
    paddingTop: Responsive.width(20),
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  writtenView: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: Responsive.height(40),
    width: Responsive.width(298),
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonContainer: {
    height: Responsive.height(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
    borderRadius: 5,
    margin: '5%',
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#000',
    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },
  },
  loginText: {
    color: 'white',
    fontSize: 17,
  },
  writtenSectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: Responsive.height(2),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: Responsive.height(10),
  },
  sectionContent: {
    fontSize: 18,
    textAlign: 'auto',
  },
  keywords: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  caleories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  keywordContainer: {
    marginTop: '2%',
  },
  feedReadTimeText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    margin: '2%',
  },
  infoTextName: {
    color: '#9E9F9D',
    fontSize: 15,
    fontWeight: '300',
    margin: '2%',
  },
  servingTextName: {
    color: '#9E9F9D',
    fontSize: 15,
    fontWeight: '300',
    marginTop: '4%',
    marginLeft: '2%',
  },
  carbsText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '300',
    margin: '2%',
    textAlign: 'center',
  },
  writtenSectionText: {
    color: '#9E9F9D',
    fontSize: 15,
    fontWeight: '300',
  },
  keyword: {
    fontSize: 14,
    color: '#000',
    backgroundColor: '#F3F3F3',
    padding: 10,
    marginLeft: Responsive.width(5),
    marginRight: Responsive.width(5),
  },

  caleorie: {
    fontSize: 13,
    color: '#000',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginLeft: Responsive.width(5),
    marginRight: Responsive.width(5),
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    height: 600,
  },
});

function mapStateToProps(state) {
  return {
    dailyActivityType: state.DAILY_ACTIVITY_TYPE.dailyActivityType,
    blogsList: state.BLOG_LIST_SHOW.blogsList,
    userName: state.USER_DATA_NAME.userDataName,
    token: state.SESSION_KEY.sessionKey,
    totalDailyKCal: state.UPDATE_USERDETAIL.totalDailyKCal,
    totalWeeklyKCal: state.UPDATE_USERDETAIL.totalWeeklyKCal,
    recipesList: state.RECIPES_LIST_SHOW.recipesList,
    userId: state.USER_DATA.user._id,

    customBreakfastActive: state.CUSTOM_BREAKFAST_ACTIVE.customBreakfastActive,
    customBreakfastDailyResponse:
      state.BREAKFAST_DAILY_RESPONSE.customBreakfastDailyResponse,
    customLunchActive: state.CUSTOM_LUNCH_ACTIVE.customLunchActive,
    customLunchDailyResponse:
      state.LUNCH_DAILY_RESPONSE.customLunchDailyResponse,
    customDinnerActive: state.CUSTOM_DINNER_ACTIVE.customDinnerActive,
    customDinnerDailyResponse:
      state.DINNER_DAILY_RESPONSE.customDinnerDailyResponse,
    customSnackActive: state.CUSTOM_SNACK_ACTIVE.customSnackActive,
    customSnackDailyResponse:
      state.SNACK_DAILY_RESPONSE.customSnackDailyResponse,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProductMeal);
