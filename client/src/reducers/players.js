import { FETCH_PLAYERS_SUCCESS, DELETE_PLAYER } from '../actions/types';

function mergePlayers(state, { players }) {
  const newState = { ...state };
  players.forEach(player => {
    newState[player.id] = player;
  });
  return newState;
}
function deletePlayer(state, id) {
  let objectId = { id };
  const newState = Object.keys(state).reduce((object, key) => {
    if (key !== id) {
      object[key] = state[key];
    }
    return object;
  }, {});
  return newState;
}

export default function players(state = {}, action) {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return mergePlayers(state, action.payload.data);

    case DELETE_PLAYER:
      return deletePlayer(state, action.payload.data);

    default:
      return state;
  }
}
