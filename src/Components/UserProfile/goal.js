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

class goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalValue: '',
      setinfo: '',
      setinfodetail: '',
      GoalData: [
        {
          id: 1,
          title: i18n.t('weightMaintenance'),
          detail: i18n.t('weightMaintenanceDescription'),
          SecretCode: "A",
          Info: i18n.t('gain')
        },
        {
          id: 2,
          title: i18n.t('steadyWeightLoss'),
          detail: i18n.t('steadyWeightLossDescription'),
          SecretCode: "G",
          Info: i18n.t('Mucle')
        },
        {
          id: 3,
          title: i18n.t('moderateWeightLoss'),
          detail: i18n.t('moderateWeightLossDescription'),
          SecretCode: "M",
          Info: i18n.t('Vlose')
        },
        {
          id: 4,
          title: i18n.t("acceleratedWeightloss"),
          detail: i18n.t('acceleratedWeightlossDescription'),
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
    _this.props.setGoalAction(data).then(status => {
      // console.log('signin: ', status, data);
      this.setState({}, () => {
        if (status.status) {
          //alert(JSON.stringify(this.props.updateGoal))
          this.props.navigation.navigate('physicalActivity');
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
    const { visible, GoalData, setinfo, setinfodetail } = this.state
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
          <Text style={{ color: '#000', fontSize: 22, marginBottom: 20 }}>
            {i18n.t('goalWhat')}?
          </Text>
        </View>
        <View style={{ justifyContent: 'center', width: widthPercentageToDP('95'), alignItems: 'center' }}>
          <FlatList
            data={GoalData}
            contentContainerStyle={{
              justifyContent: 'center'
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => this.submit(item?.SecretCode)} style={{
                  justifyContent: 'center',
                  alignItems: 'center',
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
                //   <View style={{width:widthPercentageToDP('70'),height:heightPercentageToDP('6')}}>
                //     <Text style={{ color: '#2B2C2E', fontSize: 19, marginLeft: 25, marginTop:-20 }}>
                //       {item?.title}
                //     </Text>
                //     <Text
                //       style={{ color: '#757575', fontSize: 14, margin: 5, marginLeft: 25 }}>
                //       {item?.detail}
                //     </Text>
                //   </View>
                //   <Icon
                //     onPress={() =>
                //       Alert.alert(`${item?.title}` ,`${item?.Info}`)
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
        {/* <TouchableOpacity style={styles.goal2} onPress={() => this.submit('G')}>
          <View>
            <Text style={{ color: '#2B2C2E', fontSize: 19, marginLeft: 25 }}>
              {localize.t('getfitter')}
            </Text>
            <Text
              style={{ color: '#757575', fontSize: 17, margin: 5, marginLeft: 25 }}>
              {localize.t('toneUp')}
            </Text>
          </View>
          <Icon
          onPress={()=>
            this.ToggleOverlay()
          }
          size={33}
            name='info'
            type='material'
            color='#517fa4'
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.goal2} onPress={() => this.submit('M')}>
          <View>
            <Text style={{ color: '#2B2C2E', fontSize: 19, marginLeft: 25 }}>
              {localize.t('gainmuscle')}
            </Text>
            <Text
              style={{ color: '#757575', fontSize: 17, margin: 5, marginLeft: 25 }}>
              {localize.t('buildmass')}
            </Text>
          </View>
          <Icon
            onPress={()=>{
              this.ToggleOverlay()
            }}
            size={33}
            name='info'
            type='material'
            color='#517fa4'
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.goal2} onPress={() => this.submit('V')}>
          <View>
            <Text style={{ color: '#2B2C2E', fontSize: 19, marginLeft: 25 }}>
              {localize.t('loseweight')}
            </Text>
            <Text
              style={{ color: '#757575', fontSize: 17, margin: 5, marginLeft: 25 }}>
              {localize.t('getmotivated')}
            </Text>
          </View>
          <Icon
            onPress={()=>{
              alert("HELLO")
            }}
            size={33}
            name='info'
            type='material'
            color='#517fa4'
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.goal2} onPress={() => this.submit('V')}>
          <View>
            <Text style={{ color: '#2B2C2E', fontSize: 19, marginLeft: 25 }}>
              {'Accelerated Weightlose'}
            </Text>
            <Text
              style={{ color: '#757575', fontSize: 17, margin: 5, marginLeft: 25 }}>
              {'Lose fat & hard to Sustain'}
            </Text>
          </View>
          <Icon
            onPress={()=>{
              alert("HELLO")
            }}
            size={33}
            name='info'
            type='material'
            color='#517fa4'
          />
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('routine');
          }}
          style={{
            position: 'absolute',
            right: '10%',
            bottom: '10%',
            backgroundColor: '#4C9550',
            height: '5%',
            width: '20%',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: 'white'}}>Skip</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    updateGoal: state.UPDATE_GOAL.updateGoal,
    // routeName: state.ROUTE_NAME.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(goal);
