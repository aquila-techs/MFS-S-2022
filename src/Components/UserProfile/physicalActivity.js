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
  FlatList,
  PixelRatio,
} from 'react-native';
import styles from './style';
import IconF from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconA from 'react-native-vector-icons/AntDesign';
import { Icon, Overlay } from 'react-native-elements'
import { ActionCreators } from '../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from '../../../translation';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

class physicalActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalValue: '',
      setinfo: '',
      setinfodetail: '',
      physicalActivityData: [
        {
          id: 1,
          title: i18n.t('sedentary'),
          detail: i18n.t('sedentarydes'),
          SecretCode: "S",
          Info: i18n.t('gain')
        },
        {
          id: 2,
          title: i18n.t('lightActive'),
          detail: i18n.t('lightActivedes'),
          SecretCode: "L",
          Info: i18n.t('Mucle')
        },
        {
          id: 3,
          title: i18n.t('active'),
          detail: i18n.t('activedes'),
          SecretCode: "A",
          Info: i18n.t('Vlose')
        },
        {
          id: 4,
          title: i18n.t("veryActive"),
          detail: i18n.t("veryActivedes"),
          SecretCode: "V",
          Info: i18n.t('infoa')
        },
      ],
      visible: false,
      onBoardingCheck: false,
    };
  }
  normalize(size) {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  }
  componentDidMount() {
    const _this = this;
    _this.props.setUserFeaturesAsyncFalseDataAction().then(status => {
      if (status.status) {
      }
    });
  }
  submit(data) {
    //  alert(data)
    const _this = this;
    _this.props.setPhysicalActivityAction(data).then(status => {
      // console.log('signin: ', status, data);
      this.setState({}, () => {
        if (status.status) {
          //alert(JSON.stringify(this.props.updateGoal))
          this.props.navigation.navigate('Workroutplan');
          // this.props.navigation.navigate('gender');
        }
      });
    });
  }
  ToggleOverlay = () => {
    this.setState({
      visible: !this.state.visible
    })
  };
  render() {
    const { visible, physicalActivityData, setinfo, setinfodetail } = this.state
    return (
      <View style={styles.container}>
        {visible &&
          <Overlay isVisible={visible} onBackdropPress={() => this.ToggleOverlay()}>
            <View style={{ width: widthPercentageToDP('90'), height: heightPercentageToDP('30') }}>
              <Text style={{ textAlign: 'center', fontSize: 20, padding: 10 }}>{setinfo}</Text>
              <Text style={{ textAlign: 'center', fontSize: 20, padding: 10 }}>{setinfodetail}</Text>
            </View>
          </Overlay>
        }
        <View style={styles.goal1}>
          <Text style={{ color: '#000', fontSize: 21, marginBottom: 20, marginLeft: 10, marginRight: 10 }}>
            {i18n.t('physicalActivityWhat')}?
          </Text>
          <Text style={{ alignSelf: 'center', fontSize: 18 }}> {i18n.t('physicalActivityWhatsub')}</Text>
        </View>



        <View style={{ justifyContent: 'center', width: widthPercentageToDP('95'), alignItems: 'center' }}>
          <FlatList
            data={physicalActivityData}
            contentContainerStyle={{
              justifyContent: 'center'
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => this.submit(item?.SecretCode)} style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 300,
                  padding: 18,
                  margin: 10,
                  backgroundColor: '#ffffff',
                  shadowColor: '#D8D8D8',
                  shadowOffset: {
                    height: 5,
                    width: 3,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 5,
                  elevation: 10,
                  borderRadius: 7,
                }}>
                  <Text style={{ alignSelf: 'flex-start', color: '#2B2C2E', fontSize: 19 }}>{item?.title}</Text>
                  <Text style={{ alignSelf: 'flex-start', color: '#757575', fontSize: 14 }}>{item?.detail}</Text>
                </TouchableOpacity>
                // <TouchableOpacity style={styles.goal2} onPress={() => this.submit(item?.SecretCode)}>
                //   <View style={{ width: widthPercentageToDP('70'), height: heightPercentageToDP('6') }}>
                //     <Text style={{ color: '#2B2C2E', fontSize: 19, marginLeft: 25 }}>
                //       {item?.title}
                //     </Text>
                //     <Text
                //       style={{ color: '#757575', fontSize: 17, margin: 5, marginLeft: 25 }}>
                //       {item?.detail}
                //     </Text>
                //   </View>
                //   <Icon
                //     onPress={() =>
                //       Alert.alert(`${item?.title}`, `${item?.Info}`)
                //     }

                //     size={33}
                //     name='info'
                //     type='material'
                //     color='#4C9550'
                //   />
                // </TouchableOpacity>
              )
            }}
            keyExtractor={(item, index) => item + index.toString()}
          />
        </View>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    numberOfWorkouts: state.UPDATE_PHYSICAL_ACTIVITY.numberOfWorkouts,
    // routeName: state.ROUTE_NAME.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(physicalActivity);
