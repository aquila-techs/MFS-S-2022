//import liraries
import React, { Component, useState, useEffect } from 'react';
import { Alert, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { View, Text, SafeAreaView } from 'react-native';
import styles from './style';
import i18n from '../../../translation';
import Colors from '../../Theme/Colors';
import IconF from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../Actions';

// create a component
const Workroutplan = ({ navigation }) => {
  const [quantity, setquantity] = useState('')

  const SaveQuantity = async () => {
    if (quantity > 20) {
      Alert.alert(i18n.t('workouAlert'))
    } else {
      await AsyncStorage.setItem('quantity', String(quantity))
      navigation.navigate('workoutDuration')
    }
  }

  useEffect(() => {

  });

  const getProfile = async () => {

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
        if (responseJson.success == false || responseJson.success == 'false') {
          return null;
        } else {
          setquantity(`${responseJson.WorkQuantity}`)
        }
      })
      .catch((error) => {
        alert(error);
      })
  }

  return (
    <SafeAreaView style={styles.ageContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >

        <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginRight: 20 }}>
          <Text
            style={{
              alignItems: 'center',
              color: '#000',
              fontSize: 22,
              marginBottom: 15,
            }}>
            {i18n.t('howmuchq')}
          </Text>
          <Text style={{ marginBottom: -20 }}>{i18n.t('howmuchqsub')}</Text>
        </View>



        <View style={{ flexDirection: 'row', margin: '6%', fontSize: 100, marginBottom: -10 }}>
          <TextInput
            value={quantity}
            onChangeText={text => {
              setquantity(text)
            }}
            placeholder="0"
            underlineColorAndroid="transparent"
            placeholderTextColor="#9E9F9D"
            autoFocus={true}
            returnKeyType='done'
            maxLength={3}
            // onSubmitEditing={SaveQuantity}
            style={styles.TextInputStyle}
            keyboardType="phone-pad"
          />
        </View>
        <View style={{ marginTop: '-5%', width: '100%' }} >
          <TouchableOpacity
            onPress={SaveQuantity}
            style={{
              marginTop: 20,
              height: 50,
              width: 50,
              marginLeft: 'auto',
              marginRight: '10%',
              padding: 10,
              backgroundColor: Colors.green,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
            }}>
            <IconF
              name="arrow-right"
              size={20}
              color="#ffffff"
              style={{ alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={{ marginTop: 80 }}></View>

    </SafeAreaView>
  );
};
//make this component available to the app
export { Workroutplan };
