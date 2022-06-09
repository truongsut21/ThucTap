import React, { useEffect, useState } from "react";
import {
	View, Text,
	FlatList,
	Image,
	Platform,
	PermissionsAndroid,
	TouchableOpacity,
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import AntDesign from "react-native-vector-icons/AntDesign";
import ImageResizer from "react-native-image-resizer";
import { useDispatch, useSelector, connect } from "react-redux";
import {
	WIDTH,
	HEIGHT,
	_computeNiceRatioForLowResolutionImage,
} from "../../../controllers/utils";
import * as Action from "../../../controllers/actionTypes";
import { useNavigation } from "@react-navigation/native";
var RNFS = require("react-native-fs");
const DEFAULT_NUMBER_ITEM = 18;

class SingleImage extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		if (this.props.cacheImage) {
			this.checkImageExist();
		}
		if (!this.props.cacheImage) {
			this.minifyImage();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.cacheImage) {
			this.checkImageExist();
		}
		if (!this.props.cacheImage) {
			this.minifyImage();
		}
	}

	checkImageExist = () => {
		RNFS.exists(this.props.cacheImage)
			.then((res) => {
				if (!res) {
					this.props.dispatch({
						type: Action.UPDATE_CACHE_IMAGE_GALLERY,
						ttype: "remove",
						data: {
							url: this.props.data.path,
						},
					});
				}
			})
			.catch((error) => { });
	};

	minifyImage = () => {
		const ratio = _computeNiceRatioForLowResolutionImage({
			...this.props.data.metadata,
		});
		return Promise.all([]).then(() => {
			return ImageResizer.createResizedImage(
				this.props.data.path,
				ratio.width,
				ratio.height,
				"PNG",
				100, 0, undefined, false, {}
			)
		}).then((img) => {
			this.props.dispatch({
				type: Action.UPDATE_CACHE_IMAGE_GALLERY,
				ttype: "add",
				data: {
					[this.props.data.path]: img.uri,
				},
			});
			return true;
		}).catch((error) => {
		})
	};

	onPress = () => {
		this.props.onPressImage(this.props.data);
	};

	render() {
		return (
			<TouchableOpacity
				onPress={this.onPress}
				style={{
					marginRight: 1,
					// width: (WIDTH - 30) / 2,
					width: (WIDTH - 30) / 3,
					// height: (WIDTH - 30) / 2,
					height: (WIDTH - 30) / 3,
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				<Image
					source={{ uri: this.props.cacheImage }}
					style={{
						// width: WIDTH / 2 - 20,
						width: WIDTH / 3 - 20,
						// height: WIDTH / 2 - 20,
						height: WIDTH / 3 - 20,
						borderRadius: 5,
					}}
				/>
				{this.props.isSelected ? (
					<View
						style={{
							position: "absolute",
							right: 10,
							top: 10,
						}}
					>
						<AntDesign
							name="checkcircle"
							size={20}
							style={{ color: "#00A48D" }}
						/>
					</View>
				) : null}
			</TouchableOpacity>
		);
	}
}

function mapStateToProps(state, props) {
	const cacheGalleryImage = state.ChatStoredReducer.cacheGalleryImage || {};
	return {
		cacheImage: cacheGalleryImage[props.data.path]
	}
}
SingleImage = connect(mapStateToProps)(SingleImage);

// const SingleImage = ({ data, onPressImage, isSelected }) => {
//   const dispatch = useDispatch();
//   const cacheImage = useSelector((state) => {
//     try {
//       const cacheGalleryImage = state.ChatStoredReducer.cacheGalleryImage || {};
//       return cacheGalleryImage[data.path];
//     } catch (error) {
//       return null;
//     }
//   });
//   useEffect(() => {
//     async function cIE() {
//       await checkImageExist();
//     }
//     async function mI() {
//       await minifyImage();
//     }
//     if (cacheImage) {
//       cIE();
//       //   RNFS.exists(cacheImage)
//       //     .then((res) => {
//       //       if (!res) {
//       //         dispatch({
//       //           type: Action.UPDATE_CACHE_IMAGE_GALLERY,
//       //           ttype: "remove",
//       //           data: {
//       //             url: data.path,
//       //           },
//       //         });
//       //       }
//       //     })
//       //     .catch((error) => {});
//     } else {
//       mI();
//     }
//   }, [cacheImage]);

//   const checkImageExist = async (cacheImage) => {
//     let r = await RNFS.exists(cacheImage);
//     if (!r) {
//       dispatch({
//         type: Action.UPDATE_CACHE_IMAGE_GALLERY,
//         ttype: "remove",
//         data: {
//           url: data.path,
//         },
//       });
//     }
//   };

//   const minifyImage = () => {
//     return Promise.all([])
//       .then((res) => {
//         const ratio = _computeNiceRatioForLowResolutionImage({
//           ...data.metadata,
//         });
//         return ImageResizer.createResizedImage(
//           data.path,
//           ratio.width,
//           ratio.height,
//           "PNG",
//           100
//         );
//       })
//       .then((img) => {
//         dispatch({
//           type: Action.UPDATE_CACHE_IMAGE_GALLERY,
//           ttype: "add",
//           data: {
//             [data.path]: img.uri,
//           },
//         });
//         return true;
//       })
//       .catch((error) => {});
//   };

//   const onPress = () => {
//     onPressImage(data);
//   };

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={{
//         marginRight: 1,
//         width: (WIDTH - 30) / 2,
//         height: (WIDTH - 30) / 2,
//         flexDirection: "row",
//         justifyContent: "center",
//       }}
//     >
//       <Image
//         source={{ uri: cacheImage }}
//         style={{
//           width: WIDTH / 2 - 20,
//           height: WIDTH / 2 - 20,
//           borderRadius: 10,
//         }}
//       />
//       {isSelected ? (
//         <View
//           style={{
//             position: "absolute",
//             right: 10,
//             top: 10,
//           }}
//         >
//           <AntDesign
//             name="checkcircle"
//             size={20}
//             style={{ color: "#00A48D" }}
//           />
//         </View>
//       ) : null}
//     </TouchableOpacity>
//   );
// };

const Gallery = ({ previewImages, onPressImage }) => {
	const navigation = useNavigation();
	const [galleryImages, setGalleryImages] = useState([]);
	const [offsetCursorPhoto, setOffsetCursorPhoto] = useState("");

	useEffect(() => {
		try {
			async function start() {
				const r = await openGallery();
				if (Array.isArray(r)) {
					setGalleryImages(r);
				}
				return true;
			}
			start();
		} catch (error) { }
	}, []);

	const _askAndroidGalleryPermission = async () => {
		try {
			const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

			const hasPermission = await PermissionsAndroid.check(permission);
			if (hasPermission) {
				return true;
			}

			const status = await PermissionsAndroid.request(permission);
			return status === "granted";
		} catch (error) {
			return false;
		}
	}

	const _getParamsForGetPhotos = () => {
		let result = { first: DEFAULT_NUMBER_ITEM }
		if (Platform.OS === "android") {
			result = { ...result, include: ["imageSize"] }
		}
		if (!offsetCursorPhoto) {
			return result;
		}
		return {
			...result,
			after: offsetCursorPhoto,
		}
	}

	const _simplifyRenderObject = (obj) => {
		return {
			filename: obj.image.filename,
			path: obj.image.uri,
			metadata: {
				width: obj.image.width,
				height: obj.image.height,
			},
		};
	};

	const _getGallery = async () => {
		try {
			let res = await CameraRoll.getPhotos(_getParamsForGetPhotos());
			const { edges } = res;
			if (edges.length === 0) {
				return true;
			}
			let imgs = [];
			for (let i = 0; i < edges.length; i++) {
				imgs.push(_simplifyRenderObject(edges[i].node));
			}
			return imgs;
		} catch (error) {
			return true;
		}
	};

	const openGallery = async () => {
		if (Platform.OS === "android") {
			let res = await _askAndroidGalleryPermission();
			if (!res) return true;
		}
		let r = await _getGallery();
		return r;
	};

	const renderItem = ({ item, index }) => {
		try {
			return (
				<SingleImage
					data={item}
					onPressImage={onPressImage}
					isSelected={
						previewImages.findIndex(
							(m) => m && item && m.path === item.path
						) !== -1
					}
				/>
			);
		} catch (error) {
			return null;
		}
	};

	const keyExtractor = (item) => {
		return item.path;
	};

	const openImageGalleryPicker = () => {
		navigation.navigate('ImageGalleryPicker', {
			openFrom: 'chooseImageForMessage'
		});
	}

	const ListFooterComponent = () => {
		if (galleryImages && galleryImages.length === DEFAULT_NUMBER_ITEM) {
			return <View style={{
				alignItems: 'center',
				paddingVertical: 20,
				paddingBottom: 30,
			}}>
				<View style={{
					width: WIDTH - 100,
					justifyContent: 'center',
					alignItems: 'center',
					paddingBottom: 20,
				}}>
					<Text style={{
						textAlign: 'center',
						fontSize: 15,
						color: "#a3a3a3",
						fontWeight: 'bold'
					}}>
						Không tìm thấy những bức hình bạn cần ? Hãy bắt đầu mở thư viện ảnh bên dưới để tìm ra những bức hình đầy cảm xúc
					</Text>
				</View>
				<TouchableOpacity style={{
					backgroundColor: '#00A48D',
					borderRadius: 5
				}}
					onPress={openImageGalleryPicker}>
					<Text style={{
						paddingVertical: 10,
						paddingHorizontal: 15,
						color: '#fff',
						fontWeight: 'bold',
						fontSize: 16,

					}}>
						MỞ THƯ VIỆN ẢNH
					</Text>
				</TouchableOpacity>
			</View>
		}
		return null;
	}

	return (
		<FlatList
			style={{
				paddingTop: 10,
				paddingHorizontal: 15,
				borderTopColor: "#ddd",
				borderTopWidth: 0.5,
			}}
			numColumns={3}
			data={galleryImages}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			removeClippedSubviews={true}
			ListFooterComponent={ListFooterComponent}
		/>
	);
};

export default Gallery;
