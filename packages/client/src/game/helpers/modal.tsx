// Заготовки модальных окон для действий по карточке

import { Modal } from 'antd';

const modal = Modal;

export const modalRandomCard = (
  { title, credit, debt, desc }: { credit: number; debt: number; desc: string; title: string },
  next: () => void,
): void => {
  const content = (
    <>
      <p>{desc}</p>
      {credit ? <p>Зачисление: {credit}$</p> : ''}
      {debt ? <p>Списание: -{debt}$</p> : ''}
    </>
  );
  const modalData = {
    title,
    content,
    onOk: () => next(),
  };
  modal.info(modalData);
};

export const modalTaxCard = (
  { title, amount }: { amount: number; title: string },
  next: () => void,
): void => {
  const content = <p>Вы должны уплатить налог: {amount}$</p>;
  const modalData = {
    title,
    content,
    onOk: () => next(),
  };
  modal.info(modalData);
};

export const modalPlayerPropertyConfirm = (
  { title, price }: { price: number; title: string },
  next: () => void,
  cancel: () => void,
): void => {
  const content = <p>Вы можете купить эту собственность за {price}$</p>;
  const modalData = {
    title,
    content,
    okText: 'Купить',
    cancelText: 'Не покупать',
    onOk: () => next(),
    onCancel: () => cancel(),
  };
  modal.confirm(modalData);
};

export const noMoneyToBuy = (title: string, next: () => void): void => {
  const content = <p>У вас недостаточно средств для покупки данной собственности</p>;
  const modalData = {
    title,
    content,
    onOk: () => next(),
  };
  modal.info(modalData);
};

export const leavePlayerModal = (name: string, next: () => void): void => {
  const content = <p>Вы банкрот!</p>;
  const modalData = {
    name,
    content,
    onOk: () => next(),
  };
  modal.error(modalData);
};
