// eslint-disable-next-line import/no-named-as-default
import produce from "immer";
import {
  UPDATEQUESTARR,
  UPDATEQUESTRESULT,
  PROCEEDQUEST
} from "../constants/constants";

const INITIAL_STATE = {
  questArr: Array(),
  questResults: Array(),
  index: 0
};

const quest = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATEQUESTARR:
        draft.questArr = action.questArr;
        break;
      case UPDATEQUESTRESULT:
        draft.questResults.push(action.questResult);
        break;
      case PROCEEDQUEST:
        draft.index += 1;
        break;
      default:
        break;
    }
  });

export default quest;
