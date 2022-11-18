import * as UserProfileReducer from "../Components/UserProfile/Reducers/core";
import * as LoginReducer from "../Components/LoginSignupMain/LoginMain/Reducers/core";
import * as HomeReducer from "../Components/HomeMain/Reducers/core";
import * as RecipesReducer from "../Components/RecipesMain/Reducers/core";
import * as MealsReducer from "../Components/MealsMain/Reducers/core";
import * as WorkOutsReducer from "../Components/WorkOutMain/Reducers/core";
import { featuresreducer } from "../redux/reducers/features";
export default Object.assign(
  {},
  UserProfileReducer,
  LoginReducer,
  HomeReducer,
  RecipesReducer,
  MealsReducer,
  WorkOutsReducer,
  {
    featuse: featuresreducer,
  }
);

//export default Object.assign({},LoginReducer,HomeReducer);
