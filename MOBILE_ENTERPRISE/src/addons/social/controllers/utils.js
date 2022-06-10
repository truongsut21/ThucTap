import React from "react";
import { Text, Dimensions, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { config } from "../../../config";
import { encryptPayload } from "../../../config/utilities";
// var ObjectID = require("bson-objectid");
var { EventEmitter } = require("fbemitter");
var eventEmitter = new EventEmitter();

export default eventEmitter;

var _ = require("lodash");

export const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;
export const WIDTH = WINDOW_WIDTH;
export const HEIGHT = WINDOW_HEIGHT;

export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;

function workaroundNotEncrypt(payload) {
  return payload;
}

export function WorkerPostToDo(data) {
  return Promise.all([
    data.donotEncrypt
      ? workaroundNotEncrypt(data.payload)
      : encryptPayload(data.payload),
  ])
    .then(([encodePayload]) => {
      return axios({
        method: data.method || "POST",
        url: config.backend_url + data.functionName,
        timeout: data.timeout ? data.timeout : 7000,
        headers: {
          Authorization: "Tomaho " + data.token,
        },
        data: {
          payload: encodePayload,
        },
      });
    })
    .then((response) => {
      if (response.data.data && response.data.statusCode === 0) {
        return response.data.data;
      } else {
        return {
          code: response.data.statusCode,
          message: response.data.statusMessage,
        };
      }
    })
    .catch((error) => {
      return {
        code: 1,
        message: error ? error.toString() : "",
      };
    });
}
