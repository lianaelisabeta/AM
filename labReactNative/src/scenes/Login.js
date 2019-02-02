import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import LoginActions from './../actions/Login';
import Loader from './../components/Loader';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: null,
            pass: null
        }
    }

    doLogin(){
        let { user, pass } = this.state;
        this.props.login(user, pass);
    }

    render(){
        let { hasError, isLogged, isLoading } = this.props;
        return (
            <View style={styles.container}>
                <Loader loading={isLoading} />
                <Text>This is the Login Page</Text>
                <View>
                    <TextInput
                        placeholder={'username'}
                        placeholderTextColor={'rgba(54, 173, 164, .2)'}
                        returnKeyType={'next'}
                        autoCapitalize={'none'}
                        underlineColorAndroid={'transparent'}
                        style={styles.input}
                        onChangeText={(user) => this.setState({user})}
                    />
                    <TextInput
                        placeholder={'password'}
                        placeholderTextColor={'rgba(54, 173, 164, .2)'}
                        returnKeyType={'next'}
                        autoCapitalize={'none'}
                        underlineColorAndroid={'transparent'}
                        style={styles.input}
                        onChangeText={(pass) => this.setState({pass})}
                    />
                </View>
                <Button
                    title={"Login"}
                    onPress={ () => { this.doLogin() } }
                />
                <Text style={{marginTop: 20}}>{hasError ? "error" : ""}</Text>
                <Text style={{marginTop: 20}}>{isLogged ? "ONLINE" : "OFFLINE"}</Text>
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
        login: (username, password) => dispatch(LoginActions.login(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
