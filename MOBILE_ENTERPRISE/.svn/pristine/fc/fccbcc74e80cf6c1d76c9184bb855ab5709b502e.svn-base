import React from 'react';
import {
    Text, View
} from 'react-native';
import { connect } from 'react-redux';
import isEqual from 'react-fast-compare';

class ThreadStatusInChatBox extends React.Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            !isEqual(this.props, nextProps)
        )
    }

    render() {
        try {
            if (this.props.activeThread.is_group) {
                return (<Text style={{
                    fontSize: 10,
                    color: 'gray',
                    fontWeight: '300',
                    marginLeft: 2,
                }} numberOfLines={1} ellipsizeMode='tail'>
                    {this.props.ThreadUsers.filter(t => t.status === 1).length} thành viên
                </Text>)
            } else {
                if (this.props.onlineTime &&
                    Math.abs(this.props.onlineTime - new Date().getTime()) <= 300000) {
                    return (<Text style={{
                        fontSize: 10,
                        color: 'gray',
                        fontWeight: '300',
                        marginLeft: 2,
                    }} numberOfLines={1} ellipsizeMode='tail'>
                        Online
                    </Text>)
                } else {
                    return null;
                }
            }
        } catch (error) {
            return null;
        }
    }
}

function mapStateToProps(state, props) {
    let activeUserId = state.AuthStoredReducer.activeUserId;
    return {
        onlineTime: !props.activeThread.is_group &&
            state.ChatUnstoredReducer.myOnlineUser[props.activeThread._id]
            ?
            state.ChatUnstoredReducer.myOnlineUser[props.activeThread._id]
            :
            false,
    }
}

export default connect(mapStateToProps)(ThreadStatusInChatBox);
