import React, {Component} from 'react';
import {
  Text,
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
import {styles} from './Styles';
import IconF from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import {API_URL, SERVER_URL} from '../../../Actions';
import {ActionCreators} from '../../../Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import tvShowContent from '../../../Assets/todayDetailContent';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ImageResizer from 'react-native-image-resizer';
import Modal from 'react-native-modal';
let deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
import _ from 'lodash';
import Colors from '../../../Theme/Colors';
import Responsive from 'react-native-lightweight-responsive';
import IconA from 'react-native-vector-icons/AntDesign';

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
  {name: 'BOXING'},
  {name: 'HIIT'},
  {name: 'YOGA'},
  {name: 'PILATES'},
  {name: 'STRETCH'},
  {name: 'STRENGTH'},
];
const DATASHORT = [
  {
    id: '1',
    title: 'Success Story: Spring',
    subTitle: '3-min read',
    driver_cut: '12',
    image: require('./../../../Assets/home-workout-1.jpg'),
    category: 'Lifestyle',
  },
  {
    id: '2',
    title: 'Sleep meditation',
    subTitle: '2-min read',
    driver_cut: '20',
    image: require('./../../../Assets/home-workout-2.jpg'),
    category: 'Lifestyle',
  },
  {
    id: '3',
    title: 'Success Story: Spring',
    subTitle: '3-min read',
    driver_cut: '12',
    image: require('./../../../Assets/home-workout-1.jpg'),
    category: 'Lifestyle',
  },
];

function ListItem({item}) {
  return (
    <View>
      <Image source={item.image} style={styles.feedStyle} />
      <Text style={styles.feedTitleText}>{item.title}</Text>
      <Text style={styles.feedSubTitleText}>{item.subTitle}</Text>
    </View>
  );
}
function ListItemShort({item}) {
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

function ListItemPopular({item}) {
  return (
    <View
      style={{
        marginVertical: 10,
        marginRight: Responsive.width(10),
        width: '95%',
        borderRadius: 20,
        height:
          Platform.OS === 'IOS'
            ? Responsive.height(236)
            : Responsive.height(236),
      }}>
      <ImageBackground source={item.image} style={styles.feedStyle}>
        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: '5%',
                borderRadius: 20,
                marginTop: Responsive.height(5),
                backgroundColor: 'grey',
                width: Responsive.width(22),
                height: Responsive.height(22),
              }}>
              <IconF
                name="lock"
                size={14}
                color="white"
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginTop: Responsive.height(3),
                }}
              />
            </TouchableOpacity>
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
                  color: '#000',
                  fontWeight: '400',
                  textAlign: 'center',
                  padding: 3,
                  paddingLeft: 8,
                  paddingRight: 8,
                  alignSelf: 'center',
                  backgroundColor: '#FDE1D1',
                  flexWrap: 'wrap',
                  fontSize: 13,
                }}>
                BEGINNERS
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <Text style={styles.feedTitleText}>{item.title}</Text>
      <Text style={styles.feedSubTitleText}>{item.subTitle}</Text>
    </View>
  );
}
class CategoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
    };
  }

  render() {
    const {params} = this.props.route;

    return (
      <View>
        <StatusBar hidden={false} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainLayout}>
            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                height: '6%',
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
                //    onPress={()=>this.props.navigation.navigate('Settings')}
                style={{position: 'absolute', left: '5%', padding: 5}}>
                <IconA name="arrowleft" size={25} color="black" />
              </TouchableOpacity>

              <Text style={{color: '#000', fontSize: 18, alignSelf: 'center'}}>
                {params.listname}
              </Text>
              <TouchableOpacity
                //    onPress={()=>this.props.navigation.navigate('Settings')}
                style={{position: 'absolute', right: '5%'}}>
                <IconF name="search" size={20} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, marginBottom: '15%'}}>
              <View style={styles.headerGoalText}>
                <Text
                  style={{
                    marginTop: Responsive.height(20),
                    marginRight: 'auto',
                    marginLeft: Responsive.width(20),
                    color: '#9E9F9D',
                    fontSize: 13,
                    fontWeight: '500',
                  }}>
                  20 workouts
                </Text>
              </View>
              <View style={{marginLeft: 20}}>
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
                  data={DATASHORT}
                  renderItem={({item}) => (
                    <TouchableOpacity
                    //onPress={() => this.props.navigation.navigate("TodayDetail")}
                    >
                      <ListItemPopular item={item} />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => item + index.toString()}
                />
              </View>
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
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryView);
