// import { createSelector } from '@reduxjs/toolkit';
// import type { RootState } from 'app/store';

// export const selectPropertyCards = (state: RootState) => state.game.propertyCards;

// const selectPlayers = (state: RootState) => state.game.players;

// export const selectPlayerById = createSelector(
//   [selectPlayers, (state, playerId: number) => playerId],
//   (players, playerId) => players.find((player) => player.id === playerId),
// );

// export const selectPropertyCardById = (id: PropertyCardId) =>
// createSelector(selectPropertyCards, (propertyCards) => propertyCards[id]);
