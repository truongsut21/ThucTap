import * as Action from "../posts/controller/actionTypes";
// import * as BaseAction from '../../base/controllers/actionTypes';
import { forEach, orderBy, unionBy } from "lodash";
const initialState = {
  content: {},
  masterCategories: [], // new
  subCategories: {},
  posts:[],
  // commentList: {}, // new
  // replyList: {}, // new
  // postDetail: {}, // new
  // activePost: {}, // news
};
export default function PostStoredReducer(state = initialState, action) {
  switch (action.type) {
    case Action.UPDATE_NEW_POST:
      switch (action.ttype) {
        case "fetch": {
          const { masterCategories, subCategories } = action.data;
          return {
            ...state,
            masterCategories: masterCategories,
            subCategories: subCategories,
          };
        }
        case "update": {
          // const nP = { ...state.newCategory };
          // const { newCategory, newPost } = action.data;
          const { masterCategories, subCategories } = action.data;
          return {
            masterCategories: {
              // ...nP,
              // ...newCategory,
              ...masterCategories,
            },
            subCategories: {
              ...subCategories,
            },
            ...state,
          };
        }
        default:
          return state;
      }
  case Action.RENDER_POST: {
        const { posts } = action.data;
        return {
          ...state,
          posts:posts,
        };
      }

    // // let oldBio = state.myBio;
    // // let newMyBio = { ...oldBio, ...action.data };
    // console.log("newBio", action.data);
    // return { ...state, ...action.data };
    default:
      return state;
  }
}
