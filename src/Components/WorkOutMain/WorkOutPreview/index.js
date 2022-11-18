import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Modal,
  SafeAreaView,
} from 'react-native';
import { styles } from './Styles';
import { API_URL, SERVER_URL } from '../../../Actions';
import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../../../translation'
import tvShowContent from '../../../Assets/todayDetailContent';
// import Modal from 'react-native-modal';
let deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
import Video from 'react-native-video';
import _ from 'lodash';
import Colors from '../../../Theme/Colors';
import Responsive from 'react-native-lightweight-responsive';
import IconA from 'react-native-vector-icons/AntDesign';
import { Divider, Icon, ButtonGroup, Overlay } from 'react-native-elements';
import HTML from "react-native-render-html";
import HTMLView from 'react-native-htmlview';
import RNFetchBlob from 'rn-fetch-blob';
import { ActivityIndicator } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReadMore from '@fawazahmed/react-native-read-more';
import clip from "text-clipper";

import axios from 'axios';
const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;

function ListItemPopular({ item, listItem }) {
  const { category_id } = item
  // return
  return (
    <SafeAreaView style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: '98%',
          borderWidth: 1,
          borderColor: '#eeeeee',
          borderRadius: 10,
          marginTop: 5,
          marginBottom: 5,
          flexDirection: 'row',
          height:
            Platform.OS === 'IOS' ? Responsive.height(80) : Responsive.height(80),
        }}>
        {
          item?.name === 'rest' ?
            <Image
              source={require('./../../../Assets/Today/restimage.jpeg')}
              resizeMode={'cover'}
              style={styles.feedStyle}
            /> :
            item?.image === null || item?.image === undefined || item?.image === "" ? <Image
              source={require('./../../../Assets/Images/todayImage-2.png')}
              resizeMode={'contain'}
              style={styles.feedStyle}
            />
              : <Image
                source={{ uri: item?.image }}
                resizeMode={'cover'}
                style={styles.feedStyle}
              />
        }

        <View
          style={{
            flexDirection: 'column',
            marginLeft: Responsive.width(10),
            justifyContent: 'center',
            width: widthPercentageToDP(50),
          }}>
          {
            item?.name === 'rest' ? <Text numberOfLines={2} style={styles.feedTitleText}>{"Rest"}</Text> : <Text numberOfLines={2} style={styles.feedTitleText}>{item?.name}</Text>
          }
          {
            item?.name === 'rest' ? <Text style={styles.feedSubTitleText}>{`${item?.count === 0 ? 1 : item?.count} Rest`}</Text> :
              <Text numberOfLines={1} style={styles.feedSubTitleText}>{`${item?.count === 0 ? 1 : item?.count}`}</Text>
          }

        </View>
      </View>
    </SafeAreaView>
  );
}

class WorkOutPreview extends Component {

  constructor(props) {
    const { listItem, userdata } = props?.route?.params;

    super(props);
    this.state = {
      descriptionModal: false,
      workoutData: '',
      isModalVisible: false,
      OnBufferStatus: true,
      OnlOadStatus: true,
      ModelObj: {},
      visible: false,
      Catigoryid: '',
      loader: false,
      Engchecked: false,
      workout: {},
      newWorkout: [],
      workoutDescriptionEn: "",
      workoutDescriptionNl: "",
      workoutdetail: null,
      responseLoading: false,
      selectedIndex: 0,
      // htmlContent:listItem?.description,
      scrollY: new Animated.Value(
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
    };
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex(selectedIndex) {
    if (selectedIndex === 0) {
      // alert("SELECTED")
    }
    else {
      // alert("Complted")
    }
    this.setState({ selectedIndex })
  }
  getResponse = async (id) => {

    // https://api.myfitspot.com/api/user/workout/:userWorkoutId
    this.setState(
      {
        loader: true,
      },
      () => {
        RNFetchBlob.fetch(
          'GET',
          API_URL + '/workout/' + id,
          {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'auth-token': this.props.token,
          },
        ).then(res => {

          const data = JSON.parse(res.data);

          if (data?.status === true) {
            this.setState({
              loader: false,
              workoutDescriptionEn: data.data.descriptionEn,
              workoutDescriptionNl: data.data.descriptionNl,
              workoutdetail: data.data._id,
              workout: data.data.timeLines
            })

          }
        });
      },
    );


  }
  componentDidMount() {
    if (this.props?.languageget === 'en') {
      this.setState({
        Engchecked: true
      })
    } else {
      this.setState({
        Engchecked: false
      })
    }


    if (this.state.selectedIndex === 0) {
      // alert("SELECTED")
    }
    else {
      // alert("Complted")
    }
    const { UW_id } = this.props?.route?.params

    this.getResponse(UW_id)

  }

  getSelectedCatogory = (id) => {

    this.setState(
      {
        visible: true,
        Catigoryid: id
      },
      () => {
        RNFetchBlob.fetch(
          'GET',
          API_URL + '/workout/categories/get/user/' + id,
          {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'auth-token': this.props.token,
          },
        ).then(res => {
          const data = JSON.parse(res.data);

          if (data?.status === true) {
            setTimeout(() => {
              this.setState({
                isModalVisible: true,
                ModelObj: data?.data[0]
              })
            }, 100);

            this.setState({ visible: false, loader: false })

          }
        });
      },
    );
  }

  RsponseChange = async (workout) => {
    // axios.defaults.headers.common = {
    //     //   'auth-token': this.props.token,
    //     //   'Content-type': 'Application/json',
    //     //   Accept: 'Application/json',
    //     // };
    //       const promises = [];
    //       workout.forEach((item) => {
    //         // promises.push(item?.category_id)
    //           // promises.push(axios.get(API_URL + '/workout/categories/get/user/' + item?.category_id));
    //           promises.push(RNFetchBlob.fetch(
    //             'GET',
    //             API_URL + '/workout/categories/get/user/' + item?.category_id,
    //             {
    //               Accept: 'application/json, text/plain, */*',
    //               'Content-Type': 'application/json',
    //               'auth-token': this.props.token,
    //             },
    //           ));
    //       })
    //   // console.log("mbd cbsn dvh dfmhsd vc", promises);
    //       // Once all promises are resolved, update the state
    //       Promise.all(promises).then((responses) => {
    //           let data = JSON.parse(responses?.data)
    //           console.log("dvc hs hgsd vhc dhbvc", responses);

    //         //      return Promise.all(responses.map(function (response) {
    //         // return response?.data?.json();
    //       // }));
    //       })
    //       // .then(function (data) {
    //       //     // Log the data to the console
    //       //     // You would do something with both sets of data here
    //       //     console.log("jhvdcjhadvsfjhevdj",data);
    //       //   }).catch(function (error) {
    //       //     // if there's an error, log it
    //       //     console.log(error);
    //       //   })


    // // let data = addSelectionOnWorkout(workout)
    // // console.log("jdhvc hgfvcsd", data);

    // return
    this.setState({
      responseLoading: true
    })
    workout?.map(async (item) => {
      await RNFetchBlob.fetch(
        'GET',
        API_URL + '/workout/categories/get/user/' + item?.category_id,
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'auth-token': this.props.token,
        },
      ).then(res => {
        const data = JSON.parse(res.data);
        if (data?.status === true) {
          if (data?.data[0]?._id === item?.category_id) {

            // this.setState({
            //   newWorkout: [...this.state.newWorkout,
            //     {...item,
            //     image : data?.data[0]?.image
            //   }
            // ]
            // })
          }
        }
      });

    })

  }

  move = async (listItem, CatigoryId, Squate, Count, Userw_id) => {

    let WorkoutRemainActivity = await AsyncStorage.getItem('WorkoutRemainActivity');
    let RemainActivity = await AsyncStorage.getItem('RemainActivity');
    let UQTY = await AsyncStorage.getItem('UserWorkQTY');

    const w1 = WorkoutRemainActivity;
    const w2 = RemainActivity
    let total = parseInt(w1) + parseInt(w2)

    // if (total == UQTY) {
    //   alert(i18n.t('WorkoutLimit'));
    //   return;
    // } else {

    this.props.navigation.navigate('WorkOutDetail', {
      listItem: listItem,
      CatigoryId: CatigoryId,
      Squate: Squate,
      Count: Count,
      Userw_id: Userw_id
    })

    // }
  }

  render() {
    const buttons = ['All', 'Completed']
    const { selectedIndex, visible, Engchecked } = this.state

    const contentWidth = Dimensions.get('window').width;
    const { params } = this.props?.route;
    const { listItem, userdata } = this.props?.route?.params;
    const { ModelObj, workout, newWorkout, workoutdetail } = this?.state;

    const { UW_id } = this.props?.route?.params

    if (this.state.visible == true || this.state.loader == true) {
      return (
        <View
          style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#ffffff' }}>
          <LottieView
            style={{ width: widthPercentageToDP('25%'), height: heightPercentageToDP('25%') }}
            source={require('../../../Assets/loader.json')}
            loop={true}
            autoPlay
          />
        </View>
      )
    }

    return (
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>

        <Modal
          transparent={true}
          visible={this.state.descriptionModal}
          onRequestClose={() => this.setState({ descriptionModal: false })}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ backgroundColor: '#ffffff', height: 800 }}>

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => this.setState({ descriptionModal: false })} style={{ width: '20%' }}>
                    <Image style={{ width: 40, height: 40 }} source={require('../../../Assets/Today/backButton.png')} />
                  </TouchableOpacity>
                  <View style={{ width: '80%' }}>
                    {/* <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 60, fontWeight: 'bold', color: '#58595B' }}>Overview</Text> */}
                  </View>
                </View>

                <View>
                  <View style={{ padding: 20 }}>
                    <HTMLView
                      value={this.state.workoutDescriptionEn}
                    />
                    {/* <HTMLView allowWhitespaceNodes={false} source={{ html: this.state.workoutDescriptionEn }} contentWidth={contentWidth} /> */}
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>


        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Header Start */}
          <View
            style={{
              backgroundColor: '#fff',
              width: '95%',
              height: 50,
              flexDirection: 'row',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#eeeeee',
              marginRight: 10,
              marginLeft: 10,
              marginTop: 12,
            }}>

            <TouchableOpacity style={{ alignSelf: 'center', marginLeft: '2%', width: '25%', padding: 10, justifyContent: 'center', }} onPress={() => this.props.navigation.goBack()}>
              <IconA name="arrowleft" size={28} color="black" />
            </TouchableOpacity>

            <View style={{ alignContent: 'center', width: '42%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
              <Text style={{ color: "#000", fontSize: 18, }}>{i18n.t('WorkoutPreview')}</Text>
            </View>

            <View style={{ alignContent: 'center', width: '28%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
              <Text style={{ alignSelf: 'flex-end', fontSize: 16, }}>{i18n.t("rounds")} <Text style={{ color: Colors.green, fontWeight: 'bold' }}>{listItem?.timeLineCount ?? 1}</Text></Text>
            </View>

          </View>
          {/* Header End */}

          <View style={{ paddingHorizontal: "3%" }}>

            <View style={{ marginTop: 12, paddingLeft: 0, paddingTop: 18, paddingBottom: 10, paddingRight: 0, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', padding: 10 }}>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '75%', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfile', {
                    _id: userdata?._id,
                    token: this.props?.token

                  })}>
                    <View style={{ height: heightPercentageToDP(7), flexDirection: 'row', paddingHorizontal: widthPercentageToDP(5) }}>
                      <Image source={userdata?.profilePic ? { uri: SERVER_URL + userdata?.profilePic } : require('../../../Assets/defaultimage.png')} style={{ width: 45, height: 45, borderRadius: 45 / 2 }} />
                      <View style={{
                        paddingStart: widthPercentageToDP(2)
                      }}>
                        <Text style={{ fontSize: 13, color: 'gray', marginLeft: 5 }}> {i18n.t("createdBy")} </Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>{userdata?.name ?? userdata?.email}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '25%', justifyContent: 'center' }}>
                  <Text style={{ padding: 10, fontSize: 16, fontWeight: 'bold', marginTop: -10, }}>{listItem?.time} <Text style={{ color: Colors.green }}>Min</Text></Text>
                  <Text style={{ padding: 10, fontSize: 16, marginTop: -10, fontWeight: 'bold' }}>{listItem?.numberOfCalories ?? '0'} <Text style={{ color: Colors.green }}>{i18n.t("CAL")}</Text></Text>
                </View>
              </View>
            </View>

            <View style={[styles.mainLayout, { marginTop: 15 }]}>

              <TouchableOpacity style={{ marginBottom: 10, marginLeft: 5 }} onPress={() => this.setState({ descriptionModal: true })}>
                <Text style={{ color: Colors.white, alignSelf: 'flex-start', fontSize: 13, borderRadius: 5, padding: 5, backgroundColor: Colors.green }}>{i18n.t('WorkoutDescription')}</Text>
              </TouchableOpacity>

              <View style={{ flex: 1, marginBottom: '20%' }}>
                {
                  selectedIndex === 0 ?
                    <FlatList
                      showsVerticalScrollIndicator={false}
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

                      data={workout}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                        // onPress={() => {
                        //   item?.name === 'rest' ? {} :
                        //     this.getSelectedCatogory(item?.category_id);
                        // }}
                        >
                          <ListItemPopular item={item} listItem={workout} />
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item, index) => item + index.toString()}
                    /> :
                    <View>
                      <Text>
                        {i18n.t('nfond')}
                      </Text>
                    </View>
                }
              </View>
            </View>

          </View>

          {/* <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <View style={{ paddingHorizontal: widthPercentageToDP(5) }}>
              <HTML allowWhitespaceNodes={false} source={{ html: Engchecked ? workoutdetail?.descriptionEn : workoutdetail?.descriptionNl }} imagesMaxWidth={contentWidth} contentWidth={contentWidth} />
            </View>
            <View style={[styles.keywords, { marginTop: 10 }]}>
              <View style={{ marginRight: 10 }}>
                <Text style={{ padding: 10, backgroundColor: Colors.green, color: '#ffffff', borderRadius: 10, paddingRight: 20, paddingLeft: 20, fontSize: 16 }}>{listItem?.time} min</Text>
              </View>
              <View>
                <Text style={{ padding: 10, backgroundColor: Colors.green, color: '#ffffff', borderRadius: 10, paddingRight: 20, paddingLeft: 20, fontSize: 16 }}>{listItem?.numberOfCalories ?? '0'} CAL</Text>
              </View>
            </View>
          </View> */}

        </ScrollView>

        <View
          style={{
            position: 'absolute',
            bottom: '3%',
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>

          <TouchableOpacity
            onPress={() => {

              this.move(workout, workout[0]?._id, true, listItem?.timeLineCount, UW_id);

            }}
            style={{
              backgroundColor: Colors.green,
              width: Responsive.width(200),
              height: Responsive.height(35),
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#64dd17',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 16, color: 'white' }}>{i18n.t('Getready')}</Text>
          </TouchableOpacity>

        </View>

        <Modal
          animationType="slide"
          transparent={true}
          backdropOpacity={0.3}
          visible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({
            isModalVisible: false
          })}
          onRequestClose={() => {
            this.setState({
              isModalVisible: false
            })
          }}
        >
          <View style={{
            height: '105%', backgroundColor: 'rgba(128,129,129, 0.7)',
            left: -21,
            width: '112%'
          }}>
            <View
              style={{
                height: '85%',
                width: '112%',
                // top: 18,
                marginTop: 'auto',
              }}>
              <View
                style={{
                  // flex: 1,
                  height: heightPercentageToDP('85'),
                  width: widthPercentageToDP('100'),
                  // backgroundColor: 'red',
                  backgroundColor: '#fff',
                  // left: -20,
                  bottom: 0,
                  borderRadius: 10,
                  // zIndex: 10,

                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      isModalVisible: false
                    })
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    height: '3%'
                  }}>
                  <Icon name={'minus'} type={"antdesign"} size={30} />
                </TouchableOpacity>
                {/* <View style={{ flex: 1, backgroundColor:'red' }} > */}
                <ScrollView style={{ width: widthPercentageToDP('101') }} contentContainerStyle={{ paddingBottom: '10%' }}>
                  {this.state.OnBufferStatus && <View style={{ position: 'absolute', zIndex: 1, left: 0, right: 0, top: 80 }}>
                    <ActivityIndicator size={'small'} color={'green'} />
                  </View>}
                  {
                    this.state.OnlOadStatus && <View style={{ position: 'absolute', zIndex: 1, left: 0, right: 0, top: 80 }}>
                      <ActivityIndicator size={'small'} color={'green'} />
                    </View>
                  }
                  <View style={{ width: widthPercentageToDP('96'), height: heightPercentageToDP('25'), marginBottom: heightPercentageToDP(2), justifyContent: 'center', alignSelf: 'center' }}>
                    <Video
                      muted={true}
                      repeat={true}
                      rotation={90}
                      controls={true}
                      resizeMode={'cover'}
                      selectedVideoTrack={{
                        type: "resolution",
                        value: 1080
                      }}
                      source={{
                        uri:
                          ModelObj?.videoUrl ?? 'https://myfitspot.com/Videos/Squat.mov'
                      }}
                      ref={ref => {
                        this.player = ref;
                      }}
                      onLoad={(i) => {
                        this.setState({
                          OnlOadStatus: i?.canPlayFastForward
                        })
                      }}
                      onBuffer={(i) => {
                        this.setState({
                          OnBufferStatus: i?.isBuffering
                        })
                        console.log("ON Buffer calling", i);
                      }}
                      onError={this.videoError}
                      style={{
                        borderRadius: 10,
                        flex: 1,
                        marginRight: widthPercentageToDP(1)
                      }}
                    />
                  </View>
                  <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', paddingBottom: 10, }}>
                      {Engchecked ? ModelObj?.name : ModelObj?.nameDutch}
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: '500', marginVertical: 5 }}>
                      {i18n.t('mdinfo')}
                    </Text>
                    <View style={{ height: '5%' }} />
                    <View style={{ width: widthPercentageToDP('95') }}>
                      <HTML allowWhitespaceNodes={false} source={{ html: Engchecked ? ModelObj?.description : ModelObj?.descriptionDutch }} imagesMaxWidth={contentWidth} contentWidth={contentWidth} />
                      <View style={{ paddingTop: heightPercentageToDP(2) }}>
                        <Text style={{ fontSize: 18 }}>
                          {i18n.t('Tips')}
                        </Text>
                        <Text style={{ fontSize: 14 }}>
                          {Engchecked ? ModelObj?.tips : ModelObj?.tipsDutch}
                        </Text>
                      </View>
                    </View>
                    <View style={{ paddingTop: heightPercentageToDP(2) }}>
                      <Text style={{ fontSize: 20, paddingVertical: '2%' }}>
                        {i18n.t('MuscleGroup')}
                      </Text>
                      <Text style={{ fontSize: 14 }}>
                        {Engchecked ? ModelObj?.muscleGroupEnglish : ModelObj?.muscleGroupDutch}
                      </Text>
                    </View>
                    <View style={{ paddingTop: heightPercentageToDP(2) }}>
                      <Text style={{ fontSize: 20, paddingVertical: '2%' }}>
                        {i18n.t('CooperativeMuscles')}
                      </Text>
                      <Text style={{ fontSize: 14 }}>
                        {Engchecked ? ModelObj?.cooperativeMusclesEnglish : ModelObj?.cooperativeMusclesDutch}
                      </Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>



      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.SESSION_KEY.sessionKey,
    languageget: state.LANGUAGE_TRANSLATE.languageget,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkOutPreview);
