import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ActionSheetIOS } from 'react-native';
import axios from 'axios';
import { Input, Button } from 'react-native-elements';  

export default class ConnectWifi extends React.Component {

    constructor(props){
        super(props)
        //const { networkSSID } = this.props.navigation.state.params;
        this.state = {

            notShowPassword:true,
            checked:true,
            networkPassword,


            
        }
    }
    
    SendJSONNetwork() {
        this.setState({ loading: true });
        axios({
         methos: 'post',   
         url:'http://192.168.4.1/connectwifi',
         timeout: 15
        
        }).then(res => {
            data = JSON.stringify({networkSSID:this.state, networkPassword: this.state.networkPassword, saved:this.state.checked})
        //console.log(res.data)
        }, error =>{
            console.log(error)
        })
    }
    
    componentDidMount() {



    }

    renderPage() {

       
    }

    

    render(){
        let openEye = require(`../../../assets/images/icons/eyes/open_eye.png`)
        let closeEye = require(`../../../assets/images/icons/eyes/close_eye.png`)

        return (
            <View style={styles.container}>
            <View style={styles.SectionStyle}>
                
    
                <TextInput
                style={{ flex: 1, fontSize:30 }}
                placeholder="Password"
                secureTextEntry={this.state.notShowPassword}
                underlineColorAndroid="transparent"
                />
                
            <TouchableOpacity onPress={() => {
                if(this.state.notShowPassword == false) {
                    this.setState({
                        notShowPassword: true
                    })
                } else {
                    this.setState({
                        notShowPassword: false
                    })
                }

            }}>
                <Image
                    
                    source={this.state.notShowPassword == false ? closeEye :openEye}
                    style={styles.ImageStyle}
                    />
                    
            </TouchableOpacity>
            </View >
            <View style={styles.ViewStyleCheckbox}>
            <CheckBox 
                value={this.state.checked}
                onValueChange={() => this.setState({ checked: !this.state.checked })}
            
            />
            <Text style={{position: 'absolute', marginLeft: 35, fontSize:20, marginTop:1}}>Save password ?</Text>
                
            </View>
            <View style={styles.ViewStyleButton}>
            <Button
                title="CONFIRM"
                style={styles.ButtonStyle}
                />
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginTop:30
    
    },

    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 70,
        margin: 10,
    },

    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',

    },    
    ViewStyleButton: {
        width: '100%',
        height:50,
        marginTop:10
    
    },
    ViewStyleCheckbox: {
        width:'100%',
    },

    ButtonStyle: {
        width: '100%',
        
        
    }
});
