import React, { Component, Fragment } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    Platform,
    FlatList,
    ActivityIndicator,
    Image,
    Dimensions,
    StatusBar,
    Modal,
    Animated,
    Alert,
} from 'react-native';
import { styles } from './Styles';
import IconF from 'react-native-vector-icons/FontAwesome5';
import IconA from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL, SERVER_URL } from '../../../Actions';
import { ActionCreators } from '../../../Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Overlay } from 'react-native-elements'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { CheckBox, Icon } from 'react-native-elements';
import { ListItemNew } from './ListItem'
import RNFetchBlob from 'rn-fetch-blob';
import i18n from 'react-native-i18n'
// import Modal from 'react-native-modal';
import _ from 'lodash';
import Colors from '../../../Theme/Colors';
import Responsive from 'react-native-lightweight-responsive';

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
import renderIf from 'render-if';
import { SafeAreaView } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
const workOutCategories = [
    { nameEn: 'FULL BODY', value: 'Full body', nameNl: 'FULL BODY' },
    { nameEn: 'CORE', value: 'Core', nameNl: 'CORE' },
    { nameEn: 'GLUTES', value: 'Glutes', nameNl: 'BILSPIEREN' },
    { nameEn: 'UPPER BODY', value: 'Upper body', nameNl: 'BOVENLICHAAM' },
    { nameEn: 'LOWER BODY', value: 'Lower body', nameNl: 'ONDERLICHAAM' },
];


function ListItemShort({ Language, item, token, navigation }) {
    return (
        item.email == 'mara@dilorenzo.be' || item.email == 'personaltraining@dilorenzo.be' ? <TouchableOpacity
            onPress={() => navigation.navigate('UserProfile', {
                _id: item?._id,
                token: token,
                Language: Language
            })}

        >
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 10,
                    marginRight: 15
                }}>
                <Image source={item?.profilePic ? { uri: SERVER_URL + item?.profilePic } : require('../../../Assets/defaultimage.png')} style={styles.itemShortImage} />
                <Text style={{ marginTop: 10, fontSize: 17 }}>{item?.name ?? ''}</Text>
            </View>
        </TouchableOpacity>
            :
            null
    );


}
function ListItemSearchWorkout({ item, that, referrelUse, referrelPurchaseValid, userSubscription, Engchecked }) {
    return (
        <View
            style={{
                marginVertical: 10,
                marginHorizontal: Responsive.width(25),
            }}>
            <ImageBackground
                imageStyle={{ borderRadius: 10 }}
                source={{
                    uri: SERVER_URL + item?.featureImage?.l ?? 'public/images_data/l-Ac_0M1aXT3JO9_tG1.webp',
                }} style={styles.feedSearchStyle}>
                <View style={{ flexDirection: 'column', flex: 1 }}>

                    <View style={{ flexDirection: 'row' }}>
                        {
                            referrelUse == 'false' ?
                                item.pricing !== 'free' && userSubscription === undefined && (
                                    <TouchableOpacity
                                        onPress={() =>
                                            userSubscription !== undefined &&
                                            that.props.navigation.navigate('PackageMeal')
                                        }
                                        style={{
                                            position: 'absolute',
                                            left: '5%',
                                            borderRadius: 20,
                                            marginTop: Responsive.height(5),
                                            backgroundColor: 'grey',
                                            width: Responsive.width(22),
                                            height: Responsive.height(22),
                                        }}>
                                        <IconF
                                            name="lock"
                                            size={14}
                                            color="white"
                                            style={{
                                                alignSelf: 'center',
                                                alignItems: 'center',
                                                marginTop: Responsive.height(3),
                                            }}
                                        />
                                    </TouchableOpacity>
                                )
                                :
                                referrelUse == 'true' && referrelPurchaseValid == 'true' ?
                                    null :
                                    referrelUse == 'true' && referrelPurchaseValid == 'false' ?
                                        item.pricing !== 'free' && userSubscription === undefined && (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    userSubscription !== undefined &&
                                                    that.props.navigation.navigate('PackageMeal')
                                                }
                                                style={{
                                                    position: 'absolute',
                                                    left: '5%',
                                                    borderRadius: 20,
                                                    marginTop: Responsive.height(5),
                                                    backgroundColor: 'grey',
                                                    width: Responsive.width(22),
                                                    height: Responsive.height(22),
                                                }}>
                                                <IconF
                                                    name="lock"
                                                    size={14}
                                                    color="white"
                                                    style={{
                                                        alignSelf: 'center',
                                                        alignItems: 'center',
                                                        marginTop: Responsive.height(3),
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        ) : null

                        }

                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            bottom: '5%',
                            left: '5%',
                        }}>
                        <View>
                            <Text
                                style={{
                                    color: '#ffffff',
                                    fontWeight: '400',
                                    textAlign: 'center',
                                    padding: 3,
                                    paddingLeft: 8,
                                    paddingRight: 8,
                                    alignSelf: 'center',
                                    backgroundColor: Colors.green,
                                    borderRadius: 10,
                                    marginBottom: 5,
                                    flexWrap: 'wrap',
                                    fontSize: 13,
                                }}>
                                {item?.difficulityLevel}
                            </Text>
                        </View>
                    </View>

                </View>
            </ImageBackground>
            <Text style={[styles.feedTitleText, { marginTop: 10, marginLeft: 20, fontWeight: 'bold', fontSize: 18 }]}>{item?.specification}</Text>
        </View>
    );
}
var filterBodyPart = [];
var filterLevel = [];
var filterarray = [];
var searcharray = [];

class WorkoutFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {

            myFilter: [

                // Specification

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

                // DifficultLevel

                {
                    id: 5,
                    name: 'Beginner',
                    value: "Beginner",
                    check: false,
                    type: "DifficultLevel",
                },
                {
                    id: 6,
                    name: i18n.t('Intermediate'),
                    check: false,
                    type: "DifficultLevel",
                    value: "Intermediate"
                },
                {
                    id: 7,
                    name: i18n.t('Advanced'),
                    check: false,
                    type: "DifficultLevel",
                    value: "Advanced"
                },
                {
                    id: 8,
                    name: 'Pro',
                    check: false,
                    type: "DifficultLevel",
                    value: "Pro"
                },

                // Equipment

                {
                    id: 9,
                    name: i18n.t('None'),
                    value: "None",
                    type: "Equipment",
                    check: false
                },
                {
                    id: 10,
                    name: i18n.t('Gluteband'),
                    check: false,
                    type: "Equipment",
                    value: "Gluteband"
                },
                {
                    id: 11,
                    name: i18n.t('ResistanceBand'),
                    check: false,
                    type: "Equipment",
                    value: "Resistanceband"
                },
                {
                    id: 12,
                    name: 'Dumbbell',
                    check: false,
                    type: "Equipment",
                    value: "Dumbell"
                },
                {
                    id: 13,
                    name: 'Barbell',
                    check: false,
                    type: "Equipment",
                    value: "Barbell"
                },
                {
                    id: 14,
                    name: i18n.t('Ring'),
                    check: false,
                    type: "Equipment",
                    value: "Rings"
                },
                {
                    id: 15,
                    name: i18n.t('Accestogym'),
                    check: false,
                    type: "Equipment",
                    value: "Accestogym"
                },

                // Type

                {
                    id: 16,
                    name: i18n.t('FitBody'),
                    check: false,
                    type: "Type",
                    value: "Fit body"
                },
                {
                    id: 17,
                    name: i18n.t('FatBurning'),
                    check: false,
                    type: "Type",
                    value: "Fat Burning"
                },

                // Subscription

                {
                    id: 18,
                    name: i18n.t('Free'),
                    check: false,
                    type: "Subscription",
                    value: "free"
                },
                {
                    id: 19,
                    name: i18n.t('Paid'),
                    check: false,
                    type: "Subscription",
                    value: "paid"
                },

            ],

            specification: [
                {
                    id: 0,
                    name: i18n.t('FullBody'),
                    value: "Full body",
                    check: false,
                },
                {
                    id: 1,
                    name: i18n.t('Core'),
                    check: false,
                    value: "Core"
                },
                {
                    id: 2,
                    name: i18n.t('Glutes'),
                    check: false,
                    value: "Glutes"
                },
                {
                    id: 3,
                    name: i18n.t('UpperBody'),
                    check: false,
                    value: "Upper body"
                },
                {
                    id: 4,
                    name: i18n.t('LowerBody'),
                    check: false,
                    value: "Lower body"
                },
            ],
            DifficultLevel: [
                {
                    id: 0,
                    name: 'Beginner',
                    value: "Beginner",
                    check: false
                },
                {
                    id: 1,
                    name: i18n.t('Intermediate'),
                    check: false,
                    value: "Intermediate"
                },
                {
                    id: 2,
                    name: i18n.t('Advanced'),
                    check: false,
                    value: "Advanced"
                },
                {
                    id: 3,
                    name: 'Pro',
                    check: false,
                    value: "Pro"
                },
            ],
            Equipment: [
                {
                    id: 0,
                    name: i18n.t('None'),
                    value: "None",
                    check: false
                },
                {
                    id: 1,
                    name: i18n.t('Gluteband'),
                    check: false,
                    value: "Gluteband"
                },
                {
                    id: 2,
                    name: i18n.t('ResistanceBand'),
                    check: false,
                    value: "Resistanceband"
                },
                {
                    id: 3,
                    name: 'Dumbbell',
                    check: false,
                    value: "Dumbell"
                },
                {
                    id: 4,
                    name: 'Barbell',
                    check: false,
                    value: "Barbell"
                },
                {
                    id: 5,
                    name: i18n.t('Ring'),
                    check: false,
                    value: "Rings"
                },
                {
                    id: 6,
                    name: i18n.t('Accestogym'),
                    check: false,
                    value: "Accestogym"
                },
            ],

            check: 0,
            sliderValue: 0,
            modalVisible: true,
            workoutDuration: 0,
            bodyParts: 1,
            difficultyLevel: 1,
            sweatFactor: 1,
            Categories: 1,
            results: 0,
            selectedLang: 0,
            visible: false,
            //////Body Part CheckBox
            lwBody: false,
            upbody: false,
            CoreBosy: false,
            flBody: false,

            //////Difficult Level CheckBox
            FrStep: false,
            InterStep: false,
            BgStep: false,
            AdStep: false,

            //////Sweat Fector CheckBox
            Fitbody: false,
            fatburning: false,

            ///// Categories CheckBox
            Hiit: false,
            yoga: false,
            Strength: false,
            Pilates: false,
            Stretch: false,
            Boxing: false,
            accesgym: false,
            /// SubCription checkBox
            free: false,
            Paid: false,

            referrelUse: '',
            referrelPurchaseValid: '',

            ///Slider Value
            DATASHORT: [],
            firstvalue: 0,
            lastvalue: 60,
            postdata: [],
            filterResult: [],
            searchResultCheck: false,
            workoutsList: this.props.workoutsList.filter(item => item?.time >= 0 && item?.time <= 60)?.map(item => {
                return {
                    ...item,
                    categories: item?.categories.reduce((a, v) => ({ ...a, [v]: v }), {})
                }
            }),
            workoutsNewList: [],
            workoutsPopularList: [],
            loader: false,
            mainLoader: false,
            spindex: 0,
            Engchecked: false,
            scrollY: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            checkedItems: new Map(),
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        const data = this.props.workoutsList.filter(item => item?.time >= 0 && item?.time <= 60)?.map(item => {
            return {
                ...item,
                categories: item?.categories.reduce((a, v) => ({ ...a, [v]: v }), {})
            }
        });
        filterarray = data
    }

    handleChange(event) {
        var isChecked = event.target.checked;
        var item = event.target.value;
        alert(event.target.value);
        this.setState(prevState => ({
            checkedItems: prevState.checkedItems.set(item, isChecked),
        }));
    }

    handleSubmit(event) {

        event.preventDefault();
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    setSearchResultCheck(visible) {
        this.setState({ searchResultCheck: visible });
    }

    openViewResult = async () => {

        const Specification = []
        const checkSpecificationTrue = this.state.myFilter.filter((item) => item.type == "Specification" && item.check == true)
        checkSpecificationTrue.map((item) => {
            const value = item.value
            Specification.push(value)
        })

        const DifficultLevel = []
        const checkDifficultLevelTrue = this.state.myFilter.filter((item) => item.type == "DifficultLevel" && item.check == true)
        checkDifficultLevelTrue.map((item) => {
            const value = item.value
            DifficultLevel.push(value)
        })

        const Equipment = []
        const checkEquipmentTrue = this.state.myFilter.filter((item) => item.type == "Equipment" && item.check == true)
        checkEquipmentTrue.map((item) => {
            const value = item.value
            Equipment.push(value)
        })

        const Type = []
        const checkTypeTrue = this.state.myFilter.filter((item) => item.type == "Type" && item.check == true)
        checkTypeTrue.map((item) => {
            const value = item.value
            Type.push(value)
        })

        const Subscription = []
        const checkSubscriptionTrue = this.state.myFilter.filter((item) => item.type == "Subscription" && item.check == true)
        checkSubscriptionTrue.map((item) => {
            const value = item.value
            Subscription.push(value)
        })

        fetch(`${API_URL}/workout/get/allFilter`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'auth-token': this.props.token,
            },
            body: JSON.stringify({
                time: this.state.sliderValue,
                equipment: Equipment,
                specification: Specification,
                difficulityLevel: DifficultLevel,
                categories: Type,
                pricing: Subscription
            })
        }).then(r => r.json())
            .then(response => {

                this.setState({ filterResult: response.data })
                this.setState({ searchResultCheck: true });
            })
            .catch(e => console.log(e));
    }

    multiSliderValuesChange(value) {
        this.setState({ sliderValue: value });
    }

    componentDidMount = async () => {

        const referrelUse = await AsyncStorage.getItem("referrelUse")
        const referrelPurchaseValid = await AsyncStorage.getItem("referrelPurchaseValid")

        this.setState({
            referrelUse: referrelUse,
            referrelPurchaseValid: referrelPurchaseValid
        })

        if (this.props?.languageget === 'en') {
            this.setState({
                Engchecked: true
            })
        } else {
            this.setState({
                Engchecked: false
            })
        }

        const { navigation } = this.props;
        const unsubscribe = navigation.addListener('focus', () => {

        });
    }

    CreateWorkoutApi1 = async (item) => {

        this.setState({ mainLoader: true })

        fetch(`${API_URL}/user/getUserProfileDetail`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'auth-token': this.props.token,
            },
            body: JSON.stringify({
                _id: item.createdBy
            })
        }).then(r => r.json())
            .then(response => {
                this.setState({ mainLoader: false })
                this.props.navigation.navigate('WorkOutPreview', {
                    listItem: item,
                    categories: true,
                    userdata: response[0],
                    UW_id: item._id
                })
            })
            .catch(e => console.log(e));

    }

    checkCondition = async (item) => {

        if (this.state.referrelUse == 'false') {

            item?.pricing == 'free' ||
            this.props?.userSubscription !== undefined ?
                this.CreateWorkoutApi1(item)
                : this.props.navigation.navigate('PackageMeal');
            this.setSearchResultCheck(true)
            this.setModalVisible(!this.state.modalVisible);

        } else if (this.state.referrelUse == 'true' && this.state.referrelPurchaseValid == 'true') {
            this.CreateWorkoutApi1(item)
        } else if (this.state.referrelUse == 'true' && this.state.referrelPurchaseValid == 'false') {

            item?.pricing == 'free' ||
            this.props?.userSubscription !== undefined ?
                this.CreateWorkoutApi1(item)
                :
                this.props.navigation.navigate('PackageMeal');
            this.setSearchResultCheck(true)
            this.setModalVisible(!this.state.modalVisible);

        }

        // item?.pricing == 'free' ||
        //     this.props?.userSubscription !== undefined
        //     ? this.CreateWorkoutApi1(item)
        //     : this.props.navigation.navigate('PackageMeal');
        // this.setSearchResultCheck(false)
        // this.setModalVisible(!this.state.modalVisible);
    }

    render() {

        const { workoutsList, Engchecked, myFilter } = this.state

        if (this.state.mainLoader == true) {
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
            <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
                <StatusBar backgroundColor={'#000000'} barStyle="light-content" />

                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#fff',
                        flex: 1,
                        flexDirection: 'column',
                        marginTop: Platform.OS == 'ios' ? 20 : 0
                    }}>
                    <View
                        style={{
                            position: 'relative',
                            top: 0,
                            backgroundColor: '#fff',
                            width: '100%',
                            height: Platform.OS === 'android' ? '8%' : '10%',
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            alignSelf: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            shadowOpacity: Platform.OS === 'android' ? 0.3 : 0.01,
                            borderBottomWidth: 0,
                            elevation: 3,
                        }}>

                        {renderIf(this.state?.searchResultCheck)(
                            <TouchableOpacity
                                style={{ position: 'absolute', left: '7%', padding: 5 }}
                                onPress={() => this.setSearchResultCheck(false)}>
                                <IconA name="close" size={25} color="black" />
                            </TouchableOpacity>
                        )}

                        {renderIf(!this.state?.searchResultCheck)(
                            <TouchableOpacity
                                style={{ position: 'absolute', left: '7%', padding: 5 }}
                                onPress={() => this.props.navigation.goBack(null)}>
                                <IconA name="close" size={25} color="black" />
                            </TouchableOpacity>
                        )}

                        <Text style={{ color: '#000', fontSize: 18, alignSelf: 'center' }}>
                            {i18n.t('Searchworkouts')}
                        </Text>

                        {renderIf(this.state?.searchResultCheck)(
                            <TouchableOpacity
                                style={{ position: 'absolute', right: '7%', padding: 5 }}
                                onPress={() => this.setSearchResultCheck(false)}>
                                <IconA name="filter" size={25} color="black" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {renderIf(!this.state.searchResultCheck)(
                        <Fragment>
                            <ScrollView contentContainerStyle={{ paddingBottom: '40%', paddingHorizontal: "3%" }}>

                                <View style={{ marginTop: 20, paddingTop: 10, paddingLeft: 15, paddingBottom: 10, paddingRight: 0, borderRadius: 10, borderWidth: 1, borderColor: '#eeeeee', padding: 10 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, marginBottom: 10 }}>{i18n.t('WORKOUTSDURATION')}</Text>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <MultiSlider
                                            values={[this.state.firstvalue]}
                                            min={0}
                                            max={60}
                                            enabledTwo={true}
                                            onValuesChange={value => {
                                                const data = this.props.workoutsList?.map(item => {
                                                    return {
                                                        ...item,
                                                        categories: item?.categories.reduce((a, v) => ({ ...a, [v]: v }), {})
                                                    }
                                                })
                                                filterarray = this.props.workoutsList.filter(item => item?.time >= value[0] && item?.time <= value[1])
                                                searcharray = this.props.workoutsList.filter(item => item?.time >= value[0] && item?.time <= value[1])
                                                this.setState({
                                                    firstvalue: value[0],
                                                    lastvalue: value[1],
                                                    workoutsList: data.filter(item => item?.time >= value[0] && item?.time <= value[1])
                                                })
                                                this.multiSliderValuesChange(value)
                                            }
                                            }
                                            trackStyle={{
                                                backgroundColor: 'lightgray',
                                            }}
                                            selectedStyle={{
                                                backgroundColor: '#68BC45',
                                            }}
                                            sliderLength={Dimensions.get('window').width - 100}
                                            pressedMarkerStyle={styles.pressedMarker}
                                        />

                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ width: '50%', }}>
                                                <Text style={{ marginLeft: 10 }}>{`${this.state.firstvalue} ${i18n.t('minute')}`}</Text>
                                            </View>
                                            <View style={{ width: '50%' }}>
                                                {/* <Text style={{ alignSelf: 'flex-end', marginRight: 15 }}>{`60 ${i18n.t('minute')}`}</Text> */}
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginTop: 10 }}>

                                    <FlatList data={this.state.myFilter}

                                        contentContainerStyle={{ zIndex: 1, }}
                                        keyExtractor={(item, index) => item + index.toString()}
                                        renderItem={({ item, index }) => {

                                            return (
                                                <View>

                                                    {index == 0 ?
                                                        <View style={styles.headerGoalText}>
                                                            <Text
                                                                style={{
                                                                    marginTop: 20,
                                                                    marginRight: 'auto',
                                                                    marginLeft: Responsive.width(18),
                                                                    color: '#000000',
                                                                    fontSize: 18,
                                                                    fontWeight: 'bold',
                                                                }}>
                                                                {i18n.t('Specifications')}
                                                            </Text>
                                                        </View>
                                                        : null
                                                    }

                                                    {index == 5 ?
                                                        <View style={styles.headerGoalText}>
                                                            <Text
                                                                style={{
                                                                    marginTop: 30,
                                                                    marginRight: 'auto',
                                                                    marginLeft: Responsive.width(18),
                                                                    color: '#000000',
                                                                    fontSize: 18,
                                                                    fontWeight: 'bold',
                                                                }}>
                                                                {i18n.t('DIFFICULTYLEVEL')}
                                                            </Text>
                                                        </View>
                                                        : null
                                                    }

                                                    {index == 9 ?
                                                        <View style={styles.headerGoalText}>
                                                            <Text
                                                                style={{
                                                                    marginTop: 30,
                                                                    marginRight: 'auto',
                                                                    marginLeft: Responsive.width(18),
                                                                    color: '#000000',
                                                                    fontSize: 18,
                                                                    fontWeight: 'bold',
                                                                }}>
                                                                {i18n.t('Equipment')}
                                                            </Text>
                                                        </View>
                                                        : null
                                                    }

                                                    {index == 16 ?
                                                        <View style={styles.headerGoalText}>
                                                            <Text
                                                                style={{
                                                                    marginTop: 30,
                                                                    marginRight: 'auto',
                                                                    marginLeft: Responsive.width(18),
                                                                    color: '#000000',
                                                                    fontSize: 18,
                                                                    fontWeight: 'bold',
                                                                }}>
                                                                {'Type'}
                                                            </Text>
                                                        </View>
                                                        : null
                                                    }

                                                    {index == 18 ?
                                                        <View style={styles.headerGoalText}>
                                                            <Text
                                                                style={{
                                                                    marginTop: 30,
                                                                    marginRight: 'auto',
                                                                    marginLeft: Responsive.width(18),
                                                                    color: '#000000',
                                                                    fontSize: 18,
                                                                    fontWeight: 'bold',
                                                                }}>
                                                                {i18n.t('SUBCRIPTION')}
                                                            </Text>
                                                        </View>
                                                        : null
                                                    }


                                                    <View style={{
                                                        width: '90%', backgroundColor: '#ffffff',
                                                        alignSelf: 'center',
                                                        borderRadius: 10,
                                                        borderWidth: 1,
                                                        borderColor: '#eeeeee',
                                                        marginTop: 10
                                                    }}>
                                                        <CheckBox
                                                            containerStyle={{
                                                                backgroundColor: 'transparent',
                                                                borderColor: 'transparent',
                                                                width: '200%',
                                                            }}
                                                            title={item?.name}
                                                            checked={item.check}
                                                            checkedColor="#68BC45"
                                                            onPress={() => {

                                                                const specifications = myFilter.map((elem) => {
                                                                    if (elem.id === item?.id) {
                                                                        return {
                                                                            ...elem,
                                                                            check: !elem?.check,
                                                                        };
                                                                    }
                                                                    return {
                                                                        ...elem,
                                                                        check: elem.check

                                                                    }
                                                                });

                                                                this.setState({ myFilter: specifications, check: 1 })

                                                                if (item?.check) {

                                                                    const fil = specifications.filter(ite => ite.check == true)

                                                                    fil.map((item) => {

                                                                        if (item.type == "Specification") {
                                                                            const resultdata = this.state.workoutsList.filter(it => it?.specification === item?.value)
                                                                            searcharray.push(...resultdata)
                                                                        } else if (item.type == "DifficultLevel") {
                                                                            const resultdata = this.state.workoutsList.filter(it => it?.difficulityLevel === item?.value)
                                                                            searcharray.push(...resultdata)
                                                                        } else if (item.type == "Equipment") {
                                                                            const resultdata = this.state.workoutsList.filter(it => it?.equipment[0] === item?.value)
                                                                            searcharray.push(...resultdata)
                                                                        } else if (item.type == "Type") {

                                                                            if (item?.value == "Fit body") {
                                                                                const resultdata = workoutsList?.filter(item => item?.categories['Fit body'] === 'Fit body')
                                                                                searcharray.push(...resultdata)
                                                                            } else if (item?.value == "Fat Burning") {
                                                                                const resultdata = workoutsList?.filter(item => item?.categories['Fat Burning'] === 'Fat Burning')
                                                                                searcharray.push(...resultdata)
                                                                            }

                                                                        } else {

                                                                            if (item?.value == "free") {
                                                                                const resultdata = this.state.workoutsList.filter(item => item?.pricing === 'free')
                                                                                searcharray.push(...resultdata)
                                                                            } else if (item?.value == "paid") {
                                                                                const resultdata = this.state.workoutsList.filter(item => item?.pricing === 'paid')
                                                                                searcharray.push(...resultdata)
                                                                            }

                                                                        }
                                                                    })


                                                                    if (item.type == "Specification") {
                                                                        searcharray = searcharray.filter(it => it?.specification !== item?.value)
                                                                    } else if (item.type == "DifficultLevel") {
                                                                        searcharray = searcharray.filter(it => it?.difficulityLevel !== item?.value)
                                                                    } else if (item.type == "Equipment") {
                                                                        searcharray = searcharray.filter(it => it?.equipment[0] !== item?.value)
                                                                    } else if (item.type == "Type") {

                                                                        if (item?.value == "Fit body") {
                                                                            searcharray = searcharray?.filter(item => item?.categories['Fit body'] !== 'Fit body')
                                                                        } else if (item?.value == "Fat Burning") {
                                                                            searcharray = searcharray?.filter(item => item?.categories['Fat Burning'] !== 'Fat Burning')
                                                                        }

                                                                    } else {

                                                                        if (item?.value == "free") {
                                                                            searcharray = searcharray.filter(item => item?.pricing !== 'free')
                                                                        } else if (item?.value == "paid") {
                                                                            searcharray = searcharray.filter(item => item?.pricing !== 'paid')
                                                                        }

                                                                    }

                                                                } else {

                                                                    if (item.type == "Specification") {
                                                                        const resultdata = this.state.workoutsList.filter(it => it?.specification === item?.value)
                                                                        searcharray.push(...resultdata)
                                                                    } else if (item.type == "DifficultLevel") {
                                                                        const resultdata = this.state.workoutsList.filter(it => it?.difficulityLevel === item?.value)
                                                                        searcharray.push(...resultdata)
                                                                    } else if (item.type == "Equipment") {
                                                                        const resultdata = this.state.workoutsList.filter(it => it?.equipment[0] === item?.value)
                                                                        searcharray.push(...resultdata)
                                                                    } else if (item.type == "Type") {

                                                                        if (item?.value == "Fit body") {
                                                                            const resultdata = workoutsList?.filter(item => item?.categories['Fit body'] === 'Fit body')
                                                                            searcharray.push(...resultdata)
                                                                        } else if (item?.value == "Fat Burning") {
                                                                            const resultdata = workoutsList?.filter(item => item?.categories['Fat Burning'] === 'Fat Burning')
                                                                            searcharray.push(...resultdata)
                                                                        }

                                                                    } else {

                                                                        if (item?.value == "free") {
                                                                            const resultdata = this.state.workoutsList.filter(item => item?.pricing === 'free')
                                                                            searcharray.push(...resultdata)
                                                                        } else if (item?.value == "paid") {
                                                                            const resultdata = this.state.workoutsList.filter(item => item?.pricing === 'paid')
                                                                            searcharray.push(...resultdata)
                                                                        }

                                                                    }

                                                                }

                                                                this.setState({ spindex: index })
                                                            }
                                                            }
                                                        />
                                                    </View>

                                                </View>
                                            )
                                        }}
                                    />
                                </View>

                            </ScrollView>
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: '5%',
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.openViewResult()
                                    }
                                    }
                                    style={{
                                        backgroundColor: Colors.green,
                                        width: Responsive.width(130),
                                        height: Responsive.height(30),
                                        borderRadius: 25,
                                        borderWidth: 1,
                                        borderColor: '#64dd17',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text style={{ fontSize: 13, color: 'white' }}>

                                        {i18n.t('Show')} {i18n.t('Result')}!
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Fragment>
                    )}

                    {renderIf(this.state.searchResultCheck)(
                        <View>
                            <View
                                style={{
                                    height: '90%',
                                    width: '100%',
                                    marginTop: Responsive.height(20),
                                }}>
                                <View style={styles.headerGoalText}>
                                    <Text style={{ alignSelf: 'flex-end', marginRight: 20, fontSize: 18, margin: 15, marginLeft: 20 }}><Text style={{ color: Colors.green, fontWeight: 'bold', fontSize: 18 }}>{this.state.filterResult.length}</Text> {''} {i18n.t('Workouts')}</Text>
                                </View>

                                <View style={{ justifyContent: 'center' }}>
                                    <FlatList
                                        scrollEnabled={true}
                                        showsHorizontalScrollIndicator={false}
                                        ItemSeparatorComponent={() => (
                                            <View
                                                style={{
                                                    borderColor: '#707070',
                                                    opacity: 0.2,
                                                    alignSelf: 'center',
                                                }}
                                            />
                                        )}
                                        contentContainerStyle={{
                                            paddingBottom: '10%'
                                        }}
                                        data={this.state.filterResult}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity onPress={() => this.checkCondition(item)}>
                                                {
                                                    <ListItemSearchWorkout item={item} index={index}
                                                        that={this}
                                                        userSubscription={this.props.userSubscription}
                                                        referrelUse={this.state.referrelUse}
                                                        referrelPurchaseValid={this.state.referrelPurchaseValid}
                                                    />

                                                }
                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={(item, index) => item + index.toString()}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                </View>

            </SafeAreaView >
        );
    }
}

function mapStateToProps(state) {
    return {
        userSubscription: state.USER_SUBSCRIPTION.userSubscription,
        workoutsList: state.WORKOUTS_LIST_SHOW.workoutsList,
        workoutsListCheck: state.WORKOUTS_LIST_CHECK.workoutsListCheck,
        productsList: state.PRODUCTS_LIST_SHOW.productsList,
        productsListCheck: state.PRODUCTS_LIST_CHECK.productsListCheck,
        userName: state.USER_DATA_NAME.userDataName,
        blogsList: state.BLOG_LIST_SHOW.blogsList,
        token: state.SESSION_KEY.sessionKey,
        languageget: state.LANGUAGE_TRANSLATE.languageget,
        totalDailyKCal: state.UPDATE_USERDETAIL.totalDailyKCal,
        totalWeeklyKCal: state.UPDATE_USERDETAIL.totalWeeklyKCal,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WorkoutFilter);
