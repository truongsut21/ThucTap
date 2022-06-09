import React from 'react';
import { connect } from 'react-redux';
import {
    SafeAreaView, FlatList, Text, View,
    TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import ThreadElement from './ThreadElement'
import styles from '../static/style';
import { cloneDeep } from 'lodash';

class ThreadListForward extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
        this.setState({
            Threads: cloneDeep(this.props.listThreads)
        })
    }

    render() {
        try {
            return (<Modal isVisible={this.props.forwardMessage}
                onModalWillShow={() => {
                    this.setState({
                        Threads: this.state.Threads
                    })
                }}
                onBackButtonPress={() => {
                    this.props.dispatch({
                        type: 'UPDATE_FORWARD_MESSAGE',
                        data: '',
                    })
                }}
                animationIn='fadeInDown'
                animationOut='fadeOutDown'
                style={styles.abq}>
                <SafeAreaView style={styles.abr} />
                <SafeAreaView style={styles.abs}>
                    <View style={styles.abt}>
                        <View style={styles.abu}>
                            <View style={styles.abv}>
                                <View style={styles.abw}>
                                    <TouchableOpacity style={styles.abx} onPress={() => {
                                        this.props.dispatch({
                                            type: 'UPDATE_FORWARD_MESSAGE',
                                            data: '',
                                        })
                                    }} delayPressOut={0} delayPressIn={0}>
                                        <AntDesign color='white' size={22} name='arrowleft' style={{}} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.aby} onPress={() => {
                                }}>
                                    <View style={styles.abz}>
                                        <Text style={styles.aca} numberOfLines={1} ellipsizeMode='tail'>
                                            Chuyển tiếp
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={this.state.Threads}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item, index }) => {
                                    return <ThreadElement thread={item} navigation={this.props.navigation} forwardState={true} />
                                }}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>)
        } catch (error) {
            return null;
        }
    }
}

function mapStateToProps(state, props) {
    return {
        listThreads: state.ChatStoredReducer.listThreads
    }
}
export default connect(mapStateToProps)(ThreadListForward);