import React, { Component, PureComponent } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Platform,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  Alert,
  Image,
  Animated,
} from 'react-native';
import { styles } from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, SERVER_URL } from '../../../Actions';
import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import _ from 'lodash';
import Colors from '../../../Theme/Colors';
import Responsive from 'react-native-lightweight-responsive';
import IconA from 'react-native-vector-icons/AntDesign';
import IconI from 'react-native-vector-icons/Ionicons';
import i18n from '../../../../translation'
import HTML from "react-native-render-html";
import LottieView from 'lottie-react-native';


import renderIf from 'render-if';
import { SafeAreaView } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Overlay, Icon } from 'react-native-elements';

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;
const detailList = [
  {
    id: 1,
    title:
      'Sit on floor with knees bent at 45 Degree and heels several inches above floor',
  },
  {
    id: 2,
    title:
      'Lean torso back with a 45 degree bend in hips and balance on your sit bones',
  },
  {
    id: 3,
    title: 'Rotate torso to tap both hands on floor by left hip',
  },
  {
    id: 4,
    title:
      'Rotate torso in opposite direction to tap both hands on floor by right hip',
  },
  {
    id: 5,
    title:
      'Lean torso back with a 45 degree bend in hips and balance on your sit bones',
  },
  {
    id: 6,
    title: 'Rotate torso to tap both hands on floor by left hip',
  },
  {
    id: 7,
    title:
      'Rotate torso in opposite direction to tap both hands on floor by right hip',
  },
  {
    id: 8,
    title:
      'Lean torso back with a 45 degree bend in hips and balance on your sit bones',
  },
  {
    id: 9,
    title: 'Rotate torso to tap both hands on floor by left hip',
  },
  {
    id: 10,
    title:
      'Rotate torso in opposite direction to tap both hands on floor by right hip',
  },
  {
    id: 11,
    title:
      'Lean torso back with a 45 degree bend in hips and balance on your sit bones',
  },
  {
    id: 12,
    title: 'Rotate torso to tap both hands on floor by left hip',
  },
  {
    id: 13,
    title:
      'Rotate torso in opposite direction to tap both hands on floor by right hip',
  },
];
// let timer=10;
class WorkOutDetail extends PureComponent {
  constructor(props) {
    super(props);
    const { listItem, CatigoryId, Squate, Userw_id } = this.props?.route?.params;
    this.state = {
      thumbnailUrl: '',
      videoUrl: '',
      video: '',
      workID: Userw_id,
      CatigoryId: CatigoryId,
      getindex: 0,
      workcheck: Squate,
      round: 1,
      filteraray: null,
      ModelObj: {},
      isModalVisible: false,
      loader: false,
      userworkoutid: Userw_id,
      focuscount: true,
      OnBufferStatus: false,
      visible: false,
      modelloading: false,
      Engchecked: false,
      OnlOadStatus: true,
      progress: [],
      WorkoutRemainActivity: 0,
      RemainActivity: 0,
      DataItem: listItem,
      isRest: 'no',
      scrollY: new Animated.Value(
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      detailView: false,
    };
    this.state.DataItem.forEach((element, index) => {
      let obj = {
        id: index,
        selected: false
      }
      this.state.progress.push(obj)
    });
  }
  async componentDidMount() {

    let RemainActivity2 = await AsyncStorage.getItem('RemainActivity')
    let RemainActivity = RemainActivity2 == null || RemainActivity2 == 'null' || RemainActivity2 == 0 ? 0 : RemainActivity2
    const { navigation } = this.props;
    const unsubscribe = navigation.addListener('focus', () => {
      this.getSelectedCatogory()
    });

    this.getSelectedCatogory()

    const WORKOUTREMAINACTIVITY = await AsyncStorage.getItem('WorkoutRemainActivity');
    this.setState({ WorkoutRemainActivity: WORKOUTREMAINACTIVITY, RemainActivity: RemainActivity })

    if (this.props?.languageget === 'en') {
      this.setState({
        Engchecked: true
      })
    } else {
      this.setState({
        Engchecked: false
      })
    }

  }

  getSelectedCatogory = async () => {

    const categoryID = this.state.DataItem[this.state.getindex].category_id

    this.setState({ isRest: categoryID.name == "rest" ? "yes" : "no" })

    if (categoryID.videoUrl == undefined) {
      return;
    } else {
      let TOKEN = await AsyncStorage.getItem('PROFILETOKEN');
      this.setState({ loader: true })

      fetch(`${API_URL}/workout/categories/get/user/${categoryID._id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'auth-token': `${TOKEN}`
        }
      }).then((response) => response.json())
        .then((res) => {
          const data = res;
          this.togelmethod(this.state.getindex)
          this.setState({
            visible: false
          })
          if (data.status === true) {

            var bar = new Promise((resolve, reject) => {

              const isVal = data.data[0].videoUrl.includes('vimeo')

              if (isVal == true) {
                var videoID = data.data[0].videoUrl.replace(/[^0-9]/g, '');
                const VIMEO_ID = videoID;

                fetch(`https://player.vimeo.com/video/${VIMEO_ID}/config`)
                  .then(res => res.json())
                  .then(res => {

                    this.setState({
                      thumbnailUrl: res.video.thumbs['640'],
                      videoUrl: res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
                      video: res.video,
                    })
                  });
                resolve();
              } else {
                this.setState({ videoUrl: '' })
                resolve();
              }
            });

            bar.then(() => {
              this.setState({
                filteraray: data.data[0],
              })

              setTimeout(() => {
                this.setState({ visible: false, loader: false })
              }, 1000);


            });

          }
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        })
    }
  }

  getSelectedCatogory1 = () => {

    this.setState(
      {
        visible: true,
      },
      () => {
        RNFetchBlob.fetch(
          'GET',
          API_URL + '/workout/categories/get/user/' + this.state.DataItem[this.state.getindex].category_id,
          {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'auth-token': this.props.token,
          },
        ).then(res => {
          const data = JSON.parse(res.data);
          this.togelmethod(this.state.getindex)
          this.setState({
            visible: false
          })
          if (data?.status === true) {
            this.setState({
              visible: false,
              filteraray: data?.data[0]
            })
          }
        });
      },
    );
  }


  completecal() {

    fetch(`${API_URL}/user/workout/create`, {

      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': `${this.props?.token}`
      },
      body: JSON.stringify({
        workoutId: this.state.workID
      })
    }).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson.status == true) {
          Alert.alert(i18n.t('workoutSuccessMsg'));
          this.props.navigation.navigate('WorkOut')
          return;
        }

      })
      .catch((error) => {
        alert(JSON.stringify(error));
      })

  }

  async updateData() {

    let REMAIN = this.state.RemainActivity

    let PLUS = this.state.WorkoutRemainActivity
    let CAL = parseInt(PLUS) + 1

    const userData = {
      RemainActivity: REMAIN,
      WorkoutRemainActivity: CAL
    }
    const _props = this.props;
    _props
      .setUserFeatureUpdateAction(userData, _props.token)
      .then(status => {
        this.completecal()
      })
  }

  Previewend = () => {

    if (this.state.DataItem.length - 1 === this.state.getindex) {
      if (this.props?.route?.params?.Count === this.state.round) {
        this.updateData();
      }
      else {
        this.setState({
          getindex: 0,
          progress: [],
          round: this.state.round + 1
        })
        Alert.alert(`You have Complete the ${this.state.round} Round`, "", [{
          text: "OK",
          onPress: () => {
            this.state.DataItem?.forEach((element, index) => {
              let obj = {
                id: index,
                selected: false
              }
              this.state.progress.push(obj)
            });
            this.Completeworkout(this.state.userworkoutid, this.state.DataItem[0]?._id)
          }
        }])
      }
    }
    else {
      this.Completeworkout(this.state.userworkoutid, this.state.DataItem[this.state.getindex]?._id)
    }
  }

  Completeworkout = (workid, timeid) => {
    setTimeout(() => {
      this.getSelectedCatogory()
    }, 200);
  }

  togelmethod = (id) => {
    this.setState({
      progress: this.state.progress?.map((elem) => {
        // elem.selected = false;
        if (elem.id === id) {
          //if (elem.selected !== true) {
          return {
            ...elem,
            selected: true,
          };
          // }
          //  return elem;
        }
        return elem;
      })
    })
  };

  togelmethodNega = (id) => {
    this.setState({
      progress: this.state.progress?.map((elem) => {
        // elem.selected = false;
        if (elem.id === id) {
          //if (elem.selected !== true) {
          return {
            ...elem,
            selected: false,
          };
          // }
          //  return elem;
        }
        return elem;
      })
    })
  };

  getSelectedddCatogory = (id) => {
    const categoryID = this.state.DataItem[this.state.getindex].category_id
    this.setState(
      {
        modelloading: true,
        Catigoryid: id
      },
      () => {
        RNFetchBlob.fetch(
          'GET',
          API_URL + '/workout/categories/get/user/' + categoryID._id,
          {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'auth-token': this.props.token,
          },
        ).then(res => {
          const data = JSON.parse(res.data);

          if (data?.status === true) {
            this.setState({
              modelloading: false,
              isModalVisible: true,
              ModelObj: data?.data[0]
            })
          }
        });
      },
    );
  }

  render() {
    const { DataItem, modelloading, visible, filteraray, ModelObj, Engchecked } = this.state
    const contentWidth = Dimensions.get('window').width;

    if (this.state.loader == true) {
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {renderIf(!this.state.detailView)(
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar hidden={false} />

            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                height: '7.5%',
                marginTop: Platform.OS === 'android' ? 0 : '3%',
                flexDirection: 'row',
                backgroundColor: 'white',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                shadowOpacity: Platform.OS === 'android' ? 0.5 : 0,
                borderBottomWidth: 0,
                elevation: 3,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{ position: 'absolute', left: '5%', padding: 5 }}>
                <IconA name="arrowleft" size={22} color="black" />
              </TouchableOpacity>

              {this.state.isRest == "no" ?
                <Text style={{ color: '#000', fontSize: 18, alignSelf: 'center' }}>
                  {Engchecked ? filteraray?.name : filteraray?.nameDutch}
                </Text>
                :
                <Text style={{ color: '#000', fontSize: 18, alignSelf: 'center' }}>
                  Take Rest
                </Text>
              }

            </View>

            <View style={styles.mainLayout}>
              <ScrollView>
                <View style={{ flex: 1, }}>
                  {filteraray?._id === '614a18cd52c5833d5065c656' ? <Image
                    source={require('./../../../Assets/Today/restimage.jpeg')}
                    resizeMode={'cover'}
                    style={{
                      width: '100%',
                      height: Responsive.height(200),
                      shadowColor: '#D8D8D8',
                      shadowOpacity: 1,
                      shadowRadius: 2,
                      borderRadius: 7,
                      elevation: 5,
                      borderColor: '#D8D8D8',
                      shadowOffset: {
                        height: 2,
                        width: 1,
                      },
                    }} /> :
                    this.state.isRest == "no" ?
                      <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                        <View style={{ marginBottom: -40, zIndex: 1 }}>
                          <Text style={{ marginTop: 10, fontSize: 18, color: Colors.green }}>{i18n.t('pleaseWait')}</Text>
                        </View>
                        <Video
                          muted={true}
                          repeat={true}
                          controls={true}
                          resizeMode={'contain'}
                          selectedVideoTrack={{
                            type: "resolution",
                            value: 1080
                          }}
                          source={{
                            uri: this.state.videoUrl,
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
                          }}
                          style={{
                            zIndex: 8,
                            width: '100%',
                            height: Responsive.height(200),
                            shadowColor: '#D8D8D8',
                            shadowOpacity: 1,
                            shadowRadius: 2,
                            borderRadius: 7,
                            elevation: 5,
                            borderColor: '#D8D8D8',
                            shadowOffset: {
                              height: 2,
                              width: 1,
                            },
                          }}
                        />

                      </View>
                      : null
                  }
                  <View
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginRight: 10,
                      color: '#000',
                      fontSize: 20,
                      fontWeight: '500',
                      backgroundColor: '#F8F8F8',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    {this.state.isRest == "no" ?
                      <Text
                        style={{
                          paddingTop: '7%',
                          paddingBottom: '7%',
                          color: '#000',
                          fontSize: 20,
                          fontWeight: '700',
                        }}>
                        {filteraray?._id === '614a18cd52c5833d5065c656' ? Engchecked ? filteraray?.name ?? '' : filteraray?.nameDutch ?? '' : Engchecked ? filteraray?.slug ?? '' : filteraray?.slugDutch ?? ''}
                      </Text>
                      :
                      <Text
                        style={{
                          paddingTop: '7%',
                          paddingBottom: '7%',
                          color: '#000',
                          fontSize: 20,
                          fontWeight: '700',
                        }}>
                        Take Rest
                      </Text>
                    }
                  </View>
                  <View
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginRight: 10,
                      color: '#000',
                      fontSize: 20,
                      fontWeight: '500',
                      // backgroundColor: '#F8F8F8',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        paddingTop: '7%',
                        paddingBottom: '7%',
                        color: '#000',
                        fontSize: 30,
                        fontWeight: '700',
                      }}>
                      {`${DataItem[this.state.getindex]?.count ?? ''}`}
                    </Text>

                  </View>

                  <View
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        paddingTop: '7%',
                        paddingBottom: '7%',
                        color: '#000',
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      {`set ${this.state.round ?? ''} ${Engchecked ? 'of' : 'van'} ${this.props?.route?.params?.Count ?? ''}`}
                    </Text>
                  </View>
                </View>

              </ScrollView>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  position: 'absolute',
                  bottom: '3%',
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      getindex: this.state.getindex === 0 ? 0 : this.state.getindex - 1,
                    })
                    this.togelmethodNega(this.state.getindex)
                    this.Completeworkout(this.state.userworkoutid, this.state.DataItem[this.state.getindex]?._id)
                  }
                  }
                  style={{
                    borderRadius: 30,
                    backgroundColor: '#F8F8F8',
                    padding: 10,
                  }}>
                  <IconA name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    filteraray?._id === '614a18cd52c5833d5065c656' ? Alert.alert(`Please take a rest ${DataItem[this.state.getindex]?.count}`, '') :
                      this.getSelectedddCatogory(DataItem[this.state.getindex]?.category_id)
                  }
                  }
                  style={{
                    borderRadius: 30,
                    backgroundColor: '#F8F8F8',
                    padding: 10,
                  }}>
                  <IconI name="information" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      getindex: this.state.getindex + 1
                    })
                    this.Previewend()
                  }
                  }
                  style={{
                    borderRadius: 30,
                    backgroundColor: '#F8F8F8',
                    padding: 15,
                  }}>
                  <IconA name="arrowright" size={22} color="black" />
                </TouchableOpacity>
              </View>
            </View>

          </View >
        )
        }
        {
          renderIf(this.state.detailView)(
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

              <StatusBar
                hidden={false}
              />

              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{}}>
                  <ImageBackground
                    source={require('./../../../Assets/home-workout-1.jpg')}
                    style={{
                      width: '100%',
                      height: Responsive.height(200),
                      backgroundColor: '#ffffff',
                      shadowColor: '#D8D8D8',
                      shadowOpacity: 1,
                      shadowRadius: 2,
                      borderRadius: 7,
                      elevation: 5,
                      borderColor: '#D8D8D8',
                      shadowOffset: {
                        height: 2,
                        width: 1,
                      },
                    }}>
                    <TouchableOpacity
                      style={{ position: 'absolute', right: '10%', top: '10%' }}
                      onPress={() =>
                        this.setState({ detailView: !this.state.detailView })
                      }>
                      <IconA name="close" size={30} color="black" />
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
                <View
                  style={{
                    width: '90%',
                    marginLeft: Responsive.width(10),
                    flexDirection: 'row',
                    marginRight: 10,
                    color: '#000',
                    fontSize: 20,
                    fontWeight: '500',
                  }}>
                  <Text
                    style={{
                      paddingTop: '7%',
                      paddingBottom: '7%',
                      color: '#000',
                      fontSize: 18,
                      fontWeight: '700',
                    }}>
                    Russian twist
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: Responsive.width(10),
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 13,
                      fontWeight: '700',
                    }}>
                    {' '}
                    "Muscles Involved:
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 13,
                    }}>
                    {' '}
                    abs, quadriceps
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: Responsive.width(10),
                  }}>
                  <Text
                    style={{
                      paddingTop: '3%',
                      paddingBottom: '2%',
                      color: '#000',
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    This is how to perform one repetition:
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: Responsive.width(10),
                    marginRight: Responsive.width(10),
                    flex: 1,
                  }}>
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
                    data={detailList}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          marginTop: '3%',
                          marginRight: '5%',
                          marginBottom: '2%',
                          flexDirection: 'row',
                        }}
                      //onPress={() => this.props.navigation.navigate("TodayDetail")}
                      >
                        <Text style={{ fontSize: 15 }}>{item.id} . </Text>
                        <Text style={{ fontSize: 15 }}>{item.title}</Text>
                      </View>
                    )}
                    keyExtractor={(item, index) => item + index.toString()}
                  />
                </View>
              </View>

            </View>
          )
        }

        <View style={{ backgroundColor: 'lightgray', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {
            this.state.progress.map((item, key) => {
              return (
                <View key={key} style={{ flexDirection: 'row', backgroundColor: item.selected ? "green" : 'gray', width: widthPercentageToDP(10), height: 10 }} />
              )
            })
          }
        </View>

        <View style={{ flex: 1, position: 'absolute', left: 0, right: 0, }}>

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
                  <ScrollView style={{ width: widthPercentageToDP('101') }} contentContainerStyle={{ paddingBottom: '2%' }}>
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

        </View>

      </SafeAreaView >
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
)(WorkOutDetail);
