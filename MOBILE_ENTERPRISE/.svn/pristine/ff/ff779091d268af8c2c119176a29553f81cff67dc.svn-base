import {
    takeLeading, call, put, select, takeEvery,
    take, all, fork, delay, spawn, takeLatest
} from 'redux-saga/effects';
import {
    cloneDeep, forEach, isEmpty, orderBy, maxBy,
    union, unionBy, unionWith, uniqBy, without, omit
} from 'lodash';
import * as Action from './actionTypes';
import { WorkerChatToDo } from './utils';

export function* watcherPin() {
    yield takeEvery(Action.UPDATE_PIN_MESSAGE, workerUpdatePinMessage);
}

export function* workerUpdatePinMessage(action) {
    try {

        yield call(InteractionManager.runAfterInteractions);
        let { activeUserId } = yield select(state => state.AuthStoredReducer);
        let pinMessages = yield select((state) => state.ChatStoredReducer.pinMessages)
        switch (action.ttype) {
            case 'init': {
                yield put({
                    type: Action.UPDATE_PIN_MESSAGE_SUCCESS,
                    data: {
                        ...action.data,
                    }
                })
                break;
            }
            case 'fetchbylasttime': {
                forEach(action.data, (dat, thread_id) => {
                    if (dat.pin) {
                        if (pinMessages[`${thread_id}`]) {
                            pinMessages[`${thread_id}`] = unionBy(dat.pin, pinMessages[`${thread_id}`], '_id');
                        } else {
                            pinMessages[`${thread_id}`] = dat.pin;
                        }
                    }
                    if (dat.unpin && pinMessages[`${thread_id}`]) {
                        let toReplacedPinnedMessages = cloneDeep(pinMessages[`${thread_id}`]);
                        let unpinMessages = dat.unpin;
                        unpinMessages.forEach(m => {
                            // m là id nhé, ko phải object
                            let indexOfToRemove = toReplacedPinnedMessages.findIndex(i => i._id === m);
                            if (indexOfToRemove > -1) {
                                toReplacedPinnedMessages.splice(indexOfToRemove, 1);
                            }
                        })
                        pinMessages[`${thread_id}`] = toReplacedPinnedMessages;
                    }
                    pinMessages[`${thread_id}`] = orderBy(pinMessages[`${thread_id}`], 'pin_date', 'asc');
                })
                yield put({
                    type: Action.UPDATE_PIN_MESSAGE_SUCCESS,
                    data: pinMessages
                })
                break;
            }
            case 'pin': {
                let data = action.data;
                if (data.thread_id && data.message) {
                    if (pinMessages[data.thread_id]) {
                        pinMessages[data.thread_id] = unionBy([data.message], pinMessages[data.thread_id], '_id');
                        pinMessages[data.thread_id] = orderBy(pinMessages[data.thread_id], 'pin_date', 'asc');
                    } else {
                        Object.assign(pinMessages, {
                            [data.thread_id]: [data.message]
                        })
                    }
                    yield put({
                        type: Action.UPDATE_PIN_MESSAGE_SUCCESS,
                        data: pinMessages
                    })
                }
                break;
            }
            case 'unpin': {
                let data = action.data;
                if (data.thread_id && data.message_id) {
                    if (pinMessages[data.thread_id]) {
                        let pinMessagesOfThread = without(pinMessages[data.thread_id].map(m => {
                            if (m._id === data.message_id) {
                                return false;
                            } else {
                                return m;
                            }
                        }), false);
                        pinMessages[data.thread_id] = pinMessagesOfThread;
                        yield put({
                            type: Action.UPDATE_PIN_MESSAGE_SUCCESS,
                            data: pinMessages
                        })
                    }
                }
                break;
            }
            case 'leavethread': {
                delete pinMessages[action.thread_id];
                yield put({
                    type: Action.UPDATE_PIN_MESSAGE_SUCCESS,
                    data: pinMessages
                })
                break;
            }
            default:
                break;
        }
    } catch (error) {

    }
}