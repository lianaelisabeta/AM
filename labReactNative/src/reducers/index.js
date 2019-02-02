import { combineReducers } from 'redux';
import Login from "./Login";
import GetBooksList from "./GetBooksList"
import AddBook from "./AddBook"
export default combineReducers({
    login: Login,
    getBooks : GetBooksList,
    addNewBook: AddBook
})