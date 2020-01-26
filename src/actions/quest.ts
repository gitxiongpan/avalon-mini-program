import {
  UPDATEQUESTARR,
  UPDATEQUESTRESULT,
  PROCEEDQUEST
} from "../constants/constants";

export const updateQuestArr = questArr => ({
  type: UPDATEQUESTARR,
  questArr
});

export const updateQuestResult = questResult => ({
  type: UPDATEQUESTRESULT,
  questResult
});

export const proceedQuest = () => ({
  type: PROCEEDQUEST
});

export default null;
