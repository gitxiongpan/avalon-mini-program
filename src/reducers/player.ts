// eslint-disable-next-line import/no-named-as-default
import produce from "immer";
import { UPDATEPLAYERS, NEXTLEADER } from "../constants/constants";
import { getRandomInt } from "../utils/general";

const INITIAL_STATE = {
  players: [],
  number: 0,
  leader: 0
};

const player = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATEPLAYERS:
        draft.players = action.players;
        draft.number = action.players.length;
        draft.leader = getRandomInt(action.players.length);
        break;
      case NEXTLEADER:
        draft.leader += 1;
        break;
      default:
        break;
    }
  });

export default player;
