import React from 'react';
import { connect } from 'react-redux';
import {
    Text
} from 'react-native';
import Animated from 'react-native-reanimated';
import isEqual from 'react-fast-compare';

class NetworkStatus extends React.Component {
    constructor(props) {
        super(props)
        this.height = new Animated.Value(0);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            !isEqual(this.props, nextProps)
        )
    }

    componentDidMount() {
        if (this.props.networkIssue) {
            Animated.timing(this.height, {
                toValue: 40,
                duration: 200,
                easing: Animated.EasingNode.linear,
                useNativeDriver: true
            }).start(finished => {

            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        try {
            if (this.props.networkIssue !== prevProps.networkIssue) {
                if (this.props.networkIssue) {
                    Animated.timing(this.height, {
                        toValue: 40,
                        duration: 200,
                        easing: Animated.EasingNode.linear,
                        useNativeDriver: true
                    }).start(finished => {

                    })
                } else {
                    Animated.timing(this.height, {
                        toValue: 0,
                        duration: 200,
                        easing: Animated.EasingNode.linear,
                        useNativeDriver: true
                    }).start(finished => {

                    })
                }
            }
        } catch (error) {

        }
    }

    render() {
        // 
        return (<Animated.View style={{
            height: this.height,
            opacity: this.height.interpolate({
                inputRange: [0, 40],
                outputRange: [0, 1]
            }),
            backgroundColor: '#e3e3e3',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{ fontSize: 13, fontWeight: '700' }}>
                Chưa có kết nối mạng
            </Text>
        </Animated.View>)
    }
}

function mapStateToProps(state) {
    return {
        networkIssue: !state.AuthStoredReducer.networkStatus,
    }
}

export default connect(mapStateToProps)(NetworkStatus);
