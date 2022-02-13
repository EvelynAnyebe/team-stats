import { useContext, useEffect } from "react";
import AppContext from "../store/appContext";
import { Route, Redirect, useHistory } from "react-router-dom";
import { NoAuthURL } from '../store/NoAuthURL';

function ProtectedRoute({ children, routePath, ...rest }) {
  const { isAuth, login } = useContext(AppContext);
  const isLoggedIn = localStorage.getItem("isAuth");
  const user = JSON.parse(localStorage.getItem("user"));
  const { location: {pathname} } = useHistory();
  const pathnameTree=pathname.split('/');
  useEffect(() => {
    if (!isAuth && isLoggedIn) {
      login(user);
    }
    // eslint-disable-next-line
  }, []);
  
  return (
    <div>
      {isLoggedIn && user ? (
        <Route {...rest} path={routePath}>{children}</Route>) 
        :(NoAuthURL.includes(`/${pathnameTree[1]}`)) ?<Redirect to={pathname} />:<Redirect to="/" />}
    </div>
  );
}

export default ProtectedRoute;
