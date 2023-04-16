import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import type { PlayerId, PropertyCardId } from 'types/game';

export const selectPropertyCards = (state: RootState) => state.game.propertyCards;

const selectPlayers = (state: RootState) => state.game.players;

export const selectPlayerById = (id: PlayerId) =>
  createSelector(selectPlayers, (players) => players.find((player) => player.id === id));

export const selectPropertyCardById = (id: PropertyCardId) =>
  createSelector(selectPropertyCards, (propertyCards) => propertyCards[id]);
