import { FETCH_PLAYERS_SUCCESS, DELETE_PLAYER } from '../actions/types';

function mergePlayers(state, { players }) {
  const newState = { ...state };
  players.forEach(player => {
    newState[player.id] = player;
  });
  return newState;
}

function removePlayer(state, { players }) {
  const newState = { ...state };
  console.log(players, 'PLAYER');
  // players.filter(player => player)
}

export default function players(state = {}, action) {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:
      return mergePlayers(state, action.payload.data);
    case DELETE_PLAYER:
      console.log(state, 'STATE****');
      const newState = Object.assign([], state);
      const indexOfPlayerToDelete = newState.findIndex(player => {
        return player == action.payload.data;
      });

      newState.splice(indexOfPlayerToDelete, 1);
      return newState;
    default:
      return state;
  }
}
