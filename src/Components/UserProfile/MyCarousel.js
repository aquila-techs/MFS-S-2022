import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity,StyleSheet, Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles from './SliderEntry.style';
import SliderEntry2 from './SliderEntry';
import { ENTRIES1, ENTRIES2 } from '../../static/entries';
const SLIDER_1_FIRST_ITEM = 1;
const IS_IOS = Platform.OS === 'ios';
import IconF from 'react-native-vector-icons/FontAwesome'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(56);
const itemHorizontalMargin = wp(0.75);

export const sliderWidth = (viewportWidth-80);
export const itemWidth = slideWidth + itemHorizontalMargin * 1;

const entryBorderRadius = 5;


export default class SliderEntry extends Component {
    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM
        };
    }
    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };
    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry2
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

  

    render () {
        const { slider1ActiveSlide } = this.state;
        return (
            <View style={styles.slideInnerContainer}>
            <Carousel
              ref={c => this._slider1Ref = c}
              data={ENTRIES1}
              renderItem={this._renderItemWithParallax}
              sliderWidth={sliderWidth}
             itemWidth={itemWidth}
              hasParallaxImages={true}
              firstItem={SLIDER_1_FIRST_ITEM}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.8}
               inactiveSlideShift={0}
             containerCustomStyle={{ marginTop:5, overflow: 'visible' }}
         contentContainerCustomStyle={{paddingVertical: 1 }}
              onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
            />
            <View 
            style={{
              flexDirection:'row',
            position: 'absolute',
            width:'100%',
            marginTop:'25%',
            justifyContent:'flex-start',
            alignSelf:'center',
          }}>
           <TouchableOpacity 
           style={{  
            height: 35,
            backgroundColor:'#000',
            justifyContent:'flex-start',
            alignItems:'center',
            width: 35,
            position: 'absolute',
            marginLeft:15,
            borderColor: '#000',
            shadowColor: "rgba(0, 0, 0, 0.16)",
            shadowOffset: {
              width: 5,
              height: 1
            },
            shadowRadius: 5,
            padding: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            //  
            elevation:5,}}
           onPress={() => { this._slider1Ref.snapToPrev(); }}>
           <IconF name="arrow-left" size={20} color='#ffffff' style={{alignSelf:"center"}}/>
           </TouchableOpacity>
         
           <TouchableOpacity 
           style={{  
            height: 35,
            backgroundColor:'#000',
            width: 35,
            position: 'absolute',
            marginLeft:'auto',
            right:0,
            borderColor: '#000',
            shadowColor: "rgba(0, 0, 0, 0.16)",
            shadowOffset: {
              width: 5,
              height: 1
            },
            shadowRadius: 5,
            padding: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50, 
            elevation:5,}}
           onPress={() => { this._slider1Ref.snapToNext(); }}>
           <IconF name="arrow-right" size={20} color='#ffffff' style={{alignSelf:"center"}}/>
           </TouchableOpacity>
           </View>

        </View>
    
        
       );
    }
}