import { StyleSheet, Dimensions, Platform } from 'react-native';
import Responsive from 'react-native-lightweight-responsive';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  mainViewStyle: {
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'column',
  },
  gender: {
    marginHorizontal: 10,
    margin: 8,
    height: Responsive.height(90),
    width: '44%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 8,
    backgroundColor: '#fff',
    shadowColor: '#D8D8D8',
    shadowOpacity: 1,
    shadowRadius: 5,
    borderRadius: 7,
    elevation: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    shadowOffset: {
      height: 4,
      width: 3,
    },
  },
  customMeal: {
    marginHorizontal: 10,
    height: hp('7%'),
    width: '94.5%',
    margin: hp('1%'),
    // backgroundColor:'red',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
  },
  custom2Meal: {
    marginHorizontal: 5,
    height: hp('11%'),
    width: '97%',
    top: 7,
  },
  shadow: {
    shadowColor: '#ccc',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 5,
      width: 2,
    },
    elevation: 3,
  },
  button: {
    backgroundColor: '#B76EC6',
    opacity: 1,
    borderRadius: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    zIndex: 999,
  },
  bubble: {
    flex: 1,
    flexWrap: 'wrap',

    backgroundColor: '#fff',

    width: 200,
    borderRadius: 3,
    borderColor: '#ccc',
    borderWidth: 0.5,
  },

  address: {
    color: '#9B9B9B',
    fontSize: 14,
  },
  hours: {
    color: '#4A4A4A',
    fontSize: 14,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: '#fff',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#ccc',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  panel: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  panelHeader: {
    height: 50,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1,
  },
});
