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
  Modal,
} from 'react-native';
import styles from './style';
import {Badge, Card, CheckBox} from 'react-native-elements';
import Colors from '../../../Theme/Colors'
import { Directions } from 'react-native-gesture-handler';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';


import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import localize from '../../../translation';

import RadioButton from './RadioButtons'
import { set } from 'react-native-reanimated';

const options = [
	{
		key:1,
    text: 'Standard',
    subText:"I'm easy",
   // title: I18nManager.isRTL ? 'المطبخ' : 'Kitchen',

	},
	{
		key:2,
    text: 'Percertain',
    subText:'Vegetarian + seafood',
	},
	{
		key:3,
    text: 'Vega',
    subText:'Most High Pay',
	},
	{
		key: '4',
    text: 'Paleo',
    subText:'Only meat,fish,nuts and veggies',
  },
];

class diet1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalValue:'',
      modalVisible:false,
      beefCheck:false,
      porkCheck:false,
      lambCheck:false,
      poultryCheck:false,
      fishCheck:false,
      shellfishCheck:true,
      dairyCheck:true,
      soyCheck:true,
      eggCheck:true,
      grainsCheck:true,
      sugarCheck:true,
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
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

render()
{
return(

  <View style={styles.container}>
  
 <View style={styles.goal1}>
{/* <Text style={{color: "#000",fontSize:22,marginBottom:20}}>{localize.t('goalWhat')}?</Text> */}
<Text style={{color: "#000",fontSize:28,marginBottom:5,textAlign:'center'}}>What's your diet type?</Text>
<Text style={{ fontSize: 17, color: '#b0bec5',fontWeight:'500',textAlign:'center'  }}>We'all adapt to your exclusions</Text>

   </View>
   <View style={{height:'52%'}}>  
   <RadioButton options={options}  />
   </View>
   <TouchableOpacity 
                   onPress={() => {this.setModalVisible(true)}}
   style={{flexDirection: 'row',
        margin: '3%',
        height:'5%',
        marginLeft:'5%',
        marginRight:'5%',}}>
  <View style={{flexDirection:'column',position:'absolute'}}>
                    <Text style={{color: "#000",
                    fontSize:20,marginBottom:2}}>Custom</Text>

                    <Text style={{ 
                        fontSize: 15, 
                    color: '#b0bec5',
                    fontWeight:'500',alignItems:'center'  }}>Choose the ingredients you can eat</Text>

                            </View>
							<TouchableOpacity
								style={{
                  height: 30,
                  width: 30,
                      position:'absolute',
                      right:0,
                }}
								onPress={() => {
									
								}}
							>
							                  <IconF name="angle-right" size={30} color='grey' style={{position:'absolute',right:15,marginTop:15}}/>
							</TouchableOpacity>
						</TouchableOpacity>
   <View style={{marginTop:'5%',width:'100%'}}>
            <TouchableOpacity
               onPress={() => this.props.navigation.navigate('foods2')}
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


           <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                        <View style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            width: '100%',
            height: '100%',
          }}>
            <View style={{
             backgroundColor: '#fff',
             width: '100%',
             height: '7%',
             flexDirection:'row',
             backgroundColor: 'white',
					shadowOpacity: 0.5,
          borderBottomWidth: 0,
          				elevation: 3,
           }}>
             <TouchableOpacity
                     style={{alignSelf:'center',marginLeft:'5%',}}
                      onPress={() => this.setModalVisible(false)}>
          <IconM name="close" size={28} color='black' />
          </TouchableOpacity>
          <Text style={{color: "#000",
                    fontSize:19,alignSelf:'center',marginLeft:'20%'}}>Choose ingredients</Text>  

            </View>
        
         <ScrollView
         showsVerticalScrollIndicator={false}>
            <View style={{           
               backgroundColor: '#fff',height:'100%',
}}>
            <View style={{flexDirection:'row',margin:'5%'}}>
            <Text style={{color: "#000",
                    fontSize:19,}}>beef</Text>  

              <CheckBox
              containerStyle={{  backgroundColor: 'transparent',
              borderWidth: 0,
              position:'absolute',
              right:0,
              padding: 0,
              margin: 0,
              marginLeft: Responsive.width(20)}}
              onPress={() => this.setState({
                beefCheck: !this.state.beefCheck
              })}
              textStyle={{
                fontSize: 12,
                textAlign: 'left',
                fontWeight: 'normal'
              }}
              checked={this.state.beefCheck}
              checkedColor={'#000'}/>
              </View>
              <View style={{flexDirection:'row',margin:'5%'}}>
            <Text style={{color: "#000",
                    fontSize:19,}}>pork</Text>  

              <CheckBox
              containerStyle={{  backgroundColor: 'transparent',
              borderWidth: 0,
              position:'absolute',
              right:0,
              padding: 0,
              margin: 0,
              marginLeft: Responsive.width(20)}}
              onPress={() => this.setState({
                porkCheck: !this.state.porkCheck
              })}
              textStyle={{
                fontSize: 12,
                textAlign: 'left',
                fontWeight: 'normal'
              }}
              checked={this.state.porkCheck}
              checkedColor={'#000'}/>
              </View>
              <View style={{flexDirection:'row',margin:'5%'}}>
            <Text style={{color: "#000",
                    fontSize:19,}}>lamb</Text>  

              <CheckBox
              containerStyle={{  backgroundColor: 'transparent',
              borderWidth: 0,
              position:'absolute',
              right:0,
              padding: 0,
              margin: 0,
              marginLeft: Responsive.width(20)}}
              onPress={() => this.setState({
                lambCheck: !this.state.lambCheck
              })}
              textStyle={{
                fontSize: 12,
                textAlign: 'left',
                fontWeight: 'normal'
              }}
              checked={this.state.lambCheck}
              checkedColor={'#000'}/>
              </View>
              
              <View style={{flexDirection:'row',margin:'5%'}}>
            <Text style={{color: "#000",
                    fontSize:19,}}>poultry</Text>  

              <CheckBox
              containerStyle={{  backgroundColor: 'transparent',
              borderWidth: 0,
              position:'absolute',
              right:0,
              padding: 0,
              margin: 0,
              marginLeft: Responsive.width(20)}}
              onPress={() => this.setState({
                poultryCheck: !this.state.poultryCheck
              })}
              textStyle={{
                fontSize: 12,
                textAlign: 'left',
                fontWeight: 'normal'
              }}
              checked={this.state.poultryCheck}
              checkedColor={'#000'}/>
              </View>
              
              <View style={{flexDirection:'row',margin:'5%'}}>
            <Text style={{color: "#000",
                    fontSize:19,}}>fish</Text>  

              <CheckBox
              containerStyle={{  backgroundColor: 'transparent',
              borderWidth: 0,
              position:'absolute',
              right:0,
              padding: 0,
              margin: 0,
              marginLeft: Responsive.width(20)}}
              onPress={() => this.setState({
                fishCheck: !this.state.fishCheck
              })}
              textStyle={{
                fontSize: 12,
                textAlign: 'left',
                fontWeight: 'normal'
              }}
              checked={this.state.fishCheck}
              checkedColor={'#000'}/>
              </View>
              
              <View style={{flexDirection:'row',margin:'5%'}}>
            <Text style={{color: "#000",
                    fontSize:19,}}>shellfish</Text>  

              <CheckBox
              containerStyle={{  backgroundColor: 'transparent',
              borderWidth: 0,
              position:'absolute',
              right:0,
              padding: 0,
              margin: 0,
              marginLeft: Responsive.width(20)}}
              onPress={() => this.setState({
                shellfishCheck: !this.state.shellfishCheck
              })}
              textStyle={{
                fontSize: 12,
                textAlign: 'left',
                fontWeight: 'normal'
              }}
              checked={this.state.shellfishCheck}
              checkedColor={'#000'}/>
              </View>
              
              <View style={{flexDirection:'row',margin:'5%'}}>
            <Text style={{color: "#000",
                    fontSize:19,}}>dairy</Text>  

              <CheckBox
              containerStyle={{  backgroundColor: 'transparent',
              borderWidth: 0,
              position:'absolute',
              right:0,
              padding: 0,
              margin: 0,
              marginLeft: Responsive.width(20)}}
              onPress={() => this.setState({
                dairyCheck: !this.state.dairyCheck
              })}
              textStyle={{
                fontSize: 12,
                textAlign: 'left',
                fontWeight: 'normal'
              }}
              checked={this.state.dairyCheck}
              checkedColor={'#000'}/>
              </View>
              
              <View style={{flexDirection:'row',margin:'5%'}}>
            <Text style={{color: "#000",
                    fontSize:19,}}>soy</Text>  

              <CheckBox
              containerStyle={{  backgroundColor: 'transparent',
              borderWidth: 0,
              position:'absolute',
              right:0,
              padding: 0,
              margin: 0,
              marginLeft: Responsive.width(20)}}
              onPress={() => this.setState({
                soyCheck: !this.state.soyCheck
              })}
              textStyle={{
                fontSize: 12,
                textAlign: 'left',
                fontWeight: 'normal'
              }}
              checked={this.state.soyCheck}
              checkedColor={'#000'}/>
              </View>
              
              <View style={{flexDirection:'row',margin:'5%'}}>
            <Text style={{color: "#000",
                    fontSize:19,}}>egg</Text>  

              <CheckBox
              containerStyle={{  backgroundColor: 'transparent',
              borderWidth: 0,
              position:'absolute',
              right:0,
              padding: 0,
              margin: 0,
              marginLeft: Responsive.width(20)}}
              onPress={() => this.setState({
                eggCheck: !this.state.eggCheck
              })}
              textStyle={{
                fontSize: 12,
                textAlign: 'left',
                fontWeight: 'normal'
              }}
              checked={this.state.eggCheck}
              checkedColor={'#000'}/>
              </View>
              
              <View style={{flexDirection:'row',margin:'5%'}}>
            <Text style={{color: "#000",
                    fontSize:19,}}>grains</Text>  

              <CheckBox
              containerStyle={{  backgroundColor: 'transparent',
              borderWidth: 0,
              position:'absolute',
              right:0,
              padding: 0,
              margin: 0,
              marginLeft: Responsive.width(20)}}
              onPress={() => this.setState({
                grainsCheck: !this.state.grainsCheck
              })}
              textStyle={{
                fontSize: 12,
                textAlign: 'left',
                fontWeight: 'normal'
              }}
              checked={this.state.grainsCheck}
              checkedColor={'#000'}/>
              </View>
              
              <View style={{flexDirection:'row',margin:'5%'}}>
            <Text style={{color: "#000",
                    fontSize:19,}}>added sugar</Text>  

              <CheckBox
              containerStyle={{  backgroundColor: 'transparent',
              borderWidth: 0,
              position:'absolute',
              right:0,
              padding: 0,
              margin: 0,
              marginLeft: Responsive.width(20)}}
              onPress={() => this.setState({
                sugarCheck: !this.state.sugarCheck
              })}
              textStyle={{
                fontSize: 12,
                textAlign: 'left',
                fontWeight: 'normal'
              }}
              checked={this.state.sugarCheck}
              checkedColor={'#000'}/>
              </View>
              
              
                
              
              
              
              
            <TouchableOpacity
                      onPress={() => this.setModalVisible(false)}
                      style={{
                        height: Responsive.height(48),
                        width: Responsive.width(124),
                        backgroundColor: Colors.green,
                        borderRadius: 40,
                        justifyContent: 'center',
                        alignSelf:'center',
                        position:'absolute',
                        bottom:'8%',
                      }}>

                      <Text style={{
                        alignSelf:'center',
                        fontSize: Responsive.height(14),
                        color: '#ffffff',
                      }}>Done</Text>
                    </TouchableOpacity>
              
                    </View>
                    </ScrollView>
          </View>

             </Modal>


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


 export default connect(mapStateToProps, mapDispatchToProps)(diet1);
