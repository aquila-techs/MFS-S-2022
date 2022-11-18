//import liraries
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import IconF from "react-native-vector-icons/FontAwesome";
import { heightPercentageToDP } from 'react-native-responsive-screen';
import IconM from 'react-native-vector-icons/MaterialIcons';
import i18n from '../../../../translation';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Exercice } from './Exercice'
import { ActionCreators } from '../../../Actions';
// create a component

class ExerciceLib extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workOutCategories: [
        {
          id: 0,
          name: i18n.t('FullBody'),
          value: "Full body",
          type: "Specification",
          check: false,
        },
        {
          id: 1,
          name: i18n.t('Core'),
          check: false,
          type: "Specification",
          value: "Core"
        },
        {
          id: 2,
          name: i18n.t('Glutes'),
          check: false,
          type: "Specification",
          value: "Glutes"
        },
        {
          id: 3,
          name: i18n.t('UpperBody'),
          check: false,
          type: "Specification",
          value: "Upper body"
        },
        {
          id: 4,
          name: i18n.t('LowerBody'),
          check: false,
          type: "Specification",
          value: "Lower body"
        },
      ],
      Engchecked: false,
    };
  }
  componentDidMount() {
    // console.log("bnvcdfbcvxc",this.props.workoutsList);
    if (this.props?.languageget === 'en') {
      this.setState({
        Engchecked: true
      })
    } else {
      this.setState({
        Engchecked: false
      })
    }
  }
  RenderMethod = (value) => {

    const { workoutsList } = this.props
    let filterdata = workoutsList?.filter(item => item?.specification === value?.value)

    this.props.navigation.navigate('PopularAndLists', {
      listname: value.name,
      categories: true,
      itemValue: value.value,
      listdata: filterdata,
      Language: this.props.languageget
    })
  }
  render() {
    const { Engchecked, workOutCategories } = this.state
    return (
      <SafeAreaView style={styles.container}>

        {/* Header Start */}
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            height: 70,
            flexDirection: 'row',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#eeeeee',
          }}>

          <TouchableOpacity style={{ alignSelf: 'center', marginLeft: '2%', width: '11%', padding: 10, justifyContent: 'center', }} onPress={() => this.props.navigation.goBack()}>
            <IconM name="arrow-back" size={25} color="black" />
          </TouchableOpacity>

          <View style={{ alignContent: 'center', width: '75%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
            <Text style={{ color: "#000", fontSize: 18, }}>{i18n.t('Exerciselibrary')}</Text>
          </View>

        </View>
        {/* Header End */}

        <FlatList
          data={workOutCategories}
          renderItem={({ item, index }) => {
            return (
              <View>

                <TouchableOpacity onPress={() => this.RenderMethod(item)} style={{ padding: 10, flexDirection: 'row', backgroundColor: '#ffffff' }}>
                  <View style={{ width: '90%', padding: 10 }}>
                    <Text>{item?.name}</Text>
                  </View>
                  <View style={{ width: '10%', padding: 10 }}>
                    <IconF name="angle-right" size={25} color="rgba(0,0,0,0.3)" />
                  </View>
                </TouchableOpacity>

              </View>
              // <Exercice onPress={() => {
              //   this.RenderMethod(item)
              // }} title={Engchecked ? item?.nameEn : item?.nameNl} />
            )
          }}
          keyExtractor={(item, index) => item + index.toString()}
        />
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {
    languageget: state.LANGUAGE_TRANSLATE.languageget,
    workoutsList: state.WORKOUTS_LIST_SHOW.workoutsList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
//make this component available to the app
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciceLib);
// export {ExerciceLib};
