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
  Dimensions,
  StatusBar,
  Animated,
  SafeAreaView,
  Image,
  Modal
} from "react-native";
import { styles } from "./Styles";
import IconF from "react-native-vector-icons/FontAwesome5";
import IconA from "react-native-vector-icons/AntDesign";
import LottieView from 'lottie-react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { API_URL, SERVER_URL } from "../../../Actions";
import { ActionCreators } from "../../../Actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
let deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from "lodash";
import Colors from "../../../Theme/Colors";
import i18n from '../../../../translation'
import I18n from "../../../../translation";
import RNFetchBlob from "rn-fetch-blob";
const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;

function ListItemBreakfast({ item, Engchecked, UserRecipe }) {


  return (

    <View style={styles.itemItem}>
      <ImageBackground
        source={
          item?.featureImage?.l === null || item?.featureImage?.l === undefined
            ? require("./../../../Assets/Images/recipes-category-1.png")
            : { uri: SERVER_URL + item?.featureImage?.l }
        }
        style={styles.itemItemImage}
      >
      </ImageBackground>
      <View style={styles.itemItemExtra}>
        <Text style={styles.itemItemTitle} numberOfLines={1}>
          {Engchecked ? item?.nameEn : item?.nameNl}
        </Text>
        <Text style={styles.itemItemDescription}>{item?.mealType[0]}</Text>
      </View>
    </View>

  );
}

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      Engchecked: false,
      mainLoader: true,
      recipesList: this.props?.recipesList,
      scrollY: new Animated.Value(
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
      datalist: [],
      recipesSnack: [],
      recipesBreakfast: [],
      recipesLunch: [],
      recipesDinner: [],
      page: 1,
      numOfPosts: 20,
      refreshing: false,
      UserRecipe: "",
      msgpopup: false,
      referrelUse: '',
      referrelPurchaseValid: ''
    };
  }

  ListItemBreakfast = ({ item, index }) => {
    const { Engchecked, UserRecipe } = this.state;

    const OMNI = "Omnivore"
    const Recipe = UserRecipe == 'omni' ? OMNI.charAt(0).toUpperCase() + OMNI.slice(1) : UserRecipe.charAt(0).toUpperCase() + UserRecipe.slice(1)

    if (this.state.UserRecipe == 'null') {
      return (
        <TouchableOpacity
          onPress={() => this.checkCondition(item)}
        >
          <View style={styles.itemItem}>
            <ImageBackground
              imageStyle={{ borderRadius: 10 }}
              source={
                item?.featureImage?.l === null || item?.featureImage?.l === undefined
                  ? require("./../../../Assets/Images/recipes-category-1.png")
                  : { uri: SERVER_URL + item?.featureImage?.l }
              }
              style={styles.itemItemImage}
            >
            </ImageBackground>
            <View style={styles.itemItemExtra}>
              <Text style={[styles.itemItemTitle, { fontWeight: 'bold', fontSize: 15 }]} numberOfLines={1}>
                {Engchecked ? item?.nameEn : item?.nameNl}
              </Text>
              {/* <Text style={styles.itemItemDescription}>{item?.mealType[0]}</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    else {
      return (
        item.mealType[0] == Recipe || item.mealType[1] == Recipe || item.mealType[2] == Recipe ?
          <TouchableOpacity
            onPress={() => this.checkCondition(item)}
          >
            <View style={styles.itemItem}>
              <ImageBackground
                imageStyle={{ borderRadius: 10 }}
                source={
                  item?.featureImage?.l === null || item?.featureImage?.l === undefined
                    ? require("./../../../Assets/Images/recipes-category-1.png")
                    : { uri: SERVER_URL + item?.featureImage?.l }
                }
                style={styles.itemItemImage}
              >
              </ImageBackground>
              <View style={styles.itemItemExtra}>
                <Text style={[styles.itemItemTitle, { fontWeight: 'bold', fontSize: 15 }]} numberOfLines={1}>
                  {Engchecked ? item?.nameEn : item?.nameNl}
                </Text>
                {/* <Text style={styles.itemItemDescription}>{item?.mealType[0]}</Text> */}
              </View>
            </View>
          </TouchableOpacity>
          : null
      );
    }
  }

  saveRecipeType = async () => {
    const recipe = await AsyncStorage.getItem('UserRecipe');
    this.setState({ UserRecipe: recipe == null ? 'null' : recipe })
  }

  checkCondition = async (item) => {

    if (this.state.referrelUse == 'false') {

      item.pricing == "free" || this.props?.userSubscription !== undefined ?
        this.props?.navigation.navigate("RecipesDetail", { blogItem: item })
        :
        this.props.navigation.navigate('PackageMeal')


    } else if (this.state.referrelUse == 'true' && this.state.referrelPurchaseValid == 'true') {
      this.props?.navigation.navigate("RecipesDetail", { blogItem: item })
    } else if (this.state.referrelUse == 'true' && this.state.referrelPurchaseValid == 'false') {

      item.pricing == "free" || this.props?.userSubscription !== undefined ?
        this.props?.navigation.navigate("RecipesDetail", { blogItem: item })
        :
        this.props.navigation.navigate('PackageMeal')

    }

  }

  componentDidMount = async () => {

    const recipe = await AsyncStorage.getItem('UserRecipe');
    this.setState({ UserRecipe: recipe == null ? 'null' : recipe })

    const { navigation } = this.props;
    const unsubscribe = navigation.addListener('focus', () => {
      this.saveRecipeType()
    });


    if (this.props?.languageget === 'en') {
      this.setState({
        Engchecked: true
      })
    } else {
      this.setState({
        Engchecked: false
      })
    }
    this.submit();

    const referrelUse = await AsyncStorage.getItem("referrelUse")
    const referrelPurchaseValid = await AsyncStorage.getItem("referrelPurchaseValid")

    this.setState({
      referrelUse: referrelUse,
      referrelPurchaseValid: referrelPurchaseValid
    })

  }

  filterRecipes(data) {
    var list = data;
    if (list !== undefined && list !== null && list.length !== 0) {
      this.setState({
        datalist: data,
      })
      var snackArray = list.filter((addedItem, index) => {
        if (addedItem?.recipeType?.length > 0) {
          return addedItem?.recipeType?.find((recipe) => recipe === "Snack");
        }
      });
      var breakfastArray = list?.filter((addedItem) => {
        if (addedItem?.recipeType?.length > 0) {
          return addedItem?.recipeType?.find((recipe) => recipe === "Breakfast");
        }
      });
      var lunchArray = list?.filter((addedItem) => {
        if (addedItem?.recipeType?.length > 0) {
          return addedItem?.recipeType?.find((recipe) => recipe === "Lunch");
        }
      });
      var dinnerArray = list?.filter((addedItem) => {
        if (addedItem?.recipeType?.length > 0) {
          return addedItem?.recipeType?.find((recipe) => recipe === "Dinner");
        }
      });
    } else {
      this.setState({
        mainLoader: true,
        datalist: [],
      });
      // this.submit();
    }
    if (data?.length === 0) {
      this.setState({
        recipesSnack: [],
        recipesBreakfast: [],
        recipesLunch: [],
        recipesDinner: [],
        mainLoader: true,
      });
      // this.submit();
    } else {
      // let breakfast = [...breakfastArray];
      // let snack = [...snackArray];
      // let dinner = [ ...dinnerArray];
      // let lunch = [ ...lunchArray];
      // let breakfast = [...this.state.recipesBreakfast, ...breakfastArray];
      // let snack = [...this.state.recipesSnack, ...snackArray];
      // let dinner = [...this.state.recipesDinner, ...dinnerArray];
      // let lunch = [...this.state.recipesLunch, ...lunchArray];

      // console.log("Filter recipe check", breakfast);

      this.setState({
        recipesSnack: snackArray,
        recipesBreakfast: breakfastArray,
        recipesLunch: lunchArray,
        recipesDinner: dinnerArray,
        mainLoader: false,
      });
      // this.setState({
      //   recipesSnack: snackArray,
      //   // recipesBreakfast: breakfastArray,
      //   recipesBreakfast: breakfast,
      //   recipesLunch: lunchArray,
      //   recipesDinner: dinnerArray,
      //   mainLoader: false,
      // });
    }
    //alert("Breakfast : "+JSON.stringify(breakfastArray))
  }

  updatePage(value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.submit();
      }
    );
  }

  submit() {

    try {

      this.setState({ loader: true })

      fetch(`${API_URL}/recipe/get/all`, {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'auth-token': `${this.props.token}`
        },
        body: JSON.stringify({
          mealType: this.props.updaterecipe
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === true) {
            this.filterRecipes(responseJson.data);
            this.setState({
              loader: false,
              mainLoader: false,
            })
          }

        })
        .catch((error) => {
          console.log(error)
        })
      return;

      const _this = this;
      this.setState(
        {
          loader: true,
          mainLoader: false,
          refreshing: false
        },
        async () => {
          var data = {
            mealType: this.props.updaterecipe
          };
          await RNFetchBlob.fetch(
            'POST',
            'https://api.myfitspot.com/api/recipe/get/all',
            {
              'Content-Type': 'application/json',
              Accept: 'application/json, text/plain, */*',
              'auth-token': this.props.token,
            },
            JSON.stringify(data)
          ).then(res => {
            const data = JSON.parse(res.data);

            if (data?.status === true) {
              this.filterRecipes(data?.data);
              this.setState({
                loader: false,
                mainLoader: false,
              })
            }
          });
        }
      );


    } catch (error) {
      console.log(error)
    }

  }

  _onRefresh() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.submit();
    }, 2000);
  }
  render() {
    const { Engchecked, recipesList } = this.state


    if (this.state.mainLoader == true) {
      return (
        <View
          style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#ffffff' }}>
          <LottieView
            style={{ width: widthPercentageToDP('25%'), height: heightPercentageToDP('25%') }}
            source={require('../../../Assets/loader.json')}
            loop={true}
            autoPlay
          />
        </View>
      )
    }
    return (
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <StatusBar backgroundColor={'#000000'} barStyle="light-content" />

        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 0, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', marginRight: 10, marginLeft: 10 }}>

          <TouchableOpacity
            style={{ width: '10%', marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => this.props.navigation.goBack(null)}
          >
            <IconA name="arrowleft" size={25} color={'#000000'} />
          </TouchableOpacity>

          <View style={{ width: '70%', justifyContent: 'center' }}>
            <Text
              style={{
                color: '#000000',
                fontSize: 24,
                alignSelf: "center",
                fontWeight: "500",
                marginLeft: 10
              }}
            >
              {i18n.t('RECIPES')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("RecipesSearch", {
              list: this.state.datalist
            })}
            style={{ width: '10%' }}
          >
            <IconF name="search" style={{ alignSelf: 'flex-start', marginTop: 12, marginRight: 10 }} size={20} color={Colors.green} />
          </TouchableOpacity>

          <View style={{ width: '10%' }}>
            <TouchableOpacity onPress={() => this.setState({ msgpopup: true })} style={{ width: 30, marginRight: 20, alignSelf: 'flex-start', marginBottom: 10, marginTop: 13 }}>
              <Image style={{ width: 20, height: 20, alignSelf: 'flex-start' }} source={require('../../../Assets/Images/info.png')} />
            </TouchableOpacity>
          </View>

        </View>

        {this.state.UserRecipe == 'null' ?
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 0, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', marginRight: 10, marginLeft: 10 }}>
            <Text style={{ padding: 15, paddingLeft: 20, fontSize: 16, fontWeight: 'bold' }}>{i18n.t('PleaseUpdateYourRecipeType')}</Text>
          </View>
          : null}


        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <View style={styles.mainLayout}>
            {this.state.recipesBreakfast.length > 0 && (
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 0, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', marginRight: 10, marginLeft: 10 }}>
                <View style={styles.itemView}>


                  <View style={[styles.headerGoalText, { marginTop: 15, }]}>
                    <Text style={[styles.shortText, { fontWeight: 'bold', marginLeft: -3 }]}>{i18n.t('BREAKFAST')}</Text>
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate("RecipesListView", {
                          recipesList: this.state.recipesBreakfast,
                          recipesCategory: "Breakfast Recipes",
                          category: "Breakfast",
                        })
                      }
                      style={[styles.viewAllText, { color: Colors.green, fontSize: 15 }]}
                    >
                      {i18n.t('ViewAll')}
                    </Text>
                  </View>


                  <View style={{ marginBottom: -25 }}>
                    <FlatList
                      horizontal
                      scrollEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      onEndReached={() => {
                        if (
                          this.state.page ===
                          Object?.keys(this.state?.recipesBreakfast)?.length
                        ) {
                          // this.updatePage(4);
                        } else {
                          this.updatePage(this.state.page + 1);
                        }
                      }}
                      data={this.state?.recipesBreakfast}
                      renderItem={this.ListItemBreakfast}
                      keyExtractor={(item, index) => item + index.toString()}
                    />
                  </View>

                </View>
              </View>
            )}

            {this.state.recipesLunch.length > 0 && (
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 0, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', marginRight: 10, marginLeft: 10 }}>
                <View style={styles.itemView}>

                  <View style={[styles.headerGoalText, { marginTop: 15, }]}>
                    <Text style={[styles.shortText, { fontWeight: 'bold', marginLeft: -3 }]}>{i18n.t('LUNCH')}</Text>
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate("RecipesListView", {
                          recipesList: this.state.recipesLunch,
                          recipesCategory: "Lunch Recipes",
                          category: "lunch",
                        })
                      }
                      style={[styles.viewAllText, { color: Colors.green, fontSize: 15 }]}
                    >
                      {i18n.t('ViewAll')}
                    </Text>
                  </View>

                  <View style={{ marginBottom: -25 }}>
                    <FlatList
                      horizontal
                      scrollEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      onEndReached={() => {
                        if (
                          this.state.page ===
                          Object.keys(this.state.recipesLunch).length
                        ) {
                          // this.updatePage(4);
                        } else {
                          this.updatePage(this.state.page + 1);
                        }
                      }}
                      ItemSeparatorComponent={() => (
                        <View
                          style={{
                            borderColor: "#707070",
                            opacity: 0.2,
                            alignSelf: "center",
                          }}
                        />
                      )}
                      data={this.state.recipesLunch}
                      renderItem={this.ListItemBreakfast}
                      keyExtractor={(item, index) => item + index.toString()}
                    />
                  </View>
                </View>
              </View>
            )}
            {this.state.recipesSnack.length > 0 && (
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 0, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', marginRight: 10, marginLeft: 10 }}>
                <View style={styles.itemView}>

                  <View style={[styles.headerGoalText, { marginTop: 15, }]}>
                    <Text style={[styles.shortText, { fontWeight: 'bold', marginLeft: -3 }]}>{i18n.t('SNACKS')}</Text>
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate("RecipesListView", {
                          recipesList: this.state.recipesSnack,
                          recipesCategory: "Snack Recipes",
                          category: "Snack",
                        })
                      }
                      style={[styles.viewAllText, { color: Colors.green, fontSize: 15 }]}
                    >
                      {i18n.t('ViewAll')}
                    </Text>
                  </View>

                  <View style={{ marginBottom: 0 }}>
                    <FlatList
                      horizontal
                      scrollEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      ItemSeparatorComponent={() => (
                        <View
                          style={{
                            borderColor: "#707070",
                            opacity: 0.2,
                            alignSelf: "center",
                          }}
                        />
                      )}
                      onEndReached={() => {
                        if (
                          this.state.page ===
                          Object.keys(this.state.recipesSnack).length
                        ) {
                          // this.updatePage(4);
                        } else {
                          this.updatePage(this.state.page + 1);
                        }
                      }}
                      data={this.state.recipesSnack}
                      renderItem={this.ListItemBreakfast}
                      keyExtractor={(item, index) => item + index.toString()}
                    />
                  </View>
                </View>
              </View>
            )}

            {this.state?.recipesDinner.length > 0 && (
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 0, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', marginRight: 10, marginLeft: 10 }}>
                <View style={styles.itemViewDinner}>

                  <View style={[styles.headerGoalText, { marginTop: 15, }]}>
                    <Text style={[styles.shortText, { fontWeight: 'bold', marginLeft: -3 }]}>{i18n.t('DINNER')}</Text>
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate("RecipesListView", {
                          recipesList: this.state.recipesDinner,
                          recipesCategory: "Dinner Recipes",
                          category: "Dinner",
                        })
                      }
                      style={[styles.viewAllText, { color: Colors.green, fontSize: 15 }]}
                    >
                      {i18n.t('ViewAll')}
                    </Text>
                  </View>

                  <View style={{ marginBottom: -60 }}>
                    <FlatList
                      horizontal
                      scrollEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      ItemSeparatorComponent={() => (
                        <View
                          style={{
                            borderColor: "#707070",
                            opacity: 0.2,
                            alignSelf: "center",
                          }}
                        />
                      )}
                      onEndReached={() => {
                        if (
                          this.state.page ===
                          Object.keys(this.state.recipesDinner).length
                        ) {
                          // this.updatePage(4);
                        } else {
                          this.updatePage(this.state.page + 1);
                        }
                      }}
                      data={this.state.recipesDinner}
                      renderItem={this.ListItemBreakfast}
                      keyExtractor={(item, index) => item + index.toString()}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={{ marginTop: 20 }}></View>

          <Modal
            transparent={true}
            visible={this.state.msgpopup}
            onRequestClose={() => this.setState({ msgpopup: false })}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <View>
                <View style={{ backgroundColor: '#ffffff', height: '100%' }}>

                  <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                    <TouchableOpacity onPress={() => this.setState({ msgpopup: false })} style={{ width: '20%' }}>
                      <Image style={{ width: 40, height: 40 }} source={require('../../../Assets/Today/backButton.png')} />
                    </TouchableOpacity>
                    <View style={{ width: '80%' }}>
                      {/* <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 60, fontWeight: 'bold', color: '#58595B' }}>Overview</Text> */}
                    </View>
                  </View>

                  <View style={{ marginTop: 50 }}>
                    <Image style={{ width: 150, height: 19, alignSelf: 'center' }} source={require('../../../Assets/Images/logoBlack.png')} />
                  </View>

                  <View style={{ marginTop: 20, padding: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('RECPOP1d1')}</Text>
                  </View>

                  <View style={{ marginTop: 10, padding: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('RECPOP1d2')}</Text>
                  </View>

                  <View style={{ marginTop: 10, padding: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>{I18n.t('RECPOP1d3')}</Text>
                  </View>

                  <View style={{ width: 130, alignSelf: 'center', borderTopColor: '#000000', borderTopWidth: 2, paddingTop: 10 }}>
                    <Text style={{ alignSelf: 'center', color: '#8D8D8D', fontSize: 15 }}>{I18n.t('POP1d4')}</Text>
                  </View>

                </View>
              </View>
            </SafeAreaView>
          </Modal>
        </ScrollView>

      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipesList: state.RECIPES_LIST_SHOW.recipesList,
    recipesListCheck: state.RECIPES_LIST_CHECK.recipesListCheck,
    userName: state.USER_DATA_NAME.userDataName,
    token: state.SESSION_KEY.sessionKey,
    totalDailyKCal: state.UPDATE_USERDETAIL.totalDailyKCal,
    totalWeeklyKCal: state.UPDATE_USERDETAIL.totalWeeklyKCal,
    userSubscription: state.USER_SUBSCRIPTION.userSubscription,
    Subscription: state.USER_SUBSCRIPTION.Subscription,
    languageget: state.LANGUAGE_TRANSLATE.languageget,
    updaterecipe: state.UPDATE_RECIPE.updaterecipe,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipes);
