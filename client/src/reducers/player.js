import { GET_PLAYER } from '../actions/types';

export default function player(state = {}, action) {
  switch (action.type) {
    case GET_PLAYER:
      return action.payload.data;

    default:
      return state;
  }
}
