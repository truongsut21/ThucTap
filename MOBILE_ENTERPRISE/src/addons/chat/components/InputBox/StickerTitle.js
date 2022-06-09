import React, { useEffect, useRef, useState } from "react";
import {
    FlatList, View, TouchableOpacity
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FastImage from 'react-native-fast-image';
// import { sticker_server } from '../../../../config/config.json';
import * as Action from '../../controllers/actionTypes';
import styles from '../../static/style'
// import {
//     cat, cat2, pyru,
//     dog, usagy, tomjerry, tomjerry2
// } from "./sticker_data";
const PREVIEW_ICONS = {
    cat: 'https://sticker.tomahosoft.com/stickers/cat/1.png',
    cat2: 'https://sticker.tomahosoft.com/stickers/cat2/1.png',
    dog: 'https://sticker.tomahosoft.com/stickers/dog/1.png',
    pyru: 'https://sticker.tomahosoft.com/stickers/pyru/1.png',
    usagy: 'https://sticker.tomahosoft.com/stickers/usagy/18.png',
    tomjerry: 'https://sticker.tomahosoft.com/stickers/tomjerry/1.png',
    tomjerry2: 'https://sticker.tomahosoft.com/stickers/tomjerry2/1.png',
}
const STICKER_DATAS = ['cat', 'cat2', 'tomjerry2', 'tomjerry', 'pyru', 'dog', 'usagy',]
// const STICKER_POINTER = {
//     cat: cat,
//     cat2: cat2,
//     dog: dog,
//     pyru: pyru,
//     usagy: usagy,
//     tomjerry: tomjerry,
//     tomjerry2: tomjerry2
// }

function StickerTitle({ recentlyUsedStickerType }) {
    const dispatch = useDispatch();
    const activeSticker = useSelector(state => {
        return state.ChatUnstoredReducer.activeSticker ? state.ChatUnstoredReducer.activeSticker : 'cat';
    }, (prev, next) => prev === next);
    // const stickerTypes = useSelector(state => {
    //     return Array.isArray(state.ChatUnstoredReducer.stickerTypes) ?
    //         state.ChatUnstoredReducer.stickerTypes : []
    // }, (prev, next) => isEqual(prev, next));
    // const [rearrangeStickerTypes, setRearrangeStickerTypes] = useState(stickerTypes);
    // const stickerTitleRef = useRef();
    // const [activeSticker, setActiveSticker] = useState(stickerType);

    // useEffect(() => {
    //     //Mục tiêu là để arrange lại danh sách các loại sticker đã dùng
    //     //Không nạp từ reducer ngay vì có thể có loại sticker nào đó đã bị bỏ đi
    //     let jsonStickerTemplates = {};
    //     STICKER_DATAS.forEach(d => {
    //         jsonStickerTemplates[d] = 1;
    //     })

    //     let arrangeTypes = [];
    //     stickerTypes.forEach(t => {
    //         if (jsonStickerTemplates[t]) {
    //             arrangeTypes.push(t);
    //             delete jsonStickerTemplates[`${t}`];
    //         }
    //     })

    //     //danh sách sticker mới thêm vào app nhưng chưa có trong reducer thì add vào cuối của rearrangeStickerTypes
    //     let newStickerTypes = Object.keys(jsonStickerTemplates);
    //     if (newStickerTypes.length > 0) {
    //         newStickerTypes.forEach(t => {
    //             arrangeTypes.push(t);
    //         })
    //     }
    //     setRearrangeStickerTypes(arrangeTypes);
    // }, []);

    // useEffect(() => {
    //     dispatch({
    //         type: Action.UPDATE_LIST_STICKER_TYPE,
    //         data: rearrangeStickerTypes
    //     })
    // }, [rearrangeStickerTypes]);

    // useEffect(() => {
    //     try {
    //         if (recentlyUsedStickerType) {
    //             let arrangeTypes = [...rearrangeStickerTypes];
    //             let i = arrangeTypes.findIndex(t => t === recentlyUsedStickerType);
    //             if (i > -1) {
    //                 arrangeTypes.splice(i, 1);
    //                 arrangeTypes.unshift(recentlyUsedStickerType);
    //                 setRearrangeStickerTypes(arrangeTypes);
    //                 setTimeout(() => {
    //                     if (stickerTitleRef && stickerTitleRef.current) {
    //                         stickerTitleRef.current.scrollToIndex({
    //                             animated: true,
    //                             index: 0,
    //                             viewPosition: 0
    //                         });
    //                     }
    //                 }, 50);
    //             }
    //         }
    //     } catch (error) {

    //     }
    // }, [recentlyUsedStickerType])

    const switchSticker = (type) => {
        if (type !== activeSticker) {
            dispatch({
                type: Action.UPDATE_ACTIVE_STICKER,
                data: type
            })
        }
    }

    const keyExtractor = (item) => {
        return item;
    }

    const renderItem = ({ item, index }) => {
        return (<TouchableOpacity delayPressIn={0} delayPressOut={0}
            style={[{
                marginRight: 20,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 5,
                paddingHorizontal: 10,
            }, item === activeSticker ? styles.active : '']}
            onPress={() => switchSticker(item)}>
            <FastImage
                style={{ width: 30, height: 30 }}
                source={{ uri: PREVIEW_ICONS[item] }} />
        </TouchableOpacity>)
    }

    return (<View style={{
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    }}>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={STICKER_DATAS}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={(data, index) => ({ length: 40, offset: 40 * index, index })}
        />
    </View>);

}

export default React.memo(StickerTitle);