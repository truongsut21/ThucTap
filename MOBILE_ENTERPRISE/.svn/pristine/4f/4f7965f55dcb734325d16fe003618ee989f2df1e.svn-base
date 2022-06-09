import React from 'react'
import { Text, View } from 'react-native'
import { useSelector, useState } from 'react-redux'
import FlatListFriend from '../../../friend/component/flatList/FlatList'
import FriendList from '../../../friend/component/friendList/FriendList'
var _ = require('lodash');


const AddedUser = ({ _id, isSelected }) => {
    const [color, setColor] = useState(false)
    const data = useSelector(state => {
        const friend = state.FriendStoredReducer.myFriend
        return friend[_id]
    })
    const { name } = data
    const checkV = (id) => {
        if (id) {
            setColor(!color)
        }
    }
    return (
        <View>
            <TouchableOpacity onPress={() => checkV(_id)}>
                <Text
                    style={{ color: color ? 'red' : 'black' }}
                >{name}</Text>
            </TouchableOpacity>
            {
                color ? <FontAwesome5
                    name='check'
                /> : null
            }
        </View>
    )

}
export default AddedUser