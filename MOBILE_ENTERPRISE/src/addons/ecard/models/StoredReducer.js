import * as Action from "../controllers/actionTypes";
import * as BaseAction from "../../base/controllers/actionTypes";
import { da } from "date-fns/locale";

const initialState = {
  myECards: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Action.UPDATE_MY_ECARDS: {
      switch (action.ttype) {
        case "fetch": {
          const { myECards } = action.data;
          if (!myECards) return state;
          return { ...state, myECards: myECards };
        }
        case "update": {
          let { myECard } = action.data;
          const myECards = state.myECards;
          let news = myECards.filter((item) => {
            return item._id === myECard[0]._id;
          });
          const newMycard = myECard[0];
          Object.assign(newMycard, { ecard_id: news[0]["ecard_id"] });
          let indexs = -1;
          for (var i = 0; i < myECards.length; i++) {
            if (myECards[i]._id === myECard[0]._id) {
              indexs = i;
            }
          }

          let newMyECards = myECards;
          newMyECards[indexs] = newMycard;
          return { ...state, myECards: newMyECards };
        }
        // case "update_card_defaut": {
        //   let data = action.data;
        //   const myECards = state.myECards;
        //   for (let i = 0; i < myECards.length; i++) {
        //     if (myECards[i]._id === data._id) {
        //       return (myECards[i].is_default = true);
        //     } else {
        //       return (myECards[i].is_default = false);
        //     }
        //   }
        //   console.log("myECards", myECards);
        //   return { ...state };
        // }
        default: {
          return state;
        }
      }
    }
    case BaseAction.CLEAR_ALL_DATA: {
      return {
        ...state,
        myECards: [],
      };
    }
    default:
      return state;
  }
};
