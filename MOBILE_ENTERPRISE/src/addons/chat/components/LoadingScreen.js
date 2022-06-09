import React from 'react';
import { Text, View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';

class LoadingScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{
                    backgroundColor: 'red',
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    zIndex: 999,
                    opacity: 0.5
                }}>
                    <Text>Loading....</Text>
                </View>
            </SafeAreaView>
        )
    }
}


export default LoadingScreen;