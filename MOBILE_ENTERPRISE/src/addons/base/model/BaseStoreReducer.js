import * as BaseAction from '../controllers/actionTypes';

const initialState = {
    theme: 'light',
}


export default (state = initialState, action) => {
    switch (action.type) {
        case BaseAction.CHANGE_THEME: {
            const { theme } = action.data;
            return {
                ...state,
                theme: theme && theme === 'dark' ? 'dark' : 'light'
            }
        }
        case BaseAction.CLEAR_ALL_DATA: {
            return {
                ...state,
                theme: 'light',
            }
        }
        default:
            return state
    }
}