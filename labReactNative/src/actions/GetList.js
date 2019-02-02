import { FETCHING_DATA, FETCHING_DATA_FAILURE, FETCHING_DATA_SUCCESS} from "../constants/ActionTypes";
import {AsyncStorage} from "react-native";
import { Actions } from 'react-native-router-flux';
export function getData() {
    return {
        type: FETCHING_DATA
    }
}

export function getDataSuccess(data) {
    return {
        type: FETCHING_DATA_SUCCESS,
        data,
    }
}

export function getDataFailure() {
    return {
        type: FETCHING_DATA_FAILURE
    }
}

export function fetchData() {
    return (dispatch) => {
        dispatch(getData());
        //console.warn(AsyncStorage.getItem('token'));
        AsyncStorage.getItem('token').then(token =>{
            console.warn(token);
        fetch('http://172.30.119.106:3001/books', {
            method: 'GET',
            headers: {
                'Authorization':'Bearer '+token
            },

        })
            .then((res) => res.json())
            .then(res => {



                console.warn(res);
                //if(res.connected){
                console.warn("im hereee");
                dispatch(getDataSuccess(res));
                AsyncStorage.setItem('list',res); // example

                Actions.Main();

            })
            .catch((e) => {
                console.warn(e.message);
                console.warn("eroare");
                AsyncStorage.getItem('list').then(list =>{
                    if(!list){
                        dispatch(getDataFailure());
                    }
                    else{
                        dispatch(getDataSuccess(list));
                        Actions.Main();
                    }
                })
                    .catch((e)=>{
                        console.warn(e.message);
                        dispatch(getDataFailure());
                    })

            });})
            .catch((e) =>{
                console.warn(e.message);
                dispatch(getDataFailure());
            });

    }
}
