import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, } from 'react-native';
import { WIDTH, HEIGHT } from '../../chat/controllers/utils';

const ChatWarning = ({ errorText, autoFade, fadeAfter }) => {

    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        if (autoFade) {
            doAutoFade();
        }
    }, []);

    useEffect(() => {
        if (errorText && autoFade) {
            doHideWarning(false);
            doAutoFade();
        }
    }, [errorText]);

    const doHideWarning = (val) => {
        setHidden(val);
    }

    const doAutoFade = () => {
        setTimeout(() => {
            doHideWarning(true);
        }, fadeAfter ? fadeAfter : 2500)
    }

    if (hidden || !errorText) return null;
    return (<View style={{
        position: 'absolute',
        width: WIDTH,
        height: HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <View style={{
            maxWidth: WIDTH * 3 / 5,
            backgroundColor: '#000',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
        }}>
            <Text style={{
                color: '#fff',
                fontSize: 15,
                textAlign: 'center'
            }}>{errorText}</Text>
        </View>
    </View>)
}

export default React.memo(ChatWarning);