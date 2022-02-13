import { useReducer } from "react";
import AppContext from "./appContext";
import appReducer from "./appReducer";
import {
  LOGIN,
  LOGOUT,
  SET_IS_AUTH,
} from "./appActions";

const initialState = {
  isAuth: false,
  user:{}
};

const AppState = (props) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = (user) => {
      dispatch({
          type: LOGIN,
          payload:user
      });
  };

  const logout = () => {
      dispatch({
          type:LOGOUT
      });
  };

  const setIsAuth = (isAuth) => {
    dispatch({
        type: SET_IS_AUTH,
        payload:isAuth
    })
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        setIsAuth,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
