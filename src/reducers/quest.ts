import produce from "immer";
import { UPDATEQUESTARR, UPDATEQUESTRESULTS } from "../constants/constants";

const INITIAL_STATE = {
  questArr: [],
  quesrResult: []
};

const quest = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATEQUESTARR:
        draft.questArr = action.questArr;
        break;
      case UPDATEQUESTRESULTS:
        draft.questArr = action.questResults;
      default:
        break;
    }
  });

export default quest;
