import {
    takeLeading,
    call,
    put,
    select,
    takeEvery,
    all,
    delay,
} from 'redux-saga/effects';
import throwErrorInCatch from '../../base/utils/throwErrorInCatch';
import { workerAPITodoNote } from './utils';
import * as Action from './actionTypes';
import * as ChatAction from '../../chat/controllers/actionTypes';

export function* watcherECard() {
    yield takeLeading(Action.API_CREATE_TODO_NOTE, workerAPICreateTodoNote);
    yield takeLeading(Action.API_EDIT_TODO_NOTE, workerAPIEditTodoNote);
    yield takeLeading(Action.API_FETCH_TODO_NOTE_WHEN_LOGIN, workerAPIFetchTodoNoteWhenLogin);
    yield takeLeading(Action.API_FETCH_TODO_NOTE_BY_LASTTIME, workerAPIFetchTodoNoteByLasttime);
    yield takeLeading(Action.API_MARK_DONE_TODO_NOTE, workerAPIMarkDoneTodoNote);
    yield takeLeading(Action.API_HIDE_TODO_NOTE, workerAPIHideTodoNote);
}

function* workerAPICreateTodoNote(action) {
    try {
        const { document } = action.data;
        const token = yield select(state => state.AuthStoredReducer.token);
        const response = yield call(workerAPITodoNote, {
            method: 'POST',
            functionName: '/api/createTodoNote',
            token: token,
            payload: {
                data: {
                    newTodo: document
                }
            }
        });
    } catch (error) {
        throwErrorInCatch(error, 'workerAPICreateTodoNote');
    }
}

function* workerAPIEditTodoNote(action) {
    try {

    } catch (error) {
        throwErrorInCatch(error, 'workerAPIEditTodoNote');
    }
}

function* workerAPIFetchTodoNoteWhenLogin(action) {
    try {

    } catch (error) {
        throwErrorInCatch(error, 'workerAPIFetchTodoNoteWhenLogin');
    }
}

function* workerAPIFetchTodoNoteByLasttime(action) {
    try {
        const token = yield select(state => state.AuthStoredReducer.token);
        const lTF = yield select(state => state.ChatStoredReducer.listLastTimeFetch);
        let ignoreIds = [];
        let lTFM = Number(lTF[`todo_note`] || 0)
        let data = {}
        while (true) {
            if (!data.hasOwnProperty('lastTime')) {
                data = {
                    lastTime: lTFM,
                    ignore_ids: ignoreIds
                }
            }
            const response = yield call(workerAPITodoNote, {
                method: 'POST',
                functionName: '/api/fetchTodoNoteByLasttime',
                token: token,
                payload: {
                    data: data
                }
            });

            const { todoNotes, local_should_remove_todo_ids = [], lastTime, ignore_ids } = response;
            if (!todoNotes) break;
            yield put({
                type: Action.UPDATE_TODO_NOTE,
                data: {
                    todoNotes,
                    remove_ids: local_should_remove_todo_ids
                }
            })

            lTFM = lastTime;
            data = {
                lastTime: lastTime,
                ignore_ids: ignore_ids
            };
            if (todoNotes.length > 0 || todoNotes.length > 0) {
                yield put({
                    type: ChatAction.UPDATE_LAST_TIME_FETCH,
                    ttype: 'fetch',
                    data: {
                        ['todo_note']: todoNotes.length < 80 ? lTFM + 1 : lTFM
                    }
                })
            }

            yield delay(500);

            //Data trả về nhỏ hơn 80 cũng nghĩa là hết data để fetch
            if (todoNotes.length < 80) {
                break;
            }
        }

        //delay để ko bị phóng 2 lần trong trường hợp thay đổi app quá nhanh ở: khi foreground, khi socket.on('connect')
        yield delay(2000);
    } catch (error) {
        throwErrorInCatch(error, 'workerAPIFetchTodoNoteByLasttime');
    }
}

function* workerAPIMarkDoneTodoNote(action) {
    try {

    } catch (error) {
        throwErrorInCatch(error, 'workerAPIMarkDoneTodoNote');
    }
}

function* workerAPIHideTodoNote(action) {
    try {

    } catch (error) {
        throwErrorInCatch(error, 'workerAPIHideTodoNote');
    }
}