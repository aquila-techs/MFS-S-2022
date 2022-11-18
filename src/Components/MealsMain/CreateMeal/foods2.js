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
import styles from './style';
import Colors from '../../../Theme/Colors'
import { Directions, ScrollView } from 'react-native-gesture-handler';
import IconF from 'react-native-vector-icons/FontAwesome';

import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import localize from '../../../translation';
import ingredients from './ingredients';



class foods2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore:false,
    }
  }
  normalize(size) {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }
  getSize() {
    return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    }
  }


  submit(data) {
  
      //alert(data)
      const _this = this;

      _this.props.setGenderAction(data).then((status) => {
        
          this.setState({
          }, () => {
            if (status.status) {
            //  alert(JSON.stringify(this.props.updateGender))
              this.props.navigation.navigate('recipes3')
            } 
          })
        })
    
  }

render()
{
return(

  <View style={styles.container}>
  
 <View style={styles.goal1}>
{/* <Text style={{color: "#000",fontSize:22,marginBottom:20}}>{localize.t('goalWhat')}?</Text> */}
<Text style={{color: "#000",fontSize:28,marginBottom:5,textAlign:'center'}}>Foods you dislike</Text>
<Text style={{ fontSize: 17, color: '#b0bec5',fontWeight:'500',textAlign:'center',width:'80%'  }}>Cross out the ingredients you'd prefer to not to see in your plan</Text>
   </View>
   {renderIf(!this.state.showMore)(
     
    <View style={styles.keywordItem}>
              {ingredients.keywords.map(keyword => (
                <View key={keyword} style={styles.keywordType}>
                  <Text style={styles.keywordText}>{keyword}</Text>
                </View>
              ))}
              <View style={{marginTop:'30%',width:'100%',alignSelf:'center'}}>
                <TouchableOpacity
                  onPress={() => this.setState({showMore:true}) }      
                       >
             <Text style={{ fontSize: 15, color:Colors.green,fontWeight:'700',textAlign:'center',width:'100%'  }}>SHOW MORE</Text>
             </TouchableOpacity>
                  </View> 
              </View>
        
   )}

   {renderIf(this.state.showMore)(
   <ScrollView
   showsVerticalScrollIndicator={false}>
     <View style={{ height:'200%',width:'100%',marginTop:'1%',marginBottom:'1%',}}>
<View style={styles.keywordItem}>
              {ingredients.keywords.map(keyword => (
                <View key={keyword} style={styles.keywordType}>
                  <Text style={styles.keywordText}>{keyword}</Text>
                </View>
              ))}
               {ingredients.keywords.map(keyword => (
                <View key={keyword} style={styles.keywordType}>
                  <Text style={styles.keywordText}>{keyword}</Text>
                </View>
              ))}
              {ingredients.keywords.map(keyword => (
                <View key={keyword} style={styles.keywordType}>
                  <Text style={styles.keywordText}>{keyword}</Text>
                </View>
              ))}
              {ingredients.keywords.map(keyword => (
                <View key={keyword} style={styles.keywordType}>
                  <Text style={styles.keywordText}>{keyword}</Text>
                </View>
              ))}
            </View>
            </View>
            </ScrollView>
   )}
          
            <View style={{marginTop:'15%',width:'100%',position:'absolute',bottom:'5%',}}>
            <TouchableOpacity
               onPress={() => this.props.navigation.navigate('recipes3')}
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
   updateGender:state.UPDATE_GENDER.updateGender,
		// routeName: state.ROUTE_NAME.routeName,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}


 export default connect(mapStateToProps, mapDispatchToProps)(foods2);
