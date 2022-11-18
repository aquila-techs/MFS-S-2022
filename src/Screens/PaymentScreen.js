import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import stripe from '@stripe/stripe-react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import IconM from 'react-native-vector-icons/MaterialIcons';

import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';

stripe.setOptions({
  publishableKey: 'pk_test_sl32cMGauibzgl0RiUusMOzZ00LZikpaB6',
  merchantId: '<MERCHANT_ID>',
  androidPayMode: 'test',
});

export default class PaymentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
      loading: false,
      token: null,
    };
  }


  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null });
      const token = await stripe.paymentRequestWithCardForm({

        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Gunilla Haugeh',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: 'Georgia',
            country: 'US',
            postalCode: '31217',
            email: 'ghaugeh0@printfriendly.com',
          },
        },
      });

      this.setState({ loading: false, token: token });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: 'rgba(256,256,256,0.16)',
          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'relative',
            top: 0,
            backgroundColor: '#fff',
            width: '100%',
            height: '8%',
            flexDirection: 'row',
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            shadowOpacity: 0.5,
            borderBottomWidth: 0,
            elevation: 3,
          }}>
          <TouchableOpacity
            style={{ position: 'absolute', left: '7%' }}
            onPress={() => this.props.navigation.goBack()}>
            <IconM name="arrow-back" size={25} color="black" />
          </TouchableOpacity>

          <Text style={{ color: '#000', fontSize: 18, alignSelf: 'center' }}>
            Payment
          </Text>
        </View>

        <View style={styles.innerContainer}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'column', width: '100%' }}>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: '8%',
                  height: '10%',
                  alignItems: 'center',
                }}>
                <Text style={styles.welcomeDescription}>Enter Amount</Text>
              </View>

              <CreditCardInput onChange={this._onChange} />

              <LiteCreditCardInput onChange={this._onChange} />

              <TouchableOpacity
                style={styles.signinBtn}
                onPress={() => {
                  this.handleCardPayPress();
                }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                  Pay
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  Background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F3E5E6',
  },
  título: {
    width: '100%',
    height: '29%',
    alignSelf: 'center',
  },
  images: {
    alignSelf: 'center',
  },
  logo: {
    width: '47%',
    height: '26%',
    alignSelf: 'center',
    marginTop: '9%',
  },
  comencemos_botón: {
    alignSelf: 'center',
  },
  Button: {
    // marginLeft:"5%"
    alignSelf: 'center',
    marginTop: '30%',
  },
  nameContainer: {
    flexDirection: 'row',
    borderColor: 'rgba(0,0,0,0.16)',
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: '5%',
  },
  innerContainer: {
    width: '100%',
    flex: 1,
    marginTop: '5%',
  },
  scrollView: {
    alignItems: 'center',
    marginHorizontal: '11%',
    paddingBottom: '5%',
    flex: 1,
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  welcomeDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#742A88',
  },
  Description: {
    fontSize: 14,
    letterSpacing: 0.3,
    color: '#742A88',
    textAlign: 'left',
  },
  inputStyle: {
    textAlign: 'left',
    padding: Platform.OS === 'android' ? 9 : 15,
    color: '#9B9595',
    fontSize: 16,
    width: '100%',
  },
  countryContainer: {
    flexDirection: 'row',
    borderColor: 'rgba(0,0,0,0.16)',
    borderWidth: 0.5,
    borderRadius: 10,
    height: Responsive.height(45),
    backgroundColor: '#fff',
    width: '60%',
    marginRight: '5%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  cvvContainer: {
    flexDirection: 'row',
    borderColor: 'rgba(0,0,0,0.16)',
    borderWidth: 0.5,
    borderRadius: 10,
    height: Responsive.height(45),
    backgroundColor: '#fff',
    width: '34%',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  signinBtn: {
    marginTop: '10%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: '#67368E',
    borderColor: '#67368E',
  },
});
