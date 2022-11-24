import { useStripe, CardField, useConfirmPayment, ApplePayButton, useApplePay, presentApplePay, confirmApplePayPayment } from '@stripe/stripe-react-native'
import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal, Image, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from '../../../../translation'
import Colors from '../../../Theme/Colors';
import { API_URL } from '../../../Actions';
import { TextInput } from 'react-native-gesture-handler';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';

const Payment = ({ props, token, navigation, userName, userEmail }) => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [packageActive, setPackage] = useState(0);
    const [paymentModal, setPaymentModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [cardDetails, setCardDetails] = useState([]);
    const stripe = useStripe()
    const { confirmPayment, loading } = useConfirmPayment()
    const { isApplePaySupported } = useApplePay();

    const subscribe = async () => {

        setLoader(true)

        const AMOUNT = amount;
        const PACKAGE = packageActive

        if (!cardDetails?.complete || packageActive == 0 || amount == 0) {
            Alert.alert("Empty Details!", "Please enter complete card details")
            setLoader(false)
            return;
        }

        const paymentMethod = await stripe.createPaymentMethod({
            card: cardDetails,
            paymentMethodType: 'Card',
        });

        setLoader(true)
        let USERID = await AsyncStorage.getItem("USERID");

        fetch(`https://api.myfitspot.com/api/payment/stripeSubscription/customers/paymentInitiated`, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'auth-token': token,
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                amount: AMOUNT,
                userID: USERID,
                cardDetails: paymentMethod.paymentMethod.id
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                PayNow(responseJson.clientSecret, PACKAGE)
            })
            .catch((error) => {
                alert(JSON.stringify(error));
            });

    }

    const PayNow = async (SECRET, PACKAGE) => {

        const clientSecret = SECRET

        try {

            const billingDetails = {
                email: userEmail
            }

            const { paymentIntent, error } = await confirmPayment(clientSecret, {
                paymentMethodType: 'Card',
                paymentMethodData: {
                    billingDetails,
                }
            })
            if (error) {
                alert(`Payment Confirmation Error ${error.message}`)
            } else if (paymentIntent) {
                console.log("Payment Sucessful", paymentIntent)
                PaymentFinal(SECRET, PACKAGE)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const PaymentFinal = async (SECRET) => {

        const packageValue = packageActive

        let packageTitle = '';
        let packagePrice = '';
        let packagePriceID = '';
        let packageCurrency = '';
        let packageInterval = '';
        let packageDescription = '';


        if (packageValue == 1) {
            packageTitle = 'Free Package';
            packagePrice = 0;
            packageCurrency = 'eur';
            packageInterval = 'bianual';
            packageDescription = 'annual';
        } else if (packageValue == 2) {
            (packageTitle = 'Monthly Package'),
                (packagePrice = 1),
                (packagePriceID = "price_1M6sQzBsGswEgNab8zjxYgDu"),
                (packageCurrency = 'eur'),
                (packageInterval = 'month'),
                (packageDescription = 'monthly');
        } else if (packageValue == 3) {
            (packageTitle = '6 Month Package'),
                (packagePrice = 49.99),
                (packagePriceID = "price_1M6sS4BsGswEgNabmzWJc67K"),
                (packageCurrency = 'eur'),
                (packageInterval = 'bianual'),
                (packageDescription = 'monthly');
        } else if (packageValue == 4) {
            (packageTitle = 'Yearly Package'),
                (packagePrice = 79.99),
                (packagePriceID = "price_1M6sSoBsGswEgNabgh7qn3la"),
                (packageCurrency = 'eur'),
                (packageInterval = 'year'),
                (packageDescription = 'yearly');
        }

        const subscriptionData = {
            title: packageTitle,
            priceID: packagePriceID,
            price: packagePrice,
            currency: packageCurrency,
            interval: packageInterval, // "interval":"bianual/month/year",
            description:
                'This is ' + packageDescription + ' description Package',
        };

        props
            .createSubscriptionCustomer(subscriptionData, token)
            .then(async status => {

                console.log('========================')
                console.log(status)
                console.log('========================')

                await AsyncStorage.setItem('Subcribe', 'Subcribe');
                Alert.alert('Congratulataions!', 'Your subscription has been activated successfully')
                setPaymentModal(false)
                setLoader(false)
                navigation.navigate('HomeMain')

            });

    }

    const empty = async () => {
        setAmount(0)
        setPackage(0)
        setCardDetails([])
        setPaymentModal(false)
    }

    const applePaySubscribe = async (PAYAMENT_METHOD_ID) => {

        if (!isApplePaySupported) return;

        const AMOUNT = amount;
        const PACKAGE = packageActive

        let USERID = await AsyncStorage.getItem("USERID");

        fetch(`https://api.myfitspot.com/api/payment/stripeSubscription/customers/paymentInitiatedApplePay`, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'auth-token': token,
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                amount: AMOUNT,
                userID: USERID,
                cardDetails: PAYAMENT_METHOD_ID
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                confirmApplePayment(responseJson.clientSecret, PAYAMENT_METHOD_ID)
            })
            .catch((error) => {
                alert(JSON.stringify(error));
            });

    }

    const confirmApplePayment = async (SECRET, PAYAMENT_METHOD_ID) => {

        const clientSecret = SECRET;

        console.log('==================')
        console.log(clientSecret)
        console.log('==================')

        const { error: confirmError } = await confirmApplePayPayment(
            clientSecret
        );

        if (confirmError) {
            alert(JSON.stringify(confirmError))
        } else {
            // alert('DONE')
            setLoader(true)
            activeSubscription(PAYAMENT_METHOD_ID)
            // PaymentFinal(SECRET, packageActive)
        }
    }

    const pay = async (SECRET) => {

        if (!isApplePaySupported) return;

        const packageValue = packageActive

        let packageTitle = '';
        let packagePrice = '';
        let packagePriceID = '';
        let packageCurrency = '';
        let packageInterval = '';
        let packageDescription = '';


        if (packageValue == 1) {
            packageTitle = 'Free Package';
            packagePrice = 0;
            packageCurrency = 'eur';
            packageInterval = 'bianual';
            packageDescription = 'annual';
        } else if (packageValue == 2) {
            (packageTitle = 'Monthly Package'),
                (packagePrice = 1),
                (packagePriceID = "price_1M6vVGCjs8c4TxuoS6YVqfsL"),
                (packageCurrency = 'eur'),
                (packageInterval = 'month'),
                (packageDescription = 'monthly');
        } else if (packageValue == 3) {
            (packageTitle = '6 Month Package'),
                (packagePrice = 49.99),
                (packagePriceID = "price_1M6vYxCjs8c4TxuoPI2LtHGu"),
                (packageCurrency = 'eur'),
                (packageInterval = 'bianual'),
                (packageDescription = 'monthly');
        } else if (packageValue == 4) {
            (packageTitle = 'Yearly Package'),
                (packagePrice = 79.99),
                (packagePriceID = "price_1M6vZGCjs8c4TxuoJnhqWqx0"),
                (packageCurrency = 'eur'),
                (packageInterval = 'year'),
                (packageDescription = 'yearly');
        }

        const { paymentMethod, error } = await presentApplePay({
            cartItems: [{ label: packageTitle, amount: packagePrice.toString(), paymentType: 'Immediate' }],
            country: 'BE',
            currency: 'EUR',
        });

        if (error) {
            // alert(JSON.stringify(error))
        } else {
            // activeSubscription(paymentMethod.id)
            applePaySubscribe(paymentMethod.id)
        }
    };

    const activeSubscription = async (PAYMENT_METHOD_ID) => {

        setLoader(true)

        const AMOUNT = amount;
        const packageValue = packageActive
        let USERID = await AsyncStorage.getItem("USERID");

        if (PAYMENT_METHOD_ID == undefined) {

            if (!cardDetails?.complete || packageActive == 0 || amount == 0) {
                Alert.alert("Empty Details!", "Please enter complete card details")
                setLoader(false)
                return;
            }
        }

        const paymentMethod = await stripe.createPaymentMethod({
            card: cardDetails,
            paymentMethodType: 'Card',
        });

        let packageTitle = '';
        let packagePrice = '';
        let packagePriceID = '';
        let packageCurrency = '';
        let packageInterval = '';
        let packageDescription = '';


        if (packageValue == 1) {
            packageTitle = 'Free Package';
            packagePrice = 0;
            packageCurrency = 'eur';
            packageInterval = 'bianual';
            packageDescription = 'annual';
        } else if (packageValue == 2) {
            (packageTitle = 'Monthly Package'),
                (packagePrice = 1),
                (packagePriceID = "price_1M6vVGCjs8c4TxuoS6YVqfsL"),
                (packageCurrency = 'eur'),
                (packageInterval = 'month'),
                (packageDescription = 'monthly');
        } else if (packageValue == 3) {
            (packageTitle = '6 Month Package'),
                (packagePrice = 49.99),
                (packagePriceID = "price_1M6vYxCjs8c4TxuoPI2LtHGu"),
                (packageCurrency = 'eur'),
                (packageInterval = 'bianual'),
                (packageDescription = 'monthly');
        } else if (packageValue == 4) {
            (packageTitle = 'Yearly Package'),
                (packagePrice = 79.99),
                (packagePriceID = "price_1M6vZGCjs8c4TxuoJnhqWqx0"),
                (packageCurrency = 'eur'),
                (packageInterval = 'year'),
                (packageDescription = 'yearly');
        }

        const subscriptionData = {
            name: userName,
            email: userEmail,
            amount: AMOUNT,
            cardDetails: PAYMENT_METHOD_ID == undefined ? paymentMethod.paymentMethod.id : PAYMENT_METHOD_ID,
            title: packageTitle,
            priceID: packagePriceID,
            price: packagePrice,
            currency: packageCurrency,
            interval: packageInterval, // "interval":"bianual/month/year",
            description:
                'This is ' + packageDescription + ' description Package',
        };

        props
            .createSubscriptionCustomer(subscriptionData, token)
            .then(async status => {

                console.log('========================')
                console.log(status)
                console.log('========================')

                await AsyncStorage.setItem('Subcribe', 'Subcribe');
                Alert.alert('Congratulataions!', 'Your subscription has been activated successfully')
                setPaymentModal(false)
                setLoader(false)
                navigation.navigate('HomeMain')

            });


    }

    return (
        <View>
            <ScrollView>
                <View style={{ borderWidth: 1, borderColor: '#eeeeee', borderRadius: 10, padding: 15, paddingTop: 30, paddingBottom: 30 }}>

                    <TouchableOpacity style={{ borderRadius: 10, marginTop: 0 }}>
                        <Text style={{ color: "#000000", padding: 10, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>{i18n.t('FreePlan')}</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#eeeeee', borderRadius: 10, padding: 15, paddingTop: 30, paddingBottom: 30 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '60%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{i18n.t('basic')}</Text>
                        </View>
                        <View style={{ width: '40%', justifyContent: 'center' }}>
                            {/* <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: 'white', backgroundColor: Colors.green, width: 80, textAlign: 'center', padding: 6, borderRadius: 10 }}>{i18n.t('Bestdeal')}</Text> */}
                        </View>
                    </View>

                    <View>
                        <Text style={{ color: Colors.green, fontSize: 18, fontWeight: 'bold', }}>1€ /  <Text style={{ fontWeight: 'normal', color: '#000000', fontSize: 16 }}>{i18n.t('perMonth')}</Text></Text>
                    </View>

                    {/* <TouchableOpacity onPress={() => { this.handleAddCardPayPress(2) }} style={{ backgroundColor: Colors.green, borderRadius: 10, marginTop: 30 }}> */}
                    <TouchableOpacity onPress={() => { setAmount(1); setPackage(2); setPaymentModal(true) }} style={{ backgroundColor: Colors.green, borderRadius: 10, marginTop: 30 }}>
                        {/* <TouchableOpacity onPress={() => { subscribe(100, 2) }} style={{ backgroundColor: Colors.green, borderRadius: 10, marginTop: 30 }}> */}
                        <Text style={{ color: '#ffffff', padding: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>{i18n.t('Selectplan')}</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#eeeeee', borderRadius: 10, padding: 15, paddingTop: 30, paddingBottom: 30 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '60%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{i18n.t('standard')}</Text>
                        </View>
                        <View style={{ width: '40%', justifyContent: 'center' }}>
                            {/* <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: 'white', backgroundColor: Colors.green, width: 80, textAlign: 'center', padding: 6, borderRadius: 10 }}>{i18n.t('Bestdeal')}</Text> */}
                        </View>
                    </View>

                    <View>
                        <Text style={{ color: Colors.green, fontSize: 18, fontWeight: 'bold', }}>49.99€ /  <Text style={{ fontWeight: 'normal', color: '#000000', fontSize: 16 }}>{i18n.t('perMonthStandard')}</Text></Text>
                    </View>

                    {/* <TouchableOpacity onPress={() => { this.handleAddCardPayPress(3) }} style={{ backgroundColor: Colors.green, borderRadius: 10, marginTop: 30 }}> */}
                    <TouchableOpacity onPress={() => { setAmount(49.99); setPackage(3); setPaymentModal(true) }} style={{ backgroundColor: Colors.green, borderRadius: 10, marginTop: 30 }}>
                        {/* <TouchableOpacity onPress={() => { subscribe(200, 3) }} style={{ backgroundColor: Colors.green, borderRadius: 10, marginTop: 30 }}> */}
                        <Text style={{ color: '#ffffff', padding: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>{i18n.t('Selectplan')}</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#eeeeee', borderRadius: 10, padding: 15, paddingTop: 30, paddingBottom: 30 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '60%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{i18n.t('professional')}</Text>
                        </View>
                        <View style={{ width: '40%', justifyContent: 'center' }}>
                            {/* <Text style={{ alignSelf: 'flex-end', fontSize: 13, color: 'white', backgroundColor: Colors.green, width: 80, textAlign: 'center', padding: 6, borderRadius: 10 }}>{i18n.t('Bestdeal')}</Text> */}
                        </View>
                    </View>

                    <View>
                        <Text style={{ color: Colors.green, fontSize: 18, fontWeight: 'bold', }}>79.99€ /  <Text style={{ fontWeight: 'normal', color: '#000000', fontSize: 16 }}>{i18n.t('perMonthProfessional')}</Text></Text>
                    </View>

                    {/* <TouchableOpacity onPress={() => { this.handleAddCardPayPress(4) }} style={{ backgroundColor: Colors.green, borderRadius: 10, marginTop: 30 }}> */}
                    <TouchableOpacity onPress={() => { setAmount(79.99); setPackage(4); setPaymentModal(true) }} style={{ backgroundColor: Colors.green, borderRadius: 10, marginTop: 30 }}>
                        {/* <TouchableOpacity onPress={() => { subscribe(300, 4) }} style={{ backgroundColor: Colors.green, borderRadius: 10, marginTop: 30 }}> */}
                        <Text style={{ color: '#ffffff', padding: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>{i18n.t('Selectplan')}</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>


            {/* Payment Modal Start */}
            <Modal
                transparent={true}
                visible={paymentModal}
                onRequestClose={() => empty()}
            >

                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => empty()}
                        style={{ backgroundColor: "rgba(0,0,0,0.5)", height: "30%" }}
                    ></TouchableOpacity>
                    <View style={{ backgroundColor: "#fff", height: "70%" }}>
                        <KeyboardAvoidingView behavior='padding'>
                            <ScrollView>
                                <TouchableOpacity onPress={() => empty()} style={{ margin: 20, width: 50 }}>
                                    <Image resizeMode='contain' style={{ width: 15, height: 15 }} source={require('../../../Assets/icon/close.png')} />
                                </TouchableOpacity>


                                <View>
                                    <CardField
                                        postalCodeEnabled={true}
                                        placeholders={{
                                            number: 'XXXX XXXX XXXX XXXX',
                                        }}
                                        cardStyle={{
                                            backgroundColor: '#FFFFFF',
                                            textColor: '#000000',
                                        }}
                                        style={{
                                            width: '100%',
                                            height: 50,
                                            marginVertical: 30,
                                        }}
                                        onCardChange={(cardDetails) => {
                                            setCardDetails(cardDetails)
                                        }}
                                        onFocus={(focusedField) => {
                                            console.log('focusField', focusedField);
                                        }}
                                    />
                                </View>

                                {loader == true ?
                                    <ActivityIndicator color={'#21c064'} size={'large'} />
                                    :
                                    <View>
                                        <TouchableOpacity onPress={() => activeSubscription()} style={{ backgroundColor: '#21c064', padding: 10, width: '90%', alignSelf: 'center', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: '#ffffff', fontSize: 17 }}>PAY</Text>
                                        </TouchableOpacity>

                                        <View style={{ margin: 20 }}>
                                            {isApplePaySupported && (
                                                <ApplePayButton
                                                    onPress={pay}
                                                    type="plain"
                                                    buttonStyle="black"
                                                    borderRadius={4}
                                                    style={{
                                                        width: '100%',
                                                        height: 50,
                                                    }}
                                                />
                                            )}
                                        </View>
                                    </View>
                                }
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                </View>

            </Modal >
            {/* Payment Modal End */}

        </View >
    )
}

export default Payment