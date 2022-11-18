import React, { Component } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from "../../../../translation";
import { styles } from './Styles';
import IconF from 'react-native-vector-icons/FontAwesome5';
import { API_URL, SERVER_URL } from '../../../Actions';
import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

let deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
import _ from 'lodash';
import Colors from '../../../Theme/Colors';
import Responsive from 'react-native-lightweight-responsive';
import IconA from 'react-native-vector-icons/AntDesign';

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


function ListItemPopular({ item }) {
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
        source={{ uri: SERVER_URL + item?.featureImage?.l }}
        style={styles.feedStyle}
      />
      <Text style={styles.feedTitleText}>{i18n.locale == undefined || i18n.locale == 'nl' ? item.titleDutch : item.title}</Text>
      <Text style={styles.feedSubTitleText}>{item.slug}</Text>
    </View>
  );
}
class BlogListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.blogsList,
      categories: [],
      i: 1000,
      scrollY: new Animated.Value(
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
    };
  }

  componentDidMount() {
    this.setState({
      postsCopy: this.props.blogsList
    })
    this.getArticleCategories()
  }

  getArticleCategories = async () => {
    const TOKEN = await AsyncStorage.getItem("PROFILETOKEN");

    fetch(`${API_URL}/categories/get`, {

      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': `${TOKEN}`
      }
    }).then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          categories: responseJson.data
        })

      })
      .catch((error) => {
        console.log(error)
      })
  }

  filterRecipes(name) {
    const posts = this.props.blogsList
    var snackArray = posts.filter((item, index) => {

      return item?.categories?.find((recipe) => recipe.name === name);

    });

    this.setState({
      posts: snackArray
    })
  }

  render() {
    const { params } = this.props.route;
    const { i } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar hidden={false} />
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            height: '7.5%',
            flexDirection: 'row',
            backgroundColor: 'white',
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
            style={{ position: 'absolute', left: '5%', padding: 5 }}>
            <IconA name="arrowleft" size={25} color="black" />
          </TouchableOpacity>

          <Text style={{ color: '#000', fontSize: 18, alignSelf: 'center' }}>
            Blogs
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginLeft: 5,
            color: "#000",
            fontSize: 20,
            marginBottom: 10,
            fontWeight: "500",
            flexWrap: "wrap",
            marginTop: 20,
            paddingLeft: 10
          }}
        >
          <ScrollView horizontal>
            {this.state.categories.map((keyword, index) => (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    i: index
                  })
                  this.filterRecipes(keyword.slug)
                }}
              >
                <View style={{ marginBottom: 10 }} key={keyword}>
                  <Text style={[styles.caleorie, {
                    backgroundColor: i === index ? Colors.green : 'white',
                    color: i === index ? 'white' : 'black'
                  }]}>{i18n.locale == undefined || i18n.locale == 'nl' ? keyword.nameDutch : keyword.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>


        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainLayout}>
            <View style={{ flex: 1, marginBottom: '7%' }}>
              <View style={{ marginLeft: 20 }}>
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
                  data={this.state.posts}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('TodayDetail', {
                          blogItem: item,
                        })
                      }>
                      <ListItemPopular item={item} />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => item + index.toString()}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    blogsList: state.BLOG_LIST_SHOW.blogsList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogListView);
