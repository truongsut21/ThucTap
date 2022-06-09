// import { delay } from 'redux-saga';
import {
    takeLeading, call, put, select, takeEvery,
    take, all, fork, delay, spawn, takeLatest
} from 'redux-saga/effects';
import { InteractionManager, Platform } from 'react-native';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import ImageResizer from 'react-native-image-resizer';
import isEqual from 'react-fast-compare';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as Action from './actionTypes';
import {
    WorkerChatToDo, _computeNiceRatioForLowResolutionImage,
    _computeNiceRatioForHighResolutionImage, convertMessageContentForDisplayLocalNotification,
} from './utils';
import { WorkerAuthToDo } from '../../auth/controllers/utils';
import { config } from '../../../config';
import { subMinutes, differenceInDays } from 'date-fns';
import {
    without,
    minBy,
} from 'lodash';
import { socket } from '../../../config/socket';
import { workerUpdateAnimateMessageReaction } from './watcherStateReaction';
import { workerUpdateMessageReaction } from './watcherReaction';
import eventEmitter from './utils';
import * as AuthAction from '../../auth/controllers/actionTypes';
import * as BaseAction from '../../base/controllers/actionTypes';
import throwErrorInCatch from '../../base/utils/throwErrorInCatch';

var _ = require('lodash');
var ObjectID = require("bson-objectid");
var RNFS = require('react-native-fs');

export function* watcherChat() {
    yield takeEvery('ANNOUNCE_ONLINE', workerAnnounceOnline);
    yield takeEvery('UPDATE_ONLINE_USER', workerUpdateOnlineUser);
    // chuan bi du lieu khi khoi dong app lan dau tien
    // gửi tin nhắn thực
    yield takeEvery(Action.API_SEND_MESSAGE, workerAPISendMessage);
    // gửi tin nhắn nháp
    yield takeEvery(Action.CREATE_DRAFT_MESSAGE, workerSendDraftMessage);
    yield takeEvery(Action.API_SEND_FILE_MESSAGE, workerSendDraftImageMessage);
    yield takeEvery(Action.API_UPLOAD_VIDEO_MESSAGE, workerAPIUploadVideoMessage);
    yield takeEvery(Action.CREATE_DRAFT_GROUP_MESSAGE, workerSendDraftGroupMessage);
    yield takeEvery(Action.API_UPLOAD_SINGLE_IMAGE_OF_IMAGE_GROUP, workerAPIUploadSingleImageOfImageGroup);
    yield takeEvery(Action.UPLOAD_IMAGE_GROUP, workerUploadImageGroup);
    // get reaction, previous là takeLeading
    yield takeLeading(Action.API_FETCH_MESSAGE_REACTION_BY_LAST_TIME_FETCH, workerFetchMessageReactionByLastTimeFetch);
    // get message state, previous là takeLeading
    yield takeLeading(Action.API_FETCH_MESSAGE_STATE_BY_LAST_TIME_FETCH, workerFetchMessageStateByLastTimeFetch);


    // get danh sách thread theo last time fetch
    yield takeLeading(Action.API_FETCH_THREAD_LIST_OLDER, workerFetchThreadListOlder);
    //previous là takeLeading
    yield takeLeading(Action.API_FETCH_THREAD_LIST, workerAPIFetchThreadList);
    // get thread single
    yield takeEvery(Action.API_FETCH_FULL_THREAD_BY_THREAD_ID, workerAPIFetchFullThreadByThreadId);
    // get danh sách user cho danh bạ, previous là takeLeading
    // get danh sách tin nhắn mới theo last time fetch, previous là takeLeading
    yield takeLeading(Action.API_FETCH_NEW_MESSAGE, workerAPIFetchMessage);
    yield takeLeading(Action.API_FETCH_NEW_MESSAGE_STATE, workerFetchMessageStateByLastTimeFetch);
    yield takeLeading(Action.API_FETCH_NEW_MESSAGE_REACTION, workerFetchMessageReactionByLastTimeFetch);
    // get tin nhắn cũ
    yield takeLeading(Action.API_FETCH_MESSAGE_OLDER, workerAPIFetchOlderMessage);
    // get danh sách user trước khi tạo nhóm
    // tạo thread cá nhân
    yield takeLatest(Action.CHAT_WITH_SOMEONE, workerChatWithSomeone);
    // tạo nhóm
    yield takeLeading(Action.API_CREATE_THREAD_GROUP, workerAPICreateThreadGroup);
    yield takeEvery(Action.API_DOWNLOAD_AVATAR, workerDownloadAvatar);
    // yield takeEvery(Action.UPDATE_DOWNLOAD_AVATAR, workerUpdateAvatar);
    // yield takeEvery('UPDATE_MY_AVATAR_USER', workerUpdateMyAvatarUser);
    yield takeEvery(Action.API_DOWNLOAD_IMAGE, workerAPIDownloadImage);
    yield takeEvery(Action.API_DOWNLOAD_IMAGE_HIGH_QUALITY, workerAPIDownloadImageHighQuality);
    yield takeEvery(Action.API_DOWNLOAD_FILE, workerAPIDownloadFile);
    yield takeEvery(Action.API_DOWNLOAD_FILE_ME, workerAPIDownloadFileMe);
    // xử lý realtime pin/gỡ pin của thread
    // khi bản thân bị mời ra khỏi nhóm
    // thêm người dùng vào nhóm chat
    yield takeLeading(Action.API_ADD_MEMBER_TO_THREAD, workerAPIAddNewMemberToThread);
    yield takeLeading(Action.RESEND_UNFINISH_MESSAGE, workerResendUnFinishMessage);
    // kiểm tra khi bấm vào người dùng bên danh bạ
    // nhận đánh dấu đã đọc
    // yield takeEvery(Action.SOCKET_SOMEONE_READ_MESSAGE, workerSomeoneReadMessaage);
    // pin
    // yield takeLeading(Action.API_PIN_THREAD, workerPinThread);
    // gỡ pin
    // yield takeLeading(Action.API_UNPIN_THREAD, workerUnpinThread);
    // nhận tin nhắn bản thân
    yield takeEvery(Action.SOCKET_I_HAVE_SENT_MESSAGE, workerIHaveSentMessage);
    // thu hồi tin nhắn
    yield takeLeading(Action.API_DELETE_MESSAGE, workerAPIDeleteMessage);
    // tái cấu trúc dữ liệu tin nhắn để render
    // yield takeEvery('PREPARE_MESSAGE', workerPrepareMessage);
    // yield takeLeading('GO_TO_PARENT_MESSAGE', workerGoToParentMessage);
    yield takeEvery(Action.API_SEND_REACTION_TO_MESSAGE, workerSendReactionToMessage);
    yield takeEvery(Action.SOCKET_RECEIVE_REACTION_TO_MESSAGE, workerReceiveReactionToMessage);
    // nhận tin nhắn từ socket
    yield takeEvery(Action.SOCKET_RECEIVE_NEW_MESSAGE, workerReceiveNewMessage); // đã chỉnh sửa lại tên method
    yield takeLeading(Action.API_UPDATE_THREAD_NAME, workerAPIUpdateThreadName);


    // Bổ nhiệm trưởng nhom & phó nhóm & truất quyền phó nhóm
    yield takeEvery(Action.API_APPOINT_LEADER, workerApiAppointLeader);
    yield takeEvery(Action.API_APPOINT_DEPUTY, workerApiAppointDeputy);
    yield takeEvery(Action.API_DEPOSITION_DEPUTY, workerApiDepositionDeputy);
    //kick khoi nhóm & rời nhóm
    yield takeEvery(Action.API_LEAVE_THREAD, workerApiLeaveThread);
    yield takeEvery(Action.API_REMOVE_MEMBER, workerApiRemoveMember);
    yield takeEvery(Action.API_FETCH_MEMBER_BY_THREAD_ID, workerAPIFetchMemberByThreadId);

    yield takeLatest(Action.API_SEARCH_MESSAGE_IN_THREAD_BY_CONTENT, workerAPISearchMessageInThreadByContent);
    yield takeLatest(Action.API_SEARCH_THREAD_BY_THREAD_NAME, workerAPISearchThreadByThreadName);
    yield takeLeading(Action.PRESS_THREAD_ON_SEARCHED_THREAD_LIST, workerPressThreadOnSearchedThreadList);
    // Ghim tin nhắn
    yield takeLeading(Action.API_PIN_MESSAGE, workerAPIPinMessage);
    yield takeLeading(Action.API_UNPIN_MESSAGE, workerAPIUnpinMessage);

    // updatte permission cap nhat lai quyen cho thread
    yield takeLeading(Action.API_UPDATE_THREAD_PERMISSION, workerAPIUpdateThreadPermission);
    yield takeLeading(Action.API_UPDATE_THREAD_POLL_MESSAGE, workerAPIUpdateThreadPollMessage);
    yield takeLeading(Action.API_UPDATE_THREAD_SEND_MESSAGE, workerAPIUpdateThreadSendMessage);
    yield takeLeading(Action.API_UPDATE_THREAD_PIN_MESSAGE, workerAPIUpdateThreadPinMessage);
    yield takeLeading(Action.API_UPDATE_THREAD_JOIN_CONDITION, workerAPIUpdateThreadJoinCondition);

    //Các Action của việc mark read message
    yield takeLeading(Action.DO_STUFF_VIEWABLES_IN_MESSAGE_ZONE, workerDoStuffViewableInMessageZone)
    yield takeEvery(Action.API_FETCH_THUMBNAIL_CONTENT, workerAPIFetchThumbnailContent);
    yield takeEvery(Action.UPDATE_THUMNAIL_CONTENT, workerUpdateThumbnailContent);
    yield takeEvery(Action.API_DOWNLOAD_VIDEO, workerAPIDownloadVideo);
    // yield takeEvery(Action.API_FETCH_MESSAGE_STATE_OF_SPECIFIC_MESSAGE, workerAPIFetchStateOfSpecificMessage);
    yield takeLeading(Action.CLEAR_ANY_DOWNLOADED_FILE_EVERY_WEEK, workerClearAnyDownloadedFileEveryWeek);
    //POLL Message
    yield takeLeading(Action.API_CREATE_POLL, workerAPICreatePoll);
    yield takeLeading(Action.API_ANSWER_THE_POLL, workerAPIAnswerThePoll);
    yield takeEvery(Action.SOCKET_SOMEONE_ANSWER_POLL, workerSocketSomeoneAnswerPoll);
    //End of POLL Message
    //Saga khi bấm giữ message 1 lúc lâu
    yield takeLeading(Action.LONG_PRESS_MESSAGE, workerLongPressMessage);
    yield takeLeading(Action.SCROLL_TO_MESSAGE, workerScrollToMessage);

    yield takeLeading(Action.API_UPDATE_THREAD_NOTIFICATION, workerAPIUpdateThreadNotification);

}

function* workerApiLeaveThread(action) {

    try {
        let { member_id } = action.data

        let activeThreadId = yield select((state) => state.ChatUnstoredReducer.activeThreadId);
        let token = yield select((state) => state.AuthStoredReducer.token)
        let res = yield call(WorkerChatToDo, {
            method: 'POST',
            token: token,
            functionName: '/api/leaveThread',
            payload: {
                data: {
                    thread_id: activeThreadId,
                    someone_id: member_id,
                }
            }
        })


        const { threadMembers, message } = res;
        if (threadMembers) {
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION_SUCCESS,
                data: "Rời khỏi nhóm thành công"
            })
            action.navigation.navigate('ChatBox')
            yield delay(2000)
            yield put({
                type: AuthAction.CLEAR_NOTIFICATION_SUCCESS,
            })
        } else {
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION_SUCCESS,
                data: message
            })
            yield delay(2000)
            yield put({
                type: AuthAction.CLEAR_NOTIFICATION_SUCCESS,
            })
        }

    }
    catch (error) {
        throwErrorInCatch(error, "workerApiLeaveThread");

    }
}
function* workerApiRemoveMember(action) {
    try {
        let { member_id } = action.data
        let activeThreadId = yield select((state) => state.ChatUnstoredReducer.activeThreadId);
        let token = yield select((state) => state.AuthStoredReducer.token)
        let res = yield call(WorkerChatToDo, {
            method: 'POST',
            token: token,
            functionName: '/api/removeMember',
            payload: {
                data: {
                    thread_id: activeThreadId,
                    someone_id: member_id,
                }
            }
        })
        const { threadMembers, message } = res;
        if (threadMembers) {
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION_SUCCESS,
                data: "Đã kick khỏi nhóm"
            })
            action.navigation.navigate("ThreadMembers")
            yield delay(2000)
            yield put({
                type: AuthAction.CLEAR_NOTIFICATION_SUCCESS,
            })
        } else {
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION_SUCCESS,
                data: message
            })
            yield delay(2000)
            yield put({
                type: AuthAction.CLEAR_NOTIFICATION_SUCCESS,
            })
        }

    }
    catch (error) {
        throwErrorInCatch(error, "workerApiRemoveMember")
    }
}
function* workerApiAppointLeader(action) {
    try {
        let { member_id } = action.data
        let activeThreadId = yield select((state) => state.ChatUnstoredReducer.activeThreadId);
        let token = yield select((state) => state.AuthStoredReducer.token)
        let res = yield call(WorkerChatToDo, {
            method: 'POST',
            token: token,
            functionName: '/api/promoteTruongNhom',
            payload: {
                data: {
                    thread_id: activeThreadId,
                    someone_id: member_id,
                }

            }
        })
        const { threadMembers, message } = res;
        if (threadMembers) {
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION_SUCCESS,
                data: "Bổ nhiệm trưởng nhóm thành công"
            })
            yield delay(2000)
            yield put({
                type: AuthAction.CLEAR_NOTIFICATION_SUCCESS,
            })
        } else {
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION_SUCCESS,
                data: message
            })
            yield delay(2000)
            yield put({
                type: AuthAction.CLEAR_NOTIFICATION_SUCCESS,
            })
        }
    }
    catch (error) {

        throwErrorInCatch(error, "workerApiAppointLeader");
    }
}
function* workerApiAppointDeputy(action) {
    try {
        let { member_id } = action.data
        let activeThreadId = yield select((state) => state.ChatUnstoredReducer.activeThreadId);
        let token = yield select((state) => state.AuthStoredReducer.token)
        let res = yield call(WorkerChatToDo, {
            method: 'POST',
            token: token,
            functionName: '/api/promotePhoNhom',
            payload: {
                data: {
                    thread_id: activeThreadId,
                    someone_id: member_id,
                }

            }
        })
        const { threadMembers, message } = res;
        if (threadMembers) {
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION_SUCCESS,
                data: "Bổ nhiệm phó nhóm thành công"
            })
            yield delay(2000)
            yield put({
                type: AuthAction.CLEAR_NOTIFICATION_SUCCESS,
            })
        } else {
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION_SUCCESS,
                data: message
            })
            yield delay(2000)
            yield put({
                type: AuthAction.CLEAR_NOTIFICATION_SUCCESS,
            })
        }

    }
    catch (error) {
        throwErrorInCatch(error, "workerApiAppointDeputy");

    }
}
function* workerApiDepositionDeputy(action) {
    try {
        let { member_id } = action.data
        let activeThreadId = yield select((state) => state.ChatUnstoredReducer.activeThreadId);
        let token = yield select((state) => state.AuthStoredReducer.token)
        let res = yield call(WorkerChatToDo, {
            method: 'POST',
            token: token,
            functionName: '/api/demotePhoNhom',
            payload: {
                data: {
                    thread_id: activeThreadId,
                    someone_id: member_id,
                }

            }
        })
        const { threadMembers, message } = res;
        if (threadMembers) {
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION_SUCCESS,
                data: "Truất quyền phó nhóm thành công"
            })
            yield delay(2000)
            yield put({
                type: AuthAction.CLEAR_NOTIFICATION_SUCCESS,
            })
        } else {
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION_SUCCESS,
                data: message
            })
            yield delay(2000)
            yield put({
                type: AuthAction.CLEAR_NOTIFICATION_SUCCESS,
            })
        }


    }
    catch (error) {
        throwErrorInCatch(error, "workerApiDepositionDeputy")
    }
}





function* workerAPISendMessage(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const data = action.data;
        if (data) {
            let type = data.type;
            let thread_id = data.thread_id;
            let doc = {
                content: type === 'sticker' ? { ...data.content } : (type === 'image_group' ? data.content : data.content.content),
                thread_id: thread_id,
                parent_id: data.parent_id ? (data.parent_id._id ? data.parent_id._id : data.parent_id) : '',
                type,
                draft_id: action.data._id,
            }
            socket.emit('tomchat_send_message', {
                token: yield select(state => state.AuthStoredReducer.token),
                data: doc,
            })
        }
    }
    catch (error) {

        throwErrorInCatch(error, "workerAPISendMessage")

    }
}

function* workerSendDraftMessage(action) {
    try {
        let activeMessage = yield select(state => state.ChatUnstoredReducer.activeMessage);
        let newMessage = { ...action.data };
        if (activeMessage) {
            const activeThreadId = yield select(state => state.ChatUnstoredReducer.activeThreadId);
            const fullMessages = yield select(state => state.ChatStoredReducer.fullMessages);
            if (fullMessages[activeMessage] &&
                fullMessages[activeMessage].thread_id === activeThreadId &&
                ['sticker', 'text'].indexOf(newMessage.type) > -1) {
                newMessage.parent_id = { ...fullMessages[activeMessage] };
            }
            yield put({ type: Action.UPDATE_REPLYING_MESSAGE, data: '', });
        }
        //Nạp hình từ cachegallery vào listfiles dành cho message dạng image, image_group, video
        //Để có thể show ra hình của message khi đang upload
        if (newMessage.type === 'image') {
            let { content } = newMessage;
            const { cacheGalleryImage } = yield select(state => state.ChatStoredReducer);
            //bắt buộc phải dùng yield put và yield take
            //vì nếu dùng yield spawn thì thông tin nạp message ở dưới sẽ nhanh hơn nạp hình ảnh
            //dẫn đến hình ảnh sẽ bị xóa làm việc nạp hình ảnh từ old image_draft_id sang new image_draft_id ko thành công 
            yield put({
                type: Action.UPDATE_MY_FILE,
                ttype: 'add_file',
                data: {
                    [`${content._id}_lowprofile`]: cacheGalleryImage[content.link]
                }
            });
        }
        if (newMessage.type === 'file') {
            let { content } = newMessage;
            const { cacheGalleryImage } = yield select(state => state.ChatStoredReducer);
            //bắt buộc phải dùng yield put và yield take
            //vì nếu dùng yield spawn thì thông tin nạp message ở dưới sẽ nhanh hơn nạp hình ảnh
            //dẫn đến hình ảnh sẽ bị xóa làm việc nạp hình ảnh từ old image_draft_id sang new image_draft_id ko thành công 
            yield put({
                type: Action.UPDATE_MY_FILE,
                ttype: 'add_file',
                data: {
                    [`${content._id}_file`]: content.link
                }
            });
        }

        //
        // Nạp hiệu ứng trượt
        yield put({
            type: Action.DOING_ANIMATE_MESSAGE,
            ttype: 'add',
            data: {
                _ids: { [newMessage._id]: true }
            }
        })

        //Nạp tin nhắn
        yield put({
            type: Action.UPDATE_MESSAGE,
            ttype: 'draft',
            data: newMessage
        })


        //Đưa tin nhắn vừa nạp vào trạng thái chưa hoàn thành tại reducer unfinishedMessages
        //
        if (newMessage.type === 'text' || newMessage.type === 'sticker') {
            yield put({
                type: Action.UPDATE_UNFINISHED_SEND_MESSAGE,
                ttype: 'add',
                data: { _id: newMessage._id }
            })
            yield spawn(workerAPISendMessage, {
                data: newMessage,
            })
        }
        //Thực hiện nén hình và upload hình
        else if (newMessage.type === 'image') {
            yield put({
                type: Action.UPDATE_UNFINISHED_SEND_MESSAGE,
                ttype: 'add',
                data: { _id: newMessage._id }
            })
            yield spawn(workerSendDraftImageMessage, {
                data: newMessage,
                dispatch: action.dispatch
            });

        }

        else if (newMessage.type === 'file') {
            yield put({
                type: Action.UPDATE_UNFINISHED_SEND_MESSAGE,
                ttype: 'add',
                data: { _id: newMessage._id }
            })
            yield spawn(workerSendDraftFileMessage, {
                data: newMessage,
                dispatch: action.dispatch,
                setShow: action.setShow
            })
        }
        //Thực hiện upload video
        else if (newMessage.type === 'video') {
            action.dispatch({
                type: Action.API_UPLOAD_VIDEO_MESSAGE,
                data: newMessage,
                dispatch: action.dispatch
            })
        }

        //Nạp lại thứ tự thread lên đầu tiên
        yield put({
            type: Action.UPDATE_THREAD_LIST,
            ttype: 'create_draft_message',
            data: {
                thread_id: newMessage.thread_id,
                write_date: newMessage.create_date
            }
        })

        eventEmitter.emit('i_have_sent_message');
    } catch (error) {
        throwErrorInCatch(error, 'workerSendDraftMessage')
    }
}

function* workerSendDraftFileMessage(action) {
    try {
        const token = yield select(state => state.AuthStoredReducer.token);
        const { _id, thread_id } = action.data;
        let message = { ...action.data };
        let content = { ...message.content };
        let localFileBuffer = content.localFileBuffer;

        return Promise.all([]).then(r => {
            return r;
        }).then(res => {
            let formData = new FormData();
            formData.append('thread_id', thread_id);
            formData.append('draft_id', _id);
            formData.append('file', {
                name: content.filename || new Date().getTime().toString(),
                type: content.type,
                uri: content.link
            });
            return axios({
                method: 'POST',
                timeout: 30000,
                url: config.file_server + '/tomchat/uploadFile',
                headers: {
                    Authorization: 'Tomaho ' + token,
                },
                data: formData,
                onUploadProgress: progress => {
                    const { loaded, total } = progress;
                    const percent = loaded / total;
                    action.dispatch({
                        type: Action.UPDATE_FILE_UP_DOWNLOAD_PROGRESS,
                        data: {
                            _id: _id,
                            percent: percent
                        },
                    })
                },
            })
        }).then(res => {
            if (res.data) {
                if (res.data.statusCode === 0) {

                } else {
                    action.dispatch({
                        type: Action.UPDATE_MESSAGE,
                        ttype: 'sent_failed',
                        data: {
                            _id, thread_id
                        }
                    });
                    action.dispatch({
                        type: AuthAction.UPDATE_NOTIFICATION,
                        data: res.data.statusMessage,
                    });
                }
            } else {
                action.dispatch({
                    type: Action.UPDATE_MESSAGE,
                    ttype: 'sent_failed',
                    data: {
                        _id, thread_id,
                    }
                })
            }
        }).catch(error => {
            action.dispatch({
                type: Action.UPDATE_MESSAGE,
                ttype: 'sent_failed',
                data: {
                    _id, thread_id
                }
            })
        })
    } catch (error) {
        throwErrorInCatch(error, "workerSendDraftFileMessage");
    }
}


/*
    - Thực hiện khi gửi image_group ở trạng thái bình thường
    - Thực hiện khi app chuyển từ background qua foreground và
    message loại image_group chưa gửi xong các hình. worker này sẽ
    tiếp tục gọi phần gửi hình đối với các message chưa hoàn thành
*/
function* workerUploadImageGroup(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const fullMessages = yield select(state => state.ChatStoredReducer.fullMessages);
        let { data, dispatch } = action;
        const { _id } = data;
        const message = fullMessages[_id];
        const { thread_id } = message;
        let { content } = message;
        let countDoneUpload = content.filter(f => f.successUpload).length;
        if (countDoneUpload < content.length) {
            for (let i = 0; i < content.length; i++) {
                if (content[i].successUpload) continue;
                yield put({
                    type: Action.API_UPLOAD_SINGLE_IMAGE_OF_IMAGE_GROUP,
                    data: {
                        _id: _id,
                        thread_id: thread_id,
                        content: content[i],
                        index: i
                    },
                    dispatch: dispatch
                })
                let res = yield take(Action.API_UPLOAD_SINGLE_IMAGE_OF_IMAGE_GROUP_SUCCESS);
                let dataInRes = res.data || {};
                let { image_id, newContent } = dataInRes;
                if (image_id) {
                    yield put({
                        type: Action.UPDATE_MESSAGE,
                        ttype: 'upload_done_image_in_image_group',
                        data: {
                            _id: _id,
                            thread_id: thread_id,
                            image_id: image_id,
                            newContent: newContent,
                        },
                    })
                    //Vì sao phải init lại data trong reducer
                    //Vì yield select chỉ lấy data tại thời điểm đó
                    let fMessages = yield select(state => state.ChatStoredReducer.fullMessages);
                    let countDone = fMessages[_id].content.filter(f => f.successUpload).length;
                    if (fMessages[_id].content.length === countDone) {
                        yield spawn(workerAPISendMessage, {
                            data: fMessages[_id],
                            dispatch: dispatch
                        })
                        //break ngay, trong trường hợp resend message thì sau khi upload lại và check
                        //số lượng đủ thì gửi tin nhắn và break vòng tiếp theo
                        break;

                    }

                } else {
                    // yield delay(2000);
                    // yield put({
                    //     type: AuthAction.UPDATE_NOTIFICATION,
                    //     data: 'Thêm ảnh thất bại'
                    // })
                }
                // yield spawn(workerAPIUploadImageMessageOfGroupMessage, {
                //     data: {
                //         _id: _id,
                //         thread_id: thread_id,
                //         content: content[i]
                //     },
                //     dispatch: dispatch
                // })
            }
        }
        //Thực hiện gửi tin nhắn group luôn, vì đây là hành động resend message gửi chưa thành công
        //nhưng đã upload thành công tất cả file
        else {
            yield spawn(workerAPISendMessage, {
                data: fullMessages[_id],
                dispatch: dispatch
            })
        }

    } catch (error) {
        throwErrorInCatch(error, 'workerUploadImageGroup');
    }
}

function* workerSendDraftGroupMessage(action) {
    try {
        let activeMessage = yield select(state => state.ChatUnstoredReducer.activeMessage);
        if (activeMessage) {
            yield put({ type: Action.UPDATE_REPLYING_MESSAGE, data: '', });
        }

        if (!action.data) return true;

        yield put({
            type: Action.DOING_ANIMATE_MESSAGE,
            ttype: 'add',
            data: { _ids: { [action.data._id]: true } }
        })

        yield put({
            type: Action.UPDATE_UNFINISHED_SEND_MESSAGE,
            ttype: 'add',
            data: { _id: action.data._id }
        })

        let message = action.data;
        let images = {};
        const { cacheGalleryImage } = yield select(state => state.ChatStoredReducer);
        message.content = message.content.map((img, i) => {
            images[`${img._id}_lowprofile`] = cacheGalleryImage[img.link];
            return {
                ...img,
            }
        })
        //bắt buộc phải dùng yield put và yield take
        //vì nếu dùng yield spawn thì thông tin nạp message ở dưới sẽ nhanh hơn nạp hình ảnh
        //dẫn đến hình ảnh sẽ bị xóa làm việc nạp hình ảnh từ old image_draft_id sang new image_draft_id ko thành công 
        yield put({
            type: Action.UPDATE_MY_FILE,
            ttype: 'add_file',
            data: { ...images }
        })


        yield put({
            type: Action.UPDATE_MESSAGE,
            ttype: 'draft',
            data: message,
        });

        yield put({
            type: Action.UPDATE_THREAD_LIST,
            ttype: 'create_draft_message',
            data: {
                thread_id: message.thread_id,
                write_date: message.create_date || message.write_date
            }
        })

        yield put({
            type: Action.UPLOAD_IMAGE_GROUP,
            data: {
                _id: message._id
            },
            dispatch: action.dispatch
        })

    } catch (error) {
        throwErrorInCatch(error, 'workerSendDraftGroupMessage');
    }
}

function* workerAPIUploadSingleImageOfImageGroup(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const token = yield select(state => state.AuthStoredReducer.token);
        const listFiles = yield select(state => state.ChatStoredReducer.listFiles);
        const { _id, thread_id, index } = action.data;
        const message = { ...action.data };
        const content = { ...message.content };
        let staging = { link: content.link, filename: content.filename }
        let ratio = _computeNiceRatioForHighResolutionImage(content.metadata);
        // let savedPercent;
        return Promise.all([]).then(r => {
            return ImageResizer.createResizedImage(staging.link, ratio.width, ratio.height,
                'PNG', 100, 0, undefined, true, { mode: 'contain', onlyScaleDown: true })
        }).then(res => {
            staging = { ...staging, link: res.uri }
            // setup lại uri/path nếu đi qua RESIZER và OS là ANDROID
            if (Platform.OS === 'android') {
                if (staging.link.indexOf('file://') === -1) {
                    staging.link = `file://${staging.link}`
                }
            }
            else {
                staging.link = staging.link.startsWith('file://') ? staging.link.replace('file://', '') : staging.link;
            }

            //bắt đầu up hình
            let formData = new FormData();
            formData.append('thread_id', thread_id);
            formData.append('draft_id', _id);
            formData.append('file', {
                name: staging.filename || new Date().getTime().toString(),
                type: 'image/png',
                uri: staging.link
            });
            formData.append('isImageGroup', true);
            return axios({
                method: 'POST',
                timeout: 30000,
                url: config.file_server + '/tomchat/uploadImage',
                headers: {
                    Authorization: 'Tomaho ' + token,
                },
                data: formData,
                onUploadProgress: progress => {
                    const { loaded, total } = progress;
                    const percent = (loaded * 1.0) / (total * 1.0);
                    action.dispatch({
                        type: Action.UPDATE_FILE_UP_DOWNLOAD_PROGRESS,
                        data: {
                            _id: content._id,
                            percent: percent
                        },
                    })
                }
            })
        }).then(res => {
            if (res.data) {
                if (res.data.statusCode === 0 && res.data.data && res.data.data._id) {
                    let newContent = res.data.data;
                    if (listFiles[`${content._id}_lowprofile`]) {
                        action.dispatch({
                            type: Action.UPDATE_MY_FILE,
                            ttype: 'add_file',
                            data: {
                                [`${newContent._id}_lowprofile`]: `${listFiles[`${content._id}_lowprofile`]}`
                            }
                        })
                    }
                    return res.data.data;
                } else {

                    // action.dispatch({
                    //     type: AuthAction.UPDATE_NOTIFICATION,
                    //     data: 'Thêm ảnh thất bại'
                    // })
                    throw res.data.statusMessage || 'Lỗi tài hình lên không thành công';
                }
            }
            else {
                throw 'unknown error when connect to fileserver';
            }
        }).then(res => {
            if (res._id) {
                action.dispatch({
                    type: Action.API_UPLOAD_SINGLE_IMAGE_OF_IMAGE_GROUP_SUCCESS,
                    data: {
                        _id: _id,
                        thread_id: thread_id,
                        image_id: content._id,
                        newContent: res
                    }
                })
                // action.dispatch({
                //     type: AuthAction.UPDATE_NOTIFICATION,
                //     data: `Thêm ảnh ${index +1} thành công`
                // })
            }
        }).catch(error => {
            action.dispatch({
                type: Action.UPDATE_MESSAGE,
                ttype: 'sent_failed_image_in_image_group',
                data: {
                    _id: _id,
                    thread_id: thread_id,
                    image_id: content._id,
                },
                dispatch: action.dispatch
            })
            //Bắn lại để có thể tiếp tục upload những ảnh khác vì cá saga đang take saga này
            action.dispatch({
                type: Action.API_UPLOAD_SINGLE_IMAGE_OF_IMAGE_GROUP_SUCCESS,
                data: {

                }
            })
            throwErrorInCatch(error, 'In axios of - workerAPIUploadImageMessageOfGroupMessage')
            return {
                statusCode: 1,
                statusMessage: error.toString()
            }
        })
    } catch (error) {

    }
}

function handleWritingImageFileToApplicationStorageAfterUpload(action) {
    const splitUri = action.uri.split('.');
    const tail = splitUri[splitUri.length - 1];
    let newFilePath = `${RNFS.DocumentDirectoryPath}/images/${action.data._id}_lowprofile.${tail}`;
    return RNFS.exists(`${RNFS.DocumentDirectoryPath}/images`).then(exist => {
        if (!exist) {
            RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/images`)
        }
    }).then(() => {
        let uri = Platform.OS === 'android' ? action.uri : action.uri.replace('file://', '');
        if (Platform.OS === 'android') {
            return RNFS.readFile(uri, 'base64');
        }
        else {
            return RNFS.copyFile(uri, newFilePath);
        }
    }).then(file => {
        if (Platform.OS === 'android') {
            RNFS.writeFile(newFilePath, file, 'base64');
        }
        else {
        }
    }).then(res => {
        return Platform.OS === 'android' ? `file://${newFilePath}` : newFilePath;
    }).catch(error => {
    })
}

function* workerSendDraftImageMessage(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const token = yield select(state => state.AuthStoredReducer.token);
        const { _id, thread_id } = action.data;
        let message = { ...action.data };
        let content = { ...message.content };
        let staging = { link: content.link, filename: content.filename }
        let ratio = _computeNiceRatioForHighResolutionImage(content.metadata);

        return Promise.all([]).then(r => {
            return ImageResizer.createResizedImage(staging.link, ratio.width, ratio.height,
                'PNG', 100, 0, undefined, true, { mode: 'contain', onlyScaleDown: true })
        }).then(res => {
            staging = { ...staging, link: res.uri }
            // setup lại uri/path nếu đi qua RESIZER và OS là ANDROID
            if (Platform.OS === 'android') {
                if (staging.link.indexOf('file://') === -1) {
                    staging.link = `file://${staging.link}`
                }
            }
            else {
                staging.link = staging.link.startsWith('file://') ? staging.link.replace('file://', '') : staging.link;
            }
            //bắt đầu up hình
            let formData = new FormData();
            formData.append('thread_id', thread_id);
            formData.append('file', {
                name: staging.filename || new Date().getTime().toString(),
                type: 'image/png',
                uri: staging.link
            });
            formData.append('draft_id', _id);
            return axios({
                method: 'POST',
                timeout: 30000,
                url: config.file_server + '/tomchat/uploadImage',
                headers: {
                    Authorization: 'Tomaho ' + token,
                },
                data: formData,
                onUploadProgress: progress => {
                    const { loaded, total } = progress;
                    const percent = loaded / total;
                    action.dispatch({
                        type: Action.UPDATE_FILE_UP_DOWNLOAD_PROGRESS,
                        data: {
                            _id: _id,
                            percent: percent
                        },
                    })
                },
            })
        }).then(res => {
            if (res.data) {
                if (res.data.statusCode === 0) {
                    // action.dispatch({
                    //     type:  AuthAction.UPDATE_NOTIFICATION,
                    //     data: 'Thêm ảnh thành công'
                    // })
                } else {
                    action.dispatch({
                        type: Action.UPDATE_MESSAGE,
                        ttype: 'sent_failed',
                        data: {
                            _id, thread_id
                        }
                    })
                    // action.dispatch({
                    //     type:  AuthAction.UPDATE_NOTIFICATION,
                    //     data: 'Thêm ảnh thất bại'
                    // })
                }
            } else {
                action.dispatch({
                    type: Action.UPDATE_MESSAGE,
                    ttype: 'sent_failed',
                    data: {
                        _id, thread_id,
                    }
                });
                // action.dispatch({
                //     type:  AuthAction.UPDATE_NOTIFICATION,
                //     data: 'Thêm ảnh thất bại'
                // })
            }
        }).catch(error => {
            action.dispatch({
                type: Action.UPDATE_MESSAGE,
                ttype: 'sent_failed',
                data: {
                    _id, thread_id
                }
            })
            // action.dispatch({
            //     type:  AuthAction.UPDATE_NOTIFICATION,
            //     data: 'Thêm ảnh thất bại'
            // })
        })
    } catch (error) {

    }
}

function* workerAPIUploadVideoMessage(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const token = yield select(state => state.AuthStoredReducer.token);
        const { _id, thread_id, fileContent } = action.data;
        const { uri, videoToUpload } = fileContent;


        const cancelTokenSource = axios.CancelToken.source();
        action.dispatch({
            type: Action.UPDATE_FAST_ACCESS_THREAD_MESSAGE,
            ttype: 'set_cancel_token_for_video_image',
            data: {
                _id: _id,
                cancelTokenSource: cancelTokenSource
            }
        })
        let formData = new FormData();
        let filedata = {
            name: videoToUpload.filename || new Date().getTime().toString(),
            type: videoToUpload.mime,
            uri: uri
        }
        formData.append('res_model', 'ThreadMain');
        formData.append('res_id', thread_id);
        formData.append('file', filedata);
        formData.append('draft_id', _id);
        return axios({
            method: 'POST',
            url: config.file_server + '/tomchat/uploadVideo',
            headers: {
                Authorization: 'Tomaho ' + token,
            },
            data: formData,
            cancelToken: cancelTokenSource.token,
            onUploadProgress: progress => {
                const { loaded, total } = progress;
                const percent = loaded / total;
                action.dispatch({
                    type: Action.UPDATE_FILE_UP_DOWNLOAD_PROGRESS,
                    data: {
                        _id: _id,
                        percent: percent
                    },
                })
            },
        }).then(res => {
            if (res.data) {
                if (res.data.statusCode === 0) {
                } else {
                    action.dispatch({
                        type: Action.UPDATE_MESSAGE,
                        ttype: 'sent_failed',
                        data: {
                            _id, thread_id
                        }
                    })
                    // action.dispatch({
                    //     type: Action.UPDATE_FAST_ACCESS_THREAD_MESSAGE,
                    //     ttype: 'sentfailed',
                    //     data: { _id, thread_id },
                    // });
                }
            } else {
                action.dispatch({
                    type: Action.UPDATE_MESSAGE,
                    ttype: 'sent_failed',
                    data: {
                        _id, thread_id
                    }
                })
                // action.dispatch({
                //     type: Action.UPDATE_FAST_ACCESS_THREAD_MESSAGE,
                //     ttype: 'sentfailed',
                //     data: { _id, thread_id },
                // });
            }
        }).catch(error => {
            throwErrorInCatch(error, 'workerAPIUploadVideoMessage 1');
            action.dispatch({
                type: Action.UPDATE_MESSAGE,
                ttype: 'sent_failed',
                data: {
                    _id, thread_id
                }
            })
            // action.dispatch({
            //     type: Action.UPDATE_FAST_ACCESS_THREAD_MESSAGE,
            //     ttype: 'sentfailed',
            //     data: { _id, thread_id },
            // });
        })
    } catch (error) {
        throwErrorInCatch(error, 'workerAPIUploadVideoMessage 2');
    }
}

function* workerFetchMessageReactionByLastTimeFetch(action) {
    try {
        const lT = yield select(state => state.ChatStoredReducer.listLastTimeFetch)
        let lTFR = Number(lT[`message_reaction`] || 0)
        let ignoreIds = []
        const token = yield select(state => state.AuthStoredReducer.token)
        while (true) {
            let res = yield call(WorkerChatToDo, {
                functionName: '/api/fetchReactionByLastTimeFetch',
                token,
                payload: {
                    data: {
                        lastTime: lTFR,
                        ignore_ids: ignoreIds
                    }
                }
            })
            const { reactions, lastTime, ignore_ids } = res

            if (!reactions || Object.values(reactions).length < 1) break;
            const flatUserId = Object.values(reactions).map(r => Object.keys(r)).flat();
            yield put({
                type: Action.UPDATE_MESSAGE_REACTION,
                data: { messageReactions: reactions }
            })

            lTFR = lastTime
            ignoreIds = ignore_ids
            yield put({
                type: Action.UPDATE_LAST_TIME_FETCH,
                data: {
                    [`message_reaction`]: flatUserId.length < 200 ? lTFR + 1 : lTFR
                }
            })
            if (flatUserId.length < 200) break;
        }
        //delay để ko bị phóng 2 lần, 1 lần khi foreground, 1 lần khi socket.on('connect')
        yield delay(2000);
    } catch (error) {
        throwErrorInCatch(error, 'workerFetchMessageReactionByLastTimeFetch')
    }
}

function* workerFetchMessageStateByLastTimeFetch(action) {
    try {
        const token = yield select(state => state.AuthStoredReducer.token)
        let lT = yield select(state => state.ChatStoredReducer.listLastTimeFetch)
        let lTMS = Number(lT[`message_state`] || 0)
        let ignoreIds = []
        while (true) {
            let res = yield call(WorkerChatToDo, {
                functionName: '/api/fetchMessageStateByLastTimeFetch',
                token,
                payload: {
                    data: {
                        lastTime: lTMS,
                        ignore_ids: ignoreIds
                    }
                }
            })
            const { messageStates, lastTime, ignore_ids } = res
            if (!messageStates || Object.keys(messageStates).length < 1) break;
            yield put({
                type: Action.UPDATE_MESSAGE_STATE,
                data: { messageStates }
            })

            lTMS = lastTime;
            ignoreIds = ignore_ids
            yield put({
                type: Action.UPDATE_LAST_TIME_FETCH,
                data: {
                    [`message_state`]: Object.keys(messageStates).length < 500 ? lTMS + 1 : lTMS
                }
            })
            if (Object.keys(messageStates).length < 500) break;
        }
        //delay để ko bị phóng 2 lần, 1 lần khi foreground, 1 lần khi socket.on('connect')
        yield delay(2000);
    } catch (error) {
        throwErrorInCatch(error, 'workerFetchMessageStateByLastTimeFetch');
    }
}

function* workerFetchThreadListOlder(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const token = yield select(state => state.AuthStoredReducer.token);
        const sT = yield select(state => state.ChatStoredReducer.simpleThreads);
        const fT = yield select(state => state.ChatStoredReducer.fullThreads);
        let maxThreadToShow = Number(yield select((state) => state.ChatUnstoredReducer.maxThreadToShow) || 20);
        if (Number.isNaN(maxThreadToShow)) {
            maxThreadToShow = 20;
        }
        if (sT.length > maxThreadToShow && sT.length - maxThreadToShow >= 20) {
            action.dispatch({
                type: Action.UPDATE_MAX_THREAD_TO_SHOW,
                data: maxThreadToShow + 20
            })
            action.unsetLoading({});
        } else {
            let oldestThread = minBy(sT, 'write_date');
            let oldestWriteDate = oldestThread.write_date;

            let oldest_thread_id = oldestThread._id
            let fetchThreadCount = 0, currentThreadCount = sT.length;
            let response = yield call(WorkerChatToDo, {
                method: 'POST',
                timeout: 45000,
                functionName: '/api/fetchOlderThread',
                token: token,
                payload: {
                    data: {
                        oldest_thread_id,
                        oldestTime: oldestWriteDate
                    }
                }
            })
            yield call(InteractionManager.runAfterInteractions);
            const {
                simpleThreads, fullThreads,
                simpleMessages, fullMessages,
                pollAnswers,
                messageStates, messageReactions,
                pinMessages,
            } = response;

            if (!simpleThreads) {
                action.unsetLoading({});
                return true;
            };
            fetchThreadCount = simpleThreads.length;

            if (simpleThreads.length > 0) {
                yield put({
                    type: Action.UPDATE_THREAD_LIST,
                    ttype: 'fetch_old',
                    data: { simpleThreads, fullThreads }
                })
                for (let i = 0; i < simpleThreads.length; i++) {
                    yield spawn(workerAPIFetchMemberByThreadId, {
                        data: {
                            lastTime: 0,
                            thread_id: simpleThreads[i]._id
                        }
                    })
                }
            }

            if (fullMessages && Object.keys(fullMessages).length > 0) {
                yield put({
                    type: Action.UPDATE_MESSAGE,
                    ttype: 'fetchmessage',
                    data: { simpleMessages, fullMessages, },
                })
            }
            if (pollAnswers && Object.keys(pollAnswers).length > 0) {
                yield put({
                    type: Action.UPDATE_POLL_ANSWER_RESULT,
                    ttype: 'fetch',
                    data: {
                        pollAnswers
                    }
                })
            }

            if (messageReactions && Object.keys(messageReactions).length > 0) {
                yield put({
                    type: Action.UPDATE_MESSAGE_REACTION,
                    data: { messageReactions }
                })
            }

            if (messageStates && Object.keys(messageStates).length > 0) {
                yield put({
                    type: Action.UPDATE_MESSAGE_STATE,
                    data: { messageStates }
                })
            }

            if (pinMessages && Object.values(pinMessages).length > 0) {
                yield put({
                    type: Action.UPDATE_PIN_MESSAGE,
                    ttype: 'fetch',
                    data: { pinMessages }
                })
            }

            const soluongThreadChuaShowvaFetchMoi = (currentThreadCount - maxThreadToShow) + fetchThreadCount;
            if (soluongThreadChuaShowvaFetchMoi > 0) {
                if (soluongThreadChuaShowvaFetchMoi >= 20) {
                    yield put({
                        type: Action.UPDATE_MAX_THREAD_TO_SHOW,
                        data: maxThreadToShow + 20
                    })
                    yield delay(200);

                    action.unsetLoading({});
                } else {
                    yield put({
                        type: Action.UPDATE_MAX_THREAD_TO_SHOW,
                        data: maxThreadToShow + soluongThreadChuaShowvaFetchMoi
                    })
                    yield delay(200);
                    action.unsetLoading({ thatsAllThread: true });
                }
            }
            else {
                action.unsetLoading({ thatsAllThread: true });
            }
        }
    } catch (error) {
        throwErrorInCatch(error, 'workerFetchThreadListMore');
        if (action.unsetLoading) {
            action.unsetLoading({});
        }
    }
}
export function* workerAPIFetchMemberByThreadId(action) {
    try {
        const { lastTime = 0, ignore_ids = [], thread_id } = action.data;
        let lTF = lastTime
        let ignoreIds = [...ignore_ids]
        while (true) {
            if (!thread_id) break;
            let token = yield select((state) => state.AuthStoredReducer.token)
            let res = yield call(WorkerChatToDo, {
                method: 'POST',
                token: token,
                functionName: '/api/fetchMemberByThread',
                payload: {
                    data: {
                        thread_id: thread_id,
                        lastTime: lTF,
                        ignore_ids: ignoreIds
                    }
                }
            })
            const { ignore_ids, threadMembers } = res
            if (!threadMembers) break;
            if (Object.keys(threadMembers[thread_id]).length === 0) {
                break;
            }
            yield put({
                type: Action.UPDATE_THREAD_MEMBER,
                data: {
                    threadMembers
                }
            })

            ignoreIds = ignore_ids
            if (Object.keys(threadMembers[thread_id]).length < 500) break;

        }
        yield put({
            type: Action.API_FETCH_MEMBER_BY_THREAD_ID_SUCCESS,
            data: {}
        })
    }
    catch (error) {
        console.log('workerAPIFetchMemberByThreadId111', error);
    }
}
function* workerAPIFetchThreadList(action) {
    try {
        const token = yield select(state => state.AuthStoredReducer.token);
        let lTF = yield select((state) => state.ChatStoredReducer.listLastTimeFetch)
        let ltfThread = Number(lTF[`thread`] || 0);
        // let ltfMember = Number(listLastTimeFetch[`member`] || 0);
        let ltfMember = 1
        let localIgnoreIds = [];
        while (true) {

            let response = yield call(WorkerChatToDo, {
                method: 'POST',
                functionName: '/api/fetchThreadByLastTimeFetch',
                token: token,
                payload: {
                    data: {
                        lastTime: ltfThread,
                        ignore_ids: localIgnoreIds
                    }
                }
            })
            const {
                simpleThreads, fullThreads,
                pinMessages,
                lastTime, ignore_ids, needUpdateMembers,
            } = response;
            if (!simpleThreads) break;

            if (simpleThreads && simpleThreads.length > 0) {
                const fTs = yield select(state => state.ChatStoredReducer.fullThreads);
                //fetch thread hien tai ko co trong may
                for (let i = 0; i < simpleThreads.length; i++) {
                    if (!fTs[simpleThreads[i]._id]) {
                        yield spawn(workerAPIFetchFullThreadByThreadId, {
                            data: {
                                thread_id: simpleThreads[i]._id
                            }
                        })
                    }

                }
                yield put({
                    type: Action.UPDATE_THREAD_LIST,
                    ttype: 'fetch_latest_thread_list',
                    data: {
                        simpleThreads,
                        fullThreads
                    },
                    dispatch: action.dispatch
                })
            }

            if (pinMessages && Object.values(pinMessages).length > 0) {
                yield put({
                    type: Action.UPDATE_PIN_MESSAGE,
                    ttype: 'fetch',
                    data: { pinMessages }
                })
            }


            if (needUpdateMembers && needUpdateMembers.length > 0) {
                for (let i = 0; i < needUpdateMembers.length; i++) {
                    yield spawn(workerAPIFetchMemberByThreadId, {
                        data: {
                            thread_id: needUpdateMembers[i],
                            lastTime: fullThreads[needUpdateMembers[i]].lasttime_update_member,
                            ignore_ids: []
                        }
                    })
                }
            }
            ltfThread = Number(lastTime);
            localIgnoreIds = ignore_ids;

            if (simpleThreads.length > 0) {
                yield put({
                    type: Action.UPDATE_LAST_TIME_FETCH,
                    data: {
                        [`thread`]: simpleThreads.length < 80 ? ltfThread + 1 : ltfThread
                    }
                })
            }

            if (simpleThreads.length < 80) break;
        }

        //delay để ko bị phóng 2 lần, 1 lần khi foreground, 1 lần khi socket.on('connect')
        yield delay(2000);
    } catch (error) {
        console.log('xxxxxxxxx', error);
    }
}

export function* workerAPIFetchFullThreadByThreadId(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const token = yield select(state => state.AuthStoredReducer.token)
        const { thread_id } = action.data;

        const response = yield call(WorkerChatToDo, {
            method: 'POST',
            functionName: '/api/fetchFullStuffByThreadId',
            token: token,
            payload: {
                data: {
                    thread_id
                },
            }
        })
        const {
            simpleThreads, fullThreads, fullMessages, simpleMessages,
            pollAnswers,
            messageReactions, messageStates, pinMessages
        } = response;
        if (simpleThreads && simpleThreads.length > 0) {
            yield put({
                type: Action.UPDATE_THREAD_LIST,
                ttype: 'fetch_by_ids',
                data: { simpleThreads, fullThreads, }
            })
        }
        if (fullMessages && Object.keys(fullMessages).length > 0) {
            yield put({
                type: Action.UPDATE_MESSAGE,
                ttype: 'fetchmessage',
                data: { simpleMessages, fullMessages, },
            })
        }
        if (pollAnswers && Object.keys(pollAnswers).length > 0) {
            yield put({
                type: Action.UPDATE_POLL_ANSWER_RESULT,
                ttype: 'fetch',
                data: { pollAnswers }
            })
        }
        if (messageReactions && Object.keys(messageReactions).length > 0) {
            yield put({
                type: Action.UPDATE_MESSAGE_REACTION,
                data: {
                    messageReactions: messageReactions
                }
            })
        }
        if (messageStates && Object.keys(messageStates).length > 0) {
            yield put({
                type: Action.UPDATE_MESSAGE_STATE,
                data: {
                    messageStates: messageStates
                }
            })
        }
        if (pinMessages && Object.values(pinMessages).length > 0) {
            yield put({
                type: Action.UPDATE_PIN_MESSAGE,
                ttype: 'fetch',
                data: { pinMessages }
            })
        }


        yield put({
            type: Action.API_FETCH_MEMBER_BY_THREAD_ID,
            data: {
                thread_id: simpleThreads[0]._id,
                lastTime: 0,
                ignore_ids: []
            }
        })


        // yield spawn(workerAPIFetchMemberByThreadId, {
        //     data: {
        //         thread_id: simpleThreads.map(e => e._id)
        //     }
        // })
        // action.dispatch({
        //     type: Action.UPDATE_PIN_MESSAGE,
        //     ttype: 'init',
        //     data: pinMessages
        // });


    } catch (error) {
        throwErrorInCatch(error, 'workerAPIFetchFullThreadByThreadId');
    }
}


function* workerAPIFetchMessage(action) {
    try {
        const token = yield select(state => state.AuthStoredReducer.token)
        let listLastTimeFetch = yield select((state) => state.ChatStoredReducer.listLastTimeFetch);
        let ignoreIds = [];
        let lTFM = Number(listLastTimeFetch[`message`] || 0)
        let data = {}
        while (true) { // lay sms
            if (!data.hasOwnProperty('lastTime')) {
                data = {
                    lastTime: lTFM,
                    ignore_ids: ignoreIds
                }
            }
            let response = yield call(WorkerChatToDo, {
                functionName: '/api/fetchMessageByLastTimeFetch',
                token: token,
                payload: {
                    data
                }
            })
            const { simpleMessages, fullMessages, pollAnswers, ignore_ids, lastTime } = response;

            if (!fullMessages || !simpleMessages) {
                break;
            };
            if (Object.keys(simpleMessages).length > 0 && Object.keys(fullMessages).length > 0) {
                //
                //CÓ THỂ PERFORMANCE CỦA CÁI NÀY KO TỐT
                //NHƯNG GIÚP CHO HIỆU ỨNG MỞ APP TẢI TIN NHẮN TRƯỢT LÊN SẼ ĐẸP HƠN
                // const fM = yield select(state => state.ChatStoredReducer.fullMessages);
                const lMS = yield select(state => state.ChatStoredReducer.listMessageStates || {});
                const myUserId = yield select(state => state.AuthStoredReducer.myUserInfo._id);
                const { activeThreadId } = yield select(state => state.ChatUnstoredReducer);

                let toOnAnimate = {}, toMarkRead = [];
                _.forEach(fullMessages, (message, _id) => {
                    toOnAnimate[_id] = true;
                    if (message.create_uid !== myUserId && message.thread_id === activeThreadId && !lMS[_id]) {
                        toMarkRead.push(_id);
                    }
                });

                if (Object.keys(toOnAnimate).length > 0) {
                    yield put({
                        type: Action.DOING_ANIMATE_MESSAGE,
                        ttype: 'add',
                        data: { _ids: toOnAnimate }
                    })
                }
                yield put({
                    type: Action.UPDATE_MESSAGE,
                    ttype: 'fetchmessage',
                    data: {
                        simpleMessages, fullMessages
                    }
                })
                if (toMarkRead.length > 0) {
                    socket.emit('tomchat_read_message', {
                        token: token,
                        thread_id: activeThreadId,
                        message_ids: toMarkRead,
                    })
                }
            }

            if (pollAnswers && Object.keys(pollAnswers).length > 0) {
                yield put({
                    type: Action.UPDATE_POLL_ANSWER_RESULT,
                    ttype: 'fetch',
                    data: {
                        pollAnswers
                    }
                })
            }

            lTFM = lastTime;
            data = {
                lastTime: lastTime,
                ignore_ids: ignore_ids
            };
            if (Object.keys(fullMessages).length > 0 || Object.keys(pollAnswers).length > 0) {
                yield put({
                    type: Action.UPDATE_LAST_TIME_FETCH,
                    data: {
                        ['message']: Object.keys(fullMessages).length < 80 ? lTFM + 1 : lTFM
                    }
                })
            }

            yield delay(500);

            //Data trả về nhỏ hơn 80 cũng nghĩa là hết data để fetch
            if (Object.keys(fullMessages).length < 80) {
                break;
            }
        }
        yield put({
            type: Action.RESEND_UNFINISH_MESSAGE,
            dispatch: action.dispatch
        })
        //delay để ko bị phóng 2 lần, 1 lần khi foreground, 1 lần khi socket.on('connect')
        yield delay(2000);
    } catch (error) {
        throwErrorInCatch(error, 'workerFetchMessage');
    }
}

function* workerAPIFetchOlderMessage(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        let { thread_id } = action.data;
        const sMessages = yield select((state) => state.ChatStoredReducer.simpleMessages);
        let maxMessageToShow = yield select((state) => state.ChatUnstoredReducer.maxMessageToShow);
        let MessagesOfThread = sMessages[thread_id] ? sMessages[thread_id] : [];
        let mMTS = Number.isNaN(maxMessageToShow) ? 20 : Number(maxMessageToShow);
        let myId = yield select((state) => state.AuthStoredReducer.myUserInfo._id);
        let tMember = yield select((state) => state.ChatStoredReducer.threadMembers);
        let activeThreadId = yield select((state) => state.ChatUnstoredReducer.activeThreadId);
        if (Object.values(!tMember[activeThreadId])) {
            action.unsetLoadingOldMessage({});
        } else {
            let tNow = tMember[thread_id][myId]
            if (!tNow || tNow.status === 0) {
                action.unsetLoadingOldMessage({
                    // thatsAllMessage: true

                });
                return true;
            }
        }
        if (MessagesOfThread.length - mMTS >= 20) {
            action.dispatch({
                type: Action.UPDATE_MAX_MESSAGE_TO_SHOW,
                data: mMTS + 20
            })
            yield delay(100);
            action.unsetLoadingOldMessage({});
        } else {
            if (!(tMember[activeThreadId])) {
                action.unsetLoadingOldMessage({ thatsAllMessage: true });
                return true
            }

            if (!Object.values(tMember[activeThreadId])) {
                let tNow = tMember[thread_id][myId]
                if (!tNow || tNow.status === 0) {
                    action.unsetLoadingOldMessage({ thatsAllMessage: true });
                    return true;
                }
            } else {
                action.unsetLoadingOldMessage({ thatsAllMessage: true });
            }
            let fetchMessageCount = 0, currentMessageCount = MessagesOfThread.length;
            let lastMessage = MessagesOfThread[MessagesOfThread.length - 1];

            // yield call(InteractionManager.runAfterInteractions);
            const token = yield select(state => state.AuthStoredReducer.token);
            const index = sMessages[thread_id].length - 1
            let oldestMessage = sMessages[thread_id][index]._id
            let oldestTime = sMessages[thread_id][index].create_date
            let response = yield call(WorkerChatToDo, {
                method: 'POST',
                functionName: '/api/fetchOlderMessage',
                token: token,
                payload: {
                    data: {
                        thread_id,
                        oldest_message_id: oldestMessage,
                        oldestTime: oldestTime
                    }
                }
            })

            const {
                simpleMessages, fullMessages,
                pollAnswers,
                messageReactions, messageStates
            } = response;
            if (!fullMessages) {
                action.unsetLoadingOldMessage({});
                return true;
            }
            let message_ids = Object.keys(fullMessages).map(m => {
                return m;
            });
            if (message_ids.length > 0) {
                action.dispatch({
                    type: Action.UPDATE_MESSAGE,
                    ttype: 'fetchmessage',
                    data: { simpleMessages, fullMessages },
                })
            }
            if (pollAnswers && Object.keys(pollAnswers).length > 0) {
                action.dispatch({
                    type: Action.UPDATE_POLL_ANSWER_RESULT,
                    ttype: 'fetch',
                    data: {
                        pollAnswers
                    }
                })
            }
            if (messageReactions && Object.keys(messageReactions).length > 0) {
                action.dispatch({
                    type: Action.UPDATE_MESSAGE_REACTION,
                    data: { messageReactions }
                })
            }
            if (messageStates && Object.keys(messageStates)) {
                action.dispatch({
                    type: Action.UPDATE_MESSAGE_STATE,
                    data: { messageStates }
                })
            }

            fetchMessageCount = message_ids.length;
            const soluongMessageChuaShowvaFetchMoi = (currentMessageCount - mMTS) + fetchMessageCount;

            if (soluongMessageChuaShowvaFetchMoi > 0) {
                if (soluongMessageChuaShowvaFetchMoi > 20) {
                    action.dispatch({
                        type: Action.UPDATE_MAX_MESSAGE_TO_SHOW,
                        data: mMTS + 20
                    })
                    action.unsetLoadingOldMessage({});
                } else {
                    action.dispatch({
                        type: Action.UPDATE_MAX_MESSAGE_TO_SHOW,
                        data: mMTS + soluongMessageChuaShowvaFetchMoi
                    })
                    action.unsetLoadingOldMessage({
                        thatsAllMessage: true
                    });
                }
            } else {
                action.unsetLoadingOldMessage({ thatsAllMessage: true });
            }
        }
    }
    catch (error) {

        throwErrorInCatch(error, 'workerAPIFetchOlderMessage');
    }
}

function* workerReceiveNewMessage(action) {
    try {
        const { data } = action;
        if (!data || !data.newMessage) {
            throw "Thieu data.newMessage";
        }
        let newMessage = { ...data.newMessage } // clone trước khi thực thi

        const activeThreadId = yield select((state) => state.ChatUnstoredReducer.activeThreadId);
        const fullThreads = yield select(state => state.ChatStoredReducer.fullThreads)
        const simpleMessages = yield select(state => state.ChatStoredReducer.simpleMessages);
        if (fullThreads[newMessage.thread_id] && simpleMessages[newMessage.thread_id]) {
            const token = yield select(state => state.AuthStoredReducer.token)
            //đánh dấu đã nhận để không kích hoạt firebase
            //backend chưa handle cái này
            //nên cứ tạm để thế này
            socket.emit('tomchat_mark_receive_message', {
                token: token,
                message_ids: [newMessage._id],
                thread_id: newMessage.thread_id,
            })

            const appState = yield select(state => state.BaseUnstoredReducer.appState);

            if (activeThreadId === newMessage.thread_id) {
                if (appState === 'foreground') {
                    socket.emit('tomchat_read_message', {
                        token: token,
                        thread_id: activeThreadId,
                        message_ids: [newMessage._id],
                    })
                }
                yield put({
                    type: Action.DOING_ANIMATE_MESSAGE,
                    ttype: 'add',
                    data: {
                        _ids: { [newMessage._id]: true }
                    }
                })
            } else {
                if (appState === 'foreground') {
                    const myFriends = yield select(state => state.FriendStoredReducer.myFriends || {});
                    const myContacts = yield select(state => state.FriendStoredReducer.myContacts || {});
                    // console.log("aaaaa123",newMessage.create_uid);
                    yield put({
                        type: BaseAction.DISPLAY_LOCAL_NOTIFICATION,
                        data: {
                            // fix lai title la ten nguoi gui
                            title: newMessage.create_uid
                                ?
                                (

                                    myFriends[newMessage.create_uid]
                                    && myFriends[newMessage.create_uid].name
                                    ||
                                    (myContacts[newMessage.create_uid]
                                        && myContacts[newMessage.create_uid].name
                                    )
                                    || ''
                                ) : '',
                            subTitle: fullThreads[newMessage.thread_id] &&
                                fullThreads[newMessage.thread_id].is_group
                                ?
                                `Đến:${fullThreads[newMessage.thread_id].name}`
                                :
                                '',
                            content: convertMessageContentForDisplayLocalNotification({
                                type: newMessage.type,
                                content: newMessage.content.content,
                                forceRawContent: true
                            }),
                            route: JSON.stringify({
                                _id: newMessage.thread_id,
                                name: 'ChatBox'
                            })
                        }
                    })
                }
            }
            yield put({
                type: Action.UPDATE_MESSAGE,
                ttype: 'receivenewmessage',
                data: newMessage,
            })
            yield put({
                type: Action.UPDATE_THREAD_LIST,
                ttype: 'receivenewmessage',
                data: {
                    thread_id: newMessage.thread_id,
                    write_date: newMessage.write_date
                }
            })
        }

        else { // chưa tồn tại trong reducer thì phải fetch
            yield put({
                type: Action.API_FETCH_FULL_THREAD_BY_THREAD_ID,
                dispatch: action.dispatch,
                data: {
                    thread_id: newMessage.thread_id
                }
            })
        }
    } catch (error) {
        throwErrorInCatch(error, 'workerReceiveNewMessage');
    }
}


function* workerChatWithSomeone(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const token = yield select(state => state.AuthStoredReducer.token);
        const myUserId = yield select(state => state.AuthStoredReducer.myUserInfo._id);
        let { contact_id } = action.data;

        if (!contact_id) {
            return true;
        }
        const fThreads = yield select(state => state.ChatStoredReducer.fullThreads);
        let foundThreadId = false;

        const arrayThreads = Object.values(fThreads);
        for (let i = 0; i < arrayThreads.length; i++) {
            if (arrayThreads[i].chat_with_user_id === contact_id) {
                foundThreadId = arrayThreads[i]._id;
                break;
            }
        }

        if (foundThreadId) {
            yield put({
                type: Action.UPDATE_ACTIVE_THREAD,
                data: foundThreadId
            });

            const resetAction = CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Home', screen: 'Chat' },
                    { name: 'ChatBox', params: { threadId: foundThreadId } }
                ],
            });
            action.navigation.dispatch(resetAction);
            return true;
        }
        yield put({
            type: AuthAction.UPDATE_BEAUTY_LOADING,
            data: true
        })
        let response = yield call(WorkerChatToDo, {
            method: 'POST',
            functionName: '/api/createNewThreadPersonal',
            token: token,
            payload: {
                data: {
                    other_user_id: contact_id
                }
            }
        });
        const {
            simpleThreads, fullThreads,
            pinMessages,
            simpleMessages, fullMessages,
            pollAnswers,
            messageReactions, messageStates,
            threadMembers
        } = response;

        if (!simpleThreads) {
            return true;
        }
        yield put({
            type: Action.UPDATE_THREAD_MEMBER,
            data: { threadMembers }
        })
        yield put({
            type: Action.UPDATE_MESSAGE,
            ttype: 'fetchmessage',
            data: {
                simpleMessages,
                fullMessages
            },
        })
        yield put({
            type: Action.UPDATE_THREAD_LIST,
            ttype: 'new_thread',
            data: {
                simpleThreads,
                fullThreads
            }
        })
        yield put({
            type: Action.UPDATE_ACTIVE_THREAD,
            data: simpleThreads[0]._id
        });

        yield put({
            type: Action.UPDATE_PIN_MESSAGE,
            ttype: 'fetch',
            data: { pinMessages }
        })
        yield put({
            type: Action.UPDATE_POLL_ANSWER_RESULT,
            ttype: 'fetch',
            data: { pollAnswers }
        })
        yield put({
            type: Action.UPDATE_MESSAGE_REACTION,
            data: { messageReactions }
        })
        yield put({
            type: Action.UPDATE_MESSAGE_STATE,
            data: { messageStates }
        })


        yield put({
            type: AuthAction.UPDATE_BEAUTY_LOADING,
            data: false
        })

        action.navigation.dispatch(CommonActions.reset({
            index: 1,
            routes: [
                { name: 'Home', screen: 'Chat' },
                { name: 'ChatBox', params: { threadId: simpleThreads[0]._id } }
            ],
        }));
    }
    catch (error) {
        yield put({
            type: AuthAction.UPDATE_BEAUTY_LOADING,
            data: false
        })
        throwErrorInCatch(error, 'workerChatWithSomeone');
    }
}

// sửa lại để băn socket từ backend
function* workerAPICreateThreadGroup(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        let activeUserId = yield select((state) => state.AuthStoredReducer.myUserInfo._id);
        let { contact_ids, name, navigation, setResBack } = action.data;
        if (contact_ids.length < 2 && !name) {
            yield put({
                type: AuthAction.UPDATE_ERROR,
                data: { error: 'Hãy thêm thành viên và đặt tên nhóm' }
            })
            return true;
        }
        if (contact_ids.length < 2) {
            yield put({
                type: AuthAction.UPDATE_ERROR,
                data: { error: 'Hãy thêm thành viên' }
            })
            return true;
        }
        if (!name) {
            yield put({
                type: AuthAction.UPDATE_ERROR,
                data: { error: 'Hãy nhập tên nhóm' }
            })
            return true;
        }

        const myId = contact_ids.filter(f => f === activeUserId)

        let userIds;
        if (myId) {
            userIds = [...contact_ids, activeUserId]
        }
        // let Subscriber = contact_ids.map(user => {
        //     return Object.assign({}, {
        //         user: user._id,
        //         name: user._id === activeUserId ? myUserInfo[activeUserId].name : myUserInfo[activeUserId].name,
        //         role: user._id === activeUserId ? 'admin' : 'member'
        //     })
        // })
        const token = yield select(state => state.AuthStoredReducer.token)
        let response = yield call(WorkerChatToDo, {
            method: 'POST',
            functionName: '/api/createNewThreadGroup',
            token: token,
            payload: {
                data: {
                    name: name,
                    members: userIds,
                }
            }
        })
        yield call(InteractionManager.runAfterInteractions);
        if (!response.fullThreads || !response.simpleThreads) {
            yield put({
                type: AuthAction.UPDATE_ERROR,
                data: { error: response.message }
            })
        }


        const { simpleThreads, fullThreads, threadMembers } = response;
        if (!simpleThreads) {
            action.setState({
                loading: false
            })
            return true;
        }
        yield put({
            type: AuthAction.UPDATE_BEAUTY_LOADING,
            data: true
        })
        yield put({
            type: Action.UPDATE_THREAD_MEMBER,
            data: {
                threadMembers
            }
        })
        // yield spawn(workerUpdateThreadMember, {
        //     data: { threadMembers }

        // })
        yield put({
            type: Action.UPDATE_THREAD_LIST,
            ttype: 'new_thread',
            data: { simpleThreads, fullThreads }
        })
        yield put({
            type: Action.UPDATE_MESSAGE,
            ttype: 'fetchmessage',
            data: {
                simpleMessages: { [simpleThreads[0]._id]: [] },
                fullMessages: {}
            },
        })
        // if (action.androidMessage) {
        //     action.androidMessage().subscribeToTopic(simpleThreads[0]._id);
        // }

        yield put({
            type: Action.UPDATE_ACTIVE_THREAD,
            data: simpleThreads[0]._id
        })
        if (navigation) {
            navigation.goBack();
            setTimeout(() => {
                navigation.navigate('ChatBox', {
                    threadId: simpleThreads[0]._id
                })
            }, 500);
        }
    } catch (error) {

        throwErrorInCatch(error, 'workerAPICreateThreadGroup')
    }
}



function* workerResendUnFinishMessage(action) {
    try {
        const fullMessages = yield select(state => state.ChatStoredReducer.fullMessages);
        const unfinishedMessages = yield select(state => state.ChatStoredReducer.unfinishedMessages);
        if (!unfinishedMessages) return true
        let uFMES = Object.keys({ ...unfinishedMessages });
        for (let i = 0; i < uFMES.length; i++) {
            let _id = uFMES[i];
            //Ko có message trong fullMessage thì delete luôn
            //Chỉ xóa những message có _id là giá giá trị _id tương ứng vì những message đó chưa gửi được
            if (!fullMessages[_id]) {
                yield put({
                    type: Action.UPDATE_UNFINISHED_SEND_MESSAGE,
                    ttype: 'remove_message_due_to_duplicate_draft_id',
                    data: { _id: _id }
                })
                continue; //qua vòng for tiếp theo
            }
            //message này đã gửi thành công, chỉ xóa trong unfinisedMessages
            //vì có _id khác draft_id
            if (fullMessages[_id]._id !== fullMessages[_id].draft_id) {
                yield put({
                    type: Action.UPDATE_UNFINISHED_SEND_MESSAGE,
                    ttype: 'remove',
                    data: { _id: _id }
                })
                continue; //qua vòng for tiếp theo
            }
            //message chưa gửi thành công
            if (fullMessages[_id].type === 'text' || fullMessages[_id].type === 'sticker') {
                yield put({
                    type: Action.API_SEND_MESSAGE,
                    data: fullMessages[_id]
                })
            } else if (fullMessages[_id].type === 'image') {
                //phải dùng yield spawn vì cần chạy qua vòng for tiếp theo
                //yield put có thể ko chạy qua vòng for tiếp theo vì action này cần nhiều time
                yield spawn(workerSendDraftImageMessage, {
                    data: fullMessages[_id],
                    dispatch: action.dispatch
                })
            } else if (fullMessages[_id].type === 'image_group') {
                //phải dùng yield spawn vì cần chạy qua vòng for tiếp theo
                //yield put có thể ko chạy qua vòng for tiếp theo vì action này cần nhiều time
                yield spawn(workerUploadImageGroup, {
                    data: {
                        _id: _id
                    },
                    dispatch: action.dispatch
                })
            }
        }
    }
    catch (error) {
        throwErrorInCatch(error, 'workerResendUnFinishMessage')
    }
}

// sửa lại để băn socket từ backend
function* workerAPIAddNewMemberToThread(action) {
    /// 
    try {
        let activeThreadId = yield select(state => state.ChatUnstoredReducer.activeThreadId);
        let { selectedUsers, navigation } = action.data;
        if (selectedUsers.length === 0) {
            yield put({
                type: AuthAction.UPDATE_ERROR,
                data: { error: 'Hãy chon thanh vien' }
            })
            return true
        }
        const token = yield select(state => state.AuthStoredReducer.token)
        let response = yield call(WorkerChatToDo, {
            method: 'POST',
            functionName: '/api/addMember',
            token: token,
            payload: {
                data: {
                    thread_id: activeThreadId,
                    someone_ids: selectedUsers
                }
            }

        });
        const { threadMembers } = response
        yield put({
            type: AuthAction.UPDATE_BEAUTY_LOADING,
            data: true
        })
        yield put({
            type: Action.UPDATE_THREAD_MEMBER,
            data: {
                threadMembers
            }
        })
        const thread_id = Object.keys(threadMembers)[0]
        if (navigation) {
            navigation.goBack();
            setTimeout(() => {
                navigation.navigate('ChatBox', {
                    threadId: thread_id
                })
            }, 500);
        }
    }
    catch (error) {

        throwErrorInCatch(error, 'erroraddMemberToThreadChat');
    }

}

// function* workerSomeoneReadMessaage(action) {
//     try {
//         yield spawn(workerUpdateMessageState, {
//             ttype: 'markread',
//             data: action.data,
//             donotcompute: true,
//         })
//     }
//     catch (error) {
//         // // 
//     }
// }

// function* workerPinThread(action) {
//     try {


//         ;
//         yield fork(WorkerChatToDo, {
//             method: 'POST',
//             functionName: '/api/createPinOfThreadChat',
//             token: token,
//             payload: {
//                 data: {
//                     thread_id: action.data.thread_id
//                 }
//             }
//         })
//     }
//     catch (error) {
//         // // 
//     }
// }

// function* workerUnpinThread(action) {
//     try {


//         ;
//         yield call(WorkerChatToDo, {
//             method: 'POST',
//             functionName: '/api/deletePinOfThreadChat',
//             token: token,
//             payload: {
//                 data: {
//                     thread_id: action.data.thread_id
//                 }
//             }
//         })
//     }
//     catch (error) {
//         // // 
//     }
// }

function* workerIHaveSentMessage(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const fullThreads = yield select(state => state.ChatStoredReducer.fullThreads);
        const simpleMessages = yield select(state => state.ChatStoredReducer.simpleMessages);
        const fullMessages = yield select(state => state.ChatStoredReducer.fullMessages);
        let { newMessage } = action.data;
        let { thread_id } = newMessage
        // if (!simpleMessages[newMessage.thread_id]) {
        //     yield spawn(workerAPIFetchFullThreadByThreadId, {
        //         data: { thread_id }
        //     })
        // }

        if (fullThreads[newMessage.thread_id] && simpleMessages[newMessage.thread_id]) {
            yield put({
                type: Action.UPDATE_THREAD_LIST,
                ttype: 'receivenewmessage',
                data: {
                    thread_id: newMessage.thread_id,
                    write_date: newMessage.write_date
                }
            })

            //Chính thiết bị này gửi tin nhắn ảnh vì đã có draft_id đó trong fullMessages
            if (newMessage.type === 'image' && fullMessages[newMessage.draft_id]) {
                const listFiles = yield select(state => state.ChatStoredReducer.listFiles);
                let new_file_id = newMessage.content._id;
                let old_file_id = fullMessages[newMessage.draft_id].content._id;
                //bắt buộc phải dùng yield put và yield take
                //vì nếu dùng yield spawn thì thông tin nạp message ở dưới sẽ nhanh hơn nạp hình ảnh
                //dẫn đến hình ảnh sẽ có _id mới, lúc đó dispatchimage sẽ trigger tải lại ảnh từ cloud vì _id ko còn
                //nên dùng yield put, take để nạp lại reducer image trước
                yield put({
                    type: Action.UPDATE_MY_FILE,
                    ttype: 'add_file',
                    data: {
                        [new_file_id + '_lowprofile']: listFiles[`${old_file_id}_lowprofile`]
                    },
                })
                // yield take(Action.UPDATE_MY_FILE_SUCCESS);
            }


            else if (newMessage.type === 'file' && fullMessages[newMessage.draft_id]) {
                const listFiles = yield select(state => state.ChatStoredReducer.listFiles);
                let new_file_id = newMessage.content._id;
                let old_file_id = fullMessages[newMessage.draft_id].content._id;
                //bắt buộc phải dùng yield put và yield take
                //vì nếu dùng yield spawn thì thông tin nạp message ở dưới sẽ nhanh hơn nạp hình ảnh
                //dẫn đến hình ảnh sẽ có _id mới, lúc đó dispatchimage sẽ trigger tải lại ảnh từ cloud vì _id ko còn
                //nên dùng yield put, take để nạp lại reducer image trước
                yield put({
                    type: Action.UPDATE_MY_FILE,
                    ttype: 'add_file',
                    data: {
                        [new_file_id + '_file']: listFiles[`${old_file_id}_file`]
                    },
                })
                // yield take(Action.UPDATE_MY_FILE_SUCCESS);
            }

            //Chính thiết bị này gửi tin nhắn nhóm ảnh vì đã có draft_id đó trong fullMessages
            else if (newMessage.type === 'image_group' && fullMessages[newMessage.draft_id]) {

            }
            //Chính thiết bị này gửi video vì đã có draft_id đó trong fullMessages
            else if (newMessage.type === 'video' && fullMessages[newMessage.draft_id]) {

            }

            if (!fullMessages[newMessage.draft_id]) {
                yield put({
                    type: Action.DOING_ANIMATE_MESSAGE,
                    ttype: 'add',
                    data: {
                        _ids: { [newMessage._id]: true }
                    }
                })
            } else {
                yield put({
                    type: Action.UPDATE_UNFINISHED_SEND_MESSAGE,
                    ttype: 'remove',
                    data: { _id: newMessage.draft_id }
                })
            }
            yield put({
                type: Action.UPDATE_MESSAGE,
                ttype: 'ihavesentmessage',
                data: newMessage
            })
        } else {
            yield put({
                type: Action.API_FETCH_FULL_THREAD_BY_THREAD_ID,
                data: {
                    thread_id: newMessage.thread_id
                },
                dispatch: action.dispatch,
            })

        }
    } catch (error) {
        throwErrorInCatch(error, 'workerIHaveSentMessage1111111');
    }
}

function* workerAPIDeleteMessage(action) {
    try {
        // _id 
        const fullMessages = yield select(state => state.ChatStoredReducer.fullMessages)
        const message = fullMessages[action.data._id]
        const token = yield select(state => state.AuthStoredReducer.token)
        if (message._id === message.draft_id) {
            yield put({
                type: Action.UPDATE_MESSAGE,
                ttype: 'deletemessage',
                data: {
                    thread_id: message.thread_id,
                    message_id: message._id
                }
            })

            yield put({
                type: Action.UPDATE_UNFINISHED_SEND_MESSAGE,
                ttype: 'remove',
                data: {
                    _id: action.data._id
                }
            })
        } else {

            yield fork(WorkerChatToDo, {
                method: 'POST',
                functionName: '/api/deleteMessage',
                token: token,
                payload: {
                    data: {
                        message_id: message._id
                    }
                }
            })

        }
    }
    catch (error) {
        // // 
    }
}

// lowprofile
function* workerAPIDownloadImage(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const token = yield select(state => state.AuthStoredReducer.token);
        const { content } = action.data;
        if (!content._id || !content.link) {
            throw 'thieu du lieu loi roi'
        }
        const localId = ObjectID().toString();
        let suffix = content.link.split('.')[3];
        RNFS.exists(`${RNFS.DocumentDirectoryPath}/images`).then(exist => {
            if (!exist) {
                RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/images`)
            }
        }).then(() => {
            //     return RNFS.exists(`${RNFS.DocumentDirectoryPath}/images/${content._id}_lowprofile.${suffix}`);
            // }).then(exist => {
            //     if (exist) {
            //         return true;
            //     } else {
            return RNFS.downloadFile({
                fromUrl: `${content.link}?token=${token}&height=${_computeNiceRatioForLowResolutionImage(content.metadata).height}`,
                headers: {
                    Authorization: 'Tomaho ' + token
                },
                // toFile: `${RNFS.DocumentDirectoryPath}/images/${content._id}_lowprofile.${suffix}`,
                toFile: `${RNFS.DocumentDirectoryPath}/images/${localId}.${suffix}`,
                backgroundTimeout: 0,
                readTimeout: 15000,
                connectionTimeout: 15000,
                progress: res => {

                },
                progressDivider: 10,
            }).promise
            // }
        }).then(async file => {
            if (file.bytesWritten > 0) {
                if (!action.init) {
                }
                action.dispatch({
                    type: Action.UPDATE_MY_FILE,
                    ttype: 'add_file',
                    data: {
                        [`${content._id}_lowprofile`]: `${Platform.OS === 'android' ? 'file://' : ''}${RNFS.DocumentDirectoryPath}/images/${localId}.${suffix}`
                    },
                })
            }
            // else {
            //     if (file === true) {
            //         action.dispatch({
            //             type: Action.UPDATE_MY_FILE,
            //             ttype: 'add_file',
            //             data: {
            //                 [`${content._id}_lowprofile`]: `${Platform.OS === 'android' ? 'file://' : ''}${RNFS.DocumentDirectoryPath}/images/${content._id}_lowprofile.${suffix}`
            //             },
            //         })
            //     } else {
            //         throw 'download image loi roi'
            //     }
            // }
        }).catch(error => {

        })
    } catch (error) {

    }
}

function* workerAPIDownloadImageHighQuality(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const token = yield select(state => state.AuthStoredReducer.token);
        const { content } = action.data;
        if (!content._id || !content.link) {
            throw 'thieu du lieu loi roi'
        }
        const localId = ObjectID().toString();
        let suffix = content.link.split('.')[3];
        RNFS.exists(`${RNFS.DocumentDirectoryPath}/images`).then(exist => {
            if (!exist) {
                RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/images`)
            }
        }).then(() => {
            //     return RNFS.exists(`${RNFS.DocumentDirectoryPath}/images/${content._id}_highprofile.${suffix}`);
            // }).then(exist => {
            //     if (exist) {
            //         return true;
            //     } else {
            return RNFS.downloadFile({
                fromUrl: `${content.link}?token=${token}`,
                headers: {
                    Authorization: 'Tomaho ' + token
                },
                toFile: `${RNFS.DocumentDirectoryPath}/images/${localId}.${suffix}`,
                backgroundTimeout: 0,
                readTimeout: 15000,
                connectionTimeout: 15000,
            }).promise
            // }
        }).then(async file => {
            if (file.bytesWritten > 0) {
                action.dispatch({
                    type: Action.UPDATE_MY_FILE,
                    ttype: 'add_file',
                    data: {
                        [`${content._id}_highprofile`]: `${Platform.OS === 'android' ? 'file://' : ''}${RNFS.DocumentDirectoryPath}/images/${localId}.${suffix}`
                    },
                })
            }
            // else {
            //     if (file === true) {
            //         action.dispatch({
            //             type: Action.UPDATE_MY_FILE,
            //             ttype: 'add_file',
            //             data: {
            //                 [`${content._id}_highprofile`]: `${Platform.OS === 'android' ? 'file://' : ''}${RNFS.DocumentDirectoryPath}/images/${content._id}_highprofile.${suffix}`
            //             },
            //         })
            //     } else {
            //         throw 'download image loi roi'
            //     }
            // }
        }).catch(error => {

        })
    } catch (error) {

    }
}

function* workerAPIDownloadFile(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const token = yield select(state => state.AuthStoredReducer.token);
        const { content } = action.data;
        if (!content.content._id || !content.content.link) {
            throw 'thieu du lieu loi roi'
        }
        let suffix = content.content.link.split('.')[3];

        RNFS.exists(`${RNFS.DocumentDirectoryPath}/files`).then(exist => {
            if (!exist) {
                RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/files`)
            }
        }).then(() => {
            return RNFS.exists(`${RNFS.DocumentDirectoryPath}/files/${content.content._id}.${suffix}`);
        }).then(exist => {
            if (exist) {
                return true;
            } else {
                return RNFS.downloadFile({
                    fromUrl: `${content.content.link}?token=${token}`,
                    headers: {
                        Authorization: 'Tomaho ' + token
                    },
                    toFile: `${RNFS.DocumentDirectoryPath}/files/${content.content._id}.${suffix}`,
                    backgroundTimeout: 0,
                    readTimeout: 60000,
                    connectionTimeout: 60000,
                }).promise
            }
        }).then(async file => {
            if (file.bytesWritten > 0) {
                action.dispatch({
                    type: Action.UPDATE_MY_FILE,
                    ttype: 'add_file',
                    data: {
                        [`${content.content._id}`]: `${Platform.OS === 'android'
                            ?
                            'file://'
                            :
                            ''}${RNFS.DocumentDirectoryPath}/files/${content.content._id}.${suffix}`,
                    },
                })
            } else {
                if (file === true) {
                    action.dispatch({
                        type: Action.UPDATE_MY_FILE,
                        ttype: 'add_file',
                        data: {
                            [`${content._id}`]: `${Platform.OS === 'android'
                                ? 'file://'
                                :
                                ''}${RNFS.DocumentDirectoryPath}/files/${content._id}.${suffix}`,
                        },

                    })
                } else {
                    throw 'download file loi roi'
                }
            }
        }).catch(error => {
        })
    } catch (error) {
        console.log('err', error)
    }
}


function* workerAPIDownloadFileMe(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const token = yield select(state => state.AuthStoredReducer.token);
        const { content } = action.data;

        if (!content._id || !content.link) {
            throw 'thieu du lieu loi roi'
        }
        let suffix = content.link.split('.')[3];
        RNFS.exists(`${RNFS.DocumentDirectoryPath}/files`).then(exist => {
            if (!exist) {
                RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/files`)
            }
        }).then(() => {
            return RNFS.exists(`${RNFS.DocumentDirectoryPath}/files/${content._id}.${suffix}`);
        }).then(exist => {
            if (exist) {
                return true;
            } else {
                return RNFS.downloadFile({
                    fromUrl: `${content.link}?token=${token}`,
                    headers: {
                        Authorization: 'Tomaho ' + token
                    },
                    toFile: `${RNFS.DocumentDirectoryPath}/files/${content._id}.${suffix}`,
                    backgroundTimeout: 0,
                    readTimeout: 60000,
                    connectionTimeout: 60000,
                }).promise
            }
        }).then(async file => {
            if (file.bytesWritten > 0) {
                action.dispatch({
                    type: Action.UPDATE_MY_FILE,
                    ttype: 'add_file',
                    data: {
                        [`${content._id}`]: `${Platform.OS === 'android'
                            ?
                            'file://'
                            :
                            ''}${RNFS.DocumentDirectoryPath}/files/${content._id}.${suffix}`,
                    },
                })
            } else {
                if (file === true) {
                    action.dispatch({
                        type: Action.UPDATE_MY_FILE,
                        ttype: 'add_file',
                        data: {
                            [`${content._id}`]: `${Platform.OS === 'android'
                                ? 'file://'
                                :
                                ''}${RNFS.DocumentDirectoryPath}/files/${content._id}.${suffix}`,
                        },

                    });

                } else {
                    throw 'download file loi roi'
                }
            }
        }).catch(error => {
        })
    } catch (error) {
        console.log('err', error)
    }
}


function* workerDownloadAvatar(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const token = yield select(state => state.AuthStoredReducer.token);
        let data = action.data;
        if (Array.isArray(data)) {
            data = data[0]
        };
        let cloudLink = data.url;
        if (!cloudLink) {
            return true;
        }
        const id = ObjectID().toString();
        const splitLinkByDot = cloudLink.split('.');
        const fileTail = splitLinkByDot[splitLinkByDot.length - 1];
        const localLink = `${RNFS.DocumentDirectoryPath}/avatars/${id}.${fileTail}`;
        RNFS.exists(`${RNFS.DocumentDirectoryPath}/avatars`).then(res => {
            if (!res) {
                RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/avatars`)
            }
        }).then(res => {
            return RNFS.downloadFile({
                fromUrl: `${cloudLink}?token=${token}&height=100`,
                headers: { Authorization: 'Tomaho ' + token },
                toFile: localLink,
                backgroundTimeout: 0,
                readTimeout: 15000,
                connectionTimeout: 15000,
            }).promise;
        }).then(res => {
            if (res && res.bytesWritten > 150) {
                if (action.dispatch) {
                    action.dispatch({
                        type: Action.UPDATE_DOWNLOAD_AVATAR,
                        ttype: 'add',
                        data: {
                            [cloudLink]: `${Platform.OS === 'android' ? 'file://' : ''}${localLink}`
                        }
                    })
                }
            }
        }).catch(error => {
            //do nothing
            throwErrorInCatch(error, 'workerDownloadAvatar 1');
        })
    } catch (error) {
        throwErrorInCatch(error, 'workerDownloadAvatar 2');
    }
}


function* workerAnnounceOnline(action) {
    try {
        // let { activeUserId, myUserInfo } = yield select((state) => state.AuthStoredReducer);
        // yield fork(WorkerMobileRaiseOnline, { token: myUserInfo.token, myUserInfo: myUserInfo[activeUserId] })
    }
    catch (error) {

    }
}

function* workerUpdateOnlineUser(action) {
    try {
        let { myOnlineUser } = yield select((state) => state.ChatUnstoredReducer);
        let populatedOnlineUser = myOnlineUser;
        if (action.user_id) {
            populatedOnlineUser[action.user_id] = new Date().getTime();
        }
        yield put({
            type: 'UPDATE_ONLINE_USER_SUCCESS',
            data: populatedOnlineUser
        })
    } catch (error) {
        throwErrorInCatch(error, "workerUpdateOnlineUser");

    }
}


function handleUploadSingleThreadAvatar(action) {
    return RNFS.exists(`${RNFS.DocumentDirectoryPath}/avatars`).then(exist => {
        if (!exist) {
            RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/avatars`)
        }
    }).then(() => {
        return RNFS.readFile(action.data.uri, 'base64');
    }).then(file => {
        RNFS.writeFile(`${RNFS.DocumentDirectoryPath}/avatars/${action.data.thread_id}`, file, 'base64');
    }).catch(error => {
        // // 
    })
}

function* workerSendReactionToMessage(action) {
    try {

        const { message_id, reaction_type } = action.data;
        const token = yield select(state => state.AuthStoredReducer.token);

        if (!message_id || !reaction_type) {
            return true
        }
        else {
            socket.emit('tomchat_send_reaction', {
                token,
                message_id,
                reaction_type,
            })

        }
    }
    catch (error) {
        throwErrorInCatch(error, "workerSendReactionToMessage");
    }
}

function* workerReceiveReactionToMessage(action) {
    try {
        const { fullThreads, fullMessages } = yield select((state) => state.ChatStoredReducer)
        const { thread_id, message_id } = action.data;
        if (fullThreads[thread_id] && fullMessages[message_id]) {
            yield spawn(workerUpdateAnimateMessageReaction, {
                ttype: 'add',
                data: action.data
            })
            yield spawn(workerUpdateMessageReaction, {
                data: [action.data],
                message_id: action.data.message_id
            })
        }
    }
    catch (error) {
    }
}

function* workerAPIUpdateThreadName(action) {
    try {
        const token = yield select(state => state.AuthStoredReducer.token);
        let { thread_id, newThreadName } = action.data

        let response = yield call(WorkerChatToDo, {
            method: 'POST',
            timeout: 15000,
            functionName: '/api/changeThreadName',
            token: token,
            payload: {
                data: {
                    thread_id: thread_id,
                    name: newThreadName,
                }
            }
        });
        const { simpleThreads, fullThreads } = response;
        if (!simpleThreads) return true;
        yield put({
            type: Action.UPDATE_THREAD_LIST,
            ttype: "change_thread_field",
            data: { simpleThreads, fullThreads }
        })
        action.setChangeThreadName(false)

    }
    catch (error) {
        // console.log("error", error);
    }
}
function* workerAPIUpdateThreadPermission(action) {

    try {

        const token = yield select(state => state.AuthStoredReducer.token);
        let { thread_id, who_can_edit_thread } = action.data
        let response = yield call(WorkerChatToDo, {
            method: 'POST',
            timeout: 15000,
            functionName: '/api/changeThreadSetting',
            token: token,
            payload: {
                data: {
                    thread_id: thread_id,
                    setting_name: "who_can_edit_thread",
                    setting_value: who_can_edit_thread,
                }
            }
        });
        const { simpleThreads, fullThreads } = response;
        if (!simpleThreads || !fullThreads) return true;
        else {
            yield put({
                type: Action.UPDATE_THREAD_LIST,
                ttype: "change_thread_field",
                data: { simpleThreads, fullThreads }
            })
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION,
                data: "Cập nhật quyền chỉnh sửa thông tin nhóm thành công"
            })
        }
        action.setShowPermission(false)
    }
    catch (error) {
        // console.log("error", error);
    }
}
function* workerAPIUpdateThreadPollMessage(action) {

    try {

        const token = yield select(state => state.AuthStoredReducer.token);
        let { thread_id, who_can_create_poll_message } = action.data
        let response = yield call(WorkerChatToDo, {
            method: 'POST',
            timeout: 15000,
            functionName: '/api/changeThreadSetting',
            token: token,
            payload: {
                data: {
                    thread_id: thread_id,
                    setting_name: "who_can_create_poll_message",
                    setting_value: who_can_create_poll_message,
                }
            }
        });

        const { simpleThreads, fullThreads } = response;
        if (!simpleThreads || !fullThreads) return true;
        else {
            yield put({
                type: Action.UPDATE_THREAD_LIST,
                ttype: "change_thread_field",
                data: { simpleThreads, fullThreads }
            })
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION,
                data: "Cập nhật quyền tạo bình chọn thành công",
            })
        }
        action.setShowPermission(false)
    }
    catch (error) {
        console.log("error", error);
    }
}
function* workerAPIUpdateThreadSendMessage(action) {
    try {

        const token = yield select(state => state.AuthStoredReducer.token);
        let { thread_id, who_can_send_message } = action.data

        let response = yield call(WorkerChatToDo, {
            method: 'POST',
            timeout: 15000,
            functionName: '/api/changeThreadSetting',
            token: token,
            payload: {
                data: {
                    thread_id: thread_id,
                    setting_name: "who_can_send_message",
                    setting_value: who_can_send_message,
                }
            }
        });

        const { simpleThreads, fullThreads } = response;
        if (!simpleThreads || !fullThreads) return true;
        else {
            yield put({
                type: Action.UPDATE_THREAD_LIST,
                ttype: "change_thread_field",
                data: { simpleThreads, fullThreads }
            })
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION,
                data: "Cập nhật quyền gửi tin nhắn thành công"
            })
        }
        action.setShowPermission(false)
    }
    catch (error) {
        // console.log("error", error);

    }
}
function* workerAPIUpdateThreadPinMessage(action) {
    try {

        const token = yield select(state => state.AuthStoredReducer.token);
        let { thread_id, who_can_pin_message } = action.data
        let response = yield call(WorkerChatToDo, {
            method: 'POST',
            timeout: 15000,
            functionName: '/api/changeThreadSetting',
            token: token,
            payload: {
                data: {
                    thread_id: thread_id,
                    setting_name: "who_can_pin_message",
                    setting_value: who_can_pin_message,
                }
            }
        });
        const { simpleThreads, fullThreads } = response;
        if (!simpleThreads || !fullThreads) return true;
        else {
            yield put({
                type: Action.UPDATE_THREAD_LIST,
                ttype: "change_thread_field",
                data: { simpleThreads, fullThreads }
            })
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION,
                data: "Cập nhật quyền ghim tin nhắn thành công!",
            })
        }
        action.setShowPermission(false)
    }
    catch (error) {
        // console.log("error", error);
    }
}
function* workerAPIUpdateThreadJoinCondition(action) {
    try {

        const token = yield select(state => state.AuthStoredReducer.token);
        let { thread_id, join_condition } = action.data
        let response = yield call(WorkerChatToDo, {
            method: 'POST',
            timeout: 15000,
            functionName: '/api/changeThreadSetting',
            token: token,
            payload: {
                data: {
                    thread_id: thread_id,
                    setting_name: "join_condition",
                    setting_value: join_condition,
                }
            }
        });
        const { simpleThreads, fullThreads } = response;
        if (!simpleThreads || !fullThreads) return true;
        else {
            yield put({
                type: Action.UPDATE_THREAD_LIST,
                ttype: "change_thread_field",
                data: { simpleThreads, fullThreads }
            })
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION,
                data: "Cập nhật quyền mời thành viên thành công!"
            })
        }
        action.setShowPermission(false)
    }
    catch (error) {
        // console.log("error", error);
    }
}

function* workerAPISearchMessageInThreadByContent(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        let activeUserId = yield select(state => state.AuthStoredReducer.myUserInfo._id);
        let threadMessages = yield select(state => state.ChatStoredReducer.threadMessages)
        if (action.doSearchLocal) {
            let messages = without(Object.values(threadMessages[action.thread_id]).map(message => {
                if (message.thread_id._id !== action.thread_id) {
                    return null;
                }
                if (message && message.type === 'text' && !message.is_removed) {
                    if (message.content.toLowerCase().includes(action.searchMessageContent.toLowerCase())) {
                        return message;
                    } else {
                        return null;
                    }
                }
                return null
            }), null);
            if (messages.length > 0) {
                action.addMessages(messages);
            }
        } else {
            let { activeUserId, myUserInfo } = yield select((state) => state.AuthStoredReducer);


            let Messages = yield call(WorkerChatToDo, {
                method: 'POST',
                functionName: '/api/searchMessageByText',
                token: token,
                payload: {
                    data: {
                        content: action.searchMessageContent,
                        thread_id: action.thread_id,
                        ignore_ids: action.foundMessages
                            ?
                            action.foundMessages.map(message => message._id)
                            :
                            []
                    }
                }
            })
            yield call(InteractionManager.runAfterInteractions);
            if (!Messages.status && !Messages.message && Array.isArray(Messages)) {
                // Messages = yield call(generatorPrepareMessage, { data: Messages })
                action.addMessages(Messages);
            }
            if (action.endLoadMore) {
                action.endLoadMore();
            }
        }
    } catch (error) {
    }
}

function* workerAPISearchThreadByThreadName(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);

    } catch (error) {
    }
}

function* workerPressThreadOnSearchedThreadList(action) {
    try {
        if (!action.data.thread_id) {
            return true;
        }

    } catch (error) {

    }
}

function* workerAPIPinMessage(action) {
    try {
        const token = yield select(state => state.AuthStoredReducer.token);
        let { thread_id, message_id } = action.data;
        let res = yield call(WorkerChatToDo, {
            method: 'POST',
            functionName: '/api/pinMessage',
            token: token,
            payload: {
                data: {
                    thread_id: thread_id,
                    message_id: message_id,
                }
            }
        })
    }
    catch (error) {

    }
}

function* workerAPIUnpinMessage(action) {
    try {
        const token = yield select(state => state.AuthStoredReducer.token);
        let { thread_id, message_id } = action.data;
        let res = yield call(WorkerChatToDo, {
            method: 'POST',
            functionName: '/api/unpinMessage',
            token: token,
            payload: {
                data: {
                    thread_id: thread_id,
                    message_id: message_id,
                }
            }
        })
    } catch (error) {

    }
}



// function* workerUpdatePinMessage(action) {
//     try {
//         yield call(InteractionManager.runAfterInteractions);
//         }
//         switch (action.ttype) {
//             case 'init': {
//                 yield put({
//                     type: Action.UPDATE_PIN_MESSAGE_SUCCESS,
//                     data: {
//                         ...action.data
//                     }
//                 })
//                 break;
//             }
//             case 'fetchbylasttime': {
//                 forEach(action.data, (dat, thread_id) => {
//                     if (dat.pin) {
//                         } else {
//                         }
//                     }
//                             // m là id nhé, ko phải object
//                             let indexOfToRemove = toReplacedPinnedMessages.findIndex(i => i._id === m);
//                             if (indexOfToRemove > -1) {
//                                 toReplacedPinnedMessages.splice(indexOfToRemove, 1);
//                             }
//                         })
//                     }
//                 })
//                 yield put({
//                     type: Action.UPDATE_PIN_MESSAGE_SUCCESS,
//                 })
//                 break;
//             }
//             case 'pin': {
//                 let data = action.data;
//                 if (data.thread_id && data.message) {
//                     } else {
//                             [data.thread_id]: [data.message]
//                         })
//                     }
//                     yield put({
//                         type: Action.UPDATE_PIN_MESSAGE_SUCCESS,
//                     })
//                 }
//                 break;
//             }
//             case 'unpin': {
//                 let data = action.data;
//                 if (data.thread_id && data.message_id) {
//                             if (m._id === data.message_id) {
//                                 return false;
//                             } else {
//                                 return m;
//                             }
//                         }), false);
//                         yield put({
//                             type: Action.UPDATE_PIN_MESSAGE_SUCCESS,
//                         })
//                     }
//                 }
//                 break;
//             }
//             case 'leavethread': {
//                 yield put({
//                     type: Action.UPDATE_PIN_MESSAGE_SUCCESS,
//                 })
//                 break;
//             }
//             default:
//                 break;
//         }
//     } catch (error) {
//     }
// }


//
//Dùng biến bên trong watcher để tránh việc tính toán lại trong useSelector của các component
//Vì biến này ko cần expose ra component
let localVarToKeepPreviousViewableMessageIds = [];
function* workerDoStuffViewableInMessageZone(action) {
    try {
        const { thread_id, message_ids } = action.data;
        if (!thread_id || !message_ids || message_ids.length < 1) return true;
        let sortedMessageIds = message_ids.sort();
        //chẳng bao giờ thấy chạy vào đây, khó hiểu vãi
        if (isEqual(localVarToKeepPreviousViewableMessageIds, sortedMessageIds)) {
            return true;
        }
        const { fullMessages, listMessageStates = {} } = yield select((state) => state.ChatStoredReducer);
        const { willAnimateMessage } = yield select((state) => state.ChatUnstoredReducer);
        let activeUserId = yield select((state) => state.AuthStoredReducer.myUserInfo._id);
        let toMarkReadIds = [], toOffAnimate = [];
        message_ids.forEach(id => {
            if (fullMessages[id] && fullMessages[id].create_uid !== activeUserId &&
                !listMessageStates[id]) {
                toMarkReadIds.push(id);
            }
            if (willAnimateMessage[id]) {
                toOffAnimate.push(id);
            }
        })
        if (toOffAnimate.length > 0) {
            yield put({
                type: Action.DOING_ANIMATE_MESSAGE,
            });
        }
        if (toMarkReadIds.length > 0) {
            const appState = yield select(state => state.BaseUnstoredReducer.appState);
            const token = yield select(state => state.AuthStoredReducer.token);
            if (appState === 'foreground') {
                socket.emit('tomchat_read_message', {
                    token: token,
                    thread_id,
                    message_ids: toMarkReadIds,
                })
            }
        }
        localVarToKeepPreviousViewableMessageIds = [...sortedMessageIds];
        yield delay(100);
    } catch (error) {
        throwErrorInCatch(error, 'workerCheckNeedToMarkReadMessageWhenScrollingFlatlist');
    }
}

function* workerAPIFetchThumbnailContent(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        let { activeUserId, myUserInfo } = yield select((state) => state.AuthStoredReducer);


        let response = yield call(WorkerChatToDo, {
            method: 'POST',
            functionName: action.ttype === 'WORK' ? '/api/fetchDetailTaskById' : '/',
            token: token,
            payload: action.payload,
        })
        yield call(InteractionManager.runAfterInteractions);
        const { result } = response;
        if (!result) {
            return true
        }
        if (result.length !== 1) {
            return true;
        }
        const Task = result[0];
        yield put({
            type: Action.UPDATE_THUMNAIL_CONTENT,
            data: {
                _id: action.data._id,
                content: Task
            }
        })
    } catch (error) {
        throwErrorInCatch(error);
    }
}

function* workerUpdateThumbnailContent(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        let activeUserId = yield select(state => state.AuthStoredReducer.myUserInfo._id);
        let thumbnailContent = yield select(state => state.ChatStoredReducer.thumbnailContent)
        if (action.data && action.data._id) {
            yield put({
                type: Action.UPDATE_THUMNAIL_CONTENT_SUCCESS,
                data: {
                    ...thumbnailContent,
                    [action.data._id]: action.data.content
                }
            })
        }
    } catch (error) {
        throwErrorInCatch(error, 'workerAPIFetchThumbnailContent');
    }
}

function* workerAPIDownloadVideo(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        ;
        let message = action.message;
        let content = message.fileContent
        if (!content._id || !content.link) {
            throw 'thieu du lieu loi roi'
        }
        let splitLink = content.link.split('/');
        let fileName = splitLink[splitLink.length - 1].split('.');
        let fileTail = fileName[fileName.length - 1];
        RNFS.exists(`${RNFS.DocumentDirectoryPath}/videos`).then(exist => {
            if (!exist) {
                RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/videos`)
            }
        }).then(() => {
            return RNFS.exists(`${RNFS.DocumentDirectoryPath}/videos/${content._id}.${fileTail}`);
        }).then(exist => {
            if (exist) {
                return true;
            } else {
                return RNFS.downloadFile({
                    fromUrl: `${content.link}?token=${myUserInfo.token}`,
                    headers: {
                        Authorization: 'Tomaho ' + myUserInfo.token
                    },
                    toFile: `${RNFS.DocumentDirectoryPath}/videos/${content._id}.${fileTail}`,
                    backgroundTimeout: 30000,
                    // readTimeout: 15000,
                    // connectionTimeout: 15000,
                    progress: (res) => {
                    },
                }).promise
            }
        }).then(async file => {
            if (file.bytesWritten > 0) {
                action.dispatch({
                    type: Action.UPDATE_MY_FILE,
                    ttype: 'add_file',
                    data: {
                        [`${content._id}`]: `${Platform.OS === 'android' ? 'file://' : ''}${RNFS.DocumentDirectoryPath}/videos/${content._id}.${fileTail}`
                    },
                })
            } else {
                if (file === true) {
                    action.dispatch({
                        type: Action.UPDATE_MY_FILE,
                        ttype: 'add_file',
                        data: {
                            [`${content._id}`]: `${Platform.OS === 'android' ? 'file://' : ''}${RNFS.DocumentDirectoryPath}/videos/${content._id}.${fileTail}`
                        },
                    })
                } else {
                    throw 'download video loi roi'
                }
            }
        }).catch(error => {
            throwErrorInCatch(`workerAPIDownloadVideo - ${JSON.stringify(error)}`);
        })
    } catch (error) {
        throwErrorInCatch(error, 'workerAPIDownloadVideo');
    }
}


function* workerClearAnyDownloadedFileEveryWeek(action) {
    try {
        yield call(InteractionManager.runAfterInteractions);
        const listLastTimeFetch = yield select(state => state.ChatStoredReducer.listLastTimeFetch)
        let activeUserId = yield select(state => state.AuthStoredReducer.myUserInfo._id);
        let lastTimeClear = listLastTimeFetch[`lasttimeclearanydownloadedfiles`] || 0;
        if (!lastTimeClear || lastTimeClear === 0 ||
            differenceInDays(new Date(), new Date(lastTimeClear)) >= 7 || action.forceRun) {
            //clear
            return Promise.all([
                RNFS.exists(`${RNFS.DocumentDirectoryPath}/images`),
                RNFS.exists(`${RNFS.DocumentDirectoryPath}/files`),
                RNFS.exists(`${RNFS.DocumentDirectoryPath}/avatars`)
            ]).then(([imageDirExist, fileDirExist, avatarDirExist]) => {
                let promises = [];
                if (imageDirExist) {
                    promises.push(RNFS.unlink(`${RNFS.DocumentDirectoryPath}/images`));
                }
                if (fileDirExist) {
                    promises.push(RNFS.unlink(`${RNFS.DocumentDirectoryPath}/files`));
                }
                if (avatarDirExist) {
                    promises.push(RNFS.unlink(`${RNFS.DocumentDirectoryPath}/avatars`));
                }
                return Promise.all(promises);
            }).then(res => {
                if (action.dispatch) {
                    action.dispatch({
                        type: Action.UPDATE_MY_FILE,
                        ttype: 'clear',
                    })
                    action.dispatch({
                        type: Action.UPDATE_DOWNLOAD_AVATAR,
                        ttype: 'clear',
                    })
                    action.dispatch({
                        type: Action.UPDATE_LAST_TIME_FETCH,
                        data: {
                            [`lasttimeclearanydownloadedfiles`]: new Date().getTime()
                        }
                    })
                }
            }).catch(error => {

                throwErrorInCatch(error, 'workerClearAnyDownloadedFileEveryWeek');
            })
        }
    } catch (error) {
        throwErrorInCatch(error, 'workerClearAnyDownloadedFileEveryWeek');
    }
}

function* workerAPICreatePoll(action) {
    yield delay(1000)
    yield call(InteractionManager.runAfterInteractions);
    let { setIsDoingAPI, navigation } = action;
    try {
        const token = yield select(state => state.AuthStoredReducer.token);
        let { activeThreadId } = yield select((state) => state.ChatUnstoredReducer);
        let { question, choices } = action.data;
        setIsDoingAPI(true);
        let response = yield call(WorkerChatToDo, {
            method: 'POST',
            functionName: '/api/sendPollMessage',
            token: token,
            payload: {
                data: {
                    thread_id: activeThreadId,
                    question: question,
                    choices: choices
                }
            }
        })
        setIsDoingAPI(false);
        const { Message, message } = response;
        if (Message) {
            navigation.goBack();
        } else {
            setIsDoingAPI(false);
            yield put({
                type: AuthAction.UPDATE_ERROR,
                data: { error: message }
            })
        }
    } catch (error) {
        setIsDoingAPI(false);
        yield put({
            type: AuthAction.UPDATE_ERROR,
            data: { error: String(error) }
        })
        throwErrorInCatch(error, 'workerAPICreatePoll');
    }
}


function* workerAPIAnswerThePoll(action) {
    yield delay(1000)
    yield call(InteractionManager.runAfterInteractions);
    let { setIsDoingAPI, navigation } = action;
    try {
        const token = yield select(state => state.AuthStoredReducer.token);
        let { message_id, new_select_ids, new_added_choices = [] } = action.data;
        //
        //Chú ý new_select_ids bao gồm cả id của answer option chưa được tạo
        //Vì thế phải lấy new_added_choices để đi tạo trước và đối chiếu lấy id của answer mới được tạo ra
        //Sau đó mới gửi các answer choice
        //
        setIsDoingAPI(true);
        //Bắt đầu gửi câu trả lời (các câu lựa chọn)
        let response = yield call(WorkerChatToDo, {
            method: 'POST',
            functionName: '/api/answerPoll',
            token: token,
            payload: {
                data: {
                    message_id: message_id,
                    choice_ids: new_select_ids,
                    new_added_choices: new_added_choices
                }
            }
        })
        setIsDoingAPI(false);
        let { ok, message } = response;
        if (ok) {
            navigation.goBack();
        } else {
            yield put({
                type: AuthAction.UPDATE_ERROR,
                data: { error: message }
            })
        }
    } catch (error) {
        setIsDoingAPI(false);
        throwErrorInCatch(error, 'workerAPIAnswerThePoll');
    }
}

function* workerSocketSomeoneAnswerPoll(action) {
    try {
        const fullThreads = yield select(state => state.ChatStoredReducer.fullThreads);
        const { updatedMessage } = action.data;
        if (!updatedMessage) return true;
        if (!fullThreads[updatedMessage.thread_id]) {
            yield put({
                type: Action.API_FETCH_FULL_THREAD_BY_THREAD_ID,
                data: {
                    thread_id: updatedMessage.thread_id
                }
            })
        } else {
            yield put({
                type: Action.UPDATE_MESSAGE,
                ttype: 'change_poll',
                data: { updatedMessage }
            })
        }
    } catch (error) {
        throwErrorInCatch(error, 'workerSocketSomeoneAnswerPoll');
    }
}


function* workerLongPressMessage(action) {

    try {
        const activeThreadId = yield select(state => state.ChatUnstoredReducer.activeThreadId)
        const myUserId = yield select(state => state.AuthStoredReducer.myUserInfo._id);
        const threadMembers = yield select(state => state.ChatStoredReducer.threadMembers);
        let checkStatus = threadMembers[activeThreadId][myUserId].status === 1;
        if (!checkStatus) {
            checkStatus = false;
        }
        const { navigation } = action;
        const { pageX, pageY, componentHeight, componentWidth, _id } = action.data;

        const { fullMessages } = yield select(state => state.ChatStoredReducer);

        navigation.navigate('PopupMessageLongPress', {
            mid: _id,
            checkStatus,
            pageX,
            pageY,
            componentHeight,
            componentWidth,
            // }
        })

    } catch (error) {
        // console.log("error", error)
    }
}

function* workerScrollToMessage(action) {
    try {
        const { scrollToNewest, message_id, thread_id, chatBoxFlatListRef } = action.data;
        if (scrollToNewest) {
            chatBoxFlatListRef.current.scrollToIndex({
                animated: true,
                index: 0,
                viewPosition: 0
            });
            return true;
        }
        const { simpleMessages } = yield select(state => state.ChatStoredReducer);
        const { activeThreadId } = yield select(state => state.ChatUnstoredReducer);
        const tid = thread_id || activeThreadId;
        let index = simpleMessages[tid].findIndex(m => {
            return m._id === message_id;
        })
        if (index < 0) {
            return true;
        }
        const totalMessageCount = simpleMessages[tid].length;
        yield put({
            type: Action.UPDATE_MAX_MESSAGE_TO_SHOW,
            data: index + 10 > totalMessageCount ? totalMessageCount : index + 10,
        })
        yield delay(200);
        chatBoxFlatListRef.current.scrollToIndex({
            animated: true,
            index,
            viewPosition: 0
        });
    } catch (error) {
        throwErrorInCatch(error, 'workerScrollToMessage')
    }
}


function* workerAPIUpdateThreadNotification(action) {
    try {
        let { thread_id, new_status } = action.data;
        const token = yield select((state) => state.AuthStoredReducer.token)
        let response = yield call(WorkerChatToDo, {
            method: 'POST',
            token: token,
            functionName: `/api/${new_status ? 'enableNotification' : 'disableNotification'}`,
            payload: {
                data: {
                    thread_id: thread_id,
                }
            }
        })
        const { simpleThreads, message } = response;
        if (message) {
            yield put({
                type: AuthAction.UPDATE_ERROR,
                data: { error: message }
            })
        } else if (simpleThreads) {
            yield put({
                type: AuthAction.UPDATE_NOTIFICATION,
                data: 'Cập nhật thông báo thành công'
            })
        }
    } catch (error) {
        throwErrorInCatch(error, 'workerAPIUpdateThreadNotification');
    }
}
