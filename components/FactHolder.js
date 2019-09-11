import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const FactHolder = props => <View style={Styles.container}><Text style={Styles.text}>{props.children}</Text></View>;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        paddingVertical: 30,
        paddingHorizontal: 12,
        marginVertical: 40,
        width: '100%'
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
    }
});

export default FactHolder;