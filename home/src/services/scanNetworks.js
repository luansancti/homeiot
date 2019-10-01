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
            case: ""
        }
    
    }


    componentDidMount() {

        axios.get('http://192.168.4.1/scannetworks').then(res => {
        this.setState({
            networks: res.data.data,
            case:0
        })
        console.log(res.data.data)
        }, error =>{
            this.setState({
                case:1
            })
            console.log(error)
        })



    }

    renderNetworks() {
        const textElements = this.state.networks.map((networks, index) => {
            const { networkSSID } = networks;
            return <Text key={index}> {networkSSID}</Text>
        })

        return textElements;
    }

    render(){
            return (   
                <View>
                    
                    <Header title="Scan Network"></Header>
                    <ScrollView>
                        <FlatList 
                            data={this.state.networks}
                            renderItem={({item, index}) =>{
                                var signal_wifi= ""
                                if(item.networkRSSI >= "-25"){
                                    signal_wifi = require(`../../assets/images/wifiStatus/signal_wifi_3.png`)
                                }else if(item.networkRSSI < "-25" && item.networkRSSI >= "-50"){
                                    signal_wifi = require(`../../assets/images/wifiStatus/signal_wifi_2.png`)
                                }else if(item.networkRSSI < "-50" && item.networkRSSI >= "-80"){
                                    signal_wifi = require(`../../assets/images/wifiStatus/signal_wifi_1.png`)
                                }else if(item.networkRSSI < "-80"){
                                    signal_wifi = require(`../../assets/images/wifiStatus/signal_wifi_0.png`)
                                }
                                return (
                                    <TouchableOpacity key={index} onPress={ () => this.actionOnRow(item.networkSSID)}>
                                        <View style={styles.container} >
                                            <Text key={index} style={styles.item}>{item.networkSSID}</Text>
                                            <Image
                                                style={styles.icon}
                                                source={signal_wifi}
                                            ></Image>
                                        </View>
                                    </TouchableOpacity>                            
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        </ScrollView>
                </View>
            
        )
        
        
    }
    actionOnRow(item) {

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

