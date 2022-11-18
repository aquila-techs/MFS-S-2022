import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   timePassed: false

    // };
  }

  componentDidMount() {
    // const { navigate } = this.props.navigation;
    // setTimeout(() => {
    //  this.props.navigation.navigate('SplashScreen')
    // }, 4000);
  }

  render() {
    return (
      <ImageBackground
        source={require('../Assets/Images/background2.png')}
        style={styles.Background}>
        <StatusBar hidden={true} translucent={true} />
        <Image
          style={{width: '110%', height: '8.5%', marginLeft: -20}}
          source={require('../Assets/Images/main123.png')}
        />

        <View style={{flex: 1}} />
        <View style={{flex: 1}}>
          <Image
            style={styles.images}
            width={100}
            height={35}
            source={require('../Assets/Images/Welcome.png')}
          />
        </View>

        <View style={styles.comencemos_botón}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SplashScreen')}>
            <Image
              style={styles.Button}
              width={110}
              height={155}
              source={require('../Assets/Images/material-touch-app.png')}
            />
          </TouchableOpacity>
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
});
