import React, { useEffect, useMemo, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
	Animated,
	Text,
	View,
	TouchableOpacity,
	Image,
	Dimensions,
	Platform,
} from "react-native";
import Hyperlink from "react-native-hyperlink";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import isEqual from "react-fast-compare";
// import ReactionSummary from './ReactionSummary';
import * as Action from "../../controllers/actionTypes";
import { _parseMentionContentIfExist } from "../../controllers/utils";
import MessageReactionNew from "../Messages/MessageReactionNew";
import { useNavigation } from "@react-navigation/native";
import useTheme from "../../../base/components/useTheme";

const InfoContent = ({ _id }) => {
	const theme = useTheme();

	const time = useSelector(
		(state) => {
			return state.ChatStoredReducer.fullMessages[_id].create_date;
		},
		(prev, next) => prev === next
	);

	try {
		return (
			<View
				style={{
					paddingTop: 2,
				}}
			>
				<Text
					style={{
						paddingRight: 2,
						fontSize: 11,
						// color: "rgba(52, 52, 52, 0.41)",
						color: theme.textPlaceholderColor
					}}
				>
					{format(new Date(time), "HH:mm", { locale: vi })}
				</Text>
			</View>
		);
	} catch (error) {
		return <React.Fragment></React.Fragment>;
	}
};

const MetaEmbedContent = ({ _id }) => {
	const embed = useSelector(
		(state) => {
			const fullMessages = state.ChatStoredReducer.fullMessages;
			return fullMessages[_id].metaEmbedLink;
		},
		(prev, next) => isEqual(prev, next)
	);

	try {
		if (!metaEmbedLink) return null;
		return (
			<View
				style={{
					marginTop: 10,
					flexDirection: "row",
				}}
			>
				{embed.image ? (
					<Image
						style={{
							width: Dimensions.get("window").width * 0.682,
							marginLeft: -10,
							marginRight: -25,
							height: 120,
							backgroundColor: "#ddd",
						}}
						source={{
							uri: `${embed.image}`,
						}}
					/>
				) : null}
				<View style={{ paddingVertical: 10 }}>
					<View style={{ paddingBottom: 2 }}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: "bold",
								color: "#333",
							}}
						>
							{embed.title}
						</Text>
					</View>

					<View style={{ paddingTop: 2 }}>
						<Text
							style={{ fontSize: 13, color: "#808080" }}
							ellipsizeMode="tail"
							numberOfLines={2}
						>
							{embed.meta_description}
						</Text>
					</View>
				</View>
			</View>
		);
	} catch (error) {
		return null;
	}
};

const TextContent = ({ _id, onLongPress, isPoppingup }) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const { is_removed, content } = useSelector(
		(state) => {
			const fullMessages = state.ChatStoredReducer.fullMessages;
			return {
				is_removed: fullMessages[_id].is_removed,
				content: fullMessages[_id].content,
			};
		},
		(prev, next) => isEqual(prev, next)
	);

	const [lastTimePress, setLastTimePress] = useState("");
	// viet reacton trong day

	//viet reaction trong day
	const onPress = () => {
		if (!isPoppingup) {
			const now = new Date().getTime();
			if (!lastTimePress) {
				setLastTimePress(now);
			} else {
				if (now - lastTimePress <= 300) {
					dispatch({
						type: Action.API_SEND_REACTION_TO_MESSAGE,
						data: {
							message_id: _id,
							reaction_type: 1,
						},
					});
				}
				setLastTimePress(now);
			}
		}
	};

	const onClickTagPerson = (_id) => {
		navigation.navigate('PopupUserInfo', {
			_id,
		});
	};

	const parsedContent = useMemo(() => {
		return _parseMentionContentIfExist(
			content.content,
			onClickTagPerson,
			{ color: theme.textMessageColor, fontSize: 16 },
			{ fontWeight: "400", color: theme.textMessageColor, fontSize: 16 }
		);
	}, [content])

	// const parsedContent = is_removed
	//   ? ""
	//   : _parseMentionContentIfExist(
	//     content.content,
	//     onClickTagPerson,
	//     { color: theme.textMessageColor, fontSize: 16 },
	//     { fontWeight: "400", color: theme.textMessageColor, fontSize: 16 }
	//   );
	return (
		<TouchableOpacity
			style={[
				{
					backgroundColor: theme.backgroundTextMessageColor,
					borderRadius: 15,
					marginRight: 5,
					alignItems: "flex-end",
					paddingVertical: 5,
					paddingHorizontal: 10,
					flexDirection: "row",
				},
			]}
			delayPressIn={0}
			onPress={onPress}
			delayPressOut={0}
			onLongPress={onLongPress}
			delayLongPress={100}
			activeOpacity={1}
		>
			<View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
				<Hyperlink
					linkDefault={true}
					linkStyle={{ color: "#007bff", textDecorationLine: "underline" }}
				>
					{is_removed ? (
						<Text
							style={{
								fontSize: 16,
								fontWeight: "400",
								color: is_removed ? "#ccc" : theme.textMessageColor,
							}}
						>
							Tin nhắn đã bị thu hồi
						</Text>
					) : (
						parsedContent
					)}
				</Hyperlink>

				{!is_removed ? <MetaEmbedContent _id={_id} /> : null}
				{!is_removed ? <InfoContent _id={_id} /> : null}
			</View>
			<MessageReactionNew isPoppingup={isPoppingup} mid={_id} check={false} />
		</TouchableOpacity>
	);
};

export default React.memo(TextContent, (prevProps, nextProps) => {
	return isEqual(prevProps, nextProps);
});
// class TextContent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             lastTimePressToMessage: '',
//             parsedContent: _parseMentionContentIfExist(this.props.message.content, (_id) => {
//             }, { color: '#000' })
//         }
//     }

//     shouldComponentUpdate(nextProps, nextState) {
//         return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state)
//     }

//     componentDidUpdate(prevProps, prevState) {
//         try {
//             if (!this.props.message.content !== nextProps.message.content) {
//                 let content = _parseMentionContentIfExist(this.props.message.content);
//                 this.setState({
//                     parsedContent: content
//                 })
//             }
//         }
//         catch (error) {

//         }
//     }

//     onPress = () => {
//         if (!this.props.isPoppingup) {
//             let now = new Date().getTime();
//             if (!this.state.lastTimePressToMessage) {
//                 this.setState({
//                     lastTimePressToMessage: now
//                 })
//             } else {
//                 if (now - this.state.lastTimePressToMessage <= 300) {
//                     this.props.dispatch({
//                         type: Action.API_SEND_REACTION_TO_MESSAGE,
//                         data: {
//                             thread_id: this.props.message.thread_id._id,
//                             message_id: this.props.message._id,
//                             reaction_type: 1
//                         }
//                     })
//                 }
//                 this.setState({
//                     lastTimePressToMessage: now
//                 })
//             }
//         }
//     }

//     render() {
//         try {
//             return (
//                 <TouchableOpacity style={[{
//                     backgroundColor: '#fff',
//                     borderRadius: 15,
//                     marginRight: 5,
//                     alignItems: 'flex-end',
//                     paddingVertical: 5,
//                     paddingHorizontal: 10,
//                     flexDirection: 'row',
//                 }]} delayPressIn={0} onPress={this.onPress} delayPressOut={0} onLongPress={this.props.onLongPress} activeOpacity={1}>
//                     <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }} >
//                         <Hyperlink linkDefault={true} linkStyle={{ color: '#007bff', textDecorationLine: 'underline' }}>
//                             <Text style={{
//                                 fontSize: 16,
//                                 fontWeight: '400',
//                                 color: this.props.message.is_removed ? '#ccc' : '#333',
//                             }}>
//                                 {
//                                     this.state.parsedContent
//                                 }
//                             </Text>
//                         </Hyperlink>

//                         {
//                             this.props.message.hasOwnProperty('metaEmbedLink') &&
//                                 !isEmpty(this.props.message.metaEmbedLink) && !this.props.message.is_removed
//                                 ?
//                                 <MetaEmbedContent
//                                     message_id={this.props.message._id}
//                                     metaEmbedLink={this.props.message.metaEmbedLink}
//                                 />
//                                 :
//                                 null
//                         }
//                         {
//                             !this.props.message.is_removed
//                                 ?
//                                 <InfoContent create_date={this.props.message.create_date} />
//                                 :
//                                 null
//                         }
//                     </View>
//                     {
//                         !this.props.isPoppingup && this.props.reactSummary && this.props.reactSummary.count > 0
//                             ?
//                             (
//                                 <View style={{

//                                 }}>
//                                     <ReactionSummary
//                                         navigation={this.props.navigation}
//                                         reactSummary={{ ...this.props.reactSummary, message_id: this.props.message._id }}
//                                     />
//                                 </View>
//                             )
//                             :
//                             null
//                     }
//                 </TouchableOpacity>
//             )
//         }
//         // }
//         catch (error) {
//             return null
//         }
//     }
// }

// function mapStateToProps(state, props) {
//     return {}
// }
// export default connect(mapStateToProps)(TextContent);
