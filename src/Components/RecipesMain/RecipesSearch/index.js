import React, { Component } from "react";
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
} from "react-native";
import { styles } from "./Styles";
import IconF from "react-native-vector-icons/FontAwesome";
import IconF5 from "react-native-vector-icons/FontAwesome5";
import IconM from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { API_URL, SERVER_URL } from "../../../Actions";
import { ActionCreators } from "../../../Actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import tvShowContent from "../../../Assets/todayDetailContent";
import { SearchBar } from "react-native-elements";

import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import ImageResizer from "react-native-image-resizer";
import Modal from "react-native-modal";
let deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;
import _ from "lodash";
import i18n from "../../../../translation";
import Colors from "../../../Theme/Colors";
import Responsive from "react-native-lightweight-responsive";
import renderIf from "render-if";

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const DATA = [
  {
    id: "1",
    title: "Sleep meditation",
    subTitle: "5-13 minutes",
    driver_cut: "12",
    image: require("./../../../Assets/Images/todayImage-1.png"),
  },
  {
    id: "2",
    title: "Sleep meditation",
    subTitle: "5-13 minutes",
    driver_cut: "20",
    image: require("./../../../Assets/Images/todayImage-1.png"),
  },
];
const workOutCategories = [
  { name: "BOXING" },
  { name: "HIIT" },
  { name: "YOGA" },
  { name: "PILATES" },
  { name: "STRETCH" },
  { name: "STRENGTH" },
];


class RecipesSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      UserRecipe: "",
      searchView: false,
      recipesList: props?.route?.params?.list,
      recipesListcopy: props?.route?.params?.list,
      filteredRecipesList: [],
      recipesSnack: [],
      i: 0,
      recipesBreakfast: [],
      recipesLunch: [],
      recipesDinner: [],
      recipesSearch: [
        { id: 1, type: i18n.t('BREAKFAST'), searchType: "Breakfast", active: false },
        { id: 2, type: i18n.t('LUNCH'), searchType: "lunch", active: false },
        { id: 3, type: i18n.t('DINNER'), searchType: "Dinner", active: false },
        { id: 4, type: i18n.t('SNACKS'), searchType: "Snack", active: false },

        //	'LUNCH & DINNER',
        // 'SNACK',
        // 'ENERGY BOOSTER',
        // 'FAMILY FRIENDLY',
        // 'LOW CHOLESTEROL',
        // 'MEAL PREP',
      ],
      scrollY: new Animated.Value(
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
    };
  }

  saveRecipeType = async () => {
    const recipe = await AsyncStorage.getItem('UserRecipe');
    this.setState({ UserRecipe: recipe == null ? 'null' : recipe })
  }

  componentDidMount = async () => {

    const recipe = await AsyncStorage.getItem('UserRecipe');
    this.setState({ UserRecipe: recipe == null ? 'null' : recipe })

    const { navigation } = this.props;
    const unsubscribe = navigation.addListener('focus', () => {
      this.saveRecipeType()
    });

    //this.submit();
    this.filterRecipes("Breakfast");
  }

  filterRecipes(search) {
    const { recipesListcopy } = this.state

    var snackArray = recipesListcopy.filter((addedItem, index) => {

      if (addedItem?.recipeType?.length > 0) {
        return addedItem?.recipeType?.find((recipe) => recipe === search);
      }
    });
    this.setState({
      recipesList: snackArray
    })
  }

  submit() {
    const _this = this;

    this.setState(
      {
        //signinLoader: true
      },
      () => {
        var data = {
          mealType: this.props.updaterecipe
        };
        _this.props.getRecipesList(data, this.props.token).then((status) => {
          //console.log('Recipes status : ',status, this.props.recipesList)
          //	alert(JSON.stringify(status))
          _this.setState(
            {
              //	signinLoader: false
            },
            () => {
              if (status.status) {
                this.setState({
                  recipesList: status.data,
                });
                //	alert(JSON.stringify(this.state.recipesList))
              } else {
              }
            }
          );
        });
      }
    );
  }

  Search = (e) => {
    if (e === '' || e === null || e === undefined) {
      // this.DataFilter(this.state.titlecopy)
      this.setState({
        recipesList: this.state.recipesListcopy,
      });
    }
    else {
      let obj = this.state.recipesListcopy?.filter(item => {
        return item?.nameEn?.toLowerCase()?.includes(e.toLowerCase())
      })
      this.setState({
        recipesList: obj
      })
    }
  }
  updateSearch(search) {
    this.setState({ searchText: search });
  }


  render() {
    const { recipesList, i } = this.state

    return (
      <View>
        <StatusBar hidden={false} />
        <View style={styles.mainLayout}>
          {renderIf(this.state?.searchView)(
            <View
              style={{
                width: "100%",
                height: "7.5%",
                flexDirection: "row",
                backgroundColor: "rgba(0,0,0,0.1)",
                marginTop: Platform.OS === "android" ? 0 : "5%",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                shadowOpacity: Platform.OS === "android" ? 0.5 : 0,
                borderBottomWidth: 0,
                elevation: 3,
              }}
            >
              <SearchBar
                placeholder="Search..."
                autoCorrect={false}
                onBlur={() => {
                  // this.search();
                }}
                onSubmitEditing={() => {
                  // this.search();
                }}
                onClear={() => {
                  this.setState({ searchText: "" }, () => this.search());
                }}
                onChangeText={(s) => {
                  this.Search(s);
                  this.setState({ searchText: s })
                  // console.log("sdmnb vcmanbds vn",s);
                }}
                value={this.state.searchText}
                containerStyle={[
                  {
                    flex: 1,
                    marginVertical: "1%",
                    paddingHorizontal: 10,

                    backgroundColor: "transparent",
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                  },
                  Platform.OS == "ios" ? Colors.shadowLight : {},
                ]}
                inputContainerStyle={[
                  {
                    elevation: 3,
                    borderRadius: 25,
                    paddingHorizontal: 0,
                    backgroundColor: "#fff",
                    borderColor: Colors.borderColor,
                    borderWidth: 0.5,
                    height: 40,
                  },
                ]}
                inputStyle={{ color: 'black' }}
              />
              <TouchableOpacity
                onPress={() => this.setState({ searchView: false })}
                style={{ position: "absolute", right: "5%" }}
              >
                <IconF name="close" size={18} color="black" />
              </TouchableOpacity>
            </View>
          )}

          {renderIf(!this.state.searchView)(
            <View
              style={{
                backgroundColor: "#fff",
                width: "100%",
                height: "7.5%",
                flexDirection: "row",
                marginTop: Platform.OS === "android" ? 0 : "5%",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                shadowOpacity: Platform.OS === "android" ? 0.5 : 0,
                borderBottomWidth: 0,
                elevation: 3,
              }}
            >
              <TouchableOpacity
                style={{ position: "absolute", left: "5%" }}
                onPress={() => this.props.navigation.goBack()}
              >
                <IconM name="arrow-back" size={30} color={"#000"} />
              </TouchableOpacity>

              <Text
                style={{ color: "#000", fontSize: 18, alignSelf: "center" }}
              >
                {i18n.t('Rsearch')}
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({ searchView: true })}
                style={{ position: "absolute", right: "5%" }}
              >
                <IconF5 name="search" size={20} color="black" />
              </TouchableOpacity>
            </View>
          )}

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
            }}
          >
            {this.state.recipesSearch.map((keyword, index) => (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    i: index
                  })
                  this.filterRecipes(keyword.searchType)
                }}
              >
                <View style={{ marginBottom: 10 }} key={keyword}>
                  <Text style={[styles.caleorie, {
                    backgroundColor: i === index ? Colors.green : 'white',
                    color: i === index ? 'white' : 'black'
                  }]}>{keyword.type}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
            scrollEnabled={true}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  borderColor: "#707070",
                  opacity: 0.2,
                  alignSelf: "center",
                }}
              />
            )}
            data={recipesList}
            renderItem={({ item }) => {
              const { UserRecipe } = this.state;

              const OMNI = "Omnivore"
              const Recipe = UserRecipe == 'omni' ? OMNI.charAt(0).toUpperCase() + OMNI.slice(1) : UserRecipe.charAt(0).toUpperCase() + UserRecipe.slice(1)

              if (this.state.UserRecipe == 'null') {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props?.navigation.navigate(
                        "RecipesDetail",
                        {
                          blogItem: item,
                        }
                      )
                    }
                  >
                    <View
                      style={{
                        width: "95%",
                        flexDirection: "row",
                        borderColor: "#eeeeee",
                        borderRadius: 10,
                        borderWidth: 1,
                        margin: "1%",
                        alignSelf: 'center',
                        height:
                          Platform.OS === "IOS" ? Responsive.height(90) : Responsive.height(90),
                      }}
                    >
                      <View style={{ width: "35%" }}>
                        <Image
                          source={
                            item?.featureImage === undefined || item?.featureImage === null
                              ? require('../../../Assets/Images/meal1.png')
                              : { uri: SERVER_URL + item?.featureImage?.l }
                          }
                          // source={{ uri: SERVER_URL + item?.featureImage?.l ??  }}
                          style={[styles.itemItemImage, { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }]}
                        />
                      </View>
                      <View style={styles.itemItemExtra}>
                        <Text style={[styles.itemItemTitle, { fontSize: 17, fontWeight: 'bold' }]}>{i18n.locale == undefined || i18n.locale == 'nl' ? item.nameNl : item.nameEn}</Text>
                        <Text style={[styles.itemItemDescription, { fontSize: 14, fontWeight: 'normal', marginTop: 5 }]}>{item.mealType[0]}</Text>
                      </View>
                    </View>

                  </TouchableOpacity>
                )
              } else {
                return (
                  item.mealType[0] == Recipe || item.mealType[1] == Recipe || item.mealType[2] == Recipe ?
                    <TouchableOpacity
                      onPress={() =>
                        this.props?.navigation.navigate(
                          "RecipesDetail",
                          {
                            blogItem: item,
                          }
                        )
                      }
                    >
                      <View
                        style={{
                          width: "95%",
                          flexDirection: "row",
                          borderColor: "#eeeeee",
                          borderRadius: 10,
                          borderWidth: 1,
                          margin: "1%",
                          alignSelf: 'center',
                          height:
                            Platform.OS === "IOS" ? Responsive.height(90) : Responsive.height(90),
                        }}
                      >
                        <View style={{ width: "35%" }}>
                          <Image
                            source={
                              item?.featureImage === undefined || item?.featureImage === null
                                ? require('../../../Assets/Images/meal1.png')
                                : { uri: SERVER_URL + item?.featureImage?.l }
                            }
                            // source={{ uri: SERVER_URL + item?.featureImage?.l ??  }}
                            style={[styles.itemItemImage, { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }]}
                          />
                        </View>
                        <View style={styles.itemItemExtra}>
                          <Text style={[styles.itemItemTitle, { fontSize: 17, fontWeight: 'bold' }]}>{i18n.locale == undefined || i18n.locale == 'nl' ? item.nameNl : item.nameEn}</Text>
                          <Text style={[styles.itemItemDescription, { fontSize: 14, fontWeight: 'normal', marginTop: 5 }]}>{Recipe}</Text>
                        </View>
                      </View>

                    </TouchableOpacity>
                    : null
                )
              }

            }}
            keyExtractor={(item, index) => item + index.toString()}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    //recipesList: state.RECIPES_LIST_SHOW.recipesList,
    recipesList: state.RECIPES_LIST_SHOW.recipesList,
    userName: state.USER_DATA_NAME.userDataName,
    token: state.SESSION_KEY.sessionKey,
    totalDailyKCal: state.UPDATE_USERDETAIL.totalDailyKCal,
    totalWeeklyKCal: state.UPDATE_USERDETAIL.totalWeeklyKCal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesSearch);
