import { combineReducers } from "redux";
import counter from "./counter";
import player from "./player";
import quest from "./quest";

export default combineReducers({
  counter,
  player,
  quest
});
