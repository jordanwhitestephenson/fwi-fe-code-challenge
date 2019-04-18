import {
  FETCH_PLAYERS_SUCCESS,
  DELETE_PLAYER,
  EDIT_PLAYER,
  ADD_PLAYER,
} from '../actions/types';

function mergePlayers(state, { players }) {
  const newState = { ...state };
  players.forEach(player => {
    newState[player.id] = player;
  });
  return newState;
}
function deletePlayer(state, id) {
  const newState = Object.keys(state).reduce((object, key) => {
    if (key !== id) {
      object[key] = state[key];
    }
    return object;
  }, {});
  return newState;
}
function editPlayer(state, data) {
  const newState = Object.keys(state).reduce((object, key) => {
    if (key === data.id) {
      object[key] = data;
    }
    if (key !== data.id) {
      object[key] = state[key];
    }
    return object;
  }, {});
  return newState;
}

function addPlayer(state, data) {
  const newState = { ...state };
  const newData = {
    name: data.name,
    winnings: parseInt(data.winnings),
    country: data.country,
    id: data.id,
  };
  Object.assign(newState, { [data.id]: newData });
  return newState;
}

export default function players(state = {}, action) {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return mergePlayers(state, action.payload.data);
    case DELETE_PLAYER:
      return deletePlayer(state, action.payload.data);
    case EDIT_PLAYER:
      const data = action.payload.data;
      return editPlayer(state, data);
    case ADD_PLAYER:
      return addPlayer(state, action.payload.data);
    default:
      return state;
  }
}
