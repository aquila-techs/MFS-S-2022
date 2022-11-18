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

import Colors from '../../../Theme/Colors'
import { Directions } from 'react-native-gesture-handler';
import IconF from 'react-native-vector-icons/FontAwesome';

import {CheckBox} from 'react-native-elements'

import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import localize from '../../../translation';

import RadioButton from './RadioButtons'

const options = [
	{
		key:1,
    text: 'Lunch and dinner',
   // subText:"I'm easy",
   // title: I18nManager.isRTL ? 'المطبخ' : 'Kitchen',

	},
	{
		key:2,
    text: 'Breakfast, lunch and dinner',
   // subText:'Vegetarian + seafood',
	},
	{
		key: 3,
    text: '3 meals and a snack (best)',
    //subText:'Most High Pay',
	},
	{
		key:4,
    text: '3 meals and 2 snacks',
    //subText:'Only meat,fish,nuts and veggies',
  },
];

class meals4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalValue:'',
      checked:true,
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
  
 <View style={{color: "#000",
        fontSize:22,
        marginBottom:'8%', 
        marginTop:'15%',
        alignItems:'center',
        textAlign:'center',}}>
{/* <Text style={{color: "#000",fontSize:22,marginBottom:20}}>{localize.t('goalWhat')}?</Text> */}
<Text style={{color: "#000",fontSize:28,marginBottom:5,textAlign:'center',width:'70%'}}>How many meals do you have per day?</Text>
<Text style={{ fontSize: 17, color: '#b0bec5',fontWeight:'500',textAlign:'center'  }}>We'all adjust your caloric distribution</Text>

   </View>
   <View style={{height:'60%'}}>  
   <RadioButton options={options} />
   </View>
 

   <View style={{width:'100%',position:'absolute',bottom:'5%',}}>
            <TouchableOpacity
               onPress={() => this.props.navigation.navigate('variety5')}
                    style={{
									marginTop: 20,
                  height: 60,
                  width:60,
                  marginLeft:'auto',
                  marginRight:'10%',
									// borderColor: '#B76EC6',
									// borderWidth: 1,
									padding: 10,
									backgroundColor: Colors.green,
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 50
								}}>
                  <IconF name="arrow-right" size={20} color='#ffffff' style={{alignSelf:"center"}}/>
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


 export default connect(mapStateToProps, mapDispatchToProps)(meals4);
