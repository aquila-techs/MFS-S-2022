import * as LoginActions from "../Components/LoginSignupMain/LoginMain/Actions/core";
import * as HomeActions from "../Components/HomeMain/Actions/core";
import * as UserProfileActions from "../Components/UserProfile/Actions/core";
import * as OptionsActions from "../Components/OptionsMain/Actions/core";
import * as RecipesActions from "../Components/RecipesMain/Actions/core";
import * as MealsMainActions from "../Components/MealsMain/Actions/core";
import * as WorkOutMain from "../Components/WorkOutMain/Actions/core";
import * as Features from "./../redux/actions";
export const ActionCreators = Object.assign(
  {},
  MealsMainActions,
  UserProfileActions,
  LoginActions,
  HomeActions,
  OptionsActions,
  RecipesActions,
  WorkOutMain,
  Features
);
//export const ActionCreators = Object.assign({},LoginActions,HomeActions);

// export const API_URL = "http://localhost:3003/api";
export const API_URL = "https://api.myfitspot.com/api";
export const SERVER_URL = "https://api.myfitspot.com/";
