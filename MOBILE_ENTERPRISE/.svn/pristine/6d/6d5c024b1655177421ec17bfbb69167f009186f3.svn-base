import React from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const Anim = require('../../../static/loading-matrix-spin.json');

const BeautifulLoading = () => {
    const beautifulLoading = useSelector(state => state.BaseUnstoredReducer.beautifulLoading) || false

    if (!beautifulLoading) return null;
    return (<React.Fragment>
        <View style={{
            position: 'absolute',
            zIndex: 200,
            width: WIDTH,
            height: HEIGHT,
            opacity: 0.3,
            backgroundColor: '#000',
            elevation: 10,
        }}>
        </View>
        <View style={{
            position: 'absolute',
            zIndex: 201,
            top: HEIGHT / 2 - WIDTH / 8,
            left: WIDTH / 2 - WIDTH / 8,
            width: WIDTH / 4,
            height: WIDTH / 4,
            borderRadius: 10,
            backgroundColor: '#eee',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 10,
        }}>
            <LottieView source={Anim}
                style={{
                    width: WIDTH / 4,
                    height: WIDTH / 4,

                }} autoPlay loop />
        </View>
    </React.Fragment>)
}

export default BeautifulLoading;