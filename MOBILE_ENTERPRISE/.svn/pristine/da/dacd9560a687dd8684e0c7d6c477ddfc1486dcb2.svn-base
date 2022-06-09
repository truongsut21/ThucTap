import React from 'react';
import { SafeAreaView, View, Image, Dimensions } from 'react-native';
import StatusBar from '../../base/components/StatusBar';
import * as Action from '../../auth/controllers/actionTypes';
import { connect } from 'react-redux';

class Splash extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // if (this.props.activeUserId && this.props.loggedUsers[this.props.activeUserId] && this.props.loggedUsers[this.props.activeUserId].token) {
            this.props.dispatch({
                type: Action.API_GET_MY_USER_INFO,
                ttype: 'splash',
            })
        // }
        // else {
        //     this.props.dispatch({
        //         type: 'UPDATE_SPLASH_SCREEN',
        //         data: false,
        //     })
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        try {
            // if (!this.props.loggedUsers[this.props.activeUserId] || this.props.loggedUsers[this.props.activeUserId].token) {
                this.props.dispatch({
                    type: 'UPDATE_SPLASH_SCREEN',
                    data: false,
                })
            // }
        } catch (error) {

        }
    }

    render() {
        return (
            <React.Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#00A48D' }} />
                <SafeAreaView style={{ flex: 1 }}>
                    <StatusBar barStyle='light-content' backgroundColor='#00A48D' />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }}>
                        <Image style={{
                            width: Dimensions.get('window').width * 0.3,
                            height: Dimensions.get('window').width * 0.3,
                        }} source={require('../../auth/static/logo.png')} />
                    </View>
                    {/* } */}
                </SafeAreaView>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeUserId: state.AuthStoredReducer.activeUserId,
        loggedUsers: state.AuthStoredReducer.loggedUsers,
    }
}
export default connect(mapStateToProps)(Splash);