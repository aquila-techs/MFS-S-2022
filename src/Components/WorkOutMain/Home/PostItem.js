
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
const PostItem = ({ item, index, that, isdetailhide, Language }) => {

  return (
    <View
      style={{
        marginVertical: 10,
        marginRight: Responsive.width(10),
        width: Responsive.width(200),
        height:
          Platform.OS === 'IOS'
            ? Responsive.height(216)
            : Responsive.height(216),
      }}>
      <ImageBackground
        imageStyle={{ borderRadius: 8 }}
        source={{
          uri:
            item?.featureImage?.l !== undefined || item?.featureImage?.l !== null
              ? SERVER_URL + item?.featureImage?.l
              : 'https://api.myfitspot.com/public/images_data/l-Ac_0M1aXT3JO9_tG1.webp',
        }}
        //source={{uri:"https://api.myfitspot.com/public/images_data/l-Ac_0M1aXT3JO9_tG1.webp"}}
        style={styles.feedStyle}>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: '5%',
              left: '0%',
            }}>

            {/* <View style={{}}>
              <Text
                numberOfLines={1}
                style={{
                  color: '#000',
                  textAlign: 'center',
                  backgroundColor: '#FDE1D1',
                  fontSize: 13,
                  padding: 5
                }}>
                {item.slug}{' '}
              </Text>
            </View> */}

          </View>
        </View>
      </ImageBackground>
      {Language == 'nl' ?
        <Text numberOfLines={1} style={styles.feedTitleText}>{item.titleDutch}</Text>
        :
        <Text numberOfLines={1} style={styles.feedTitleText}>{item.title}</Text>
      }
      {
        !isdetailhide &&
        <Text style={styles.feedSubTitleText}>{item.description}</Text>}
      {/* <Text style={styles.feedSubTitleText}>{item.muscleGroup.excersises[0].name}</Text> */}
    </View>
  );
}
export { PostItem }
