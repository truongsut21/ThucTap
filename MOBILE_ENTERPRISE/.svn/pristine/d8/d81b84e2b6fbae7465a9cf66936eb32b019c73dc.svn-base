import {
    call,
    put,
    select,
    takeEvery,
    take,
} from 'redux-saga/effects';
import * as ActionChatType from './actionTypes';
import * as FriendAction from '../../friend/controllers/actionType'
import { WorkerChatToDo } from './utils';
import { WorkerAuthToDo } from '../../auth/controllers/utils';
import throwErrorInCatch from '../../base/utils/throwErrorInCatch';


export function* watcherInit() {
    // yield takeEvery(Action.UPDATE_MESSAGE, workerUpdateMessage);
    yield takeEvery(ActionChatType.API_FETCH_INIT_THREAD, workerAPIFetchInitThread);
    yield takeEvery(ActionChatType.API_FETCH_INIT_FRIEND, workerAPIFetchInitFriend);
    yield takeEvery(ActionChatType.API_FETCH_INIT_MEMBER, workerAPIFetchInitMember);
    // yield takeEvery(ActionChatType.API_FETCH_INIT_CONTACT, workerAPIFetchInitContact);
    // yield takeEvery(ActionChatType.CHAT_WITH_SOMEONE, workerChatWithSomeone);
    // yield takeEvery(ActionChatType.API_CREATE_THREAD_PERSONAL, workerAPICreateThreadPersonal);




    // yield takeEvery(ActionChatType.UPDATE_INIT_MESSAGE, workerUpdateInitMessage);
    // yield takeEvery(ActionChatType.UPDATE_INIT_FRIEND, workerUpdateInitFriend);


    // yield takeLeading(ActionChatType.API_FETCH_INIT_MESSAGE,workerAPIFetchInitMessage)
    // yield takeLeading(ActionChatType.API_FETCH_INIT_REACTIONS,workerAPIFetchInitReactions)





}




// function* workerFetchMessage(action) {
//     let activeUserId = yield select((state) => state.AuthStoredReducer.myUserInfo._id) || '';

//     try {
//         if (!activeUserId) {
//             return true;
//         }
//         let listLastTimeFetch = yield select((state) => state.ChatStoredReducer.listLastTimeFetch);
//         if (listLastTimeFetch[`message`] && listLastTimeFetch[`message`] > 0) {
//             let lastTimeFetchMessage = listLastTimeFetch[`message`];
//             let draftIds = [];
//             let ignoreIds = [];
//             while (true) { // lay sms
//                 let response = yield call(WorkerChatToDo, {
//                     method: 'POST',
//                     functionName: '/api/fetchMessageInTomChat',
//                     token: token,
//                     payload: {
//                         data: {
//                             // domain: [
//                             //     ['write_date', '>=', lastTimeFetch],
//                             //     ['_id', 'not in', ignoreIds]
//                             // ],
//                             lastTimeFetch: lastTimeFetchMessage,
//                             ignore_ids: ignoreIds
//                         },
//                     }
//                 })


//                 const { simpleMessages, fullMessages, } = response;
//                 if (!fullMessages) {
//                     break;
//                 };
//                 if (_.isEmpty(fullMessages)) {
//                     action.dispatch({
//                         type: Action.UPDATE_LAST_TIME_FETCH,
//                         data: {
//                             [`$activeUserId_message`]: lastTimeFetch + 1
//                         }
//                     })
//                     break;
//                 } else {
//                     //Ignore những message khác cho lần fetch tiếp theo
//                     ignoreIds = response.newIgnoreIds;
//                     //Chỉnh lại last time fetch do server trả về
//                     lastTimeFetch = response.newLastTimeFetch ? response.newLastTimeFetch : lastTimeFetch;
//                     //Lấy draft_ids để remove những 
//                     draftIds = without(Object.values(fullMessages).flat().map(m => {
//                         if (m.draft_id) {
//                             return m.draft_id;
//                         }
//                         return false;
//                     }), false);

//                     action.dispatch({
//                         type: Action.UPDATE_MESSAGE,
//                         ttype: 'fetchmessage',
//                         data: fullMessages
//                     })

//                     action.dispatch({
//                         type: Action.UPDATE_LAST_TIME_FETCH,
//                         data: {
//                             [`${activeUserId}_message`]: lastTimeFetch
//                         }
//                     })

//                     action.dispatch({
//                         type: Action.UPDATE_UNFINISHED_SEND_MESSAGE,
//                         ttype: 'remove',
//                         data: {
//                             _ids: draftIds
//                         }
//                     })
//                     //Data trả về nhỏ hơn 120 cũng nghĩa là hết data để fetch
//                     if (draftIds.length < 120) {
//                         break;
//                     }
//                 }
//             }

//             action.dispatch({
//                 type: Action.API_FETCH_MESSAGE_STATE,
//                 ttype: 'fetchnew'
//             })

//             // yield delay(500);//delay ở đây vì không thể delay trong function được gọi tới = spawn
//             let unfinishedMessages = yield select((state) => state.ChatStoredReducer.unfinishedMessages)
//             if (Object.keys(unfinishedMessages).length > 0) {
//                 action.dispatch({
//                     type: Action.UPDATE_UNFINISHED_SEND_MESSAGE,
//                     ttype: 'resend_own_unfinished',
//                     dispatch: action.dispatch
//                 })
//             }

//             // yield delay(3000); //delay ở đây vì không thể delay trong function được gọi tới = spawn
//             action.dispatch({
//                 type: Action.API_FETCH_MESSAGE_REACTION,
//                 ttype: 'fetchnew'
//             })
//         }
//         // yield put({
//         //     type: Action.SET_FETCHING_CHAT_DATA,
//         //     data: {
//         //         user_id: activeUserId,
//         //         type: 'message',
//         //         status: false,
//         //     }
//         // })
//     } catch (error) {
//         // yield put({
//         //     type: Action.SET_FETCHING_CHAT_DATA,
//         //     data: {
//         //         user_id: activeUserId,
//         //         type: 'message',
//         //         status: false,
//         //     }
//         // })
//         throwErrorInCatch(error);
//     }
// }
export function* workerAPIFetchInitThread(action) {
    try {
        let token = yield select(state => state.AuthStoredReducer.token)
        const sThreads = yield select(state => state.ChatStoredReducer.simpleThreads)
        const fThreads = yield select(state => state.ChatStoredReducer.fullThreads)
        let res = yield call(WorkerChatToDo, {
            functionName: '/api/initFetchThreadWhenLogin',
            token: token,
            payload: {
                data: {}
            }
        })
        const {
            simpleThreads, // [{ _id, write_date },...]
            fullThreads, // { <thread_id>: {}, .... }
            pollAnswers,
            simpleMessages, // { <thread_id>: [{ _id, creat_date },...] }
            fullMessages, // { <message_id>: {}, ... }
            messageStates, // { <message_id>: true/false, ... }
            messageReactions, // { <message_id>: { <user_id>: 1 -> 5 }, ... }
            pinMessages,
            lastTime // thoi gian chay init
        } = res;
        if (simpleMessages && Object.keys(simpleMessages).length > 0) {
            yield put({
                type: ActionChatType.UPDATE_MESSAGE,
                ttype: 'fetch_init',
                data: {
                    simpleMessages,
                    fullMessages
                }
            })
        }
        if (pollAnswers && Object.keys(pollAnswers).length > 0) {
            yield put({
                type: ActionChatType.UPDATE_POLL_ANSWER_RESULT,
                ttype: 'fetch',
                data: { pollAnswers }
            })
        }
        if (messageReactions && Object.keys(messageReactions).length > 0) {
            yield put({
                type: ActionChatType.UPDATE_MESSAGE_REACTION,
                ttype: 'fetch_init',
                data: { messageReactions }
            })
        }
        if (messageStates && Object.keys(messageStates).length > 0) {
            yield put({
                type: ActionChatType.UPDATE_MESSAGE_STATE,
                ttype: 'fetch_init',
                data: { messageStates }
            })
        }
        if (pinMessages && Object.values(pinMessages).length > 0) {
            yield put({
                type: ActionChatType.UPDATE_PIN_MESSAGE,
                ttype: 'fetch',
                data: { pinMessages }
            })
        }
        yield put({
            type: ActionChatType.UPDATE_LAST_TIME_FETCH,
            data: {
                thread: lastTime,
                message: lastTime,
                message_state: lastTime,
                message_reaction: lastTime
            }
        })
        yield put({
                type: ActionChatType.UPDATE_THREAD_LIST,
                ttype: 'fetch_init',
                data: {
                    simpleThreads,
                    fullThreads
                }
            })
            // yield spawn(workerUpdateLastTimeFetch, { 
            //     data: { 
            //         thread: lastTime,
            //         message:lastTime,
            //         message_state:lastTime,
            //         message_reaction: lastTime
            //     } 
            // })
    } catch (error) {
        throwErrorInCatch(error, 'workerAPIFetchInitThread')
    }
}




// da dc dua vao fetch init thread
// export function* workerAPIFetchInitMessage(action) {
//     try{
//         while (true) {
//             const {threads_ids} = action.data
//         let token = yield select(state => state.AuthStoredReducer.token)
//         let res = yield call(WorkerChatToDo, {
//             functionName: '/api/initFetchMessageWhenLogin',
//             token: token,
//             payload: {
//                 data: {
//                     thread_ids: threads_ids
//                 }
//             }
//         })
//         const {simpleMessages, fullMessages,messageReactions, lastTime} = res
//         if(!simpleMessages) break;

//             yield put({
//                 type: ActionChatType.UPDATE_MESSAGE,
//                 ttype: 'fetch_init',
//                 data: {
//                     simpleMessages, 
//                     fullMessages
//                 }
//             })


//         yield spawn(workerUpdateLastTimeFetch,{
//             data :{
//                 [`message`] : lastTime
//             }
//         })

//         yield put({
//             type: ActionChatType.UPDATE_MESSAGE_REACTION,
//             data: {
//                 messageReactions
//             }
//         })
//         if(Object.keys(simpleMessages).length < 50) break;
//         }


//     } catch(error) {
//     }
// }



function* workerAPIFetchInitMember(action) {
    try {
        const thread_ids = action.data.threads_ids
        for (let i = 0; i < thread_ids.length; i++) {
            yield put({
                type: ActionChatType.API_FETCH_MEMBER_BY_THREAD_ID,
                ttype: 'init',
                data: {
                    thread_id: thread_ids[i],
                    lastTime: 0,
                    ignore_ids: []
                }
            })
            yield take(ActionChatType.API_FETCH_MEMBER_BY_THREAD_ID_SUCCESS)
        }
        yield put({
            type: ActionChatType.API_FETCH_INIT_MEMBER,
            data: {}
        })
    } catch (error) {}
}


function* workerAPIFetchInitFriend(action) {
    try {
        const { lastTime = 0, ignore_ids = [] } = action.data
        let lTF = lastTime
        let ignoreIds = [...ignore_ids]

        while (true) {
            let token = yield select(state => state.AuthStoredReducer.token)
            let res = yield call(WorkerAuthToDo, {
                functionName: '/api/fetchFriendsAndInvitationsWhenLogin',
                token: token,
                payload: {
                    data: {
                        lastTime: lTF,
                        ignore_ids: ignoreIds
                    }
                }
            })
            const { myFriends, lastTime, ignore_ids } = res
            if (!myFriends) break;
            yield put({
                type: FriendAction.UPDATE_FRIEND_LIST,
                ttype: 'fetchInit',
                data: {
                    myFriends
                }
            })
            lTF = lastTime
            ignoreIds = ignore_ids
            yield put({
                    type: ActionChatType.UPDATE_LAST_TIME_FETCH,
                    data: {
                        [`friend`]: lTF
                    }
                })
                // yield spawn(workerUpdateLastTimeFetch,{
                //     data:{
                //         [`friend`] : lTF
                //     }
                // })
            if (Object.keys(myFriends).length < 500) break;
        }

    } catch (error) {}
}










// function* workerCreateThread(action){
//     try{
//         yield put ({
//             type: ActionChatType.API_CHECK_THREAD
//         })
//     } catch(error) {
//         console.log(error);
//     }
// }

// function* workerChatWithSomeone(action){
//     try{
//         const {_id} = action.data;
//         const fullThreads = yield select(state => state.ChatStoredReducer.fullThreads);
//         let arrayThreads = Object.values(fullThreads);
//         let indexOfThread = arrayThreads.findIndex(t => t.chat_with_user_id === _id);
//         let Thread = ''
//         if (indexOfThread < 0){
//             yield put({
//                 type: ActionChatType.API_CREATE_THREAD_PERSONAL,
//                 data: {
//                     _id 
//                 }
//             })
//             Thread = yield take(ActionChatType.CREATE_THREAD_PERSONAL_SUCCESS)
//         } 
//         yield put({
//             type: ActionChatType.UPDATE_ACTIVE_THREAD,
//             data: indexOfThread < 0 ? Thread._id : arrayThreads[indexOfThread]._id
//         })
//         const {navigation} = action;
//         navigation.navigate('Chatbox')
//     } catch(error) {
//         console.log(error);
//     }

// }


// function* workerAPICreateThreadPersonal(action){
//     try{
//     //    const data = action.data
//     const id = action.data
//         let token = yield select(state => state.AuthStoredReducer.token)
//         let res = yield call(WorkerChatToDo, {
//             functionName: '/api/createNewThreadPersonal',
//             token,
//             payload:{
//                 data:{
//                     other_user_id: id
//                 }
//             }
//         })
//         const data = res.Thread

//        yield put({
//            type: ActionChatType.UPDATE_THREAD_LIST,
//            type: 'new_thread',
//            data
//        })
//        yield put({
//            type: ActionChatType.CREATE_THREAD_PERSONAL_SUCCESS,
//            data
//        })
//     } catch(error) {
//         console.log(error);
//     }


// }