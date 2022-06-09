// import {
//     takeLeading, call, put, select, takeEvery,
//     take, all, fork, delay, spawn, takeLatest
// } from 'redux-saga/effects';
// import { InteractionManager, Platform } from 'react-native';
// import {
//     cloneDeep, forEach, isEmpty, orderBy, maxBy,
//     union, unionBy, unionWith, uniqBy, without, omit
// } from 'lodash';
// import * as Action from './actionTypes';
// import { WorkerChatToDo } from './utils';


// export function* watcherChatUtils() {
//     yield takeEvery(Action.API_ACTIVATE_THREAD_NOTIFICATION, workerAPIActivateThreadNotification);
//     yield takeEvery(Action.API_DISABLE_THREAD_NOTIFICATION, workerAPIDisableThreadNotification);
//     yield takeEvery(Action.UPDATE_THREAD_NOTIFICATION, workerUpdateThreadNotification);
// }


// export function* workerAPIActivateThreadNotification(action) {
//     try {
//         yield call(InteractionManager.runAfterInteractions);
//         let data = action.data;
//         if (data.thread_id) {
//             let { myUserInfo } = yield select(state => state.AuthStoredReducer)
//             let token = yield select(state => state.AuthStoredReducer.token)

            
//             yield call(WorkerChatToDo, {
//                 method: 'POST',
//                 functionName: '/api/activateNotificationInThreadChat',
//                 token: token,
//                 payload: {
//                     data: {
//                         thread_id: data.thread_id
//                     },
//                 }
//             })
//         }
//     } catch (error) {

//     }
// }

// export function* workerAPIDisableThreadNotification(action) {
//     try {
//         yield call(InteractionManager.runAfterInteractions);
//         let data = action.data;
//         if (data.thread_id) {
//             let { myUserInfo } = yield select(state => state.AuthStoredReducer)
//             let token = yield select(state => state.AuthStoredReducer.token)

//             yield call(WorkerChatToDo, {
//                 method: 'POST',
//                 functionName: '/api/disableNotificationInThreadChat',
//                 token: token,
//                 payload: {
//                     data: {
//                         thread_id: data.thread_id
//                     },
//                 }
//             })
//         }
//     } catch (error) {

//     }
// }

// export function* workerUpdateThreadNotification(action) {
//     try {
//         yield call(InteractionManager.runAfterInteractions);
//         yield select(state => state.ChatStoredReducer.threadNotification)
//         switch (action.ttype) {
//             default:
//                 if (action.data) {
//                     Object.assign(threadNotification, action.data);

//                     yield put({
//                         type: Action.UPDATE_THREAD_NOTIFICATION_SUCCESS,
                        
//                         data: threadNotification
//                     })
//                 }
//                 break;
//         }
//     } catch (error) {

//     }
// }