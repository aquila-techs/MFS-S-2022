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
  StatusBar

} from 'react-native';
import Colors from '../../Theme/Colors';
import IconF from 'react-native-vector-icons/FontAwesome5';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Responsive from 'react-native-lightweight-responsive';


import { ActionCreators } from '../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Splash2 extends Component {

  normalize(size) {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }

  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    return (

     
    <ImageBackground source={require('../../../src/Assets/splash-bg.jpg')} style={styles.container}>
       
       {Platform.OS === 'ios' ?
    <StatusBar backgroundColor='transparent' barStyle='light-content'/>
    :
    null
       }
    
       
        <View style={{justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>

        {/* <Image style={styles.logoImage}  
        source={require('../../../src/Assets/splash-bg.jpg')} 
        resizeMode='contain'/>  */}
        <View style={{width:'100%',alignContent: 'center', justifyContent: 'center'}}>
            <Image 
            source={require("./../../Assets/Images/logo.png")}
            style={{ width:'100%',height:'35%'}}
             /> 
					</View>
        {/* <Text style={styles.btnText}>Di Lorenzo Nutrition App</Text> */}

        </View>

        
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} 
        onPress={()=>alert(this.props.checkValueTest)}>
        <Text style={styles.loginText} >START2</Text>
        </TouchableOpacity>
        
      </ImageBackground>
      


      
    )

  }
}

function mapStateToProps(state) {
    return {
        checkValueTest:state.UPDATE_GOAL.checkValueTest
     
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
  }
  
  
   export default connect(mapStateToProps, mapDispatchToProps)(Splash2);

const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },

  logoImage: {
    height : '10%' 
  },

  btnText: {
    color:'white',
    padding: 20,
    marginBottom: 160,
    fontSize:18,
    fontWeight:'700',
    textTransform:"uppercase"
    
  
  },

   buttonContainer: {
    height:Responsive.height(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:Responsive.width(300),
    borderRadius:5,
    backgroundColor:'transparent',
    marginBottom:Responsive.height(200)
   },
  
  loginButton: {
    backgroundColor:Colors.green,
    shadowColor: "#808080",
    shadowOffset: {
    width: 0,
    height: 9,
    },

    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 19,
  },
  loginText: {
    color: 'white',
    fontSize:20,
    fontWeight:'700'
  }
  
}); 