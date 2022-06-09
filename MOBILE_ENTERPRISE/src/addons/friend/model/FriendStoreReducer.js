import { omit } from 'lodash';
import * as Action from '../controllers/actionType';
import * as BaseAction from '../../base/controllers/actionTypes';

const initialState = {
    myFriends: {},
    myContacts: {},
    unProceedPhoneContacts: {},
    proceededPhoneContacts: {}
}

export default (state = initialState, action) => {

    switch (action.type) {
        case Action.UPDATE_FRIEND_LIST: {
            switch (action.ttype) {
                case 'fetchInit': {
                    const { myFriends } = action.data
                    if (!myFriends) return { ...state };
                    let mF = { ...state.myFriends }
                    return {
                        ...state,
                        myFriends: { ...mF, ...myFriends }
                    }
                }
                default: {
                    const { data } = action
                    if (!data) return { ...state };
                    return {
                        ...state,
                        myFriends: { ...state.myFriends, ...data }
                    }
                }
            }
        }
        case Action.UPDATE_CONTACT: {
            const { contacts } = action.data;
            if (!contacts) return { ...state };
            return {
                ...state,
                myContacts: { ...state.myContacts, ...contacts }
            }
        }
        case Action.UPDATE_UNPROCEED_PHONE_CONTACT: {
            switch (action.ttype) {
                case 'delete': {
                    const { _ids } = action.data;
                    let uPC = { ...state.unProceedPhoneContacts }
                    uPC = omit(uPC, _ids);
                    return {
                        ...state,
                        unProceedPhoneContacts: uPC
                    }
                }
                default: {
                    const { unProceedPhoneContacts } = action.data;
                    if (!unProceedPhoneContacts) return state;
                    return {
                        ...state,
                        unProceedPhoneContacts: {
                            ...state.unProceedPhoneContacts,
                            ...unProceedPhoneContacts
                        }
                    }
                }
            }
        }
        case Action.UPDATE_PROCEEDED_PHONE_CONTACT: {
            switch (action.ttype) {
                case 'delete': {
                    const { _ids } = action.data;
                    let ppC = { ...state.proceededPhoneContacts }
                    ppC = omit(ppC, _ids);
                    return {
                        ...state,
                        proceededPhoneContacts: ppC
                    }
                }
                default: {
                    const { proceededPhoneContacts } = action.data;
                    if (!proceededPhoneContacts) return state;
                    return {
                        ...state,
                        proceededPhoneContacts: {
                            ...state.proceededPhoneContacts,
                            ...proceededPhoneContacts
                        }
                    }
                }
            }
        }
        case BaseAction.CLEAR_ALL_DATA: {
            return {
                ...state,
                myFriends: {},
                myContacts: {},
                unProceedPhoneContacts: {},
                proceededPhoneContacts: {}
            }
        }
        default:
            return state
    }
}