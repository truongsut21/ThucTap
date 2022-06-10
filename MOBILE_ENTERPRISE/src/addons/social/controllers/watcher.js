import {
  takeLeading,
  call,
  put,
  select,
  takeEvery,
  take,
  all,
  fork,
  delay,
  spawn,
  takeLatest,
} from "redux-saga/effects";
import { InteractionManager } from "react-native";
// import axios from "axios";
// import { CommonActions } from "@react-navigation/native";
// import ImageResizer from "react-native-image-resizer";
// import isEqual from "react-fast-compare";
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as Action from "./actionTypes";
import { WorkerPostToDo } from "./utils";
import { WorkerChatToDo } from "../../chat/controllers/utils";
// import {
//   WorkerChatToDo,
//   _computeNiceRatioForLowResolutionImage,
//   _computeNiceRatioForHighResolutionImage,
//   convertMessageContentForDisplayLocalNotification,
// } from "./utils";
// import { WorkerPostToDo } from "./utils";
// import { WorkerAuthToDo } from "../../auth/controllers/utils";
// import { config } from "../../../config";
// import { subMinutes, differenceInDays } from "date-fns";
// import { without, minBy } from "lodash";
// import { socket } from "../../../config/socket";
// import { workerUpdateAnimateMessageReaction } from "./watcherStateReaction";
// import { workerUpdateMessageReaction } from "./watcherReaction";
// import eventEmitter from "./utils";
// import * as AuthAction from "../../auth/controllers/actionTypes";
// import * as BaseAction from "../../base/controllers/actionTypes";
// import throwErrorInCatch from "../../base/utils/throwErrorInCatch";

var _ = require("lodash");
var ObjectID = require("bson-objectid");
var RNFS = require("react-native-fs");
export function* watcherPost() {
  // tạo bài viết mới
  yield takeLeading(Action.API_CREATE_NEW_POST, workerAPICreateNewPost);
  // cập nhật danh sách bài viết theo bài viết mới tạo
  yield takeEvery(Action.API_UPDATE_NEW_POST, workerAPIUpdateNewPost);
  yield takeEvery(Action.API_FETCH_POST, workerAPIFetchPost);
  // chỉnh sửa bài viết
  yield takeLeading(Action.API_EDIT_POST, workerAPIEditPost);
  // cập nhật lại bài viết sau khi sửa
  yield takeEvery(Action.API_UPDATE_POST, workerAPIUpdatePost);
  // get chi tiết bài viết
  yield takeEvery(Action.API_FETCH_POST_DETAIL, workerAPIFetchPostDetail);
  // get 20 comment mới nhất
  yield takeEvery(Action.API_FETCH_NEWEST_COMMENT, workerAPIFetchNewestComment);
  // get 10 comment cũ hơn
  yield takeEvery(Action.API_FETCH_OLDER_COMMENT, workerAPIFetchOlderComment);
  // get reply mới nhất
  yield takeEvery(Action.API_FETCH_NEWEST_REPLY, workerAPIFetchNewestReply);
  // get reply cũ
  yield takeEvery(Action.API_FETCH_OLDER_REPLY, workerAPIFetchOlderReply);
  // cập nhật chi tiết bài viết
  yield takeEvery(Action.API_UPDATE_POST_DETAIL, workerAPIUpdatePostDetail);
  // cập nhật comment
  yield takeEvery(Action.API_UPDATE_POST_COMMENT, workerAPIUpdatePostComment);
  // cập nhật reply
  yield takeEvery(Action.API_UPDATE_POST_REPLY, workerAPIUpdatePostReply);
}
function* workerAPIFetchPost() {
  let token = yield select((state) => state.AuthStoredReducer.token);

  let response = yield call(WorkerPostToDo, {
    method: "POST",
    token: token,
    functionName: "/api/",
    payload: {
      data: {},
    },
  });
  console.log(response);
}

function* workerAPIUpdateNewPost() {
  let token = yield select((state) => state.AuthStoredReducer.token);
  let response = yield call(WorkerChatToDo, {
    method: "POST",
    token: token,
    functionName: "/api/",
    payload: {
      data: {
        address: "",
        phone: "",
        email: "",
        company_name: "",
        job_position: "",
      },
    },
  });
  console.log(response);
}

// function* worker() {
//     yield put({type: Action.UPDATE_BIO, data})
// }

function* workerAPICreateNewPost(action) {
  try {
    yield call(InteractionManager.runAfterInteractions);
    const data = action.data;
    if (data) {
      let type = data.type;
      let thread_id = data.thread_id;
      let doc = {
        content:
          type === "sticker"
            ? { ...data.content }
            : type === "image_group"
            ? data.content
            : data.content.content,
        thread_id: thread_id,
        parent_id: data.parent_id
          ? data.parent_id._id
            ? data.parent_id._id
            : data.parent_id
          : "",
        type,
        draft_id: action.data._id,
      };
      socket.emit("tomchat_create_new_post", {
        token: yield select((state) => state.AuthStoredReducer.token),
        data: doc,
      });
    }
  } catch (error) {
    throwErrorInCatch(error, "workerAPICreateNewPost");
  }
}

//   // get message state, previous là takeLeading
//   yield takeLeading(
//     Action.API_FETCH_MESSAGE_STATE_BY_LAST_TIME_FETCH,
//     workerFetchMessageStateByLastTimeFetch
//   );

//   // get danh sách thread theo last time fetch
//   yield takeLeading(
//     Action.API_FETCH_THREAD_LIST_OLDER,
//     workerFetchThreadListOlder
//   );
//   //previous là takeLeading
//   yield takeLeading(Action.API_FETCH_THREAD_LIST, workerAPIFetchThreadList);
//   // get thread single
//   yield takeEvery(
//     Action.API_FETCH_FULL_THREAD_BY_THREAD_ID,
//     workerAPIFetchFullThreadByThreadId
//   );
//   // get danh sách user cho danh bạ, previous là takeLeading
//   // get danh sách tin nhắn mới theo last time fetch, previous là takeLeading
//   yield takeLeading(Action.API_FETCH_NEW_MESSAGE, workerAPIFetchMessage);
//   yield takeLeading(
//     Action.API_FETCH_NEW_MESSAGE_STATE,
//     workerFetchMessageStateByLastTimeFetch
//   );
//   yield takeLeading(
//     Action.API_FETCH_NEW_MESSAGE_REACTION,
//     workerFetchMessageReactionByLastTimeFetch
//   );
//   // get tin nhắn cũ
//   yield takeLeading(Action.API_FETCH_MESSAGE_OLDER, workerAPIFetchOlderMessage);
//   // get danh sách user trước khi tạo nhóm
//   // tạo thread cá nhân
//   yield takeLatest(Action.CHAT_WITH_SOMEONE, workerChatWithSomeone);
//   // tạo nhóm
//   yield takeLeading(Action.API_CREATE_THREAD_GROUP, workerAPICreateThreadGroup);
//   yield takeEvery(Action.API_DOWNLOAD_AVATAR, workerDownloadAvatar);
//   // yield takeEvery(Action.UPDATE_DOWNLOAD_AVATAR, workerUpdateAvatar);
//   // yield takeEvery('UPDATE_MY_AVATAR_USER', workerUpdateMyAvatarUser);
//   yield takeEvery(Action.API_DOWNLOAD_IMAGE, workerAPIDownloadImage);
//   yield takeEvery(
//     Action.API_DOWNLOAD_IMAGE_HIGH_QUALITY,
//     workerAPIDownloadImageHighQuality
//   );
//   yield takeEvery(Action.API_DOWNLOAD_FILE, workerAPIDownloadFile);
//   yield takeEvery(Action.API_DOWNLOAD_FILE_ME, workerAPIDownloadFileMe);
//   // xử lý realtime pin/gỡ pin của thread
//   // khi bản thân bị mời ra khỏi nhóm
//   // thêm người dùng vào nhóm chat
//   yield takeLeading(
//     Action.API_ADD_MEMBER_TO_THREAD,
//     workerAPIAddNewMemberToThread
//   );
//   yield takeLeading(
//     Action.RESEND_UNFINISH_MESSAGE,
//     workerResendUnFinishMessage
//   );
//   // kiểm tra khi bấm vào người dùng bên danh bạ
//   // nhận đánh dấu đã đọc
//   // yield takeEvery(Action.SOCKET_SOMEONE_READ_MESSAGE, workerSomeoneReadMessaage);
//   // pin
//   // yield takeLeading(Action.API_PIN_THREAD, workerPinThread);
//   // gỡ pin
//   // yield takeLeading(Action.API_UNPIN_THREAD, workerUnpinThread);
//   // nhận tin nhắn bản thân
//   yield takeEvery(Action.SOCKET_I_HAVE_SENT_MESSAGE, workerIHaveSentMessage);
//   // thu hồi tin nhắn
//   yield takeLeading(Action.API_DELETE_MESSAGE, workerAPIDeleteMessage);
//   // tái cấu trúc dữ liệu tin nhắn để render
//   // yield takeEvery('PREPARE_MESSAGE', workerPrepareMessage);
//   // yield takeLeading('GO_TO_PARENT_MESSAGE', workerGoToParentMessage);
//   yield takeEvery(
//     Action.API_SEND_REACTION_TO_MESSAGE,
//     workerSendReactionToMessage
//   );
//   yield takeEvery(
//     Action.SOCKET_RECEIVE_REACTION_TO_MESSAGE,
//     workerReceiveReactionToMessage
//   );
//   // nhận tin nhắn từ socket
//   yield takeEvery(Action.SOCKET_RECEIVE_NEW_MESSAGE, workerReceiveNewMessage); // đã chỉnh sửa lại tên method
//   yield takeLeading(Action.API_UPDATE_THREAD_NAME, workerAPIUpdateThreadName);

//   // Bổ nhiệm trưởng nhom & phó nhóm & truất quyền phó nhóm
//   yield takeEvery(Action.API_APPOINT_LEADER, workerApiAppointLeader);
//   yield takeEvery(Action.API_APPOINT_DEPUTY, workerApiAppointDeputy);
//   yield takeEvery(Action.API_DEPOSITION_DEPUTY, workerApiDepositionDeputy);
//   //kick khoi nhóm & rời nhóm
//   yield takeEvery(Action.API_LEAVE_THREAD, workerApiLeaveThread);
//   yield takeEvery(Action.API_REMOVE_MEMBER, workerApiRemoveMember);
//   yield takeEvery(
//     Action.API_FETCH_MEMBER_BY_THREAD_ID,
//     workerAPIFetchMemberByThreadId
//   );

//   yield takeLatest(
//     Action.API_SEARCH_MESSAGE_IN_THREAD_BY_CONTENT,
//     workerAPISearchMessageInThreadByContent
//   );
//   yield takeLatest(
//     Action.API_SEARCH_THREAD_BY_THREAD_NAME,
//     workerAPISearchThreadByThreadName
//   );
//   yield takeLeading(
//     Action.PRESS_THREAD_ON_SEARCHED_THREAD_LIST,
//     workerPressThreadOnSearchedThreadList
//   );
//   // Ghim tin nhắn
//   yield takeLeading(Action.API_PIN_MESSAGE, workerAPIPinMessage);
//   yield takeLeading(Action.API_UNPIN_MESSAGE, workerAPIUnpinMessage);

//   // updatte permission cap nhat lai quyen cho thread
//   yield takeLeading(
//     Action.API_UPDATE_THREAD_PERMISSION,
//     workerAPIUpdateThreadPermission
//   );
//   yield takeLeading(
//     Action.API_UPDATE_THREAD_POLL_MESSAGE,
//     workerAPIUpdateThreadPollMessage
//   );
//   yield takeLeading(
//     Action.API_UPDATE_THREAD_SEND_MESSAGE,
//     workerAPIUpdateThreadSendMessage
//   );
//   yield takeLeading(
//     Action.API_UPDATE_THREAD_PIN_MESSAGE,
//     workerAPIUpdateThreadPinMessage
//   );
//   yield takeLeading(
//     Action.API_UPDATE_THREAD_JOIN_CONDITION,
//     workerAPIUpdateThreadJoinCondition
//   );

//   //Các Action của việc mark read message
//   yield takeLeading(
//     Action.DO_STUFF_VIEWABLES_IN_MESSAGE_ZONE,
//     workerDoStuffViewableInMessageZone
//   );
//   yield takeEvery(
//     Action.API_FETCH_THUMBNAIL_CONTENT,
//     workerAPIFetchThumbnailContent
//   );
//   yield takeEvery(Action.UPDATE_THUMNAIL_CONTENT, workerUpdateThumbnailContent);
//   yield takeEvery(Action.API_DOWNLOAD_VIDEO, workerAPIDownloadVideo);
//   // yield takeEvery(Action.API_FETCH_MESSAGE_STATE_OF_SPECIFIC_MESSAGE, workerAPIFetchStateOfSpecificMessage);
//   yield takeLeading(
//     Action.CLEAR_ANY_DOWNLOADED_FILE_EVERY_WEEK,
//     workerClearAnyDownloadedFileEveryWeek
//   );
//   //POLL Message
//   yield takeLeading(Action.API_CREATE_POLL, workerAPICreatePoll);
//   yield takeLeading(Action.API_ANSWER_THE_POLL, workerAPIAnswerThePoll);
//   yield takeEvery(
//     Action.SOCKET_SOMEONE_ANSWER_POLL,
//     workerSocketSomeoneAnswerPoll
//   );
//   //End of POLL Message
//   //Saga khi bấm giữ message 1 lúc lâu
//   yield takeLeading(Action.LONG_PRESS_MESSAGE, workerLongPressMessage);
//   yield takeLeading(Action.SCROLL_TO_MESSAGE, workerScrollToMessage);

//   yield takeLeading(
//     Action.API_UPDATE_THREAD_NOTIFICATION,
//     workerAPIUpdateThreadNotification
//   );
