import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './Styles';
import {ActionCreators} from '../../../Actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.mainViewStyle}>
        <Text>Home!</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
