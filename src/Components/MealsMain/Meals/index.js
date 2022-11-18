import React, { Component } from 'react';
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
  Modal,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconF from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconA from 'react-native-vector-icons/AntDesign';
import i18n from 'react-native-i18n'
// import {
//   PagerTabIndicator,
//   IndicatorViewPager,
//   PagerTitleIndicator,
//   PagerDotIndicator,
// } from 'react-native-best-viewpager';
import Colors from '../../../Theme/Colors';

let deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
import _ from 'lodash';


function ListItem({ item }) {
  return (
    <View style={{ backgroundColor: item.skinColor ? '#FFF8F2' : '#fff' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginBottom: '4%',
          marginLeft: '3%',
          marginRight: '3%',
          marginTop: '4%',
        }}>
        <IconM
          style={{ width: '8%', height: 25, marginRight: '2%' }}
          name="alert-circle-outline"
          size={24}
          color="rgba(0,0,0,0.3)"
        />
        <View style={{ width: '70%' }}>
          <Text style={{ fontSize: 17, color: '#000' }}>{item.title}</Text>
        </View>

        <View
          style={{
            marginRight: '4%',
            marginLeft: 'auto',
            width: '22%',
            flexDirection: 'row',
          }}>
          <View style={{ width: '50%' }}>
            <IconA
              name={item.free ? 'checkcircle' : 'lock1'}
              size={25}
              color="rgba(0,0,0,0.3)"
            />
          </View>
          <View style={{ width: '50%', marginRight: '4%' }}>
            <IconA name="checkcircle" size={25} color="rgba(0,0,0,0.3)" />
          </View>
        </View>
      </View>
    </View>
  );
}

export default class Meals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planPreview: true,
      DATA: [
        {
          id: 1,
          title: i18n.t('getbetterBasic'),
          free: true,
          pro: true,
          skinColor: true,
        },
        {
          id: 2,
          title: i18n.t('getbetterWide'),
          free: false,
          pro: true,
          skinColor: false,
        },
        {
          id: 3,
          title: i18n.t('getbetterExclusive'),
          free: true,
          pro: true,
          skinColor: true,
        },
        {
          id: 4,
          title: i18n.t('getbetterPersonalized'),
          free: false,
          pro: true,
          skinColor: false,
        },
        {
          id: 5,
          title: i18n.t('getbetterhealthy'),
          free: false,
          pro: true,
          skinColor: true,
        }
      ]
    };
  }

  setModalVisible(visible) {
    this.setState({ planPreview: visible });
  }

  _renderDotIndicator() {
    return (
      <PagerDotIndicator
        pageCount={3}
        selectedDotStyle={{
          backgroundColor: '#000',
          height: 8,
          width: 8,
          borderRadius: 50,
        }}
        dotStyle={{ height: 8, width: 8, borderRadius: 50 }}
      />
    );
  }
  openChoosePlanScreen() {
    this.setState({ planPreview: false });
    this.props.navigation.navigate('PackageMeal');
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.planPreview}
          onRequestClose={() => {
            this.setModalVisible(!this.state.planPreview);
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(128,128,128, 0.5)',
            }}>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                //       height: Responsive.height(370),
                height: '100%',
                width: '100%',
                backgroundColor: '#fff',
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    margin: '2%',
                    marginLeft: 'auto',
                    marginTop: '8%',
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}>
                  <IconA name="closecircle" size={28} color="rgba(0,0,0,0.3)" />
                </TouchableOpacity>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '100%',
                      borderBottomColor: 'grey',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '100%',
                        alignSelf: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            width: '60%',
                            textAlign: 'center',
                          }}>
                          {i18n.t('getbetter')}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={{
                            fontSize: 18,
                            width: '80%',
                            color: 'grey',
                            marginTop: '5%',
                            textAlign: 'center',
                          }}>
                          {i18n.t('getbetterdes')}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                        <TouchableOpacity
                          onPress={() => this.openChoosePlanScreen()}
                          style={{
                            padding: '2%',
                            backgroundColor: Colors.green,
                            borderRadius: 25,
                            borderWidth: 1,
                            borderColor: '#64dd17',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: 'white',
                              paddingLeft: '3%',
                              paddingRight: '3%',
                            }}>
                            {i18n.t('getbetterchoose')}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={{ flexDirection: 'row', marginTop: '15%' }}>
                        <Text
                          style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            width: '70%',
                            textAlign: 'center',
                          }}>
                          {i18n.t('getbettercompare')}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'column' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginLeft: 'auto',
                          marginRight: '3%',
                        }}>
                        <Text
                          style={{ fontSize: 18, color: 'grey', margin: '1%' }}>
                          {i18n.t('getbetterfree')}{' '}
                        </Text>
                        <Text
                          style={{ fontSize: 18, color: 'grey', margin: '1%' }}>
                          PRO
                        </Text>
                      </View>
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
                              borderWidth: 0.5,
                              opacity: 0.2,
                              alignSelf: 'center',
                            }}
                          />
                        )}
                        data={this.state.DATA}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                          //	onPress={() => this.actionActivity(item)}
                          >
                            <ListItem item={item} />
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => item + index.toString()}
                      />
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>

        {/* <IndicatorViewPager
          style={{ flex: 4.5 }}
          indicator={this._renderDotIndicator()}>
          <View style={styles.container}>
            <View style={styles.noteImageVu}>
              <Image
                style={styles.logoStyling}
                source={require('../../../Assets/meal-slider-1.jpg')}
              />
            </View>

            <View style={styles.skipBtnView}>
              <Text style={{ fontSize: 18, color: '#b0bec5', fontWeight: '500' }}>
                Adapted to your personal preferences.
              </Text>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.noteImageVu2}>
              <Image
                style={styles.logoStyling2}
                source={require('../../../Assets/meal-slider-2.jpg')}
              />
            </View>

            <View style={styles.skipBtnView}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#b0bec5',
                  fontWeight: '500',
                  alignItems: 'center',
                }}>
                Hundreds of recipes to choose from
              </Text>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.noteImageVu3}>
              <Image
                style={styles.logoStyling3}
                source={require('../../../Assets/meal-slider-3.jpg')}
              />
            </View>

            <View style={styles.skipBtnView}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#b0bec5',
                  fontWeight: '500',
                  alignItems: 'center',
                }}>
                Records your meals and stay accountable
              </Text>
            </View>
          </View>

        </IndicatorViewPager> */}

        <View
          style={{ justifyContent: 'center', flex: 1.5, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => this.setState({ planPreview: true })}
            //onPress={() => (this.props.navigation.navigate('PackageMeal'))}
            style={{
              backgroundColor: Colors.green,
              width: '65%',
              height: '25%',
              borderRadius: 25,
              borderWidth: 1,
              borderColor: '#64dd17',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 18, color: 'white' }}>
              Create your meal plan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10,
  },

  indicatorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  pagerImageDisplay: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 6,
  },
  pagerTextDisplay: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.5,
  },
  skipBtnView: {
    //backgroundColor: 'blue',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1.5,
    marginBottom: '20%',
  },
  skipBtnViewNote: {
    //backgroundColor: 'blue',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1.3,
  },
  pageMoverView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  noteTextVu: {
    flex: 1.7,
    //backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  imageContainerInsideVu: {
    //backgroundColor: 'yellow',
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  logoStyling: {
    height: '90%',
    width: '70%',
  },
  noteImageVu: {
    height: '70%',
    width: '100%',
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    bottom: '25%',
    position: 'absolute',
  },
  logoStyling2: {
    height: '100%',
    width: '80%',
  },
  noteImageVu2: {
    height: '65%',
    width: '100%',
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    bottom: '25%',
    position: 'absolute',
  },
  logoStyling3: {
    height: '100%',
    width: '80%',
  },
  noteImageVu3: {
    height: '65%',
    width: '100%',
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    bottom: '25%',
    position: 'absolute',
  },
  logoStyling4: {
    height: '100%',
    width: '100%',
  },
  noteImageVu4: {
    height: '90%',
    width: '85%',
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    top: '5%',
  },
  frontSignUpText: {
    marginVertical: '2%',
    marginLeft: Responsive.width(20.1),
    backgroundColor: 'transparent',
    color: 'rgba(0,0,0,1)',
    fontSize: Responsive.height(18),
    fontFamily: 'helvetica',
  },
});
