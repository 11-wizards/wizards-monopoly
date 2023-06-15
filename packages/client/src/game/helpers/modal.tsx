import { Modal } from 'antd';
import { CardTypes, RandomCard } from 'game/types/cards';

const modal = Modal;

export const modalRandomCard = ({ title, credit, debt, desc, next }): any => {
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

export const modalTaxCard = ({ title, amount, next }): any => {
  const content = <p>Вы должны уплатить налог: {amount}$</p>;
  const modalData = {
    title,
    content,
    onOk: () => next(),
  };
  modal.info(modalData);
};
