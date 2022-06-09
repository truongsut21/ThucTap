import React, { PureComponent } from "react";
import {
    SafeAreaView, 
    // LayoutAnimation, UIManager, Platform
} from "react-native";
// } from "./sticker_data";
import isEqual from 'react-fast-compare';
import StickerSelectedList from './StickerSelectedList';
import StickerTitle from './StickerTitle';
import { connect } from 'react-redux';
// import { HEIGHT } from '../../controllers/utils';

// if (
//     Platform.OS === "android" &&
//     UIManager.setLayoutAnimationEnabledExperimental
// ) {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
// }

class Sticker extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            recentlyUsedStickerType: ''
        }
    }

    setRecentlyUsedStickerType = (type) => {
        // if (type !== this.state.recentlyUsedStickerType && type) {
        //     this.setState({
        //         recentlyUsedStickerType: type
        //     })
        // }
    }

    render() {
        return (
            <React.Fragment>
                <SafeAreaView />
                <SafeAreaView
                    style={{
                        flex: 1
                        // height: HEIGHT / 10 * 4,
                        // backgroundColor: '#fff',
                    }}
                >
                    <StickerTitle
                    // recentlyUsedStickerType={this.state.recentlyUsedStickerType}
                    />
                    <StickerSelectedList
                        setRecentlyUsedStickerType={this.setRecentlyUsedStickerType}
                    />
                </SafeAreaView>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(Sticker);

