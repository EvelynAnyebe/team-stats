import {
  LOGIN,
  LOGOUT,
  SET_IS_AUTH,
} from "./appActions";

const appReducer = (state, action) => {
  switch (action.type) {
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isAuth: false,
        user: {},
      };

    case LOGIN:
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isAuth", true);
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };

    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };
    
    default:
      return state;
  }
};

export default appReducer;
