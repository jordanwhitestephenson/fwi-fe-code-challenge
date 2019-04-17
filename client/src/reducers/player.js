import { GET_PLAYER, DELETE_PLAYER } from '../actions/types';

export default function player(state = {}, action) {
  switch (action.type) {
    case GET_PLAYER:
      return action.payload.data;
    case DELETE_PLAYER:
      return {};
    default:
      return state;
  }
}
