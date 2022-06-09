import * as React from 'react';
var _ = require('lodash');

export const threadListRef = React.createRef();
export const inputChatRef = React.createRef();
export const chatBoxFlatListRef = React.createRef();
export let activeThreadInputRef = [];
// export var activeThreadInputRef = [];
export function removeInputByThread(thread_id) {
    if (Array.isArray(activeThreadInputRef) && typeof thread_id === 'string') {
        // activeThreadInputRef = activeThreadInputRef.filter(id => id !== thread_id);
        let index = activeThreadInputRef.indexOf(thread_id);
        if (index > -1) {
            activeThreadInputRef.splice(index, 1);
        }
    }
}
export function keepInputByThread(thread_id) {
    if (Array.isArray(activeThreadInputRef) && typeof thread_id === 'string') {
        // activeThreadInputRef = _.union(activeThreadInputRef, [thread_id]);
        if (activeThreadInputRef.indexOf(thread_id) === -1) {
            activeThreadInputRef.push(thread_id)
        }
    }
}

export const cameraRef = React.createRef();
export const stickerRef = React.createRef();
export let closeCameraAndSticker = false;

export function initCloseCameraAndSticker(func) {
    closeCameraAndSticker = func;
}

export const zoomImageRef = React.createRef();
