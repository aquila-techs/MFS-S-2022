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
  PixelRatio

} from 'react-native';

import renderIf from 'render-if';
import styles from './Styles';
import Colors from '../../../Theme/Colors'
import { Directions, ScrollView } from 'react-native-gesture-handler';
import IconM from 'react-native-vector-icons/MaterialIcons';

import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import localize from '../../../translation';
import Responsive from 'react-native-lightweight-responsive';



class StartedMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore:false,
    }
  }
  

 

render()
{
return(

  <View style={styles.container}>
  
 <View style={styles.goal1}>
 <Image
source={require('../../../Assets/Images/startedMeal.png')}
style={{height:Responsive.height(120),width:'70%',marginTop:'10%',marginBottom:'5%'}}
        />
{/* <Text style={{color: "#000",fontSize:22,marginBottom:20}}>{localize.t('goalWhat')}?</Text> */}
<Text style={{color: "#000",fontSize:24,marginBottom:5,textAlign:'center'}}>Get Started</Text>
  
<View style={{flexDirection:'row',marginTop:'5%',margin:'1%'}}>
<IconM name="check" size={30} color={Colors.green} />
<Text style={{color: "#000",fontSize:18,textAlign:'center',marginLeft:'2%'}}>Hundreds of recipes</Text>

</View>
<View style={{flexDirection:'row',marginTop:'2%',margin:'1%'}}>
<IconM name="check" size={30} color={Colors.green} />
<Text style={{color: "#000",fontSize:18,textAlign:'center',marginLeft:'2%'}}>Hundreds of recipes</Text>

</View>
<View style={{flexDirection:'row',marginTop:'2%',margin:'1%'}}>
<IconM name="check" size={30} color={Colors.green} />
<Text style={{color: "#000",fontSize:18,textAlign:'center',marginLeft:'2%'}}>Hundreds of recipes</Text>

</View>
<View style={{flexDirection:'row',marginTop:'2%',margin:'1%'}}>
<IconM name="check" size={30} color={Colors.green} />
<Text style={{color: "#000",fontSize:18,textAlign:'center',marginLeft:'2%'}}>Hundreds of recipes</Text>

</View>

   </View>
  

   
                <View style={{justifyContent:'center',alignItems:'center',top:'5%',}}>
			<TouchableOpacity onPress={() => (this.props.navigation.navigate('PackageMeal'))}
							style={{
								backgroundColor:Colors.green,
								width: '55%', height: '29%', borderRadius: 40, borderWidth: 1,
								borderColor: '#64dd17', alignItems: 'center',
								justifyContent: 'center'
							}}>
							<Text style={{ fontSize: 17, color: 'white' }}>Get your meal plan</Text>
						</TouchableOpacity>
						</View>

</View>
)
}
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


 export default connect(mapStateToProps, mapDispatchToProps)(StartedMeal);
