import React from 'react';
import { TouchableOpacity, View, Image, Text, Animated, Easing } from 'react-native';
import { connect,useSelector } from 'react-redux';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
import FileViewer from 'react-native-file-viewer';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import isEqual from 'react-fast-compare';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ReactionSummary from './ReactionSummary';
import * as Action from '../../controllers/actionTypes';
import styles from './styles';
import MessageReactionNew from '../Messages/MessageReactionNew';
var RNFS = require('react-native-fs');

const InfoContent = ({ _id }) => {
    const time = useSelector(state => {
        return state.ChatStoredReducer.fullMessages[_id].create_date;
    }, (prev, next) => prev === next)


    try {
        return (<View
            style={{
                paddingVertical: 5,
            }}>
            <React.Fragment>
                <Text style={{ paddingRight: 2, fontSize: 11, color: 'rgba(52, 52, 52, 0.41)' }}>
                    {format(new Date(time), 'HH:mm', { locale: vi })}
                </Text>
            </React.Fragment>
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

    handleOnLongPress = (ev) => {
        if (!this.props.isPoppingup) {
            this.props.onLongPress(ev)
        }
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
s
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
                        <Entypo name="arrow-down" size={30} color="#00A48D" />
                    </View>)
                }
                // if (!this.props.content.content || this.props.content.content.mimetype) {
                //     return (<Image style={{ width: 25, height: 25 }}
                //         source={require('../../static/f-zip-min.png')} />)
                // } else 
                if (this.props.content.content.mimetype === 'application/msword' ||
                    this.props.content.content.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                    this.props.content.content.mimetype === 'text/plain' ||
                    this.props.content.content.mimetype === 'text/csv') {
                    return (<Image style={{ width: 25, height: 25 }}
                        source={require('../../static/f-docx-min.png')} />)
                } else if (this.props.content.content.mimetype === 'application/pdf') {
                    return (<Image style={{ width: 25, height: 25 }}
                        source={require('../../static/f-pdf-min.png')} />)
                } else if (this.props.content.content.mimetype === 'application/vnd.ms-excel' ||
                    this.props.content.content.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    return (<Image style={{ width: 25, height: 25 }}
                        source={require('../../static/f-xlxs-min.png')} />)
                } else {
                    return (<Image style={{ width: 25, height: 25 }}
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
                <TouchableOpacity
                    style={styles.aad}
                    delayPressIn={0}
                    delayPressOut={0}
                    onPress={this.onPressFile}
                    onLongPress={this.handleOnLongPress}
                     delayLongPress={200}
                    activeOpacity={1}>
                    <View style={styles.acx}>
                        <View style={styles.aae}>
                            {this.renderIcon()}
                        </View>
                        <View style={styles.aas}>
                            <View style={styles.aag}>
                                <Text numberOfLines={2} style={styles.aah} ellipsizeMode='tail'>
                                    {this.props.content.content.originalfilename}
                                </Text>
                            </View>

                            <View style={styles.aai}>
                                <Text numberOfLines={1} style={styles.aak} ellipsizeMode='tail'>
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

                    <InfoContent _id={this.props._id} />
                    <MessageReactionNew
                        isPoppingup={this.props.isPoppingup}
                        mid={this.props._id}
                        check={false}
                    />
                    {/* {
                        !this.props.isPoppingup && this.props.reactSummary
                            ?
                            (
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    bottom: 10,
                                }}>
                                    <ReactionSummary
                                        navigation={this.props.navigation}
                                        reactSummary={{
                                            ...this.props.reactSummary,
                                            message_id: this.props.message._id
                                        }}
                                    />
                                </View>
                            )
                            :
                            null
                    } */}
                </TouchableOpacity >
            )
        } catch (error) {
            return (<View style={styles.aad}>
                <View style={styles.acx}>
                    <View style={styles.aae}>
                        <Image style={{ width: 25, height: 25 }}
                            source={require('../../static/fileerror.png')} />
                    </View>
                    <View style={styles.aas}>
                        <View style={styles.aag}>
                            <Text numberOfLines={2} style={styles.aah} ellipsizeMode='tail'>
                                Không tìm thấy file
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
        const listFiles = state.ChatStoredReducer.listFiles || {};
        const fullMessages = state.ChatStoredReducer.fullMessages || {};
        let content = fullMessages[props._id].content;

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