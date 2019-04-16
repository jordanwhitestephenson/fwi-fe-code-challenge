import {
  FETCH_PLAYERS_SUCCESS,
  ADD_PLAYER,
  GET_PLAYER,
  DELETE_PLAYER,
} from './types';

export function fetchPlayersSuccess(data) {
  return { type: FETCH_PLAYERS_SUCCESS, payload: { data } };
}
export function addPlayer(data) {
  return { type: ADD_PLAYER, payload: { data } };
}

export function getPlayer(data) {
  return { type: GET_PLAYER, payload: { data } };
}

export function deletePlayer(data) {
  return { type: DELETE_PLAYER, payload: { data } };
}
