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
import IconF from 'react-native-vector-icons/FontAwesome';

import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import localize from '../../../translation';
import Responsive from 'react-native-lightweight-responsive';



class PlanMeal extends Component {
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
{/* <Text style={{color: "#000",fontSize:22,marginBottom:20}}>{localize.t('goalWhat')}?</Text> */}
<Text style={{color: "#000",fontSize:26,marginBottom:5,textAlign:'center'}}>Your meal plan is ready</Text>
   </View>
  

   <View style={styles.keywordType}>
   <Image
source={require('../../../Assets/Images/mealBlog.png')}
style={{height:Responsive.height(260),width:'100%'}}
        />
   

                  <Text style={{color: "#000",fontSize:24,marginTop:'4%',textAlign:'center',}}>Standard diet</Text>
                  <Text style={{ fontSize: 17, color: '#b0bec5',fontWeight:'500',textAlign:'center',width:'80%',marginBottom:'5%',  }}>3 meals and a snack (best) . Medium variety</Text>

                </View>
        
                <View style={{justifyContent:'center',alignItems:'center',bottom:'3%',}}>
			<TouchableOpacity onPress={() => (this.props.navigation.navigate('StartedMeal'))}
							style={{
								backgroundColor:Colors.green,
								width: '45%', height: '28%', borderRadius: 40, borderWidth: 1,
								borderColor: '#64dd17', alignItems: 'center',
								justifyContent: 'center'
							}}>
							<Text style={{ fontSize: 17, color: 'white' }}>Take a look</Text>
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


 export default connect(mapStateToProps, mapDispatchToProps)(PlanMeal);
