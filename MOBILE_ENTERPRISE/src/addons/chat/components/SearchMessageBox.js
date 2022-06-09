import React from "react";
import {
    SafeAreaView, FlatList, View,
    Text, TouchableOpacity, TextInput,
    ActivityIndicator, Image, Dimensions
} from "react-native";
import { connect, useSelector } from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign';
import StatusBar from '../../base/components/StatusBar';
import * as Action from '../controllers/actionTypes';
import { cloneDeep, orderBy, unionBy } from 'lodash';
import { vi } from 'date-fns/locale';
import { format, formatDistanceToNowStrict } from 'date-fns';
import DefaultAvatar from '../static/default_ava.png';

const { width, height } = Dimensions.get('window');


const Avatar = ({ _id }) => {
    const avatar = useSelector(state => {
        let imageAvatars = state.ChatStoredReducer.imageAvatars
        let fastContacts = state.ChatStoredReducer.fastContacts
        if (fastContacts && fastContacts[_id] && fastContacts[_id].avatar_url) {
            if (imageAvatars[_id]) {
                return imageAvatars[_id].link;
            }
        }
        return false;
    }, (prev, next) => prev === next);

    if (avatar) {
        return (<View style={{ marginHorizontal: 10, width: 55, height: 55, borderRadius: 50 }}>
            <Image
                style={{ width: 55, height: 55, borderRadius: 50 }}
                source={{
                    uri: avatar
                }}
            />
        </View>)
    } else {
        return (
            <Image source={DefaultAvatar} style={{
                marginHorizontal: 10,
                width: 55, height: 55, borderRadius: 50,
            }} />
        )
    }
}

const Title = ({ _id }) => {
    const contactName = useSelector(state => {
        let fastContacts = state.ChatStoredReducer.fastContacts
        if (fastContacts && fastContacts[_id]) {
            return fastContacts[_id].name;
        }
        return '';
    }, (prev, next) => prev === next);
    return (
        <View style={{ height: 25 }}>
            <Text style={{ color: '#333', fontWeight: '700', fontSize: 15 }} numberOfLines={1} ellipsizeMode='tail'>
                {contactName}
            </Text>
        </View>
    );
}

class SearchMessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchMessageContent: this.props.route.params.searchMessageContent
                ?
                this.props.route.params.searchMessageContent.toString()
                :
                '',
            foundMessages: []
        }
        this.onEndReachedCalledDuringMomentum = false;
        this.endLoadMore = this.endLoadMore.bind(this);
        this.addMessages = this.addMessages.bind(this);
    }

    addMessages = (messages) => {
        let foundMessages = cloneDeep(this.state.foundMessages);
        foundMessages = unionBy(foundMessages, messages, '_id');
        foundMessages = orderBy(foundMessages, ['create_date', '_id'], ['desc', 'desc']);
        this.setState({
            foundMessages: foundMessages
        })
    }

    endLoadMore = () => {
        this.setState({
            loadingMore: false
        })
    }

    onEndReached = () => {
        if (!this.onEndReachedCalledDuringMomentum && !this.state.loadingMore) {
            this.onEndReachedCalledDuringMomentum = true
            this.setState({
                loadingMore: true
            }, () => {
                this.props.dispatch({
                    type: Action.API_SEARCH_MESSAGE_IN_THREAD_BY_CONTENT,
                    thread_id: this.props.activeThread.thread_id,
                    searchMessageContent: this.props.route.params.searchMessageContent.toString(),
                    foundMessages: this.state.foundMessages,
                    addMessages: this.addMessages,
                    endLoadMore: this.endLoadMore
                })
            })
        }
    }

    componentDidMount() {
        if (this.props.route.params.searchMessageContent) {
            this.props.dispatch({
                type: Action.API_SEARCH_MESSAGE_IN_THREAD_BY_CONTENT,
                thread_id: this.props.activeThread.thread_id,
                searchMessageContent: this.props.route.params.searchMessageContent.toString(),
                foundMessages: this.state.foundMessages,
                doSearchLocal: true,
                addMessages: this.addMessages
            })
        }
    }

    renderStatusBar() {
        return (<React.Fragment>
            {/* <StatusBar barStyle='light-content' backgroundColor='#00A48D' /> */}
            <StatusBar backgroundColor='#00A48D' barStyle={'dark-content'} />
            <View style={{
                height: 50,
                backgroundColor: '#fff',
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderBottomColor: '#ddd'
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginRight: 5 }}>
                        <TouchableOpacity
                            delayPressIn={0}
                            delayPressOut={0}
                            style={{ padding: 10 }}
                            onPress={() => this.props.navigation.goBack()}>
                            <AntIcon color='#000' size={22} name='arrowleft' style={{}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1,
                        // backgroundColor: 'red',
                        alignItems: 'center',
                    }}>
                        <View style={{ paddingVertical: 2 }}>
                            <Text style={{ fontSize: 17, color: '#000', fontWeight: '500' }}>
                                Tìm tin nhắn
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: 47 }}></View>
                </View>
            </View>
            {/* </SafeAreaView> */}
        </React.Fragment>)
    }

    formatDateTime = (timestamp) => {
        try {
            if (!isNaN(timestamp)) {
                if (formatDistanceToNowStrict(timestamp).includes('days') && formatDistanceToNowStrict(timestamp).split(' days')[0] > 7) {
                    return format(new Date(timestamp), 'dd/MM/yyyy', { locale: vi });
                } else {
                    return formatDistanceToNowStrict(timestamp, { locale: vi, addSuffix: true })
                }
            } else {
                return ''
            }
        } catch (error) {

        }
    }

    renderMessageContent = (data) => {
        try {
            return (<View style={{
                height: 25,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <View style={{ width: width / 2 }}>
                    <Text
                        style={{
                            fontSize: 13, paddingTop: 2,
                        }}
                        numberOfLines={1}
                        ellipsizeMode='tail'>
                        {data.content}
                    </Text>
                </View>

                <Text style={{
                    fontSize: 13, paddingTop: 2,
                    paddingLeft: 10,
                    fontStyle: 'italic',
                    alignContent: 'flex-end'
                }}>
                    - {this.formatDateTime(data.create_date)}
                </Text>
            </View>);
        } catch (error) {
            return null;
        }
    }

    renderBodyOfLine = (data) => {
        try {
            return (<React.Fragment>
                <View style={{
                    flex: 1, marginLeft: 5, alignItem: 'center', justifyContent: 'center',
                    alignItems: 'flex-start', paddingRight: 10,
                    borderBottomWidth: 1, borderColor: '#eeeeee',
                }}>
                    <Title _id={data.create_uid} />
                    {
                        this.renderMessageContent(data)
                    }
                </View>

            </React.Fragment>);
        } catch (error) {
            return null;
        }
    }

    renderItem = ({ item, index }) => {
        try {
            return (
                <TouchableOpacity onPress={this.onPress} delayPressIn={0} delayPressOut={0} delayLongPress={600}>
                    <View style={{
                        flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 0, height: 80,
                        backgroundColor: '#fff',
                    }}>
                        <Avatar _id={item.create_uid} />
                        {
                            this.renderBodyOfLine(item)
                        }
                    </View>
                </TouchableOpacity>
            )
        } catch (error) {
            return null;
        }
    }

    renderFooterComponent = () => {
        return (
            <View style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                {
                    this.state.loadingMore
                        ?
                        <ActivityIndicator animating={true} size='small' color='#00A48D' />
                        :
                        null
                }
            </View>
        )
    }

    keyExtractor = (item) => item._id;

    render() {
        try {
            return (<React.Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    {this.renderStatusBar()}
                    <TextInput
                        style={{
                            // flex: 1,
                            borderRadius: 5,
                            height: 40,
                            marginVertical: 10,
                            marginHorizontal: 10,
                            paddingHorizontal: 10,
                            // paddingVertical: 10,
                            // paddingLeft: 15,
                            backgroundColor: '#f3f3f3',
                            color: '#000',
                        }}
                        // onTextInput={(ev) => }
                        editable={false}
                        value={this.state.searchMessageContent}
                        placeholder='Nội dung tìm kiếm'
                        placeholderTextColor='#737373'
                        onChangeText={(searchMessageContent) => this.setState({ searchMessageContent })}
                    />
                    <FlatList
                        showsVerticalScrollIndicator={true}
                        initialNumToRender={20}
                        data={(this.state.foundMessages)}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                        onEndReachedThreshold={0.7}
                        onEndReached={this.onEndReached}
                        ListFooterComponent={this.renderFooterComponent}
                    />
                </SafeAreaView>
            </React.Fragment>)
        } catch (error) {
            return null;
        }
    }
}

function mapStateToProps(state) {
    return {
        activeThread: state.ChatUnstoredReducer.activeThread,
    }
}

export default connect(mapStateToProps)(SearchMessageBox);