import React from "react";
import { connect } from "react-redux";
import { Image, View } from "react-native";
import FastImage from "react-native-fast-image";
var RNFS = require("react-native-fs");
import * as Action from "../controllers/actionTypes";
import isEqual from "react-fast-compare";

class DispatchImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // uri: 'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png'
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
  }

  componentDidMount() {
    try {
      if (this.props.type === "image") {
        if (this.props.data) {
          RNFS.exists(`${this.props.source}`)
            .then((res) => {
              if (!res) {
                this.props.dispatch({
                  type: Action.UPDATE_MY_FILE,
                  ttype: "delete_file",
                  data: {
                    _id: this.props.data.fileContent._id,
                  },
                });
              } else {
                this.setState({
                  uri: this.props.source,
                });
              }
            })
            .catch((error) => {});
        } else {
          this.setState({
            uri: this.props.source,
          });
        }
      } else if (this.props.type === "avatar") {
        RNFS.exists(`${this.props.source}`)
          .then((res) => {
            if (!res) {
              this.props.dispatch({
                type: Action.UPDATE_DOWNLOAD_AVATAR,
                ttype: "delete",
                data: {
                  cloudLink: this.props.data.cloudLink,
                },
              });
            } else {
              this.setState({
                uri: this.props.source,
              });
            }
          })
          .catch((error) => {});
      }
    } catch (error) {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.source !== prevProps.source) {
      this.setState({
        uri: this.props.source,
      });
    }
  }

  render() {
    try {
      if (this.state.uri) {
        // if (this.props.subType && this.props.data && !this.props.data.send_state) {
        if (this.props.subType && this.props.data) {
          return (
            <FastImage  style={this.props.style ? this.props.style : {}} source={{ uri: this.state.uri }} />
          );
        }
        if (this.props.cacheDisabled) {
          return (
            <Image
              style={this.props.style ? this.props.style : {}}
              source={{ uri: this.state.uri }}
            />
          );
        }
        return (
          <FastImage
            style={this.props.style ? this.props.style : {}}
            source={{ uri: this.state.uri }}
          />
        );
      } else {
        return (
          <Image
            style={this.props.style ? this.props.style : {}}
            source={{ uri: null }}
          />
        );
      }
    } catch (error) {
      return (
        <Image
          style={this.props.style ? this.props.style : {}}
          source={{ uri: null }}
        />
      );
    }
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(DispatchImage);
