import {
    put, select, takeEvery,
} from 'redux-saga/effects';
import { InteractionManager, Platform } from 'react-native';
import {
    forEach,
} from 'lodash';
import * as Action from './actionTypes';

export function* watcherThreadUser() {
    // yield takeEvery(Action.UPDATE_THREAD_MEMBER, workerUpdateThreadMember);
}

// export function* workerUpdateThreadMember(action) {
//     try {
//         // yield call(InteractionManager.runAfterInteractions);
//         switch (action.ttype) {
//             case 'init': {
//                 const { threadMembers } = action.data;
//                 if (!threadMembers) break;
//                 yield put({
//                     type: Action.UPDATE_THREAD_MEMBER_SUCCESS,
//                     data: threadMembers,
//                 })
//                 break;
//             }
//             default:
//                 const { threadMembers } = action.data;
//                 if (!threadMembers) break;
//                 const tM = yield select((state) => state.ChatStoredReducer.threadMembers);
//                 let tMembers = { ...tM };
//                 forEach(threadMembers, (members, thread_id) => {
//                     if (tMembers[thread_id]) {
//                         tMembers[thread_id] = {
//                             ...tMembers[thread_id],
//                             ...members
//                         }
//                     } else {
//                         tMembers = {
//                             ...tMembers,
//                             [thread_id]: members
//                         }
//                     }
//                 })
//                 yield put({
//                     type: Action.UPDATE_THREAD_MEMBER_SUCCESS,
//                     data: tMembers,
//                 })
//                 break;
//         }
//     }
//     catch (error) {
//     }
// }