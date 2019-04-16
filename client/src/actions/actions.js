import { FETCH_PLAYERS_SUCCESS, ADD_PLAYER } from './types';

export function fetchPlayersSuccess(data) {
  return { type: FETCH_PLAYERS_SUCCESS, payload: { data } };
}
export function addPlayer(data) {
  return { type: ADD_PLAYER, payload: { data } };
}
