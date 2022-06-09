import {
    put, select, takeEvery,
} from 'redux-saga/effects';
import {
    orderBy, unionBy,
} from 'lodash';
import * as Action from './actionTypes';

export function* watcherThread() {
    yield takeEvery(Action.SOMEONE_CHANGE_THREAD_STUFF, workerSomeoneChangeThreadStuff);
    // yield takeEvery(Action.UPDATE_THREAD_LIST, workerUpdateThreadList);
}

function* workerSomeoneChangeThreadStuff(action) {
    try {
        const fThreads = yield select(state => state.ChatStoredReducer.fullThreads);
        let { simpleThreads, fullThreads } = action.data;
        //Nếu là đào mộ  thì tải nguyên thread đó
        if (!fThreads[simpleThreads[0]._id]) {
            yield put({
                type: Action.API_FETCH_FULL_THREAD_BY_THREAD_ID,
                data: {
                    thread_id: simpleThreads[0]._id
                }
            })
        } else {

            yield put({
                type: Action.UPDATE_THREAD_LIST,
                ttype: action.ttype,
                data: {
                    simpleThreads, fullThreads
                }
            })
        }
    } catch (error) {

        console.log("error", error);
    }
}

// export function* workerUpdateThreadList(action) {
//     try {
//         switch (action.ttype) {
//             case 'fetch_init': {
//                 let { simpleThreads, fullThreads } = action.data
//                 simpleThreads = orderBy(simpleThreads, 'write_date', 'desc');
//                 if (!simpleThreads || !fullThreads) break;
//                 yield put({
//                     type: Action.UPDATE_THREAD_LIST_SUCCESS,
//                     data: {
//                         simpleThreads,
//                         fullThreads
//                     }

//                 })
//             }
//             case 'create_draft_message': {
//                 const { thread_id, write_date } = action.data;
//                 if (!thread_id) break;
//                 const sThreads = yield select(state => state.ChatStoredReducer.simpleThreads);
//                 const fThreads = yield select(state => state.ChatStoredReducer.fullThreads);
//                 let simpleThreads = [...sThreads];
//                 let fullThreads = { ...fThreads };

//                 let i = simpleThreads.findIndex(t => t._id === thread_id);
//                 if (i < 0) break;
//                 simpleThreads[i] = {
//                     ...simpleThreads[i],
//                     write_date: write_date,
//                 }
//                 fullThreads[thread_id] = {
//                     ...fullThreads[thread_id],
//                     write_date: write_date
//                 }
//                 simpleThreads = orderBy(simpleThreads, 'write_date', 'desc');
//                 yield put({
//                     type: Action.UPDATE_THREAD_LIST_SUCCESS,
//                     data: {
//                         simpleThreads,
//                         fullThreads
//                     }
//                 });
//                 break;
//             }
//             case 'receivenewmessage': {
//                 const { thread_id, write_date } = action.data;
//                 const sThreads = yield select(state => state.ChatStoredReducer.simpleThreads);
//                 const fThreads = yield select(state => state.ChatStoredReducer.fullThreads);
//                 let simpleThreads = [...sThreads];
//                 let fullThreads = { ...fThreads };
//                 i = simpleThreads.findIndex(e => e._id === thread_id)
//                 if (i === -1) break;
//                 simpleThreads[i] = { ...simpleThreads[i], write_date }

//                 simpleThreads = orderBy(simpleThreads, 'write_date', 'desc');
//                 fullThreads = {
//                     ...fullThreads,
//                     [thread_id]: {
//                         ...fullThreads[thread_id],
//                         write_date,
//                     }
//                 }
//                 yield put({
//                     type: Action.UPDATE_THREAD_LIST_SUCCESS,
//                     data: {
//                         simpleThreads: simpleThreads,
//                         fullThreads: fullThreads
//                     }
//                 })
//                 break;
//             }
//             case 'new_thread':
//             case 'fetch_by_ids':
//             case 'fetch_latest_thread_list':
//             case 'change_thread_field':
//             case 'change_thread_name':
//             case 'change_avatar':
//             case 'fetch_old': {
//                 const { simpleThreads, fullThreads } = action.data;
//                 if (!simpleThreads) break;
//                 const sT = yield select(state => state.ChatStoredReducer.simpleThreads);
//                 const fT = yield select(state => state.ChatStoredReducer.fullThreads);
//                 let sThreads = [...sT];
//                 let fThreads = { ...fT };
//                 fThreads = {
//                     ...fThreads,
//                     ...fullThreads
//                 }
//                 sThreads = unionBy(simpleThreads, sThreads, '_id');
//                 sThreads = orderBy(sThreads, 'write_date', 'desc');

//                 yield put({
//                     type: Action.UPDATE_THREAD_LIST_SUCCESS,
//                     data: {
//                         simpleThreads: sThreads,
//                         fullThreads: fThreads
//                     }
//                 });
//                 break;
//             }
//             case 'delete_on_local': {
//                 const { _id } = action.data;
//                 if (!thread_id) break;
//                 const sThreads = yield select(state => state.ChatStoredReducer.simpleThreads);
//                 const fThreads = yield select(state => state.ChatStoredReducer.fullThreads);
//                 let simpleThreads = [...sThreads];
//                 let fullThreads = { ...fThreads };
//                 let i = simpleThreads.findIndex(t => t._id === _id);
//                 if (i < 0) break;
//                 simpleThreads.splice(i, 1);
//                 delete fullThreads[_id];
//                 yield put({
//                     type: Action.UPDATE_THREAD_LIST_SUCCESS,
//                     data: {
//                         simpleThreads,
//                         fullThreads
//                     }
//                 });
//                 break;
//             }
//             default: {
//                 break;
//             }
//         }
//     }
//     catch (error) {
//     }
// }