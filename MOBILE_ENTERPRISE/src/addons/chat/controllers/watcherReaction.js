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
import throwErrorInCatch from '../../base/utils/throwErrorInCatch'

export function* watcherReaction() {
    // yield takeEvery(Action.UPDATE_MESSAGE_REACTION, workerUpdateMessageReaction);
}

// export function* workerUpdateMessageReaction(action) {
//     try {
//         const lMR = yield select(state => state.ChatStoredReducer.listMessageReactions);
//         switch (action.ttype) {
//             case 'fetchInit': {
//                 const { messageReactions } = action.data;

//                 if (!messageReactions) break;
//                 yield put({
//                     type: Action.UPDATE_MESSAGE_REACTION,
//                     data: { ...messageReactions }
//                 })
//             }
//             case "change_reaction_type": {
//                 const { messageReactions } = action.data;
//                 let lMReactions = { ...lMR };
//                 forEach(messageReactions, (data, message_id) => {
//                     if (lMReactions[message_id]) {
//                         lMReactions[message_id] = {
//                             ...lMReactions[message_id],
//                             ...data
//                         }
//                     } else {
//                         lMReactions = {
//                             ...lMReactions,
//                             [message_id]: { ...data }
//                         }
//                     }
//                 })
//                 yield put({
//                     type: Action.UPDATE_MESSAGE_REACTION_SUCCESS,
//                     data: lMReactions
//                 })
//                 break;

//             }
//             default: {
//                 const { messageReactions } = action.data;
//                 let lMReactions = { ...lMR };
//                 forEach(messageReactions, (data, message_id) => {
//                     if (lMReactions[message_id]) {
//                         lMReactions[message_id] = {
//                             ...lMReactions[message_id],
//                             ...data
//                         }
//                     } else {
//                         lMReactions = {
//                             ...lMReactions,
//                             [message_id]: { ...data }
//                         }
//                     }
//                 })
//                 yield put({
//                     type: Action.UPDATE_MESSAGE_REACTION,
//                     data: lMReactions
//                 })
//                 break;
//             }

//         }
//     }
//     catch (error) {
//         throwErrorInCatch(error, "workerUpdateMessageReaction");
//     }
// }