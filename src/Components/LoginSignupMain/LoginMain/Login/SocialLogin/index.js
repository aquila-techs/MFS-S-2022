import {useNavigation} from '@react-navigation/native';
import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SocialIcon, Overlay} from 'react-native-elements';
// import {signUpUser, loginUser} from '../../../redux/actions/auth';

import {useDispatch, useSelector} from 'react-redux';
import {State} from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
// import {hp, wp} from '../../../../assets';
const Sociallogin = () => {
  // const [object, setobject] = useState({
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   password: '',
  //   confirm_password: '',
  //   idToken: '',
  // });
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [userInfo, setinfo] = useState({});
  const [loading, setloading] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const {Sociallogin} = useSelector(state => state.auth);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
 
  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };
  // const getInfoFromToken = token => {
  //   const PROFILE_REQUEST_PARAMS = {
  //     fields: {
  //       string: 'id, name,picture,email,friends, first_name, last_name',
  //     },
  //   };
  //   const profileRequest = new GraphRequest(
  //     '/me',
  //     {token, parameters: PROFILE_REQUEST_PARAMS},
  //     async (error, user) => {
  //       if (error) {
  //         console.log('login info has error: ' + error);
  //       } else {
  //         setinfo(user);
  //         console.log('>>>>>>>>:::::::', user);
  //         (Sociallogin.first_name = user?.first_name),
  //           (Sociallogin.last_name = user?.last_name),
  //           (Sociallogin.email = user?.email),
  //           (Sociallogin.password = user?.first_name + user?.last_name),
  //           (Sociallogin.confirm_password = user?.first_name + user?.last_name),
  //           (Sociallogin.idToken = user?.id),
  //           (Sociallogin.type = 'facebook');
  //       }
  //     },
  //   );
  //   new GraphRequestManager().addRequest(profileRequest).start();
  // };
  // const loginWithFacebook = async () => {
  //   // LoginManager.setLoginBehavior(LoginManager.logOut());
  //   if (LoginManager.setLoginBehavior != null) {
  //     console.log('.........null......');
  //     LoginManager.logOut();
  //   } else {
  //     console.log('..........not null.....');
  //     LoginManager.logOut();
  //   }
  //   LoginManager.logInWithPermissions(['public_profile,email']).then(
  //     async login => {
  //       if (!login?.isCancelled) {
  //         // await LoginManager.setLoginBehavior(
  //         await AccessToken.getCurrentAccessToken().then(data => {
  //           const accessToken = data.accessToken.toString();
  //           getInfoFromToken(accessToken);
  //         });
  //         // );
  //       } else {
  //         console.log('Login cancelled');
  //       }
  //     },
  //     error => {
  //       console.log('Login fail with error: ' + error);
  //     },
  //   );
  //   // }
  // };
  //   const onSignup = async () => {
  //     setloading(true);
  //     toggleOverlay();
  //     console.log('Social login signup object', Sociallogin);
  //     let params = new FormData();
  //     params.append('email', Sociallogin.email);
  //     params.append('password', Sociallogin.password);
  //     params.append('first_name', Sociallogin.first_name);
  //     params.append('last_name', Sociallogin.last_name);
  //     params.append('confirm_password', Sociallogin.confirm_password);
  //     // console.log('user Data::::::', user);
  //     console.log('Form Data::::::', params);
  //     // return;
  //     try {
  //       await fetch('https://app.swissscan.ch/api/mobilesignup', {
  //         method: 'POST',
  //         body: params,
  //       }).then(response => {
  //         if (response.status == '200') {
  //           response.json().then(res => {
  //             if (res.success === 1) {
  //               console.log('response success::::::', response);
  //               dispatch(signUpUser(res?.data?.user));
  //               setloading(false);
  //               onLogin();
  //               alert('Your Account Successfully Created');
  //               // navigation.navigate('Scanner');
  //             } else if (res.success === 0) {
  //               setloading(false);
  //               // alert(res?.data?.error);
  //               onLogin(user);
  //             }
  //           });
  //           setloading(false);
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       setloading(false);
  //     }
  //   };
  //   const onLogin = async () => {
  //     // console.log(':::::::::', user);
  //     let params = new FormData();
  //     params.append('email', Sociallogin?.email);
  //     params.append('password', Sociallogin?.password);
  //     try {
  //       await fetch('https://app.swissscan.ch/api/mobilelogin', {
  //         method: 'POST',
  //         body: params,
  //       }).then(response => {
  //         if (response.status == '200') {
  //           response.json().then(res => {
  //             if (res.success === 1) {
  //               dispatch(loginUser(res?.data?.user));
  //               setloading(false);
  //               navigation.navigate('Scanner');
  //             } else if (res.success === 0) {
  //               alert(res?.message);
  //               setloading(false);
  //             }
  //           });
  //           setloading(false);
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       setloading(false);
  //     }
  //   };

  return (
    <View style={styles.container}>
      {loading ? (
        <Overlay isVisible={visible}>
          <ActivityIndicator
            size={'large'}
            style={{
              width: widthPercentageToDP('25'),
              height: heightPercentageToDP('12'),
            }}
          />
        </Overlay>
      ) : (
        <>
          <SocialIcon
            type="facebook"
            onPress={() => {
              loginWithFacebook();
            }}
          />
          <SocialIcon
            type="google"
            onPress={() => {
              signIn();
              // GoogleSigninMethod();
            }}
          />
          {/* {!user.idToken ? (
            <GoogleSigninButton
              // style={{width: 192, height: 48}}
              // size={GoogleSigninButton.Size.Wide}
              // color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
            />
          ) : (
            <TouchableOpacity onPress={signOut}>
              <Text>Logout</Text>
            </TouchableOpacity>
          )} */}
        </>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

//make this component available to the app
export {Sociallogin};
