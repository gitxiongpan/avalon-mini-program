import produce from "immer";
import { UPDATEPLAYERS } from "../constants/constants";

const INITIAL_STATE = {
  players: [],
  number: 0
};

const player = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATEPLAYERS:
        draft.players = action.players;
        draft.number = action.players.length;
        break;
      default:
        break;
    }
  });

export default player;
