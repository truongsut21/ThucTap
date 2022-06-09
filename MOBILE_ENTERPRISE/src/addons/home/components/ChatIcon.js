import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import isEqual from "react-fast-compare";


const ChatIcon = ({ focused }) => {
    const badgeCountTabChat = useSelector(state => {
        return state.ChatStoredReducer.badgeCountTabChat;
    }, (prev, next) => prev === next);
    return <View>
        <Ionicons
            style={{
                top: 4,
                width: 30,
                height: 30,
                textAlign: "center",
                textAlignVertical: "center",
                color: focused ? "#00A48D" : "#828282",
            }}
            size={25}
            name={focused
                ? "ios-chatbubble-ellipses-sharp"
                : "ios-chatbubble-ellipses-outline"
            }
        />
        {
            badgeCountTabChat ?
                <View style={{
                    position: 'absolute',
                    right: -10,
                    top: 0,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} >
                    <Text style={{
                        color: '#fff',
                        fontSize: badgeCountTabChat > 10 ? 12 : 13
                    }}>
                        {badgeCountTabChat > 99 ? 99 : badgeCountTabChat}
                    </Text>
                </View>
                :
                null
        }
    </View>;
}

export default React.memo(ChatIcon, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})