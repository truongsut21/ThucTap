import React, { useEffect, useRef, useState } from 'react';
import {
    Text, View, Platform,
    TouchableOpacity,
    Animated, FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/core';
import isEqual from "react-fast-compare";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { WIDTH, HEIGHT, } from "../../controllers/utils";
import ContactElement from '../../../friend/component/ContactElement';
import { lastIndexOf } from 'lodash';
var _ = require('lodash')


const PollSummaryByChoice = ({ message_id, activeChoice, noneChoose }) => {
    const people = useSelector(state => {
        try {
            const pollAnswers = state.ChatStoredReducer.pollAnswers;
            return Object.keys(pollAnswers[message_id][activeChoice]);
        } catch (error) {
            return [];
        }

    })
    const keyExtractor = (item, index) => item;
    const renderItem = ({ item, index }) => {
        return (
            <ContactElement
                _id={item}
                what_doing='renderPollAnswers'
            />
        )
    }
    if (noneChoose && activeChoice === "123") {
        return (
            <View style={{ height: '95%', paddingTop: 10, }}>
                <FlatList
                    data={noneChoose}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                />
            </View>
        )
    }
    else {
        return (
            <View style={{ height: '95%', paddingTop: 10, }}>
                <FlatList
                    data={people}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                />
            </View>
        )
    }
}
const TabItem = ({ item, switchChoice, activeChoice }) => {
    const onPress = () => {
        switchChoice(item._id);
    }
    return (
        <React.Fragment>
            <TouchableOpacity
                style={{
                    height: 20,
                    paddingHorizontal: 10,
                    marginHorizontal: 5,
                    borderRadius: 5,
                    backgroundColor: activeChoice === item._id ? '#00A48D' : '#ddd',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
                onPress={onPress}>
                <Text
                    style={{ color: activeChoice === item._id ? 'white' : 'black' }}
                >{item.title}</Text>
            </TouchableOpacity>

        </React.Fragment>
    )
}
function PollDetails() {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const opacityRef = useRef(new Animated.Value(0)).current;
    const translateYRef = useRef(new Animated.Value(HEIGHT)).current;
    const route = useRoute();
    const { data } = route.params;
    const message_id = data;
    // let templateChoicesAdd = []
    let { templateChoices, noneChoose } = useSelector(state => {
        try {
            const fullMessages = state.ChatStoredReducer.fullMessages;
            const threadMembers = state.ChatStoredReducer.threadMembers;
            const activeThreadId = state.ChatUnstoredReducer.activeThreadId;
            const myThreadMember = threadMembers[activeThreadId];
            let cloneThreadMembers = { ...myThreadMember };
            let message = fullMessages[message_id];
            let templateChoicessss = message.content.choices;
            const pollAnswers = state.ChatStoredReducer.pollAnswers; // {message_id: {poll_id:{user_id:true,.... }}}
            let chooseIds = Object.values(pollAnswers[message_id]); // [{ user_id: true, ... }]
            for (let choose of chooseIds) { // choose {user_id: true,...}
                let userIds = Object.keys(choose); // userIds [user_id,...]
                for (let i of userIds) {
                    if (cloneThreadMembers[i]) {
                        delete cloneThreadMembers[i];
                    }
                }
            }
            let noAnswerUserIds = Object.keys(cloneThreadMembers);
            return {
                templateChoices: [...templateChoicessss, {
                    _id: "123",
                    title: "Thành viên chưa chọn",
                }],
                noneChoose: noAnswerUserIds
            }
            // return [];
        } catch (error) {
            return [];
        }
    }, (prev, next) => isEqual(prev, next));
    const [activeChoice, setActiveChoice] = useState('');
    useEffect(() => {
        if (templateChoices && templateChoices.length > 0) {
            setActiveChoice(templateChoices[0]._id)
        }
    }, [templateChoices])
    useEffect(() => {
        Animated.timing(opacityRef, {
            duration: Platform.OS === "android" ? 200 : 300,
            toValue: 0.5,
            useNativeDriver: true,
        }).start();
        Animated.spring(translateYRef, {
            duration: Platform.OS === "android" ? 200 : 300,
            toValue: (HEIGHT * 2) / 5,
            useNativeDriver: true,
        }).start();
    }, []);
    //
    const close = () => {
        Animated.timing(opacityRef, {
            duration: 200,
            toValue: 0,
            useNativeDriver: true,
        }).start();
        Animated.timing(translateYRef, {
            duration: 200,
            toValue: HEIGHT,
            useNativeDriver: true,
        }).start((finished) => {
            if (finished) navigation.goBack();
        });
    }
    const switchChoice = (_id) => {
        setActiveChoice(_id)
    }
    const keyExtractor = (item, index) => item._id;
    const renderItem = ({ item, index }) => {
        return (
            <TabItem
                item={item}
                switchChoice={switchChoice}
                activeChoice={activeChoice}
                noneChoose={item.noneChoose}
            />
        )
    }

    return (
        <View>
            <Animated.View
                style={{
                    height: HEIGHT,
                    width: WIDTH,
                    backgroundColor: "#aaa",
                    opacity: 0.2,
                }}
            >
                <TouchableOpacity
                    onPress={close}
                    style={{
                        // flex: 1,
                        height: HEIGHT,
                        width: WIDTH,
                    }}
                ></TouchableOpacity>
            </Animated.View>
            <Animated.View
                style={{
                    position: "absolute",
                    zIndex: 1,
                    // bottom: 2,
                    height: (HEIGHT * 3) / 5,
                    width: WIDTH,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: "#fff",
                    transform: [
                        {
                            translateY: translateYRef,
                        },
                    ],
                }}
            >
                {/* close */}
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                }}>
                    <Text style={{
                        fontWeight: "500",
                        fontSize: 16,
                        flex: 1,

                    }}>
                        Chi tiết bình chọn
                    </Text>
                    <TouchableOpacity
                        style={{
                            paddingVertical: 4,
                            paddingHorizontal: 6,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#eee",
                            borderRadius: 25,
                        }}
                        onPress={close}
                    >
                        <FontAwesome name="remove" size={20} color="#737373" />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'column', height: 40 }}>
                    <FlatList
                        data={templateChoices}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        contentContainerStyle={{ flexDirection: 'row' }}
                        horizontal
                    />

                </View>
                <PollSummaryByChoice message_id={data} activeChoice={activeChoice} noneChoose={noneChoose} />
            </Animated.View>
        </View>
    )
}

export default PollDetails