import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import LoginActions from "../actions/Login";
import BooksList from "../components/BooksList";
import AddBook from "../components/AddBook"
 class Main extends Component {

    render(){
        return(
            <View style={styles.container}>

                <BooksList/>

                <Button
                    onPress={ () => { this.props.logout() } }
                    title={"Logout"}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.login.isLogged,
        hasError : state.login.hasError,
        isLoading: state.login.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(LoginActions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },

    input: {
        marginBottom: 10,
        borderBottomColor: '#36ada4',
        borderBottomWidth: 1
    },

    button: {
        padding: 10,
        backgroundColor: '#36ada4'
    }
});
