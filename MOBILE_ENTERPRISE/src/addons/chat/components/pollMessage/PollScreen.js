import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
    createRef,
    useReducer,
    
} from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    LayoutAnimation,
    UIManager,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    Platform,
    Keyboard
} from "react-native";
import {
    chatBoxFlatListRef,
  } from "../../static/ChatRef";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "../../static/style";
import { useNavigation, useRoute } from "@react-navigation/native";
import BaseTemplate from "../../../base/components/BaseTemplate";
import PollOption from "./PollOption";
import { HEIGHT, WIDTH, basePollTemplate } from "../../controllers/utils";
import { cloneDeep, orderBy, unionBy, without } from "lodash";
import isEqual from "react-fast-compare";
import * as Action from "../../controllers/actionTypes";
import * as AuthAction from "../../../auth/controllers/actionTypes";
import { useDispatch, useSelector } from "react-redux";
// import { ScrollView } from 'react-native-gesture-handler';
var ObjectID = require("bson-objectid");
import { getStatusBarHeight } from "../../../../config/utilities";
import { hasNotch } from "react-native-device-info";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

function myanswers(state, action) {
    switch (action.type) {
        case "check": {
            let { _id } = action.data;
            return { ...state, [_id]: true };
        }
        case "uncheck": {
            let { _id } = action.data;
            delete state[_id];
            return { ...state };
        }
        default:
            throw new Error();
    }
}

const PollScreen = ({ }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    let messId = "";
    if (!route.params) {
        messId = "";
    } else {
        messId = route.params.message_id;
    }
    const myUserId = useSelector(
        (state) => {
            return state.AuthStoredReducer.myUserInfo._id;
        },
        (prev, next) => prev === next
    );
    const [isCreatePollScreen, setIsCreatePollScreen] = useState(
        route && route.params && route.params.message_id ? false : true
    );
    const pollMessage = useSelector((state) => {
        if (isCreatePollScreen) {
            return null;
        }
        const fullMessages = state.ChatStoredReducer.fullMessages;
        let message_id = route.params.message_id;
        let message = fullMessages[message_id] ? fullMessages[message_id] : null;
        return message.content || null;
    });
    const [question, setQuestion] = useState(
        pollMessage ? pollMessage.question : ""
    );
    const [choices, setChoices] = useState(
        pollMessage ? pollMessage.choices : [...basePollTemplate()]
    );
    const reduxMyAnswers = useSelector((state) => {
        if (isCreatePollScreen) {
          return {};
        }
        const pollAnswers = state.ChatStoredReducer.pollAnswers;
        let myAnswersInMessage = pollAnswers[messId]
        if (pollAnswers && myAnswersInMessage) {
          // lấy đáp án trong poll
          
          let res = {};
          let templateChoices = pollMessage.choices || [];
          templateChoices.forEach((a) => {
            if (
              myAnswersInMessage[a._id] && myAnswersInMessage[a._id][myUserId]) {
              res[a._id] = true;
            }
          });
          return res;
        } else {
          return {};
        }
      });
    const [myAnswers, dispatchMyAnswers] = useReducer(myanswers, reduxMyAnswers);
    const [isDoingAPI, setIsDoingAPI] = useState(false);
    const optionsRef = useRef({});
    const [heightOfViewBelowKeyboard, setHeightOfViewBelowKeyboard] = useState(0)
    const viewabilityConfigRef = useRef({
        viewAreaCoveragePercentThreshold: 100,
      });


    useEffect(() => {

        const keyboardWillShowListener = Keyboard.addListener(
            "keyboardWillShow",
            _keyboardWillShow
        )
        const keyboardWillHideListener = Keyboard.addListener(
            "keyboardWillHide",
            _keyboardWillHide
        )
        return () => {
            keyboardWillShowListener.remove();
            keyboardWillHideListener.remove();
        }

    }, []);



    _keyboardWillShow = (e) => {
        // chatBoxFlatListRef.current.scrollToIndex({
        //     animated: true,
        //     index: choices.length - 2,
        //     viewPosition: 0,
        //   });
        if (Platform.OS !== "android") {
            let height =
                e.endCoordinates.height -
                (Platform.OS === "android"
                    ? 0
                    : getStatusBarHeight(true) - (hasNotch() ? 10 : 20));
          
            setHeightOfViewBelowKeyboard(height)
        }
    }

    _keyboardWillHide = (e) => {
        // chatBoxFlatListRef.current.scrollToIndex({
        //     animated: true,
        //     index: choices.length - 3,
        //     viewPosition: 0,
        //   });
        setHeightOfViewBelowKeyboard(0)
    };
    useEffect(() => {
        choices.forEach((o) => {
            if (!optionsRef.current[o._id]) {
                optionsRef.current[o._id] = createRef();
            }
        });
    }, [choices]);

    const onChangeQuestion = (e) => {
        setQuestion(e);
    };

    const onChangeTextOption = (_id, value) => {
        if (isDoingAPI) {
            return true;
        }
        let template = choices.find((o) => o._id === _id);
        if (!template) {
            return true;
        }
        template.title = value;
        setChoices(
            orderBy(
                unionBy([template], choices, "_id"),
                ["create_date", "_id"],
                ["asc", "asc"]
            )
        );
    };

    const onClickCheckBox = (_id) => {
        if (isDoingAPI) {
            return true;
        }
        if (myAnswers[_id]) {
            dispatchMyAnswers({
                type: "uncheck",
                data: {
                    _id: _id,
                },
            });
        } else {
            dispatchMyAnswers({
                type: "check",
                data: {
                    _id: _id,
                },
            });
        }
    };

    const onClickDeleteOption = (_id) => {
        if (isDoingAPI) {
            return true;
        }
        let i = choices.findIndex((o) => o._id === _id);
        if (i === -1) return true;
        //Force bỏ check chọn vào answer
        dispatchMyAnswers({
            type: "uncheck",
            data: {
                _id: choices[i]._id,
            },
        });
        //xóa answer option trên giao diện
        let copyOfTemplates = [...choices];
        copyOfTemplates.splice(i, 1);
        LayoutAnimation.configureNext({
            duration: 150,
            update: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
        });
        setChoices(copyOfTemplates);
    };

    const onPressCreatePoll = () => {
        if (isDoingAPI) {
            return true;
        }
        if (!question || choices.length < 2) {
            return true;
        }
        dispatch({
            type: Action.API_CREATE_POLL,
            data: {
                question: question,
                choices: choices.map((o) => o.title),
            },
            setIsDoingAPI: setIsDoingAPI,
            navigation: navigation,
        });
    };

    const onPressUpdatePoll = () => {
        if (isDoingAPI) {
            return true;
        }
        let optionHasEmptyText = without(
            choices.map((a) => {
                if (!a.title || a.title.trim().length === 0) {
                    return true;
                }
                return null;
            }),
            null
        );
        if (optionHasEmptyText.length > 0) {
            dispatch({
                type: AuthAction.UPDATE_ERROR,
                data: { error: "Hãy điền nội dung câu trả lời thêm mới" },
            });
            return true;
        }
        dispatch({
            type: Action.API_ANSWER_THE_POLL,
            data: {
                message_id: route.params.message_id,
                new_select_ids: Object.keys(myAnswers), //Các answer được chọn
                new_added_choices: without(
                    choices.map((a) => {
                        if (a.isDraft) {
                            return a;
                        }
                        return null;
                    }),
                    null
                ), //Các option answer được add mới
            },
            setIsDoingAPI: setIsDoingAPI,
            navigation: navigation,
        });
    };

    const keyExtractor = (item, index) => {
        return item._id;
    };

    const renderItem = ({ item, index }) => {
        // console.log("myAnswers",myAnswers);
        return (
            <PollOption
                forwardRef={optionsRef.current[item._id]}
                data={item}
                isCreatePollScreen={isCreatePollScreen}
                isChecked={reduxMyAnswers[item._id] ? true : false}
                onChangeTextOption={onChangeTextOption}
                onClickCheckBox={onClickCheckBox}
                onClickDeleteOption={onClickDeleteOption}
            />
        );
    };

    //Chạy khi input ký tự đầu tiên trong box 'Thêm câu trả lời'
    //Vừa tạo option mới trong state, vừa đổi focus input
    const onInputingNewOption = (e) => {
        if (isDoingAPI) {
            return true;
        }
        LayoutAnimation.configureNext({
            duration: 150,
            update: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
        });
        let _id = ObjectID().toString();
        setChoices((prev) =>
            prev.concat([
                {
                    _id: _id,
                    title: e,
                    isDraft: true,
                    create_date: new Date().getTime(),
                },
            ])
        );
        setTimeout(() => {
            optionsRef.current[_id].current && optionsRef.current[_id].current.focus();
        }, 50);
    };

    const ListFooterComponent = useCallback(() => {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 7,
                    height: 40,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <AntDesign name="pluscircle" size={25} color="#a3a3a3" />
                </View>

                <View
                    style={{
                        marginLeft: 10,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <TextInput
                        style={{
                            flex: 1,
                            fontSize: 17,
                        }}
                        placeholder={"Thêm câu trả lời"}
                        placeholderTextColor="#a3a3a3"
                        multiline={true}
                        onChangeText={onInputingNewOption}
                        autoCorrect={false}
                        value={""}
                    />
                </View>
            </View>
        );
    }, []);

    const disableCreateButton = () => {
        return (
            question.trim().length < 1 ||
            without(
                choices.map((t) => {
                    if (t.title && t.title.trim().length > 0) {
                        return t;
                    }
                    return null;
                }),
                null
            ).length < 2
        );
    };

    return (

        <BaseTemplate
            headerLeft={
                <TouchableOpacity
                    style={[styles.aaf, { width: 40 }]}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <AntDesign color="#00A48D" size={22} name="arrowleft" style={{}} />
                </TouchableOpacity>
            }
            headerCenter={
                <Text
                    style={{ marginHorizontal: 20, fontSize: 18, fontWeight: "500" }}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                >
                    Cuộc bình chọn
                </Text>
            }
            headerRight={
                <View style={{ width: 40 }}>
                    {!isCreatePollScreen &&
                        pollMessage &&
                        (!isEqual(choices, pollMessage.choices) ||
                            !isEqual(myAnswers, reduxMyAnswers)) ? (
                        <TouchableOpacity
                            onPress={onPressUpdatePoll}
                            disabled={isDoingAPI}
                        >
                            {isDoingAPI ? (
                                <ActivityIndicator color="#00A48D" />
                            ) : (
                                <Text
                                    style={{
                                        color: "#00A48D",
                                        fontSize: 17,
                                        fontWeight: "600",
                                    }}
                                >
                                    Lưu
                                </Text>
                            )}
                        </TouchableOpacity>
                    ) : null}
                </View>
            }
        >
            {/* Kết quả chỉ có sau khi tạo poll */}



            {!isCreatePollScreen ? (
                <TouchableOpacity
                    style={{
                        marginTop: 10,
                        marginHorizontal: 15,
                    }}
                    onPress={() => {
                        navigation.navigate("PollDetails", {
                            data: messId,
                        });
                    }}
                >
                    <Text style={{ fontSize: 17, color: "#00A48D", fontWeight: "600" }}>
                        CHI TIẾT BÌNH CHỌN
                    </Text>
                </TouchableOpacity>
            ) : null}

            <View
                style={{
                    flex: 1,
                    // backgroundColor: '#ddd'
                    marginTop: 10,
                    marginHorizontal: 15,
                }}
            >
                <Text style={{ fontSize: 17, color: "#a3a3a3", fontWeight: "600" }}>
                    CÂU HỎI
                </Text>
                {isCreatePollScreen ? (
                    <TextInput
                        style={{
                            width: WIDTH,
                            marginVertical: 10,
                            fontSize: 18,
                        }}
                        placeholder={"Câu hỏi của bạn là gì ?"}
                        placeholderTextColor="#d3d3d3"
                        multiline={true}
                        onChangeText={onChangeQuestion}
                        autoCorrect={false}
                        value={question}
                    />
                ) : (
                    <Text
                        style={{
                            marginVertical: 10,
                            fontSize: 18,
                        }}
                    >
                        {question}
                    </Text>
                )}

                <View style={{ height: 20 }} />

                <Text style={{ fontSize: 17, color: "#a3a3a3", fontWeight: "600" }}>
                    TRẢ LỜI
                </Text>
                <View style={{ paddingBottom: 100 }}>
                    <FlatList
                    style={{
                        zIndex: 0,
                        marginVertical: 10
                      }}
                      contentContainerStyle={{ flexGrow: 1 }}
                        ref={chatBoxFlatListRef}
                        keyboardShouldPersistTaps="always"
                        data={choices}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        ListFooterComponent={ListFooterComponent}
                        
                       />
                    
                </View>
            </View>

            {isCreatePollScreen ? (
                <TouchableOpacity
                    style={{
                        WIDTH: WIDTH - 30,
                        marginHorizontal: 15,
                        marginVertical: 10,
                        paddingVertical: 15,
                        backgroundColor: disableCreateButton() ? "#eee" : "#00A48D",
                        borderRadius: 10,
                        alignItems: "center",
                    }}
                    disabled={disableCreateButton()}
                    onPress={onPressCreatePoll}
                >
                    {isDoingAPI ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: "600",
                                color: disableCreateButton() ? "#aaa" : "#fff",
                            }}
                        >
                            Tạo bình chọn
                        </Text>
                    )}
                </TouchableOpacity>
            ) : null}
            <View
                // renderToHardwareTextureAndroid={true}
                style={{
                    // height: this.state.showSticker ? (this.state.heightOfViewBelowKeyboard + 25) : this.state.heightOfViewBelowKeyboard,
                    height: heightOfViewBelowKeyboard,
                    backgroundColor: "#fff",
                }}
            >

            </View>

        </BaseTemplate>

    );
};

export default React.memo(PollScreen);
