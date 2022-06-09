import React from 'react';
import {
    FlatList,
    Text,
    View
} from 'react-native';
import isEqual from "react-fast-compare";
import {  useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import InvitationReceivedElement from './InvitationReceivedElement'
var _ = require('lodash');

const InvitationReceived = () => {


    const invitationReceived = useSelector(state => {
        let myUserId = state.AuthStoredReducer.myUserInfo._id;
        let myFriends = state.FriendStoredReducer.myFriends;
        let friends = Object.values(myFriends) || {};
        return friends.filter(f => f.friend_status === "invitation" && f.user_id_accept === myUserId
        ).map(f => {
            return f._id;
        })
    },(prev, next) => isEqual(prev, next));

    const renderItem = ({ item, index }) => {
        return <InvitationReceivedElement key={index} _id={item} />
      };
    return (
        <View style={{
            backgroundColor: "#fff",
            height: "100%",
        }}>
            {
                invitationReceived.length > 0
                    ?
                    <View style={{
                        height: "100%",
                    }}>
                        {/* <InvitationReceivedElement />
                        <InvitationReceivedElement /> */}
                        {/* <InvitationReceivedElement/> */}
                        <FlatList
                            data={invitationReceived}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    :

                    <View style={{
                        height: "100%",
                        alignItems: "center",
                        paddingTop: 100,
                        // backgroundColor:"#ccc"
                    }}>


                        <Ionicons color='#00A48D' size={100} name='arrow-undo' style={{}} />
                        <Text style={{
                            fontSize: 16,
                            paddingTop: 10,
                            fontWeight: "500"
                        }}>Không có lời mời kết bạn nào </Text>

                    </View>
            }
        </View>


    )
}

export default React.memo(InvitationReceived, (prevProps, nextProps) => {
	return isEqual(prevProps, nextProps);
});
