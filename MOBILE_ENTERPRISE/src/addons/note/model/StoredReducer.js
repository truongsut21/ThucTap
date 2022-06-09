import * as Action from '../controllers/actionTypes';
import * as BaseAction from '../../base/controllers/actionTypes';
import { unionBy, without } from 'lodash';

const initialState = {
    todoNotes: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Action.UPDATE_TODO_NOTE: {
            switch (action.ttype) {
                case 'fetch':
                case 'change': {
                    const { todoNotes, remove_ids = [] } = action.data;
                    if (!todoNotes) return state;
                    let tdN = [...state.todoNotes];
                    tdN = unionBy(todoNotes, tdN, '_id');
                    if (remove_ids.length > 0) {
                        let json_remove_ids = {};
                        remove_ids.forEach(id => {
                            json_remove_ids[id] = 1;
                        })
                        tdN = without(tdN.map(n => {
                            if (json_remove_ids[n._id]) {
                                return null;
                            }
                            return n;
                        }), null);
                    }
                    return { ...state, todoNotes: tdN }
                }
                default: {
                    return state;
                }
            }
        }
        case BaseAction.CLEAR_ALL_DATA: {
            return {
                ...state,
                todoNotes: [],
            }
        }
        default:
            return state
    }
}

