import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ReactionSummary from './ReactionSummary';
import LogoTomWork from '../../static/logo_tomwork.svg';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import * as Action from '../../controllers/actionTypes';
import isEqual from 'react-fast-compare';

const TaskPreview = ({ thumbnailContent }) => {
    try {
        if (!thumbnailContent) {
            return (<View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50
            }}>
                <LogoTomWork style={{ width: 40, height: 40, }} />
                <View style={{
                    paddingLeft: 10
                }}>
                    <Text style={{
                        fontSize: 17,

                    }}>
                        Thẻ nhiệm vụ Tomaho Work
                    </Text>
                    <Text style={{
                        fontSize: 13,
                    }}>
                        Đang tải thông tin...
                    </Text>
                </View>
            </View>);
        }
        return (<View style={{
            flexDirection: 'column'
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5
            }}>
                <LogoTomWork style={{ width: 22, height: 22, }} />
                <Text style={{ paddingLeft: 5, fontSize: 17, fontWeight: '500' }} ellipsizeMode={'tail'} numberOfLines={1}>
                    {thumbnailContent.name}
                </Text>
            </View>
            <View style={{

            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5
                }}>
                    <AntDesign name="user" size={14} style={{ marginRight: 2 }} />
                    <Text style={{ marginRight: 2, }}>Phụ trách:</Text>
                    <Text style={{ fontWeight: '500', fontStyle: 'italic' }} ellipsizeMode={'tail'} numberOfLines={1}>
                        {thumbnailContent.create_uid ? thumbnailContent.create_uid.name : '(Chưa có người phụ trách)'}
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5
                }}>
                    <AntDesign name="clockcircleo" size={14} style={{ marginRight: 2 }} />
                    <Text style={{ marginRight: 2, }}>Thời gian:</Text>
                    <Text style={{ fontWeight: '500', fontStyle: 'italic' }}>
                        {thumbnailContent.create_date ? format(new Date(thumbnailContent.create_date), 'dd/MM/yyyy') : '--/--/----'}
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5
                }}>
                    <Entypo name="flow-tree" size={14} style={{ marginRight: 2 }} />
                    <Text style={{ marginRight: 2, }}>Quy trình:</Text>
                    <Text style={{ fontWeight: '500', fontStyle: 'italic' }} ellipsizeMode={'tail'} numberOfLines={1}>
                        {thumbnailContent.workflow_id ? thumbnailContent.workflow_id.name : '(Không thuộc quy trình nào)'}
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5
                }}>
                    <FontAwesome5 name="sign" size={14} style={{ marginRight: 2 }} />
                    <Text style={{ marginRight: 2, }}>Giai đoạn:</Text>
                    <Text style={{ fontWeight: '500', fontStyle: 'italic' }} ellipsizeMode={'tail'} numberOfLines={1}>
                        {thumbnailContent.stage_id ? thumbnailContent.stage_id.name : '(Chưa set giai đoạn)'}
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginBottom: 5
                }}>
                    <Entypo name="pencil" size={14} style={{ marginRight: 2 }} />
                    <Text style={{ marginRight: 2, }}>Ghi chú:</Text>
                    <Text style={{ fontStyle: 'italic' }} ellipsizeMode={'tail'} numberOfLines={3}>
                        {thumbnailContent.description ? thumbnailContent.description : 'Chưa có mô tả'}
                    </Text>
                </View>
            </View>
        </View>);
    } catch (error) {
        return null;
    }
}

function TaskContent({ ...props }) {

    const dispatch = useDispatch();
    const thumbnailContent = useSelector(state => {
        const thumbnailContent = state.ChatStoredReducer.thumbnailContent
        if (!thumbnailContent) return null;
        if (thumbnailContent[props.message._id]) {
            return thumbnailContent[props.message._id]
        }
        return null;
    }, (prev, next) => isEqual(prev, next));

    useEffect(() => {
        if (!thumbnailContent) {
            dispatch({
                type: Action.API_FETCH_THUMBNAIL_CONTENT,
                ttype: 'WORK',
                payload: {
                    workflow_id: props.message.fileContent.workflow_id,
                    task_id: props.message.fileContent.task_id
                },
                data: {
                    _id: props.message._id
                }
            })
        }
    }, [])

    const onPress = (e) => {

    }

    try {
        return (
            <React.Fragment>
                <TouchableOpacity style={[{
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    marginRight: 5,
                    alignItems: 'flex-end',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                }]} delayPressIn={0}
                    delayPressOut={0}
                    onPress={onPress}
                    onLongPress={props.onLongPress} activeOpacity={1}>
                    <TaskPreview thumbnailContent={thumbnailContent} />
                    {
                        !props.isPoppingup && props.reactSummary && props.reactSummary.count > 0
                            ?
                            (
                                <View style={{
                                    position: 'absolute',
                                    paddingHorizontal: 5,
                                    flexDirection: 'row-reverse',
                                    zIndex: 5,
                                    bottom: -12,
                                }}>
                                    <ReactionSummary
                                        reactSummary={{ ...props.reactSummary, message_id: props.message._id }}
                                        showReactions={props.showReactions} />
                                </View>
                            )
                            :
                            null
                    }
                </TouchableOpacity>
            </React.Fragment>)
    }
    catch (error) {
        return null
    }
}

export default React.memo(TaskContent, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})