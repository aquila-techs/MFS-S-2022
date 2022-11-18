import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Linking,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useHeaderHeight } from '@react-navigation/stack';
import i18n from '../../../../translation'

import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import tvShowContent from './tvShowContent';

import IconM from 'react-native-vector-icons/MaterialIcons';
import IconI from 'react-native-vector-icons/Ionicons';

import IconF from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  // image: {
  //   height: MAX_HEIGHT,
  //   width: Dimensions.get('window').width,
  //   alignSelf: 'stretch',
  //   resizeMode: 'cover',
  // },
  title: {
    fontSize: 20,
  },
  name: {},
  section: {
    padding: 20,
    borderBottomWidth: 0.3,
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
  // navTitleView: {
  //   height: MIN_HEIGHT,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingTop: 16,
  //   opacity: 0,
  // },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    height: 400,
  },
});

class AboutMyFit extends Component {
  constructor() {
    super();
    this.state = { showNavTitle: false };
  }

  render() {
    // const headerHeight = useHeaderHeight();
    const MIN_HEIGHT = 50;
    const MAX_HEIGHT = 300;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <ImageHeaderScrollView
          showsVerticalScrollIndicator={false}
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.3}
          minOverlayOpacity={0.3}
          fadeOutForeground
          renderHeader={() => (
            <Image
              source={tvShowContent.image}
              style={{
                height: MAX_HEIGHT,
                width: Dimensions.get('window').width,
                alignSelf: 'stretch',
                resizeMode: 'cover',
              }}
            />
          )}
          renderFixedForeground={() => (
            <Animatable.View
              style={{
                height: MIN_HEIGHT,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 16,
                opacity: 0,
              }}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}>
              <View style={{ flex: 1, position: 'absolute', left: 10 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <IconM
                    name="arrow-back"
                    size={30}
                    color={'#fff'}
                    style={{}}
                  />
                </TouchableOpacity>
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
                  style={{ marginTop: 30, marginLeft: 10 }}
                />
              </TouchableOpacity>
              <View style={styles.titleContainer} />
            </View>
          )}>
          <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)}>
            <Text style={styles.title}>
              <Text style={styles.name}>{tvShowContent.title}</Text>
            </Text>
          </TriggeringView>
          <View style={styles.section}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://myfitspot.com');
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  fontSize: 17,
                  marginTop: '7%',
                  alignSelf: 'center',
                  color: '#68bc45',
                }}>
                {i18n.t('Readmore')}
              </Text>
            </TouchableOpacity>
            <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://www.facebook.com/Myfitspotofficial');
                }}>
                <IconI
                  name="logo-facebook"
                  size={30}
                  color={'#000'}
                  style={{ marginTop: 30, marginLeft: 30 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://www.instagram.com/myfitspotofficial/');
                }}>
                <IconF
                  name="instagram"
                  size={30}
                  color={'#000'}
                  style={{ marginTop: 30, marginLeft: 30 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://www.linkedin.com/company/myfitspot');
                }}>
                <IconF
                  name="linkedin"
                  size={30}
                  color={'#000'}
                  style={{ marginTop: 30, marginLeft: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sectionLarge}>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(i18n.t('privacyURL'));
              }}
              style={{
                backgroundColor: '#fff',
                width: '100%',
                height: '15%',
                flexDirection: 'row',
                backgroundColor: 'white',
                alignSelf: 'center',
                alignItems: 'center',
                marginBottom: '0.3%',
                shadowOpacity: Platform.OS == 'ios' ? 0.05 : 0.3,
                elevation: 0.3,
              }}>
              <Text style={{ color: '#000', fontSize: 15, marginLeft: '7%' }}>
                Privacy Policy
              </Text>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: '5%',
                  width: '3%',
                  flexDirection: 'row',
                }}>
                {/* <Text style={{color: "rgba(0,0,0,0.3)",   
                    fontSize:14,marginLeft:'5%',}}>{this.props.userHeight} cm </Text>   */}
                <IconF name="angle-right" size={20} color="rgba(0,0,0,0.3)" />
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                width: '100%',
                height: '15%',
                marginTop: '20%',
                flexDirection: 'row',
                backgroundColor: 'white',
                alignSelf: 'center',
                alignItems: 'center',
                marginBottom: '0.3%',
                shadowOpacity: Platform.OS == 'ios' ? 0.05 : 0.3,
                elevation: 0.3,
              }}>
              <Text style={{ color: '#000', fontSize: 15, marginLeft: '7%' }}>
                App Version
              </Text>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: '5%',
                  width: '20%',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: 'rgba(0,0,0,0.3)',
                    fontSize: 14,
                    marginRight: '5%',
                  }}>
                  Verison 1.0
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                width: '100%',
                height: '15%',
                marginBottom: '20%',
                flexDirection: 'row',
                backgroundColor: 'white',
                alignSelf: 'center',
                alignItems: 'center',
                marginBottom: '0.3%',
                shadowOpacity: Platform.OS == 'ios' ? 0.05 : 0.3,
                elevation: 0.3,
              }}>
              <Text style={{ color: '#000', fontSize: 15, marginLeft: '7%' }}>
                User ID
              </Text>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: '5%',
                  width: '20%',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: 'rgba(0,0,0,0.3)',
                    fontSize: 14,
                    marginRight: '5%',
                  }}>
                  946d7e83
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </ImageHeaderScrollView>
      </View>
    );
  }
}

export default AboutMyFit;
