import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity   , ScrollView, ActivityIndicator, TextInput, Button, Dimensions, Image, CheckBox } from 'react-native';
import axios from 'axios';
import ScanNetworkList from '../components/scanNetworks/scanNetworkList';



//import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: WIDTH } = Dimensions.get('window')

export default class ScanNetworks extends React.Component {

    constructor(props){
        super(props)



        this.state = {
            networks: [],
            loading: false,
            error: false,
            
        }
    
    }

    TreatedWirelessNetwork (arrayJson) {

        let seenObjects = {};
        let list = []
        let listAll = [];
        
        let jsonParseArray = [];
    
        arrayJson.forEach(element => { jsonParseArray.push(JSON.parse(element)) })
    
        arrayJson = jsonParseArray;
    
        arrayJson.forEach(value => { listAll.push(value.networkSSID); })
    
        arrayJson.filter(function (value) {
            if(value.networkSSID in seenObjects)
            {   
                return false
                
            } else {
                seenObjects[value.networkSSID] = true;
                list.push(value.networkSSID)
                return true
            }
        })
    
        let networks = [];
        list.forEach(value => {
            let indices = [];    
            let element = value;
            let ids = listAll.indexOf(element);
            while (ids != -1) {
                indices.push(ids);
                ids = listAll.indexOf(element, ids + 1);
            }
            if(indices.length > 1) {
                let rssi = []
                //Pegando todos os valores de sinal para verificar qual é o menor.
                indices.forEach(element => {
                    let json = arrayJson[element];
                    rssi.push(Number(json.networkRSSI));
                });
                rssi = Math.max.apply(Math,rssi);
                let json =  {
                    networkSSID: arrayJson[indices[0]].networkSSID,
                    networkRSSI: rssi
                }
                networks.push(json);
                return;
            
    
            } else {
                let json =  {
                    networkSSID: arrayJson[indices[0]].networkSSID,
                    networkRSSI: Number(arrayJson[indices[0]].networkRSSI)
                }
                networks.push(json);
                return;
            }
        })
        return networks;
    
    }

    componentDidMount() {

        
        this.setState({ loading: true });
        axios({
         methos: 'get',   
         url:'http://192.168.4.1/scannetworks',
         timeout: 15
        
        }).then(res => {
        data = this.TreatedWirelessNetwork(res.data);
        this.setState({
            networks: data,
            loading: false
        })
        //console.log(res.data)
        }, error =>{
            this.setState({
                loading: false,
                error:true
            })
            console.log(error)
        })
        

        

    }

    renderPage() {

        if (this.state.loading) {
			return <ActivityIndicator size="large" color="#6ca2f7" />;
		}

		if (this.state.error) {
            
            return <Text style={{}}>Ops... Algo deu errado =(</Text>;
		}



        
        return (
            <ScanNetworkList
                networks={this.state.networks}
                onPressItem={pageParams => {
                    this.props.navigation.navigate('PeopleDetail', pageParams);
                }} 
            ></ScanNetworkList>
        )
        

    }

    render() {
        
        return (   
            <View>
                {this.renderPage()}
            </View>
        )         
    }
}
        
        