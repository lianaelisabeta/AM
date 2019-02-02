import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {addNewBook} from '../actions/AddBook'


class AddBook extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: null,
            author: null
        }
    }

    addNewBook(){
        let { title, author } = this.state;
        console.warn(this.state.author);
        console.warn(this.state.title);

        this.props.addNewBook(this.state.title, this.state.author);
    }

    render(){

        return (
            <View style={styles.container}>


                <View>
                    <TextInput
                        placeholder={'Author'}
                        placeholderTextColor={'rgba(54, 173, 164, .2)'}
                        returnKeyType={'next'}
                        autoCapitalize={'none'}
                        underlineColorAndroid={'transparent'}
                        style={styles.input}
                        onChangeText={(author) => this.setState({author:'authornou'})}
                    />
                    <TextInput
                        placeholder={'Title'}
                        placeholderTextColor={'rgba(54, 173, 164, .2)'}
                        returnKeyType={'next'}
                        autoCapitalize={'none'}
                        underlineColorAndroid={'transparent'}
                        style={styles.input}
                        onChangeText={(title) => this.setState({title:'titlu nou'})}
                    />
                </View>
                <Button
                    title={"Add"}
                    onPress={ () => { this.addNewBook() } }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAdded: state.addNewBook.isAdded,
        hasError : state.addNewBook.hasError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addNewBook: (title, author) => dispatch(addNewBook(title, author))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);

const styles = StyleSheet.create({
    container: {
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
