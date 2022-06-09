import * as Action from "./actionTypes";
import * as AuthAction from "../../auth/controllers/actionTypes";

import { takeLeading, call, put, select } from "redux-saga/effects";
import throwErrorInCatch from "../../base/utils/throwErrorInCatch";
import { workerAPIECard } from "./utils";

export function* watcherECard() {
  yield takeLeading(Action.API_FETCH_MY_ECARDS, workerFetchMyECards);
  yield takeLeading(Action.API_FETCH_ECARDS_STORE, workerAPIFetchECardStore);
  yield takeLeading(
    Action.API_UPDATE_INFO_MY_ECARDS,
    workerAPIFetchUpdateInfoMyECard
  );
  yield takeLeading(Action.API_INFO_OTHER_ECARDS, workerAPIFetchInfoOtherECard);
  yield takeLeading(
    Action.API_UPDATE_DEFAULT_ECARDS,
    workerAPIUpdateDefaultECard
  );
  yield takeLeading(Action.API_SAVE_MY_ECARD, workerAPISaveMyECard);
  yield takeLeading(Action.API_SAVE_OTHER_ECARD, workerAPISaveOtherECard);
  yield takeLeading(Action.API_FETCH_OTHER_ECARD, workerAPIFetchOtherECard);
}

function* workerAPIFetchOtherECard(action) {
  try {
    const { data } = action;

    const token = yield select((state) => state.AuthStoredReducer.token);
    if (data) {
      let response = yield call(workerAPIECard, {
        functionName: "/api/fetchMyCollection",
        token: token,
        payload: {
          data: {},
        },
      });
      const { cards } = response;
      if (cards) {
        yield put({
          type: Action.UPDATE_OTHER_ECARDS,
          ttype: "fetch",
          data: { otherECards: cards },
        });
      } else {
        console.log("Lỗi api");
      }
    } else {
      let response = yield call(workerAPIECard, {
        functionName: "/api/fetchMyCollection",
        token: token,
        payload: {
          data: {
            lastSaveTime: data,
          },
        },
      });
      const cards = response.cards;
      if (cards) {
        setDataOtherEcard(cards);
      }
    }
  } catch (error) {
    throwErrorInCatch(error, "workerAPISaveMyECard");
  }
}

function* workerAPISaveOtherECard(action) {
  try {
    const { data } = action;
    const token = yield select((state) => state.AuthStoredReducer.token);
    let response = yield call(workerAPIECard, {
      functionName: "/api/saveECardToMyCollection",
      token: token,
      payload: {
        data: {
          ecard_user_data_id: data,
        },
      },
    });
  } catch (error) {
    throwErrorInCatch(error, "workerAPISaveMyECard");
  }
}

function* workerAPISaveMyECard(action) {
  try {
    const { data, dispatch } = action;

    const token = yield select((state) => state.AuthStoredReducer.token);
    let response = yield call(workerAPIECard, {
      functionName: "/api/saveECardFromStore",
      token: token,
      payload: {
        data: {
          ecard_template_id: data.eCardId,
        },
        // user_id: data.userId,
      },
    });
    const card = response;
    if (card.success) {
      yield put({
        type: Action.API_FETCH_MY_ECARDS,
        dispatch,
      });
      yield put({
        type: AuthAction.UPDATE_NOTIFICATION,
        data: "Đã lưu về E-Card của tôi",
      });
    }
    if (card.code === 1) {
      yield put({
        type: AuthAction.UPDATE_NOTIFICATION,
        data: "Đã tồn tại trong E-Card của tôi",
      });
    }
  } catch (error) {
    throwErrorInCatch(error, "workerAPISaveMyECard");
  }
}

function* workerAPIUpdateDefaultECard(action) {
  try {
    const { data, dispatch } = action;
    const token = yield select((state) => state.AuthStoredReducer.token);
    let response = yield call(workerAPIECard, {
      functionName: "/api/markAsDefaultECard",
      token: token,
      payload: {
        data: {
          _id: data._id,
        },
      },
    });
    const card = response.card;
    if (card) {
      yield put({
        type: Action.API_FETCH_MY_ECARDS,
        dispatch,
      });
      // yield put({
      //   type: Action.UPDATE_MY_ECARDS,
      //   ttype: "update_card_defaut",
      //   data: card,
      // });
    }
  } catch (error) {
    throwErrorInCatch(error, "workerAPIUpdateDefaultECard");
  }
}

function* workerAPIFetchInfoOtherECard(action) {
  try {
    const { data, setDataInfoECard } = action;
    const token = yield select((state) => state.AuthStoredReducer.token);
    let response = yield call(workerAPIECard, {
      functionName: "/api/viewECardByCamera",
      token: token,
      payload: {
        data: {
          ecard_user_data_id: data,
        },
      },
    });
    const card = response.card;
    setDataInfoECard(card);
  } catch (error) {
    throwErrorInCatch(error, "workerAPIFetcInfoOtherECard");
  }
}

function* workerAPIFetchUpdateInfoMyECard(action) {
  try {
    const { data } = action;
    const { navigation } = action.data;

    const token = yield select((state) => state.AuthStoredReducer.token);
    let response = yield call(workerAPIECard, {
      functionName: "/api/editMyCardData",
      token: token,
      payload: {
        data: data,
      },
    });
    const card = response.cards;
    if (card) {
      yield put({
        type: Action.UPDATE_MY_ECARDS,
        ttype: "update",
        data: { myECard: card },
      });

      navigation.navigate("EditECard", { myECard: card[0] });
    }
  } catch (error) {
    throwErrorInCatch(error, "workerAPIFetchUpdateInfoMyECard");
  }
}

function* workerFetchMyECards(action) {
  try {
    const token = yield select((state) => state.AuthStoredReducer.token);
    let response = yield call(workerAPIECard, {
      functionName: "/api/browseAllMyCards",
      token: token,
      payload: {
        data: {},
      },
    });
    const { cards } = response;
    if (cards) {
      yield put({
        type: Action.UPDATE_MY_ECARDS,
        ttype: "fetch",
        data: { myECards: cards },
      });
    } else {
      console.log("Lỗi api");
    }
  } catch (error) {
    throwErrorInCatch(error, "workerFetchMyECards");
  }
}

function* workerAPIFetchECardStore(action) {
  try {
    const { setTemplates } = action;
    const token = yield select((state) => state.AuthStoredReducer.token);
    let response = yield call(workerAPIECard, {
      functionName: "/api/browseECardStore",
      token: token,
      payload: {
        data: {},
      },
    });
    const { templates } = response;
    if (templates) {
      setTemplates(templates);
    }
  } catch (error) {
    throwErrorInCatch(error, "workerAPIFetchECardStore");
  }
}
