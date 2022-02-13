import { useContext } from 'react';
import AppContext  from '../store/appContext';

function useLoggin() {
    const {login,isAuth} = useContext(AppContext);
    const isLoggedIn = localStorage.getItem("isAuth");
    if(!isAuth && isLoggedIn){
        const user = JSON.parse(localStorage.getItem("user"));
        login(user);
    }
    return true;
}

export default useLoggin;