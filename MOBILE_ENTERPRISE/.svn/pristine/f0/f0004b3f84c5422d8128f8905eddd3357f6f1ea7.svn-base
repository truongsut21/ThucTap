import instance from "@react-native-firebase/iid";
import axios from "axios";
import { cloneDeep } from "lodash";
import {
    call,
    delay,
    put,
    select,
    take,
    takeEvery,
    takeLeading,
} from "redux-saga/effects";
import { config } from "../../../config";
import { socket } from "../../../config/socket";
import { encryptPayload, extractDataByUserId } from "../../../config/utilities";
import * as Action from "../../chat/controllers/actionTypes";
import * as AuthAction from "./actionTypes";
import * as FriendAction from "../../friend/controllers/actionType";
import * as BaseAction from "../../base/controllers/actionTypes";
import { WorkerAuthToDo } from "./utils";
import throwErrorInCatch from "../../base/utils/throwErrorInCatch";

export function* watcherAuth() {
    // đầu tiên đăng nhập user, password
    yield takeLeading(AuthAction.API_SIGN_IN, workerAPISignIn);
    yield takeLeading(AuthAction.API_SIGN_IN_NEW, workerAPISignInNew);
    yield takeLeading(AuthAction.API_SIGN_UP, workerAPISignUp);
    yield takeLeading(AuthAction.API_SIGN_UP_NEW, workerAPISignUpNew);
    //gửi lại mã
    yield takeLeading(AuthAction.API_RESEND_CODE, workerAPIResendCode);

    yield takeLeading(
        AuthAction.API_SEND_SECURITY_CODE_FOR_SIGN_UP,
        workerAPISendSecurityCodeForSignUp
    );

    // xac nhan ma~ code gửi về
    yield takeLeading(
        AuthAction.API_SEND_SECURITY_CODE_FOR_LOGIN,
        workerAPISendSecurityCodeForLogin
    );
    yield takeLeading(
        AuthAction.API_SEND_SECURITY_CODE_FOR_LOGIN_NEW,
        workerAPISendSecurityCodeForLoginNew
    );
    yield takeLeading(
        AuthAction.API_SEND_SECURITY_CODE_FOR_SIGNUP_NEW,
        workerAPISendSecurityCodeForSignUpNew
    );

    // get infor của user
    yield takeLeading(AuthAction.API_GET_MY_USER_INFO, workerAPIGetMyUserInfo);

    // yield takeEvery('PREPARE_APP', workerPrepareApp);
    yield takeLeading(AuthAction.API_SIGN_OUT, workerAPISignOut);
    // HAO

    //HAO
    //
    yield takeLeading(
        AuthAction.API_FETCH_INIT_LANDING,
        workerAPIFetchInitLading
    );

    //3
    yield takeLeading(AuthAction.API_RESET_PASSWORD, workerResetPassword);
    //1
    yield takeLeading(
        AuthAction.API_RESET_REQUEST_PASSWORD_SUCCESS,
        workerAPIResetRequestPassworkSuccess
    );
    //2
    yield takeLeading(
        AuthAction.API_SEND_SECURITY_CODE_FORFINALIZER_FORGET,
        workerAPISendSecurityCodeForFinalizeForget
    );

    /// tai du lieu khi dang loading >> landing
}

function* workerAPIFetchInitLading(action) {
    try {
        action.setText("Đang nạp hội thoại");
        yield put({
            type: Action.API_FETCH_INIT_THREAD,
        });
        const res = yield take(Action.UPDATE_THREAD_LIST);
        const { data } = res;
        const { simpleThreads } = data;
        if (!data) return true;
        yield delay(2000);
        action.setText("Đang nạp danh sách thành viên");
        if (simpleThreads.length > 0) {
            yield put({
                type: Action.API_FETCH_INIT_MEMBER,
                data: { threads_ids: simpleThreads.map((e) => e._id) },
            });
            const dataM = yield take(Action.API_FETCH_INIT_MEMBER);
            if (!dataM) return true;
        }
        yield delay(2000);
        action.setText("Đang nạp danh sách bạn bè");
        yield put({
            type: Action.API_FETCH_INIT_FRIEND,
            data: {},
        });
        const dataF = yield take(FriendAction.UPDATE_FRIEND_LIST);
        if (!dataF) return true;
        // yield delay(2000)

        // yield put({
        //     type: Action.API_FETCH_INIT_THREAD_POLL_ANSWER
        // })
        // yield take(Action.UPDATE_MESSAGE_POLL_ANSWER)
        yield delay(2000);
        action.setText("Đang hoàn tất nạp thông tin");
        yield put({
            type: "UPDATE_LANDING_USER_SUCCSESS",
            data: true,
        });
    } catch (error) {
        throwErrorInCatch(error, "workerAPIFetchInitLading");
    }
}

function* workerResetPassword(action) {
    //action.username
    const { newPassword, userID, code } = action.data;
    try {
        let response = yield call(WorkerDoAPI, {
            functionName: "/api/completeResetPasswordByChangePassword",
            data: {
                user_id: userID,
                code: code,
                password: newPassword,
            },
        });
        if (response.statusCode === 0) {
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION,
                data: "Đổi mật khẩu thành công!!!",
            });
            action.navigation.navigate("Auth");
        } else {
            yield put({
                type: AuthAction.UPDATE_ERROR,
                data: {
                    error: response.statusMessage,
                },
            });
        }
    } catch (error) {
        throwErrorInCatch(error, "workerResetPassword");
        yield put({
            type: AuthAction.UPDATE_ERROR,
            data: {
                error: "Đổi mật khẩu thất bại!!!",
            },
        });
    }
}

function* workerAPIResetRequestPassworkSuccess(action) {
    const data = action.data;
    try {
        let res = yield call(WorkerDoAPI, {
            data: {
                username: data.UserName,
            },
            functionName: "/api/actionRequestResetPassword",
        });

        if (res.statusCode === 0) {
            action.setShowNewStepSecurity(true);
            action.setUserID(res.data.user_id);
        } else {
            yield put({
                type: AuthAction.UPDATE_ERROR_SUCCESS,
                data: {
                    error: res.statusMessage,
                },
            });
            yield delay(2000);
            yield put({
                type: AuthAction.CLEAR_ERROR_SUCCESS,
            });
        }
    } catch (error) {
        throwErrorInCatch(error, "workerAPIResetRequestPassworkSuccess");
        yield put({
            type: AuthAction.UPDATE_ERROR_SUCCESS,
            data: {
                error: "Tìm tên đăng nhập thất bại",
            },
        });
        yield delay(2000);
        yield put({
            type: AuthAction.CLEAR_ERROR_SUCCESS,
        });
    }
}

function* workerAPISendSecurityCodeForFinalizeForget(action) {
        const { userID, securityCode } = action.data;

        try {
            let response = yield call(WorkerDoAPI, {
                functionName: "/api/verifyAllowResetPassword",
                data: {
                    user_id: userID,
                    code: securityCode,
                },
            });
            if (response.statusCode === 0) {
                action.setShowLoadingSecurity(false);
                action.setShowNewStepSecurity(false);
                action.setShownewPassword(true);
            }

            const { statusCode, statusMessage, data } = response;
            if (statusCode === 1) {
                yield put({
                    type: AuthAction.UPDATE_ERROR_SUCCESS,
                    data: {
                        error: statusMessage,
                    },
                });
                action.setShowLoadingSecurity(false);
                action.setShowNewStepSecurity(false);
                yield delay(2000);
                yield put({
                    type: AuthAction.CLEAR_ERROR_SUCCESS,
                });
            } else {
                const { allow } = data;
                if (allow) {
                    action.setShowLoadingSecurity(false);
                }
            }
        } catch (error) {
            throwErrorInCatch(error, "workerAPISendSecurityCodeForFinalizeForget");
            action.setShowLoadingSecurity(false);
            yield put({
                type: AuthAction.UPDATE_ERROR_SUCCESS,
                data: {
                    error: "Lấy lại mật khẩu thất bại",
                },
            });
            yield delay(2000);
            yield put({
                type: AuthAction.CLEAR_ERROR_SUCCESS,
            });
        }
    }
    /// lay api
export function WorkerDoAPI(action) {
    return axios({
            method: "POST",
            url: `${config.auth_url}${action.functionName}`,
            data: {
                payload: action.data,
            },
        })
        .then((result) => {
            if (result.data) {
                return result.data;
            } else {
                return { statusCode: 1, statusMessage: "Unknown error", data: "" };
            }
        })
        .catch((error) => {
            return {
                statusCode: 1,
                statusMessage: "Không thể kết nối đến máy chủ",
                data: "",
            };
        });
}
// gui yeu cau khi co token
export function WorkerDoAPIEncrypted(action) {
    let payload = action.data ? { data: action.data } : {};
    return Promise.all([encryptPayload(payload)])
        .then(([encodePayload]) => {
            return axios({
                method: "POST",
                url: `${config.auth_url}${action.functionName}`,
                headers: { Authorization: `Tomaho ${action.token}` },
                data: { payload: encodePayload },
            });
        })
        .then((response) => {
            if (response.data.data && response.data.statusCode === 0) {
                return response.data.data;
            } else {
                return {
                    code: response.data.statusCode,
                    message: response.data.statusMessage,
                };
            }
        })
        .catch((error) => {
            return {
                code: 1,
                message: error ? error.toString() : "",
            };
        });
}
async function getToken() {
    return await instance().getToken();
}

//đăng kí
function* workerAPISignUp(action) {
    let { email, password, fullname } = action.data;
    try {
        let res = yield call(WorkerDoAPI, {
            data: {
                username: email,
                password: password,
                name: fullname,
            },
            functionName: "/api/actionRegister",
        });
        let { statusCode, statusMessage, data } = res;
        if (statusCode === 0) {
            action.setIsLoading(false);
            if (data) {
                action.setUserID(data.user_id);
                action.setShowModalConfirm(true);
            } else {
                yield put({
                    type: AuthAction.UPDATE_ERROR,
                    data: {
                        error: "Lỗi không xác định",
                    },
                });
            }
        } else if (statusCode === 1) {
            action.setIsLoading(false);
            yield put({
                type: AuthAction.UPDATE_ERROR,
                data: {
                    error: statusMessage,
                },
            });
        }
        // if (res.statusCode === 0) {
        //     action.setUserID(res.data.user_id);
        //     action.setShowNewStepSecurity(true);
        // }
        // else if (res.statusCode === 1) {
        //     action.setIsLoading(false)
        //     yield put({
        //        type: AuthAction.UPDATE_ERROR_SUCCESS,
        //         data: {
        //             error: res.statusMessage,
        //         }
        //     })
        //     yield delay(2000)
        //     yield put({
        //         type: AuthAction.CLEAR_ERROR_SUCCESS,
        //     })
        // }
    } catch (error) {
        throwErrorInCatch(error, "workerSendDraftMessage");
        action.setIsLoading(false);
        yield put({
            type: AuthAction.UPDATE_ERROR,
            data: {
                error: "Đăng kí thất bại",
            },
        });
    }
}

//đăng kí mới
function* workerAPISignUpNew(action) {
        let { email, password, name, mobile } = action.data;
        try {
            let res = yield call(WorkerDoAPI, {
                data: {
                    username: email,
                    password: password,
                    mobile: mobile,
                    name: name,
                    email: email,
                },
                functionName: "/api/rapidRegister",
            });
            let { statusCode, statusMessage, data } = res;
            if (statusCode === 0) {
                action.setLoadingSignIn(false);
                if (data) {
                    action.setUserID(data.user_id);
                    action.navigation.navigate("SignUpStep2", {
                        user_id: res.data.user_id,
                        username: action.data.username,
                        password: action.data.password,
                        name: action.data.name,
                    });
                    // action.setShowModalConfirm(true);
                } else {
                    yield put({
                        type: AuthAction.UPDATE_ERROR,
                        data: {
                            error: "Lỗi không xác định",
                        },
                    });
                }
            } else if (statusCode === 1) {
                action.setLoadingSignIn(false);
                yield put({
                    type: AuthAction.UPDATE_ERROR,
                    data: {
                        error: statusMessage,
                    },
                });
            }
        } catch (error) {
            throwErrorInCatch(error, "workerSendDraftMessage");
            action.setLoadingSignIn(false);
            yield put({
                type: AuthAction.UPDATE_ERROR,
                data: {
                    error: "Đăng kí thất bại",
                },
            });
        }
    }
    /// buoc 1 dang nhap
function* workerAPISignIn(action) {
    try {
        yield put({
            type: BaseAction.CLEAR_ALL_DATA,
        });
        let res = yield call(WorkerDoAPI, {
            data: action.data,
            functionName: "/api/actionLogin",
        });
        if (res.statusCode === 0) {
            action.setUserID(res.data.user_id);
            action.setShowNewStepSecurity(true);
        } else if (res.statusCode === 1) {
            action.setLoadingSignIn(false);
            yield put({
                type: AuthAction.UPDATE_ERROR_SUCCESS,
                data: {
                    error: res.statusMessage,
                },
            });
            yield delay(2000);
            yield put({
                type: AuthAction.CLEAR_ERROR_SUCCESS,
            });
        } else {}
    } catch (error) {
        throwErrorInCatch(error, "workerSendDraftMessage");
        action.setLoadingSignIn(false);
        yield put({
            type: AuthAction.UPDATE_ERROR_SUCCESS,
            data: {
                error: "Đăng nhập thất bại",
            },
        });
        yield delay(2000);
        yield put({
            type: AuthAction.CLEAR_ERROR_SUCCESS,
        });
    }
}

function* workerAPISignInNew(action) {
    try {
        yield put({
            type: BaseAction.CLEAR_ALL_DATA,
        });
        let res = yield call(WorkerDoAPI, {
            data: action.data,
            functionName: "/api/rapidLogin",
        });
        if (res.statusCode === 0) {
            if (res.data && res.data.user_id) {
                action.setUserID(res.data.user_id);
                action.navigation.navigate("SignInStep2", {
                    user_id: res.data.user_id,
                    username: action.data.username,
                });
                action.setLoadingSignIn(false)
            } else if (res.data.needToRegister) {
                action.setIsSignUp(true);
                yield put({
                    type: AuthAction.UPDATE_ERROR_SUCCESS,
                    data: {
                        error: "Email này chưa đươc đăng ký",
                    },
                });
                yield delay(2000);
                yield put({
                    type: AuthAction.CLEAR_ERROR_SUCCESS,
                });
                action.setLoadingSignIn(false)
            }
            // action.setShowNewStepSecurity(true);
        } else if (res.statusCode === 1) {
            yield put({
                type: AuthAction.UPDATE_ERROR_SUCCESS,
                data: {
                    error: res.statusMessage,
                },
            });
            yield delay(2000);
            yield put({
                type: AuthAction.CLEAR_ERROR_SUCCESS,
            });
            action.setLoadingSignIn(false)
        } else {}
    } catch (error) {
        throwErrorInCatch(error, "workerSendDraftMessage");
        // action.setLoadingSignIn(false)
        yield put({
            type: AuthAction.UPDATE_ERROR_SUCCESS,
            data: {
                error: "Đăng nhập thất bại",
            },
        });
        yield delay(2000);
        yield put({
            type: AuthAction.CLEAR_ERROR_SUCCESS,
        });
    }
}

//gửi lại mã
function* workerAPIResendCode(action) {
    try {
        yield put({
            type: BaseAction.CLEAR_ALL_DATA,
        });
        let res = yield call(WorkerDoAPI, {
            data: action.data,
            functionName: "/api/rapidLogin",
        });
        if (res.statusCode === 0) {
            yield put({
                type: AuthAction.UPDATE_ERROR_SUCCESS,
                data: {
                    error: "Đã gửi lại mã xác thực",
                },
            });
            yield delay(2000);
            yield put({
                type: AuthAction.CLEAR_ERROR_SUCCESS,
            });
            // action.navigation.navigate('SignInStep2', { user_id: res.data.user_id, username: action.data.username })
            // action.setShowNewStepSecurity(true);
        } else if (res.statusCode === 1) {
            // action.setLoadingSignIn(false)
            yield put({
                type: AuthAction.UPDATE_ERROR_SUCCESS,
                data: {
                    error: res.statusMessage,
                },
            });
            yield delay(2000);
            yield put({
                type: AuthAction.CLEAR_ERROR_SUCCESS,
            });
        } else {}
    } catch (error) {
        throwErrorInCatch(error, "workerSendDraftMessage");
        // action.setLoadingSignIn(false)
        yield put({
            type: AuthAction.UPDATE_ERROR_SUCCESS,
            data: {
                error: "Gửi mã thất bại",
            },
        });
        yield delay(2000);
        yield put({
            type: AuthAction.CLEAR_ERROR_SUCCESS,
        });
    }
}

function* workerAPISendSecurityCodeForSignUp(action) {
    let { userId, securityCode } = action.data;
    try {
        let response = yield call(WorkerDoAPI, {
            functionName: "/api/finalizeRegisterWithVerificationCode",
            data: {
                user_id: userId,
                code: securityCode,
            },
        });

        if (response.statusCode === 0) {
            // action.setShowLoadingSecurity(false);
            action.setShowModalConfirm(false);
            action.setShowPromt(false);
            yield put({
                type: AuthAction.UPDATE_ERROR_SUCCESS,
                data: {
                    error: "Đăng kí thành công",
                },
            });
            yield delay(2000);
            yield put({
                type: AuthAction.CLEAR_ERROR_SUCCESS,
            });
            action.navigation.navigate("Auth");
        } else {
            // action.setShowLoadingSecurity(false);
            action.setShowPromt(false);
            action.setShowModalConfirm(false);
            yield put({
                type: AuthAction.UPDATE_ERROR_SUCCESS,
                data: {
                    error: response.statusMessage,
                },
            });
            yield delay(2000);
            yield put({
                type: AuthAction.CLEAR_ERROR_SUCCESS,
            });
        }
    } catch (error) {
        // action.setShowLoadingSecurity(false);
        action.setShowModalConfirm(false);
        action.setShowPromt(false);
        throwErrorInCatch(error, "workerAPISendSecurityCodeForSignUp");
        yield put({
            type: AuthAction.UPDATE_ERROR_SUCCESS,
            data: {
                error: "Lỗi mã xác nhận",
            },
        });
        yield delay(2000);
        yield put({
            type: AuthAction.CLEAR_ERROR_SUCCESS,
        });
    }
}

// xac thuc nguoi dung
function* workerAPISendSecurityCodeForLogin(action) {
    let { userId, securityCode } = action.data;
    try {
        yield put({
            type: AuthAction.UPDATE_BEAUTY_LOADING,
            data: true,
        });
        let response = yield call(WorkerDoAPI, {
            functionName: "/api/finalizeLoginWithLoginCode",
            data: {
                user_id: userId,
                code: securityCode,
            },
        });

        if (response.statusCode === 0) {
            action.setShowNewStepSecurity(false);
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION,
                data: "Đăng nhập thành công!!",
            });

            yield delay(1000);
            yield put({
                type: AuthAction.UPDATE_TOKEN_SUCCSESS,
                data: response.data.token,
            });
        } else {
            action.setError(response.statusMessage);
            yield delay(3000);
            action.setError("");
        }
    } catch (error) {
        throwErrorInCatch(error, "workerAPISendSecurityCodeForLogin");
        yield put({
            type: AuthAction.UPDATE_BEAUTY_LOADING,
            data: false,
        });
        action.setError(error);
    }
};

function* workerAPISendSecurityCodeForSignUpNew(action) {
    let { userId, securityCode } = action.data;
    try {
        yield put({
            type: AuthAction.UPDATE_BEAUTY_LOADING,
            data: true,
        });
        let response = yield call(WorkerDoAPI, {
            functionName: "/api/finalizeRapidLoginRegister",
            data: {
                user_id: userId,
                code: securityCode,
            },
        });
        if (response.statusCode === 0) {
            action.setLoadingSignIn(true);
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION,
                data: "Đăng ký thành công",
            });
            yield delay(1000);
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION,
                data: "Đăng nhập thành công!!",
            });

            yield delay(1000);
            yield put({
                type: AuthAction.UPDATE_TOKEN_SUCCSESS,
                data: response.data.token,
            });
        } else {
            action.setError(response.statusMessage);
            yield delay(2000);
            action.setError("");
        }
    } catch (error) {
        throwErrorInCatch(error, "workerAPISendSecurityCodeForLogin");
        yield put({
            type: AuthAction.UPDATE_BEAUTY_LOADING,
            data: false,
        });
        action.setError(error);
    }
}

function* workerAPISendSecurityCodeForLoginNew(action) {
        let { userId, securityCode } = action.data;
        try {
            yield put({
                type: AuthAction.UPDATE_BEAUTY_LOADING,
                data: true,
            });
            let response = yield call(WorkerDoAPI, {
                functionName: "/api/finalizeRapidLoginRegister",
                data: {
                    user_id: userId,
                    code: securityCode,
                },
            });
            if (response.statusCode === 0) {
                action.setShowNewStepSecurity(false), action.setLoadingSignIn(true);
                yield put({
                    type: AuthAction.UPDATE_NOTIFICATION,
                    data: "Đăng nhập thành công!!",
                });

                yield delay(1000);
                yield put({
                    type: AuthAction.UPDATE_TOKEN_SUCCSESS,
                    data: response.data.token,
                });
            } else {
                action.setError(response.statusMessage);
                yield delay(2000);
                action.setError("");
            }
        } catch (error) {
            throwErrorInCatch(error, "workerAPISendSecurityCodeForLogin");
            yield put({
                type: AuthAction.UPDATE_BEAUTY_LOADING,
                data: false,
            });
            action.setError(error);
        }
    }
    // get user info
function* workerAPIGetMyUserInfo() {
    // token ???
    try {
        let { token } = yield select((state) => state.AuthStoredReducer);
        let response = yield call(WorkerAuthToDo, {
            functionName: "/api/fetchMyTomAccount",
            token: token,
            payload: {
                data: {},
            },
        });

        const { code, message, myTomAccount } = response;
        if (
            code &&
            (code.toUpperCase().includes("TOKEN-EXPIRED") ||
                code.toUpperCase().includes("NOT-FOUND-ACCOUNT"))
        ) {
            yield put({
                type: BaseAction.CLEAR_ALL_DATA,
            });
            return true;
        }
        if (myTomAccount) {
            yield put({
                type: AuthAction.UPDATE_USER_INFO_SUCCSESS,
                data: myTomAccount,
            });
            yield put({
                type: "UPDATE_SPLASH_SCREEN",
                data: false,
            });
        }
        //delay để ko bị phóng 2 lần, 1 lần khi foreground, 1 lần khi socket.on('connect')
        yield delay(2000);
    } catch (error) {}
}

function* workerAPISignOut(action) {
    try {
        const token = yield select((state) => state.AuthStoredReducer.token);
        socket.emit("leave_my_own_room", { token });
        socket.emit("delete_device_token", { token });
        yield delay(1000);
        let response = yield call(WorkerAuthToDo, {
            functionName: "/api/logout",
            token: token,
            payload: {
                data: {},
            },
        });
        yield put({
            type: BaseAction.CLEAR_ALL_DATA,
        });
    } catch (error) {}
}