//import liraries
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar, ScrollView, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
    ImageHeaderScrollView,
    TriggeringView,
} from "react-native-image-header-scroll-view";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import i18n from '../../../translation'
import tvShowContent from '../../WorkOutMain/TrainerProfile/Content';
import { colors, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements'
import Colors from '../../../Theme/Colors';
import RNFetchBlob from 'rn-fetch-blob';
import { API_URL, SERVER_URL } from '../../../Actions';
import { SocialContent } from './constant';

const MIN_HEIGHT = 40;
const MAX_HEIGHT = 350;
// create a component
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNavTitle: false,
            Engchecked: true,
            visible: false,
            data: null,
            Content: []
        };
    }
    componentDidMount() {
        const _id = this.props.route.params?._id
        const Token = this.props.route?.params?.token
        const Language = this.props.route?.params?.Language

        this.CreateWorkoutApi(_id, Token)

        if (Language === 'en') {
            this.setState({
                Engchecked: true
            })
        } else {
            this.setState({
                Engchecked: false
            })
        }

    }

    CreateWorkoutApi = (id, Token) => {
        let bodyData = {
            _id: id
        }

        this.setState(
            {
                visible: true,
            },
            () => {
                RNFetchBlob.fetch(
                    'POST',
                    API_URL + '/user/getUserProfileDetail',
                    {
                        Accept: 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        'auth-token': Token,
                    },
                    JSON.stringify(bodyData),
                ).then(res => {
                    const data = JSON.parse(res.data);

                    let array = []
                    SocialContent(data[0], array)

                    this.setState({
                        data: data[0],
                        Content: array,
                        visible: false
                    });
                }).finally(() => {
                    this.setState({
                        visible: false,
                    })
                });
            },
        );
    }

    render() {
        const { visible, data, Content } = this.state

        if (this.state.visible == true) {
            return (
                <View
                    style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: '#ffffff' }}>
                    <LottieView
                        style={{ width: wp('25%'), height: hp('25%') }}
                        source={require('../../../Assets/loader.json')}
                        loop={true}
                        autoPlay
                    />
                </View>
            )
        }

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='dark-content' />

                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ paddingHorizontal: "3%" }}>

                        <View style={{ marginTop: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#eeeeee', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ width: 50, alignSelf: 'flex-start' }} onPress={() => { this.props.navigation.pop() }} >
                                <Image
                                    source={require('./../../../Assets/Today/backButton.png')}
                                    style={{
                                        width: 50,
                                        tintColor: 'black',
                                        height: 50,
                                        marginTop: -5,
                                        marginBottom: 5
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <Image resizeMode='cover' style={{ borderRadius: 10, marginTop: 5, alignSelf: 'stretch', width: '100%', height: 340, marginBottom: 0 }} source={data?.profilePic ? { uri: SERVER_URL + data?.profilePic } : require('../../../Assets/defaultimage.png')} />


                        <View style={{ marginTop: 15, paddingTop: 10, paddingLeft: 15, paddingBottom: 10, paddingBottom: 0, paddingRight: 0, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', padding: 10 }}>
                            <Text style={[styles.name, { fontSize: 22 }]}>{data?.name}</Text>
                            <Text style={[styles.name, { fontWeight: 'normal', marginBottom: 15 }]}>{data?.email}</Text>
                        </View>

                        <View style={{ marginTop: 10, paddingTop: 10, paddingLeft: 15, paddingBottom: 10, paddingBottom: 0, paddingRight: 0, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', padding: 10 }}>
                            <View style={{ marginTop: 10, marginBottom: 15 }}>
                                {data?.city == "" ? null : <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ width: 20, height: 20, marginRight: 15 }} source={require('../../../Assets/icon/location.png')} />
                                    <Text style={{ fontSize: 18 }}>{data?.city} {data?.country} {data?.state}</Text>
                                </View>}
                                {/* {data?.gender == "" ? null :
                                    <View style={{ flexDirection: 'row', paddingTop: hp(2), alignItems: 'center' }}>
                                        <Image style={{ width: 22, height: 22, marginRight: 15 }} source={require('../../../Assets/icon/gender.png')} />
                                        <Text style={{ fontSize: 18, }}>{data?.gender}</Text>
                                    </View>
                                } */}
                            </View>
                        </View>


                        {data?.bio && <View style={{ marginTop: 10, paddingTop: 10, paddingLeft: 15, paddingBottom: 10, paddingRight: 15, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', padding: 10 }}>
                            <Text style={[styles.sectionTitle, { fontSize: 19 }]}>Overview</Text>
                            <Text style={[styles.sectionContent, { marginBottom: 15, fontSize: 14, marginTop: 5 }]}>{
                                i18n.locale == 'en' ?
                                    data?.bio
                                    :
                                    data?.bioDutch == undefined ? data?.bio : data?.bioDutch
                            }</Text>
                        </View>}

                        <View style={{ marginTop: 10, marginBottom: 15, paddingTop: 10, paddingLeft: 15, paddingBottom: 10, paddingRight: 15, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', padding: 10 }}>
                            <Text style={[styles.sectionTitle, { marginTop: 5, marginBottom: 15 }]}>Follow Us</Text>
                            <View style={[styles.keywords, { marginBottom: 10 }]}>
                                {Content.map(keyword => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(keyword?.link)
                                        }} key={keyword}>
                                            {keyword?.iconname == "facebook" ?
                                                <Image style={{ width: 40, height: 40, marginRight: 15 }} source={require('../../../Assets/icon/facebook.png')} />
                                                : null
                                            }
                                            {keyword?.iconname == "instagram" ?
                                                <Image style={{ width: 45, height: 45, marginRight: 15, marginTop: -2 }} source={require('../../../Assets/icon/instagram.png')} />
                                                : null
                                            }
                                            {keyword?.iconname == "linkedin" ?
                                                <Image style={{ width: 40, height: 40, marginRight: 15 }} source={require('../../../Assets/icon/linkedin.png')} />
                                                : null
                                            }
                                            {keyword?.iconname == "web" ?
                                                <Image style={{ width: 40, height: 40, marginRight: 15 }} source={require('../../../Assets/icon/website.png')} />
                                                : null
                                            }
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>

                    </View>
                </ScrollView>


            </SafeAreaView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    image: {
        height: MAX_HEIGHT,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
    },
    name: {
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionContent: {
        fontSize: 16,
        textAlign: 'left',
    },
    keywords: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    keywordContainer: {
        backgroundColor: Colors.green,
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    keyword: {
        fontSize: 16,
        color: 'white',
    },
    titleContainer: {
        // flex: 0.5,
        top: hp(2),
        // alignSelf: 'stretch',
        left: wp(5),
        // justifyContent: 'center',
        alignItems: 'center',
        width: wp(10),
    },
    // IconStyle: {
    //     // color: 'white',
    //     // tintColor:'white',
    //     // backgroundColor: 'white',
    //     // backgroundColor: 'transparent',
    //     fontSize: 40,
    // },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        backgroundColor: 'red',
        opacity: 0,
    },
    navTitle: {
        color: 'red',
        fontSize: 18,
        backgroundColor: 'red',
    },

    /////Increase the Header  height styles
    sectionLarge: {
        height: 550,
    },
});


//make this component available to the app
export { UserProfile };
