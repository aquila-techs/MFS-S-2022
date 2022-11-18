import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  RefreshControl,
  Platform,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
  StatusBar,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import {styles} from './Styles';
import IconF from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import {API_URL, SERVER_URL} from '../../../Actions';
import {ActionCreators} from '../../../Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import tvShowContent from '../../../Assets/todayDetailContent';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ImageResizer from 'react-native-image-resizer';
import Modal from 'react-native-modal';
let deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
import _ from 'lodash';
import Colors from '../../../Theme/Colors';
import Responsive from 'react-native-lightweight-responsive';
import IconA from 'react-native-vector-icons/AntDesign';

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

function ListItem({item , Engchecked}) {
  return (
    <View
      style={{
        marginVertical: 10,
        marginRight: Responsive.width(10),
        width: '95%',
        borderRadius: 20,
        height:
          Platform.OS === 'IOS'
            ? Responsive.height(236)
            : Responsive.height(236),
      }}>
      <ImageBackground
        // source={{uri: SERVER_URL + item?.featureImage?.l}}
        source={
          item?.featureImage === undefined || item?.featureImage === null
            ? require('../../../Assets/Images/meal1.png')
            : {uri: SERVER_URL + item?.featureImage?.l}
        }
        style={styles.feedStyle}
      />
      <Text style={styles.feedTitleText}>{Engchecked? item.nameEn : item.nameNl }</Text>
      <Text style={styles.feedSubTitleText}>{item.mealType[0]}</Text>
    </View>
  );
}
class RecipesListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainLoader: false,
      Engchecked:false,
      recipesList:props.route?.params?.recipesList,
      scrollY: new Animated.Value(
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
    };
  }
  componentDidMount() {
    if (this.props?.languageget === 'en') {
      this.setState({
        Engchecked:true
      })
    } else {
      this.setState({
        Engchecked:false
      })
    }
    //alert(JSON.stringify(this.props.route.params.recipesCategory))
    // this.submit();
  }
  render() {
    const {params} = this.props.route;
    const {Engchecked} = this.state
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar hidden={false} />
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            height: '7.5%',
            flexDirection: 'row',
            marginTop: Platform.OS === 'android' ? 0 : '5%',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            shadowOpacity: Platform.OS === 'android' ? 0.5 : 0,
            borderBottomWidth: 0,
            elevation: 3,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{position: 'absolute', left: '5%', padding: 5}}>
            <IconA name="arrowleft" size={25} color="black" />
          </TouchableOpacity>

          <Text
            style={{
              color: '#000',
              fontSize: 18,
              alignSelf: 'center',
            }}>
            {params.recipesCategory}
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', right: '5%', padding: 5}}>
            <IconF name="search" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {this.state.mainLoader ? (
          <View
            style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainLayout}>
              <View style={{flex: 1, marginBottom: '7%'}}>
                <View style={styles.headerGoalText}>
                  <Text
                    style={{
                      marginTop: Responsive.height(20),
                      marginRight: 'auto',
                      marginLeft: Responsive.width(20),
                      color: '#9E9F9D',
                      fontSize: 13,
                      fontWeight: '500',
                    }}>
                    {this.state.recipesList.length > 0
                      ? this.state.recipesList.length
                      : 0}{' '}
                    recipes
                  </Text>
                </View>
                <View style={{marginLeft: 20}}>
                  <FlatList
                    scrollEnabled={true}
                    ItemSeparatorComponent={() => (
                      <View
                        style={{
                          borderColor: '#707070',
                          opacity: 0.2,
                          alignSelf: 'center',
                        }}
                      />
                    )}
                    data={this.state.recipesList}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('RecipesDetail', {
                            blogItem: item,
                            RecipieCheck: 'Disabled',
                          })
                        }>
                        <ListItem item={item} Engchecked={Engchecked} />
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => item + index.toString()}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    blogsList: state.BLOG_LIST_SHOW.blogsList,
    recipesList: state.RECIPES_LIST_SHOW.recipesList,
    token: state.SESSION_KEY.sessionKey,
    languageget: state.LANGUAGE_TRANSLATE.languageget,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipesListView);
