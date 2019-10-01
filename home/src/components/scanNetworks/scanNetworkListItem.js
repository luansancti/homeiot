import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ScanNetworksListItem = props => {
    
    
    let { networkSSID, networkRSSI } = props.networks;
    let { navigateToPeopleDetail } = props;

    let localIcon = ""
    if(networkRSSI >= "-30"){
        localIcon = require(`../../../assets/images/icons/wifiStatus/signal_wifi_3.png`)
    }else if(networkRSSI < "-30" && networkRSSI >= "-60"){
        localIcon = require(`../../../assets/images/icons/wifiStatus/signal_wifi_2.png`)
    }else if(networkRSSI < "-60" && networkRSSI >= "-90"){
        localIcon = require(`../../../assets/images/icons/wifiStatus/signal_wifi_1.png`)
    }else if(networkRSSI < "-90"){
        localIcon = require(`../../../assets/images/icons/wifiStatus/signal_wifi_0.png`)
    }

	return (
		<TouchableOpacity onPress={() => {
            
			navigateToPeopleDetail({ networkSSID });
		}}>
			<View style={styles.container}>
                <Text style={styles.item}>{networkSSID}</Text>
                <Image
                    style={styles.icon}
                    source={localIcon}
                ></Image>
			</View>
		</TouchableOpacity>
	); 

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        padding:10,
        margin:5,
        marginTop:10,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        
    },

    item: {

        fontSize: 25,
        height: 50,
        flex:1
    },
    icon: {
        width: 40,
        height: 40,
        alignItems:'flex-end',
    }

})


export default ScanNetworksListItem;