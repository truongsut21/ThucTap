import React from 'react';
import { connect, useSelector } from 'react-redux';
import { View, Text, Dimensions } from 'react-native';
import isEqual from 'react-fast-compare';
import { _parseMentionContentIfExist } from "../../controllers/utils";
import useTheme from '../../../base/components/useTheme';

const SystemMessage = ({ mid }) => {
    const theme = useTheme();
    const content = useSelector(state => {
        try {
            const fullMessages = state.ChatStoredReducer.fullMessages;
            return (fullMessages[mid] || {}).content;
        } catch (error) {
            return '';
        }
    }, (prev, next) => prev === next);


    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            marginTop: -10,
            flex: 1,
            flexDirection: 'row'
        }}>
            <View style={{
                backgroundColor: theme.backgroundSystemMessageColor,
                borderRadius: 15,
                paddingVertical: 7, paddingHorizontal: 10,
                alignItems: 'center', justifyContent: 'center',
                maxWidth: Dimensions.get('window').width * 0.8,
            }}>

                <Text style={{
                    color: theme.textSystemMessageColor,
                    textAlign: 'center',
                    fontSize: 13,
                    fontWeight: '600'
                }}>
                    {content.content}
                </Text>
            </View>
        </View>
    )
}

export default React.memo(SystemMessage, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})

// class SystemMessage extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     shouldComponentUpdate(nextProps, nextState) {
//         return !isEqual(nextProps, this.props)
//     }

//     TextContent(rawContent, name) {
//         try {
//             let mentionedUsers = rawContent.match(mentionRegEx);
//             if (!Array.isArray(mentionedUsers) || mentionedUsers.length < 1) {
//                 return <Text>{`${rawContent}`}</Text>;
//             }
//             for (let i = 0; i < mentionedUsers.length; i++) {
//                 mentionedUsers[i] = {
//                     original: mentionedUsers[i],
//                     short: `@${mentionedUsers[i].substring(
//                         mentionedUsers[i].search(prefixName) + 1,
//                         mentionedUsers[i].search(postfixName)
//                     )}`,
//                     _id: mentionedUsers[i].substring(
//                         mentionedUsers[i].search(prefixId) + 1,
//                         mentionedUsers[i].search(postfixId)
//                     ),
//                 };
//             }
//             let content = `${rawContent}`;
//             mentionedUsers.forEach((m) => {
//                 content = content.replace(m.original, m.short);
//             });

//             return <Text>{`${content}`}</Text>
//         } catch (err) {
//         }
//     }

//     render() {
//         try {
//             return (
//                 <View style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     paddingVertical: 20,
//                     marginTop: -10,
//                     flex: 1,
//                     flexDirection: 'row'
//                 }}>
//                     <View style={{
//                         backgroundColor: 'rgba(0,0,0,0.2)',
//                         borderRadius: 15,
//                         paddingVertical: 7, paddingHorizontal: 10,
//                         alignItems: 'center', justifyContent: 'center',
//                         maxWidth: Dimensions.get('window').width * 0.8,
//                     }}>

//                         <Text style={{
//                             borderRadius: 5,
//                             color: '#fff',
//                             textAlign: 'center',
//                             fontSize: 13,
//                             fontWeight: '600'
//                         }}>
//                             {this.TextContent(this.props.content && this.props.content.content, this.props.name && this.props.name)}
//                         </Text>
//                     </View>
//                 </View>
//             )
//         } catch (error) {
//             return null;
//         }
//     }
// }

// function mapStateToProps(state, props) {
//     const fullMessages = state.ChatStoredReducer.fullMessages;
//     // để BE trả về cái tên luôn
//     const myUserInfo = state.AuthStoredReducer.myUserInfo || {};
//     const myFriends = state.FriendStoredReducer.myFriends || {};
//     const myContacts = state.FriendStoredReducer.myContacts || {};
//     let create_uid = (fullMessages[props.mid] || {}).create_uid;
//     let name = '';
//     if (myUserInfo._id === create_uid) {
//         name = 'Bạn'
//     }
//     else {
//         name = (myFriends[create_uid] || {}).name || (myContacts[create_uid] || {}).name || " ";

//     }

//     return {
//         content: (fullMessages[props.mid] || {}).content,
//         name: name,
//         is_removed: fullMessages[props.mid] ? fullMessages[props.mid].is_removed : null,
//     }
// }

// export default connect(mapStateToProps)(SystemMessage);