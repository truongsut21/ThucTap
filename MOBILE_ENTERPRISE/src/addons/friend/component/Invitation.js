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

import { useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
// import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import InvitationReceived from './InvitationReceived';
import InvitationSent from './InvitationSent';

const Tab = createBottomTabNavigator();

const Invitation = () => {
    const navigation = useNavigation();
    //set css underline đã nhận và đã gửi
    const [active, setActive] = useState(true);
    // đếm lời mời đã nhận, 
    const countReceiveInvitation = useSelector(state => {
        let myUserId = state.AuthStoredReducer.myUserInfo._id;
        let myFriends = state.FriendStoredReducer.myFriends;
        let friends = Object.values(myFriends) || {};
        return friends.filter(f => f.friend_status === "invitation" && f.user_id_accept === myUserId
        ).map(f => {
            return f._id;
        }).length
    }, (prev, next) => isEqual(prev, next))
    // đếm lời mời đã gửi
    const countSentInvitation = useSelector(state => {
        let myUserId = state.AuthStoredReducer.myUserInfo._id;
        let myFriends = state.FriendStoredReducer.myFriends;
        let friends = Object.values(myFriends) || {};
        return friends.filter(f => f.friend_status === "invitation" && f.user_id_accept !== myUserId
        ).map(f => {
            return f._id;
        }).length
    }, (prev, next) => isEqual(prev, next))
    return (
        <SafeAreaView>
            {
                Platform.OS === 'android' ? <Text style={{ marginTop: 40 }}></Text> : null
            }
            <View style={{

                height: 50,
                backgroundColor: '#fff',
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderBottomColor: '#ddd'
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginRight: 5 }}>
                        <TouchableOpacity
                            delayPressIn={0}
                            delayPressOut={0}
                            style={{ padding: 10 }}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <AntDesign color='#00A48D' size={22} name='arrowleft' style={{}} />
                        </TouchableOpacity>
                    </View>


                    <View style={{ paddingVertical: 2 }}>
                        <Text style={{ fontSize: 17, color: '#000', fontWeight: '500' }}>
                            Lời mời kết bạn
                        </Text>
                    </View>
                </View>
            </View>
            {/* da gui va da nhan */}
            <View style={{
                height: 50,
                backgroundColor: '#fff',
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderBottomColor: '#ddd'
            }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('InvitationReceived');
                        setActive(true)
                    }}
                    style={{
                        height: "100%",
                        justifyContent: "center",
                        flex: 1,
                        alignItems: "center",
                        //    backgroundColor:"#ccc",
                        borderBottomWidth: active ? 1 : 0,
                        borderColor: "#00A48D"
                    }}
                >
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "500",
                    }}>
                        Đã nhận <Text style={{
                            fontWeight: "700",
                            fontSize: 16
                        }}>({countReceiveInvitation})</Text>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setActive(false)
                        navigation.navigate('InvitationSent');
                    }}
                    style={{
                        //    backgroundColor:"red",
                        height: "100%",
                        justifyContent: "center",
                        flex: 1,
                        alignItems: "center",
                        borderBottomWidth: active ? 0 : 1,
                        borderColor: "#00A48D"
                    }}
                >
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "500",
                    }}>
                        Đã gửi <Text style={{
                            fontWeight: "700",
                            fontSize: 16
                        }}>({countSentInvitation})</Text>
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{
                height: "100%",
            }}>

                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen
                        name="InvitationReceived"
                        component={InvitationReceived}

                    />
                    <Tab.Screen
                        name="InvitationSent"
                        component={InvitationSent}

                    />
                </Tab.Navigator>
            </View>
        </SafeAreaView>

    )
}
export default React.memo(Invitation, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
});