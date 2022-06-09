import React, { } from 'react';
import {
    Text, View, Image, TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';

import isEqual from "react-fast-compare";
import { useNavigation } from '@react-navigation/core';

var _ = require('lodash')


const listReactionType = {
    ['1']: <Image
        style={{ width: 15, height: 15 }}
        source={require('./../../static/emo/like.png')}
    />,
    ['2']: <Image
        style={{ width: 15, height: 15 }}
        source={require('./../../static/emo/heart.png')}
    />,
    ['3']: <Image
        style={{ width: 15, height: 15 }}
        source={require('./../../static/emo/sad.png')}
    />,
    ['4']: <Image
        style={{ width: 15, height: 15 }}
        source={require('./../../static/emo/haha.png')}
    />,
    ['5']: <Image
        style={{ width: 15, height: 15 }}
        source={require('./../../static/emo/angry.png')}
    />,
}

const MessageReactionNew = ({ check, mid, isPoppingup }) => {
    const navigation = useNavigation();
    let { count, one, two, three, four, five, isGroup, hidden } = useSelector(state => {
        let listMessageReactions = state.ChatStoredReducer.listMessageReactions
        const thread_id = state.ChatUnstoredReducer.activeThreadId;
        const fullThreads = state.ChatStoredReducer.fullThreads || {};
        let Thread = fullThreads[thread_id] || {};
        let count;
        let isGroup = false;
        let reactionType = [];
        let one = false,
            two = false,
            three = false,
            four = false,
            five = false;

        if (!mid) {
            return {
                hidden: true
            }
        }

        else {
            let messageReactions = listMessageReactions[mid]
            if (!messageReactions) {
                return {
                    hidden: true
                }
            }
            count = Object.keys(messageReactions).length;
            let reactionTypes = Object.values(messageReactions) || [];
            reactionType = _.uniq(reactionTypes)


        }
        reactionType.forEach((type) => {
            if (type === 1) {
                one = true;
            }
            else if (type === 2) {
                two = true;
            }
            else if (type === 3) {
                three = true;
            }
            else if (type === 4) {
                four = true;
            }
            else if (type === 5) {
                five = true;
            }
            else {

            }
        })
        if (Thread.is_group) {
            isGroup = true
        }
        const fullMessages = state.ChatStoredReducer.fullMessages;
        if (!fullMessages[mid] || fullMessages[mid].is_removed) {
            return {
                hidden: true
            }
        }
        return {
            isGroup,
            count,
            one,
            two,
            three,
            four,
            five,
        }
    }, (prev, next) => isEqual(prev, next));
    
    const handleShowDetails = () => {
        if (!isPoppingup) {
            navigation.navigate("DetailsReaction", {
                _id: mid,
                isMine: check
            })
        }
    }
    if (hidden) {
        return null;
    }
    return (
        <View style={{
            position: "absolute",

            // justifyContent: 'flex-end',
            bottom: 0,
            right: check ? null : 0,
            left: check ? 0 : null,
            // alignItems: 'flex-end',
            // backgroundColor:"#ccc",
            padding: 10,
            // zIndex:999999,
        }}>
            {
                !check
                    ?
                    <View style={{
                        position: "absolute",
                        height: 16,
                    }}>
                        <TouchableOpacity
                            disabled={!isGroup}
                            onPress={handleShowDetails}
                            style={{
                                flexDirection: "row",
                                backgroundColor: "#fff",
                                position: "absolute",
                                marginLeft: 10,
                                // right:0,
                                // top:-20,
                                // height:100,
                                padding: count > 0 ? 4 : 0,
                                borderWidth: count > 0 ? 1 : 0,
                                borderColor: "#e6e6e6",
                                borderRadius: 10,
                            }}
                            activeOpacity={true}
                        >
                            {
                                one
                                    ?
                                    <View key={1}>
                                        {listReactionType['1']}
                                    </View>
                                    : null
                            }

                            {
                                two
                                    ?
                                    <View key={2}>
                                        {listReactionType['2']}
                                    </View>
                                    : null

                            }
                            {
                                three
                                    ?
                                    <View key={3}>
                                        {listReactionType['3']}
                                    </View>
                                    : null

                            }
                            {
                                four
                                    ?
                                    <View key={4}>
                                        {listReactionType['4']}
                                    </View>
                                    : null

                            }

                            {
                                five
                                    ?
                                    <View key={5}>
                                        {listReactionType['5']}
                                    </View>
                                    : null

                            }
                            {
                                isGroup && count > 1
                                    ?
                                    <View style={{
                                        // width:20,
                                        height: 15,
                                        // backgroundColor:"#ccc",
                                        borderRadius: 50,
                                        justifyContent: "center",
                                        alignItems: "center",

                                    }}>
                                        <Text style={{
                                            fontWeight: "500",
                                            color: "#808080"
                                        }}>{count && count}</Text>
                                    </View>
                                    : null
                            }
                        </TouchableOpacity>
                        {/* <Text style={{
                        fontSize: 16,
                    }}>đây là reactionádasdasdasdsádadsaass</Text> */}
                    </View>
                    :






                    <View style={{
                        position: "absolute",
                        height: 20,
                        right: 12,
                    }}>
                        <TouchableOpacity
                            disabled={!isGroup}
                            onPress={handleShowDetails}
                            activeOpacity={true}
                            style={{
                                flexDirection: "row",
                                backgroundColor: "#fff",
                                padding: count > 0 ? 4 : 0,
                                borderWidth: count > 0 ? 1 : 0,
                                borderColor: "#e6e6e6",
                                borderRadius: 10,
                                // backgroundColor:"red",

                            }}>
                            {
                                isGroup && count > 1 ?
                                    <View style={{
                                        paddingLeft: 4,
                                        paddingRight: 4,
                                        // backgroundColor:"#ccc",
                                        borderRadius: 50,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <Text style={{
                                            fontWeight: "500",
                                            color: "#808080"
                                        }}>{count && count}</Text>
                                    </View>
                                    : null
                            }
                            {
                                five
                                    ?
                                    <View key={5}>
                                        {listReactionType['5']}
                                    </View>
                                    : null

                            }


                            {
                                four
                                    ?
                                    <View key={4}>
                                        {listReactionType['4']}
                                    </View>
                                    : null

                            }
                            {
                                three
                                    ?
                                    <View key={3}>
                                        {listReactionType['3']}
                                    </View>
                                    : null

                            }
                            {
                                two
                                    ?
                                    <View key={2}>
                                        {listReactionType['2']}
                                    </View>
                                    : null

                            }
                            {
                                one
                                    ?
                                    <View key={1}>
                                        {listReactionType['1']}
                                    </View>
                                    : null

                            }

                        </TouchableOpacity>

                    </View>
            }
        </View>
    )
}

export default React.memo(MessageReactionNew, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
});