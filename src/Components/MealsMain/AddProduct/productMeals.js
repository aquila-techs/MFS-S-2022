import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  Platform,
  StatusBar,
  scale,
  PixelRatio,
  FlatList,
  BackHandler,
  Dimensions,
  Constants,
} from 'react-native';

import renderIf from 'render-if';
import styles from './Styles';
import Colors from '../../../Theme/Colors'
import { Directions, ScrollView } from 'react-native-gesture-handler';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconA from 'react-native-vector-icons/AntDesign';
import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome5';

import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const optionsData = [
	{
		key:1,
    text: 'Honing',
    subText:"1 el(21 g)",
    kcal:'64 kcal'
	},
	{
		key:2,
    text: 'Volkoenbrood',
    subText:"1 plakje(46 g)",
    kcal:'128 kcal'
  },
  {
		key:3,
    text: 'Koffle met melk',
    subText:"1 plakje(46 g)",
    kcal:'128 kcal'
  },
  {
		key:4,
    text: 'Volkoenbrood',
    subText:"1 plakje(46 g)",
    kcal:'128 kcal'
  },
  {
		key:5,
    text: 'Koffle met melk',
    subText:"1 plakje(46 g)",
    kcal:'128 kcal'
  },
 
];

class ProductMeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore:false,
      index:0,
    }
  }
 
render(){
    const { navigate } = this.props.navigation;
  return(
        <View style={[styles.container, {  }]} >
            <FlatList		
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => (
              <View style={{
              borderColor: '#707070',
              borderBottomWidth:0.5,
              opacity:0.3,
              marginTop:1,
              }} />
              )}
              data={optionsData}
              renderItem={({ item }) =>
              <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Meals')}               
              style={{marginHorizontal:'5%',width:'93%',
              marginVertical:'3%'}}>
                  <View style={{flexDirection:'column'}}>
                    <Text style={{color: "#000",
                    fontSize:20,marginBottom:2}}>{item.text}</Text>
                    <Text style={{ 
                        fontSize: 15, 
                    color: '#b0bec5',
                    fontWeight:'500',alignItems:'center'  }}>{item.subText}</Text>

                            </View>
            <View style={{	position:'absolute',right:20,}}>
                            <Text>{item.kcal}</Text>
                            </View>
              </TouchableOpacity>
              }
              keyExtractor={(item, index) => item + index.toString()}
              />
      </View>
      )}
}
function mapStateToProps(state) {
	return {
		// sessionKey: state.SESSION_KEY.sessionKey,
  //  updateGender:state.UPDATE_GENDER.updateGender,
		// routeName: state.ROUTE_NAME.routeName,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}


 export default connect(mapStateToProps, mapDispatchToProps)(ProductMeals);
