import React from 'react';
import { View, StatusBar, Platform } from 'react-native';

class CustomStatusBar extends React.Component {
    constructor(props) {
        super(props);
    }

    setPreviousBackgroundColor = (color) => {
        StatusBar.setBackgroundColor(color, true);
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(this.props.backgroundColor, true);
        }
        // StatusBar.setBarStyle(this.props.barStyle, true)
    }
    componentDidUpdate(prevProps, prevState) {
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(this.props.backgroundColor, true);
        }
        // StatusBar.setBarStyle(this.props.barStyle, true)
    }

    render() {
        return (
            <View style={{
                height: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                backgroundColor: this.props.backgroundColor
            }}>
                <StatusBar translucent  />
            </View>
        )
    }
}

export default CustomStatusBar;