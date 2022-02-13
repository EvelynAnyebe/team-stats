import { useContext } from 'react';
import AppContext  from '../store/appContext';

function useContextGetter() {
    const context = useContext(AppContext)
    return context;
}

export default useContextGetter;