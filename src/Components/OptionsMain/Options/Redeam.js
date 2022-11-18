//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp  } from 'react-native-responsive-screen';
import {Icon} from 'react-native-elements'
import { Colors } from 'react-native/Libraries/NewAppScreen';
// create a component
const Redeam = () => {
    return (
        <SafeAreaView style={styles.container}>
           <View style={{height:hp(8),flexDirection:'row',paddingHorizontal:wp(5),alignItems:'center' ,justifyContent:'space-between'}}>
              <Icon name={'arrowleft'} type={'antdesign'} size={30} />
               <Text style={{textAlign:'left', justifyContent:'center',fontSize:18, alignItems:'center'}}>{"Redeam Code"}</Text>
               <Text>{""}</Text>
           </View>
           <View style={{flex:1, backgroundColor:'red'}}>
               <Text>
                
               </Text>
           </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export {Redeam};
