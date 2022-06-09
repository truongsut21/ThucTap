import React, { useEffect, useRef, useState } from 'react';
import {
    View, Platform,
    Animated, Easing,
    LayoutAnimation, UIManager
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import { useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import TypingList from './TypingList';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

function SomeoneIsTyping({ activeThreadId }) {
    const typers = useSelector(state => {
        let threadTypers = state.ChatUnstoredReducer.myThreadTypers;
        if (activeThreadId && threadTypers[activeThreadId]) {
            let typingCount = threadTypers[activeThreadId].length;
            if (typingCount > 1) {
                return 1;
            } else {
                return typingCount;
            }
        }
        return 0;
    }, (prev, next) => prev === next);
    const prevTypers = useRef(typers);
    const firstDot = useRef(new Animated.Value(5)).current;
    const secondDot = useRef(new Animated.Value(5)).current;
    const thirdDot = useRef(new Animated.Value(5)).current;

    useEffect(() => {
        if (typers) {
            runDotAnimation();
        }
    }, [])

    useEffect(() => {
        if (!isEqual(typers, prevTypers)) {
            LayoutAnimation.configureNext({
                duration: 200,
                update: {
                    type: LayoutAnimation.Types.linear,
                },
            });
            if (typers > 0 && prevTypers.current <= 0) {
                runDotAnimation();
            }
            prevTypers.current = typers;

        }
    }, [typers]);

    const runDotAnimation = () => {
        bounceFirstDot();
        setTimeout(() => {
            bounceSecondDot()
        }, 200);
        setTimeout(() => {
            bounceThirdDot()
        }, 400);
    }

    const bounceFirstDot = () => {
        if (!typers) {
            firstDot.setValue(5);
            return true
        };
        firstDot.setValue(5);
        Animated.timing(firstDot, {
            toValue: -5,
            duration: 600,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(({ finished }) => {
            if (finished) {
                Animated.timing(firstDot, {
                    toValue: 5,
                    duration: 600,
                    easing: Easing.linear,
                    useNativeDriver: true
                }).start(({ finished }) => {
                    if (finished) {
                        bounceFirstDot();
                    }
                })
            }
        })
    }

    const bounceSecondDot = () => {
        if (!typers) {
            secondDot.setValue(5);
            return true;
        }
        secondDot.setValue(5);
        Animated.timing(secondDot, {
            toValue: -5,
            duration: 600,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(({ finished }) => {
            if (finished) {
                Animated.timing(secondDot, {
                    toValue: 5,
                    duration: 600,
                    easing: Easing.linear,
                    useNativeDriver: true
                }).start(({ finished }) => {
                    if (finished) {
                        bounceSecondDot();
                    }
                })
            }
        })
    }

    const bounceThirdDot = () => {
        if (!typers) {
            thirdDot.setValue(5);
            return true;
        }
        thirdDot.setValue(5);
        Animated.timing(thirdDot, {
            toValue: -5,
            duration: 600,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(({ finished }) => {
            if (finished) {
                Animated.timing(thirdDot, {
                    toValue: 5,
                    duration: 600,
                    easing: Easing.linear,
                    useNativeDriver: true
                }).start(({ finished }) => {
                    if (finished) {
                        bounceThirdDot();
                    }
                })
            }
        })
    }

    try {
        if (!typers) return (<View style={{ height: 10, width: 0 }}></View>);
        return (<View style={{
        
            flexDirection: 'row',
            height: 35,
            borderColor: '#fff',
            marginLeft: 45,
            marginTop: 5,
            marginBottom: 10,
        }}>
            <View style={{
              
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                width: 60,
                borderRadius: 20,
            }}>
                <Animated.View style={{
                    transform: [{
                        translateY: firstDot
                    }]
                }}>
                    <Octicons name="primitive-dot" size={15} style={{ paddingRight: 5, color: '#a3a3a3' }} />
                </Animated.View>
                <Animated.View style={{
                    transform: [{
                        translateY: secondDot
                    }]
                }}>
                    <Octicons name="primitive-dot" size={15} style={{ paddingRight: 5, color: '#a3a3a3' }} />
                </Animated.View>
                <Animated.View style={{
                    transform: [{
                        translateY: thirdDot
                    }]
                }}>
                    <Octicons name="primitive-dot" size={15} style={{ color: '#a3a3a3' }} />
                </Animated.View>
            </View>
            {/* {
                activeThread.is_group ?
                    <TypingList activeThreadId={activeThread.thread_id} />
                    : null
            } */}
        </View>);
    } catch (error) {
        return null;
    }
}

export default React.memo(SomeoneIsTyping, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})