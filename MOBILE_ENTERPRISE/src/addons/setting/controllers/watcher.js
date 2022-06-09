import { select, take, takeLeading, call, put, all, delay, takeLatest } from 'redux-saga/effects'
import { encryptPayload } from '../../../config/utilities';
import axios from 'axios';
import { config } from '../../../config';
import { cloneDeep } from 'lodash';
import * as ActionChat from '../../chat/controllers/actionTypes';
import * as ActionAuth from '../../auth/controllers/actionTypes';
import * as ActionUser from '../controllers/actionTypes';
import throwErrorInCatch from '../../base/utils/throwErrorInCatch';
import { WorkerAuthToDo } from '../../auth/controllers/utils';
import { socket } from '../../../config/socket';
import * as BaseAction from '../../base/controllers/actionTypes';

var RNFS = require('react-native-fs');

export function* watcherSetting() {
    // đổi mật khẩu
    yield takeLatest(ActionAuth.API_CHANGE_PASSWORD, workerAPIChangePassword);
    yield takeLeading(ActionUser.API_UPDATE_MY_USER_NEW_NAME, workerAPIUpdateMyUserNewName);

}

//Đổi mật khẩu
function* workerAPIChangePassword(action) {

    try {
        const { newPassword, password, reNewPassword } = action.data
        const token = yield select(state => state.AuthStoredReducer.token)
        const myUserInfo = yield select(state => state.AuthStoredReducer.myUserInfo)
        let response = yield call(WorkerAuthToDo, {
            functionName: '/api/actionChangePassword',
            token: token,
            payload: {
                data: {
                    password: password,
                    newPassword: newPassword,
                    reNewPassword: reNewPassword
                }
            }
        })
        let { changePasswordOk } = response;
        let { code, message } = response;
        if (code === 1) {
            yield put({
                type: ActionAuth.UPDATE_ERROR,
                data: {
                    error: message,
                },
            })
        }
        if (changePasswordOk === true) {
            yield put({
                type: ActionAuth.UPDATE_ERROR,
                data: {
                    error: 'Đổi mật khẩu thành công. Đăng nhập lại để tiếp tục !!!',
                },
            })
            yield delay(1000)
            const token = yield select(state => state.AuthStoredReducer.token);
            socket.emit('leave_my_own_room', { token });
            socket.emit('delete_device_token', { token });
            yield delay(1000);
            let response = yield call(WorkerAuthToDo, {
                functionName: '/api/logout',
                token: token,
                payload: {
                    data: {}
                }
            })
            yield put({
                    type: BaseAction.CLEAR_ALL_DATA
                })
                // action.setLogOut(true)
        }

    } catch (error) {
        console.log('day la loi tại đổi mật khẩu---', error);
        throwErrorInCatch(error, "workerAPIUpdateMyUserNewName");
    }
}

export function WorkerDoAPIEncrypted(action) {
    let payload = action.data ? { data: action.data } : {};
    return Promise.all([encryptPayload(payload)]).then(([encodePayload]) => {
        return axios({
            method: 'POST',
            url: `${config.auth_url}${action.functionName}`,
            headers: { Authorization: `Tomaho ${action.token}`, },
            data: { payload: encodePayload }
        })
    }).then(response => {
        if (response.data.data && response.data.statusCode === 0) {
            return response.data.data;
        } else {
            return {
                code: response.data.statusCode,
                message: response.data.statusMessage,
            }
        }
    }).catch(error => {
        return {
            code: 1,
            message: error ? error.toString() : ''
        }
    })
}


function* workerAPIUpdateMyUserNewName(action) {
    try {
        const token = yield select(state => state.AuthStoredReducer.token)
        const myUserInfo = yield select(state => state.AuthStoredReducer.myUserInfo)
        let { newName } = action.data;
        let response = yield call(WorkerDoAPIEncrypted, {
            functionName: '/api/updateMyTomAccount',
            token: token,
            data: {
                name: newName,
            }
        })
        let { myTomAccount } = response
        if (myTomAccount) {
            let { name } = myTomAccount;
            yield put({
                type: ActionAuth.UPDATE_USER_INFO_SUCCSESS,
                data: {
                    ...myUserInfo,
                    name,
                },
            })
            action.setShowModal(false)

            yield put({
                type: ActionAuth.UPDATE_ERROR,
                data: {
                    error: "Đổi tên thành công",
                }
            })
        } else {
            action.setShowModal(false)
            yield put({
                type: ActionAuth.UPDATE_ERROR,
                data: {
                    error: "Lỗi không đổi tên thành công",
                }
            })
        }


    } catch (error) {
        throwErrorInCatch(error, "workerAPIUpdateMyUserNewName");
    }
}