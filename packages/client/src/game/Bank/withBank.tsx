// // import { Modal } from 'antd';
// import {
//   addMoneyForPlayer,
//   deductMoneyFromPlayer,
//   leavePlayer,
//   selectPlayers,
//   transferMoneyBetweenPlayers,
// } from 'app/slices/gameSlice';
// import { randomCards } from 'game/data/cards';
// import { randomInt } from 'game/helpers/helpers';
// // import {  modalRandomCard, modalTaxCard } from 'game/helpers/modal';
// import { useAppSelector } from 'hooks';

// import { useAppDispatch } from 'hooks/redux';
// import type { ComponentType } from 'react';
// import type { CardData } from 'game/types/cards';

// import type {
//   MoneyTransfer,
//   BankTransaction,
//   BuyPropertyCardPayload,
//   PropertyCardId,
//   StepsMove,
// } from 'game/types/game';

// export type WithBankProps = {
//   buyPropertyCard: (contract: BuyPropertyCardPayload) => void;
//   checkSolvency: (playerId: number) => boolean;
//   claimCircleBonus: (transaction: BankTransaction) => void;
//   getReward: (transfer: MoneyTransfer) => void;
//   payPenalty: (transaction: BankTransaction) => void;
//   payRent: (transfer: MoneyTransfer) => void;
//   randomCardAction: (
//     playerId: number,
//     card: CardData,
//     next: (nextStep?: StepsMove | undefined) => void,
//   ) => void;
//   sellPropertyCard: (propertyCardId: PropertyCardId) => void;
//   taxCardAction: (
//     playerId: number,
//     card: CardData,
//     next: (nextStep?: StepsMove | undefined) => void,
//   ) => void;
// };

// export const withBank =
//   <T extends WithBankProps>(WrappedComponent: ComponentType<T>) =>
//     (props: Omit<T, keyof WithBankProps>) => {
//       // const modal = Modal;

//       const players = useAppSelector(selectPlayers);

//       const dispatch = useAppDispatch();
//       const buyPropertyCard = () => {
//         /* TODO логика покупки */
//       };
//       const checkSolvency = (playerId: number, amount = 0): boolean =>
//         players[playerId].balance - amount >= 0;

//       const getReward = ({ playerId, amount }: BankTransaction) => {
//         dispatch(addMoneyForPlayer({ playerId, amount }));
//       };

//       const payPenalty = ({ playerId, amount }: BankTransaction) => {
//         if (!checkSolvency(playerId, amount)) {
//           alert('Вы банкрот!');
//           dispatch(leavePlayer(playerId));
//         }
//         dispatch(deductMoneyFromPlayer({ playerId, amount }));
//       };

//       const randomCardAction = (
//         playerId: number,
//         // { title }: CardData,
//         next: (nextStep?: StepsMove | undefined) => void,
//       ) => {
//         const {
//           credit,
//            debt,
//             // desc
//           } = randomCards[randomInt(randomCards.length - 1)];
//         // const closeModal = () => {
//         //   if (credit) getReward({ playerId, amount: credit });
//         //   if (debt) payPenalty({ playerId, amount: debt });
//         //   next();
//         };

//         // modalRandomCard({ title, credit, debt, desc, next: closeModal });
//       };

//       const taxCardAction = (
//         playerId: number,
//         {
//           // title,
//           price: amount = 0,
//         }: CardData,
//         next: (nextStep?: StepsMove | undefined) => void,
//       ) => {
//         // const closeModal = () => {
//         //   payPenalty({ playerId, amount });
//         //   next();
//         // };
//         // modalTaxCard({ title, amount, next: closeModal });
//       };

//       const sellPropertyCard = () => {
//         /* TODO логика продажи */
//       };

//       const payRent = ({ senderId, recipientId, amount }: MoneyTransfer) => {
//         dispatch(transferMoneyBetweenPlayers({ senderId, recipientId, amount }));
//       };

//       const claimCircleBonus = ({ playerId, amount }: BankTransaction) => {
//         dispatch(addMoneyForPlayer({ playerId, amount }));
//       };

//       const bankOperations = {
//         payRent,
//         claimCircleBonus,
//         // getReward,
//         // payPenalty,
//         // buyPropertyCard,
//         // checkSolvency,
//         // randomCardAction,
//         taxCardAction,
//         sellPropertyCard,
//       };

//       return <WrappedComponent {...(props as T)} {...bankOperations} />;
//     };
