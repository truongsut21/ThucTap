import React, { } from "react";
import {
    FlatList, View, TouchableOpacity
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FastImage from 'react-native-fast-image';
import { stickerRef } from '../../static/ChatRef';
import { sticker_server } from '../../../../config/config.json';
import { WIDTH, HEIGHT } from '../../controllers/utils';
import * as Action from '../../controllers/actionTypes';
import {
    cat, cat2, pyru,
    dog, usagy, tomjerry, tomjerry2
} from "./sticker_data";
var ObjectID = require("bson-objectid");

const STICKER_DATAS = {
    cat: cat,
    cat2: cat2,
    dog: dog,
    pyru: pyru,
    usagy: usagy,
    tomjerry: tomjerry,
    tomjerry2: tomjerry2
}

const StickerItem = ({ myUserId, thread_id, item, activeSticker, setRecentlyUsedStickerType }) => {
    const dispatch = useDispatch();

    const onSendSticker = () => {
        try {
            // if (this.tempPauseFastSendSticker) {
            //     return;
            // }
            let draft_id = ObjectID().toString();
            let data = {
                _id: draft_id,
                draft_id,
                thread_id: thread_id,
                create_date: new Date().getTime(),
                create_uid: myUserId,
                content: {
                    stickerType: activeSticker,
                    stickerPosition: item.name,
                    shortMimetype: 'png'
                },
                type: 'sticker',
            }
            dispatch({
                type: Action.CREATE_DRAFT_MESSAGE,
                data,
                dispatch: dispatch
            })

            setRecentlyUsedStickerType(activeSticker);
        } catch (error) {

        }
    }

    try {
        return (<TouchableOpacity
            style={{
                width: WIDTH / 4,
                height: WIDTH / 4,
                justifyContent: 'center', alignItems: 'center',
            }}
            onPress={onSendSticker}
        >
            <View style={{
                backgroundColor: '#fff',
                transform: [{ scale: (WIDTH / 1000) > 0.5 ? 0.5 : (WIDTH / 800) }],
            }}>
                <FastImage
                    style={{ width: 150, height: 150 }}
                    source={{
                        uri: `${sticker_server}/${activeSticker}/${item.name}.png`
                    }}
                />
            </View>
        </TouchableOpacity>)
    } catch (error) {
        return null;
    }
}
const MemoizedStickerItem = React.memo(StickerItem);

function StickerSelectedList({ setRecentlyUsedStickerType }) {
    const myUserId = useSelector(state => {
        return state.AuthStoredReducer.myUserInfo._id
    }, (prev, next) => prev === next);
    const activeThreadId = useSelector(state => {
        return state.ChatUnstoredReducer.activeThreadId;
    }, (prev, next) => prev === next);
    const activeSticker = useSelector(state => {
        return state.ChatUnstoredReducer.activeSticker ? state.ChatUnstoredReducer.activeSticker : 'cat';
    }, (prev, next) => prev === next);

    const keyExtractor = (item) => `${activeSticker}_${item.name}`;

    const renderItem = ({ item, index }) => {
        try {
            return (<MemoizedStickerItem
                myUserId={myUserId}
                thread_id={activeThreadId}
                item={item}
                activeSticker={activeSticker}
                setRecentlyUsedStickerType={setRecentlyUsedStickerType} />)
        } catch (error) {
            return null;
        }
    }

    const ItemSeparatorComponent = () => {
        return (<View style={{ height: 0, backgroundColor: 'blue' }} />)
    }

    try {
        return (<FlatList
            ref={stickerRef}
            style={{ paddingHorizontal: 0, backgroundColor: '#fff' }}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            data={activeSticker ? STICKER_DATAS[activeSticker] : []}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ItemSeparatorComponent}
            getItemLayout={(data, index) => ({ length: 150, offset: 150 * index, index })}
        // removeClippedSubviews={true}
        />);
    } catch (error) {
        return null;
    }
}

export default React.memo(StickerSelectedList);