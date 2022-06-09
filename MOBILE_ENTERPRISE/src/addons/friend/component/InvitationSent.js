import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    TextInput,
    FlatList,
    Image,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import isEqual from "react-fast-compare";
import Entypo from 'react-native-vector-icons/Entypo';
// import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import InvitationSentElement from './InvitationSentElement'


const InvitationSent = () => {
    const invitationSent = useSelector(state => {
        let myUserId = state.AuthStoredReducer.myUserInfo._id;
        let myFriends = state.FriendStoredReducer.myFriends;
        let friends = Object.values(myFriends) || {};
        return friends.filter(f => f.friend_status === "invitation" && f.user_id_accept !== myUserId
        ).map(f => {
            return f._id;
        })
    },(prev, next) => isEqual(prev, next));

    const renderItem = ({ item, index }) => {
        return <InvitationSentElement key={index} _id={item} />
    };
    return (
        <View style={{
            // marginTop:4,
            backgroundColor: "#fff",
            height: "100%",

        }}>
            {
                invitationSent.length > 0
                    ?
                    <View style={{
                        height: "100%",
                    }}>
                        <FlatList
                            data={invitationSent}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    :
                    <View style={{
                        // height:1000,
                        // backgroundColor: "#ebf4f7"
                    }}>
                        <View style={{
                            height: "100%",
                            alignItems: "center",
                            paddingTop: 100,
                        }}>
                            <Ionicons
                                color='#00A48D'
                                size={100}
                                name='arrow-redo'
                                style={{}} />
                            <Text style={{
                                fontSize: 16,
                                paddingTop: 10,
                                fontWeight: "500"
                            }}>Chưa gửi mời kết bạn nào</Text>
                        </View>
                    </View>
            }
        </View>


    )
}

export default React.memo(InvitationSent, (prevProps, nextProps) => {
	return isEqual(prevProps, nextProps);
});