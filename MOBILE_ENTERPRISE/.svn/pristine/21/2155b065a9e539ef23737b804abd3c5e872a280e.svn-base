import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    SafeAreaView, FlatList, Text, View, TextInput,
    TouchableOpacity, Platform, ActivityIndicator,
    LayoutAnimation, UIManager, StatusBar
} from 'react-native';
import Animated from 'react-native-reanimated';
import ThreadElement from './ThreadElement';
import NetworkStatus from './NetworkStatus';
import { connect, useDispatch, useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import * as Action from '../controllers/actionTypes';
import { threadListRef } from '../static/ChatRef';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import useTheme from '../../base/components/useTheme';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ThreadList = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { maxThreadToShow, Threads } = useSelector(state => {
        try {
            const simpleThreads = state.ChatStoredReducer.simpleThreads || [];
            const maxThreadToShow = state.ChatUnstoredReducer.maxThreadToShow || 20;
            const Threads = simpleThreads.slice(0, maxThreadToShow).map(t => t._id);
            return { Threads, maxThreadToShow }
        } catch (error) {
            return { Threads: [], maxThreadToShow: 0 }
        }
    }, (prev, next) => isEqual(prev, next));
    const [loading, setLoading] = useState(false);
    const onEndReachedCalledDuringMomentum = useRef(false);
    const alreadyShownAllThreads = useRef(false);


    useEffect(() => {
        LayoutAnimation.configureNext({
            duration: 100,
            update: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
        });
    }, [Threads]);

    const unsetLoading = (thatsAllThread) => {
        onEndReachedCalledDuringMomentum.current = false;
        alreadyShownAllThreads.current = thatsAllThread ? true : false;
        setLoading(false);
    }

    const pressOnSearchBox = (e) => {
        navigation.navigate('SearchThreadList');
    }

    const keyExtractor = (item) => item;

    const renderItem = ({ item, index }) => {
        try {
            return (<ThreadElement _id={item} />)
        }
        catch (error) {
            return <React.Fragment />
        }

    };

    const ListFooterComponent = useMemo(() => {
        if (!loading) {
            return null;
        }
        return (<View style={{
            flex: 1,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        }}>
            <ActivityIndicator animating={true} size='small' color='#00A48D' />
        </View>)
    }, [loading]);

    const onEndReached = () => {
        try {
            if (!onEndReachedCalledDuringMomentum.current && !loading && !alreadyShownAllThreads.current) {
                setLoading(true);
                onEndReachedCalledDuringMomentum.current = true;
                dispatch({
                    type: Action.API_FETCH_THREAD_LIST_OLDER,
                    dispatch: dispatch,
                    unsetLoading: unsetLoading
                })
            }
        }
        catch (error) {

        }
    }

    const onMomentumScrollEnd = () => {
        onEndReachedCalledDuringMomentum.current = false;
    }

    const handleScroll = (e) => {
        if (e.nativeEvent.contentOffset.y <= 0 && maxThreadToShow > 20) {
            dispatch({
                type: Action.UPDATE_MAX_THREAD_TO_SHOW,
                data: 20
            })
            alreadyShownAllThreads.current = false;
        }
    }

    const goCreateThread = () => {
        navigation.navigate('TotalCreateThreadGruop', {});
    }

    const goSetting = () => {
        navigation.navigate('Setting', {});
    }

    const Header = useMemo(() => {
        return (<React.Fragment>
            <View style={{
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{
                    paddingLeft: 10,
                    fontSize: 30,
                    fontWeight: '500',
                    color: theme.textColor
                }}>
                    Tin nhắn
                </Text>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 5,
                        }}
                        onPress={goCreateThread}
                    >
                        <FontAwesome
                            name="edit"
                            size={22}
                            color={theme.iconColor}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 5,
                            marginRight: 5
                        }}
                        onPress={goSetting}
                    >
                        <AntDesign
                            name="setting"
                            size={22}
                            color={theme.iconColor}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    height: 45,
                    flexDirection: 'row',
                }}
            >
                <View style={{
                    flex: 1,
                    width: "100%",
                    height: 35,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 10,

                }}>
                    <TouchableOpacity
                        onPress={pressOnSearchBox}
                        activeOpacity={1}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            borderColor: theme.backgroundPlaceholderColor,
                            backgroundColor: theme.backgroundPlaceholderColor,
                            borderWidth: 0.5,
                            justifyContent: 'center',
                        }}>
                        <Text style={{
                            fontSize: 16,
                            color: theme.textPlaceholderColor
                        }}>
                            Tìm kiếm...
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </React.Fragment>)
    }, []);


    return (<SafeAreaView style={{
        flex: 1,
        backgroundColor: theme.backgroundColor
    }}>
        <StatusBar barStyle={theme.statusBar} />
        {Header}
        <NetworkStatus />
        <View style={{
            flex: 1,
            backgroundColor: theme.backgroundColor,
        }}>
            {/* <View style={{ backgroundColor: '#fff', flex: 1 }}> */}
            <FlatList
                ref={threadListRef}
                showsVerticalScrollIndicator={true}
                data={Threads}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                getItemLayout={(data, index) => ({ length: 80, offset: 80 * index, index })}
                onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum.current = false; }}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onEndReachedThreshold={0.3}
                onEndReached={onEndReached}
                ListFooterComponent={ListFooterComponent}
                onScroll={handleScroll}
                removeClippedSubviews={true}
            />
            {/* </View> */}
        </View>
    </SafeAreaView>)
}

export default React.memo(ThreadList, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
});

// class ThreadList extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             loading: false,
//         }
//         this.contentOffsetY = new Animated.Value(35);
//         this.onEndReachedCalledDuringMomentum = false;
//         this.handleScroll = this.handleScroll.bind(this)
//         this._isMounted = false;
//     }


//     unsetLoading = ({ thatsAllThread }) => {
//         var self = this;
//         self.onEndReachedCalledDuringMomentum = false;
//         self.setState({
//             loading: false,
//             thatsAllThread: thatsAllThread
//         })
//     }


//     pressOnSearchBox = (e) => {
//         this.props.navigation.navigate('SearchThreadList');
//     }

//     keyExtractor = (item) => item;

//     renderItem = ({ item, index }) => {
//         try {
//             return (<ThreadElement
//                 _id={item}
//             />)
//         }
//         catch (error) {
//             return <React.Fragment />
//         }

//     };

//     ListFooterComponent = () => {
//         return (
//             this.state.loading
//                 ?
//                 <View style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
//                     <ActivityIndicator animating={true} size='small' color='#00A48D' />
//                 </View> : null
//         )
//     }
//     onEndReached = () => {
//         try {
//             if (!this.onEndReachedCalledDuringMomentum && !this.state.loading && !this.state.thatsAllThread) {
//                 this.setState({
//                     loading: true,
//                 }, () => {
//                     this.props.dispatch({
//                         type: Action.API_FETCH_THREAD_LIST_OLDER,
//                         dispatch: this.props.dispatch,
//                         unsetLoading: this.unsetLoading
//                     })
//                     this.onEndReachedCalledDuringMomentum = true
//                 })
//             }
//         }
//         catch (error) {

//         }
//     }

//     onMomentumScrollEnd = () => {
//         this.onEndReachedCalledDuringMomentum = false;
//     }

//     handleScroll(e) {
//         if (e.nativeEvent.contentOffset.y <= 0 && this.props.maxThreadToShow > 20) {
//             this.props.dispatch({
//                 type: Action.UPDATE_MAX_THREAD_TO_SHOW,
//                 data: 20
//             })
//             this.setState({
//                 thatsAllThread: false
//             })
//         }
//     }

//     userLiftedFingerOffScreen = (e) => {
//         try {
//             if (e.nativeEvent.contentOffset.y >= 0 && e.nativeEvent.contentOffset.y <= 16) {
//                 threadListRef.current.scrollToOffset({
//                     animated: true,
//                     offset: 0,
//                 })
//                 this.contentOffsetY.setValue(0);
//             } else if (e.nativeEvent.contentOffset.y >= 17 && e.nativeEvent.contentOffset.y <= 35) {
//                 this.contentOffsetY.setValue(35);
//                 threadListRef.current.scrollToOffset({
//                     animated: true,
//                     offset: 35,
//                 })
//             }
//         } catch (error) {

//         }
//     }

//     goCreateThread = () => {
//         this.props.navigation.navigate('TotalCreateThreadGruop', {
//             // id: Friends
//         });
//     }

//     goSetting = () => {
//         this.props.navigation.navigate('Setting', {
//             // id: Friends
//         });
//     }

//     shouldComponentUpdate(nextProps, nextState) {
//         return (
//             !isEqual(this.props, nextProps) || !isEqual(this.state, nextState)
//         )
//     }
//     componentDidMount() {
//         try {
//             this._isMounted = true;
//         }
//         catch (error) {
//         }
//     }
//     componentDidUpdate(prevProps, prevState) {
//         try {

//             //IMPORTANT !!!!
//             //IMPORTANT !!!!
//             //Làm hiệu ứng di chuyển chủ đề khi có tin nhắn mới
//             LayoutAnimation.configureNext({
//                 duration: 100,
//                 update: {
//                     type: LayoutAnimation.Types.linear,
//                     property: LayoutAnimation.Properties.opacity,
//                 },
//             });
//         }
//         catch (error) {

//         }
//     }
//     componentWillUnmount() {

//     }

//     renderThreadList() {
//         try {
//             return (<View style={{ flex: 1, backgroundColor: '#fff', }}>
//                 <View style={{ backgroundColor: '#fff', flex: 1 }}>
//                     <FlatList
//                         ref={threadListRef}
//                         showsVerticalScrollIndicator={true}
//                         data={this.props.Threads}
//                         renderItem={this.renderItem}
//                         keyExtractor={this.keyExtractor}
//                         getItemLayout={(data, index) => ({ length: 80, offset: 80 * index, index })}
//                         onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
//                         onMomentumScrollEnd={this.onMomentumScrollEnd}
//                         onEndReachedThreshold={0.3}
//                         onEndReached={this.onEndReached}
//                         ListFooterComponent={this.ListFooterComponent}
//                         onScroll={this.handleScroll}
//                         removeClippedSubviews={true}
//                     />
//                 </View>
//             </View>)
//         } catch (error) {
//             return null;
//         }
//     }

//     render() {
//         try {
//             return (<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//                 <StatusBar backgroundColor='#fff' barStyle={'dark-content'} />

//                 <View style={{
//                     height: 50,
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                 }}>
//                     <Text style={{
//                         paddingLeft: 10,
//                         fontSize: 30,
//                         fontWeight: '500'
//                     }}>
//                         Tin nhắn
//                     </Text>
//                     <View style={{
//                         flexDirection: 'row',
//                     }}>
//                         <TouchableOpacity
//                             style={{
//                                 paddingHorizontal: 5,
//                             }}
//                             onPress={this.goCreateThread}
//                         >
//                             <FontAwesome
//                                 name="edit"
//                                 size={22} color='#00A48D'
//                             />
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={{
//                                 paddingHorizontal: 5,
//                                 marginRight: 5
//                             }}
//                             onPress={this.goSetting}
//                         >
//                             <AntDesign
//                                 name="setting"
//                                 size={22} color='#00A48D'
//                             />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <View
//                     style={{
//                         height: 45,
//                         backgroundColor: '#fff',
//                         flexDirection: 'row',
//                     }}
//                 >
//                     <View style={{
//                         flex: 1,
//                         width: "100%",
//                         height: 35,
//                         justifyContent: "center",
//                         alignItems: "center",
//                         paddingHorizontal: 10,

//                     }}>
//                         <TouchableOpacity
//                             onPress={this.pressOnSearchBox}
//                             activeOpacity={1}
//                             style={{
//                                 width: "100%",
//                                 height: "100%",
//                                 borderRadius: 20,
//                                 paddingHorizontal: 20,
//                                 borderColor: "#eee",
//                                 backgroundColor: "#eee",
//                                 borderWidth: 0.5,
//                                 justifyContent: 'center',
//                                 // paddingVertical: 10
//                             }}>
//                             <Text style={{
//                                 fontSize: 16,
//                                 color: '#aaa'
//                             }}>
//                                 Tìm kiếm...
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <NetworkStatus />
//                 {this.renderThreadList()}
//             </SafeAreaView>)
//         }
//         catch (error) {
//             return (<SafeAreaView style={{
//                 flex: 1,
//                 backgroundColor: '#000'
//             }}>
//                 <Text>
//                     {error.toString()}
//                 </Text>
//             </SafeAreaView>)
//         }
//     }
// }

// function mapStateToProps(state) {
//     const myUserInfo = state.AuthStoredReducer.myUserInfo;
//     const simpleThreads = state.ChatStoredReducer.simpleThreads || [];
//     const maxThreadToShow = state.ChatUnstoredReducer.maxThreadToShow || 20;
//     const Threads = simpleThreads.slice(0, maxThreadToShow).map(t => t._id);
//     return {
//         activeUserId: myUserInfo._id,
//         maxThreadToShow: maxThreadToShow,
//         Threads: Threads,
//     }
// }
// export default connect(mapStateToProps)(ThreadList);


