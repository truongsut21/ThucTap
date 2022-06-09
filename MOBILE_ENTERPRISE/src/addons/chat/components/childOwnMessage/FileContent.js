import React, { useContext } from 'react';
import { TouchableOpacity, View, Image, Text, Animated, Easing } from 'react-native';
import { connect, useSelector } from 'react-redux';
import FileViewer from 'react-native-file-viewer';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import isEqual from 'react-fast-compare';
import ReactionSummary from './ReactionSummary';
import * as Action from '../../controllers/actionTypes';
import { WIDTH } from '../../controllers/utils';
import MessageReactionNew from '../Messages/MessageReactionNew';
// import RNFetchBlob from 'rn-fetch-blob';
 var RNFS = require('react-native-fs');

const InfoContent = ({ _id }) => {
    const { draft_id, time } = useSelector(state => {
        return {
            draft_id: state.ChatStoredReducer.fullMessages[_id].draft_id,
            time: state.ChatStoredReducer.fullMessages[_id].create_date,
        };
    }, (prev, next) => isEqual(prev, next))


    try {
        return (<View
            style={{
                paddingVertical: 2,
                justifyContent: 'flex-end',
                flexDirection: 'row',
            }}>
            <Text style={{ paddingRight: 2, fontSize: 11, color: '#fff' }}>
                {format(new Date(time), 'HH:mm', { locale: vi })}
            </Text>
            <View style={{ width: 14, height: 14 }}>
                {
                    _id !== draft_id ?
                        <MaterialCommunityIcons size={14} name='check' color='#fff' />
                        :
                        <MaterialCommunityIcons size={14} name='checkbox-blank-circle-outline' color='#fff' />
                }
            </View>
        </View>)
    } catch (error) {
        return (<React.Fragment></React.Fragment>)
    }
}




class FileContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            downloading: false
        }
        this.animateRotate = new Animated.Value(0);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state)
    }

    animateInfinityRotate = () => {
        if (this.props.localFile && this.state.downloading) {
            this.setState({
                downloading: false
            })
        } else {
            this.animateRotate.setValue(0);
            Animated.timing(this.animateRotate, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true
            }).start(({ finished }) => {
                if (finished) {
                    this.animateInfinityRotate();
                }
            })
        }
    }

    onPressFile = () => {
        try {
            if (this.props.localFile) {
                RNFS.exists(this.props.localFile).then(exist => {
                    if (exist) {
                        return FileViewer.open(this.props.localFile, {
                            showOpenWithDialog: true
                        })
                    } else {
                        this.props.dispatch({
                            type: Action.UPDATE_MY_FILE,
                            ttype: 'delete_file',
                            data: {
                                _id: this.props.content._id
                            }
                        })
                    }
                }).then(result => {
                }).catch(error => {
                })
            } else {
                if (!this.state.downloading) {
                    this.setState({
                        downloading: true
                    }, () => {
                        this.props.dispatch({
                            type: Action.API_DOWNLOAD_FILE,
                            data: {
                                content: this.props.content
                            },
                            dispatch: this.props.dispatch
                        })
                        this.animateInfinityRotate()
                    })
                }
            }
        } catch (error) {

        }
    }
    
    renderIcon() {
        try {
            if (!this.state.downloading) {
                if (!this.props.localFile) {
                    return (<View>
                        <Entypo name="arrow-down" size={this.props.isPin?20:30} color="#00A48D" />
                    </View>)
                }
                
          if (this.props.content.content.mimetype === 'application/msword' ||
                    this.props.content.content.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                    this.props.content.content.mimetype === 'text/plain' ||
                    this.props.content.content.mimetype === 'text/csv') {
                    return (<Image style={{ width: this.props.isPin? 15: 25, height:this.props.isPin? 15: 25 }}
                        source={require('../../static/f-docx-min.png')} />)
                } else if (this.props.content.content.mimetype === 'application/pdf') {
                    
                    return (<Image style={{ width: this.props.isPin? 15: 25, height:this.props.isPin? 15: 25 }}
                        source={require('../../static/f-pdf-min.png')} />)
                } else if (this.props.content.content.mimetype === 'application/vnd.ms-excel' ||
                    this.props.content.content.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    return (<Image style={{ width: this.props.isPin? 15: 25, height:this.props.isPin? 15: 25 }}
                        source={require('../../static/f-xlxs-min.png')} />)
                } else {
                    return (<Image style={{ width: this.props.isPin? 15: 25, height:this.props.isPin? 15: 25 }}
                        source={require('../../static/f-zip-min.png')} />)
                }
            }
             else {
                return (<Animated.View style={{
                    transform: [{
                        rotate: this.animateRotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg']
                        })
                    }]
                }}>
                    <AntDesign name="loading2" size={30} color="#00A48D" />
                </Animated.View>)
            }
        } catch (error) {
            return null;
        }
    }
    render() {

        try {
            return (
                <TouchableOpacity style={{
                    backgroundColor: '#00A48D',
                    borderRadius: 15,
                    paddingTop: 12,
                    paddingBottom: 3,
                    paddingHorizontal: 10,
                    marginRight: 5,
                }} delayPressIn={0}
                    onPress={this.onPressFile}
                     onLongPress={this.props.onLongPress}
                    delayLongPress={200}
                    activeOpacity={1}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            width: this.props.isPin ? 20 :40,
                            height: this.props.isPin ? 20 :40,
                            borderRadius: 20,
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                           
                            {this.renderIcon()}
                        </View>
                        <View style={{ paddingLeft: 5 }}>
                            <View style={{ maxWidth: WIDTH * 0.5 }}>
                                <Text numberOfLines={1} style={{
                                    fontSize: this.props.isPin ? 10:14,
                                    paddingBottom: 5, fontWeight: '700',
                                    color: '#fff'
                                }} ellipsizeMode='tail'>
                                    {this.props.content.content.originalfilename}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text numberOfLines={1} style={{
                                    fontSize: this.props.isPin ? 10:13,
                                    color: '#fff',
                                    marginTop: 2
                                }} ellipsizeMode='tail'>
                                    {
                                        this.props.content.content.filesize
                                            ?
                                            (
                                                this.props.content.content.filesize > 1024
                                                    ?
                                                    Number.parseFloat(this.props.content.content.filesize / 1024).toFixed(2) + ' Mb'
                                                    :
                                                    this.props.content.content.filesize + ' Kb'
                                            )
                                            :
                                            '-- Kb'
                                    }
                                </Text>
                            </View>
                        </View>
                    </View>
                    {this.props.isPin ? null : <MessageReactionNew
                        isPoppingup={this.props.isPoppingup}
                        mid={this.props._id}
                        check={true}
                    />}
                   {this.props.isPin ? null:  <InfoContent _id={this.props._id} />}
                     {
                        !this.props.isPoppingup && this.props.reactSummary && this.props.reactSummary.count > 0
                            ?
                            <View
                                style={{
                                    position: 'absolute',
                                    paddingHorizontal: 5,
                                    marginRight: 7,
                                    bottom: -12,
                                    left: 0
                                }}>
                                <ReactionSummary
                                    navigation={this.props.navigation}
                                    reactSummary={{ ...this.props.reactSummary, message_id: this.props.message._id }}
                                />
                            </View>
                            :
                            null
                    } 
                    
                </TouchableOpacity>
            )
        }
        catch (error) {
            return (<View style={{
                backgroundColor: '#00A48D',
                borderRadius: 15,
                paddingTop: 12,
                paddingBottom: 3,
                paddingHorizontal: 10,
                marginRight: 5,
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image style={{ width: 25, height: 25 }}
                            source={require('../../static/fileerror.png')} />
                    </View>
                    <View style={{ paddingLeft: 5 }}>
                        <View style={{ maxWidth: WIDTH * 0.5 }}>
                            <Text numberOfLines={1} style={{
                                fontSize: 14,
                                paddingBottom: 3, fontWeight: '700',
                                color: '#fff'
                            }} ellipsizeMode='tail'>
                               Đang tải file
                            </Text>
                        </View>
                    </View>
                </View>
            </View>)
        }
    }
}

function mapStateToProps(state, props) {
    try {
        let listFiles = state.ChatStoredReducer.listFiles || {};
        const fullMessages = state.ChatStoredReducer.fullMessages || {};
        let content = fullMessages[props._id] && fullMessages[props._id].content;

        return {
            localFile: listFiles[`${content.content._id}`],
            content
        }
    } catch (error) {
        return {
            localFile: null,
            content: null,
        }
    }
}

export default connect(mapStateToProps)(FileContent);
