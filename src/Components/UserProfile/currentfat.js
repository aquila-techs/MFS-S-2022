import React, {Component, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Alert,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import styles from './style';
import Colors from '../../Theme/Colors';
import {Directions} from 'react-native-gesture-handler';
import IconF from 'react-native-vector-icons/FontAwesome';
import renderIf from 'render-if';
// import {carouselRef} from 'react-native-anchor-carousel';
import NumberCarousel from './NumberCarousel';
import MyCarousel from './MyCarousel';
import PropTypes from 'prop-types';
import Carousel, {Pagination} from 'react-native-snap-carousel';
//import styles from './SliderEntry.style';
import SliderEntry2 from './SliderEntry';
import {ENTRIES1, ENTRIES2} from '../../static/entries';
const SLIDER_1_FIRST_ITEM = 1;
const IS_IOS = Platform.OS === 'ios';

import {ActionCreators} from '../../Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import localize from '../../translation';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(56);
const itemHorizontalMargin = wp(0.75);

export const sliderWidth = viewportWidth - 80;
export const itemWidth = slideWidth + itemHorizontalMargin * 1;

const entryBorderRadius = 5;

class currentfat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weigh: '',
      unit: 'kg',
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }

  renderItem = ({item, index}) => {
    const {backgroundColor} = item;
    return (
      <TouchableOpacity
        style={[styles.item, {backgroundColor}]}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}
      />
    );
  };

  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };
  _renderItemWithParallax({item, index}, parallaxProps) {
    return (
      <SliderEntry2
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  submit() {
    let data = this.state.slider1ActiveSlide + 1;
    const _this = this;

    _this.props.setCurrentFatAction(data).then(status => {
    
      this.setState({}, () => {
        if (status.status) {
          // alert(JSON.stringify(this.props.updateCurrentFat))
          this.props.navigation.navigate('targetweight');
        }
      });
    });
  }

  render() {
    const {slider1ActiveSlide} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.goal5}>
          <Text style={{color: '#000', fontSize: 25, marginBottom: 35}}>
            {localize.t('fatWhat')}
          </Text>
        </View>

        <View style={styles.carouselContainer}>
          <View style={styles.slideInnerContainer}>
            <Carousel
              ref={c => (this._slider1Ref = c)}
              data={ENTRIES1}
              renderItem={this._renderItemWithParallax}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              hasParallaxImages={true}
              firstItem={SLIDER_1_FIRST_ITEM}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.8}
              inactiveSlideShift={0}
              containerCustomStyle={{marginTop: 5, overflow: 'visible'}}
              contentContainerCustomStyle={{paddingVertical: 1}}
              onSnapToItem={index => this.setState({slider1ActiveSlide: index})}
            />
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                width: '100%',
                marginTop: '25%',
                justifyContent: 'flex-start',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: 35,
                  backgroundColor: '#000',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: 35,
                  position: 'absolute',
                  marginLeft: 15,
                  borderColor: '#000',
                  shadowColor: 'rgba(0, 0, 0, 0.16)',
                  shadowOffset: {
                    width: 5,
                    height: 1,
                  },
                  shadowRadius: 5,
                  padding: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  //
                  elevation: 5,
                }}
                onPress={() => {
                  this._slider1Ref.snapToPrev();
                }}>
                <IconF
                  name="arrow-left"
                  size={20}
                  color="#ffffff"
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 35,
                  backgroundColor: '#000',
                  width: 35,
                  position: 'absolute',
                  marginLeft: 'auto',
                  right: 0,
                  borderColor: '#000',
                  shadowColor: 'rgba(0, 0, 0, 0.16)',
                  shadowOffset: {
                    width: 5,
                    height: 1,
                  },
                  shadowRadius: 5,
                  padding: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  elevation: 5,
                }}
                onPress={() => {
                  this._slider1Ref.snapToNext();
                }}>
                <IconF
                  name="arrow-right"
                  size={20}
                  color="#ffffff"
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{marginTop: '5%', width: '100%'}}>
          <TouchableOpacity
            onPress={() => this.submit()}
            // onPress={() => this.props.navigation.navigate('targetweight')}
            style={{
              marginTop: 20,
              height: 50,
              width: 50,
              marginLeft: 'auto',
              marginRight: '10%',
              // borderColor: '#B76EC6',
              // borderWidth: 1,
              padding: 10,
              backgroundColor: Colors.green,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
            }}>
            <IconF
              name="arrow-right"
              size={20}
              color="#ffffff"
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    updateCurrentFat: state.UPDATE_CURRENTFAT.updateCurrentFat,
    // routeName: state.ROUTE_NAME.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(currentfat);
