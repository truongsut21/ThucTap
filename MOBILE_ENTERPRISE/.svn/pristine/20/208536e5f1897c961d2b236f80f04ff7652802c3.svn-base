import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { SafeAreaView, Text, View, ActivityIndicator, Image, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import * as AuthAction from '../controllers/actionTypes'

const Anim = require('../../../static/loading-four-zoom-dot.json');
var _ = require('lodash')

const Loading = () => {

    const dispatch = useDispatch();
    let myUserInfo = useSelector(state => state.AuthStoredReducer.myUserInfo);
    const [text, setText] = useState('dang tai du lieu')
    useEffect(() => {
        if (myUserInfo) {
            dispatch({
                type: AuthAction.API_FETCH_INIT_LANDING,
                setText,
            })
        }
        return () => { }
    }, [])

    try {
        return (
            <React.Fragment>
                <SafeAreaView>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                        backgroundColor: 'white'
                    }}>
                        <LottieView source={Anim} style={{
                            width: 300, height: 300,
                        }} autoPlay loop speed={0.5} />
                        <Text style={{
                            height: 100,
                            width: Dimensions.get('window').width * 2 / 3,
                            textAlign: "center",
                            fontSize: 20,
                        }}>
                            {text}
                        </Text>
                    </View>

                </SafeAreaView>
            </React.Fragment>
        )
    } catch (error) {
        return <React.Fragment />
    }
}

export default Loading;