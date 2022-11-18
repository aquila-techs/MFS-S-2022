import { StyleSheet, Dimensions, Platform } from 'react-native';
 import Responsive from 'react-native-lightweight-responsive';
 import Colors from '../../../Theme/Colors'

const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  mainLayout:{
    flex: 1,
    backgroundColor:'#ffffff',
    flexDirection: 'column'
  },
	headerStyle: {
		marginTop: '20%',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  headerText:{
    marginLeft:10,
    color: "#000",
    fontSize:22,
    fontWeight:"400",
  },
  feedText:{
    marginLeft:Responsive.width(20),
    marginTop:Responsive.height(20),
    color: "#000",
    fontSize:20,
    fontWeight:"400",
  },
  itemShortText:{
    marginLeft:Responsive.width(20),
    marginTop:Responsive.height(20),
    color: "#000",
    fontSize:20,
    fontWeight:"400",
  },
  feedTitleText:{
    marginTop:Responsive.height(10),
    color: "#000",
    fontSize:16,
    fontWeight:"300",
  },
  feedSubTitleText:{
    marginTop:Responsive.height(2),
    color:'#9E9F9D',
    fontSize:14,
    marginBottom:10, 
    fontWeight:"300",
  },
  feedReadTimeText:{
    marginTop:Responsive.height(5),
    color:'#9E9F9D',
    fontSize:15,
    marginBottom:10, 
    fontWeight:"300",
  },
  headerGoalStyle: {
		marginTop: '4%',
  },
  headerGoalText:{
    flexDirection:'row',
    marginLeft:10,
    color: "#000",
    fontSize:20,
    marginBottom:Responsive.height(5), 
    fontWeight:"500",
  },

  headerOverViewText:{
    marginLeft:'auto',
    marginRight:Responsive.width(20),
    color:'#9E9F9D',
    fontSize:15,
    marginBottom:10, 
    fontWeight:"500",
  },
  todayTrackingView:{
    padding:10,
    width:'90%',
    marginHorizontal:20,
       backgroundColor:'#ffffff',
       shadowColor: '#D8D8D8',
       shadowOpacity: 1,
       shadowRadius: 2,
       borderRadius:7,
       elevation:5,
       borderStyle:"solid",
       borderWidth:1,
       borderColor:'#D8D8D8',
       shadowOffset: {
       height: 2,
       width: 1
 }
   },
   trackOneStyle: {
		marginTop: '4%',
  },
  trackOneText:{
    flexDirection:'row',
    marginLeft:10,
    color: "#000",
    fontSize:17,
    marginBottom:3, 
    fontWeight:"400",
  },
  trackOneStartText:{
    marginLeft:'auto',
    marginRight:Responsive.width(5),
    color:'#000',
    fontSize:18,
    marginBottom:3, 
    fontWeight:"600",

  },
  trackOneStartButtonText:{
    color:'#fff',
    fontSize:12,
    fontWeight:"300",
    padding: 2
  },
  trackOneStartButton:{

      marginLeft:'auto',
      marginRight:Responsive.width(5),
      height: Responsive.height(18),
      padding: 2,
      paddingLeft:Responsive.width(10),
      paddingRight:Responsive.width(10),
      backgroundColor: Colors.green,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: Responsive.height(10)
  },
  shortText:{
    marginLeft:Responsive.width(10),
    marginTop:Responsive.height(20),
    color: "#000",
    fontSize:20,
    fontWeight:"400",
  },
  viewAllText:{
    marginTop:Responsive.height(20),
    marginLeft:'auto',
    marginRight:Responsive.width(20),
    color:'#9E9F9D',
    fontSize:15,
    fontWeight:"500",
  },
  feedsView:{
  },
  feedStyle:{
    width:'100%',
    height:Responsive.height(180),
       backgroundColor:'#ffffff',
       shadowColor: '#D8D8D8',
       shadowOpacity: 1,
       shadowRadius: 2,
       borderRadius:7,
       elevation:5,
       borderColor:'#D8D8D8',
       shadowOffset: {
       height: 2,
       width: 1
       }
  },
  itemShortImage:{
    marginTop:Responsive.height(10),
    width:'90%',
    height:Responsive.height(150),
    marginHorizontal:20,
       backgroundColor:'#ffffff',
       shadowColor: '#D8D8D8',
       shadowOpacity: 1,
       shadowRadius: 2,
       borderRadius:12,
       elevation:5,
       borderColor:'#D8D8D8',
       shadowOffset: {
       height: 2,
       width: 1
       }
  },
  weeklyImage:{
    marginTop:Responsive.height(10),
    width:'90%',
    height:Responsive.height(150),
    marginHorizontal:20,
       shadowColor: '#D8D8D8',
       shadowOpacity: 1,
       shadowRadius: 2,
       borderRadius:7,
       elevation:5,
       borderColor:'#D8D8D8',
       shadowOffset: {
       height: 2,
       width: 1
       }
  },
	shadow: {
        shadowColor: '#ccc',
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
        height: 5,
        width: 2,
        },
        elevation: 3
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
        zIndex: 999
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
        paddingBottom: 40
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
        zIndex: 1
      }
});

