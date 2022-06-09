import React from 'react';
import { connect } from 'react-redux';
import { lastMessageRef } from '../../static/ChatRef';

class SystemMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(JSON.stringify(nextProps) === JSON.stringify(this.props))
    }
    
    render() {
        try {
            return (
                <div style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 20,
                    marginTop: -10,
                    flex: 1,
                    flexDirection: 'row',

                }}>
                    {this.props.checkLastMessage ?
                        <div ref={lastMessageRef} style={{
                            position: "absolute",
                        }}></div>
                        : null}
                    <div style={{
                        display: "flex",
                        borderRadius: 15,
                        margin: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // width:"40%"
                    }}>
                        <span style={{
                            borderRadius: 20,
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: 13,
                            fontWeight: '600',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            paddingTop: 4,
                            paddingBottom: 6,
                            paddingInline: 20,
                            marginTop: 10,
                            maxWidth: 500
                        }}>
                            {this.props.name&&this.props.content&& this.props.content.content&&
                            `${this.props.content.content} từ ${this.props.name}`}
                        </span>
                    </div>
                </div>
            )
        } catch (error) {
            return null;
        }
    }
}

function mapStateToProps(state, props) {
    const fullMessages = state.ChatStoredReducer.fullMessages;
    // để BE trả về cái tên luôn
    const myUserInfo = state.AuthStoredReducer.myUserInfo || {};
    const myFriends = state.FriendStoredReducer.myFriends || {};
    const myContacts = state.FriendStoredReducer.myContacts || {};
    let create_uid = (fullMessages[props.mid] || {}).create_uid;
    let name = '';
    if(myUserInfo._id === create_uid)
    {
        name = 'Bạn'
    }
    else
    {
        name = (myFriends[create_uid]||{}).name || (myContacts [create_uid]||{}).name || " ";

    }
    return {
        content: (fullMessages[props.mid] || {}).content,
        name:name,
    }
}
export default connect(mapStateToProps)(SystemMessage);