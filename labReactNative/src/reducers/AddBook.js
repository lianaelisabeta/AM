import {ADD_BOOK, ADD_BOOK_FAILURE} from "../constants/ActionTypes";

const initialState = {
    isAdded: false,
    hasError : false,
    title: '',
    author: ''
};
export default function dataReducer (state = initialState, action) {
    const { type, payload } = action;
    switch (action.type) {
        case ADD_BOOK:{
            return Object.assign({}, state, {
                isAdded: false,
                title: payload.title,
                author: payload.author,

            });
        }
        case ADD_BOOK_FAILURE:{
            return Object.assign({}, state, {
                hasError: action.hasError,
            });
        }
        default:
            return state
    }
}