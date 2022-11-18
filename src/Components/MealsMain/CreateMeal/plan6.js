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

const options = [
	{
		key:1,
    text: 'Today',
   // subText:"I'm easy",
   // title: I18nManager.isRTL ? 'المطبخ' : 'Kitchen',

	},
	{
		key:2,
    text: 'Tomorrow',
   // subText:'Vegetarian + seafood',
	},
	{
    key:3,
    text: Moment(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+2)).format('dddd'),
    //subText:'Most High Pay',
	},
	{
		key:4,
    text: Moment(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+3)).format('dddd'),
    //subText:'Only meat,fish,nuts and veggies',
  },
  {
		key:5,
    text: Moment(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+4)).format('dddd'),
    //subText:'Only meat,fish,nuts and veggies',
  },
  {
		key:6,
    text: Moment(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+5)).format('dddd'),
    //subText:'Only meat,fish,nuts and veggies',
  },
  {
		key:7,
    text: Moment(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+6)).format('dddd'),
    //subText:'Only meat,fish,nuts and veggies',
  },
];

class plan6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalValue:''
    };
  }
  normalize(size) {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }

  submit(data) {
  
    //  alert(data)
      const _this = this;

      _this.props.setGoalAction(data).then((status) => {
        
          this.setState({
          }, () => {
            if (status.status) {
              //alert(JSON.stringify(this.props.updateGoal))
              this.props.navigation.navigate("foods2")

            } 
          })
        })
    

    
  }
  
render()
{
return(

  <View style={styles.container}>
  
 <View style={styles.goalPlan}>
{/* <Text style={{color: "#000",fontSize:22,marginBottom:20}}>{localize.t('goalWhat')}?</Text> */}
<Text style={{color: "#000",fontSize:28,marginBottom:5,textAlign:'center',width:'65%'}}>How many meals do you have per day?</Text>
<Text style={{ fontSize: 17, color: '#b0bec5',fontWeight:'500',textAlign:'center',width:'65%'  }}>We'all adjust your caloric distribution</Text>

   </View>
   
   <View style={{height:'50%'}}>  
   <RadioButton options={options}  />
   </View>
  
   <View style={{justifyContent:'center',alignItems:'center',bottom:0,top:'3%',}}>
			<TouchableOpacity onPress={() => (this.props.navigation.navigate('Recipes'))}
							style={{
								backgroundColor:Colors.green,
								width: '85%', height: '26%', borderRadius: 25, borderWidth: 1,
								borderColor: '#64dd17', alignItems: 'center',
								justifyContent: 'center'
							}}>
							<Text style={{ fontSize: 18, color: 'white' }}>Create my plan</Text>
						</TouchableOpacity>
						</View>


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


 export default connect(mapStateToProps, mapDispatchToProps)(plan6);
