import React from 'react';
import { Image, View, Text, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import isEqual from 'react-fast-compare';
import * as Action from '../../controllers/actionTypes';

const reactionType = {
    ['1']: <Image
        style={{ width: 15, height: 15 }}
        source={require('../../static/emo/like.png')}
    />,
    ['2']: <Image
        style={{ width: 15, height: 15 }}
        source={require('../../static/emo/heart.png')}
    />,
    ['3']: <Image
        style={{ width: 15, height: 15 }}
        source={require('../../static/emo/sad.png')}
    />,
    ['4']: <Image
        style={{ width: 15, height: 15 }}
        source={require('../../static/emo/haha.png')}
    />,
    ['5']: <Image
        style={{ width: 15, height: 15 }}
        source={require('../../static/emo/angry.png')}
    />,
}

class ReactionSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.animateScale = new Animated.Value(1);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(nextProps, this.props)
    }

    componentDidMount() {
        if (this.props.willAnimate !== false) {
            this.animateReaction({ message_id: this.props.reactSummary.message_id })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.willAnimate !== prevProps.willAnimate && this.props.willAnimate !== false) {
            this.animateReaction({ message_id: this.props.reactSummary.message_id })
        }
    }

    animateReaction({ message_id }) {
        this.animateScale.setValue(1);
        Animated.spring(this.animateScale, {
            toValue: 2,
            duration: 500,
            friction: 10,
            useNativeDriver: true
        }).start(({ finished }) => {
            if (finished) {
                Animated.timing(this.animateScale, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }).start(({ finished }) => {
                    this.props.dispatch({
                        type: Action.UPDATE_ANIMATE_MESSAGE_REACTION,
                        ttype: 'remove',
                        data: {
                            message_id: message_id,
                        }
                    })
                })
            }
        });
    }

    showAllReactions = () => {
        this.props.navigation.navigate('MessageReaction', {
            message_id: this.props.reactSummary.message_id
        })
    }

    render() {
        try {
            return (<React.Fragment key={`reactions_${this.props.reactSummary.message_id}`}>
                <TouchableOpacity style={{
                    paddingHorizontal: 4,
                    height: 20,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -6,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#f0f4f8',
                    flexDirection: 'row',
                }}
                    delayPressOut={0} delayPressIn={0} onPress={this.showAllReactions}>
                    <Text style={{ fontSize: 10, paddingRight: 3, color: '#333' }}>
                        {this.props.reactSummary.count}
                    </Text>
                    {
                        this.props.reactSummary.reactTypes.map((reactType, index) => {
                            if (index === 0) {
                                return (<Animated.View
                                    key={`reaction_${this.props.reactSummary.message_id}_${reactType}`}
                                    style={[{ width: 17 },
                                    this.props.willAnimate === reactType
                                        ?
                                        {
                                            transform: [{ scale: this.animateScale }],
                                            zIndex: 11
                                        } : {}]}>
                                    {reactionType[reactType]}
                                </Animated.View>)
                            } else {
                                return (<Animated.View
                                    key={`reaction_${this.props.reactSummary.message_id}_${reactType}`}
                                    style={[{
                                        width: 17, zIndex: index * 2, marginLeft: -9, backgroundColor: ''
                                    }, this.props.willAnimate === reactType
                                        ?
                                        {
                                            transform: [{ scale: this.animateScale }],
                                            zIndex: 11
                                        } : {}]}>
                                    {reactionType[reactType]}
                                </Animated.View>)
                            }
                        })
                    }
                </TouchableOpacity>
            </React.Fragment>)
        } catch (error) {
            return null;
        }
    }
}

function mapStateToProps(state, props) {
    return {
        willAnimate: state.ChatUnstoredReducer.willAnimateReaction && props.reactSummary && props.reactSummary.message_id &&
            state.ChatUnstoredReducer.willAnimateReaction[props.reactSummary.message_id]
            ?
            state.ChatUnstoredReducer.willAnimateReaction[props.reactSummary.message_id]
            :
            false
    }
}

export default connect(mapStateToProps)(ReactionSummary);