import CryptoJS from "react-native-crypto-js";
import * as config from './config.json';
import { Dimensions, Platform, StatusBar } from 'react-native';
import { isEmpty } from 'lodash';
var Sound = require('react-native-sound');

const STATUSBAR_DEFAULT_HEIGHT = 20;
const STATUSBAR_X_HEIGHT = 44;
const STATUSBAR_IP12_HEIGHT = 47;
const STATUSBAR_IP12MAX_HEIGHT = 47;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const IP12_WIDTH = 390;
const IP12_HEIGHT = 844;

const IP12MAX_WIDTH = 428;
const IP12MAX_HEIGHT = 926;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');

let statusBarHeight = STATUSBAR_DEFAULT_HEIGHT;
let isIPhoneX_v = false;
let isIPhoneXMax_v = false;
let isIPhone12_v = false;
let isIPhone12Max_v = false;
let isIPhoneWithMonobrow_v = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    if (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        isIPhoneX_v = true;
        statusBarHeight = STATUSBAR_X_HEIGHT;
    } else if (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        isIPhoneXMax_v = true;
        statusBarHeight = STATUSBAR_X_HEIGHT;
    } else if (W_WIDTH === IP12_WIDTH && W_HEIGHT === IP12_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        isIPhone12_v = true;
        statusBarHeight = STATUSBAR_IP12_HEIGHT;
    } else if (W_WIDTH === IP12MAX_WIDTH && W_HEIGHT === IP12MAX_HEIGHT) {
        isIPhoneWithMonobrow_v = true;
        isIPhone12Max_v = true;
        statusBarHeight = STATUSBAR_IP12MAX_HEIGHT;
    }
}

export const isIPhoneX = () => isIPhoneX_v;
export const isIPhoneXMax = () => isIPhoneXMax_v;
export const isIPhone12 = () => isIPhone12_v;
export const isIPhone12Max = () => isIPhone12Max_v;
export const isIPhoneWithMonobrow = () => isIPhoneWithMonobrow_v;

const getExpoRoot = () => global.Expo || global.__expo || global.__exponent;

export const isExpo = () => getExpoRoot() !== undefined;

export function getStatusBarHeight(skipAndroid) {
    return Platform.select({
        ios: statusBarHeight,
        android: skipAndroid ? 0 : StatusBar.currentHeight,
        default: 0
    })
}

// export const sound = Platform.select({
//     ios: () => {
//         return {
//             // soundReceiving: new Sound('SENTSOUND.caf', Sound.MAIN_BUNDLE, error => {
//             //     if (error) {

//             //     }
//             // }),
//             // soundTyping: new Sound('dang_go.caf', Sound.MAIN_BUNDLE, error => {
//             //     if (error) {

//             //     }
//             // }),
//             soundSent: new Sound('tin_nhan_moi.caf', Sound.MAIN_BUNDLE, error => {
//                 if (error) {
//                     
//                 }
//                 else {
//                     
//                 }
//             }),
//         }
//     },
//     android: () => {
//         return {
//             soundReceiving: new Sound('tin_nhan_moi.mp3', Sound.MAIN_BUNDLE, error => {
//                 if (error) {

//                 }
//             }),
//             soundTyping: new Sound('dang_go.mp3', Sound.MAIN_BUNDLE, error => {
//                 if (error) {

//                 }
//             })
//         }
//     }
// })
// export var soundSent = new Sound('tin_nhan_moi.caf', Sound.MAIN_BUNDLE, error => {
//     if (error) {

//     }
// })
// export var soundReceiving = new Sound(Platform.OS === 'android' ? 'tin_nhan_moi.mp3' : 'tin_nhan_moi.caf', Sound.MAIN_BUNDLE, error => {
//     if (error) {

//     }
// })
// export var soundTyping = new Sound(Platform.OS === 'android' ?  'dang_go.mp3'  : 'dang_go.caf', Sound.MAIN_BUNDLE, error => {
//     if (error) {

//     }
// })
export var soundReceiving = '';
export var soundTyping = '';

export var SentSound = new Sound(Platform.OS === 'android' ? 'sent_sound.mp3' : 'sent-sound.caf', Sound.MAIN_BUNDLE, error => {
    if (error) {
        return;
    }
})

const password = config.payloadAESPass;
export const encryptPayload = (payload) => {
    let deviceInfo = {
        device: 'Không xác định',
        browser: 'Không xác định',
        login_type: 'MOBILE_LOGIN'
    }
    // if (osName && osVersion) {
    //     deviceInfo.device = `${osName} ${osVersion}`
    // }
    // if (browserName && browserVersion) {
    //     deviceInfo.browser = `${browserName} ${browserVersion}`
    // }
    Object.assign(payload, { device: deviceInfo })
    // // 
    let encryptedPayload = CryptoJS.AES.encrypt(JSON.stringify(payload), password).toString()
    return Promise.resolve(encryptedPayload);
}

export const extractDataByUserId = (reducer = {}, user_id = null, defaultValue = {}) => {
    if (isEmpty(reducer) || Array.isArray(reducer) || !user_id || !reducer) {
        return defaultValue;
    }
    try {
        return reducer[user_id] ? reducer[user_id] : defaultValue;
    } catch (error) {
        return defaultValue;
    }
}