import RNPhoneContact from 'react-native-contacts';
import { PermissionsAndroid, Platform } from 'react-native';
import { differenceInHours } from 'date-fns';
import { WorkerAuthToDo } from '../../auth/controllers/utils';
import * as Action from './actionType';
import * as FriendAction from '../../friend/controllers/actionType'
import * as ChatAction from '../../chat/controllers/actionTypes'
import * as AuthAction from '../../auth/controllers/actionTypes'
import {
    takeLeading, call, put, select, takeEvery,
    all, delay,
} from 'redux-saga/effects';
import throwErrorInCatch from '../../base/utils/throwErrorInCatch';


export function* watcherFriend() {
    yield takeLeading(Action.API_FIND_FRIEND_BY_USER_NAME, workerAPIFindFriendByUserName)
    // yield takeLeading(Action.API_SEND_INVITE, workerAPISendInvite)
    yield takeLeading(Action.API_SEND_REQUEST, workerAPISendRequest);
    yield takeLeading(Action.API_CANCEL_SEND, workerAPICancelSend);
    yield takeLeading(Action.API_DENIED_REQUEST, workerAPIDeniedRequest);
    yield takeLeading(Action.API_ACCEPT_FRIEND, workerAPIAcceptFriend);
    yield takeLeading(Action.API_CANCEL_FRIEND, workerAPICancelFriend);
    yield takeLeading(Action.API_FETCH_FRIEND_AND_INVITATION_BY_LAST_TIME_FETCH, workerAPIFetchFriendAnhInvitationByLastTimeFetch);
    yield takeEvery(Action.API_DOWNLOAD_CONTACT, workerAPIDownloadContact);
    yield takeLeading(Action.DOWNLOAD_MASS_CONTACT, workerDownloadMassContact);

    //for mobile only, dont copy into PC app
    yield takeLeading(Action.GET_NEW_PHONE_CONTACT, workerGetNewPhoneContact);
    yield takeLeading(Action.API_SEND_MASS_PHONE_NUMBER_FOR_SEND_FRIEND_INVITATION, workerAPISendMassPhoneNumberForSendFriendInvitation);
}


function* workerDownloadMassContact(action) {
    try {
        const { ids } = action.data;
        yield put({
            type: Action.API_DOWNLOAD_CONTACT,
            data: {
                ids: ids.length > 200 ? ids.slice(0, 200) : ids, //VÌ BACKEND CHỈ CHO TẢI 200 CONTACT / REQUEST
            }
        })
        yield delay(2000);
    } catch (error) {
        throwErrorInCatch(error, 'workerDownloadMassContact');
    }
}

function* workerAPIDownloadContact(action) {
    const { ids } = action.data
    if (!ids) return true

    try {
        const token = yield select(state => state.AuthStoredReducer.token)
        let res = yield call(WorkerAuthToDo, {
            method: 'POST',
            functionName: '/api/findTomUserByIds',
            token: token,
            payload: {
                data: {
                    _ids: ids,
                }
            }
        })
        const { users, message } = res;
        if (users && users.length > 0) {
            let json = {}
            users.forEach(u => {
                json[u._id] = u;
            })
            yield put({
                type: FriendAction.UPDATE_CONTACT,
                data: { contacts: json },
            })
        }
    } catch (error) {
        throwErrorInCatch(error, 'workerAPIDownloadContact');
    }
}


function* workerAPIFindFriendByUserName(action) {
    try {

        let token = yield select(state => state.AuthStoredReducer.token)

        let res = yield call(WorkerAuthToDo, {
            functionName: '/api/findNewFriend',
            token,
            payload: {
                data: {
                    str: action.data
                }
            }
        })
        if (res.code === 1) {
            yield put({
                type: AuthAction.UPDATE_ERROR,
                data: {
                    error: res.message,
                }
            })
        } else {
            const { relationship, willBeFriends } = res;
            if (relationship) {
                action.setDataBack(relationship)
            } else if (willBeFriends) {
                const { friend_status, name, inviter_id, _id } = willBeFriends[0];
                action.setDataBack(willBeFriends[0]);
            }
        }
    } catch (error) {
        throwErrorInCatch(error, "workerAPIFindFriendByUserName");

    }
}

// function* workerAPISendInvite(action) {
//     try {
//         let token = yield select(state => state.AuthStoredReducer.token)

//         let res = yield call(WorkerAuthToDo, {
//             functionName: '/api/sendInvitation',
//             token,
//             payload: {
//                 data: {
//                     _id: action.data
//                 }
//             }
//         })
//         action.nameButton('thu hoi')
//         if (res.code === 1) {
//             // khi error làm gì????
//         } else {
//             const { willBeFriends } = res;
//             if (willBeFriends) {
//                 const { friend_status, name, inviter_id, _id } = willBeFriends[0];
//                 action.setDataBack(willBeFriends[0]);
//             } else {
//                 // lỗi sao???
//             }
//         }
//     } catch (error) {
//         throwErrorInCatch(error, "workerAPISendInvite")
//     }
// }

function* workerAPISendRequest(action) {
    try {
        let token = yield select(state => state.AuthStoredReducer.token)
        let res = yield call(WorkerAuthToDo, {
            functionName: '/api/sendInvitation',
            token,
            payload: {
                data: {
                    _id: action.data
                }
            }
        })
        if (res) {
            // action.setText('Đã gửi lời mời kết bạn')

        }


    } catch (error) {
        throwErrorInCatch(error, "workerAPISendRequest");

    }
}

function* workerAPICancelSend(action) {
    try {


        let token = yield select(state => state.AuthStoredReducer.token)
        let res = yield call(WorkerAuthToDo, {
            functionName: '/api/cancelMyInvitation',
            token,
            payload: {
                data: {
                    _id: action.data
                }
            }
        })
    } catch (error) {
        throwErrorInCatch(error, "workerAPICancelSend");

    }
}


function* workerAPIDeniedRequest(action) {
    try {
        let token = yield select(state => state.AuthStoredReducer.token)
        let res = yield call(WorkerAuthToDo, {
            functionName: '/api/discardSomeoneInvitation',
            token,
            payload: {
                data: {
                    _id: action.data
                }
            }
        })
    } catch (error) {
        throwErrorInCatch(error, "workerAPIDeniedRequest");

    }
}


function* workerAPIAcceptFriend(action) {
    try {
        // console.log('da workerAPICancelSend saga');

        let token = yield select(state => state.AuthStoredReducer.token)
        let res = yield call(WorkerAuthToDo, {
            functionName: '/api/confirmSomeoneInvitation',
            token,
            payload: {
                data: {
                    _id: action.data
                }
            }
        })
    } catch (error) {
    }
}


function* workerAPICancelFriend(action) {
    try {
        let token = yield select(state => state.AuthStoredReducer.token)
        let res = yield call(WorkerAuthToDo, {
            functionName: '/api/unFriend',
            token,
            payload: {
                data: {
                    friend_id: action.data
                }
            }
        })
    } catch (error) {
        throwErrorInCatch(error, "workerAPICancelFriend")
    }
}


export function* workerAPIFetchFriendAnhInvitationByLastTimeFetch(action) {
    const token = yield select(state => state.AuthStoredReducer.token)
    const lTF = yield select(state => state.ChatStoredReducer.listLastTimeFetch)
    let lTFF = Number(action.lastTime || lTF[`friend`] || 0)
    let ignoreId = [];
    try {
        while (true) {
            let res = yield call(WorkerAuthToDo, {
                token,
                functionName: '/api/fetchFriendsAndInvitationsByLTF',
                payload: {
                    data: {
                        lastTime: lTFF,
                        ignore_ids: ignoreId
                    }
                }

            })
            const { myFriends, lastTime, ignore_ids } = res;
            lTFF = Number(lastTime)
            ignoreId = ignore_ids
            if (!myFriends) break;
            if (Object.keys(myFriends).length > 0) {
                yield put({
                    type: Action.UPDATE_FRIEND_LIST,
                    data: myFriends
                })
                yield put({
                    type: ChatAction.UPDATE_LAST_TIME_FETCH,
                    data: {
                        [`friend`]: Object.keys(myFriends).length < 500 ? lTFF + 1 : lTFF
                    }
                })
            }

            if (Object.keys(myFriends).length < 500) break;
        }
        //delay để ko bị phóng 2 lần, 1 lần khi foreground, 1 lần khi socket.on('connect')
        yield delay(2000);
    } catch (error) {
        console.log('errror11', error);
    }
}








// import { WorkerAuthToDo } from '../../auth/controllers/utils';

// export function* watcherContact() {
//     yield takeEvery(Action.API_ACCEPT_FRIEND, workerApiAcceptFriend);
//     // Search Friend
//     yield takeLeading(Action.API_FIND_FRIEND, workerAPIFindFriend);
//     yield takeLeading(Action.API_SEND_INVITE, workerAPISendInvite);

// }

// // Search Friend
// function* workerAPIFindFriend(action) {
//     try {
//         const token = yield select(state => state.AuthStoredReducer.token);
//         let { userFind } = action.data
//         let res = yield call(WorkerAuthToDo, {
//             functionName: '/api/findNewFriend',
//             token,
//             payload: {
//                 data: {
//                     str: userFind,
//                 },
//             },
//         })
//         if (res.code === 1) {
//             action.setShowMessage(res.message)
//             yield delay(2000)
//             action.setShowMessage("")
//         } else {
//             if (res.willBeFriends) {
//                 action.setResultFindFriend(res.willBeFriends[0])
//             } else if (res.relationship) {
//                 action.setResultFindFriend(res.relationship)
//             }
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// //sen loi moi
// function* workerAPISendInvite(action) {
//     try {
//         const token = yield select(state => state.AuthStoredReducer.token);
//         const { data } = action
//         let res = yield call(WorkerAuthToDo, {
//             functionName: '/api/sendInvitation',
//             token,
//             payload: {
//                 data: {
//                     _id: data,
//                 },
//             },
//         })
//         action.setText('thu hoi')
//         // action.setButton(false)
//     } catch (error) {
//         console.log(error);
//     }
// }

// //

// function* workerAPIAcceptFriend(action) {
//     try {
//         let { _id, } = action.data
//         console.log(_id,);

//         let token = yield select(state => state.AuthStoredReducer.token)

//         let res = yield call(workerDoTomAuth, {
//             token,
//             functionName: '/api/confirmSomeoneInvitation',
//             payload: {
//                 data: {
//                     _id: _id,
//                 },
//             },
//         })

//         // action.setAccept('Huỷ kết bạn')

//         // const { statusCode, statusMessage, relationship } = res
//         // action.setDataRes(relationship)

//     } catch (error) {
//         console.log('daylaloi', error);
//     }
// }

function _handlePhoneContactReadPermission(action) {
    if (Platform.OS === 'android') {
        return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then(res => {
            if (res) throw true;
            return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
        }).then(res => {
            if (res === "granted") return true;
            return false;
        }).catch(error => {
            if (typeof error === 'boolean') {
                return error;
            }
            return false;
        })
    }
    else {
        return true;
    }
}

function* workerGetNewPhoneContact(action) {
    try {
        const { dispatch } = action;
        const lT = yield select(state => state.ChatStoredReducer.listLastTimeFetch);
        let lastTimeScanPhoneContact = lT[`scanphonecontact`] || 0;
        if (!lastTimeScanPhoneContact || lastTimeScanPhoneContact === 0 ||
            differenceInHours(new Date().getTime(), new Date(lastTimeScanPhoneContact).getTime()) >= 2) {

            let res = yield call(_handlePhoneContactReadPermission, {});
            if (!res) {
                return true;
            }
            const uPC = yield select(state => state.FriendStoredReducer.unProceedPhoneContacts || {});
            const pPC = yield select(state => state.FriendStoredReducer.proceededPhoneContacts || {});
            let unProceedPhoneContacts = {}
            RNPhoneContact.getAllWithoutPhotos().then(datas => {
                datas.forEach(d => {
                    if (!uPC[d.recordID] && !pPC[d.recordID] && d.phoneNumbers && d.phoneNumbers.length > 0) {
                        unProceedPhoneContacts[d.recordID] = {
                            _id: d.recordID,
                            phones: d.phoneNumbers.map(n => {
                                return n.number
                                    .replaceAll('+', '')
                                    .replaceAll('-', '')
                                    .replaceAll(' ', '')
                                    .replaceAll('(', '')
                                    .replaceAll(')', '')
                            })
                        }
                    }
                })
                if (Object.keys(unProceedPhoneContacts).length > 0) {
                    dispatch({
                        type: Action.UPDATE_UNPROCEED_PHONE_CONTACT,
                        data: { unProceedPhoneContacts }
                    });
                }
                dispatch({
                    type: ChatAction.UPDATE_LAST_TIME_FETCH,
                    data: {
                        [`scanphonecontact`]: new Date().getTime()
                    }
                });
            }).then(res => {
                setTimeout(() => {
                    dispatch({
                        type: Action.API_SEND_MASS_PHONE_NUMBER_FOR_SEND_FRIEND_INVITATION,
                        dispatch: dispatch
                    });
                }, 1000);
            }).catch(error => {
            })
        }
    } catch (error) {
        throwErrorInCatch(error, 'workerGetNewPhoneContact');
    }
}

function* workerAPISendMassPhoneNumberForSendFriendInvitation(action) {
    try {
        const token = yield select(state => state.AuthStoredReducer.token);
        const uPC = yield select(state => state.FriendStoredReducer.unProceedPhoneContacts || {});
        let contacts = Object.values(uPC);
        if (!contacts || contacts.length < 1) {
            return true;
        }
        let phones = [], proceededPhoneContacts = {};
        for (let i = 0; i < contacts.length; i++) {
            if (phones.length + contacts[i].phones.length > 200) {
                break;
            }
            phones = phones.concat(contacts[i].phones)
            proceededPhoneContacts = {
                ...proceededPhoneContacts,
                [contacts[i]._id]: {
                    ...contacts[i]
                }
            }
        }
        phones = phones.flat();
        if (!phones || phones.length < 1) return true;

        let response = yield call(WorkerAuthToDo, {
            token,
            functionName: '/api/checkMassPhoneForFriendInvitation',
            payload: {
                data: {
                    phones: phones
                }
            }
        })
        const { foundUserIds } = response;
        if (foundUserIds) {
            yield all([
                put({
                    type: Action.UPDATE_UNPROCEED_PHONE_CONTACT,
                    ttype: 'delete',
                    data: { _ids: Object.keys(proceededPhoneContacts) }
                }),
                put({
                    type: Action.UPDATE_PROCEEDED_PHONE_CONTACT,
                    data: { proceededPhoneContacts }
                })
            ])
        }
    } catch (error) {
        throwErrorInCatch(error, 'workerAPISendMassPhoneNumberForSendFriendInvitation')
    }
}