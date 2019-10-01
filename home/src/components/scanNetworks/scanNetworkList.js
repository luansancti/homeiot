import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity,Image, ScrollView } from 'react-native';

import ScanNetworksListItem from './scanNetworkListItem';


const ScanNetworkList = props => {
    const { networks, onPressItem} = props;


    return (   
        <ScrollView>
            <FlatList 
                data={networks}
                renderItem={({item, index}) =>{
                    return (
                        <ScanNetworksListItem
                            networks={item}
                            navigateToPeopleDetail={onPressItem}
                        
                        />
                        
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </ScrollView>
    )
}



export default  ScanNetworkList

