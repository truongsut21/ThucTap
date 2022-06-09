import React from "react";
import { Text, Dimensions, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { config } from "../../../config";
import { encryptPayload } from "../../../config/utilities";
var ObjectID = require("bson-objectid");
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

export function WorkerChatToDo(data) {
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

export function convertContentForPinMessage(action) {
  try {
    let value = _.cloneDeep(action.data);
    if (!value) {
      return {};
    }
    if (value.type === "text" && !value.is_removed) {
      Object.assign(value, {
        SUPER_CONTENT: value.mobile_content || value.content,
      });
    } else if (
      value.type === "sticker" &&
      value.mobile_content &&
      !value.is_removed
    ) {
      Object.assign(value, {
        SUPER_CONTENT: value.mobile_content || value.content,
      });
    } else if (value.type === "image" && !value.is_removed) {
      let ratio = 0.0,
        mWidth = 0,
        mHeight = 0,
        content = "";
      if (typeof value.content !== "string") {
        content = value.content;
      } else {
        try {
          content = JSON.parse(value.content);
        } catch (error) {}
      }
      if (content && content.metadata) {
        let { height, width } = content.metadata;
        ratio = (width * 1.0) / (height * 1.0);
        if (ratio > 1) {
          mWidth = (WINDOW_WIDTH / 10.0) * 7.0;
          mHeight = ((WINDOW_WIDTH / 10.0) * 7.0) / ratio;
        } else if (ratio < 1) {
          mWidth = (WINDOW_HEIGHT / 10.0) * 4.0 * ratio;
          mHeight = (WINDOW_HEIGHT / 10.0) * 4.0;
        } else if (ratio === 1) {
          mHeight = (WINDOW_WIDTH / 10.0) * 7.0;
          mWidth = (WINDOW_WIDTH / 10.0) * 7.0;
        }
        Object.assign(value, {
          SUPER_CONTENT: {
            ratio,
            mWidth,
            mHeight,
            link: content.link,
            _id: content._id,
          },
        });
      }
    } else if (value.type === "other" && !value.is_removed) {
      try {
        Object.assign(value, {
          SUPER_CONTENT: JSON.parse(value.content),
        });
      } catch (error) {
        Object.assign(value, {
          SUPER_CONTENT: {},
        });
      }
    } else if (value.type === "image_group" && !value.is_removed) {
      let contents = "";
      if (typeof value.content !== "string") {
        contents = value.content;
      } else {
        try {
          contents = JSON.parse(value.content);
        } catch (error) {}
      }
      if (Array.isArray(contents)) {
        let SUPER_CONTENTS = [];
        contents.forEach((content) => {
          if (content && content.metadata) {
            let ratio = 0.0,
              mWidth = 0,
              mHeight = 0;
            let { height, width } = content.metadata;
            ratio = (width * 1.0) / (height * 1.0);
            if (ratio > 1) {
              mWidth = (WINDOW_WIDTH / 10.0) * 7.0;
              mHeight = ((WINDOW_WIDTH / 10.0) * 7.0) / ratio;
            } else if (ratio < 1) {
              mWidth = (WINDOW_HEIGHT / 10.0) * 4.0 * ratio;
              mHeight = (WINDOW_HEIGHT / 10.0) * 4.0;
            } else if (ratio === 1) {
              mHeight = (WINDOW_WIDTH / 10.0) * 7.0;
              mWidth = (WINDOW_WIDTH / 10.0) * 7.0;
            }
            SUPER_CONTENTS.push({
              ratio,
              mWidth,
              mHeight,
              link: content.link,
              _id: content._id,
            });
          }
        });
        Object.assign(value, {
          SUPER_CONTENT: SUPER_CONTENTS,
        });
      }
    }
    return value;
  } catch (error) {
    return {};
  }
}

export function convertToColor(value) {
  value = String(isNaN(value) ? value.charCodeAt() : value);
  value = parseInt(value[value.length - 1]);
  switch (value) {
    case 0: {
      return "#2e7d32";
    }
    case 1: {
      return "#F06050";
    }
    case 2: {
      return "#F4A460";
    }
    case 3: {
      return "#6CC1ED";
    }
    case 4: {
      return "#814968";
    }
    case 5: {
      return "#EB7E7F";
    }
    case 6: {
      return "#2C8397";
    }
    case 7: {
      return "#475577";
    }
    case 8: {
      return "#D6145F";
    }
    case 9: {
      return "#30C381";
    }
    default: {
      return "#259cd8";
    }
  }
}

export function _computeDimensionForImageMessage({ width = 1, height = 1 }) {
  let imageHeight, imageWidth;
  if (height > width) {
    imageHeight = parseInt((WIDTH * 3) / 4);
    imageWidth = parseInt((imageHeight * width) / height);
  } else if (height < width) {
    imageWidth = parseInt((WIDTH * 3) / 4);
    imageHeight = parseInt((imageWidth * height) / width);
  } else {
    imageHeight = imageWidth = parseInt((WIDTH * 3) / 4);
  }
  return { imageWidth, imageHeight };
}

export function calcImageDimension({ width = 1, height = 1 }) {
  try {
    const imageRatio = width / height;
    const windowRatio = WIDTH / HEIGHT;
    if (imageRatio > windowRatio) {
      return {
        imageWidth: Math.round(WIDTH),
        imageHeight: Math.round((height * WIDTH) / width),
      };
    } else if (imageRatio == windowRatio) {
      return {
        imageWidth: Math.round(WIDTH),
        imageHeight: Math.round(HEIGHT),
      };
    } else {
      return {
        // imageWidth: Math.round(width),
        // imageHeight: Math.round(width * HEIGHT / height)
        // imageHeight: Math.round(HEIGHT),
        // imageWidth: Math.round(width * HEIGHT / WIDTH),
        imageHeight: Math.round(HEIGHT),
        imageWidth: Math.round((width * HEIGHT) / height),
      };
    }
  } catch (error) {
    return {
      imageWidth: Math.round(WIDTH),
      imageHeight: Math.round(HEIGHT),
    };
  }
}

const mentionRegEx = /(<(@|#)\[([^[]*)]\([a-z0-9]{24}\)>)/gi;
const prefixName = /[\[]/g;
const postfixName = /[\]]/g;
const prefixId = /(\()/gi;
const postfixId = /(\))/gi;

const _buildContentWithEvent = (
  mentionedUsers,
  content,
  clickEvent = false,
  highlightStyle = {},
  textStyle = {},
  forceRawContent=false
) => {
  try {
    //không dùng replace string bằng component vì sẽ bị [Object Object]
    //Nên nắm tắt cả các index của mention start và mention end để thực hiện cắt chuỗi
    //tạo thành array, sau đó dùng .map để tạo thành component
    //Vị trí lưu là lưu vị trí sau khi replace string từ raw Mention thành @ten_mention
    let positionKeeper = [];
    mentionedUsers.forEach((m) => {
      let i = content.indexOf(m.original);
      if (i > -1) {
        content = content.replace(m.original, m.short);
        positionKeeper.push({
          start: i,
          end: i + m.short.length,
          _id: m._id,
        });
      }
    });
    //cắt text thành nhiều đoạn sau đó dùng .map để gói lại 1 comp
    //Ví dụ: Xin chào Xin chào @Nam Vũ và @ABC và tất cả mọi người
    //sẽ được cắt thành ['Xin chào ', {text: '@Nam Vũ', _id: 1234...}, ' và ', {text: '@ABC', _id: 4567...}, ' và tất cả mọi người']
    let splittedContent = [],
      start = 0;
    while (true) {
      if (positionKeeper.length === 0) {
        splittedContent.push(content.slice(start, content.length));
        break;
      } else {
        if (start === positionKeeper[0].start) {
          splittedContent.push({
            text: content.slice(start, positionKeeper[0].end),
            _id: positionKeeper[0]._id,
          });
          start = positionKeeper[0].end;
          positionKeeper.shift(); //luôn xóa element đầu tiên của positionKeeper
        } else {
          splittedContent.push(content.slice(start, positionKeeper[0].start));
          start = positionKeeper[0].start;
        }
      }
    }
    return (
      <Text style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {splittedContent.map((t, i) => {
          if (typeof t === "string") {
            if (forceRawContent) return t;
            return (
              <Text key={`${t}_${i}`} style={[textStyle]}>
                {t}
              </Text>
            );
          } else {
            if (forceRawContent) return <Text
            // onPress={(e) => {
            //   console.log('sss')
            //   if (clickEvent) clickEvent(t._id);
            // }}
            style={[
              {
                fontWeight: "bold",
              },
              { ...highlightStyle },
            ]}
          >
            {t.text}
          </Text>;
            return (
              <Text
                key={`${t.text}_${t._id}_${i}`}
                style={
                  {
                    //  position:'relative',
                    // backgroundColor: 'red'
                  }
                }
                onPress={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (clickEvent) clickEvent(t._id);
                }}
              >
                <Text
                  // onPress={(e) => {
                  //   console.log('sss')
                  //   if (clickEvent) clickEvent(t._id);
                  // }}
                  style={[
                    {
                      fontWeight: "bold",
                    },
                    { ...highlightStyle },
                  ]}
                >
                  {t.text}
                </Text>
              </Text>
            );
          }
        })}
      </Text>
    );
  } catch (error) {
    return content;
  }
};

export const _parseMentionContentIfExist = (
  rawContent,
  attachedClickEvent = false,
  highlightStyle = {},
  textStyle = {},
  forceRawContent = false
) => {
  try {
    if (!rawContent) return null;
    let mentionedUsers = rawContent.match(mentionRegEx);
    if (!Array.isArray(mentionedUsers) || mentionedUsers.length < 1) {
      if (forceRawContent) return rawContent;
      return <Text style={textStyle}>{rawContent}</Text>;
    }
    for (let i = 0; i < mentionedUsers.length; i++) {
      mentionedUsers[i] = {
        original: mentionedUsers[i],
        short: `@${mentionedUsers[i].substring(
          mentionedUsers[i].search(prefixName) + 1,
          mentionedUsers[i].search(postfixName)
        )}`,
        _id: mentionedUsers[i].substring(
          mentionedUsers[i].search(prefixId) + 1,
          mentionedUsers[i].search(postfixId)
        ),
      };
    }

    let content = `${rawContent}`;
    if (attachedClickEvent) {
      return _buildContentWithEvent(
        mentionedUsers,
        content,
        attachedClickEvent,
        highlightStyle,
        textStyle,
        forceRawContent
      );
    } else {
      mentionedUsers.forEach((m) => {
        content = content.replace(m.original, m.short);
      });
      if (forceRawContent) return content;
      return <Text style={textStyle}>{content}</Text>;
    }
  } catch (error) {
    return <Text style={textStyle}>{rawContent}</Text>;
  }
};

export const _computeNiceRatioForLowResolutionImage = ({ width, height }) => {
  if (width > height) {
    if (width > 640) {
      return { width: 640, height: (height * 640) / width };
    }
    return { width, height };
  } else if (width < height) {
    if (height > 640) {
      return { width: (width * 640) / height, height: 640 };
    }
    return { width, height };
  } else {
    if (width > 640) {
      return { width: 640, height: 640 };
    }
    return { width, height };
  }
};

export const _computeNiceRatioForHighResolutionImage = ({ width, height }) => {
  if (width > height) {
    if (width > 1600) {
      return { width: 1600, height: (height * 1600) / width };
    }
    return { width, height };
  } else if (width < height) {
    if (height > 1600) {
      return { width: (width * 1600) / height, height: 1600 };
    }
    return { width, height };
  } else {
    if (width > 1600) {
      return { width: 1600, height: 1600 };
    }
    return { width, height };
  }
};

export function basePollTemplate() {
  return [
    {
      _id: ObjectID().toString(),
      title: "",
      create_date: new Date().getTime(),
      fromTemplate: true,
      isDraft: true,
    },
    {
      _id: ObjectID().toString(),
      title: "",
      create_date: new Date().getTime(),
      fromTemplate: true,
      isDraft: true,
    },
  ];
}

export function convertMessageContentForDisplayLocalNotification(action) {
  try {
    switch (action.type) {
      case "text": {
        return _parseMentionContentIfExist(
          action.content,
          false,
          {},
          {},
          action.forceRawContent
        );
      }
      case "sticker": {
        return "đã thả một sticker";
      }
      case "image": {
        return "đã gửi một hình ảnh";
      }
      case "image_group": {
        return "đã gửi nhiều hình ảnh";
      }
      case "contact": {
        return "đã chia sẻ một danh thiếp";
      }
      case "file": {
        return "đã gửi một file";
      }
      default:
        return "đã gửi một tin nhắn";
    }
  } catch (error) {
    return "đã gửi một tin nhắn";
  }
}
