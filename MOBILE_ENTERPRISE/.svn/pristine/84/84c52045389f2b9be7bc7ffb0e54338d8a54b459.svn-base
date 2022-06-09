const initialState = {
    hintUser: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_HINT_USER_SUCCESS':
            return {
                ...state,
                hintUser: action.data
            }
        default: 
            return state;
    }
}