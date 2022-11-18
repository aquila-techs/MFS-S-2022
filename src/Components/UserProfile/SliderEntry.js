import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './SliderEntry.style';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;

        return  (
            <ParallaxImage
              source={illustration}
              containerStyle={styles.imageContainer2}
              style={styles.image}
              parallaxFactor={0.0}
              width={100}
              showSpinner={true}
              spinnerColor={'rgba(255, 255, 255, 0.4)' }
              {...parallaxProps}
            />
      
        );
    }

    render () {
        const { data: { title, subtitle }, even } = this.props;

        const uppercaseTitle = 
        <View style={{flexDirection:'row',marginTop:5,justifyContent:'center'}}>
            <Text style={{
                color:'#9E9F9D',
                fontSize: 13,
                letterSpacing: 0.5}}>BODY FAT: </Text>
        <Text
              style={{ color: '#000',
                fontSize: 13,
                letterSpacing: 0.5
            }}
              numberOfLines={2}>{ title} </Text>
              </View>
       

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { alert(`You've clicked '${title}'`); }}
              >
                {/* <View style={[styles.imageContainer]}>
                </View> */}
                <View style={{width:'100%',height:'65%'}}>
                { this.image }

                    { uppercaseTitle }
              
                </View>
            </TouchableOpacity>
        );
    }
}
