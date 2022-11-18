/* eslint-disable consistent-this */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import IconF from "react-native-vector-icons/FontAwesome5";
import HTML from "react-native-render-html";

import {
  ImageHeaderScrollView,
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Colors from '../../../Theme/Colors';
import ImagePicker from 'react-native-image-picker';
import { ListItem } from "react-native-elements";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Responsive from 'react-native-lightweight-responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/routers';
import i18n from '../../../../translation'
import RNFetchBlob from 'rn-fetch-blob';
import { API_URL, SERVER_URL } from "../../../Actions";
import { AppIcon } from '../../../Assets/Images';
import { ProgressView } from './ProgressView';

const DATAActivity = [
  {
    id: 1,
    title: 'Running',
    formulaValue: '',
    recentActivityCheck: true,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
  {
    id: 2,
    title: 'Walking',
    formulaValue: '',
    recentActivityCheck: false,
    date: false,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
  {
    id: 3,
    title: 'Biking',
    formulaValue: '',
    recentActivityCheck: false,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
  {
    id: 4,
    title: 'Swimming',
    formulaValue: '',
    recentActivityCheck: false,
    date: false,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
  {
    id: 5,
    title: 'Sexual Activity',
    formulaValue: '',
    recentActivityCheck: false,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
  {
    id: 6,
    title: 'Weight Lifting',
    formulaValue: '',
    recentActivityCheck: false,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },

  {
    id: 7,
    title: 'HIIT',
    formulaValue: '',
    recentActivityCheck: false,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
];



function ListItemRecentActivity({ item }) {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        marginBottom: '6%',
        marginTop: '6%',
      }}>
      <Image
        style={{ width: 20, height: 20, marginRight: '3%' }}
        source={item.image}
      />
      <View style={{}}>
        <Text style={{ fontSize: 15, color: '#000' }}>{item.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // image: {
  //   height: MAX_HEIGHT,
  //   width: Dimensions.get('window').width,
  //   alignSelf: 'stretch',
  //   resizeMode: 'cover',
  // },
  titleView: {
    fontSize: 20,
    marginTop: Responsive.height(20),
  },
  pgrCircle: {
    fontSize: hp('2%'),
    width: wp('20'),
    textAlign: 'center',
    color: Colors.green,
    fontWeight: '600',
  },
  name: {
    marginLeft: Responsive.width(5),
    color: '#000',
    fontWeight: '600',
    fontSize: 20,
  },
  infoName: {
    marginLeft: 0,
    color: '#000',
    fontWeight: '500',
    fontSize: Platform.OS == 'android' ? hp('1.9%') : hp('1.9%'),
    letterSpacing: 1,
  },
  infoTextName: {
    color: '#9E9F9D',
    fontSize: hp('1.3%'),
    fontWeight: '300',
    margin: '1.5%',
  },
  infoSection: {
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#cccccc',
  },
  section: {
    paddingLeft: Responsive.width(20),
    paddingRight: Responsive.width(20),
    paddingBottom: Responsive.width(20),
    //  borderBottomWidth: 6.5,
    shadowColor: 'red',
    borderBottomColor: '#cccccc',
    shadowOpacity: Platform.OS === 'android' ? 0.5 : 0,
  },
  lastSection: {
    shadowOpacity: Platform.OS === 'android' ? 0.5 : 0,
  },
  writtenSection: {
    height: Responsive.height(65),
    paddingLeft: Responsive.width(20),
    paddingRight: Responsive.width(20),
    paddingBottom: Responsive.width(20),
    paddingTop: Responsive.width(20),
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  writtenView: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: Responsive.height(40),
    width: Responsive.width(298),
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonContainer: {
    height: Responsive.height(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
    borderRadius: 5,
    margin: '5%',
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#000',
    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },
  },
  loginText: {
    color: 'white',
    fontSize: 17,
  },
  writtenSectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: Responsive.height(2),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: Responsive.height(10),
  },
  sectionContent: {
    fontSize: 18,
    textAlign: 'auto',
  },
  keywords: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  caleories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  keywordContainer: {
    marginTop: '2%',
  },
  feedReadTimeText: {
    color: Colors.green,
    fontSize: hp("1.8%"),
    fontWeight: "300",
    margin: "2%",
  },

  servingTextName: {
    color: '#9E9F9D',
    fontSize: 15,
    fontWeight: '300',
    marginTop: '4%',
    marginLeft: '2%',
  },
  carbsText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '300',
    margin: '2%',
    textAlign: 'center',
  },
  writtenSectionText: {
    color: '#9E9F9D',
    fontSize: 15,
    fontWeight: '300',
  },
  keyword: {
    fontSize: 14,
    color: '#000',
    backgroundColor: '#F3F3F3',
    padding: 10,
    marginLeft: Responsive.width(5),
    marginRight: Responsive.width(5),
  },

  caleorie: {
    fontSize: 13,
    color: '#000',
    backgroundColor: '#ffffff',
    padding: 8,
    marginLeft: Responsive.width(5),
    marginRight: Responsive.width(5),
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    height: 600,
  },
});
let crb = 0, ft = 0, prt = 0;

class EditProduct extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef(null);
    // const {calories , carbs, fats , proteins , image} = this.props?.route?.params?.data
    this.state = {
      showNavTitle: false,
      response: '',
      portion: 'full',
      ProductItem: '',
      heart: false,
      Engchecked: false,
      CarbsValue: 0,
      FatsValue: 0,
      loading: false,
      calories: 0,
      caloriesV: 0,
      RecipeCount: 0,
      typedefine: '',
      ProteinValue: 0,
      loader: false,
      data: {},
      isdevide: false,
      fats: 0,
      fatsV: 0,
      carbs: 0,
      carbsV: 0,
      value: 0,
      value1: 0,
      proteins: 0,
      proteinsV: 0,
      protein: "",
      avatarSource: '',
      smallPortionCheck: false,
      mediumPortionCheck: false,
      fullPortionCheck: false,
      item: '',
      addProduct: false,
      count: 1,
      recommended: 0,
      recipeData: [],
      Ingredients: [],
      IngredientsCopy: [],

      VCaloreis: 0,
      VFat: 0,
      VCarbs: 0,
      VProtein: 0,
    };
  }
  handleClick = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  findProducts = async (data) => {
    if (data.check == undefined) {
      return;
    }

    fetch(`https://api.myfitspot.com/api/ingredient/${data.check}`, {

      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': this.props.token,
      }
    }).then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          data: this.props?.route?.params?.data,
          calories: responseJson.data.value,
          caloriesV: responseJson.data.value,
          protein: responseJson.data.protein,
          proteinsV: responseJson.data.protein,
          fats: responseJson.data.fats,
          fatsV: responseJson.data.fats,
          carbs: responseJson.data.carbs,
          carbsV: responseJson.data.carbs,
          recommended: this.props?.route?.params?.data.recommended,
          value: 0
          // value: this.props?.route?.params?.data.value
          // value: this.props?.route?.params?.data.recommended
        })

        this.setState({
          carbs: parseFloat((responseJson.data.carbs / 100) * this.props?.route?.params?.data.value).toFixed(1),
          fats: parseFloat((responseJson.data.fats / 100) * this.props?.route?.params?.data.value).toFixed(1),
          protein: parseFloat((responseJson.data.protein / 100) * this.props?.route?.params?.data.value).toFixed(1),
          calories: parseFloat((responseJson.data.value / 100) * this.props?.route?.params?.data.value).toFixed(1),
          value: this.props?.route?.params?.data.value
        })
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  findRecipe(id) {


    const VCaloreis = this.props?.route?.params?.data.calories;
    const VFat = this.props?.route?.params?.data.fats;
    const VCarbs = this.props?.route?.params?.data.carbs;
    const VProtein = this.props?.route?.params?.data.proteins;
    const COUNT = parseFloat(this.props?.route?.params?.data.count)

    this.setState({
      VCaloreis: VCaloreis,
      VFat: VFat,
      VCarbs: VCarbs,
      VProtein: VProtein,
      // count: COUNT
    })

    fetch(`${API_URL}/recipe/${id}`, {

      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': `${this.props?.token}`
      }
    }).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson.status == false) {
          this.setState({ recipeData: [] })
          return;
        } else {

          this.setState({ recipeData: responseJson.data })

          this.setState({
            data: this.props?.route?.params?.data,

            // calories: this.props?.route?.params?.data.calories,
            calories: responseJson.data.totalCalorieSum,

            // protein: this.props?.route?.params?.data.proteins,
            protein: responseJson.data.totalProteinCalories,

            // fats: this.props?.route?.params?.data.fats,
            fats: responseJson.data.totalFatsCalories,

            // carbs: this.props?.route?.params?.data.carbs,
            carbs: responseJson.data.totalCarbsCalories,

            recommended: this.props?.route?.params?.data.recommended,
            value: this.props?.route?.params?.data.value
          })


          // this.setState({
          //   data: this.props?.route?.params?.data,
          //   calories: this.props?.route?.params?.data.calories,
          //   protein: this.props?.route?.params?.data.proteins,
          //   fats: this.props?.route?.params?.data.fats,
          //   carbs: this.props?.route?.params?.data.carbs,
          //   recommended: this.props?.route?.params?.data.recommended,
          //   value: this.props?.route?.params?.data.value
          // })

          const { params } = responseJson.data;

          let Ingred = [...responseJson.data.carbs, ...responseJson.data.fats, ...responseJson.data.protein, ...responseJson.data.fruits, ...responseJson.data.herbs, ...responseJson.data.vegetables]
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
        }

        if (!this.state.isdevide) {
          crb = this.state.carbs / 2,
            ft = this.state.fats / 2,
            prt = this.state.protein / 2,
            this.setState({
              isdevide: true
            })
        }

        // alert(this.state.carbs + " : : " + crb)

        this.setState({
          count: COUNT,
          carbs: this.state.carbs * COUNT,
          fats: this.state.fats * COUNT,
          protein: this.state.protein * COUNT
        }, () => {
          this.Incermental(COUNT)
        })

      })
      .catch((error) => {
        console.log(error)
      })
  }

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

  componentDidMount() {

    if (this.props?.route?.params?.data?.activeStatus == 3) {

      this.setState({
        data: this.props?.route?.params?.data,
        calories: this.props?.route?.params?.data.calories == 0 ? 1 : this.props?.route?.params?.data.calories,
        caloriesV: this.props?.route?.params?.data.calories == 0 ? 1 : this.props?.route?.params?.data.calories,
        protein: this.props?.route?.params?.data.proteins == 0 ? 1 : this.props?.route?.params?.data.proteins,
        proteinsV: this.props?.route?.params?.data.proteins == 0 ? 1 : this.props?.route?.params?.data.proteins,
        fats: this.props?.route?.params?.data.fats == 0 ? 1 : this.props?.route?.params?.data.fats,
        fatsV: this.props?.route?.params?.data.fats == 0 ? 1 : this.props?.route?.params?.data.fats,
        carbs: this.props?.route?.params?.data.carbs == 0 ? 1 : this.props?.route?.params?.data.carbs,
        carbsV: this.props?.route?.params?.data.carbs == 0 ? 1 : this.props?.route?.params?.data.carbs,
        recommended: this.props?.route?.params?.data.recommended,
        value: 0,
      })
    }

    this.findProducts(this.props?.route?.params?.data);

    if (this.props?.languageget === 'en') {
      this.setState({
        Engchecked: true
      })
    } else {
      this.setState({
        Engchecked: false
      })
    }

    // if (this.props.route.params.data.recipe == null || this.props.route.params.data.recipe == 'null') {
    //   this.setState({
    //     data: this.props?.route?.params?.data,
    //     calories: this.props?.route?.params?.data.calories,
    //     protein: this.props?.route?.params?.data.proteins,
    //     fats: this.props?.route?.params?.data.fats,
    //     carbs: this.props?.route?.params?.data.carbs,
    //     recommended: this.props?.route?.params?.data.recommended,
    //     value: this.props?.route?.params?.data.recommended
    //   })
    //   return;
    // }
    // alert(JSON.stringify(this.props?.route?.params?.data))

    this.findRecipe(this.props?.route?.params?.data.recipe == null || this.props?.route?.params?.data.recipe == "null" ? '123asd' : this.props?.route?.params?.data.recipe._id);
    // this.setState({
    //   data: this.props?.route?.params?.data,
    //   calories: this.props?.route?.params?.data.calories,
    //   protein: this.props?.route?.params?.data.proteins,
    //   fats: this.props?.route?.params?.data.fats,
    //   carbs: this.props?.route?.params?.data.carbs,
    //   recommended: this.props?.route?.params?.data.recommended,
    //   value: this.props?.route?.params?.data.value
    //   // value: this.props?.route?.params?.data.recommended
    // })


  }


  // componentWillUnmount() {
  //   this._unsubscribe();
  // }
  // submit(v) {
  //   this.setState(
  //     {
  //       loader: true,
  //     },
  //    async () => {
  //     await RNFetchBlob.fetch(
  //         'Get',
  //         API_URL + '/user/activity/recipe/get/' + v ,
  //         {
  //           Accept: 'application/json, text/plain, */*',
  //           'Content-Type': 'application/json',
  //           'auth-token': this.props.token,
  //         },
  //       ).then(res => {
  //         const data = JSON.parse(res.data);
  //         this.setState({
  //           loader:false
  //         })
  //         if (data?.success === true) {
  //           console.log("mnbwavfanmbs d", data?.data);
  //           this.setState({
  //             data:data?.data,
  //             clr: Math.ceil(data?.data?.calories) ?? 0,
  //             avatarSource:data?.data?.image,
  //           })
  //         }
  //       });
  //     },
  //   );
  // }
  checkDailyActivity() {
    try {
      var response;
      var item;
      if (this.props?.dailyActivityType === 'breakfast') {
        response = this.props?.breakfastDailyResponse;
        item = this.props?.breakfastDailyActivity;
      } else if (this.props?.dailyActivityType === 'lunch') {
        response = this.props?.lunchDailyResponse;
        item = this.props?.lunchDailyActivity;
      } else if (this.props?.dailyActivityType === 'dinner') {
        response = this.props?.dinnerDailyResponse;
        item = this.props?.dinnerDailyActivity;
      } else if (this.props?.dailyActivityType === 'snack') {
        response = this.props?.snackDailyResponse;
        item = this.props?.snackDailyActivity;
      }
      this.setState({
        response: response,
        item: item,
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  async updateDailyActivityMeal() {
    const dat = await AsyncStorage.getItem('todaydate')
    const { data } = this.state

    const valuedata = {
      type: data?.type,
      portion: this.state.portion,
      recipeName: data?.recipeName,
      recipeNameNl: data?.recipeNameNl,
      activeStatus: data?.activeStatus,
      image: data?.image,
      product: data._id,
      date: dat,
      calories: this.state.calories * this.state.count,
      proteins: this.state.protein,
      fats: this.state.fats,
      carbs: this.state.carbs,
      recipe: this.state.recipeData.length == 0 ? data._id : data.recipe._id,
      // recipe: data.recipe._id,
      recommended: this.state.recommended ?? 0,
      value: this.props?.route?.params?.data.recipe == null ? parseInt(this.state.value) : Math.ceil(parseInt(this.state.fats + this.state.carbs + this.state.protein) * 0.5),
      count: this.state.count
    };
    this.setState(
      {
        loader: true,
      },
      async () => {
        await RNFetchBlob.fetch(
          'PUT',
          'https://api.myfitspot.com/api/user/activity/recipe/update/' + data._id,
          {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*',
            'auth-token': this.props.token,
          },
          JSON.stringify(valuedata)
        ).then(res => {
          const data = JSON.parse(res.data);

          this.setState({
            loader: false
          })
          if (data?.success === true) {
            this.props.navigation.navigate("AddProductMeal", {
              RecipeType: data?.type,
            });
          }
        });
      },
    );

  }
  addDailyActivityMeal() {
    const { blogItem } = this.state;
    // alert('Daily');
    let recipename = [];
    let recipemeal = [];
    let typedef = blogItem?.recipeType;
    let typedefmeal = blogItem?.mealType;
    if (blogItem === null || blogItem === undefined) {
      recipemeal.push('Vegetarian');
    } else {
      for (let i of typedef) {
        recipename.push(i);
      }
      for (let i of typedefmeal) {
        recipemeal.push(i);
      }
    }
    let data = {
      type: this.props.dailyActivityType,
      portion: this.state.portion,
      recipeId: blogItem._id,
      calories: this.state.calories,
      recipe: {
        featureImage: {
          l:
            blogItem?.featureImage?.l ??
            'public/images_data/l-AaDVczhKWisqpEv61.webp',
          m:
            blogItem?.featureImage?.m ??
            'public/images_data/m-AaDVczhKWisqpEv61.webp',
        },
        mealType: recipemeal,
        recipeType: recipename,
        _id: blogItem._id ?? '6047b0b61f84ac04e37b7260',
        nameEn: blogItem?.nameEn ?? 'Meal Bread',
        nameNl: blogItem?.nameNl ?? 'Meal bread type',
      },
    };
    const _this = this;
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
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: 'HomeMain' }],
                }),
              );
            }
          });
      },
    );

    let Neut = {
      carbs: parseFloat(this.state?.carbs).toFixed(1),
      protein: parseFloat(this.state?.protein).toFixed(1),
      fats: parseFloat(this.state.fats).toFixed(1),
    };
    AsyncStorage.setItem('Neutronts', JSON.stringify(Neut));
  }

  openOnlyLibrary = () => {
    const options = {
      //  title: 'Select Profile Image',
      //  maxWidth: 400,
      //  maxHeight: 600,
      quality: 0.5,
      mediaType: 'photo',
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // let photoName =
        //   response.fileName === undefined ? 'abc.jpg' : response.fileName;
        // let source = {
        //   uri: response.uri,
        // };
        // const _this = this;
        // console.log("mdbsnvjshbdfxjv", source);
        this.setState({
          avatarSource: response?.uri,
        });
      }
    });
  };

  render() {
    const MIN_HEIGHT = 50;
    const { carbs, fats, protein, data, value, value1, recommended, isdevide, Ingredients, Engchecked } = this?.state;
    const contentWidth = Dimensions.get('window').width;
    const MAX_HEIGHT = 280;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <KeyboardAvoidingView behavior={"position"}>
          <ScrollView>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#eeeeee', justifyContent: 'center' }}>
              <TouchableOpacity style={{ width: 50, alignSelf: 'flex-start' }} onPress={() => this.props.navigation.goBack(null)} >
                <Image
                  source={require('./../../../Assets/Today/backButton.png')}
                  style={{
                    width: 50,
                    tintColor: 'black',
                    height: 50,
                    marginTop: 0, marginBottom: 10
                  }}
                />
              </TouchableOpacity>
            </View>

            <ImageHeaderScrollView
              maxHeight={MAX_HEIGHT}
              minHeight={MIN_HEIGHT}
              bounces={false}
              maxOverlayOpacity={0.8}
              minOverlayOpacity={0.1}
              fadeOutForeground
              renderHeader={() => (
                <View>
                  <ImageBackground
                    source={{ uri: data?.image ?? `https://assets.dilorenzo.be/images/Alcohol-advocaat.jpg` }}
                    style={{
                      height: MAX_HEIGHT,
                      width: Dimensions.get('window').width,
                      alignSelf: 'stretch',
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              )}
              renderFixedForeground={() => (
                <Animatable.View
                  style={{
                    height: MIN_HEIGHT,
                    justifyContent: 'flex-start',
                    opacity: 0,
                  }}
                  ref={navTitleView => {
                    this.navTitleView = navTitleView;
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      backgroundColor: 'white',
                      shadowColor: '#000',
                      shadowOpacity: 0.8,
                      shadowRadius: 10,
                      elevation: 20,
                      shadowOffset: {
                        height: 10,
                        width: 8,
                      },
                    }}>
                    <IconM
                      name="arrow-back"
                      size={25}
                      color={'#000'}
                      style={{ marginTop: 30, marginLeft: 30 }}
                    />
                  </View>
                </Animatable.View>
              )}
              renderForeground={() => (
                <View
                  style={{
                    flex: 1,
                    marginTop: Responsive.height(30),
                    flexDirection: 'row',
                  }}>
                </View>
              )}>

              <View style={{ paddingHorizontal: Platform.OS == 'android' ? '3%' : '4%' }}>
                <View style={{ marginTop: 20, marginRight: 10, marginLeft: 10, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center' }}>
                  <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>{this.state.Engchecked == true ? data?.recipeName : data?.recipeNameNl}</Text>
                </View>

                {this.state.recipeData.length == 0 ? null :
                  <View style={{ marginTop: 10, padding: 10, marginRight: 10, marginLeft: 10, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center' }}>
                    <View>
                      <Text style={{
                        color: 'gray', fontSize: 16, marginTop: 5, marginLeft: 5
                      }}>{this.state.recipeData.timetoPrepare} <Text style={{ color: Colors.green }}>{i18n.t('minute')}</Text>  |  {parseFloat(this.state.recipeData.totalCalorieSum * this.state.count).toFixed(0)}<Text style={{ color: Colors.green }}> {i18n.t('calperserve')}</Text></Text>

                      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.props.navigation.navigate('UserProfile', {
                        _id: this.state.recipeData.user?._id,
                        token: this.props?.token

                      })}>
                        <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center', }}>
                          <Image source={this.state.recipeData.user?.profilePic ? { uri: SERVER_URL + this.state.recipeData.user?.profilePic } : require('../../../Assets/defaultimage.png')} style={{ width: 45, height: 45, borderRadius: 45 / 2 }} />
                          <View style={{
                            paddingStart: wp(2)
                          }}>
                            <Text style={{ fontSize: 17, color: 'gray' }}>
                              {i18n.t('createdBy')}
                            </Text>
                            <Text style={{ fontSize: 17 }}>
                              {this.state.recipeData.user?.name}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>

                      <View style={{ flexDirection: "row", flexWrap: 'wrap', marginTop: 10 }}>
                        {
                          this.state.recipeData.specification?.map(item => {
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
                          this.state.recipeData.mealType?.map(item => {
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
                }

                <View style={{ marginTop: 10, padding: 10, marginRight: 10, marginLeft: 10, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center' }}>

                  <View style={styles.section}>
                    <View style={styles.infoSection}>
                      <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
                        <View style={{ width: '60%' }}>
                          <Text style={styles.infoName}>{i18n.t('NutritionInfo')}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                          <Text style={[styles.caleorie, { fontSize: 20, color: `#9E9F9D`, alignSelf: 'flex-end', marginTop: -10 }]}>{`${parseFloat(this.state?.calories * this.state.count).toFixed(0) ?? 0}`} <Text style={{ color: Colors.green }}>Kcal</Text></Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <ProgressView protein={parseFloat(this.state?.carbs).toFixed(1)} title={i18n.t('CARBS')} />
                        <ProgressView protein={parseFloat(this.state?.protein).toFixed(1)} title={i18n.t('PROTEIN')} />
                        <ProgressView protein={parseFloat(this.state?.fats).toFixed(1)} title={i18n.t('FAT')} />
                      </View>
                    </View>
                  </View>

                </View>

                {this.state.recipeData.length == 0 ?

                  <View style={{ marginTop: 10, padding: 10, marginRight: 10, marginLeft: 10, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center' }}>
                    <View>
                      <View style={{ height: hp(5), borderRadius: 20, borderWidth: 1, width: wp(80), alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TextInput keyboardType='phone-pad' value={value.toString() == 0 ? "" : value.toString()} ref={this.inputRef} onChangeText={(v) => {

                          this.setState({
                            carbs: parseFloat((this.state.carbsV / 100) * v).toFixed(1),
                            fats: parseFloat((this.state.fatsV / 100) * v).toFixed(1),
                            protein: parseFloat((this.state.proteinsV / 100) * v).toFixed(1),
                            calories: parseFloat((this.state.caloriesV / 100) * v).toFixed(1),
                            value: v
                          })
                        }}
                          placeholder={'0'}
                          placeholderTextColor={'gray'}
                          style={{ width: wp(60), height: hp(8), color: 'black' }} />
                        <Text style={{ fontSize: 18, textAlign: 'center', marginTop: -8 }}>g</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          const v = this.state.recommended
                          this.setState({
                            value: this.state.recommended,
                            calories: parseFloat((this.state.caloriesV / 100) * v).toFixed(1),
                            carbs: parseFloat((this.state.carbsV / 100) * v).toFixed(1),
                            fats: parseFloat((this.state.fatsV / 100) * v).toFixed(1),
                            protein: parseFloat((this.state.proteinsV / 100) * v).toFixed(1),
                          })
                        }}
                        style={{ flexDirection: 'row', paddingHorizontal: widthPercentageToDP(3), height: heightPercentageToDP(5), marginVertical: heightPercentageToDP(2), borderRadius: 20, borderWidth: 1, width: widthPercentageToDP('50'), justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Image source={AppIcon?.iconLogo} resizeMode={'contain'} style={{ width: 15, height: 20, marginRight: '2%' }} />
                        <Text numberOfLines={2} style={{ fontWeight: '500', fontSize: 14 }}>{i18n.t('Portion')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  :
                  <View style={{ marginTop: 10, padding: 10, marginRight: 10, marginLeft: 10, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center' }}>
                    <View style={[styles.lastSection, { padding: 20, marginTop: -40 }]}>
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

                      {this.state.recipeData.recipeEn == '' || this.state.recipeData.recipeNl == '' ?
                        null
                        :
                        <View>
                          <View style={{ marginVertical: hp(2.5) }}>
                            <Text style={styles.infoName}>{i18n.t('Description')}</Text>
                          </View>
                          <View style={{ paddingHorizontal: wp(5) }}>
                            <HTML source={{ html: Engchecked ? this.state.recipeData.recipeEn : this.state.recipeData.recipeNl }} contentWidth={contentWidth} />
                          </View>
                        </View>
                      }
                    </View>
                  </View>
                }
              </View>


              <View style={styles.lastSection}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    marginTop: '7%',
                    marginBottom: Platform.OS === 'android' ? 10 : 0,
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      alignContent: 'center',
                      width: '100%',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.updateDailyActivityMeal()
                      }
                      style={{
                        height: Responsive.height(35),
                        width: Responsive.width(200),
                        backgroundColor: Colors.green,
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                      }}>
                      <Text style={{ color: '#ffffff', fontSize: 18 }}>
                        {i18n.t('updateproduct')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </ImageHeaderScrollView>
          </ScrollView>


        </KeyboardAvoidingView>
      </SafeAreaView >
    );
  }
}
function mapStateToProps(state) {
  return {
    dailyActivityType: state.DAILY_ACTIVITY_TYPE?.dailyActivityType,
    dailyActivityActive: state.DAILY_ACTIVITY_ACTIVE?.dailyActivityActive,
    token: state.SESSION_KEY?.sessionKey,
    breakfastDailyResponse:
      state.BREAKFAST_DAILY_RESPONSE?.breakfastDailyResponse,
    lunchDailyResponse: state.LUNCH_DAILY_RESPONSE?.lunchDailyResponse,
    dinnerDailyResponse: state.DINNER_DAILY_RESPONSE?.dinnerDailyResponse,
    snackDailyResponse: state.SNACK_DAILY_RESPONSE.snackDailyResponse,
    languageget: state.LANGUAGE_TRANSLATE.languageget,
    gender: state.UPDATE_GENDER.updateGender,
    breakfastDailyActivity:
      state.BREAKFAST_DAILY_ACTIVITY?.breakfastDailyActivity,
    lunchDailyActivity: state.LUNCH_DAILY_ACTIVITY?.lunchDailyActivity,
    dinnerDailyActivity: state.DINNER_DAILY_ACTIVITY?.dinnerDailyActivity,
    snackDailyActivity: state.SNACK_DAILY_ACTIVITY?.snackDailyActivity,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
  // addNeutrients;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProduct);
