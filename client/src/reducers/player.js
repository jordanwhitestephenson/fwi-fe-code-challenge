import { GET_PLAYER, DELETE_PLAYER, EDIT_PLAYER } from '../actions/types';

function editPlayer(state, data) {
  var newState = { ...state };
  Object.keys(state).forEach(function(key) {
    newState[key] = data[key];
  });
  return newState;
}

export default function player(state = {}, action) {
  switch (action.type) {
    case GET_PLAYER:
      return action.payload.data;
    case DELETE_PLAYER:
      return {};
    case EDIT_PLAYER:
      const data = action.payload.data;
      return editPlayer(state, data);

    default:
      return state;
  }
}
