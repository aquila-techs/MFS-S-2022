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
  ScrollView,

} from 'react-native';
import styles from './style';
import Moment from 'moment';

import Colors from '../../../Theme/Colors'
import { Directions } from 'react-native-gesture-handler';
import IconF from 'react-native-vector-icons/FontAwesome';

import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import localize from '../../../translation';

import RadioButton from './PlanRadioButtons'



class loading7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalValue:''
    };
  }
  componentDidMount(){
    setTimeout(() => {
     this.props.navigation.navigate('PlanMeal')
    }, 4000);
  }
  
render()
{
return(

  <View style={{ width:'100%',
  height:'100%',
  backgroundColor:'#ffffff',
  justifyContent:'center',
  alignContent:'center',
  alignSelf:'center',
  alignItems:'center',}}>
  
<Image
source={require('../../../Assets/Images/loadingMeal.png')}
style={{height:500,width:300}}
        />
   
   
 

</View>
)
}
}


function mapStateToProps(state) {
	return {
		// sessionKey: state.SESSION_KEY.sessionKey,
   updateGoal: state.UPDATE_GOAL.updateGoal,
		// routeName: state.ROUTE_NAME.routeName,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}


 export default connect(mapStateToProps, mapDispatchToProps)(loading7);
