import type { FC } from 'react';
import { Button, Modal, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { selectIsGameRulesShown, showGameRules } from '../../app/slices/gameSettingsSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { messages } from '../Register/common';

import './GameRulesModal.scss';

export const GameRulesModal: FC = () => {
  const { formatMessage: fm } = useIntl();
  const dispatch = useAppDispatch();
  const isGameRulesShown = useAppSelector(selectIsGameRulesShown);

  const onOkClick = () => {
    dispatch(showGameRules(false));
  };

  return (
    <Modal
      title={fm(messages.gameRulesTitle)}
      open={isGameRulesShown}
      footer={[
        <Button key="submit" type="primary" onClick={onOkClick}>
          {fm(messages.gameRulesCloseButton)}
        </Button>,
      ]}
    >
      <div className="modal-rules-layout">
        <section>
          <Typography.Title>Цель игры</Typography.Title>
          <Typography.Paragraph>
            Выиграть, оставшись единственным не обанкротившимся игроком.
          </Typography.Paragraph>
        </section>
        <section>
          <Typography.Title>Игра</Typography.Title>
          <Typography.Paragraph>
            Игроки по-очереди бросают кубики. Начинает игрок, который выбросил наибольшее число.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Игрок бросает кубики и перемещает фишку по стрелке на то количество полей, которое
            выпало на кубиках. Одновременно на одном поле могут находиться фишки трех игроков. В
            зависимости от того, на каком поле остановился игрок, он выполняет следующие действия:
          </Typography.Paragraph>
          <ul>
            <li>Покупает Собственность (если она не занята)</li>
            <li>Просит банкира выставить Собственность на аукцион (если не хочет покупать ее)</li>
            <li>Платит ренту (если Собственность принадлежит другому игроку)</li>
            <li>Платит налоги</li>
            <li>Берет карточку Шанс (или Общественная казна)</li>
            <li>Идёт в тюрьму</li>
          </ul>
          <Typography.Paragraph>
            Когда игрок соберет все карточки одного цвета, он может строить Дома и Отели на своих
            участках.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Если закончились деньги, игрок может заложить или продать Собственность, чтобы
            расплатиться с кредиторами. Если игрок не может собрать достаточно денег, чтобы
            заплатить ренту, налог или оплатить счет, он объявляется банкротом и выходит из игры
          </Typography.Paragraph>
          <Typography.Paragraph>
            Игрокам нельзя одалживать деньги друг другу. Но можно принимать любую Собственность
            вместо денег в счет оплаты.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Если игрок выбросит дубль, он ходит, как обычно, а затем снова бросает кубики. Если
            игрок выбросит дубли три раза подряд за один ход он идет в тюрьму
          </Typography.Paragraph>
          <Typography.Paragraph>
            Игра продолжается, пока не останется только Один игрок. Он становится победителем
          </Typography.Paragraph>
        </section>
        <section>
          <Typography.Title>Покупка собственности</Typography.Title>
          <Typography.Paragraph>В игре три вида Собственности:</Typography.Paragraph>
          <ul>
            <li>Участки</li>
            <li>Транспорт</li>
            <li>Коммуникации</li>
          </ul>
          <Typography.Paragraph>
            Когда игрок останавливается на свободной Собственности, он может купить ее. В этом
            случае игрок платит банкиру сумму, указанную на поле. При этом игрок получает карточку
            Собственника, которую должен положить перед собой лицевой стороной вверх. Если игрок
            откажется покупать Собственность, она выставляется на аукцион
          </Typography.Paragraph>
          <Typography.Paragraph>
            Если игрок владеет Собственностью, он получает ренту с других игроков, которые
            останавливаются на ней. Когда игрок соберет всю Собственность одного цвета, т.е. станет
            монополистом, он может строить Дома и Отели на участках этого цвета и собирать
            повышенную ренту!
          </Typography.Paragraph>
        </section>
      </div>
    </Modal>
  );
};
