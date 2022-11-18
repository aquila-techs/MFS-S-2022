
//import liraries
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import { styles } from './Styles';
import { SERVER_URL } from '../../../Actions';
import Responsive from 'react-native-lightweight-responsive';
import IconF from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../../Theme/Colors';

const ListItemNew = ({ item, index, referrelUse, referrelPurchaseValid, that, userSubscription, Engchecked }) => {
  return (
    <View
      style={{
        marginRight: Responsive.width(10),
        width: Responsive.width(200),
        height:
          Platform.OS === 'IOS'
            ? Responsive.height(216)
            : Responsive.height(216),
      }}>
      <ImageBackground
        imageStyle={{ borderRadius: 10 }}
        source={{
          uri:
            item?.featureImage?.l !== undefined || item?.featureImage?.l !== null
              ? SERVER_URL + item?.featureImage?.l
              : 'https://api.myfitspot.com/public/images_data/l-Ac_0M1aXT3JO9_tG1.webp',
        }}
        style={styles.feedStyle}>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            {
              referrelUse == 'false' ?
                item?.pricing !== 'free' && userSubscription === undefined && (
                  <TouchableOpacity
                    onPress={() =>
                      userSubscription !== undefined &&
                      that.props.navigation.navigate('PackageMeal')
                    }
                    style={{
                      position: 'absolute',
                      left: '5%',
                      borderRadius: 20,
                      marginTop: Responsive.height(5),
                      backgroundColor: 'grey',
                      width: Responsive.width(22),
                      height: Responsive.height(22),
                    }}>
                    <IconF
                      name="lock"
                      size={14}
                      color="white"
                      style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginTop: Responsive.height(3),
                      }}
                    />
                  </TouchableOpacity>
                )
                :
                referrelUse == 'true' && referrelPurchaseValid == 'true' ?
                  null :
                  referrelUse == 'true' && referrelPurchaseValid == 'false' ?
                    item?.pricing !== 'free' && userSubscription === undefined && (
                      <TouchableOpacity
                        onPress={() =>
                          userSubscription !== undefined &&
                          that.props.navigation.navigate('PackageMeal')
                        }
                        style={{
                          position: 'absolute',
                          left: '5%',
                          borderRadius: 20,
                          marginTop: Responsive.height(5),
                          backgroundColor: 'grey',
                          width: Responsive.width(22),
                          height: Responsive.height(22),
                        }}>
                        <IconF
                          name="lock"
                          size={14}
                          color="white"
                          style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            marginTop: Responsive.height(3),
                          }}
                        />
                      </TouchableOpacity>
                    )
                    :
                    item?.pricing !== 'free' && userSubscription === undefined && (
                      <TouchableOpacity
                        onPress={() =>
                          userSubscription !== undefined &&
                          that.props.navigation.navigate('PackageMeal')
                        }
                        style={{
                          position: 'absolute',
                          left: '5%',
                          borderRadius: 20,
                          marginTop: Responsive.height(5),
                          backgroundColor: 'grey',
                          width: Responsive.width(22),
                          height: Responsive.height(22),
                        }}>
                        <IconF
                          name="lock"
                          size={14}
                          color="white"
                          style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            marginTop: Responsive.height(3),
                          }}
                        />
                      </TouchableOpacity>
                    )
            }
          </View>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: '5%',
              left: '5%',
            }}>
            <View style={{}}>
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: '400',
                  textAlign: 'center',
                  padding: 3,
                  paddingLeft: 8,
                  paddingRight: 8,
                  alignSelf: 'center',
                  backgroundColor: Colors.green,
                  flexWrap: 'wrap',
                  fontSize: 13,
                  borderRadius: 10,
                  marginBottom: 3
                }}>
                {item.difficulityLevel}{' '}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <Text style={[styles.feedTitleText, { marginLeft: 12, fontWeight: 'bold', fontSize: 18 }]}>{Engchecked ? item.nameEn : item?.nameNl}</Text>
      <Text style={[styles.feedSubTitleText, { marginLeft: 12, marginTop: 0, }]}>{item.specification}</Text>
      {/* <Text style={styles.feedSubTitleText}>{item.muscleGroup.excersises[0].name}</Text> */}
    </View>
  );
}
export { ListItemNew }
