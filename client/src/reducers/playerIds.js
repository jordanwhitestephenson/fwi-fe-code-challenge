import {
  FETCH_PLAYERS_SUCCESS,
  DELETE_PLAYER,
  ADD_PLAYER,
} from '../actions/types';

export default function playerIds(state = [], action) {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return action.payload.data.players.map(player => player.id);
    case DELETE_PLAYER:
      const newState = state.filter(id => id !== action.payload.data);
      return newState;
    case ADD_PLAYER:
      const newStateArray = [...state];
      newStateArray.push(action.payload.data.id);
      return newStateArray;
    default:
      return state;
  }
}
