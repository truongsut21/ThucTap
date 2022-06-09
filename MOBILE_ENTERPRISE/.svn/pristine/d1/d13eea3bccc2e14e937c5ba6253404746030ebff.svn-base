import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import { SafeAreaView } from 'react-native';
import * as Action from '../controllers/actionTypes';
import StatusBar from '../../base/components/StatusBar';

// class Loading extends React.Component {
//     constructor(props) {
//         super(props)
//     }
//     componentDidMount() {
//         setTimeout(() => {
//             this.props.dispatch({
//                 type: Action.API_GET_ACTIVE_USER_INFO,
//                 hi: 'first',
//             })
//         }, 1000)
//     }
//     render() {
//         return (
//             <React.Fragment>
//                 <SafeAreaView style={{flex: 0, backgroundColor: '#00A48D'}}/>
//                 <SafeAreaView style={{ flex: 1, backgroundColor: '#00A48D', justifyContent: 'center', alignItems: 'center' }}>
//                     <StatusBar barStyle='light-content' backgroundColor='#00A48D'/>

//                 </SafeAreaView>
//             </React.Fragment>
//         )
//     }
// }
const Loading = () => {
    const data = useSelector(state => state.AuthStoredReducer.myUserInfo);
    const dispatch = useDispatch()
    useEffect(() => {
        // setTimeout(() => {
        //     dispatch({
        //         type: Action.API_GET_MY_USER_INFO,
        //         hi: 'first',
        //     })
        // }, 1000)
        dispatch({
                type: Action.API_GET_MY_USER_INFO,
                hi: 'first',
            })
        return () => {

        }
    }, [])
    return (
        <React.Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar barStyle='light-content' backgroundColor='#fff' />

            </SafeAreaView>
        </React.Fragment>
    )

}
export default Loading;