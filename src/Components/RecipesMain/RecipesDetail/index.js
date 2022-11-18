import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
  ImageBackground,
  Linking,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useHeaderHeight } from "@react-navigation/stack";
import HTML from "react-native-render-html";
// import HeaderImageScrollView, {
//   TriggeringView,
// } from 'react-native-image-header-scroll-view';
import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";
import tvShowContent from "../../../Assets/todayDetailContent";
import IconF from "react-native-vector-icons/FontAwesome5";
import IconM from "react-native-vector-icons/MaterialIcons";
import todayDetailContent from "../../../Assets/todayDetailContent";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { API_URL, SERVER_URL } from "../../../Actions";
import renderIf from "render-if";
import ProgressCircle from "react-native-progress-circle";
import { ActionCreators } from "../../../Actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Colors from "../../../Theme/Colors";
import { color } from "react-native-reanimated";
import Responsive from "react-native-lightweight-responsive";
import { Fragment } from "react";
import i18n from '../../../../translation'
import { Icon } from 'react-native-elements'
import { Divider, Overlay, CheckBox, ListItem } from "react-native-elements";
import { CommonActions } from "@react-navigation/routers";
const styles = StyleSheet.create({
  titleView: {
    fontSize: 20,
    paddingVertical: 10,
  },
  pgrCircle: {
    fontSize: hp('2%'),
    width: wp('20'),
    textAlign: 'center',
    color: Colors.green,
    fontWeight: '600',
  },
  name: {
    marginLeft: wp(5),
    color: "#000",
    fontWeight: "500",
    fontSize: hp("2.6%"),
  },
  infoName: {
    marginLeft: 0,
    color: '#000',
    fontWeight: '500',
    fontSize: Platform.OS == 'android' ? hp('1.9%') : hp('1.9%'),
    letterSpacing: 1,
  },
  infoSection: {},
  section: {
    paddingLeft: Responsive.width(20),
    paddingRight: Responsive.width(20),
    paddingBottom: Responsive.width(5),
  },
  lastSection: {
    marginBottom: hp(10),
    paddingHorizontal: wp(5),
    shadowColor: "red",
    borderBottomColor: "#cccccc",
    shadowOpacity: Platform.OS === "android" ? 0.5 : 0,
  },
  writtenSection: {
    height: Responsive.height(65),
    paddingLeft: Responsive.width(20),
    paddingRight: Responsive.width(20),
    paddingBottom: Responsive.width(20),
    paddingTop: Responsive.width(20),
    borderBottomWidth: 0.5,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },
  writtenView: {
    flexDirection: "row",
    alignSelf: "center",
    height: Responsive.height(40),
    width: Responsive.width(298),
    borderRadius: 30,
    alignItems: "center",
  },
  buttonContainer: {
    height: Responsive.height(45),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "90%",
    borderRadius: 5,
    margin: "5%",
    backgroundColor: "transparent",
  },
  loginButton: {
    backgroundColor: "#000",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
  },
  loginText: {
    color: "white",
    fontSize: 17,
  },
  writtenSectionTitle: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: Responsive.height(2),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: Responsive.height(10),
  },
  sectionContent: {
    fontSize: 18,
    textAlign: "auto",
  },
  keywords: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  caleories: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  keywordContainer: {
    marginTop: "3%",
  },
  feedReadTimeText: {
    color: Colors.green,
    fontSize: hp("1.8%"),
    fontWeight: "300",
    margin: "2%",
  },
  infoTextName: {
    color: "#9E9F9D",
    fontSize: hp("1.3%"),
    fontWeight: "300",
    margin: "1.5%",
  },
  carbsText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    margin: '2%',
    textAlign: 'center',
    marginTop: 10,
  },
  writtenSectionText: {
    color: "#9E9F9D",
    fontSize: 15,
    fontWeight: "300",
  },
  keyword: {
    fontSize: 14,
    color: "#000",
    backgroundColor: "#F3F3F3",
    padding: 10,
    marginLeft: Responsive.width(5),
    marginRight: Responsive.width(5),
  },

  caleorie: {
    fontSize: 14,
    color: "#000",
    backgroundColor: "#ffffff",
    padding: 10,
    marginLeft: Responsive.width(5),
    marginRight: Responsive.width(5),
  },
  titleContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  imageTitle: {
    color: "white",
    backgroundColor: "transparent",
    fontSize: 24,
  },
  navTitle: {
    color: "white",
    fontSize: 18,
    backgroundColor: "transparent",
  },
  sectionLarge: {
    height: 600,
  },
});
let crb = 0, ft = 0, prt = 0;
// let Ingredients = []
import DropDownPicker from 'react-native-dropdown-picker';
import { Progress } from "../../HomeMain/AddProductMeal/Progress";
class RecipesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavTitle: false,
      blogItem: "",
      fats: "",
      total: 0,
      carbs: "",
      loader: false,
      RecipeCheck: "",
      protein: "",
      Visible: false,
      checked: false,
      checked1: false,
      checked2: false,
      header: false,
      open: false,
      isdevide: false,
      Engchecked: false,
      value: null,
      RecipeName: '',
      Ingredients: [],
      IngredientsCopy: [],
      items: [
        { id: 1, label: 'BREAKFAST', Ischeck: false, title: i18n.t('BREAKFAST') },
        { id: 2, label: 'LUNCH', Ischeck: false, title: i18n.t('LUNCH') },
        { id: 3, label: 'DINNER', Ischeck: false, title: i18n.t('DINNER') },
        { id: 4, label: 'SNACK', Ischeck: false, title: i18n.t('SNACKS') },
      ],
      count: 1,
      portion: 'full',
      smallPortionCheck: false,
      mediumPortionCheck: false,
      fullPortionCheck: false,
      RecipeTypeCheck: '',
      i: ''
    };
    //  this.UndefinedHandle()
  }

  handleClick = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };
  componentDidMount = async () => {

    const RECIPETYPE = this.props?.route?.params?.RECIPETYPE

    this.setState({ RecipeName: RECIPETYPE })

    if (this.props?.languageget === 'en') {
      this.setState({
        Engchecked: true
      })
    } else {
      this.setState({
        Engchecked: false
      })
    }
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }

    this.setState({
      blogItem: this.props?.route?.params?.blogItem,
      RecipeCheck: this.props?.route?.params?.RecipieCheck,
      carbs: this.props?.route?.params?.blogItem.totalCarbsCalories ?? 1,
      fats: this.props?.route?.params?.blogItem.totalFatsCalories ?? 1,
      protein: this.props?.route?.params?.blogItem.totalProteinCalories ?? 1,
    });

    const { params } = this.props?.route;

    let Ingred = [...params?.blogItem?.carbs, ...params?.blogItem?.fats, ...params?.blogItem?.protein, ...params?.blogItem?.fruits, ...params?.blogItem?.herbs, ...params?.blogItem?.vegetables]
    Ingred = Ingred.map(item => {
      return {
        ...item,
        selected: false
      }
    })
    this.setState({
      Ingredients: Ingred,
      IngredientsCopy: Ingred
    })
    //  alert("PROPS" + JSON.stringify(this.props.route.params.blogItem));
  }


  handleScroll = (event) => {
    let value = event.nativeEvent.contentOffset.y
    if (value > 50) {
      // console.log("Event value true",value);
      this.setState({
        header: true
      })
    }
    else {
      // console.log("Event value false",value);
      this.setState({
        header: false
      })
    }
  }

  async addDailyActivityMeal(move) {

    const { blogItem } = this.state;
    const { params } = this.props?.route;


    // alert('Daily');'
    const dat = await AsyncStorage.getItem('DATESELECTED')
    const DATESELECTED = await AsyncStorage.getItem('DATESELECTED')
    let recipi = this.state.RecipeName
    let recipemeal = [];
    let typedef = blogItem?.recipeType;
    let typedefmeal = blogItem?.mealType;
    if (blogItem === null || blogItem === undefined) {
      recipemeal.push('Vegetarian');
    } else {
      for (let i of typedefmeal) {
        recipemeal.push(i);
      }
    }
    const { fats, protein, carbs } = this.state

    const data = {
      type: this.state.RecipeName.toLowerCase(),
      portion: 'full',
      recipeName: blogItem?.nameEn ?? 'Meal Bread',
      activeStatus: 2,
      image: SERVER_URL + blogItem?.featureImage?.l ?? 'public/images_data/l-AaDVczhKWisqpEv61.webp',
      product: blogItem._id,
      calories: (params?.blogItem?.totalCalorieSum * this.state.count) ?? 1,
      recipe: blogItem._id,
      date: dat,
      recipeNameNl: blogItem?.nameNl ?? 'Meal bread type',
      proteins: this.state.protein ?? 0,
      fats: this.state.fats ?? 0,
      carbs: this.state.carbs ?? 0,
      recommended: Math.ceil((fats + carbs + protein) * 0.25),
      value: Math.ceil(parseInt(fats + carbs + protein) * 0.5),
      count: this.state.count

    };
    const _this = this;
    let ischecked = this.props?.RemainCal === NaN || this.props?.RemainCal === undefined || this.props?.RemainCal === null ? 0 : this.props?.RemainCal
    let cal = ischecked + data?.calories
    _this.props.remaincalories(cal)
    this.setState(
      {
        loader: true,
      },
      () => {
        _this.props
          .setDailyActivityMeal(data, this.props?.token, blogItem)
          .then(status => {

            if (status.status) {
              this.setState({
                loader: false,
              });
              // this.props.navigation.navigate('AddProductMeal');
              // this.props.navigation.dispatch(
              //   CommonActions.reset({
              //     index: 1,
              //     routes: [{ name: 'HomeMain' }],
              //   }),
              // );
              _this.props.getDailyActivityType(recipi.toLowerCase()).then((status) => {
                if (status.status) {

                  // Alert.alert(i18n.t('congo') + '!', this.state.RecipeTypeCheck == '' ? i18n.t('congoSub2') : i18n.t('congoSub') + ' ' + this.state.RecipeTypeCheck)

                  // this.setState({ RecipeName: "" })

                  this.props.navigation.navigate(move == 'done' ? "AddProductMeal" : "Home", {
                    RecipeType: recipi.toLowerCase(),
                    dateSelected: DATESELECTED
                  });

                  // this.props.navigation.navigate("AddProductMeal", {
                  //   RecipeType: recipi.toLowerCase(),
                  // });
                }
              });
              // this.props.navigation.navigate("AddProductMeal", {
              //   RecipeType: recipi.toLowerCase(),
              // });
            }
          });
      },
    );

    let Neut = {
      carbs: Math.round(
        this.state?.calories * this.state?.RecipeCount * 0.5 +
        this.state?.CarbsValue,
      ),
      protein: Math.round(
        this.state?.calories * this.state?.RecipeCount * 0.25 +
        this.state?.ProteinValue,
      ),
      fats: Math.round(
        this.state?.calories * this.state?.RecipeCount * 0.15 +
        this.state?.FatsValue,
      ),
    };
    AsyncStorage.setItem('Neutronts', JSON.stringify(Neut));
  }

  SelectRecipeType = () => {
    if (this.state.RecipeName === '') {
      alert(i18n.t('alert'))
    }
    else {
      this.setState({
        Visible: !this.state?.Visible
      })
      setTimeout(() => {
        this.addDailyActivityMeal('!done')
      }, 200);
    }
  }
  // ToggelMethod = (id) => {
  //   this.setState({
  //     Ingredients: this.state.Ingredients.map(item => {
  //       if (item._id === id) {
  //         return {
  //           ...item,
  //           selected: !item.selected
  //         }
  //       }
  //       return item
  //     })
  //   })
  // }
  Incermental = (count) => {
    this.setState({
      Ingredients: this.state.IngredientsCopy.map(item => {
        return {
          ...item,
          grams: item?.grams * count
        }
      })
    })
  }

  render() {
    const contentWidth = Dimensions.get('window').width;
    const { params } = this.props?.route;
    const { blogItem, isdevide, Engchecked, Ingredients } = this?.state;
    const { carbs } = this?.state;
    const { fats } = this?.state;
    const { protein } = this?.state;
    const { recipeEn, recipeNl } = params?.blogItem
    const MIN_HEIGHT = hp("7%");
    const MAX_HEIGHT = hp("30%");
    const { items, Visible } = this.state
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ height: '4%' }}></View>
        {/* <StatusBar backgroundColor={'#000000'} barStyle="light-content" /> */}
        {
          Visible &&
          <Overlay isVisible={Visible} onBackdropPress={() => {
            this.setState({
              Visible: !this.state?.Visible
            })
          }}>
            <View style={{ height: hp('60'), width: wp('90'), backgroundColor: 'white', justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>{i18n.t('selecttype')}</Text>

              <View style={{ padding: 20 }}>
                {
                  items?.map(item => {
                    return (
                      <CheckBox
                        title={item?.title}
                        checkedColor={Colors.green}
                        checked={item?.Ischeck}
                        onPress={() => {
                          this.setState({
                            RecipeName: item?.label,
                            RecipeTypeCheck: item?.title,
                            items: this.state.items?.map((elem) => {
                              elem.Ischeck = false;
                              if (elem.id === item?.id) {
                                if (elem.Ischeck !== true) {
                                  return {
                                    ...elem,
                                    Ischeck: !elem.Ischeck,
                                  };
                                }
                                return elem;
                              }
                              return elem;
                            }),
                          })
                        }}
                      />
                    )
                  })
                }
              </View>
              <TouchableOpacity onPress={() => {
                this.SelectRecipeType()
              }} style={{ height: hp(5), borderRadius: 20, backgroundColor: Colors.green, width: wp('50'), justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <Text style={{ color: Colors.white, fontWeight: '500', fontSize: 17 }} >{i18n.t('Done')}</Text>
              </TouchableOpacity>
            </View>
          </Overlay>
        }
        {this.state.loader ? (
          <View
            style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
        ) : (
          <ImageHeaderScrollView
            maxHeight={MAX_HEIGHT}
            minHeight={MIN_HEIGHT}
            bounces={false}
            maxOverlayOpacity={0.8}
            minOverlayOpacity={0.1}
            fadeOutForeground
            headerImage={
              params.blogItem?.featureImage === undefined ||
                params.blogItem?.featureImage === null
                ? require("../../../Assets/Images/meal1.png")
                : { uri: SERVER_URL + params.blogItem?.featureImage?.l }
            }
            renderHeader={() => (
              <View
                style={{
                  height: heightPercentageToDP(20),
                  width: widthPercentageToDP(100),
                }}
              >
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 40,
                    left: 20,
                    width: "100%",
                    height: 40,
                    // width: 40,
                  }}
                  onPress={() => alert(i18n.t('back'))}
                >
                  <IconM name="arrow-back" size={hp("4.0%")} color={"#fff"} />
                </TouchableOpacity>
              </View>
            )}
            renderFixedForeground={() => (
              <Animatable.View
                style={{
                  height: MIN_HEIGHT,
                  justifyContent: "flex-start",
                  opacity: 0,
                }}
                ref={(navTitleView) => {
                  this.navTitleView = navTitleView;
                }}
              >
                <View
                  // style={{flexDirection: 'row', justifyContent: 'flex-start'}}
                  style={{
                    backgroundColor: "white",
                    height: 100,
                    shadowColor: "#000",
                    shadowOpacity: 0.8,
                    shadowRadius: 10,
                    shadowOffset: {
                      height: 10,
                      width: 8,
                    },
                    elevation: 20,
                  }}
                >
                  <IconM
                    name="arrow-back"
                    size={hp("4.0%")}
                    color={"#000"}
                    style={{ marginTop: 20, marginLeft: 30 }}
                  />
                </View>
              </Animatable.View>
            )}
            renderForeground={() => (
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <IconM
                    name="arrow-back"
                    size={hp("4.0%")}
                    color={"#fff"}
                    style={{ marginTop: 20, marginLeft: 30 }}
                  />
                </TouchableOpacity>
              </View>
            )}
          >

            <TriggeringView
              onHide={() => this.navTitleView.fadeInUp(200)}
              onDisplay={() => this.navTitleView.fadeOut(100)}>

              <View style={styles.titleView}>

                <View style={{ marginTop: 10, marginRight: 10, marginLeft: 10, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center' }}>
                  <Text style={[styles.name, { padding: 10, fontSize: 20, fontWeight: 'bold' }]}>{Engchecked ? blogItem?.nameEn : blogItem?.nameNl}</Text>
                </View>

                <View style={{ marginTop: 10, padding: 10, marginRight: 10, marginLeft: 10, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center' }}>

                  <Text style={{ color: 'gray', fontSize: 16, marginTop: 5, marginLeft: 5 }}>
                    {blogItem.timetoPrepare} <Text style={{ color: Colors.green }}>{i18n.t('minute')}</Text>  |  {(params?.blogItem?.totalCalorieSum * this.state.count).toFixed(0)}<Text style={{ color: Colors.green }}> {i18n.t('calperserve')}</Text></Text>
                  <TouchableOpacity style={{ marginTop: 20, marginLeft: -12 }} onPress={() => this.props.navigation.navigate('UserProfile', {
                    _id: params?.blogItem?.user?._id,
                    token: this.props?.token

                  })}>
                    <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp(5) }}>
                      <Image source={params?.blogItem?.user?.profilePic ? { uri: SERVER_URL + params?.blogItem?.user?.profilePic } : require('../../../Assets/defaultimage.png')} style={{ width: 45, height: 45, borderRadius: 45 / 2 }} />
                      <View style={{
                        paddingStart: wp(2)
                      }}>
                        <Text style={{ fontSize: 17, color: 'gray' }}>
                          {i18n.t('createdBy')}
                        </Text>
                        <Text style={{ fontSize: 17 }}>
                          {params?.blogItem?.user?.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <View style={{ flexDirection: "row", flexWrap: 'wrap', marginTop: 10 }}>
                    {
                      params?.blogItem?.specification?.map(item => {
                        return (
                          <Text style={[styles.feedReadTimeText]}>

                            {/* <IconF
                              name="clock"
                              size={hp("1.8%")}
                              color={Colors.green}
                            /> */}
                            {" "}{item == "Gluten Free" ? i18n.t('GlutenFree') :
                              item == "Lactose Free" ? i18n.t('LactoseFree') :
                                item == "High Carb" ? i18n.t('HighCarb') :
                                  item == "High Fat" ? i18n.t('HighFat') :
                                    item == "High Protein" ? i18n.t('HighProtein') :
                                      null}
                          </Text>
                        )
                      })
                    }
                    {
                      params?.blogItem?.mealType?.map(item => {
                        return (
                          <Text style={styles.feedReadTimeText}>
                            {/* <IconF name="fire" size={hp("1.5%")} color={Colors.green} />{" "} */}
                            {item == 'Vegan' ? i18n.t('Vegan') :
                              item == 'Vegetarian' ? i18n.t('Vegetarian') :
                                item == 'Omnivore' ? i18n.t('Omnivore') :
                                  null}
                          </Text>
                        )
                      })
                    }
                  </View>

                </View>

              </View>

              <View style={{ marginTop: 10, padding: 10, marginRight: 10, marginLeft: 10, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center' }}>
                <View style={styles.section}>

                  <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
                    <View style={{ width: '60%' }}>
                      <Text style={styles.infoName}>{i18n.t('NutritionInfo')}</Text>
                    </View>
                    <View style={{ width: '40%' }}>
                      <Text style={[styles.caleorie, { fontSize: 20, color: `#9E9F9D`, alignSelf: 'flex-end', marginTop: -10 }]}>{`${(params?.blogItem?.totalCalorieSum * this.state.count).toFixed(0)}`} <Text style={{ color: Colors.green }}>Kcal</Text></Text>
                    </View>
                  </View>


                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                      marginLeft: -30
                    }}
                  >
                    <ProgressCircleComp percent={Math.ceil(parseInt(carbs)) ?? 0} value={parseFloat(carbs).toFixed(1) ?? 0} title={i18n.t('CARBS')} />
                    <ProgressCircleComp percent={Math.ceil(parseInt(protein)) ?? 0} value={parseFloat(protein).toFixed(1) ?? 0} title={i18n.t('PROTEIN')} />
                    <ProgressCircleComp percent={Math.ceil(parseInt(fats)) ?? 0} value={parseFloat(fats).toFixed(1) ?? 0} title={i18n.t('FAT')} />
                  </View>
                </View>
              </View>

            </TriggeringView>

            <View style={{ marginTop: 10, padding: 10, marginRight: 10, marginLeft: 10, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center' }}>
              <View style={styles.lastSection}>
                <View style={styles.infoSection}>
                  <View style={{ flexDirection: "row", marginVertical: "3%", top: 10 }}>
                    <Text style={styles.infoName}>{i18n.t('Ingredients')}</Text>
                  </View>
                </View>



                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 17 }}>
                      {this.state.count}
                    </Text>
                    <Text style={{ fontSize: 17, left: 6 }}>
                      {i18n.t('Servings')}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', width: '30%', }}>
                    <TouchableOpacity onPress={() => {
                      if (this.state.count === 0.5) {
                        this.setState({
                          count: 0.5
                        }, () => {
                          this.Incermental(this.state.count)
                        })
                      }
                      else {
                        this.setState({
                          count: this.state.count - 0.5,
                          carbs: this.state.carbs - crb,
                          fats: this.state.fats - ft,
                          protein: this.state.protein - prt
                        }, () => {
                          this.Incermental(this.state.count)
                        })
                      }
                    }} style={{ backgroundColor: 'lightgray', width: 55, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
                      <Text style={{ fontSize: 30, textAlign: 'center' }}>{"-"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      if (!isdevide) {
                        crb = this.state.carbs / 2,
                          ft = this.state.fats / 2,
                          prt = this.state.protein / 2,
                          this.setState({
                            isdevide: true
                          })
                      }
                      this.setState({
                        count: this.state.count + 0.5,
                        carbs: this.state.carbs + crb,
                        fats: this.state.fats + ft,
                        protein: this.state.protein + prt
                      }, () => {
                        this.Incermental(this.state.count)
                      })
                    }} style={{ backgroundColor: 'lightgray', left: 1, width: 55, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
                      <Text style={{ fontSize: 30, textAlign: 'center' }}>{"+"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>



                <View style={{ paddingTop: hp(2) }}>
                  {
                    Ingredients?.map((item, index) => {
                      return (
                        <View>
                          <ListItem bottomDivider onPress={() => {
                            // this.setState({i:index})
                            // this.ToggelMethod(item._id)
                          }}>
                            <ListItem.Content>
                              <ListItem.Title>
                                {item?.grams} (g) {Engchecked ? item?.ingredient?.nameEn : item?.ingredient?.nameNl}
                              </ListItem.Title>
                            </ListItem.Content>
                          </ListItem>
                        </View>
                      )
                    })
                  }
                </View>

                {recipeEn == '' || recipeNl == '' ?
                  null
                  :
                  <View>
                    <View style={{ marginVertical: hp(2.5) }}>
                      <Text style={styles.infoName}>{i18n.t('Description')}</Text>
                    </View>
                    <View style={{ paddingHorizontal: wp(5) }}>
                      <HTML
                        tagsStyles={{ p: { color: '#58585A', textDecorationLine: 'none', fontSize: 17, fontFamily: 'Montserrat-Bold', lineHeight: 23 } }}
                        source={{ html: Engchecked ? recipeEn : recipeNl }} contentWidth={contentWidth} />
                    </View>
                  </View>
                }

              </View>
            </View>
          </ImageHeaderScrollView>
        )}
        {
          !this.state.loader &&
          <View style={{
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 10,
            // alignItems: "center",
            alignSelf: "center",
            // justifyContent: "center",
            width: "60%",
          }}>

            <TouchableOpacity
              onPress={() => {
                if (this.state.RecipeName == undefined || this.state.RecipeName == "") {
                  this.setState({
                    Visible: true
                  })
                } else {
                  this.addDailyActivityMeal('done')
                }
              }}
              style={{
                height: hp("5%"),
                width: "100%",
                backgroundColor: "#68bc45",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                borderRadius: 10,
                marginBottom: 5,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>
                {i18n.t('Addlog')}
              </Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }
}
const ProgressCircleComp = ({ percent, title, value }) => {
  return (
    <View style={{ flexDirection: 'column', marginLeft: "8%" }}>
      <ProgressCircle
        percent={percent}
        radius={hp("5%")}
        borderWidth={4}
        color={Colors.green}
        shadowColor="#F0F0F0"
        bgColor="#fff"
      >
        <Text
          style={styles.pgrCircle}
          numberOfLines={2}
        >
          {value}

        </Text>
        <Text
          style={styles.pgrCircle}>
          {"g"}
        </Text>
      </ProgressCircle>
      <Text style={styles.carbsText}>{title}</Text>
    </View>
  )
}
function mapStateToProps(state) {
  return {
    dailyActivityType: state.DAILY_ACTIVITY_TYPE.dailyActivityType,
    dailyActivityActive: state.DAILY_ACTIVITY_ACTIVE.dailyActivityActive,
    token: state.SESSION_KEY.sessionKey,
    RemainCal: state.REMAINING_CALORIES.remainCalories,
    languageget: state.LANGUAGE_TRANSLATE.languageget,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipesDetail);
