import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity,Image, ScrollView } from 'react-native';
import axios from 'axios';
import Svg,      {SvgUri, Circle, Path } from 'react-native-svg';
import Header from '../components/header/header.js';
import * as Progress from 'react-native-progress';


class ScanNetworks extends Component {

    constructor(props){
        super(props)



        this.state = {
            networks: [],
            ssid: ""
        }
          
    
    }


    componentDidMount() {

    }

    render(){
            return (   
                <View>
                    
                    <Header title={"Connect To: " + this.state.ssid}></Header>
                    
                </View>
            
        )
        
        
    }
     

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        margin:10,
        marginTop:40,
        borderBottomColor: 'black',
        borderBottomWidth: 0.8,
        
    },


    item: {

        fontSize: 25,
        height: 70,
        flex:1
    },
    
    icon: {
        width: 40,
        height: 40,
        alignItems:'flex-end',
    },


    list: {
        flexDirection:'row',
        flex: 1
    }

})




export default  ScanNetworks

