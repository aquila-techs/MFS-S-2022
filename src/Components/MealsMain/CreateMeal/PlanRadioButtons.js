import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../../Theme/Colors'

export default class PlanRadioButtons extends Component {
	state = {
		value:1,
		v:0
	};

	render() {
		const { options } = this.props;
		const { value } = this.state;

		return (
			<View>
				{options.map(item => {
					return (
						<View key={item.key} style={styles.buttonContainer}>
                            <View style={{flexDirection:'column',position:'absolute'}}>
                    <Text style={{color: "#000",
                    fontSize:20,marginBottom:2}}>{item.text}</Text>
                
                            </View>
							<TouchableOpacity
								style={styles.circle}
								onPress={() => {
									this.setState({
										value: item.key,
									});
								}}
							>
								{value === item.key && <View style={styles.checkedCircle} />}
							</TouchableOpacity>
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
        margin: '3.5%',
        height:'8%',
        marginLeft:'5%',
        marginRight:'5%',
	},

	circle: {
		height: 20,
		width: 20,
		borderRadius: 10,
        borderWidth: 1,
        position:'absolute',
        right:10,
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
