import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MessageStateIcon = ({ isDraft, scaleUp = 1 }) => {

    const prevIsDraft = useRef(isDraft);
    const loadingRef = useRef(new Animated.Value(0)).current;

    // useEffect(() => {
    //     if (isDraft) {
    //         rotateLoading()
    //     }
    // }, []);

    useEffect(() => {
        if (isDraft) {
            rotateLoading();
        }
        if (prevIsDraft.current !== isDraft) {
            if (!isDraft) {

            }
            prevIsDraft.current = isDraft;
        }
    }, [isDraft]);

    const rotateLoading = () => {
        try {
            if (prevIsDraft.current){
                loadingRef.setValue(0.1);
                Animated.timing(loadingRef, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }).start(() => rotateLoading());
            }
        } catch (error) {

        }
    }

    return <View style={{
        width: 15 * scaleUp,
        height: 15 * scaleUp,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        {
            isDraft ?
                <Animated.View style={{
                    width: 10 * scaleUp, height: 10 * scaleUp,
                    borderRadius: 10 * scaleUp,
                    borderTopWidth: 1,
                    borderRightWidth: 1,
                    borderColor: '#fff',
                    transform: [{
                        rotate: loadingRef.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg']
                        })
                    }]
                }} />
                :
                <MaterialCommunityIcons size={14 * scaleUp} name='check-circle-outline' color='#fff' />
        }
    </View>
}

export default MessageStateIcon;