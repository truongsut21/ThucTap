import { Platform } from 'react-native';
import { takeLeading, call, put, select, takeEvery, take, all, delay } from 'redux-saga/effects';
import notifee from '@notifee/react-native';
import * as ActionAuth from '../../auth/controllers/actionTypes';
import * as Action from './actionTypes';
var _ = require('lodash');


export function* watcherBase() {
    yield takeEvery(ActionAuth.UPDATE_ERROR, workerUpdateError);
    yield takeEvery(ActionAuth.UPDATE_BEAUTY_LOADING, workerUpdateBeautyLoading);
    yield takeEvery(ActionAuth.UPDATE_NOTIFICATION, workerUpdateNotification);
    yield takeLeading(Action.NAVIGATE_NEXT_SCREEN_AFTER_AMOUNT_OF_TIME, workerNavigateNextScreenAfterAmountOfTime);
    yield takeLeading(Action.DISPLAY_LOCAL_NOTIFICATION, workerDisplayLocalNotification);
}

function* workerUpdateError(action) {
    try {

        let { data } = action
        yield put({
            type: ActionAuth.UPDATE_ERROR_SUCCESS,
            data,
        })
        yield delay(2000);
        yield put({
            type: ActionAuth.CLEAR_ERROR_SUCCESS,
        })


    } catch (error) {

    }

}

function* workerUpdateNotification(action) {
    try {

        let { data } = action
        yield put({
            type: ActionAuth.UPDATE_NOTIFICATION_SUCCESS,
            data,
        })
        yield delay(3000);
        yield put({
            type: ActionAuth.UPDATE_NOTIFICATION_SUCCESS,
            data: "",
        })

    } catch (error) {

    }

}

function* workerUpdateBeautyLoading(action) {
    try {
        const { data } = action
        yield put({
            type: ActionAuth.UPDATE_BEAUTY_LOADING_SUCCESS,
            data
        })
        yield delay(1000)
        yield put({
            type: ActionAuth.CLEAR_BEAUTY_LOADING,
            data: false
        })
    } catch (error) {

    }
}


function* workerNavigateNextScreenAfterAmountOfTime(action) {
    try {
        const { navigation, data } = action;
        const { screen = '', params = {}, waitTime = 0 } = data;
        if (!screen) return true;
        yield delay(waitTime);
        navigation.navigate(screen, params);
        navigation.navigate()
    } catch (error) {

    }
}

//
//Dùng cho local notification
//
function createChannel() {
    return notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'piece_of_cake.mp3',
        vibration: true,
        vibrationPattern: [300, 500],
    });
}

function displayLocalNotification(action) {
    console.log("aaaaaa",action);
    return notifee.displayNotification({
        title: action.title,
        subtitle: action.subTitle ? action.subTitle : '',
        body: action.content,
        android: {
            channelId: action.channelId,
            // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
            // sound: 'piece_of_cake.caf',
        },
        ios: {
            sound: 'piece_of_cake.caf',
        },
        data: {
            route: action.route ? action.route : ""
        },
    });
}

function* workerDisplayLocalNotification(action) {
    try {
        //Bởi vì android cần như thế
        if (Platform.OS === 'android') {
            yield call(createChannel);
        }
        const { data = {} } = action;
        const { title, subTitle, content, route } = data;
        if (title && content) {
            yield call(displayLocalNotification, { channelId: 'default', title, subTitle, content, route });
        }
    } catch (error) {}
}

//
//End của local notification
//