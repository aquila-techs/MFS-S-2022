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
  Dimensions,
  Constants,
} from 'react-native';

import renderIf from 'render-if';
import styles from './Styles';
import Colors from '../../../Theme/Colors';
import { Directions, ScrollView } from 'react-native-gesture-handler';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconA from 'react-native-vector-icons/AntDesign';
import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome5';

import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import localize from '../../../translation';
import Responsive from 'react-native-lightweight-responsive';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

const DATAActivity = [
  {
    id: 1,
    title: 'Beans & Peas',
    formulaValue: '',
    recentActivityCheck: false,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/run1.png'),
  },
  {
    id: 2,
    title: 'Beverages',
    formulaValue: '',
    recentActivityCheck: false,
    date: false,
    distance: true,
    duration: true,
    image: require('../../../Assets/walk1.png'),
  },
  {
    id: 3,
    title: 'Breads & Rolls',
    formulaValue: '',
    recentActivityCheck: false,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
  {
    id: 4,
    title: 'Cheese',
    formulaValue: '',
    recentActivityCheck: false,
    date: false,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
  {
    id: 5,
    title: 'Dairy & Eggs',
    formulaValue: '',
    recentActivityCheck: false,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
  {
    id: 6,
    title: 'Fats & Oils',
    formulaValue: '',
    recentActivityCheck: false,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },

  {
    id: 7,
    title: 'Fish & Seafood',
    formulaValue: '',
    recentActivityCheck: false,
    date: true,
    distance: true,
    duration: true,
    image: require('../../../Assets/starIcon.png'),
  },
];
const optionsData = [
  {
    key: 1,
    text: 'Honing',
    subText: '1 el(21 g)',
    kcal: '64 kcal',
  },
  {
    key: 2,
    text: 'Volkoenbrood',
    subText: '1 plakje(46 g)',
    kcal: '128 kcal',
  },
  {
    key: 3,
    text: 'Koffle met melk',
    subText: '1 plakje(46 g)',
    kcal: '128 kcal',
  },
  {
    key: 4,
    text: 'Volkoenbrood',
    subText: '1 plakje(46 g)',
    kcal: '128 kcal',
  },
  {
    key: 5,
    text: 'Koffle met melk',
    subText: '1 plakje(46 g)',
    kcal: '128 kcal',
  },
];

function ListItemActivity({ item }) {
  return (
    <View>
      {renderIf(!item.recentActivityCheck)(
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginBottom: '4%',
            marginLeft: '5%',
            marginRight: '5%',
            marginTop: '4%',
          }}>
          <Image
            style={{ width: 20, height: 20, marginRight: '3%' }}
            source={item.image}
          />
          <View style={{}}>
            <Text style={{ fontSize: 15, color: '#000' }}>{item.title}</Text>
          </View>
        </View>,
      )}
    </View>
  );
}

function ListItemDetailActivity({ item }) {
  return (
    <View>
      {renderIf(!item.recentActivityCheck)(
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginBottom: '4%',
            marginLeft: '5%',
            marginRight: '5%',
            marginTop: '4%',
          }}>
          <Image
            style={{ width: 20, height: 20, marginRight: '3%' }}
            source={item.image}
          />
          <View style={{}}>
            <Text style={{ fontSize: 15, color: '#000' }}>{item.title}</Text>
          </View>
        </View>,
      )}
    </View>
  );
}

const FirstRoute = () => (
  <View style={[styles.container, {}]}>
    <FlatList
      style={{
        marginTop: Responsive.height(5),
        marginBottom: Responsive.height(5),
      }}
      ItemSeparatorComponent={() => (
        <View
          style={{
            width: '100%',
            borderColor: '#707070',
            borderWidth: 0.3,
            opacity: 0.1,
            alignSelf: 'center',
          }}
        />
      )}
      data={DATAActivity}
      renderItem={({ item }) => (
        <TouchableOpacity
        //	onPress={() => actionActivity(item)}
        >
          <ListItemActivity item={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => item + index.toString()}
    />
  </View>
);
const SecondRoute = props => (
  <View style={[styles.container, {}]}>
    <FlatList
      scrollEnabled={true}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View
          style={{
            borderColor: '#707070',
            borderBottomWidth: 0.5,
            opacity: 0.3,
            marginTop: 1,
          }}
        />
      )}
      data={optionsData}
      renderItem={({ item }) => (
        <TouchableOpacity
          // onPress={() => props.navigation.navigate('Meals')}
          style={{ marginHorizontal: '5%', width: '93%', marginVertical: '3%' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: '#000', fontSize: 20, marginBottom: 2 }}>
              {item.text}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#b0bec5',
                fontWeight: '500',
                alignItems: 'center',
              }}>
              {item.subText}
            </Text>
          </View>
          <View style={{ position: 'absolute', right: 20 }}>
            <Text>{item.kcal}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => item + index.toString()}
    />
  </View>
);
const ThirdRoute = navigation => (
  <View style={[styles.container, {}]}>
    <FlatList
      scrollEnabled={true}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View
          style={{
            borderColor: '#707070',
            borderBottomWidth: 0.5,
            opacity: 0.3,
            marginTop: 1,
          }}
        />
      )}
      data={optionsData}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => this.abc()}
          style={{ marginHorizontal: '5%', width: '93%', marginVertical: '3%' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: '#000', fontSize: 20, marginBottom: 2 }}>
              {item.text}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#b0bec5',
                fontWeight: '500',
                alignItems: 'center',
              }}>
              {item.subText}
            </Text>
          </View>
          <View style={{ position: 'absolute', right: 20 }}>
            <Text>{item.kcal}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => item + index.toString()}
    />
  </View>
);
const FourthRoute = () => (
  <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
);
const FifthRoute = () => (
  <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
);

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.backButtonClick = this.backButtonClick.bind(this);
    this.state = {
      showMore: false,
      index: 0,
      routes: [
        {
          key: 'first',
          title: 'STAPLES',
          icon: <IconI name="fast-food-outline" size={25} color="black" />,
        },
        {
          key: 'second',
          title: 'CUSTOM',
          icon: <IconMC name="silverware-fork-knife" size={25} color="black" />,
        },
        {
          key: 'third',
          title: 'MEALS',
          icon: <IconMC name="food-variant" size={25} color="black" />,
        },
        {
          key: 'fourth',
          title: 'PREMIUM',
          icon: <IconMC name="chef-hat" size={25} color="black" />,
        },
        {
          key: 'fifth',
          title: 'RECIPES',
          icon: <IconM name="restaurant" size={25} color="black" />,
        },
      ],
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

  abc() {
    alert('TODO');
  }

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={{ flexDirection: 'row' }}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 255 : 0,
                ),
              }),
            ),
            0,
            0,
          );

          return (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                padding: 13,
              }}
              onPress={() => this.setState({ index: i })}>
              <View>
                <Text>{route.icon}</Text>
              </View>
              <Animated.Text style={{ color, fontSize: 12 }}>
                {route?.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    first: ThirdRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FirstRoute,
    fifth: FifthRoute,
  });

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            height: Platform.OS === 'android' ? '8%' : '9%',
            paddingTop: Platform.OS === 'android' ? 0 : '6%',
            flexDirection: 'row',
            shadowOpacity: 0.5,
            borderBottomWidth: 0,
            elevation: 3,
          }}>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginLeft: '5%',
              width: '10%',
              padding: 5,
            }}
            onPress={() => this.props.navigation.goBack()}>
            <IconA name="arrowleft" size={25} color="black" />
          </TouchableOpacity>
          <View
            style={{
              alignContent: 'center',
              width: '70%',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text style={{ color: '#000', fontSize: 19 }}>Stable Food</Text>
          </View>
        </View>

        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    //  updateGender:state.UPDATE_GENDER.updateGender,
    // routeName: state.ROUTE_NAME.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProduct);
