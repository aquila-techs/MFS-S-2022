import { StyleSheet, Dimensions, Platform } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageContainer: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'#ffffff'
  },
  slider: {
    // marginRight:-100,
    // marginLeft:-100,
    // width:250,
    // paddingBottom:'5%',
    // paddingRight:'-12%',
    // backgroundColor:'red',
    // alignItems:'',
    // justifyContent:'center',
    // alignSelf:'flex-end',
    transform: [
      { rotateZ: '-90deg' },
    ],
  },
  goal1: {
    color: '#000',
    fontSize: 22,
    marginBottom: 20,
  },

  goal2: {
    margin: 10,
    height: 110,
    flexDirection: 'row',
    padding: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    shadowColor: '#D8D8D8',
    shadowOpacity: 1,
    shadowRadius: 5,
    borderRadius: 7,
    elevation: 10,
    shadowOffset: {
      height: 5,
      width: 3,
    },
  },

  goalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    margin:10,
    backgroundColor: '#ffffff',
    shadowColor: '#D8D8D8',
    shadowOffset: {
      height: 5,
      width: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
    borderRadius: 7,
    
   
  },

  recipe: {
    margin: 10,
    flexDirection: 'row',
    padding: 18,
    width: widthPercentageToDP('75'),
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#D8D8D8',
    shadowOpacity: 1,
    shadowRadius: 5,
    borderRadius: 7,
    elevation: 10,
    shadowOffset: {
      height: 5,
      width: 3,
    },
  },
  goal3: {
    width: '15%',
    height: '3%',
    marginLeft: 'auto',
    marginRight: '10%',
    backgroundColor: '#d9d9d9',
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 3,
    },
  },
  goal4: {
    width: '15%',
    height: '10%',
    marginLeft: 'auto',
    marginRight: '10%',
    backgroundColor: '#d9d9d9',
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 3,
    },
  },

  gendermain: {
    flexDirection: 'row',
  },
  gender: {
    marginHorizontal: 10,
    margin: 8,
    height: 120,
    width: 120,
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#ffffff',
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
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  TextInputStyle: {
    textAlign: 'center',
    height: '100%',
    color: '#000',
    // borderRadius: 10,
    // borderWidth: 2,
    flex: 1,
    fontSize: 80,
    // borderColor: '#009688',
  },
  heightTextInputStyle: {
    textAlign: 'center',
    height: '100%',
    color: '#000',
    marginLeft: '5%',
    // borderRadius: 10,
    // borderWidth: 2,
    fontSize: 60,
    // borderColor: '#009688',
  },
  headerSideText: {
    textAlign: 'center',
    marginTop: 'auto',
  },
  weightTextInputStyle: {
    textAlign: 'center',
    height: 60,
    color: '#000',
    // borderRadius: 10,
    // borderWidth: 2,
    flex: 1,
    fontSize: 50,
    // borderColor: '#009688',
  },
  targetWeightTextInputStyle: {
    textAlign: 'center',
    height: 60,
    color: '#000',
    // borderRadius: 10,
    // borderWidth: 2,
    flex: 1,
    fontSize: 50,
    // borderColor: '#009688',
  },
  heightbuttons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D8D8D8',
  },
  borderRadiusLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  borderRadiusRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  selectedbutton: {
    backgroundColor: '#fff',
  },
  snapsliderContainer: {
    color: '#fff',
  },
  snapslider: {},
  snapsliderItemWrapper: {},
  snapsliderItem: {
    color: '#9E9F9D',
    fontSize: 12,
  },
  carouselContainer: {
    height: 200,
  },
  carousel: {
    flex: 1,
  },
});

export default styles;
