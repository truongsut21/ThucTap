import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    SafeAreaView, Text, View, TextInput,
    TouchableOpacity,


} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ErrorElement = ({ item }) => {
    return (
        <View style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 40,
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#a1a1a1",
                width: "90%",
                minHeight: 50,
                borderRadius: 10

            }}>

                <MaterialIcons size={25} name="error-outline" color="#fff" />
                <Text style={{
                    fontSize: 16,
                    paddingLeft: 5,
                    paddingRight: 5,
                    fontWeight: "500",
                    // backgroundColor: "pink",
                    // height:100
                    textAlign: "center",
                    color: "#fff"

                }}>
                    {item && item.error}
                </Text>
            </View>
        </View>
    )
}

export default ErrorElement
