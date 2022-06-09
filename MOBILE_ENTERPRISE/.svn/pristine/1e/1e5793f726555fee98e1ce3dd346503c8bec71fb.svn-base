import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
    SafeAreaView, Text, View, TextInput,
    TouchableOpacity, FlatList,


} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ErrorElement from './ErrorElement';
const Error = () => {
    let errorApp = useSelector(state => state.BaseUnstoredReducer.errorApp);
    const renderItem = ({ item, index }) => {
        return <ErrorElement key={index} item={item} />
    };
    return (
        <View style={{
            width: "100%",
        }}>
            {
                errorApp && errorApp.length > 0
                    ?
                    <View style={{
                        // height: "100%",
                    }}>

                        <FlatList
                            data={errorApp}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    : null
            }
        </View>
    )
}

export default Error
