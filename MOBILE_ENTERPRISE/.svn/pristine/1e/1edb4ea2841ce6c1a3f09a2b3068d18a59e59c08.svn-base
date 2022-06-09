import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import ProgressBar from 'react-native-progress/Bar';
import { WIDTH } from '../../controllers/utils';
import { useNavigation } from '@react-navigation/native';
import isEqual from 'react-fast-compare';
import DispatchImage from '../DispatchImage';
import DefaultAvatar from '../../static/default_ava.png';

const Option = ({ data, totalMemberCount, message_id }) => {
    const totalMemberSelected = useSelector(state => {
        try {
            const pollAnswers = state.ChatStoredReducer.pollAnswers
            if (pollAnswers[message_id]) {
                const number = pollAnswers[message_id][data._id]
                return Object.keys(number).length
            }
            return 0
        } catch (error) {
            return 0;
        }
    }, (prev, next) => isEqual(prev, next));
    
    const threadMember = useSelector(state => {
        try {
            let threadMember = state.ChatStoredReducer.threadMembers
            let activeThreadId = state.ChatUnstoredReducer.activeThreadId
            let member = threadMember[activeThreadId]
            return Object.keys(member).length
        } catch (error) {
            return 1
        }


    })
    // const lessMembers = useSelector(state => {
    //     try {
    //         if (totalMemberSelected.length === 0) {
    //             return [];
    //         }
    //         let fastContacts = state.ChatStoredReducer.fastContacts
    //         let imageAvatars = state.ChatStoredReducer.imageAvatars
    //         return totalMemberSelected.slice(0, 4).map((m) => {
    //             return {
    //                 _id: m,
    //                 source: fastContacts[m] && fastContacts[m].avatar_url ? imageAvatars[m].link : null
    //             }
    //         })
    //     } catch (error) {
    //         return [];
    //     }
    // }, (prev, next) => isEqual(prev, next));

    return (<View style={{
        paddingVertical: 7,
    }}>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 5,
        }}>
            <Text style={{
                flex: 1,
                fontWeight: '600',
            }} numberOfLines={1} ellipsizeMode='tail'>
                {data.title}
            </Text>

            <Text>{totalMemberSelected ? (totalMemberSelected / threadMember * 100).toFixed() : 0}%</Text>


            {/* Show Avatar người đã chọn */}
            {/* Không dùng flatlist để tối ưu vì component này rất simple */}
            {/* <View style={{
                flexDirection: 'row',
                width: 10 * (lessMembers.length + 1),
                height: 20,
            }}>
                {
                    lessMembers.map((m, i) => {
                        if (i === 3) {
                            return <View key={m._id} style={{
                                position: 'absolute',
                                left: i * 10,
                                zIndex: i,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 20, height: 20,
                                borderWidth: 0.7,
                                borderRadius: 15,
                                borderColor: '#ccc',
                                backgroundColor: '#eee'
                            }}>
                                <Text style={{
                                    fontSize: 9
                                }}>{`+${totalMemberSelected.length - 3}`}</Text>
                            </View>
                        }
                        if (m.source) {
                            return (<DispatchImage
                                key={m._id}
                                style={{
                                    position: 'absolute',
                                    left: i * 10,
                                    zIndex: i,
                                    width: 20, height: 20,
                                    borderRadius: 15,
                                    borderWidth: 0.7,
                                    borderColor: '#ccc'
                                }}
                                source={m.source}
                                type={'avatar'}
                                data={{
                                    _id: m._id
                                }}
                                cacheDisabled={true}
                            />)
                        }
                        return <Image
                            key={m._id}
                            source={DefaultAvatar}
                            style={{
                                position: 'absolute',
                                left: i * 10,
                                zIndex: i,
                                width: 20, height: 20,
                                borderRadius: 15,
                                borderWidth: 0.7,
                                borderColor: '#ccc'
                            }} />
                    })
                }
            </View> */}
        </View>
        <ProgressBar
            useNativeDriver={true}
            progress={(totalMemberSelected * 1.0) / (threadMember * 1.0)}
            width={null}
            height={8}
            color={'#00A48D'}
            unfilledColor={'#fff'}
            borderColor={"#fff"}
        />
    </View>);
}

const MemoizedOption = React.memo(Option);

const PollMessage = ({ message_id }) => {
    const navigation = useNavigation();
    const currentMessage = useSelector(state => {
        const fullMessages = state.ChatStoredReducer.fullMessages
        let message = fullMessages[message_id];
        if (!message) {
            return {
                message_id: null,
                thread_id: null,
                question: null,
                choices: null,
            }
        }
        //phải trả về json đơn giản,
        //vì json tầng sâu quá check isEqual bằng lodash not work
        return {
            message_id: message_id,
            thread_id: message.thread_id,
            question: message.content.question,
            choices: message.content.choices
        };
    }, (prev, next) => isEqual(prev, next));

    const totalMemberCount = useSelector(state => {
        try {
            // let thread_id = currentMessage.thread_id;
            // let listThreadUsers = state.ChatStoredReducer.listThreadUsers
            // if (listThreadUsers && thread_id && listThreadUsers[thread_id]) {
            //     return listThreadUsers[thread_id].length;
            // }
            return 1;
        } catch (error) {
            return 1;
        }
    }, (prev, next) => prev === next);

    const openVote = () => {
        navigation.navigate('Poll', {
            message_id: message_id,
            question: currentMessage.question,
            choices: currentMessage.choices
        })
    }

    const keyExtractor = (item, index) => {
        return item._id;
    }

    const renderItem = ({ item, index }) => {
        return (<MemoizedOption
            data={item}
            message_id={message_id}
            totalMemberCount={totalMemberCount || 1}
        />)
    }

    const ListFooterComponent = () => {
        if (currentMessage.choices.length > 5) {
            return (<TouchableOpacity style={{
                marginTop: 5
            }}
                activeOpacity={1}
                onPress={openVote}>
                <Text style={{
                    color: '#00A48D',
                    fontWeight: '600'
                }}>
                    Còn {currentMessage.choices.length - 5} phương án khác
                </Text>
            </TouchableOpacity>)
        }
        return null;
    }

    try {
        return (<View style={{
            width: (WIDTH / 5) * 3,
            marginHorizontal: WIDTH / 5,
            marginVertical: 15,
            borderRadius: 15,
            backgroundColor: '#eee'
        }}>
            <View style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 15,
            }}>
                <Text style={{
                    fontSize: 17,
                    fontWeight: '600',
                }}>
                    {currentMessage.question}
                </Text>

            </View>
            <FlatList
                style={{
                    flex: 1,
                    marginHorizontal: 10,
                    paddingBottom: 15,
                }}
                data={currentMessage.choices.slice(0, 5)}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListFooterComponent={ListFooterComponent}
            />
            <View style={{
                width: '100%'
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                    marginHorizontal: 10,
                    marginBottom: 10,
                    paddingVertical: 10,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    alignItems: 'center'
                }}
                    activeOpacity={1}
                    onPress={openVote}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                    }}>
                        Bình chọn
                    </Text>
                </TouchableOpacity>
            </View>
        </View>);
    } catch (error) {
        return null;
    }
}

export default React.memo(PollMessage);