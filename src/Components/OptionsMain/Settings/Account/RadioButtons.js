import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../../../Theme/Colors'

export default class RadioButtons extends Component {
	state = {
		value:1,
		v:0
	};

	changeValue = async (val)=>{

		
										
			this.setState({
				value: val,
			});	
		
	
		this.props.tag(val);
		
	
	  }
	render() {
		const { options } = this.props;
		const { value } = this.state;

		return (
			<View>
				{options.map(item => {
					return (
						<View key={item.key} style={styles.buttonContainer}>
                            <View style={{position:'absolute',left:'7%'}}>
                    <Text style={{color: "#000",
                    fontSize:18}}>{item.text}</Text>
                    {/* <Text style={{ 
                        fontSize: 15, 
                    color: '#b0bec5',
                    fontWeight:'500',alignItems:'center'  }}>{item.subText}</Text> */}

                            </View>
							<View style={{position:'absolute',right:'10%',alignContent:'center',
						alignItems:'center',alignContent:'center',justifyContent:'center'}}>
							<TouchableOpacity
								style={styles.circle}
								onPress={() => this.changeValue(item.key) 
								}
							>
								{value === item.key && <View style={styles.checkedCircle} />}
							</TouchableOpacity>
							</View>
						</View>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
        height:'22%',
		backgroundColor: '#fff',width: '100%',alignSelf:'center',
	   alignItems:'center',marginBottom:'.7%',alignContent:'center',
 shadowOpacity:Platform.OS=='ios'?0:0.3,elevation: 0.3,
	},

	circle: {
		height: 20,
		width: 20,
		borderRadius: 10,
        borderWidth: 1,
        position:'absolute',
		borderColor: '#ACACAC',
		alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
	},
  
	checkedCircle: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: Colors.green,
	},
});
