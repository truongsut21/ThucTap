import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from "react-native-image-resizer";
import { useDispatch, useSelector } from 'react-redux';
import { _computeNiceRatioForLowResolutionImage } from '../../chat/controllers/utils';
import * as ActionChat from '../../chat/controllers/actionTypes';
// import * as ActionBase from '../../auth/controllers/actionTypes';

var RNFS = require("react-native-fs");
var ObjectID = require("bson-objectid");

const ImageGalleryPicker = ({}) => {
    const route = useRoute();
    const navigation = useNavigation();
    const openFrom = route.params.openFrom;
    const dispatch = useDispatch();
    const activeThreadId = useSelector(state => state.ChatUnstoredReducer.activeThreadId);
    const myUserId = useSelector(state => state.AuthStoredReducer.myUserInfo && state.AuthStoredReducer.myUserInfo._id);

    useEffect(() => {
        openImageGallery();
        // ImagePicker.launchImageLibrary({
        //     mediaType: "photo",
        //     storageOptions: {
        //         // cameraRoll: process.env && process.env.NODE_ENV &&
        //         //     process.env.NODE_ENV.includes('development') ? false : true,
        //         privateDirectory: true,
        //     },
        // })
        // ImagePicker.showImagePicker({
        //     // title: "Mở thư viện ảnh",
        //     mediaType: "photo",
        //     storageOptions: {
        //         // cameraRoll: process.env && process.env.NODE_ENV &&
        //         //     process.env.NODE_ENV.includes('development') ? false : true,
        //         privateDirectory: true,
        //     },
        //     // takePhotoButtonTitle: null, // Remove this button
        //     // chooseFromLibraryButtonTitle: null, // Remove this button
        //     // customButtons: [
        //     //     { name: "gallery", title: "Chọn ảnh từ thư viện" },
        //     // ],
        // }, response => {
        //     console.log(response);
        //     navigation.goBack();
        //     // if (response.didCancel) {
        //     // }
        //     // else if (response.error) {
        //     // }
        //     // else if (response.customButton === "gallery") {
        //     // }
        // })
    }, []);

    const _simplifyImageReponse = (obj) => {
        return {
            filename: obj.fileName,
            path: obj.uri,
            metadata: {
                width: obj.width,
                height: obj.height,
            },
        }
    }

    const _doImageForMessage = (images) => {
        let simpleImages = images.map(i => _simplifyImageReponse(i));
        let promises = [];
        simpleImages.forEach(image => {
                const ratio = _computeNiceRatioForLowResolutionImage({
                    ...image.metadata,
                });
                promises.push(ImageResizer.createResizedImage(
                    image.path,
                    ratio.width,
                    ratio.height,
                    "PNG",
                    100, 0, undefined, false, {}
                ))
            })
            //check cac hinh chat luong thap da cache
            //dung de hien len khi chon hinh anh de load nhanh hon
            //chi dung trong simplegallery
        return Promise.all(promises).then(results => {
            let multis = {}
            results.forEach((r, i) => {
                multis[simpleImages[i].path] = r.uri;
            })
            dispatch({
                type: ActionChat.UPDATE_CACHE_IMAGE_GALLERY,
                ttype: "add_multi",
                data: {
                    datas: multis
                },
            });

        }).then(res => {
            const chosenImages = [...simpleImages];
            const currentTime = Date.parse(new Date());
            const draft_id = ObjectID().toString();
            const data = {
                _id: draft_id,
                draft_id,
                parent_id: "",
                thread_id: activeThreadId,
                create_uid: myUserId,
                create_date: currentTime,
            };
            if (chosenImages.length === 1) {
                let content = {
                    _id: ObjectID().toString(),
                    link: chosenImages[0].path,
                    filename: chosenImages[0].filename,
                    metadata: chosenImages[0].metadata,
                };
                dispatch({
                    type: ActionChat.CREATE_DRAFT_MESSAGE,
                    data: {...data, content: {...content }, type: "image" },
                    dispatch,
                });
            } else {
                let contents = [];
                chosenImages.forEach(img => {
                    contents.push({
                        _id: ObjectID().toString(),
                        link: img.path,
                        filename: img.filename,
                        metadata: img.metadata,
                    })
                })
                dispatch({
                    type: ActionChat.CREATE_DRAFT_GROUP_MESSAGE,
                    data: {...data, content: contents, type: "image_group" },
                    dispatch,
                });
            }
            navigation.goBack();
        }).catch(error => {
            navigation.goBack();
        })
    }

    const openImageGallery = async() => {
        try {
            let res = await launchImageLibrary({
                mediaType: "photo",
                storageOptions: {
                    privateDirectory: true,
                },
                selectionLimit: 5,
                quality: 0.5,
            });
            if (openFrom === 'chooseImageForMessage') {
                const { assets } = res;
                _doImageForMessage(assets);
            }
        } catch (error) {
            navigation.goBack();
        }
    }

    return null;
}

export default ImageGalleryPicker;