import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView, Text, View, StatusBar
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { chatBoxRef } from '../../../navigator/StaticNavigator';
import styles from '../../static/style';
import * as Action from '../../controllers/actionTypes';
import isEqual from 'react-fast-compare';
import PinMessage from '../PinMessageComps/PinMessage';
import NetworkStatus from '../NetworkStatus';
import ChatBoxTitle from './ChatboxTitle';
import MessageZone from './MessageZone';
import { ActiveThreadContext } from './context';
import ShowInputBar from './ShowInputBar';
import useTheme from '../../../base/components/useTheme';

const ChatBox = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const theme = useTheme();
    const prevThreadIdInParams = useRef(route.params ? route.params.threadId : '');
    const lazyActiveThreadId = useSelector(state => {
        return state.ChatUnstoredReducer.activeThreadId;
    }, (prev, next) => {
        if (!next && prev) {
            return true;
        }
        return false;
    });
    const eventRemoveScreen = useRef(false);

    useEffect(() => {
        // dispatch({
        //     type: Action.UPDATE_MAX_MESSAGE_TO_SHOW,
        //     data: 20
        // });

        const { params } = route;
        if (lazyActiveThreadId !== params.threadId && params.threadId) {
            dispatch({
                type: Action.UPDATE_ACTIVE_THREAD,
                data: params.threadId,
            })
        }

        eventRemoveScreen.current = navigation.addListener('beforeRemove', event => {
            dispatch({
                type: Action.UPDATE_ACTIVE_THREAD,
                data: '',
            })
        })

        return () => {
            eventRemoveScreen.current();
        }
    }, []);

    useEffect(() => {
        try {
            const { threadId } = route.params;
            if (threadId && threadId !== prevThreadIdInParams.current) {
                dispatch({
                    type: Action.UPDATE_ACTIVE_THREAD,
                    data: threadId,
                })
            }
            prevThreadIdInParams.current = threadId;
        } catch (error) {

        }
    }, [route.params]);

    useEffect(() => {
        if (lazyActiveThreadId) {
            dispatch({
                type: Action.UPDATE_MAX_MESSAGE_TO_SHOW,
                data: 20
            })
        }
    }, [lazyActiveThreadId]);

    try {
        return (<ActiveThreadContext.Provider
            value={{
                activeThreadId: lazyActiveThreadId
            }}>
            <SafeAreaView ref={chatBoxRef} style={{
                flex: 1,
                backgroundColor: theme.backgroundColor,
            }}>
                <StatusBar barStyle={theme.statusBar} />
                {/* <View style={styles.aab}> */}
                <ChatBoxTitle activeThreadId={lazyActiveThreadId} />
                <NetworkStatus />
                <PinMessage activeThreadId={lazyActiveThreadId} />
                <MessageZone />
                {/* check show inputbar */}
                <ShowInputBar threadId={lazyActiveThreadId} />

                {/* </View> */}
            </SafeAreaView>
        </ActiveThreadContext.Provider>)
    } catch (error) {
        console.log(error);
        return (<SafeAreaView style={{
            flex: 1,
            backgroundColor: theme.backgroundColor
        }}>
        </SafeAreaView>)
    }
}

export default React.memo(ChatBox, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})

// class ChatBox extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             lazyActiveThreadId: this.props.activeThreadId,
//         }
//         this._isMounted = false;
//     }

//     shouldComponentUpdate(nextProps, nextState) {
//         //Khi back về threadlist thì activeThread được đổi thành ''
//         //Lúc này chặn việc rerender lại luôn để nhẹ hơn 69 lần
//         if (!nextProps.activeThreadId) {
//             return false;
//         }
//         return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);

//     }

//     componentDidMount() {
//         try {
//             this._isMounted = true;

//             this.props.dispatch({
//                 type: Action.UPDATE_MAX_MESSAGE_TO_SHOW,
//                 data: 20
//             })

//             const { activeThreadId } = this.props;
//             const { params } = this.props.route;
//             if (activeThreadId !== params.threadId && params.threadId) {
//                 this.props.dispatch({
//                     type: Action.UPDATE_ACTIVE_THREAD,
//                     data: params.threadId,
//                 })
//             }

//             let { navigation } = this.props;
//             this._unsubscribe = navigation.addListener('beforeRemove', event => {
//                 this.props.dispatch({
//                     type: Action.UPDATE_ACTIVE_THREAD,
//                     data: '',
//                 })
//             })
//         }
//         catch (error) {
//         }
//     }
//     componentDidUpdate(prevProps, prevState) {
//         try {
//             const params = this.props.route.params;
//             const prevParams = prevProps.route.params;
//             if (params.threadId && params.threadId !== prevParams.threadId) {
//                 const activeThread = params.threadId;
//                 this.props.dispatch({
//                     type: Action.UPDATE_ACTIVE_THREAD,
//                     data: activeThread,
//                 })
//             }

//             let { activeThreadId } = this.props;
//             if (activeThreadId && activeThreadId !== prevProps.activeThreadId) {
//                 this.setState({
//                     lazyActiveThreadId: activeThreadId
//                 });
//                 this.props.dispatch({
//                     type: Action.UPDATE_MAX_MESSAGE_TO_SHOW,
//                     data: 20
//                 })
//             }
//         }
//         catch (error) {

//         }
//     }
//     componentWillUnmount() {
//         try {
//             this._isMounted = false;

//             this.props.dispatch({
//                 type: Action.UPDATE_MAX_MESSAGE_TO_SHOW,
//                 data: 20
//             })
//             this._unsubscribe();
//         }
//         catch (error) {

//         }
//     }

//     render() {
//         try {
//             let threadId = this.state.lazyActiveThreadId;
//             return (
//                 <ActiveThreadContext.Provider value={{ activeThreadId: threadId }}>
//                     <SafeAreaView ref={chatBoxRef} style={{
//                         flex: 1,
//                         backgroundColor: '#fff',
//                     }}>
//                         <StatusBar backgroundColor='#00A48D' barStyle={'dark-content'} />
//                         <View style={styles.aab}>
//                             <ChatBoxTitle activeThreadId={threadId} />
//                             <NetworkStatus />
//                             <PinMessage activeThreadId={threadId} />
//                             <MessageZone />
//                             {/* check show inputbar */}
//                             <ShowInputBar threadId={threadId} />

//                         </View>
//                     </SafeAreaView>
//                 </ActiveThreadContext.Provider>
//             )
//         } catch (error) {
//             return (<React.Fragment>
//                 <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//                     <Text style={{ color: '#000', fontSize: 17 }}>
//                         {error.toString()}
//                     </Text>
//                 </SafeAreaView>
//             </React.Fragment>)
//         }
//     }
// }


// function mapStateToProps(state, props) {
//     let activeThreadId = state.ChatUnstoredReducer.activeThreadId;
//     return {
//         activeThreadId: activeThreadId,
//     }
// }
// export default connect(mapStateToProps)(ChatBox);