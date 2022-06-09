import * as React from 'react';

export const navigationRef = React.createRef();
export const chatBoxRef = React.createRef();

export function navigate(type, name, params) {
    if (type === 'navigate') {
        navigationRef.current.navigate(name, params);
    }
    else {
        navigationRef.current.setParams(params)
    }
}

export function chatBoxNavigate(name, params) {
    chatBoxRef.current.navigate(name, params);
}