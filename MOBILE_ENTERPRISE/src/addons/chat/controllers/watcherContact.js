import {
    takeLeading, call, put, select, takeEvery,
    take, all, fork, delay, spawn, takeLatest
} from 'redux-saga/effects';
import { InteractionManager, Platform } from 'react-native';
import {
    cloneDeep, forEach, isEmpty, orderBy, maxBy,
    union, unionBy, unionWith, uniqBy, without, omit
} from 'lodash';
import * as Action from './actionTypes';
import { WorkerChatToDo } from './utils';
import * as ActionChat from '../../chat/controllers/actionTypes'

export function* watcherContact() {
    yield takeEvery(Action.API_SHARE_CONTACT, workerAPIShareContact);
}

export function* workerAPIShareContact(action) {
    try {
        const { someone_id, thread_id, navigation } = action.data
        let token = yield select(state => state.AuthStoredReducer.token)
        let res = yield call(WorkerChatToDo, {
            functionName: '/api/sendContactMessage',
            token: token,
            payload: {
                data: {
                    someone_id,
                    thread_id
                }
            }
        })

        const { Message } = res
    }
    catch (error) {
    }
}