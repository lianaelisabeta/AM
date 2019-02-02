import React from 'react'
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'

import { connect } from 'react-redux'
import {fetchData} from "../actions/GetList";


let styles;

const BooksList = (props) => {
    const {
        container,
        text,
        button,
        buttonText,
        mainContent
    } = styles;

    return (
        <View style={container}>
            <Text style={text}>List of Books</Text>
            <TouchableHighlight style={button} onPress={() => props.fetchData()}>
                <Text style={buttonText}>Load Data</Text>
            </TouchableHighlight>
            <View style={mainContent}>
                {
                    props.getBooks.isFetching && <Text>Loading</Text>
                }
                {
                    props.getBooks.data.length ? (
                        props.getBooks.data.map((book, i) => {
                            return <View key={i} >
                                <Text>Title: {book.title}</Text>
                                <Text>Author: {book.author}</Text>
                            </View>
                        })
                    ) : null
                }
            </View>
        </View>
    )
}

styles = StyleSheet.create({
    container: {
        marginTop: 100
    },
    text: {
        textAlign: 'center'
    },
    button: {
        height: 60,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0b7eff'
    },
    buttonText: {
        color: 'white'
    },
    mainContent: {
        margin: 10,
    }
});

function mapStateToProps (state) {
    return {
        getBooks: state.getBooks
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchData: () => dispatch(fetchData())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BooksList)