import React, {Component} from 'react';
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
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useHeaderHeight} from '@react-navigation/stack';

import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import tvShowContent from '../../../Assets/todayDetailContent';
import IconF from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialIcons';
import todayDetailContent from '../../../Assets/todayDetailContent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {API_URL, SERVER_URL} from '../../../Actions';
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

function ListItemRecentActivity({item}) {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        marginBottom: '6%',
        marginTop: '6%',
      }}>
      <Image
        style={{width: 20, height: 20, marginRight: '3%'}}
        source={item.image}
      />
      <View style={{}}>
        <Text style={{fontSize: 15, color: '#000'}}>{item.title}</Text>
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
  },
  name: {
    marginLeft: Responsive.width(5),
    color: '#000',
    fontWeight: '600',
    fontSize: 24,
  },
  infoName: {
    marginLeft: Responsive.width(5),
    color: '#000',
    fontWeight: '300',
    fontSize: 22,
    letterSpacing: 1,
  },
  infoSection: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
  },
  section: {
    paddingLeft: Responsive.width(20),
    paddingRight: Responsive.width(20),
    paddingBottom: Responsive.width(20),
    paddingTop: Responsive.width(20),
    borderBottomWidth: 6.5,
    shadowColor: 'red',
    borderBottomColor: '#cccccc',
    shadowOpacity: Platform.OS === 'android' ? 0.5 : 0,
  },
  lastSection: {
    borderBottomWidth: 6.5,
    shadowColor: 'red',
    borderBottomColor: '#cccccc',
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
    marginTop: '3%',
  },
  feedReadTimeText: {
    color: '#9E9F9D',
    fontSize: 15,
    fontWeight: '300',
    margin: '2%',
  },
  infoTextName: {
    color: '#9E9F9D',
    fontSize: 15,
    fontWeight: '300',
    margin: '2%',
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
    fontSize: 14,
    color: '#000',
    backgroundColor: '#F3F3F3',
    padding: 10,
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

class AddMeal extends Component {
  constructor() {
    super();
    this.state = {showNavTitle: false, blogItem: ''};
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
    const {params} = this.props.route;
    const {blogItem} = this.state;
    //  const headerHeight = useHeaderHeight();
    const MIN_HEIGHT = 50;
    const MAX_HEIGHT = 300;

    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>
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
                  // width: 40,
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
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
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
                }}>
                <IconM
                  name="arrow-back"
                  size={30}
                  color={'#000'}
                  style={{marginTop: 30, marginLeft: 30}}
                />
              </View>
            </Animatable.View>
          )}
          renderForeground={() => (
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <IconM
                  name="arrow-back"
                  size={30}
                  color={'#fff'}
                  style={{marginTop: 30, marginLeft: 30}}
                />
              </TouchableOpacity>
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
              <View style={{flexDirection: 'row'}}>
                {/* <Text style={styles.feedReadTimeText}><IconF name="clock" size={15} color={'#9E9F9D'} /> {blogItem.specification}</Text>
              <Text style={styles.feedReadTimeText}><IconF name="fire" size={15} color={'#9E9F9D'} /> {blogItem.mealType}</Text> */}
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
                          width: Responsive.width(20),
                          height: Responsive.height(30),
                        }}
                        source={require('../../../Assets/Images/Icon-01.png')}
                      />
                    </View>
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
          </TriggeringView>

          <View style={styles.section}>
            <View style={styles.infoSection}>
              <Text style={styles.infoName}>NUTRITION INFO</Text>
              <Text style={styles.infoTextName}>
                Nutrition info (per serving)
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column', marginTop: '3%'}}>
                  <ProgressCircle
                    percent={69}
                    radius={55}
                    borderWidth={5}
                    color="#767676"
                    shadowColor="#F0F0F0"
                    bgColor="#fff">
                    <Text style={{fontSize: 18}}>{'69%'}</Text>
                  </ProgressCircle>
                  <Text style={styles.carbsText}>CARBS</Text>
                </View>
                <View style={{flexDirection: 'column', margin: '3%'}}>
                  <ProgressCircle
                    percent={10}
                    radius={55}
                    borderWidth={5}
                    color="#767676"
                    shadowColor="#F0F0F0"
                    bgColor="#fff">
                    <Text style={{fontSize: 18}}>{'10%'}</Text>
                  </ProgressCircle>
                  <Text style={styles.carbsText}>PROTEIN</Text>
                </View>
                <View style={{flexDirection: 'column', marginTop: '3%'}}>
                  <ProgressCircle
                    percent={21}
                    radius={55}
                    borderWidth={5}
                    color="#767676"
                    shadowColor="#F0F0F0"
                    bgColor="#fff">
                    <Text style={{fontSize: 18}}>{'21%'}</Text>
                  </ProgressCircle>
                  <Text style={styles.carbsText}>FAT</Text>
                </View>
              </View>
              <View style={styles.caleories} />
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
              <View style={styles.infoSection}>
                <Text style={styles.infoName}>INGREDIENTS</Text>
                <Text style={styles.infoTextName}>4 serv.</Text>
              </View>
              <View>
                <FlatList
                  style={{
                    marginTop: Responsive.height(5),
                    marginBottom: Responsive.height(5),
                  }}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        width: '100%',
                        borderColor: '#707070',
                        borderWidth: 0.3,
                        opacity: 0.1,
                        alignSelf: 'center',
                      }}
                    />
                  )}
                  data={DATAActivity}
                  renderItem={({item}) => (
                    <TouchableOpacity
                    //	onPress={() => actionActivity(item)}
                    >
                      <ListItemRecentActivity item={item} />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => item + index.toString()}
                />
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: -10,
                paddingLeft: Responsive.width(20),
                paddingRight: Responsive.width(20),
                height: '20%',
                backgroundColor: '#fff',
                alignSelf: 'center',
                width: '100%',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: '100%',
                  // borderColor: '#B76EC6',
                  // borderWidth: 1,
                  backgroundColor: '#68bc45',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  borderRadius: 30,
                }}>
                <Text style={{color: '#fff'}}>Track</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageHeaderScrollView>
      </View>
    );
  }
}

export default AddMeal;
