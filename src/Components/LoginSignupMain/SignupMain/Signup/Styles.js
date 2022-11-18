import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../Theme/Colors'
const { height, width: WIDTH } = Dimensions.get('window');
const styles = StyleSheet.create({
	mainViewStyle: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: "white",
	},
	firstInput: {
		width: WIDTH - 60,
		marginTop: 0,
		marginHorizontal: 0,
		backgroundColor: '#ffffff',
		borderRadius: 5,
		padding: 5,
		alignSelf: 'center',
		borderWidth: 1,
		borderColor: "#eeeeee",
		flexDirection: 'row'
	},
	input: {
		width: WIDTH - 110,
		height: 42,
		padding: 10,
		marginBottom: 0,
		backgroundColor: 'transparent',
		color: '#000000',
		fontSize: 16
	},
});

export default styles;
