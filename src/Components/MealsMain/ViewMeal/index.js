import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  StatusBar,
  ImageBackground,
  Linking,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useHeaderHeight} from '@react-navigation/stack';
import tvShowContent from '../../../Assets/todayDetailContent';
import IconF from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconA from 'react-native-vector-icons/AntDesign';
import IconFE from 'react-native-vector-icons/Feather';

import todayDetailContent from '../../../Assets/todayDetailContent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {API_URL, SERVER_URL} from '../../../Actions';
import renderIf from 'render-if';
import ProgressCircle from 'react-native-progress-circle';
import {ActionCreators} from '../../../Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Responsive from 'react-native-lightweight-responsive';

const optionsData = [
  {
    key: 1,
    text: 'Honing',
    subText: '1 el(21 g)',
    kcal: '64 kcal',
  },
  {
    key: 2,
    text: 'Volkoenbrood',
    subText: '1 plakje(46 g)',
    kcal: '128 kcal',
  },
  {
    key: 3,
    text: 'Koffle met melk',
    subText: '1 plakje(46 g)',
    kcal: '128 kcal',
  },
  {
    key: 4,
    text: 'Volkoenbrood',
    subText: '1 plakje(46 g)',
    kcal: '128 kcal',
  },
  {
    key: 5,
    text: 'Koffle met melk',
    subText: '1 plakje(46 g)',
    kcal: '128 kcal',
  },
];

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

class ViewMeal extends Component {
  constructor() {
    super();
    this.state = {response: '', portion: '', blogItem: '', item: ''};
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
    this.checkDailyActivity();

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

  checkDailyActivity() {
    var response;
    var item;
    var portion;
    if (this.props.dailyActivityType == 'breakfast') {
      response = this.props.breakfastDailyResponse;
      item = this.props.breakfastDailyActivity;
    } else if (this.props.dailyActivityType == 'lunch') {
      response = this.props.lunchDailyResponse;
      item = this.props.lunchDailyActivity;
    } else if (this.props.dailyActivityType == 'dinner') {
      response = this.props.dinnerDailyResponse;
      item = this.props.dinnerDailyActivity;
    } else if (this.props.dailyActivityType == 'snack') {
      response = this.props.snackDailyResponse;
      item = this.props.snackDailyActivity;
    }
    this.setState({
      response: response,
      item: item,
    });
    //alert(JSON.stringify(response.id))
  }

  deleteDailyActivityMeal() {
    const {response} = this.state;
    const {item} = this.state;
    const {blogItem} = this.state;
    // alert(JSON.stringify(blogItem))
    // const data ={
    //     type:this.props.dailyActivityType,
    //     portion:this.state.portion,
    //     recipe:item._id,
    //     calories:100
    // }
    const _this = this;
    this.setState({}, () => {
      _this.props
        .setDeleteDailyActivityMeal(
          this.props.dailyActivityType,
          this.props.token,
          response.id,
        )
        .then(status => {
          if (status.status) {
            this.props.navigation.navigate('HomeMain');
          }
        });
    });
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            height: Platform.OS === 'android' ? '7%' : '8%',
            marginTop: Platform.OS == 'ios' ? '3%' : 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            alignContent: 'center',
            shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.01,
            borderBottomWidth: 0,
            elevation: 3,
          }}>
          <View style={{width: '10%'}}>
            <TouchableOpacity
              style={{}}
              onPress={() => this.props.navigation.goBack()}>
              <IconM name="arrow-back" size={30} color={'#000'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '70%',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: '#000', fontSize: 16, justifyContent: 'center'}}>
              {this.props.route.params.mealItem.nameEn}
            </Text>
          </View>

          <TouchableOpacity
            style={{}}
            onPress={() =>
              this.props.navigation.navigate('EditProduct', {
                blogItem: this.props.route.params.mealItem,
              })
            }>
            <IconFE name="edit" size={25} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{backgroundColor: 'rgba(0,0,0,0.5)'}} />
        <View
          style={{
            alignContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              height: Responsive.height(90),
              width: Responsive.width(100),
              margin: Responsive.height(20),
            }}
            source={{
              uri:
                SERVER_URL +
                this.props.route?.params?.mealItem?.featureImage?.l,
            }}
          />
        </View>

        <View
          style={{
            borderBottomColor: 'rgba(0,0,0,0.1)',
            borderBottomWidth: 0.5,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: '2%',
              borderBottomColor: 'rgba(0,0,0,0.1)',
              borderBottomWidth: 0.5,
              height: Responsive.height(30),
            }}>
            <View style={{marginLeft: 'auto', marginRight: 10}}>
              <Text style={{fontSize: 15, color: '#000'}}>Camera</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.infoSection}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: '5%',
                  alignItems: 'center',
                  width: '25%',
                }}>
                <Text style={styles.feedReadTimeText}>200 kcal</Text>
                <Text
                  style={{color: '#9E9F9D', alignSelf: 'center', fontSize: 12}}>
                  Caliorieen
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: '5%',
                  alignItems: 'center',
                  width: '25%',
                }}>
                <Text style={styles.feedReadTimeText}>41.8 g</Text>
                <Text
                  style={{color: '#9E9F9D', alignSelf: 'center', fontSize: 12}}>
                  Koolhydraten
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: '5%',
                  alignItems: 'center',
                  width: '25%',
                }}>
                <Text style={styles.feedReadTimeText}>4.3 g</Text>
                <Text
                  style={{color: '#9E9F9D', alignSelf: 'center', fontSize: 12}}>
                  Eiwit
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: '5%',
                  alignItems: 'center',
                  width: '25%',
                }}>
                <Text style={styles.feedReadTimeText}>2.6 g</Text>
                <Text
                  style={{color: '#9E9F9D', alignSelf: 'center', fontSize: 12}}>
                  Vet
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{flex: 1}}>
          <FlatList
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  borderColor: '#707070',
                  borderBottomWidth: 0.5,
                  opacity: 0.3,
                  marginTop: 1,
                }}
              />
            )}
            data={optionsData}
            renderItem={({item}) => (
              <View
                style={{
                  marginHorizontal: '5%',
                  width: '93%',
                  marginVertical: '3%',
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{color: '#000', fontSize: 20, marginBottom: 2}}>
                    {item.text}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#b0bec5',
                      fontWeight: '500',
                      alignItems: 'center',
                    }}>
                    {item.subText}
                  </Text>
                </View>
                <View style={{position: 'absolute', right: 20}}>
                  <Text>{item.kcal}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => item + index.toString()}
          />
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: 'red',
            bottom: 10,
            height: 45,
            width: '80%',
            margin: '7%',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}
          onPress={() => this.deleteDailyActivityMeal()}>
          <IconFE name="delete" size={25} color="white" />
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '600',
              marginLeft: '5%',
            }}>
            Remove Activity
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    dailyActivityType: state.DAILY_ACTIVITY_TYPE.dailyActivityType,
    dailyActivityActive: state.DAILY_ACTIVITY_ACTIVE.dailyActivityActive,
    token: state.SESSION_KEY.sessionKey,

    breakfastDailyResponse:
      state.BREAKFAST_DAILY_RESPONSE.breakfastDailyResponse,
    lunchDailyResponse: state.LUNCH_DAILY_RESPONSE.lunchDailyResponse,
    dinnerDailyResponse: state.DINNER_DAILY_RESPONSE.dinnerDailyResponse,
    snackDailyResponse: state.SNACK_DAILY_RESPONSE.snackDailyResponse,

    breakfastDailyActivity:
      state.BREAKFAST_DAILY_ACTIVITY.breakfastDailyActivity,
    lunchDailyActivity: state.LUNCH_DAILY_ACTIVITY.lunchDailyActivity,
    dinnerDailyActivity: state.DINNER_DAILY_ACTIVITY.dinnerDailyActivity,
    snackDailyActivity: state.SNACK_DAILY_ACTIVITY.snackDailyActivity,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewMeal);
