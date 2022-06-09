import React, { useEffect, useRef, useState } from 'react';
import {
    Text, View, Platform,
    LayoutAnimation, UIManager,
    TouchableOpacity,
    Animated, FlatList, ScrollView

} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/core';
import isEqual from "react-fast-compare";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WIDTH, HEIGHT, } from "../../controllers/utils";
import ContactElement from '../../../friend/component/ContactElement';

var _ = require("lodash");

const DetailsReaction = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute();
    const _id = route.params._id;

    // const opacityRef = useRef(new Animated.Value(0)).current;
    // const translateYRef = useRef(new Animated.Value(HEIGHT)).current;

    const [show, setShow] = useState(false);
    const [formHeight, setFormHeight] = useState(0);

    let listDataReactions = useSelector(state => {
        let listMessageReactions = state.ChatStoredReducer.listMessageReactions
        let messageReactions = listMessageReactions[_id]
        if (!messageReactions) {
            return []
        }
        return Object.keys(messageReactions)


    }, (prev, next) => isEqual(prev, next));


    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 0);
    }, []);

    const onLayout = (e) => {
        try {
            setFormHeight(e.nativeEvent.layout.height);

        } catch (error) {

        }
    }

    const close = () => {
        setShow(false);
        setTimeout(() => {
            navigation.goBack()
        }, 200);
    };

    //
    const keyExtractor = (item, index) => item;
    //hàm render element
    const renderItem = ({ item, index }) => {
        return <View style={{paddingHorizontal: 10}}>
            <ContactElement what_doing="render-details-reaction" key={index} _id={item} _idMess={_id} />
        </View>;
    };
    // show khi không có data
    const ListEmptyComponent = () => {
        return (
            <View style={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text>Chưa có thông tin</Text>
            </View>

        )
    }

    return <React.Fragment>
        <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            isVisible={show}
            avoidKeyboard={true}
            backdropOpacity={0.5}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            style={{ margin: 0 }}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    flex: 1,
                    flexDirection: 'row',    //bắt buộc phải có cái này
                    alignItems: 'flex-end',

                }}
                onPress={close}
            >
                <View
                    onLayout={onLayout}
                    style={[{
                        flex: 1,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        backgroundColor: '#fff',
                        paddingBottom: insets.bottom,
                    }, formHeight ? { height: formHeight } : {}]}>

                    <View
                        style={{
                            height: (HEIGHT * 2) / 5 - 50,
                            // backgroundColor:"#ccc",

                        }}
                    >
                        {/* close */}
                        <View style={{
                            // position:"absolute",
                            // top:4,
                            // right:10,
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            paddingHorizontal: 10,
                            paddingVertical: 10,

                        }}>
                            <Text style={{
                                fontWeight: "500",
                                fontSize: 16,
                                flex: 1,

                            }}>
                                Chi tiết biểu cảm
                            </Text>
                            <TouchableOpacity
                                style={{
                                    paddingVertical: 4,
                                    paddingHorizontal: 6,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#eee",
                                    borderRadius: 25,
                                }}
                                onPress={close}
                            >
                                <FontAwesome name="remove" size={20} color="#737373" />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            paddingVertical: 10,
                            height: "90%",
                            // backgroundColor:"red",
                        }}>
                            <FlatList
                                data={listDataReactions}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                ListEmptyComponent={ListEmptyComponent}
                                removeClippedSubviews={true}
                            />
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        </Modal>
    </React.Fragment>
    return (
        <View>
            <Animated.View
                style={{
                    height: HEIGHT,
                    width: WIDTH,
                    backgroundColor: "#aaa",
                    opacity: 0.2,
                }}
            >
                <TouchableOpacity
                    onPress={close}
                    style={{
                        // flex: 1,
                        height: HEIGHT,
                        width: WIDTH,
                    }}
                ></TouchableOpacity>
            </Animated.View>
            <Animated.View
                style={{
                    position: "absolute",
                    zIndex: 1,
                    top: "22%",
                    height: (HEIGHT * 2) / 5,
                    width: WIDTH,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: "#fff",
                    transform: [
                        {
                            translateY: translateYRef,
                        },
                    ],
                }}
            >
                <View
                    style={{
                        height: (HEIGHT * 2) / 5 - 50,
                        // backgroundColor:"#ccc",

                    }}
                >
                    {/* close */}
                    <View style={{
                        // position:"absolute",
                        // top:4,
                        // right:10,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        paddingHorizontal: 10,
                        paddingVertical: 10,

                    }}>
                        <Text style={{
                            fontWeight: "500",
                            fontSize: 16,
                            flex: 1,

                        }}>
                            Chi tiết biểu cảm
                        </Text>
                        <TouchableOpacity
                            style={{
                                paddingVertical: 4,
                                paddingHorizontal: 6,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#eee",
                                borderRadius: 25,
                            }}
                            onPress={close}
                        >
                            <FontAwesome name="remove" size={20} color="#737373" />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        paddingVertical: 10,
                        height: "90%",
                        // backgroundColor:"red",
                    }}>
                        <FlatList
                            data={listDataReactions}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            ListEmptyComponent={ListEmptyComponent}
                            removeClippedSubviews={true}
                        />
                    </View>

                </View>
            </Animated.View>
        </View>
    )

}
export default DetailsReaction