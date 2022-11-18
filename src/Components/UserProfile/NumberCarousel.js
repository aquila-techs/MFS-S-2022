import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';

const { width } = Dimensions.get('window');

const data = [
  { backgroundColor: '#fff' ,weightText:' 10 - 15%'},
  { backgroundColor: '#fff' ,weightText:' 16 - 20%',},
  { backgroundColor: '#fff' ,weightText:' 21 - 25%'},
  { backgroundColor: '#fff' ,weightText:' 26 - 30%'}
];

export default class NumberCarousel extends Component {
  renderItem = ({ item, index}) => {
    const { backgroundColor } = item;
    const { weightText } = item;
  
    return (
      <View>
      <TouchableOpacity
        style={[styles.item, { backgroundColor }]}
        onPress={() => {
          this.numberCarousel.scrollToIndex(index);
        }}>
        <Text style={styles.text}>{(index+1).toString()}</Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row', justifyContent:"center"}}>
        <Text style={{color:'#9E9F9D',fontSize:15}}>Body Fat:</Text>
      <Text style={{fontSize:14}}>{weightText}</Text>
      </View>
      </View>
    );
  };

  render() {
    return (
      <Carousel
        style={styles.carousel}
        data={data}
        renderItem={this.renderItem}
        itemWidth={200}
        containerWidth={width - 10}
        ref={(c) => {
          this.numberCarousel = c;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({ 
  carousel: {
    flex: 1,
  },
  item: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 100,
    fontWeight: 'bold'
  }
});