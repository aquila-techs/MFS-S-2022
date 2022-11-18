import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
	mainViewStyle: {
		flex: 1,
		backgroundColor: '#fff',
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
      },
      heightbuttons:{
    
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 40,
           backgroundColor:'transparent',
           borderWidth:1,
           borderColor:'#D8D8D8',
          
           
      }, 
      gendermain:{
        flexDirection: "row"
        
              },
      borderRadiusLeft:{
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
         },
         borderRadiusRight:{
           borderTopRightRadius:20,
           borderBottomRightRadius:20,
         },
         selectedbutton:{
           backgroundColor:'#fff'
         },
});

