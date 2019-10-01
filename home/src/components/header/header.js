import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



const containerStyle = StyleSheet.create({
    
    view: {
        marginTop:24,
        backgroundColor:'black',
        alignItems: 'center',
        justifyContent: 'center',
        height:70,

    },
    
    title: {
        fontSize:25,
        color: '#fff'
    }
})


const Header = props => (
    <View style={containerStyle.view}>
        <Text style={containerStyle.title}>{props.title}</Text>
    </View>
)


export default Header;