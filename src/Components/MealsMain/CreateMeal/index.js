import React, {Component} from 'react';
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
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './style';
import IconF from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import {API_URL, SERVER_URL} from '../../../Actions';
import {ActionCreators} from '../../../Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ImageResizer from 'react-native-image-resizer';
import Modal from 'react-native-modal';
let deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
import _ from 'lodash';
import Colors from '../../../Theme/Colors';
import Responsive from 'react-native-lightweight-responsive';

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const DATA = [
  {
    id: '1',
    title: 'Sleep meditation',
    subTitle: '5-13 minutes',
    driver_cut: '12',
    image: require('./../../../Assets/Images/todayImage-1.png'),
  },
  {
    id: '2',
    title: 'Sleep meditation',
    subTitle: '5-13 minutes',
    driver_cut: '20',
    image: require('./../../../Assets/Images/todayImage-1.png'),
  },
];
const DATASHORT = [
  {
    id: '1',
    title: 'Success Story: Spring',
    subTitle: '3-min read',
    driver_cut: '12',
    image: require('./../../../Assets/Images/todayImage-4.png'),
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
];

function ListItem({item}) {
  return (
    <View>
      <Text style={styles.feedText}>{item.title}</Text>
      <Image source={item.image} style={styles.feedStyle} />
      <Text style={styles.feedTitleText}>{item.title}</Text>
      <Text style={styles.feedSubTitleText}>{item.subTitle}</Text>
    </View>
  );
}
function ListItemShort({item}) {
  return (
    <View
      style={{width: Responsive.width(300), height: Responsive.height(216)}}>
      <Image source={item.image} style={styles.itemShortImage} />
      <Text style={styles.feedTitleText}>{item.title}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.feedSubTitleText}>{item.category}: </Text>
        <Text style={styles.feedReadTimeText}>{item.subTitle}</Text>
      </View>
    </View>
  );
}

class CreateMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
    };
  }

  render() {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainLayout}>
            <View style={styles.headerStyle}>
              <View style={styles.headerText}>
                <Text style={styles.headerText}>Welcome,Muhammad</Text>
              </View>
            </View>
            <View style={styles.headerGoalStyle}>
              <View style={styles.headerGoalText}>
                <Text style={styles.headerGoalText}>This week's goals</Text>
                <Text style={styles.headerOverViewText}>Overview</Text>
              </View>
            </View>
            <View style={styles.todayTrackingView}>
              <View style={styles.trackOneStyle}>
                <View style={styles.trackOneText}>
                  <IconF name="list" size={20} color={'#000'} />
                  <Text style={styles.trackOneText}>Week Goal 1</Text>
                  <Text style={styles.trackOneStartText}>0/4</Text>
                </View>
              </View>

              {/* #2 */}
              <View style={styles.trackOneStyle}>
                <View style={styles.trackOneText}>
                  <IconF name="list" size={20} color={'#000'} />
                  <Text style={styles.trackOneText}>Week Goal 2</Text>
                  <TouchableOpacity style={styles.trackOneStartButton}>
                    <Text style={styles.trackOneStartButtonText}>
                      Start Tracking
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* #3 */}
              <View style={styles.trackOneStyle}>
                <View style={styles.trackOneText}>
                  <IconF name="list" size={20} color={'#000'} />
                  <Text style={styles.trackOneText}>Week Goal 3</Text>
                  <TouchableOpacity style={styles.trackOneStartButton}>
                    <Text style={styles.trackOneStartButtonText}>
                      Start Tracking
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.feedsView}>
              <View style={styles.headerGoalText}>
                <Text style={styles.shortText}>Short-but-sweet reads</Text>
                <Text style={styles.viewAllText}>View all</Text>
              </View>
              <FlatList
                horizontal
                scrollEnabled={true}
                style={{
                  marginTop: Responsive.height(5),
                  marginBottom: Responsive.height(10),
                }}
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
                    onPress={() =>
                      this.props.navigation.navigate('TodayDetail')
                    }>
                    <ListItemShort item={item} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => item + index.toString()}
              />
            </View>
            <FlatList
              style={{
                marginTop: Responsive.height(10),
                marginBottom: Responsive.height(10),
              }}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    width: '100%',
                    borderColor: '#707070',
                    opacity: 0.2,
                    alignSelf: 'center',
                  }}
                />
              )}
              data={DATA}
              renderItem={({item}) => (
                <TouchableOpacity
                //	onPress={() => this.actionOnRow(item.destination)}
                >
                  <ListItem item={item} />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => item + index.toString()}
            />
            <View style={styles.feedsView}>
              <Text style={styles.feedText}>Weekly class preview</Text>
              <Image
                source={require('./../../../Assets/Images/todayImage-5.png')}
                style={styles.weeklyImage}
              />
            </View>
            <View style={styles.feedsView}>
              <Text style={styles.feedText}>Today's workout</Text>
              <Image
                source={require('./../../../Assets/Images/todayImage-2.png')}
                style={styles.weeklyImage}
              />
            </View>
            <View style={styles.feedsView}>
              <Text style={styles.feedText}>Meals</Text>
              <Image
                source={require('./../../../Assets/Images/todayImage-3.png')}
                style={styles.weeklyImage}
              />
            </View>
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
)(CreateMeal);
