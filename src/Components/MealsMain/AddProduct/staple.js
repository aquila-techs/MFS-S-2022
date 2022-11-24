import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  SectionList,
  StatusBar,
  FlatList,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Clipboard,
  Keyboard
} from 'react-native';
import styles from './Styles';

import { ActionCreators, SERVER_URL } from '../../../Actions';
import LottieView from 'lottie-react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native';
import i18n from '../../../../translation'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Icon, Overlay, ListItem, Avatar, Image } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import Colors from '../../../Theme/Colors';
import { Alert } from 'react-native';
import {
  WheelPicker
} from "react-native-wheel-picker-android";
import { AppIcon } from '../../../Assets/Images';
const calogram = []
const unit = ["g"]

const wheelPickerData = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday"
];

class Staple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        { id: 1, titleN: 'Groenten', title: 'Vegetable', value: 'vegetables' },
        { id: 1, titleN: 'Fruit', title: 'Fruit', value: 'fruits' },
        { id: 1, titleN: 'Eiwit', title: 'Protein', value: 'protein' },
        { id: 1, titleN: 'KLH', title: 'Carb', value: 'carbs' },
        { id: 1, titleN: 'Vetten', title: 'Fat', value: 'fats' },
        { id: 1, titleN: 'Samengestelde-maaltijden', title: 'Composed-meals', value: 'composedmeals' },
        { id: 1, titleN: 'Alcoholvrije-dranken', title: 'Non-alcoholic-drinks', value: 'nonalcoholicdrinks' },
        { id: 1, titleN: 'Alcoholische-dranken', title: 'Alcoholic-beverages', value: 'alcoholicbeverages' },
        { id: 1, titleN: 'Kruid', title: 'Herb', value: 'herbs' },
      ],
      productList: [],
      productListSearch: [],
      productListSearchSet: [],

      selectedItem: 0,
      showMore: false,
      index: 0,
      loader: false,
      MyLoader: false,
      search: false,
      avatarSource: '',
      inputv: '',
      avatarData: '',
      name: '',
      page: 1,
      selectedMenu: '',
      selectedMenuPlaceHolder: '',
      selectedMenuPlaceHolderN: '',

      obj: {},
      i: 0,
      description: '',
      value: '',
      v: '',
      cal: 0,
      visible: false,
      pageLoad: false,
      caleories: 0,
      // data: this.props.productsList,
      data: [],
      imageshow: false,
      Engchecked: this.props?.languageget === 'en' ? true : false,
      arraydata: [],
      TitleData: [],
      titlecopy: [],
      itemdata: {},
      calvalue: '',
      orgdata: [],
      toast: false,
      wheel: false,
      calunit: 0,
      cl: 0,
      ft: 0,
      pt: 0,
      cr: 0,
      totalkcl: 0,
      fat: 0,
      pro: 0,
      carb: 0,
      renderData: 10,
      alldata: [],
      alldatacopy: [],
      productListForSearch: [],
      UserRecipe: "",
      msgpopupproduct: false,
      isLoading: false
    };
  }

  async addDailyActivity(reqData, v) {
    try {

      const { gender } = this.props
      const { obj } = this.state
      AsyncStorage.setItem('DailyActivity', JSON.stringify(reqData));
      const dat = await AsyncStorage.getItem('todaydate')
      const DATESELECTED = await AsyncStorage.getItem('DATESELECTED')
      const _this = this;
      const data = {
        type: this.props.dailyActivityType,
        portion: 'full',
        recipeName: reqData?.nameEn,
        recipeNameNl: reqData?.nameNl,
        activeStatus: 1,
        image: `${reqData?.imageUrl}`,
        product: reqData._id,
        calories: this.state.cl === 0 ? 1 : this.state.cl,
        recipe: reqData._id,
        date: DATESELECTED,
        proteins: this.state.pt ?? 0,
        fats: this.state.ft ?? 0,
        carbs: this.state.cr ?? 0,
        value: parseInt(this.state.cal),
        check: reqData._id,
        recommended: gender === 'M' ? obj?.recommendMen ?? 0 : obj?.recommendWomen ?? 0
      };
      this.setState(
        {
          MyLoader: true,
        },
        async () => {
          await RNFetchBlob.fetch(
            'POST',
            'https://api.myfitspot.com/api/user/activity/recipe/or/product/create',
            {
              'Content-Type': 'application/json',
              'auth-token': this.props.token,
            },
            JSON.stringify(data)
          ).then(async (res) => {

            const data = JSON.parse(res.data);
            this.setState({ MyLoader: false })
            if (data?.success === true) {
              await AsyncStorage.setItem('lision', "false")
              _this.props.navigation.navigate("AddProductMeal", {
                RecipeType: this.props.dailyActivityType?.toLowerCase(),
              });
            }
          });
        },
      );

    } catch (error) {
      console.log(error)
    }
  }

  getProducts = async (item, index, count) => {

    const loadPage = count == undefined ? 1 : count


    this.setState({ MyLoader: loadPage == 1 ? true : false, isLoading: true, page: loadPage })
    this.setState({ i: index == undefined ? 0 : index })
    const name = item == undefined ? "vegetables" : item

    const page = loadPage;
    const limit = item == 'protein' ? 1000 : item == 'composedmeals' ? 200 : 10

    fetch(`https://api.myfitspot.com/api/ingredient/all/${name}?page=${page}&limit=${limit}`, {

      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': this.props.token,
      }
    }).then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          productList: this.state.productList.concat(responseJson.data)
        })
        this.setState({ MyLoader: false, isLoading: false, pageLoad: false })

      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  async componentDidMount() {

    this.getProducts()

    try {
      const recipe = await AsyncStorage.getItem('UserRecipe');
      this.setState({ UserRecipe: recipe == null ? 'null' : recipe })

      if (this.props?.languageget === 'en') {
        this.setState({
          Engchecked: true
        })
      } else {

        this.setState({
          Engchecked: false
        })
      }


    } catch (error) {
      console.log(error)
    }
    this.setState({ loader: false })
  }

  componentWillUnmount() {

  }

  DataFilter = (value) => {
    this.props.productsList?.filter(item => {
      if (this.props?.languageget === 'en') {
        if (item?.title === value) {
          this.setState({
            titlecopy: item?.title,
            orgdata: item?.data
          })

        }
      } else {
        if (item?.titleNl === value) {
          this.setState({
            titlecopy: item?.titleNl,
            orgdata: item?.data
          })
        }
      }

    })
  }

  Search = () => {

    this.setState({ MyLoader: true })
    const name = this.state.selectedMenu == '' ? "vegetables" : this.state.selectedMenu
    const page = 1;
    const limit = 10000

    fetch(`https://api.myfitspot.com/api/ingredient/all/${name}?page=${page}&limit=${limit}`, {

      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': this.props.token,
      }
    }).then((response) => response.json())
      .then((responseJson) => {

        this.setState({})
        this.setState({
          productListSearchSet: responseJson.data,
          MyLoader: false,
          search: true,
        })
        this.textInput.focus();

      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });

  }

  SearchKeyword = (text) => {

    const key = text.charAt(0).toUpperCase() + text.slice(1);

    fetch(`https://api.myfitspot.com/api/ingredient/all/findProduct/${key}`, {

      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': this.props.token,
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          productListSearch: responseJson.data
        })

      })
      .catch((error) => {
        console.log(error)
      });

  }

  getDetail = (item) => {
    let newarray = []
    for (const property in item) {
      let obj = {
        id: Math.random()?.toString().substring(5),
        name: property,
        value: item[property]
      }
      newarray.push(obj)
    }
    this.setState({
      arraydata: newarray
    })
  }

  Calculte = () => {
    calogram.splice(0)
    for (let index = 0; index <= 999; index++) {
      calogram.push(`${index}`)
    }

  }

  renderdata = ({ item, index }) => {

    if (this.state.UserRecipe == 'null') {
      return (
        <ListItem
          onPress={() => {

            this.setState({
              toast: true,
              itemdata: item,
              obj: item,
              totalkcl: item?.value,
              fat: item?.fats,
              pro: item?.protein,
              carb: item?.carbs
            })
            this.Calculte()
          }}

          key={index}
          bottomDivider
          style={{ backgroundColor: 'white', alignItems: 'center' }}>

          <Avatar
            source={{ uri: `${item?.imageUrl ?? `assets.dilorenzo.be/images/Alcohol-advocaat.jpg`}` }}
            rounded
            containerStyle={{ borderWidth: 1, backgroundColor: 'gray' }}
            PlaceholderContent={<ActivityIndicator color={'black'} />}
          />
          <ListItem.Content>
            <ListItem.Title
              numberOfLines={1}
              style={{ fontSize: 15, fontWeight: '500', width: widthPercentageToDP(65) }}>
              {this.props?.languageget === 'en' ? item?.nameEn : item?.nameNl}
            </ListItem.Title>
            <ListItem.Subtitle
              numberOfLines={1}
              style={{
                fontSize: 15, fontWeight: '500',
                width: widthPercentageToDP(65)
              }}>
              {item?.value} kcal
            </ListItem.Subtitle>
          </ListItem.Content>
          <View style={{ position: 'absolute', right: 20 }}>
            <TouchableOpacity onPress={() => {
              this.Calculte(item?.value)
              this.setState({
                toast: true,
                itemdata: item,
                obj: item,
                totalkcl: item?.value,
                fat: item?.fats,
                pro: item?.protein,
                carb: item?.carbs
              })
            }
            }>
              <Image
                source={require('./../../../Assets/Today/addButton.png')}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </TouchableOpacity>
          </View>
        </ListItem>
      )
    } else {
      if (item.productType[0] == this.state.UserRecipe || item.productType[1] == this.state.UserRecipe || item.productType[2] == this.state.UserRecipe) {
        return (
          <View>
            <ListItem
              onPress={() => {
                this.setState({
                  toast: true,
                  itemdata: item,
                  obj: item,
                  totalkcl: item?.value,
                  fat: item?.fats,
                  pro: item?.protein,
                  carb: item?.carbs
                })
                this.Calculte()
              }}
              key={index}
              bottomDivider
              style={{ backgroundColor: 'white', alignItems: 'center' }}>

              <Avatar
                source={{ uri: `${item?.imageUrl ?? `assets.dilorenzo.be/images/Alcohol-advocaat.jpg`}` }}
                rounded
                containerStyle={{ borderWidth: 1, backgroundColor: 'gray' }}
                PlaceholderContent={<ActivityIndicator color={'black'} />}
              />
              <ListItem.Content>
                <ListItem.Title
                  numberOfLines={1}
                  style={{ fontSize: 15, fontWeight: '500', width: widthPercentageToDP(65) }}>
                  {this.props?.languageget === 'en' ? item?.nameEn : item?.nameNl}
                </ListItem.Title>
                <ListItem.Subtitle
                  numberOfLines={1}
                  style={{
                    fontSize: 15, fontWeight: '500',
                    width: widthPercentageToDP(65)
                  }}>
                  {item?.value} kcal
                </ListItem.Subtitle>
              </ListItem.Content>
              <View style={{ position: 'absolute', right: 20 }}>
                <TouchableOpacity onPress={() => {
                  this.Calculte()
                  this.setState({
                    toast: true,
                    itemdata: item,
                    obj: item,
                    totalkcl: item?.value,
                    fat: item?.fats,
                    pro: item?.protein,
                    carb: item?.carbs
                  })
                }
                }>
                  <Image
                    source={require('./../../../Assets/Today/addButton.png')}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </ListItem>
          </View>
        )
      }

    }

  }

  renderProducts = ({ item, index }) => {

    return (
      item.productType[0] == this.state.UserRecipe || item.productType[1] == this.state.UserRecipe || item.productType[2] == this.state.UserRecipe ?
        <TouchableOpacity onPress={() => {
          this.setState({ search: false, toast: true, itemdata: item, obj: item, totalkcl: item?.value, fat: item?.fats, pro: item?.protein, carb: item?.carbs })
          this.Calculte()
        }} style={styles.productItemWrap}>
          <View style={styles.productItemSubWrap1}>
            <Image style={styles.productItemIMG} source={{ uri: `${item?.imageUrl ?? `assets.dilorenzo.be/images/Alcohol-advocaat.jpg`}` }} />
          </View>
          <View style={styles.productItemSubWrap2}>
            <Text numberOfLines={1} style={styles.productItemTitle}>{this.props?.languageget === 'en' ? item?.nameEn : item?.nameNl}</Text>
            <Text style={styles.productItemSubTitle}>{item?.value} <Text style={{ color: Colors.green }}>kcal</Text></Text>
          </View>
          <View style={styles.productItemSubWrap3}>
            <Image
              source={require('./../../../Assets/Today/resources-04.png')}
              style={styles.productItemIcon}
            />
          </View>
        </TouchableOpacity>
        : null
    )
  }

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onItemSelected = selectedItem => {
    this.setState({ selectedItem });
  };

  close() {
    try {
      this.setState({
        wheel: false,
        cal: 0,
        cl: Math.ceil(0 * 0),
        cr: Math.ceil(0 * 0),
        ft: Math.ceil(0 * 0),
        pt: Math.ceil(0 * 0),
      })
      this.setState({
        toast: false
      })
    } catch (error) {
      console.log(error)
    }

  }


  prev = async () => {
    const count = this.state.page - 1
    const menu = this.state.selectedMenu == '' ? 'vegetables' : this.state.selectedMenu
    const index = this.state.i
    this.getProducts(menu, index, count);
  }

  next = async () => {
    const count = this.state.page + 1
    const menu = this.state.selectedMenu == '' ? 'vegetables' : this.state.selectedMenu
    const index = this.state.i
    this.getProducts(menu, index, count);
  }

  onClickCategory = async (item, index, title, titleN) => {
    const Placeholder = this.state.Engchecked == true ? title : titleN
    this.setState({ productList: [] })
    this.setState({ selectedMenu: item, selectedMenuPlaceHolder: Placeholder })
    this.getProducts(item, index)
  }

  renderFooter = () => {
    return (
      this.state.isLoading ?
        <View style={{ marginTop: 10, paddingBottom: 10, alignItems: 'center', backgroundColor: '#ffffff' }}>
          <ActivityIndicator color={Colors.primary} animating={true} size={'large'} />
        </View> : null
    )
  }

  render() {

    const { navigate } = this.props.navigation;
    const { gender } = this.props
    const { data, visible, obj, arraydata, toast, inputv, itemdata, cal, wheel, v } = this.state

    const { Engchecked, cl, ft, cr, pt, totalkcl, fat, pro, carb } = this.state

    let total = totalkcl / 100
    let totalcarb = carb / 100
    let totalfat = fat / 100
    let totalpro = pro / 100

    if (this.state.MyLoader == true) {
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
      <SafeAreaView style={[styles.container]}>

        <StatusBar
          hidden={false}
        />
        {
          visible && <Overlay visible={visible} onBackdropPress={() => {
            this.setState({
              visible: false
            })
          }} >
            <View style={{ width: widthPercentageToDP(90), height: '60%', }}>
              <View style={{
                borderWidth: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', width: heightPercentageToDP(15), height: heightPercentageToDP(15), borderRadius: heightPercentageToDP(15) / 2
              }}>
                <Avatar
                  source={{ uri: `${obj?.imageUrl ?? `assets.dilorenzo.be/images/Alcohol-advocaat.jpg`}` }}
                  rounded
                  containerStyle={{ borderWidth: 1, backgroundColor: 'gray' }}
                  PlaceholderContent={<ActivityIndicator color={'black'} />}
                />
                {/* <Image PlaceholderContent={<ActivityIndicator />} placeholderStyle={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', top: heightPercentageToDP(6.5) }} source={{ uri: `https://${obj?.imageUrl}` }} containerStyle={{ width: heightPercentageToDP(15), height: heightPercentageToDP(15), }} /> */}
              </View>
              <Text style={{ paddingTop: '2%', fontSize: 18, textAlign: 'center' }}>
                {this.props?.languageget === 'en' ? obj?.nameEn : obj?.nameNl}
              </Text>
              <View style={{ paddingTop: '10%' }}>
                <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: '2%' }}>
                  {'Ingregients'}
                </Text>
                {
                  arraydata?.length === 0 ? <Text>{"This product have no Ingredients"}</Text> :
                    <View style={{ paddingVertical: '5%' }}>
                      <FlatList
                        data={arraydata}
                        horizontal
                        contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row', width: widthPercentageToDP(90) }}
                        renderItem={({ item, index }) => {
                          return (
                            <View style={{ backgroundColor: 'black', margin: 5, borderRadius: 5 }} key={item?.id}>
                              <Text style={{ padding: 8, color: 'white', fontVariant: 'small-caps' }}>
                                {`${item?.name}  ${item?.value}`}
                              </Text>
                            </View>
                          )
                        }} />
                    </View>
                }
                <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: '2%' }}>
                  {'Product Type'}
                </Text>
                {
                  <View style={{ paddingTop: '5%' }}>
                    <FlatList
                      data={obj?.productType}
                      horizontal
                      contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row', width: widthPercentageToDP(90) }}
                      renderItem={({ item, index }) => {
                        return (
                          <View style={{ backgroundColor: 'black', margin: 5, borderRadius: 5 }} key={index}>
                            <Text style={{ padding: 8, color: 'white', }}>
                              {`${item}`}
                            </Text>
                          </View>
                        )
                      }} />
                  </View>
                }
              </View>
            </View>
          </Overlay>
        }
        {
          this.state.loader && (
            <Overlay overlayStyle={{
              width: widthPercentageToDP(30),
              height: heightPercentageToDP(15),
              justifyContent: 'center',
              alignItems: 'center',
            }} isVisible={this.state.loader}>
              <ActivityIndicator color={'rgba(128,128,128, 0.5)'} size={'large'} />
            </Overlay>
          )
        }

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 0, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', marginRight: 10, marginLeft: 10 }}>
          <View style={{ width: '15%', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack(null)}>
              <Image
                source={require('./../../../Assets/Today/backButton.png')}
                style={{
                  width: 50,
                  tintColor: 'black',
                  height: 50,
                  marginTop: -5
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: '70%', justifyContent: 'center' }}>
            {/* Search Bar Start */}
            <TouchableOpacity onPress={() => this.Search()} style={{ flexDirection: 'row', height: heightPercentageToDP(5), borderRadius: 10, alignItems: 'center' }}>
              <Text style={{ width: '90%' }}>

                {
                  this.state.v == '' ?
                    `${i18n.t('SearchIn')}`
                    :
                    this.state.v
                }
              </Text>
              {/* <TextInput value={this.state.v} style={{ width: '90%', height: '100%', color: 'black', marginTop: 4 }}
                editable={false}
                placeholder={`Search in ${this.state.selectedMenuPlaceHolder == "" ? "Vegetable" : this.state.selectedMenuPlaceHolder}`}
                onChangeText={(e) => {
                  this.Search(e)
                  this.setState({
                    v: e
                  })
                }}
              /> */}
              <View style={{ alignSelf: 'flex-end' }}>
                <Image style={{ width: 20, height: 20, alignSelf: 'flex-end', marginBottom: 9, }} source={require('./../../../Assets/icon/search.png')} />
              </View>

            </TouchableOpacity>
            {/* Search Bar End */}

          </View>
          <View style={{ width: '15%', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.setState({ msgpopupproduct: true })} style={{ width: 30, alignSelf: 'center', marginTop: 0 }}>
              <Image style={{ width: 20, height: 20 }} source={require('../../../Assets/Images/info.png')} />
            </TouchableOpacity>
          </View>
        </View>


        {
          this.state.UserRecipe == 'null' ?
            <Text style={{ padding: 15, paddingLeft: 20, fontSize: 16, fontWeight: 'bold' }}>{i18n.t('PleaseUpdateYourRecipeType')}</Text>
            : null
        }



        {/* Top Menu Start */}
        <View>
          <FlatList data={this.state.menu}
            horizontal
            contentContainerStyle={{ marginVertical: heightPercentageToDP(2) }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item + index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => { this.onClickCategory(item.value, index, item.title, item.titleN) }}>
                  {this.props?.languageget == 'en' ?
                    <Text style={{ color: this.state.i === index ? '#ffffff' : '#000000', backgroundColor: this.state.i === index ? Colors.green : '#eeeeee', padding: 10, borderRadius: 5, margin: 10, fontSize: 18 }}>{`${this.Capitalize(item?.title)}`}</Text>
                    :
                    <Text style={{ color: this.state.i === index ? '#ffffff' : '#000000', backgroundColor: this.state.i === index ? Colors.green : '#eeeeee', padding: 10, borderRadius: 5, margin: 10, fontSize: 18 }}>{`${this.Capitalize(item?.titleN)}`}</Text>
                  }
                </TouchableOpacity>
              )
            }}
          />
        </View>
        {/* Top Menu End */}

        {/* Product List Start */}


        <View style={{ marginBottom: "20%" }}>
          <FlatList
            style={{ paddingBottom: "3%" }}
            showsVerticalScrollIndicator={false}
            data={this.state.productList.filter(item => item)}
            keyExtractor={(item, index) => index.toString()}
            // keyExtractor={(item) => `${item.id}`}
            renderItem={this.renderProducts}
            initialNumToRender={this.state.selectedMenu == 'protein' ? this.state.productList.length : 10}
            onEndReached={this.next}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
          />
        </View>

        {/* Product List End */}

        {/* Add Product Modal Start */}
        <Modal
          transparent={true}
          visible={this.state.toast}
          onRequestClose={() => this.setState({ toast: false })}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff', paddingHorizontal: Platform.OS == 'android' ? '3%' : '6%' }}>
            <KeyboardAvoidingView behavior={"position"}>
              <ScrollView>

                <View style={{ paddingHorizontal: Platform.OS == 'android' ? '0%' : '3%' }}>


                  <View style={{ marginTop: 10, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center', }}>
                    <TouchableOpacity style={{ width: 50, alignSelf: 'flex-start' }} onPress={() => { this.close() }} >
                      <Image
                        source={require('./../../../Assets/Today/backButton.png')}
                        style={{
                          width: 50,
                          tintColor: 'black',
                          height: 50,
                          marginTop: -5
                        }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginTop: 10, paddingTop: 18, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: 110, height: 110, borderRadius: 500, borderWidth: 1, borderColor: '#eeeeee' }} source={{ uri: `${obj?.imageUrl}` }} />
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 15, marginTop: 10 }}>{this.props?.languageget === 'en' ? obj?.nameEn : obj?.nameNl}</Text>
                  </View>


                  <View style={{ marginTop: 10, paddingTop: 18, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 25 }}>{i18n.t('ChoosePortionSize')}</Text>

                    <View style={{ flexDirection: 'row', marginBottom: 0 }}>
                      <View style={{ width: '25%', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', color: 'gray' }}>{isNaN(cl) ? 0 : parseFloat(cl).toFixed(1)} <Text style={{ color: Colors.green }}>Kcal</Text> </Text>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>{i18n.t('Calories')}</Text>
                      </View>
                      <View style={{ width: '25%', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', color: 'gray' }}>{isNaN(ft) ? 0 : parseFloat(ft).toFixed(1)} <Text style={{ color: Colors.green }}>g</Text> </Text>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>{i18n.t('Ft')}</Text>
                      </View>
                      <View style={{ width: '25%', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', color: 'gray' }}>{isNaN(pt) ? 0 : parseFloat(pt).toFixed(1)} <Text style={{ color: Colors.green }}>g</Text> </Text>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>{i18n.t('Prot')}</Text>
                      </View>
                      <View style={{ width: '25%', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', color: 'gray' }}>{isNaN(cr) ? 0 : parseFloat(cr).toFixed(1)} <Text style={{ color: Colors.green }}>g</Text> </Text>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>{i18n.t('Carb')}</Text>
                      </View>
                    </View>


                    <View style={{ flexDirection: 'row', margin: 20 }}>
                      <View style={{ width: '80%' }}>
                        <View style={{ borderWidth: 1, borderColor: '#eeeeee', height: 42, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>

                          <TextInput
                            returnKeyType="done"
                            keyboardType={'phone-pad'}
                            style={{
                              paddingHorizontal: widthPercentageToDP(4),
                              paddingVertical: 10

                            }}
                            placeholder={'0'}
                            value={cal.toString() == 0 ? "" : cal.toString()}
                            placeholderTextColor={'black'}
                            editable={true}
                            onChangeText={(v) => {

                              this.setState({
                                cal: v,
                                cl: parseFloat(total * v).toFixed(1),
                                cr: parseFloat(totalcarb * v).toFixed(1),
                                ft: parseFloat(totalfat * v).toFixed(1),
                                pt: parseFloat(totalpro * v).toFixed(1),
                              })
                            }} />

                        </View>

                      </View>
                      <View style={{ width: '20%' }}>
                        <View style={{ borderColor: '#eeeeee', borderWidth: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                          <Text style={{ color: '#000000', alignSelf: 'center', padding: 9.2, fontSize: 16 }}>Gram</Text>
                        </View>
                      </View>
                    </View>


                    <TouchableOpacity onPress={() => {
                      const v = gender === 'M' ? obj?.recommendMen : obj?.recommendWomen
                      // alert(v)
                      // return;
                      this.setState({
                        cal: v,
                        cl: parseFloat(total * v ?? 1).toFixed(1),
                        cr: parseFloat(totalcarb * v ?? 1).toFixed(1),
                        ft: parseFloat(totalfat * v ?? 1).toFixed(1),
                        pt: parseFloat(totalpro * v ?? 1).toFixed(1),
                        wheel: false
                      })
                    }} style={{ borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', marginTop: 20 }}>
                      <Text style={{ alignSelf: 'center', padding: 10, paddingRight: 25, paddingLeft: 25, fontWeight: 'bold' }}>Recommended Portion</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                      const value = (itemdata?.value / 100) * inputv ?? 1
                      this.setState({
                        toast: false,
                        wheel: false
                      })
                      this.addDailyActivity(itemdata, parseFloat(value).toFixed(1) ?? 1)
                    }} style={{ borderRadius: 10, backgroundColor: Colors.green, marginTop: 5, width: 200, marginTop: 10, marginBottom: 20 }}>
                      <Text style={{ alignSelf: 'center', color: '#ffffff', padding: 10, paddingRight: 25, paddingLeft: 25, fontWeight: 'bold' }}>Add Item</Text>
                    </TouchableOpacity>

                  </View>

                </View>

              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </Modal>
        {/* Add Product Modal End */}

        {/* Search Modal Start */}
        <Modal
          transparent={true}
          visible={this.state.search}
          onRequestClose={() => this.setState({ msgpopupproduct: false })}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View>
              <View style={{ backgroundColor: '#ffffff', height: '100%' }}>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 0, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', marginRight: 10, marginLeft: 10 }}>
                  <View style={{ width: '15%', justifyContent: 'center' }}>
                    <TouchableOpacity
                      onPress={() => this.setState({ productListSearch: [], v: '', search: false })}>
                      <Image
                        source={require('./../../../Assets/Today/backButton.png')}
                        style={{
                          width: 50,
                          tintColor: 'black',
                          height: 50,
                          marginTop: -5
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: '85%', justifyContent: 'center' }}>
                    {/* Search Bar Start */}
                    <View style={{ flexDirection: 'row', height: heightPercentageToDP(5), borderRadius: 10, alignItems: 'center' }}>
                      <TextInput value={this.state.v} style={{ width: '90%', height: '100%', color: 'black', marginTop: 4 }}
                        ref={ref => {
                          this.textInput = ref;
                        }}
                        autoFocus={true}
                        placeholder={`${i18n.t('SearchIn')}`}
                        placeholderTextColor={'#000000'}
                        onChangeText={(e) => {
                          this.SearchKeyword(e)
                          this.setState({
                            v: e
                          })
                        }}
                      />
                      <View style={{ alignSelf: 'flex-end' }}>
                        <Image style={{ width: 20, height: 20, alignSelf: 'flex-end', marginBottom: 9, }} source={require('./../../../Assets/icon/search.png')} />
                      </View>

                    </View>
                    {/* Search Bar End */}

                  </View>
                </View>

                <View style={{ marginTop: 20 }}>
                  <ScrollView>
                    {/* Search Product List Start */}
                    <FlatList
                      data={this.state.productListSearch}
                      keyExtractor={(item) => `${item.id}`}
                      renderItem={this.renderProducts}
                    />
                    {/* Search Product List End */}
                  </ScrollView>
                </View>

              </View>
            </View>
          </SafeAreaView>
        </Modal>
        {/* Search Modal End */}

        <Modal
          transparent={true}
          visible={this.state.msgpopupproduct}
          onRequestClose={() => this.setState({ msgpopupproduct: false })}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View>
              <View style={{ backgroundColor: '#ffffff', height: '100%' }}>

                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                  <TouchableOpacity onPress={() => this.setState({ msgpopupproduct: false })} style={{ width: '20%' }}>
                    <Image style={{ width: 40, height: 40 }} source={require('../../../Assets/Today/backButton.png')} />
                  </TouchableOpacity>
                  <View style={{ width: '80%' }}>
                    {/* <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 60, fontWeight: 'bold', color: '#58595B' }}>Overview</Text> */}
                  </View>
                </View>

                <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                  <Image style={{ width: 150, height: 19, alignSelf: 'center' }} source={require('../../../Assets/Images/logoBlack.png')} />
                </View>

                <View style={{ marginTop: 10, padding: 20 }}>
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>{i18n.t('ProdctPOP1d1')}</Text>
                </View>

                <View style={{ marginTop: 0, padding: 20 }}>
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>{i18n.t('ProdctPOP1d2')}</Text>
                </View>

                <View style={{ marginTop: 0, padding: 20 }}>
                  <Text style={{ textAlign: 'center', fontSize: 18 }}>{i18n.t('ProdctPOP1d3')}</Text>
                </View>

                <View style={{ width: 130, alignSelf: 'center', borderTopColor: '#000000', borderTopWidth: 2, paddingTop: 10 }}>
                  <Text style={{ alignSelf: 'center', color: '#8D8D8D', fontSize: 15 }}>{i18n.t('POP1d4')}</Text>
                </View>

              </View>
            </View>
          </SafeAreaView>
        </Modal>

        {/* <View>
          <TouchableOpacity onPress={() => this.next()} style={{ backgroundColor: Colors.green, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
            <Text style={{ color: '#ffffff', alignSelf: 'center', padding: 10, fontSize: 16 }}>Load More</Text>
          </TouchableOpacity>
        </View> */}

        {/* <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%', marginRight: 2 }}>
            {this.state.page == 1 ? null :
              <TouchableOpacity onPress={() => this.prev()} style={{ backgroundColor: Colors.green }}>
                <Text style={{ color: '#ffffff', alignSelf: 'center', padding: 8 }}>Prev</Text>
              </TouchableOpacity>
            }
          </View>
          <View style={{ width: '50%' }}>
            <TouchableOpacity onPress={() => this.next()} style={{ backgroundColor: Colors.green }}>
              <Text style={{ color: '#ffffff', alignSelf: 'center', padding: 8 }}>Next</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </SafeAreaView >
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.SESSION_KEY.sessionKey,
    //  updateGender:state.UPDATE_GENDER.updateGender,

    dailyActivityActive: state.DAILY_ACTIVITY_ACTIVE.dailyActivityActive,
    dailyActivityType: state.DAILY_ACTIVITY_TYPE.dailyActivityType,
    // productsList: state.PRODUCTS_LIST_SHOW.productsList,
    // productsListCheck: state.PRODUCTS_LIST_CHECK.productsListCheck,
    languageget: state.LANGUAGE_TRANSLATE.languageget,
    gender: state.UPDATE_GENDER.updateGender,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Staple);
