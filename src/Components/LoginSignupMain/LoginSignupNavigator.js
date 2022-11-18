import {createStackNavigator} from 'react-navigation-stack';
import Login from './LoginMain/Login';
import Signup from './SignupMain/Signup';
import Splash from '../../../src/Components/Splash/splash';

const LoginSignupNavigator = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null,
    },
  },
});
export default LoginSignupNavigator;
