import { combineReducers } from "redux";
import { RESET } from "../constants/constants";
import player from "./player";
import quest from "./quest";

const appReducer = combineReducers({
  player,
  quest
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === RESET) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
