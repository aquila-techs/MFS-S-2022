import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
  ImageBackground,
  Linking,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useHeaderHeight } from '@react-navigation/stack';

import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import tvShowContent from '../../../Assets/todayDetailContent';
import IconF from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconI from 'react-native-vector-icons/Ionicons';

import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import todayDetailContent from '../../../Assets/todayDetailContent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API_URL, SERVER_URL } from '../../../Actions';
import renderIf from 'render-if';
import ProgressCircle from 'react-native-progress-circle';
import Responsive from 'react-native-lightweight-responsive';

const DATAActivity = [
  {
    id: 1,
    title: 'Running',
    formulaValue: '',
    recentActivityCheck: true,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
  {
    id: 2,
    title: 'Walking',
    formulaValue: '',
    recentActivityCheck: false,
    date: false,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
  {
    id: 3,
    title: 'Biking',
    formulaValue: '',
    recentActivityCheck: false,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
  {
    id: 4,
    title: 'Swimming',
    formulaValue: '',
    recentActivityCheck: false,
    date: false,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
  {
    id: 5,
    title: 'Sexual Activity',
    formulaValue: '',
    recentActivityCheck: false,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
  {
    id: 6,
    title: 'Weight Lifting',
    formulaValue: '',
    recentActivityCheck: false,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },

  {
    id: 7,
    title: 'HIIT',
    formulaValue: '',
    recentActivityCheck: false,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
];

function ListItemRecentActivity({ item }) {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        marginBottom: '6%',
        marginTop: '6%',
      }}>
      <Image
        style={{ width: 20, height: 20, marginRight: '3%' }}
        source={item.image}
      />
      <View style={{}}>
        <Text style={{ fontSize: 15, color: '#000' }}>{item.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // image: {
  //   height: MAX_HEIGHT,
  //   width: Dimensions.get('window').width,
  //   alignSelf: 'stretch',
  //   resizeMode: 'cover',
  // },
  titleView: {
    fontSize: 20,
    marginTop: Responsive.height(20),
  },
  name: {
    marginLeft: Responsive.width(5),
    color: '#000',
    fontWeight: '600',
    color: '#000',
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
    color: '#9E9F9D',
    fontSize: 12,
    fontWeight: '300',
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

class ViewProduct extends Component {
  constructor() {
    super();
    this.state = { showNavTitle: false, blogItem: '' };
  }

  handleClick = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
    }
    // const { state} = this.props.navigation;
    //   const abc = this.props.route.params.blogItem;
    // this.setState({
    //   blogItem:this.props.route.params.blogItem
    // })
    //  alert("PROPS" + JSON.stringify(this.props.route.params.blogItem));
  }

  render() {
    const { params } = this.props.route;
    const { blogItem } = this.state;
    //  const headerHeight = useHeaderHeight();
    const MIN_HEIGHT = 50;
    const MAX_HEIGHT = 300;

    return (
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <ImageHeaderScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          bounces={false}
          maxOverlayOpacity={0.8}
          minOverlayOpacity={0.1}
          fadeOutForeground
          renderHeader={() => (
            <View>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  width: '100%',
                  height: 40,
                  width: 40,
                }}
                onPress={() => alert('back')}>
                <IconM name="arrow-back" size={30} color={'#fff'} />
              </TouchableOpacity>

              <ImageBackground
                //		source={{uri:(SERVER_URL+params.blogItem.featureImage.l)}}
                source={require('../../../Assets/about-image.png')}
                style={{
                  height: MAX_HEIGHT,
                  width: Dimensions.get('window').width,
                  alignSelf: 'stretch',
                  resizeMode: 'cover',
                }}
              />
            </View>
          )}
          renderFixedForeground={() => (
            <Animatable.View
              style={{
                height: MIN_HEIGHT,
                justifyContent: 'flex-start',
                opacity: 0,
              }}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 100,
                  shadowColor: '#000',
                  shadowOpacity: 0.8,
                  shadowRadius: 10,
                  shadowOffset: {
                    height: 10,
                    width: 8,
                  },
                  elevation: 20,
                  flexDirection: 'row',
                  justifyContent: 'flex-start'
                }}>
                <IconM
                  name="arrow-back"
                  size={25}
                  color={'#000'}
                  style={{ marginTop: 30, marginLeft: 30 }}
                />
              </View>
            </Animatable.View>
          )}
          renderForeground={() => (
            <View
              style={{
                flex: 1,
                marginTop: Responsive.height(30),
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <IconM
                  name="arrow-back"
                  size={25}
                  color={'#fff'}
                  style={{ marginLeft: 30 }}
                />
              </TouchableOpacity>
              <View
                style={{ position: 'absolute', right: 10, flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <IconI
                    name="share-outline"
                    size={30}
                    color={'#fff'}
                    style={{ marginRight: Responsive.width(10) }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <IconI
                    name="heart-outline"
                    size={30}
                    color={'#fff'}
                    style={{ marginRight: Responsive.width(10) }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            //   <View style={styles.titleContainer}>
            // {/* <Text style={styles.imageTitle}>{blogItem.title}</Text> */}
            //   </View>
          )}>
          <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)}>
            <View style={styles.titleView}>
              {/* <Text style={styles.name}>{blogItem.nameEn}</Text> */}
              <Text style={styles.name}>Banana Yogurt on bread</Text>
              <View style={{ flexDirection: 'row' }}>
                {/* <Text style={styles.feedReadTimeText}><IconF name="clock" size={15} color={'#9E9F9D'} /> {blogItem.specification}</Text>
              <Text style={styles.feedReadTimeText}><IconF name="fire" size={15} color={'#9E9F9D'} /> {blogItem.mealType}</Text> */}
                <Text style={styles.feedReadTimeText}>
                  <IconF name="clock" size={13} color={'#9E9F9D'} /> 3 minutes
                </Text>
                <Text style={styles.feedReadTimeText}>
                  <IconF name="fire" size={13} color={'#9E9F9D'} /> 490 calories
                  per serving
                </Text>
              </View>

              <View style={styles.caleories}>
                {tvShowContent.caleories.map(keyword => (
                  <View style={styles.keywordContainer} key={keyword}>
                    <Text style={styles.caleorie}>{keyword}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.caleories}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: '7%',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: Responsive.width(30),
                        height: Responsive.height(30),
                      }}>
                      <Image
                        style={{
                          width: Responsive.width(21),
                          height: Responsive.height(28),
                        }}
                        source={require('../../../Assets/Images/Icon-01.png')}
                      />
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={styles.feedReadTimeText}>CREATED BY</Text>
                      <Text
                        style={{
                          color: '#000',
                          alignSelf: 'center',
                          fontWeight: 'bold',
                        }}>
                        MyFitSpot
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TriggeringView>

          <View style={styles.section}>
            <View style={styles.infoSection}>
              <Text style={styles.infoName}>Nutrition information </Text>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: '5%',
                    alignItems: 'center',
                    width: '33%',
                  }}>
                  <Text style={styles.feedReadTimeText}>PROTEIN</Text>
                  <Text style={{ color: '#000', alignSelf: 'center' }}>25 g</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: '5%',
                    alignItems: 'center',
                    width: '33%',
                  }}>
                  <Text style={styles.feedReadTimeText}>FAT</Text>
                  <Text style={{ color: '#000', alignSelf: 'center' }}>12 g</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: '5%',
                    alignItems: 'center',
                    width: '33%',
                  }}>
                  <Text style={styles.feedReadTimeText}>NET CARBS</Text>
                  <Text style={{ color: '#000', alignSelf: 'center' }}>61 g</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.lastSection}>
            <View
              style={{
                paddingLeft: Responsive.width(20),
                paddingRight: Responsive.width(20),
                paddingBottom: Responsive.width(20),
                paddingTop: Responsive.width(20),
              }}>
              <Text style={styles.infoName}>Ingredients</Text>

              <View style={{ flexDirection: 'row', width: '100%' }}>
                <Text style={styles.servingTextName}>1 serving</Text>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    alignContent: 'center',
                    width: '60%',
                  }}>
                  <TouchableOpacity
                    //  onPress={()=>alert('add log')}
                    style={{
                      height: Responsive.height(35),
                      width: Responsive.width(130),
                      // borderColor: '#B76EC6',
                      // borderWidth: 1,
                      // top: 30,
                      backgroundColor: '#68bc45',
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      borderRadius: 30,
                    }}>
                    <Text style={{ color: '#fff' }}>Add Meal to Log</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: '18%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      height: Responsive.height(28),
                      width: Responsive.width(28),
                      // borderColor: '#B76EC6',
                      // borderWidth: 1,
                      backgroundColor: '#9E9F9D',
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      borderTopLeftRadius: 20,
                      borderBottomStartRadius: 20,
                      marginRight: '5%',
                    }}>
                    <Text style={{ color: '#fff', fontSize: 30 }}>-</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      height: Responsive.height(28),
                      width: Responsive.width(28),
                      // borderColor: '#B76EC6',
                      // borderWidth: 1,
                      backgroundColor: '#9E9F9D',
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                    }}>
                    <Text style={{ color: '#fff', fontSize: 30 }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                width: '33%',
              }}>
              <TouchableOpacity
                style={{
                  height: Responsive.height(35),
                  width: Responsive.width(100),
                  backgroundColor: '#9E9F9D',
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  borderRadius: 30,
                }}>
                <Text style={{ color: '#fff' }}>Small portion</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                width: '33%',
              }}>
              <TouchableOpacity
                style={{
                  height: Responsive.height(35),
                  width: Responsive.width(100),
                  backgroundColor: '#9E9F9D',
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  borderRadius: 30,
                }}>
                <Text style={{ color: '#fff' }}>Normal portion</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                width: '33%',
              }}>
              <TouchableOpacity
                style={{
                  height: Responsive.height(35),
                  width: Responsive.width(100),
                  backgroundColor: '#9E9F9D',
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  borderRadius: 30,
                }}>
                <Text style={{ color: '#fff' }}>Big portion</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageHeaderScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    dailyActivityType: state.DAILY_ACTIVITY_TYPE.dailyActivityType,
    dailyActivityActive: state.DAILY_ACTIVITY_ACTIVE.dailyActivityActive,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewProduct);
