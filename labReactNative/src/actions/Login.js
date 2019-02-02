import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

const isLogged = (bool) => {
    return {
        type: ActionTypes.IS_LOGGED,
        isLogged: bool
    }
};

const loginHasError = (bool) => {
    return {
        type: ActionTypes.LOGIN_HAS_ERROR,
        hasError: bool
    }
};

const loginIsLoading = (bool) => {
    return {
        type: ActionTypes.LOGIN_IS_LOADING,
        isLoading: bool
    }
};

const setAsyncStorage = () => {

};

const login = (username, password) => {
     console.warn('user', username);
     console.warn('pass', password);
    return (dispatch) => {

        dispatch(loginIsLoading(true));


        if(!username || !password){
            console.warn("invla")

            dispatch(loginHasError(true));

            dispatch(loginIsLoading(false));

            return;
        }

        fetch('http://172.30.119.106:3001/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        })
            .then((res) => res.json())
            .then(({ access_token }) => {

                dispatch(loginIsLoading(false));

                console.warn(access_token);

                    console.warn("im hereee");
                    dispatch(loginHasError(false));
                    dispatch(isLogged(true));
                    AsyncStorage.setItem('token',access_token); // example

                    Actions.Main();

            })
            .catch((e) => {
                console.warn(e.message);
                console.warn("eroare");
                dispatch(loginHasError(true));
                dispatch(loginIsLoading(false));
            });
    }
};

const logout = () => {
    AsyncStorage.removeItem('token');
    Actions.Login();
    return {
        type: ActionTypes.LOGOUT
    }
};

export default {
    isLogged,
    loginHasError,
    loginIsLoading,
    login,
    logout
}
