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


export function* watcherStateReaction() {
    yield takeEvery(Action.UPDATE_ANIMATE_MESSAGE_REACTION, workerUpdateAnimateMessageReaction);
}



export function* workerUpdateAnimateMessageReaction(action) {
    try {
        switch (action.ttype) {
            case 'fetchInit': {
                const { listMessagesReaction } = action.data
                if (!listMessagesReaction) break;
                yield put({
                    type: Action.UPDATE_ANIMATE_MESSAGE_REACTION_SUCCESS,
                    data: messagesReaction,
                })
                break;
            }
            default:
                const { listMessagesReaction } = action.data
                if (!listMessagesReaction) break;
                const mR = yield select(state => state.ChatStoredReducer.listMessagesReaction)
                let lMR = { ...mR }
                forEach(listMessagesReaction, (reactions, message_id) => {
                    if (lMR[message_id]) {
                        lMR[message_id] = {
                            ...lMR[message_id],
                            ...reactions
                        }
                    } else {
                        lMR = {
                            ...lMR,
                            [message_id]: reactions
                        }
                    }
                })
                yield put({
                    type: Action.UPDATE_ANIMATE_MESSAGE_REACTION_SUCCESS,
                    data: lMR
                })
                break;
        }
    } catch (error) {
    }
}




//     try {
//         let willAnimateReaction = yield select(state => state.ChatUnstoredReducer.willAnimateReaction);
//         if (!willAnimateReaction) {
//             willAnimateReaction = {}
//         }
//         switch (action.ttype) {
//             case 'add': {
//                 if (action.data.message_id && action.data.thread_id && action.data.reaction_type) {
//                     willAnimateReaction[action.data.message_id] = action.data.reaction_type;
//                     yield put({
//                         type: Action.UPDATE_ANIMATE_MESSAGE_REACTION_SUCCESS,
//                         data: willAnimateReaction
//                     })
//                 }
//                 break;
//             }
//             case 'remove': {
//                 if (action.data.message_id) {
//                     delete willAnimateReaction[`${action.data.message_id}`];
//                     yield put({
//                         type: Action.UPDATE_ANIMATE_MESSAGE_REACTION_SUCCESS,
//                         data: willAnimateReaction
//                     })
//                 }
//                 break;
//             }
//             default:
//                 break;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const workerUpdateMessageState = workerUpdateMessageState;