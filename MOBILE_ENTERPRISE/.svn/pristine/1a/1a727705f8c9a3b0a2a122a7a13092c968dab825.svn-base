import React from 'react';
import {
    Text, View, TextInput,
    TouchableOpacity, Platform, UIManager, SafeAreaView,
} from 'react-native';
import Animated from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Suggest from './Suggest';
import { HEIGHT, WIDTH } from '../../controllers/utils';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

class SearchThreadList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContent: '',
            showHuyButton: false
        }
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.inputRef && this.inputRef.current) {
                this.inputRef.current.focus()
            }
        }, 10);
    }

    closeSearchBox = () => {
        this.props.navigation.goBack();
    }

    onChangeText = (e) => {
        this.setState({
            searchContent: e
        })
    }

    render() {
        try {
            return (<SafeAreaView style={[
                {
                    backgroundColor: '#fff',
                    width: WIDTH,
                },
                {
                    position: 'absolute',
                    height: HEIGHT,
                    padding: 10,
                    zIndex: 2,
                }]}>
                <View style={[{
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    marginTop: 10,
                }]}>
                    <Animated.View style={[{
                        backgroundColor: '#f3f3f3',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20,
                    }, { flex: 1, justifyContent: 'flex-start' }]}>
                        <View style={[{
                            paddingLeft: 10
                        }]}>
                            <AntDesign name="search1" size={17} color="#737373" />
                        </View>

                        <TextInput
                            ref={this.inputRef}
                            style={{
                                fontSize: 16,
                                color: '#333',
                                padding: 5,
                                height: 35,
                                flex: 1,
                            }}
                            placeholder='Tìm cuộc trò chuyện'
                            placeholderTextColor='#aaa'
                            value={this.state.searchContent}
                            onChangeText={searchContent => this.setState({ searchContent })}
                        />
                    </Animated.View>

                    <TouchableOpacity style={{
                        paddingLeft: 10,
                        justifyContent: 'center', alignItems: 'center',
                    }} delayPressIn={0} delayPressOut={0} onPress={this.closeSearchBox}>
                        <Text style={{
                            color: '#00A48D',
                            fontSize: 17
                        }}>Hủy</Text>
                    </TouchableOpacity>

                </View>

                <Suggest searchContent={this.state.searchContent} />
            </SafeAreaView >)
        } catch (error) {
            return null;
        }
    }
}

export default SearchThreadList;