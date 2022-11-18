import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  ImageBackground,
  ScrollView,
  Linking,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useHeaderHeight } from '@react-navigation/stack';
import HTML from "react-native-render-html";
import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import tvShowContent from '../../../Assets/todayDetailContent';
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconF from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialIcons';
import todayDetailContent from '../../../Assets/todayDetailContent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API_URL, SERVER_URL } from '../../../Actions';
import renderIf from 'render-if';
import Responsive from 'react-native-lightweight-responsive';
import { SafeAreaView } from 'react-native';
import I18n from "../../../../translation";

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
    fontWeight: '400',
    fontSize: 22,
  },
  section: {
    paddingLeft: Responsive.width(20),
    paddingRight: Responsive.width(20),
    paddingBottom: Responsive.width(20),
    paddingTop: Responsive.width(20),
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
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
    marginLeft: Responsive.width(5),
    color: '#9E9F9D',
    fontSize: 15,
    marginBottom: 10,
    fontWeight: '300',
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

class TodayDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { showNavTitle: false, blogItem: '', TOKEN: '' };
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
  componentDidMount = async () => {

    let TOKEN = await AsyncStorage.getItem('PROFILETOKEN')
    this.setState({ TOKEN: TOKEN })

    // alert(JSON.stringify(this.props.route.params.blogItem))

    this.setState({
      blogItem: this.props.route.params.blogItem,
    });
  }

  render() {
    const { params } = this.props.route;
    const { blogItem } = this.state;
    const MIN_HEIGHT = 50;
    const MAX_HEIGHT = 300;
    const deviceLanguage = I18n.currentLocale();

    return (
      <SafeAreaView style={{ flex: 1 }}>
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
                source={{ uri: SERVER_URL + params?.blogItem?.featureImage?.l }}
                //source={require('../../../Assets/Images/todayImage-4.png')}
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
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
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
                  style={{ marginTop: 30, marginLeft: 30 }}
                />
              </View>
            </Animatable.View>
          )}
          renderForeground={() => (
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <IconM
                  name="arrow-back"
                  size={30}
                  color={'#fff'}
                  style={{ marginTop: 30, marginLeft: 30 }}
                />
              </TouchableOpacity>
            </View>
          )}>
          <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)}>
            <View style={styles.titleView}>
              {deviceLanguage == 'nl' ?
                <Text style={styles.name}>{blogItem.titleDutch}</Text>
                :
                <Text style={styles.name}>{blogItem.title}</Text>
              }
              <Text style={styles.feedReadTimeText}>
                {/* {tvShowContent.subTitle} */}
              </Text>
            </View>
          </TriggeringView>


          <View style={styles.writtenSection}>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfile', {
              _id: this.props.route.params.blogItem.user._id,
              token: this.state.TOKEN

            })} style={styles.writtenView}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text
                    style={{
                      color: '#000',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    Fit
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: Responsive.width(25),
                  }}>
                  <Text style={styles.writtenSectionText}>{I18n.t('WRITTENBY')}</Text>
                  <Text style={styles.writtenSectionTitle}>
                    {this.props.route.params.blogItem.user.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* {renderIf(blogItem.description == '' || blogItem.description == null)(
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              // onPress={() => {alert(blogItem.blogUrl)}}
              onPress={() => {
                Linking.openURL(blogItem.blogUrl);
              }}>
              <Text style={styles.loginText}>{I18n.t('ViewAll')}</Text>
            </TouchableOpacity>,
          )} */}

          {renderIf(!blogItem.description == '')(
            <View style={styles.section}>
              <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                {deviceLanguage == 'nl' ?
                  <HTML
                    tagsStyles={{ p: { color: '#58585A', textDecorationLine: 'none', fontSize: 17, fontFamily: 'Montserrat-Bold', lineHeight: 23 } }}
                    source={{ html: blogItem.descriptionDutch }} imagesMaxWidth={Dimensions.get('window').width} contentWidth={Dimensions.get('window').width} />
                  :
                  <HTML
                    tagsStyles={{ p: { color: '#58585A', textDecorationLine: 'none', fontSize: 17, fontFamily: 'Montserrat-Bold', lineHeight: 23 } }}
                    source={{ html: blogItem.description }} imagesMaxWidth={Dimensions.get('window').width} contentWidth={Dimensions.get('window').width} />
                }
              </ScrollView>
            </View>,
          )}
        </ImageHeaderScrollView>
      </SafeAreaView>
    );
  }
}

export default TodayDetail;
