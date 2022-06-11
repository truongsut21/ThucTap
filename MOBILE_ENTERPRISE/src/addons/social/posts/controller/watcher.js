import { call, takeLeading, select, put } from "redux-saga/effects";
import * as Action from "./actionTypes";
import WorkerPostToDo from "./utils";

export default function* watcherPostList() {
  yield takeLeading(Action.API_FETCH_POST_LIST, workerAPIFetchPostList);
  yield takeLeading(Action.API_FETCH_OLD_POST_LIST, workerAPIFetchOldPostList);
}

function* workerAPIFetchPostList() {
  try {
    let token = yield select((state) => state.AuthStoredReducer.token);

    let response = yield call(WorkerPostToDo, {
      method: "POST",
      token: token,
      functionName: "/api/fetchNewestPosts",
      payload: {
        data: {},
      },
    });
    response.posts.map((x) => {
      console.log(x.content);
    });
    const {posts}=response
    console.log("day la post trong watch:", posts)
    if (posts){
      yield put(
        {type:Action.RENDER_POST,
        data:{
          posts
        }
        }

      )
    }
  } catch (error) {
    console.log(error);
  }
}

function* workerAPIFetchOldPostList() {
  let token = yield select((state) => state.AuthStoredReducer.token);

  let responsi = yield call(WorkerPostToDo, {
    method: "POST",
    token: token,
    functionName: "/api/fetchOlderPosts",
    payload: {
      data: {},
    },
  });

  console.log("fetchOlderPosts");
}
