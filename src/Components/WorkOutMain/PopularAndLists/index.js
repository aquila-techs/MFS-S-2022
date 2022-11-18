import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  RefreshControl,
  Platform,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
  StatusBar,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import { styles } from './Styles';
import IconF from 'react-native-vector-icons/FontAwesome5';
import i18n from '../../../translation'
import { API_URL, SERVER_URL } from '../../../Actions';
import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import tvShowContent from '../../../Assets/todayDetailContent';

import AsyncStorage from "@react-native-async-storage/async-storage";

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ImageResizer from 'react-native-image-resizer';
import Modal from 'react-native-modal';
let deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
import _ from 'lodash';
import Colors from '../../../Theme/Colors';
import { Overlay } from 'react-native-elements'
import Responsive from 'react-native-lightweight-responsive';
import IconA from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native';

import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const DATA = [
  {
    id: '1',
    title: 'Sleep meditation',
    subTitle: '5-13 minutes',
    driver_cut: '12',
    image: require('./../../../Assets/home-workout-1.jpg'),
  },
  {
    id: '2',
    title: 'Sleep meditation',
    subTitle: '5-13 minutes',
    driver_cut: '20',
    image: require('./../../../Assets/home-workout-2.jpg'),
  },
];
const workOutCategories = [
  { name: 'BOXING' },
  { name: 'HIIT' },
  { name: 'YOGA' },
  { name: 'PILATES' },
  { name: 'STRETCH' },
  { name: 'STRENGTH' },
];
const DATASHORT = [
  {
    id: '1',
    title: 'Success Story: Spring',
    subTitle: '3-min read',
    driver_cut: '12',
    image: require('./../../../Assets/Images/todayImage-2.png'),
    category: 'Lifestyle',
  },
  {
    id: '2',
    title: 'Sleep meditation',
    subTitle: '2-min read',
    driver_cut: '20',
    image: require('./../../../Assets/Images/todayImage-3.png'),
    category: 'Lifestyle',
  },
  {
    id: '3',
    title: 'Success Story: Spring',
    subTitle: '3-min read',
    driver_cut: '12',
    image: require('./../../../Assets/Images/todayImage-2.png'),
    category: 'Lifestyle',
  },
];

function ListItem({ item }) {
  return (
    <View>
      <Image source={item.image} style={styles.feedStyle} />
      <Text style={styles.feedTitleText}>{item.title}</Text>
      <Text style={styles.feedSubTitleText}>{item.subTitle}</Text>
    </View>
  );
}
function ListItemShort({ item }) {
  return (
    <View
      style={{
        width: Responsive.width(300),
        height:
          Platform.OS === 'IOS'
            ? Responsive.height(216)
            : Responsive.height(196),
      }}>
      <Image source={item.image} style={styles.itemShortImage} />
    </View>
  );
}

function ListItemPopular({ Language, item, referrelUse, referrelPurchaseValid, userSubscription }) {
  return (
    <View
      style={{
        marginVertical: 15,
        alignSelf: 'center',
        width: '98%',
        borderRadius: 20,
        height:
          Platform.OS === 'IOS'
            ? Responsive.height(236)
            : Responsive.height(236),
      }}>
      <ImageBackground
        imageStyle={{ borderRadius: 10 }}
        source={
          {
            uri:
              item?.featureImage !== undefined || item?.featureImage !== null
                ? SERVER_URL + item?.featureImage?.l
                : SERVER_URL + "public/images_data/l-KSYF8Tqtwbc-wiCS1.webp",
          }
        }
        style={styles.feedStyle}>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>

            {
              referrelUse == 'false' ?
                item?.pricing !== 'free' && userSubscription === undefined && (
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      left: '5%',
                      alignItems: 'center',
                      borderRadius: Responsive.height(22) / 2,
                      justifyContent: 'center',
                      marginTop: Responsive.height(5),
                      backgroundColor: 'grey',
                      width: Responsive.height(22),
                      height: Responsive.height(22),
                    }}>
                    <IconF
                      name="lock"
                      size={14}
                      color="white"
                      style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                      }}
                    />
                  </TouchableOpacity>
                )
                :
                referrelUse == 'true' && referrelPurchaseValid == 'true' ?
                  null
                  :
                  referrelUse == 'true' && referrelPurchaseValid == 'false' ?
                    item?.pricing !== 'free' && userSubscription === undefined && (
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          left: '5%',
                          alignItems: 'center',
                          borderRadius: Responsive.height(22) / 2,
                          justifyContent: 'center',
                          marginTop: Responsive.height(5),
                          backgroundColor: 'grey',
                          width: Responsive.height(22),
                          height: Responsive.height(22),
                        }}>
                        <IconF
                          name="lock"
                          size={14}
                          color="white"
                          style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                          }}
                        />
                      </TouchableOpacity>
                    )
                    : null
            }

          </View>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: '5%',
              left: '5%',
            }}>
            <View style={{}}>
              <Text
                style={{
                  color: '#ffffff',
                  borderRadius: 10,
                  fontWeight: '400',
                  textAlign: 'center',
                  padding: 3,
                  paddingLeft: 8,
                  paddingRight: 8,
                  alignSelf: 'center',
                  backgroundColor: Colors.green,
                  flexWrap: 'wrap',
                  fontSize: 13,
                }}>
                {item.difficulityLevel ? item.difficulityLevel : 'BEGINNERS'}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <Text style={[styles.feedTitleText, { marginLeft: 12, fontWeight: 'bold', fontSize: 18 }]}>
        {Language == 'nl' ? item.nameNl : item.nameEn}
      </Text>
      <Text style={[styles.feedSubTitleText, { marginLeft: 12, marginTop: 0, }]}>
        {item.specification ? item.specification : 'Sub Title'}
      </Text>
    </View>
  );
}
class PopularAndLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      referrelUse: '',
      referrelPurchaseValid: '',
      workoutList: props?.route?.params?.listdata,
      mainLoader: true,
      scrollY: new Animated.Value(
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
    };

  }

  CreateWorkoutApi = (item) => {

    let body = {
      _id: item?.createdBy?._id
    }
    this.setState(
      {
        visible: true,
      },
      async () => {
        const Header = {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'auth-token': this.props.token,
        }
        const [data2] = await Promise.all([
          RNFetchBlob.fetch(
            'POST',
            API_URL + '/user/getUserProfileDetail', Header,
            JSON.stringify(body),
          )
        ]).then(function (responses) {
          return Promise.all(responses.map(function (response) {
            return response.json();
          }));
        }).finally(() => this.setState({
          visible: false,
        }));

        this.props.navigation.navigate('WorkOutPreview', {
          listItem: item,
          categories: false,
          userdata: data2[0],
          UW_id: item._id
        })

      },
    );
  }

  CreateWorkoutApi111 = (item) => {

    let bodyData = {
      _id: item?.createdBy?._id
    }
    this.setState(
      {
        visible: true,
      },
      () => {
        RNFetchBlob.fetch(
          'POST',
          API_URL + '/user/getUserProfileDetail',
          {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'auth-token': this.props.token,
          },
          JSON.stringify(bodyData),
        ).then(res => {
          const data = JSON.parse(res.data);



          this.setState({
            visible: false,
          });

          this.props.navigation.navigate('WorkOutPreview', {
            listItem: item,
            categories: false,
            UW_id: data?.data?._id
          })

        });
      },
    );
  }

  componentDidMount = async () => {

    const referrelUse = await AsyncStorage.getItem("referrelUse")
    const referrelPurchaseValid = await AsyncStorage.getItem("referrelPurchaseValid")

    this.setState({
      referrelUse: referrelUse,
      referrelPurchaseValid: referrelPurchaseValid
    })

  }

  checkCondition = async (item) => {

    if (this.state.referrelUse == 'false') {

      item.pricing == 'free' ||
        this.props.userSubscription !== undefined
        ? this.CreateWorkoutApi(item)
        : this.props.navigation.navigate('PackageMeal')

    } else if (this.state.referrelUse == 'true' && this.state.referrelPurchaseValid == 'true') {
      this.CreateWorkoutApi(item)
    } else if (this.state.referrelUse == 'true' && this.state.referrelPurchaseValid == 'false') {
      item.pricing == 'free' ||
        this.props.userSubscription !== undefined
        ? this.CreateWorkoutApi(item)
        : this.props.navigation.navigate('PackageMeal')
    }



  }

  render() {
    const { params, } = this.props.route;
    const { workoutsList, visible } = this.state

    if (visible == true) {
      return (
        <View
          style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#ffffff' }}>
          <LottieView
            style={{ width: wp('25%'), height: hp('25%') }}
            source={require('../../../Assets/loader.json')}
            loop={true}
            autoPlay
          />
        </View>
      )
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar hidden={false} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: "3%" }}>

            <View style={{ marginTop: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '70%', justifyContent: 'center' }}>
                  <TouchableOpacity style={{ width: 50, alignSelf: 'flex-start', }} onPress={() => { this.props.navigation.goBack() }} >
                    <Image
                      source={require('./../../../Assets/Today/backButton.png')}
                      style={{
                        width: 50,
                        tintColor: 'black',
                        height: 50,
                        marginTop: -5,
                        marginBottom: 5
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ width: '30%', justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'flex-end', marginRight: 20, fontSize: 15 }}><Text style={{ color: Colors.green, fontWeight: 'bold', fontSize: 16 }}>{this.state.workoutList?.length > 0 ? this.state.workoutList?.length : 0}</Text> {''} {i18n.t('Workouts')}</Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 0 }}>
              <FlatList
                scrollEnabled={true}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      borderColor: '#707070',
                      opacity: 0.2,
                      alignSelf: 'center',
                    }}
                  />
                )}
                data={this.state.workoutList}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => { this.checkCondition(item) }} >
                      <ListItemPopular
                        Language={this.props?.route?.params.Language}
                        userSubscription={this.props.userSubscription}
                        item={item}
                        referrelUse={this.state.referrelUse}
                        referrelPurchaseValid={this.state.referrelPurchaseValid}
                      />
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={(item, index) => item + index.toString()}
              />
            </View>

          </View>
        </ScrollView>




        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainLayout}>
            <View style={{ flex: 1, marginBottom: '15%' }}>


            </View>

            {/* <View style={styles.feedsView}>
					<Text style={styles.feedText}>Collection</Text>
					<Image 
					source={require('./../../../Assets/Images/todayImage-3.png')}
					style={styles.weeklyImage}/>
				 
			 		</View> */}

            {/* <FlatList
			 style={{
					marginBottom:Responsive.height(10)}}
							ItemSeparatorComponent={() => (
							<View style={{
							width:'100%',
							borderColor: '#707070',
							opacity: 0.2,
							alignSelf: 'center',
							}} />
							)}
							data={DATA}
							renderItem={({ item }) =>
							<TouchableOpacity
						//	onPress={() => this.actionOnRow(item.destination)}
						>
							<ListItem item={item}/>
							</TouchableOpacity>
							}
				 keyExtractor={(item, index) => item + index.toString()}
							/> */}
          </View>
        </ScrollView>
        {/* )} */}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.SESSION_KEY.sessionKey,
    userSubscription: state.USER_SUBSCRIPTION.userSubscription,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopularAndLists);
