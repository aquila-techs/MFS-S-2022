import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({


    container: {
        width:'100%',
        height:'100%',
        backgroundColor:'#ffffff',
        // flexDirection: 'column'
        },
        ageContainer: {
          justifyContent:'center',
          flex: 1,
          flexDirection: 'column',
          },
      
    goal1:{
        color: "#000",
        fontSize:22,
        marginBottom:'8%', 
        marginTop:'15%',
        alignItems:'center',
        textAlign:'center',
      },
      goalPlan:{
        color: "#000",
        fontSize:22,
        marginBottom:'4%', 
        marginTop:'15%',
        alignItems:'center',
        textAlign:'center',
      },
      
    goal2:{
       margin:10,
       marginLeft:10,
       marginRight:10,
       padding:18,
       width:'90%',
       backgroundColor:'#ffffff',
       shadowColor: '#D8D8D8',
       shadowOpacity: 1,
       shadowRadius: 5,
       borderRadius:7,
       elevation:10,
       shadowOffset: {
       height: 5,
       width: 3
    }
      },
      goal3:{
        width:'15%',
        height:'3%',
        marginLeft: 'auto',
        marginRight: '10%',
        backgroundColor:'#d9d9d9',
        shadowColor: "#000000",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
        height: 5,
        width: 3
     }
       },
       goal4:{
        width:'15%',
        height:'10%',
        marginLeft: 'auto',
        marginRight: '10%',
        backgroundColor:'#d9d9d9',
        shadowColor: "#000000",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
        height: 5,
        width: 3
     }
       },

      
      gendermain:{
flexDirection: "row"

      },
     gender:{
       marginHorizontal:10,
       margin:8,
       height:120, 
       width:120,
       alignItems:"center",
       padding:8,
       backgroundColor:'#ffffff',
       shadowColor: '#D8D8D8',
       shadowOpacity: 1,
       shadowRadius: 5,
       borderRadius:7,
       elevation:10,
       borderStyle:"solid",
       borderWidth:1,
       borderColor:'#D8D8D8',
       shadowOffset: {
       height: 4,
       width: 3
     }},
     headerText: {  
      fontSize: 20,  
      textAlign: "center",  
      margin: 10,  
      fontWeight: "bold"  
  },  
  TextInputStyle: {  
      textAlign: 'center',  
      height: '100%',  
      color:'#000',
      // borderRadius: 10,  
      // borderWidth: 2,  
      flex:1,
      fontSize:80,
      // borderColor: '#009688',  
  },
  heightTextInputStyle: {  
    textAlign: 'center',  
    height: '100%',  
    color:'#000',
    marginLeft:'5%',
    // borderRadius: 10,  
    // borderWidth: 2,  
    fontSize:60,
    // borderColor: '#009688',  
},
headerSideText:{
  textAlign: 'center',  
  marginTop:'auto',
},
weightTextInputStyle: {  
  textAlign: 'center',  
  height: 60,  
  color:'#000',
  // borderRadius: 10,  
  // borderWidth: 2,  
  flex:1,
  fontSize:50,
  // borderColor: '#009688',  
},
targetWeightTextInputStyle:{  
  textAlign: 'center',  
  height: 60,  
  color:'#000',
  // borderRadius: 10,  
  // borderWidth: 2,  
  flex:1,
  fontSize:50,
  // borderColor: '#009688',  
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
  snapsliderContainer: {
    color:'#fff'
  },
  snapslider: {
  },
  snapsliderItemWrapper: {
  },
  snapsliderItem: {
    color:"#9E9F9D",
    fontSize:12,
  },
  carouselContainer: {
    height:200,
},
    carousel: {
          flex:1
},
keywordItem:{
  marginLeft:'8%',
  marginRight:'8%',
  flexDirection: 'row',
justifyContent: 'center',
alignItems: 'flex-start',
flexWrap: 'wrap'
},
keywordType:{
  width:'82%',
  flexDirection: 'row',
                   margin:'1.5%',
                justifyContent:'center',
                alignItems:'center',
                alignSelf:'center',
                flexWrap: 'wrap',
                backgroundColor:'#ffffff',
                shadowColor: '#D8D8D8',
                shadowOpacity: 1,
                shadowRadius: 5,
                borderRadius:7,
                elevation:2,
                borderStyle:"solid",
                borderWidth:1,
                borderColor:'#D8D8D8',
                shadowOffset: {
                height: 4,
                width: 3
              }
            },
  keywordText:{
    fontSize: 14,
    color: '#000',
    color:'#000',
    padding: 8,
    marginLeft:Responsive.width(5),
    marginRight:Responsive.width(5),
},

});

export default styles;