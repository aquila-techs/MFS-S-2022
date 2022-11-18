import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import styles from "./style";
import Colors from "../../Theme/Colors";
import IconF from "react-native-vector-icons/FontAwesome";
import renderIf from "render-if";

import { ActionCreators } from "../../Actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import i18n from "../../../translation";

import { API_URL } from '../../Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Weight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weightKG: "",
      weightLB: "",
      unit: "kg",
    };
  }

  componentDidMount() {
    this.getProfile()
  }

  async getProfile() {
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
          this.setState({ weightKG: responseJson.weight })
        }
      })
      .catch((error) => {
        alert(error);
      })
  }

  weightValidations() {
    const { weightKG } = this.state;
    const { weightLB } = this.state;
    if (this.state.unit == "kg") {
      if (weightKG > 200 || weightKG < 20) {
        Alert.alert(i18n.t("weightError1"));
        return false;
      } else {
        this.submit(weightKG);
      }
    } else {
      if (weightLB > 440 || weightLB < 44) {
        Alert.alert(i18n.t("weightError2"));
        return false;
      } else {
        let h = Math.round(weightLB / 2.2046);
        this.submit(h);
      }
    }
  }

  submitLB(data) {
    // alert('hello');
    const _this = this;
    _this.props.setWeightAction(parseInt(data)).then((status) => {
      this.setState({}, () => {
        if (status.status) {
          //  alert(JSON.stringify(this.props.updateWeight))
          this.props.navigation.navigate("currentfat");
        }
      });
    });
  }

  submit(data) {
    const _this = this;

    _this.props.setWeightAction(parseInt(data)).then((status) => {
      this.setState({}, () => {
        if (status.status) {
          //  alert(JSON.stringify(this.props.updateWeight))
          this.props.navigation.navigate("goal");
        }
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={[styles.goal5, { marginTop: -20 }]}>
              <Text style={{ color: "#000", fontSize: 25, marginBottom: -15 }}>
                {i18n.t("weightWhat")}?
              </Text>
            </View>


            {renderIf(this.state.unit == "kg")(
              <View style={{ flexDirection: "row", margin: 20 }}>
                <TextInput
                  value={this.state.weightKG.toString()}
                  autoFocus={true}
                  onChangeText={(text) => {
                    this.setState({
                      weightKG: text,
                    });
                  }}
                  placeholder="0"
                  maxLength={3}
                  returnKeyType="done"
                  // placeholderTextColor="#9E9F9D"
                  underlineColorAndroid="transparent"
                  style={styles.heightTextInputStyle}
                  keyboardType={"numeric"}
                />
                <Text style={styles.headerSideText}>KG</Text>
              </View>
            )}
            {renderIf(this.state.unit == "lb")(
              <View style={{ flexDirection: "row", margin: 20 }}>
                <TextInput
                  value={this.state.weightLB.toString()}
                  autoFocus={true}
                  onChangeText={(text) => {
                    this.setState({
                      weightLB: text,
                    });
                  }}
                  placeholder="0"
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    this.weightValidations()
                  }}
                  // placeholderTextColor="#9E9F9D"
                  underlineColorAndroid="transparent"
                  style={styles.heightTextInputStyle}
                  maxLength={3}
                  keyboardType={"numeric"}
                />
                <Text style={styles.headerSideText}>LB</Text>
              </View>
            )}

            <View style={styles.gendermain}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    weightKG: (this.state.weightLB / 2.2046).toFixed(),
                    unit: "kg",
                  });
                }}
                style={[
                  styles.heightbuttons,
                  styles.borderRadiusLeft,
                  this.state.unit == "kg" ? styles.selectedbutton : {},
                ]}
              >
                <Text style={{ color: this.state.unit == "kg" ? "#000" : "#999" }}>
                  KG
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    weightLB: (this.state.weightKG * 2.2046).toFixed(),
                    unit: "lb",
                  });
                }}
                style={[
                  styles.heightbuttons,
                  styles.borderRadiusRight,
                  this.state.unit == "lb" ? styles.selectedbutton : {},
                ]}
              >
                <Text style={{ color: this.state.unit == "lb" ? "#000" : "#999" }}>
                  LB
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View style={{ marginTop: "5%", width: "100%" }}>
          <TouchableOpacity
            onPress={() => this.weightValidations()}
            style={{
              marginTop: 20,
              height: 50,
              width: 50,
              marginLeft: "auto",
              marginRight: "10%",
              // borderColor: '#B76EC6',
              // borderWidth: 1,
              padding: 10,
              backgroundColor: Colors.green,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
          >
            <IconF
              name="arrow-right"
              size={20}
              color="#ffffff"
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 80 }}></View>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    // sessionKey: state.SESSION_KEY.sessionKey,
    updateWeight: state.UPDATE_WEIGHT.updateWeight,
    // routeName: state.ROUTE_NAME.routeName,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Weight);
