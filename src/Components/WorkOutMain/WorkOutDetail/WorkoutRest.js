//import liraries
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import IconA from 'react-native-vector-icons/AntDesign';
import IconI from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
// create a component
class Rest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 10,
    };
  }
  componentDidMount() {
    this.interval = setInterval(
      () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
      1300
    );
  }
  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.interval);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  RestCounter = () => {
    if (this.state.timer === 1) {
      this.props.navigation.goBack(null)
    }
  }
  render() {
    this.RestCounter()
    const { listItem } = this.props?.route?.params;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={false} />
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            height: '7.5%',
            marginTop: Platform.OS === 'android' ? 0 : '3%',
            flexDirection: 'row',
            backgroundColor: 'white',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            shadowOpacity: Platform.OS === 'android' ? 0.5 : 0,
            borderBottomWidth: 0,
            elevation: 3,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            //    onPress={()=>this.props.navigation.navigate('Settings')}
            style={{ position: 'absolute', left: '5%', padding: 5 }}>
            <IconA name="arrowleft" size={22} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ height: '20%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, paddingVertical: 10 }}>
            {"Get ready:"}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 45,
              fontWeight: '700',
            }}>
            00 : {this.state?.timer < 10 ? '0' : null}{this.state?.timer}
          </Text>
        </View>
        <View style={{ height: '50%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 25 }}>
            {"Next up:"}
          </Text>
          <Video
            muted={true}
            repeat={true}
            selectedVideoTrack={{
              type: "resolution",
              value: 1080
            }}
            source={{
              uri: listItem?.category_id?.videoUrl,
            }} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref;
            }} // Store reference
            style={{
              width: '80%',
              height: Responsive.height(200),
              shadowColor: '#D8D8D8',
              shadowOpacity: 1,
              shadowRadius: 2,
              borderRadius: 10,
              elevation: 5,
              borderColor: '#D8D8D8',
              shadowOffset: {
                height: 2,
                width: 1,
              },
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: '500', paddingBottom: 20 }}>
            {listItem?.name}
          </Text>
          <Text style={{ fontSize: 20 }}>
            {"right"}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', }}>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 20,
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
              }}
              //onPress={()=>this.props.navigation.navigate('Settings')}
              style={{
                position: 'absolute',
                left: '5%',
                borderRadius: 30,
                backgroundColor: '#F8F8F8',
                padding: 10,
              }}>
              <IconI name="information" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
              //   this.setState({ detailView: !this.state.detailView })
              { }}
              //onPress={()=>this.props.navigation.navigate('Settings')}
              style={{
                position: 'absolute',
                borderRadius: 30,
                backgroundColor: '#F8F8F8',
                padding: 15,
              }}>
              <IconF name="pause" size={22} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack()
                //   if (this.state.DataItem.length -1 === this.state.getindex) {
                //     alert("Already Complted")
                //   }
                //   else {
                //     this.Completeworkout(this.state.DataItem[this.state.getindex]?.category_id?._id,this.state.DataItem[this.state.getindex]?._id)
                //   }
              }
              }
              //onPress={()=>this.props.navigation.navigate('Settings')}
              style={{
                position: 'absolute',
                right: '5%',
                borderRadius: 30,
                backgroundColor: '#F8F8F8',
                padding: 15,
              }}>
              <IconA name="arrowright" size={22} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export { Rest };
