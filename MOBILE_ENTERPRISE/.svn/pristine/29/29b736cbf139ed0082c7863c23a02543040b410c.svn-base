import React, { useRef, useState } from 'react';
import { View, Image, Animated, TouchableOpacity } from 'react-native';
import ECardRecursiveBlock from './ECardRecursiveBlock';
import { WIDTH, HEIGHT } from '../../chat/controllers/utils';



const ECardRender = () => {
    const [blocks, setBlocks] = useState(
        {
            key: 1,
            tag: 'View',
            content: null,
            style: {
                width: 200, height: 200,
                backgroundColor: 'red',
                alignItems: "center",
                justifyContent: "center",
            },
            subBlocks: [{
                key: 2,
                tag: 'View',
                content: null,
                style: {
                    width: 180, height: 180,
                    backgroundColor: 'yellow',
                    alignItems: "center",
                    justifyContent: "center",
                },
                subBlocks: [{
                    key: 3,
                    tag: 'View',
                    content: null,
                    style: {
                        width: 160, height: 160,
                        backgroundColor: 'orange',
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    subBlocks: [{
                        key: 4,
                        tag: 'Text',
                        content: 'Hoho',
                        style: { color: '#fff' }
                    }, {
                        key: 5,
                        tag: 'Text',
                        content: 'Hihi',
                        style: { color: '#000' }
                    }, {
                        key: 6,
                        tag: 'SVGUri',
                        content: 'https://picsvg.com/example/bike-1.svg',
                        style: {
                            width: 30, height: 30,
                        }

                    }, {
                        key: 7,
                        tag: 'VectorIcon',
                        content: { icon: 'Ionicons', name: 'md-card-outline', size: 24 },
                        style: {}
                    }]
                }]
            }]
        }
    );
    const [whichShowing, setWhichShowing] = useState('card');
    const ref = useRef(new Animated.Value(0)).current;


    const showQR = () => {
        setWhichShowing('qr');
        Animated.timing(ref, {
            duration: 400,
            toValue: 1,
            useNativeDriver: true
        }).start();
    }

    const showCard = () => {
        setWhichShowing('card');
        Animated.timing(ref, {
            duration: 400,
            toValue: 0,
            useNativeDriver: true
        }).start();
    }

    return <TouchableOpacity activeOpacity={1}
        onPress={whichShowing === 'card' ? showQR : showCard}
    >
        <Animated.View style={{
            transform: [{
                rotateY: ref.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg']
                })
            }]
        }}>
            <View style={{
                transform: [{
                    rotate: '90deg'
                }]
            }}>
                <Image source={require('../templates/purple/testpro.png')}
                    style={{
                        width: 1004 / 2,
                        height: 590 / 2,
                    }}
                />
                {/* <ECardRecursiveBlock block={blocks} /> */}
            </View>
        </Animated.View>
    </TouchableOpacity>;
}

export default ECardRender;