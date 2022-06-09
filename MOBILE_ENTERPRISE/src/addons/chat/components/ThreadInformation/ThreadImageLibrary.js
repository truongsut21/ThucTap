import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, SafeAreaView, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';
import DispatchImage from '../DispatchImage';
import StatusBar from '../../../base/components/StatusBar';
import { WIDTH, HEIGHT, calcImageDimension } from '../../controllers/utils';
import * as Action from '../../controllers/actionTypes';
const Anim = require("../../../../static/empty-folder.json");
import { without } from 'lodash';



const SingleImage = ({ item }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const localImage = useSelector(state => {
        const listFiles = state.ChatStoredReducer.listFiles;
        return listFiles[`${item._id}_lowprofile`];
    }, (prev, next) => isEqual(prev, next));


    useEffect(() => {
        if (!localImage) {
            dispatch({
                type: Action.API_DOWNLOAD_IMAGE,
                data: {
                    content: item
                },
                dispatch: dispatch,
            })
        }
    }, [localImage]);

    const onPress = () => {
        let { width, height } = item.metadata;
        const { imageWidth, imageHeight } = calcImageDimension({ width, height });
        navigation.navigate('PopupImage', {
            image_id: item._id,
            message_id: item.message_id,
            x: 0,
            y: 0,
            fromWidth: WIDTH / 3 - 1,
            fromHeight: WIDTH / 3 - 1,
            toWidth: imageWidth,
            toHeight: imageHeight
        })
    }

    return <TouchableOpacity
        style={{
            width: WIDTH / 3 - 1,
            height: WIDTH / 3 - 1,
            marginRight: 1,
        }}
        delayPressIn={0} delayPressOut={0}
        onPress={onPress}
    >
        <DispatchImage
            style={{
                height: WIDTH / 3 - 1,
                width: WIDTH / 3 - 1,
                borderWidth: 1,
                    borderColor: '#ddd',
            }}
            source={localImage}
            type={'image'}
            data={{
                fileContent: item,
            }}
        />
    </TouchableOpacity>;
}

const ThreadImageLibrary = () => {
    const navigation = useNavigation();
    const activeThreadId = useSelector(state => state.ChatUnstoredReducer.activeThreadId);
    const reducerImages = useSelector(state => {
        if (!activeThreadId) return [];
        const simpleMessages = state.ChatStoredReducer.simpleMessages;
        const fullMessages = state.ChatStoredReducer.fullMessages;
        const fM = state.ChatStoredReducer.fullMessages;
        let MessagesInThread = simpleMessages[activeThreadId] || [];

        let mediaMessages = MessagesInThread.filter(m => {
            return fM[m._id] && fM[m._id]._id !== fM[m._id].draft_id &&
                !fM[m._id].is_removed && (fM[m._id].type === 'image' || fM[m._id].type === 'image_group');
        });

        let medias = without(mediaMessages.map(m => {
            let message = fullMessages[m._id];
            if (message.type === 'image') {
                return {
                    ...message.content,
                    message_id: message._id,
                }
            } else {
                if (Array.isArray(message.content)) {
                    return message.content.map(f => ({
                        ...f,
                        message_id: message._id,
                    }))
                }
                return null;

            }
        }), null).flat();
        return medias;
    }, (prev, next) => isEqual(prev, next));
    const [Images, setImages] = useState([]);


    useEffect(() => {
        if (!activeThreadId) {
            navigation.goBack();
        }
    }, [activeThreadId]);

    useEffect(() => {
        setImages(reducerImages);
    }, [reducerImages]);


    const keyExtractor = (item, index ) => {
        if (!item) return index;
        return item._id;
    }

    const renderItem = ({ item, index }) => {
        if (!item) return null;
        return <View style={{marginVertical: 1}}>
        <SingleImage item={item} />
        </View>
    }

    return <React.Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle='light-content' backgroundColor='#00A48D' />
            {/* <StatusBar backgroundColor='#00A48D' barStyle={'dark-content'} /> */}
            <View style={{
                height: 50,
                backgroundColor: '#fff',
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderBottomColor: '#ddd',
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginRight: 5 }}>
                        <TouchableOpacity delayPressIn={0} delayPressOut={0} style={{ padding: 10 }} onPress={() => navigation.goBack()}>
                            <AntDesign color='#000' size={22} name='arrowleft' style={{}} />
                        </TouchableOpacity>
                    </View>

                    <Text style={{ fontSize: 17, color: '#000', fontWeight: '500' }}>
                        Hình ảnh
                    </Text>
                </View>
            </View>

            <View style={{marginLeft: 2, marginRight: 2}}>
                <FlatList
                    data={Images}
                    ListEmptyComponent={() => {
                        return <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <LottieView source={Anim} style={{
                                width: (WIDTH * 2 / 3),
                                height: WIDTH * 2 / 3
                            }} autoPlay loop />
                        </View>
                    }}
                    numColumns={3}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    // initialNumToRender={21}
                    // ItemSeparatorComponent={(a) => {
                    //     return (
                    //         <View style={{ height: 1, backgroundColor: '#fff' }} />
                    //     )
                    // }}
                />
            </View>
        </SafeAreaView>

    </React.Fragment>;
}

export default ThreadImageLibrary;