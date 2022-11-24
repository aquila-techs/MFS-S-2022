import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  Platform,
  StatusBar,
  scale,
  PixelRatio,
  FlatList,
  BackHandler,
} from 'react-native';

import i18n from '../../../../translation'

// import renderIf from 'render-if';
import styles from './Styles';
import Colors from '../../../Theme/Colors';
import { Directions, ScrollView } from 'react-native-gesture-handler';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconA from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import localize from '../../../translation';
import { StripeProvider } from '@stripe/stripe-react-native';
import { } from '@stripe/stripe-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native';
import Payment from './Payment';



const DATA = [
  {
    id: '1',
    title: 'Best workout app ever!',
    name: 'Diana J.',
    membership: 'ANNUAL PRO',
    driver_cut: '12',
    desc:
      'Great app!!! Truly inspriring. My Fit has built exercise info my lifestyle.',
  },
  {
    id: '2',
    title: 'Best workout app ever!',
    name: 'Diana J.',
    membership: 'ANNUAL PRO',
    driver_cut: '20',
    desc:
      'My Fit has built exercise info my lifestyle. I love how the sessions are short and always different!',
  },
  {
    id: '3',
    title: 'Best workout app ever!',
    name: 'Diana J.',
    membership: 'ANNUAL PRO',
    driver_cut: '20',
    desc: 'I love how the sessions are short and always different!',
  },
  {
    id: '4',
    title: 'Best workout app ever!',
    name: 'Diana J.',
    membership: 'ANNUAL PRO',
    driver_cut: '20',
    desc: 'I love how the sessions are short and always different!',
  },
];

function ListItem({ item }) {
  return (
    <View
      style={{ flexDirection: 'column', marginLeft: '5%', marginRight: '5%' }}>
      <View style={{}}>
        <Text
          style={{
            fontSize: 15,
            color: '#000',
            marginTop: '4%',
          }}>
          {item.title}
        </Text>
      </View>
      <View
        style={{
          width: '40%',
          height: '5%',
          flexDirection: 'row',
          marginTop: '5%',
        }}>
        <Image
          style={{ width: 20, height: 20, alignItems: 'center' }}
          source={require('../../../Assets/starIcon.png')}
        />
        <Image
          style={{ width: 20, height: 20, alignItems: 'center' }}
          source={require('../../../Assets/starIcon.png')}
        />
        <Image
          style={{ width: 20, height: 20, alignItems: 'center' }}
          source={require('../../../Assets/starIcon.png')}
        />
        <Image
          style={{ width: 20, height: 20, alignItems: 'center' }}
          source={require('../../../Assets/starIcon.png')}
        />
        <Image
          style={{ width: 20, height: 20, alignItems: 'center' }}
          source={require('../../../Assets/starIcon.png')}
        />

        <View style={{ width: '45%', height: '5%', marginLeft: '3%' }}>
          <Text style={{ fontSize: 15, color: '#000', fontWeight: '600' }}>
            {item.name}
          </Text>
        </View>

        <View style={{}}>
          <Text
            style={{
              color: '#000',
              fontWeight: '400',
              textAlign: 'center',
              padding: 3,
              paddingLeft: 10,
              paddingRight: 10,
              alignSelf: 'center',
              backgroundColor: '#FDE1D1',
              flexWrap: 'wrap',
              fontSize: 14,
            }}>
            {item.membership}
          </Text>
        </View>
      </View>
      <View
        style={{
          margin: '1%',
          marginTop: '5%',
          marginBottom: '5%',
        }}>
        <Text
          style={{
            fontSize: 15,
            color: '#b0bec5',
          }}>
          {item.desc}
        </Text>
      </View>
    </View>
  );
}
const Items = Platform.select({
  ios: ['MFS_070_1m'],
  android: ['']
})


class PackageMeal extends Component {
  constructor(props) {
    super(props);
    this.backButtonClick = this.backButtonClick.bind(this);
    this.state = {
      showMore: false,
      loading: false,
      token: null,
      getToken: '',
      packageTitle: '',
      packagePrice: '',
      packageCurrency: '',
      packageInterval: '',
      packageDescription: 'monthly',
      Purshased: false,
      Product: {},
      loader: false
    };
  }

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
  }

  backButtonClick() {
    if (this.props.navigation && this.props.navigation.goBack) {
      this.props.navigation.navigate('HomeMain');
      return true;
    }
    return false;
  }

  handleCardPayPress = async packageValue => {
    try {
      this.setState({ loading: true, token: null });

      // const token = await stripe.paymentRequestWithCardForm({
      //   // Only iOS support this options
      //   smsAutofillDisabled: true,
      //   requiredBillingAddressFields: 'full',
      //   title: 'Create Stripe Customer',
      //   name: 'Create Stripe Customer',
      //   prefilledInformation: {
      //     billingAddress: {
      //       name: this.props.userName,
      //       line1: '',
      //       line2: '',
      //       city: '',
      //       state: '',
      //       country: '',
      //       postalCode: '',
      //       email: this.props.userEmail,
      //       // name: 'Gunilla Haugeh',
      //       // line1: 'Canary Place',
      //       // line2: '3',
      //       // city: 'Macon',
      //       // state: 'Georgia',
      //       // country: 'US',
      //       // postalCode: '31217',
      //       // email: 'ghaugeh0@printfriendly.com',
      //     },
      //   },
      // });


      // let reqData = {
      //   token: token.tokenId,
      // };
      // this.props
      //   .createStripeCustomer(reqData, this.props.token)
      //   .then(status => {
      //     //   alert('createStripeCustomer: '+JSON.stringify(status))
      //     this.setState({}, () => {
      //       if (status.status) {
      //         this.handleAddCardPayPress(packageValue);
      //       }
      //     });
      //   });

      // this.setState({ loading: false, token });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  handleAddCardPayPress = async (packageValue) => {

    try {
      // const token = await stripe.paymentRequestWithCardForm({
      //   // Only iOS support this options
      //   smsAutofillDisabled: true,
      //   requiredBillingAddressFields: 'full',
      //   title: 'Create Stripe Customer',
      //   name: 'Create Stripe Customer',
      //   prefilledInformation: {
      //     billingAddress: {
      //       name: this.props.userName,
      //       line1: '',
      //       line2: '',
      //       city: '',
      //       state: '',
      //       country: '',
      //       postalCode: '',
      //       email: this.props.userEmail,

      //     },
      //   },
      // });

      // this.setState({ loader: true })

      // let reqData = {
      //   token: token.tokenId,
      // };
      // let packageTitle = '';
      // let packagePrice = '';
      // let packageCurrency = '';
      // let packageInterval = '';
      // let packageDescription = '';

      // this.props.addCardStripe(reqData, this.props.token).then(status => {

      //   this.setState({}, () => {

      //     if (!status.status) {
      //       if (packageValue == 1) {
      //         packageTitle = 'Free Package';
      //         packagePrice = 0;
      //         packageCurrency = 'eur';
      //         packageInterval = 'bianual';
      //         packageDescription = 'annual';
      //       } else if (packageValue == 2) {
      //         (packageTitle = 'Monthly Package'),
      //           (packagePrice = 100),
      //           (packageCurrency = 'eur'),
      //           (packageInterval = 'month'),
      //           (packageDescription = 'monthly');
      //       } else if (packageValue == 3) {
      //         (packageTitle = '6 Month Package'),
      //           (packagePrice = 200),
      //           (packageCurrency = 'eur'),
      //           (packageInterval = 'month'),
      //           (packageDescription = 'monthly');
      //       } else if (packageValue == 4) {
      //         (packageTitle = 'Yearly Package'),
      //           (packagePrice = 300),
      //           (packageCurrency = 'eur'),
      //           (packageInterval = 'year'),
      //           (packageDescription = 'yearly');
      //       }

      //       const subscriptionData = {
      //         title: packageTitle,
      //         price: packagePrice,
      //         currency: packageCurrency,
      //         interval: packageInterval, // "interval":"bianual/month/year",
      //         description:
      //           'This is ' + packageDescription + ' description Package',
      //       };
      //       this.props
      //         .createSubscriptionCustomer(subscriptionData, this.props.token)
      //         .then(async status => {
      //           await AsyncStorage.setItem('Subcribe', 'Subcribe');
      //           this.setState({ loader: false })
      //           Alert.alert(i18n.t('Activated'), i18n.t('packageActive'))

      //           this.setState({}, () => {
      //             if (status.status) {

      //               this.props.navigation.navigate('HomeMain');
      //             }
      //           });
      //         });
      //     }
      //   });
      // });

      // this.setState({ loading: false, token });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {

    if (this.state.loader == true) {
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
      <SafeAreaView style={styles.container}>
        {/* <StatusBar backgroundColor={'white'} /> */}

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{ borderWidth: 1, borderColor: '#eeeeee', borderRadius: 10, margin: 10, flexDirection: 'row', padding: 10 }}>
            <View style={{ width: '20%' }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ left: '5%' }}>
                <IconA name="arrowleft" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ width: '60%', justifyContent: 'center' }}>
              <Text style={{ fontSize: 19, alignSelf: 'center' }}>{i18n.t('ChooseYourPlan')}</Text>
            </View>
            <View style={{ width: '10%' }}></View>
          </View>

          <View style={{ paddingHorizontal: '3%' }}>

            <StripeProvider
              publishableKey="pk_live_wDBLfMiWfa7KqDM0eKlOSSDi00HVCyS3i0"
              // publishableKey="pk_test_sl32cMGauibzgl0RiUusMOzZ00LZikpaB6"
              merchantIdentifier="merchant.com.myfitspot"
            >
              <Payment props={this.props} userName={this.props.userName} userEmail={this.props.userEmail} navigation={this.props.navigation} token={this.props.token} />

              {/* <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#eeeeee', borderRadius: 10, padding: 15, paddingTop: 30, paddingBottom: 30 }}>

                <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 22, marginBottom: 10 }}>User Successes</Text>
                <Text style={{ alignSelf: 'center', fontSize: 17 }}>Benedikt, <Text style={{ color: Colors.green }}>35</Text></Text>
                <Text style={{ alignSelf: 'center', fontSize: 17, marginTop: 5 }}>Lost <Text style={{ color: Colors.green }}>27</Text> lbs & <Text style={{ color: Colors.green }}>17.3</Text> inches</Text>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: 0
                  }}>
                  <Image
                    resizeMode='contain'
                    style={{ width: '50%', height: hp(30) }}
                    source={require('../../../Assets/Images/sucessDay1.png')}
                  />
                  <Image
                    resizeMode='contain'
                    style={{ width: '50%', height: hp(30.5) }}
                    source={require('../../../Assets/Images/sucessDay30.png')}
                  />
                </View>

                <Text style={{ textAlign: 'justify', alignSelf: 'center', fontSize: 16, marginTop: 10 }}>
                  "I've done many diets before where I would have only shakes
                  and replacements. But now I'm just eating normal and losing
                  weight."
                </Text>

              </View> */}

              <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#eeeeee', borderRadius: 10, padding: 15, paddingTop: 30, paddingBottom: 30 }}>

                <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 22, marginBottom: 10 }}>User Successes</Text>
                <Text style={{ alignSelf: 'center', fontSize: 17 }}>Bryan</Text>
                <Text style={{ alignSelf: 'center', fontSize: 17, marginTop: 5 }}>Lost <Text style={{ color: Colors.green }}>20</Text> KG</Text>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: 0
                  }}>
                  <Image
                    resizeMode='contain'
                    style={{ width: '100%', height: hp(40), marginTop: 20 }}
                    source={require('../../../Assets/Images/successDay1.jpeg')}
                  />
                </View>

                <Text style={{ textAlign: 'justify', alignSelf: 'center', fontSize: 16, marginTop: 10 }}>
                  "I've done many diets before where I would have only shakes
                  and replacements. But now I'm just eating normal and losing
                  weight."
                </Text>

              </View>


              <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#eeeeee', borderRadius: 10, padding: 15, paddingTop: 30, paddingBottom: 30 }}>
                <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 22, marginBottom: 10 }}>Common Questions</Text>

                <View
                  style={{
                    width: '90%',
                    marginLeft: '7%',
                    marginTop: '7%',
                    marginRight: '4%',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#000',
                      marginBottom: '1%',
                      fontWeight: 'bold'
                    }}>
                    {i18n.t('commonQuestion1Heading')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000000',
                      marginBottom: '4%',
                      marginTop: 5
                    }}>
                    {i18n.t('commonQuestion1Desc')}
                  </Text>
                </View>

                <View
                  style={{
                    width: '90%',
                    marginLeft: '7%',
                    marginTop: '7%',
                    marginRight: '4%',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#000',
                      marginBottom: '1%',
                      fontWeight: 'bold'
                    }}>
                    {i18n.t('commonQuestion1Heading2')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#000000',
                      marginBottom: '4%',
                      marginTop: 5
                    }}>
                    {i18n.t('commonQuestion1Desc2')}
                  </Text>
                </View>

              </View>

            </StripeProvider>
          </View>
          <View style={{ marginTop: 30 }}></View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    //  updateGender:state.UPDATE_GENDER.updateGender,
    // routeName: state.ROUTE_NAME.routeName,
    userName: state.USER_DATA.user.name,
    userEmail: state.USER_DATA.user.email,
    token: state.SESSION_KEY.sessionKey,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PackageMeal);
