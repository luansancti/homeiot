import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

const ScanNetworkList = props => {
    const { ssid } = props;


    return (   
       <View>
           <Input
           placeholder="Password"
           >
           </Input>
       </View>
    )
}



export default  ScanNetworkList

