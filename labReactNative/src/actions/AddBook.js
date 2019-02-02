import {ADD_BOOK, ADD_BOOK_FAILURE} from "../constants/ActionTypes";
import {AsyncStorage} from "react-native";
import { Actions } from 'react-native-router-flux';

export function addBook(bool){
    return{
        type: ADD_BOOK,
        isAdded : bool
    }
}

export function addBookFailure(bool){
    return{
        type: ADD_BOOK_FAILURE,
        hasError : bool
    }
}

export function addNewBook(title, author){

    return (dispatch) => {

        AsyncStorage.getItem('token').then(token =>{
            console.warn(token);
            if(!title || !author){
                console.warn("invla")

                dispatch(addBookFailure(true));
                return;
            }
            fetch('http://172.30.119.106:3001/books', {
                method: 'POST',
                headers: {
                    'Authorization':'Bearer '+token
                },
                body: JSON.stringify({title: title, author: author})

            })
                .then(res => {
                     console.warn(res);

                    console.warn("im hereee");
                    dispatch(addBook(true));

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
                            AsyncStorage.setItem('list',res); // example

                            Actions.Main();

                        })
                        .done();

                })
                .catch((e) => {
                    console.warn(e.message);
                    console.warn("eroare");
                    dispatch(addBookFailure(true));
                });})
            .catch((e) =>{
                console.warn(e.message);
                dispatch(addBookFailure(true));
            });
    }
}
