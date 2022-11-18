import { API_URL } from "../../../Actions";
import { ActionCreators } from "../../../Actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Colors from "../../../Theme/Colors";
var Spinner = require("react-native-spinkit");
import IconF5 from "react-native-vector-icons/FontAwesome5";
const { height, width } = Dimensions.get("window");
import IconM from "react-native-vector-icons/MaterialIcons";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import IconA from "react-native-vector-icons/AntDesign";
import IconF from "react-native-vector-icons/FontAwesome";
import IconS from "react-native-vector-icons/SimpleLineIcons";
import IconFF from "react-native-vector-icons/Feather";
import IconE from "react-native-vector-icons/Entypo";

//For Android & IOS
import * as ImagePicker from "react-native-image-picker"

import i18n from '../../../../translation'
import { SERVER_URL } from "../../../Actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Alert,
  I18nManager,
  ScrollView,
  Platform,
  Linking,
  TextInput,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Responsive from "react-native-lightweight-responsive";
import renderIf from "render-if";

import localize from "../../../translation";
import LocalizeController from "../../../translation/LocalizeController";

import RNRestart from "react-native-restart";
import { Overlay } from 'react-native-elements'
import Today from "../../HomeMain/Today";
const HEIGHT = Dimensions.get("window").height;

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: "https://html-css-js.com/images/tiles/links.jpg",
      countryCode: "+44",
      loading: false,
      btndisable: false,
      snackVisible: false,
      phoneError: false,
      phone: "",
      emailUnique: false,
      email: "",
      password: "",
      code: '',
      errorText: "",
      tokenVerification: "",
      signinLoader: false,
      showVerificationLink: false,
      currentLang: null,
      avatarSource: "",
      avatarData: "",
      imageshow: false,
      visible: false,
      imageshowFromDB: false,
      profileLoader: false,
      EBF: '',
      referrelUse: '',
      referrelPurchaseValid: '',
      totalDailyKCal: 0
    };
  }

  openOnlyLibrary = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.5,
      mediaType: 'photo',
    };

    ImagePicker.launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {

        this.setState({ profileLoader: true })

        const data = new FormData();

        data.append('profilePic', {
          uri: response.uri,
          type: 'image/jpg',
          name: response.uri,
        })

        const url = API_URL + '/user/update/profilePic/' + this.props.userId;
        fetch(url, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'multipart/form-data',
            'auth-token': `${this.props.token}`
          },
          body: data
        })
          .then((response) => response.json())
          .then((responseJson) => {

            this.setState({ profileLoader: false })

            let photoName = response.fileName === undefined ? "abc.jpg" : response.fileName;

            let source = {
              uri: response.uri,
              name: photoName,
              type: "image/jpg",
            };

            this.setState({
              avatarSource: source,
              avatarData: response.data,
              imageshow: true,

            });

          })

        this.setState({ Secondtime: true });

      }
    });
  };


  UNSAFE_componentWillMount() {

    this.getLang();
    const _this = this;
    if (!this.state.imageshow) {
      this.setState(
        {
          profileLoader: true,
        },
        () => {
          _this.props
            .getProfilePicture(this.props.token, this.props.userId)
            .then((status) => {
              _this.setState(
                {
                  profileLoader: false,
                },
                () => {
                  if (status.status) {
                    this.setState({
                      avatarSource: { uri: SERVER_URL + status?.profile },
                      imageshow: true,
                    });
                  }
                }
              );
            });
        }
      );
    }
    // this will check and manage session locally
    // if (props.hasSession) {
    //     props.navigation.navigate('drawerNav');
    // }
  }

  setLang(lang) {
    //	alert(lang)
    this.setState({
      currentLang: lang,
    });
  }
  getLang = async () => {
    await AsyncStorage.getItem("lang")
      .then((lang) => {
        this.setLang(lang);
        //	alert(lang)
      })
      .catch((err) => {
        console.log("err===>>>", err);
      });
  };

  _onSetLanguageToItalian = () => {
    this.getLang();
    const { currentLang } = this.state;
    if (currentLang === "English" || currentLang === null) {
      this.setLang("Dutch");
      AsyncStorage.setItem("lang", "Dutch")
        .then(() => {
          LocalizeController.setLanguage("nl");
          localize.locale = "nl";
          RNRestart.Restart();
          I18nManager.forceRTL(false);
        })
        .catch((err) => console.log("error:", err));
    } else if (currentLang === "Dutch") {
      this.setLang("English");
      AsyncStorage.setItem("lang", "English")
        .then(() => {
          LocalizeController.setLanguage("en");
          localize.locale = "en";
          I18nManager.forceRTL(false);
          RNRestart.Restart();
        })
        .catch((err) => console.log("error:", err));
    }
  };

  signinAlert(message) {
    Alert.alert("Login", message, [{ text: "OK", onPress: () => { } }], {
      cancelable: false,
    });
  }

  submit() {
    if (this.state.email == "") {
      this.setState({
        errorText: localize.t("emailErrorText"),
      });
    } else if (this.state.password == "") {
      this.setState({
        errorText: localize.t("passwordErrorText"),
      });
    } else {
      const _this = this;
      const signindata = {
        email: this.state.email,
        password: this.state.password,
      };

      this.setState(
        {
          signinLoader: true,
        },
        () => {
          _this.props.signin(signindata).then((status) => {

            //alert(JSON.stringify(status.status))
            _this.setState(
              {
                signinLoader: false,
              },
              () => {
                if (status.status) {
                  if (this.props.userData.type == "cu") {
                    _this.props.navigation.navigate("goal");
                  } else if (
                    this.props.userData.type == "p" &&
                    this.props.userData.pharmacy == null
                  ) {
                    _this.props.navigation.navigate("CreatePharmacy");
                  } else {
                    _this.props.navigation.navigate("PharmacyMain");
                  }
                } else {
                  if (status.showVerification) {
                    _this.setState({
                      showVerificationLink: true,
                      tokenVerification: status.token,
                    });
                  } else {
                    _this.signinAlert(status.error);
                  }
                }
              }
            );
          });
        }
      );
    }
  }

  sendVerificationLink() {
    const _this = this;
    console.log("sendVerificationLink");
    _this.props
      .sendVerificationLinkFunc(this.state.tokenVerification, {
        email: this.state.email,
      })
      .then((status) => {
        if (status.status) {
          _this.signinAlert(localize.t("signInAlertText"));
        }
      });
  }

  getEBF = async () => {
    let TOKEN = await AsyncStorage.getItem('PROFILETOKEN')
    fetch(`${API_URL}/user/feature/getUserFeatureProfile`, {

      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'auth-token': `${TOKEN}`
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ EBF: responseJson.EBF })
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      })
  }

  componentDidMount = async () => {

    const totalDailyKCal = await AsyncStorage.getItem("totalDailyKCal")
    const referrelUse = await AsyncStorage.getItem("referrelUse")
    const referrelPurchaseValid = await AsyncStorage.getItem("referrelPurchaseValid")

    this.setState({
      referrelUse: referrelUse,
      referrelPurchaseValid: referrelPurchaseValid
    })

    this.setState({ totalDailyKCal: totalDailyKCal })
    this.getEBF()
    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener("focus", () => {
      // do something
      // alert("Hello");
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  sendForgotEmail() {
    const _this = this;

    _this.props
      .sendForgotEmailFunc({ email: this.state.emailForgot })
      .then((status) => {
        if (status.status == false) {
          _this.setState(
            {
              emailForgot: "",
              emailForgotErrorText: "",
            },
            () => {
              _this.signinAlert(status.error);
            }
          );
        }
      });
  }

  ToggleOverlay = () => {
    this.setState({
      visible: !this.state.visible
    })
  };

  getCurrentUser = async () => {

    try {
      let TOKEN = await AsyncStorage.getItem('PROFILETOKEN')
      fetch(`${API_URL}/user/${this.props?.userId}`, {

        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'auth-token': `${TOKEN}`
        }
      }).then((response) => response.json())
        .then((responseJson) => {

          AsyncStorage.setItem('referrelUse', responseJson.referrelUse.toString());
          AsyncStorage.setItem('referrelPurchaseValid', responseJson.referrelPurchaseValid.toString());

          this.setState({
            referrelUse: responseJson.referrelUse.toString(),
            referrelPurchaseValid: responseJson.referrelPurchaseValid.toString()
          })

        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }

  }

  redeemeCode = async () => {

    const { code } = this.state;

    if (code == "") {
      Alert.alert('Empty Field!', 'Please enter your code');
      return;
    }

    try {

      const TOKEN = await AsyncStorage.getItem('PROFILETOKEN')
      const USER_ID = await AsyncStorage.getItem('USERID');

      fetch(`${API_URL}/purchase/create`, {

        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'auth-token': `${TOKEN}`
        },
        body: JSON.stringify({
          userId: USER_ID,
          referrelCode: code
        })
      }).then((response) => response.json())
        .then((responseJson) => {

          if (responseJson.referrelCode == false) {
            Alert.alert(i18n.t('InvalidCode'), i18n.t('InvalidCodeSubTitle'))
            return;
          }

          if (responseJson.status == true) {

            if (responseJson.alreadyUseReferrel == true) {
              Alert.alert(i18n.t('AlreadyUse'), i18n.t('AlreadyUseSubTitle'))
              return;
            }

            if (responseJson.alreadyUseReferrel == false) {
              this.getCurrentUser();
              RNRestart.Restart();
              Alert.alert(i18n.t('CongoPromo'), i18n.t('CongoPromoSubTitle'))
              this.setState({ visible: false })
              return;
            }

            return;
          }

        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }


    return;
    this.setState({
      visible: false
    })
  }

  render() {
    const { visible, avatarSource } = this.state
    return (
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        {visible &&
          <Overlay style={{ borderRadius: 20 }} isVisible={visible} onBackdropPress={() => this.ToggleOverlay()}>
            <View style={{ width: widthPercentageToDP('80'), borderRadius: 30, height: heightPercentageToDP('40'), }}>

              <View style={{ marginTop: '10%' }}>
                <Text style={{ textAlign: 'center', fontSize: 25, padding: 10 }}>{i18n.t('ENTERPROMOCODE')}</Text>

                <View style={{ marginRight: 10, marginLeft: 10, marginTop: 20, borderColor: '#dddddd', borderRadius: 20, borderWidth: 0.5, padding: 5 }}>
                  <TextInput
                    value={this.state.code}
                    placeholder={i18n.t('ENTERCODE')}
                    onChangeText={(text) => { this.setState({ code: text, }) }}
                  />
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={() => this.redeemeCode()}
                    style={{ height: hp(5), marginTop: hp(0), width: wp(50), backgroundColor: '#8AC24A', justifyContent: 'center', borderRadius: 10 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>
                      {i18n.t('SUBMIT')}
                    </Text>
                  </TouchableOpacity>
                </View>

              </View>

            </View>
          </Overlay>
        }
        <View
          style={{
            backgroundColor: "#fff",
            width: "100%",
            height: "7.5%",
            marginTop: Platform.OS === "android" ? 0 : "9%",
            flexDirection: "row",
            alignSelf: "center",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            shadowOpacity: Platform.OS === "android" ? 0.5 : 0,
            borderBottomWidth: 0,
            elevation: 3,
          }}
        >
          <TouchableOpacity
            style={{ position: "absolute", left: "5%", padding: 5 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <IconA name="arrowleft" size={25} color="black" />
          </TouchableOpacity>
          <Text style={{ color: "#000", fontSize: 18, alignSelf: "center" }}>
            {i18n.t('Profile')}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Settings")}
            style={{ position: "absolute", right: "5%" }}
          >
            <IconS name="settings" size={25} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: hp(5) }} showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                marginTop: Responsive.height(17.5),
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => this.openOnlyLibrary()}
                style={{ marginLeft: "5%", marginRight: "5%" }}
              >
                {avatarSource.uri == "https://api.myfitspot.com/undefined" || avatarSource.uri == undefined ?
                  <View
                    style={{
                      alignItems: "center",
                      borderRadius: 50,
                    }}
                  >
                    <Image
                      source={require('../../../Assets/user.png')}
                      style={{
                        height:
                          Platform.OS === "android"
                            ? Responsive.height(40)
                            : Responsive.height(40),
                        width:
                          Platform.OS === "android"
                            ? Responsive.height(40)
                            : Responsive.height(40),
                      }}
                    />
                  </View>
                  :
                  <Image
                    source={avatarSource}
                    style={{
                      alignItems: "center",
                      borderRadius: 5,
                      height:
                        Platform.OS === "android"
                          ? Responsive.height(40)
                          : Responsive.height(40),
                      width:
                        Platform.OS === "android"
                          ? Responsive.height(40)
                          : Responsive.height(40),
                      color: "#000",
                      backgroundColor: "#F3F3F3",
                    }}
                  />
                }
              </TouchableOpacity>

              <View
                style={{
                  width: "50%",
                  flexDirection: "column",
                  alignContent: "center",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: Responsive.height(14),
                      color: "rgba(0,0,0,0.9)",
                      marginLeft: "20%",
                    }}
                  >
                    {this.props?.userName}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: Responsive.height(7.5),
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      marginTop: Responsive.height(12.5),
                      marginLeft: "10%",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Responsive.height(14),
                        color: "rgba(0,0,0,0.9)",
                      }}
                    >
                      {this.state.totalDailyKCal == 0 ? 0 : this.state.totalDailyKCal}
                    </Text>
                    <Text
                      style={{
                        fontSize: Responsive.height(11),
                        color: "rgba(0,0,0,0.4)",
                      }}
                    >
                      Kcal
                    </Text>
                  </View>

                  <View
                    style={{
                      marginTop: Responsive.height(12.5),
                      marginLeft: "40%",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Responsive.height(14),
                        color: "rgba(0,0,0,0.9)",
                      }}
                    >
                      {this.props?.userWeight ?? "10"} kg
                    </Text>
                    <Text
                      style={{
                        fontSize: Responsive.height(11),
                        color: "rgba(0,0,0,0.4)",
                      }}
                    >
                      {i18n.t('Weight')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {
              this.state.referrelUse == 'false' ?
                this.props.userSubscription === undefined && (
                  <TouchableOpacity
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => this.props.navigation.navigate("PackageMeal")}
                  >
                    <Text style={styles.loginText}>{i18n.t('unlock')}</Text>
                  </TouchableOpacity>
                ) :
                this.state.referrelUse == 'true' && this.state.referrelPurchaseValid == 'true' ? null :
                  this.state.referrelUse == 'true' && this.state.referrelPurchaseValid == 'false' ?
                    this.props.userSubscription === undefined && (
                      <TouchableOpacity
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.props.navigation.navigate("PackageMeal")}
                      >
                        <Text style={styles.loginText}>{i18n.t('unlock')}</Text>
                      </TouchableOpacity>
                    ) : null

            }

            <Text style={{ color: "#000", fontSize: 20, margin: "5%" }}>
              {i18n.t('Resources')}
            </Text>

            <ListView title={i18n.t('fitguid')} onPress={() => {
              Linking.openURL(i18n.t('fitguidURL'));
            }} />
            <ListView title={i18n.t('MyProgress')} onPress={() => {
              this.props.navigation.navigate("ChartKit");
            }} />
            <ListView title={i18n.t('RedeamCode')} onPress={() => {
              this.ToggleOverlay()
            }} />
            <ListView title={i18n.t('Exerciselibrary')} onPress={() => {
              this.props.navigation.navigate('ExerciceLib')
            }} />
            <ListView title={i18n.t('Recipebook')} onPress={() => {
              Linking.openURL("https://www.dilorenzo.be");
            }} />

            <ListView title={i18n.t('UpdateGoal')} onPress={async () => {
              await AsyncStorage.setItem('UpdateRoute', "true")
              this.props.navigation.navigate('gender', { checking: '1' })
            }} />


            {/* <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('goal')}
                  style={{
                    position: 'absolute', right: '10%',
                  }}
                >
                  <Text style={{
                    fontSize: Responsive.height(15),
                    color: 'rgba(0,0,0,0.3)',
                  }}>Modify</Text>
                </TouchableOpacity> */}
            {/* My fitness plan */}

            <View
              style={{
                width: "100%",
                flexDirection: "column",
                alignContent: "center",
                margin: "5%",
                marginTop: "8%",
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row"
                }}
              >
                <Text
                  style={{
                    fontSize: Responsive.height(17),
                    color: "rgba(0,0,0,0.9)",
                    marginBottom: 10
                  }}
                >
                  {i18n.t('fitplan')}
                </Text>

              </View>

              <View
                style={{
                  marginTop: Responsive.height(2.5),
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    marginTop: Responsive.height(7.5),
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: "2%",
                      paddingBottom: 10
                    }}
                  >
                    <IconMC
                      name="weight-lifter"
                      size={20}
                      color={Colors.green}
                      style={{ marginRight: 10 }}
                    />
                    <Text
                      style={{
                        marginLeft: Responsive.width(4),
                        fontSize: Responsive.height(14),
                        color: "rgba(0,0,0,0.9)",
                      }}
                    >
                      {i18n.t('Goal')}:{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: Responsive.height(14),
                        color: "rgba(0,0,0,0.3)",
                      }}
                    >
                      {this.state.EBF == "A" ?
                        i18n.t('weightMaintenance') :
                        this.state.EBF == "G" ?
                          i18n.t('steadyWeightLoss') :
                          this.state.EBF == "M" ?
                            i18n.t('moderateWeightLoss') :
                            this.state.EBF == "V" ?
                              i18n.t("acceleratedWeightloss") :
                              i18n.t('Getfitter')
                      }
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: "2%",
                      paddingBottom: 10
                    }}
                  >
                    <IconF name="calendar-o" size={20} style={{ marginRight: 13 }} color={Colors.green} />

                    <Text
                      style={{
                        marginLeft: Responsive.width(4),
                        fontSize: Responsive.height(14),
                        color: "rgba(0,0,0,0.9)",
                      }}
                    >
                      {i18n.t('Age')}:{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: Responsive.height(14),
                        color: "rgba(0,0,0,0.3)",
                      }}
                    >
                      {this.props?.userAge}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: "2%",
                      paddingBottom: 10
                    }}
                  >
                    <IconMC
                      name="human-male-height"
                      size={20}
                      color={Colors.green}
                      style={{ marginRight: 12 }}
                    />
                    <Text
                      style={{
                        marginLeft: Responsive.width(4),
                        fontSize: Responsive.height(14),
                        color: "rgba(0,0,0,0.9)",
                      }}
                    >
                      {i18n.t('Height')}:{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: Responsive.height(14),
                        color: "rgba(0,0,0,0.3)",
                      }}
                    >
                      {this.props.userHeight} cm
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: "2%",
                      marginBottom: "2%",
                    }}
                  >
                    <IconMC
                      name="weight-kilogram"
                      size={20}
                      color={Colors.green}
                      style={{ marginRight: 12 }}
                    />
                    <Text
                      style={{
                        marginLeft: Responsive.width(4),
                        fontSize: Responsive.height(14),
                        color: "rgba(0,0,0,0.9)",
                      }}
                    >
                      {i18n.t('Weight')}:{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: Responsive.height(14),
                        color: "rgba(0,0,0,0.3)",
                      }}
                    >
                      {this.props.userWeight} kg
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* <View
              style={{
                flex: 1,
                width: "90%",
                alignContent: "center",
                margin: "5%",
                marginBottom: "40%",
              }}
            >
              <Text
                style={{
                  fontSize: Responsive.height(16),
                  color: "rgba(0,0,0,0.9)",
                }}
              >
               {i18n.t('mtv')}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignSelf: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    marginTop: Responsive.height(12.5),
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: Responsive.height(14),
                      color: "rgba(0,0,0,0.9)",
                    }}
                  >
                    118.9 lbs
                  </Text>
                  <Text
                    style={{
                      fontSize: Responsive.height(11),
                      color: "rgba(0,0,0,0.4)",
                    }}
                  >
                    {i18n.t('trgw')}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: Responsive.height(12.5),
                    marginLeft: "20%",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: Responsive.height(14),
                      color: "rgba(0,0,0,0.9)",
                    }}
                  >
                    2171
                  </Text>
                  <Text
                    style={{
                      fontSize: Responsive.height(11),
                      color: "rgba(0,0,0,0.4)",
                    }}
                  >
                   {i18n.t('trgc')}
                  </Text>
                </View>
              </View>
            </View> */}

          </View>
          <View style={{ marginTop: 100 }}></View>
        </ScrollView>

      </View>
    );
  }
}
const ListView = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        width: "100%",
        height: "6.5%",
        marginBottom: "0.5%",
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        shadowOpacity: Platform.OS === "android" ? 0.5 : 0.05,
        elevation: 0.5,
      }}
    >
      <Text
        style={{
          color: "#000",
          fontSize: 17,
          marginLeft: "5%",
        }}
      >
        {title}
      </Text>
      <TouchableOpacity
        style={{ position: "absolute", right: "5%" }}
        // onPress={() => this.setModalVisible(false)}>
        onPress={() => { }}
      >
        <IconF name="angle-right" size={25} color="rgba(0,0,0,0.3)" />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
function mapStateToProps(state) {
  return {
    sessionKey: state.SESSION_KEY.sessionKey,
    userData: state.USER_DATA.user,
    routeName: state.ROUTE_NAME.routeName,
    userName: state.USER_DATA_NAME.userDataName,
    userGender: state.UPDATE_USER_GENDER.updateUserGender,
    userAge: state.UPDATE_USER_AGE.updateUserAge,
    userHeight: state.UPDATE_USER_HEIGHT.updateUserHeight,
    userWeight: state.UPDATE_USER_WEIGHT.updateUserWeight,
    token: state.SESSION_KEY.sessionKey,
    userId: state.USER_DATA.user._id,
    userSubscription: state.USER_SUBSCRIPTION.userSubscription,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  signUpTitle: {
    fontSize: hp("3%"),
    fontWeight: "600",
    letterSpacing: 0.7,
    color: "#000",
  },
  womanMobile: {
    alignSelf: "center",
    marginTop: Responsive.height(20.6),
    height: Responsive.height(153),
    width: Responsive.width(224),
    backgroundColor: "transparent",
  },
  phoneNumberWrapper: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: "rgba(0, 0, 0, 0.15)",
    height: Responsive.height(40),
    width: Responsive.width(298),
    marginTop: Responsive.height(36),
    borderRadius: Responsive.height(8),
    borderWidth: Responsive.height(1),
  },
  gbFlag: {
    marginLeft: Responsive.width(10),
    height: Responsive.height(15),
    width: Responsive.width(25),
  },
  countryCode: {
    marginLeft: Responsive.width(4),
    color: "rgba(0,0,0,1)",
    fontSize: Responsive.height(14),
  },
  line: {
    marginLeft: Responsive.width(10.5),
    width: Responsive.width(1),
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  phoneTextInput: {
    alignSelf: "center",
    marginLeft: Responsive.width(10),
    width: "80%",
    height: "100%",
  },
  signUpWrapper: {
    marginTop: Responsive.height(24.9),
    alignSelf: "center",
    height: Responsive.height(40),
    width: Responsive.width(298),
    backgroundColor: "rgba(122,211,25,1)",
    borderRadius: Responsive.height(30),
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: Responsive.height(10),
    color: "#ffffff",
    fontWeight: "bold",
  },
  or: {
    marginTop: Responsive.height(17.4),
    opacity: 0.5,
    fontSize: Responsive.height(8),
    textAlign: "center",
    color: "#000000",
  },
  signUpWithFacebookWrapper: {
    flexDirection: "row",
    marginTop: Responsive.height(12.4),
    alignSelf: "center",
    height: Responsive.height(40),
    width: Responsive.width(298),
    backgroundColor: "rgba(59,89,152,1)",
    opacity: 0.9,
    borderRadius: 30,
    alignItems: "center",
  },
  signUpWithFacebook: {
    marginLeft: Responsive.width(32),
    fontWeight: "bold",
    color: "rgba(255,255,255,1)",
    fontSize: Responsive.height(10),
  },
  facebookIcon: {
    marginLeft: Responsive.width(18),
    height: Responsive.height(32),
    width: Responsive.height(32),
    backgroundColor: "transparent",
  },
  loginWrapper: {
    marginTop: Responsive.height(18),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  alreadyHaveAnAccountText: {
    color: "rgba(0,0,0,1)",
    fontSize: Responsive.height(10),
    fontFamily: "helvetica",
  },
  signInText: {
    color: "rgba(0,0,0,1)",
    fontSize: Responsive.height(10),
    fontWeight: "bold",
    fontFamily: "helvetica",
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
});
