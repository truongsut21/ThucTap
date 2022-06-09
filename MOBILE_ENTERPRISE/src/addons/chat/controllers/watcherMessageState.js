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
// import { workerComputeUnreadMessageCount, workerUpdateUnreadMessageCount } from './watcher';

export function* watcherMessageState() {
    // yield takeEvery(Action.UPDATE_MESSAGE_STATE, workerUpdateMessageState);
}

// export function* workerUpdateMessageState(action) {
//     try {
//         const { messageStates } = action.data
//         yield call(InteractionManager.runAfterInteractions);
//         // const { listMessageStates, simpleMessages } = yield select(state => state.ChatStoredReducer);
//         const lMS = yield select(state => state.ChatStoredReducer.listMessageStates);
//         const sM = yield select(state => state.ChatStoredReducer.simpleMessages);
//         switch (action.ttype) {
//             case 'fetch_init': {
//                 if (!messageStates) break;

//                 yield put({
//                     type: Action.UPDATE_MESSAGE_STATE_SUCCESS,
//                     data: messageStates
//                 })
//                 break;
//             }

//             default: {
//                 if (!messageStates) break;
//                 const cloneLMS = { ...lMS, ...messageStates }
//                 yield put({
//                     type: Action.UPDATE_MESSAGE_STATE_SUCCESS,
//                     data: cloneLMS,
//                 })
//                 break;
//             }



//             // case 'fetchstate':
//             //     if (action.data) {
//             //         listMessageStates = {
//             //             ...listMessageStates,
//             //             ...action.data
//             //         }
//             //         yield put({
//             //             type: Action.UPDATE_MESSAGE_STATE_SUCCESS,
//             //             data: listMessageStates,
//             //         })
//             //     }
//             //     if (!action.donotcompute && Array.isArray(action.thread_ids)) {
//             //         yield spawn(workerComputeUnreadMessageCount, {
//             //             thread_ids: action.thread_ids
//             //         })
//             //     }
//             //     break;
//             // case 'i_read_other_message': {
//             //     const thread_id = `${action.data.thread_id}`;
//             //     if (!simpleMessages[thread_id] || !Array.isArray(action.data.message_ids)) break;
//             //     let msgState = {};
//             //     let newestMessageId = simpleMessages[thread_id][0] ? simpleMessages[thread_id][0]._id : null;
//             //     let noNeedComputeUnreadJustMarkCountZero;
//             //     let message_ids = action.data.message_ids;
//             //     message_ids.forEach(m => {
//             //         msgState[m] = true;
//             //         if (newestMessageId === m) {
//             //             noNeedComputeUnreadJustMarkCountZero = true;
//             //         }
//             //     })
//             //     if (message_ids.length > 0) {
//             //         yield put({
//             //             type: Action.UPDATE_MESSAGE_STATE_SUCCESS,
//             //             data: {
//             //                 ...listMessageStates,
//             //                 ...msgState
//             //             },
//             //         })
//             //     }

//             // if (noNeedComputeUnreadJustMarkCountZero) {
//             //     yield spawn(workerUpdateUnreadMessageCount, {
//             //         ttype: 'markread',
//             //         thread_id: thread_id
//             //     })
//             // } else {
//             //     //compute lại unreadcount nếu người đọc là mình
//             //     //để trong đây là vì phải có message được đọc thì mới tính hehe
//             //     let listUnreadMessages = yield select(state => state.ChatStoredReducer)
//             //     if (listUnreadMessages && listUnreadMessages[thread_id]) {
//             //         yield spawn(workerComputeUnreadMessageCount, {
//             //             thread_ids: [thread_id]
//             //         })
//             //     }
//             // }
//             // break;
//         }
//         // case 'someone_read_my_message': {
//         //     const { message_ids, user_id } = action.data;
//         //     let copyMessageStateOfFewMessages = {}
//         //     message_ids.forEach(id => {
//         //         if (typeof listMessageStates[id] === 'object' && !Array.isArray(listMessageStates[id])) {
//         //             copyMessageStateOfFewMessages[id] = {
//         //                 ...listMessageStates[id],
//         //                 [user_id]: true
//         //             };
//         //         } else {
//         //             copyMessageStateOfFewMessages[id] = { [user_id]: true }
//         //         }
//         //     })
//         //     yield put({
//         //         type: Action.UPDATE_MESSAGE_STATE_SUCCESS,
//         //         data: {
//         //             ...listMessageStates,
//         //             ...copyMessageStateOfFewMessages
//         //         },
//         //     })
//         //     break;
//         // }
//         // case 'specific_message': {
//         //     if (action.data && action.data.message_id && action.data.seenUsers) {
//         //         yield put({
//         //             type: Action.UPDATE_MESSAGE_STATE_SUCCESS,
//         //             data: {
//         //                 ...listMessageStates,
//         //                 [action.data.message_id]: action.data.seenUsers,
//         //             },
//         //         })
//         //     }
//         //     break;
//         // }
//         // default:
//         //     break;
//         // }
//     }
//     catch (error) {
//     }
// }