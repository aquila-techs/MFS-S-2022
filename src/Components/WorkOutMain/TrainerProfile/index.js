//import liraries
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import tvShowContent from './Content';
import { Icon } from 'react-native-elements'
import { ListItemNew } from '../Home/ListItem'
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements'
import Colors from '../../../Theme/Colors';
import RNFetchBlob from 'rn-fetch-blob';
import { API_URL } from '../../../Actions';
import i18n from '../../../../translation'
import { Linking } from 'react-native';

const MIN_HEIGHT = 40;
const MAX_HEIGHT = 350;

// create a component
class TrainerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavTitle: false,
      visible: false
    };
  }

  CreateWorkoutApi = (item, token) => {
    let bodyData = {
      workoutId: item?._id
    }
    this.setState(
      {
        visible: true,
      },
      () => {
        RNFetchBlob.fetch(
          'POST',
          API_URL + '/user/workout/create',
          {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'auth-token': token,
          },
          JSON.stringify(bodyData),
        ).then(res => {
          const data = JSON.parse(res.data);
        
          if (data?.status === true) {
            this.setState({
              visible: false,
            });
            this.props.navigation.navigate('WorkOutPreview', {
              listItem: item,
              categories: false,
              UW_id: data?.data?._id
            })
          }
        });
      },
    );
  }

  render() {
    const { visible } = this.state
    const { Profile, workout, Subcription, authtoken, Engchecked } = this.props.route?.params

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
      <SafeAreaView style={styles.container}>
       
        <StatusBar barStyle='dark-content' />
        <ImageHeaderScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          fadeOutForeground
          renderHeader={() => <Image source={Profile?.image} style={styles.image} />}

          renderForeground={() => (
            <TouchableOpacity onPress={() => { this.props.navigation.pop() }} style={styles.titleContainer}>
              <Icon size={40} color={'white'} name={'arrow-back'} type={'material'} />
            </TouchableOpacity>
          )}
        >
          <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)}
          >
            <Text style={styles.title}>
              <Text style={styles.name}>{Profile?.name}</Text>
            </Text>
          </TriggeringView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.sectionContent}>{Engchecked ? tvShowContent.overview : tvShowContent.overviewNl}</Text>
          </View>
          <View style={[styles.section, styles.sectionLarge]}>
            {/* <Text style={styles.sectionTitle}>Follow Us</Text> */}
            <View style={styles.keywords}>
              {tvShowContent.keywords.map(keyword => {
                return (
                  <TouchableOpacity onPress={() => {
                    Linking.openURL(keyword.link)
                  }} style={styles.keywordContainer} key={keyword}>
                    <Icon name={keyword?.iconname} type={'material-community'} style={styles.keyword} />
                  </TouchableOpacity>
                )
              })}
            </View>
            <View style={styles.headerGoalText}>
              <Text style={styles.sectionTitle}>{i18n.t('NewWorkouts')}</Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('PopularAndLists', {
                    listname: 'New Workouts',
                  })
                }
                style={{
                  marginTop: Responsive.height(20),
                  marginLeft: 'auto',
                  marginRight: Responsive.width(20),
                }}>
                <Text
                  style={{
                    color: '#9E9F9D',
                    fontSize: 15,
                    fontWeight: '500',
                  }}>
                  {i18n.t('ViewAll')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 20 }}>
              <FlatList
                horizontal
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
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
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        item?.pricing == 'free' ||
                          Subcription !== undefined
                          ? this.CreateWorkoutApi(item, authtoken)
                          : this.props.navigation.navigate('PackageMeal');
                      }}>
                      {/* {item.featureImage !== undefined && ( */}
                      <ListItemNew
                        item={item}
                        index={index}
                        that={this}
                        Engchecked={Engchecked}
                        userSubscription={Subcription}
                      />
                      {/* )} */}
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={(item, index) => item + index.toString()}
              />
            </View>
          </View>

        </ImageHeaderScrollView>
      </SafeAreaView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  keywords: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  keywordContainer: {
    backgroundColor: '#999999',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  keyword: {
    fontSize: 16,
    color: 'white',
  },
  titleContainer: {
    // flex: 0.5,
    top: hp(2),
    // alignSelf: 'stretch',
    left: wp(5),
    // justifyContent: 'center',
    alignItems: 'center',
    width: wp(10),
  },
  // IconStyle: {
  //     // color: 'white',
  //     // tintColor:'white',
  //     // backgroundColor: 'white',
  //     // backgroundColor: 'transparent',
  //     fontSize: 40,
  // },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    backgroundColor: 'red',
    opacity: 0,
  },
  navTitle: {
    color: 'red',
    fontSize: 18,
    backgroundColor: 'red',
  },

  /////Increase the Header  height styles
  sectionLarge: {
    height: 550,
  },
});


//make this component available to the app
export default TrainerProfile;
