import type { FC } from 'react';
import { Button, Modal, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { messages } from './common';

import './GameRulesModal.scss';

type GameRulesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const GameRulesModal: FC<GameRulesModalProps> = ({ isOpen, onClose }) => {
  const { formatMessage: fm } = useIntl();

  return (
    <Modal
      closable={false}
      title={fm(messages.gameRulesTitle)}
      open={isOpen}
      footer={[
        <Button key="submit" type="primary" onClick={onClose}>
          {fm(messages.gameRulesCloseButton)}
        </Button>,
      ]}
      width={900}
    >
      <div className="modal-rules-layout">
        <section className="modal-rules-section">
          <Typography.Title>{fm(messages.gameRulesGoalTitle)}</Typography.Title>
          <Typography.Paragraph>{fm(messages.gameRulesGoalDescription)}</Typography.Paragraph>
        </section>
        <section className="modal-rules-section">
          <Typography.Title>{fm(messages.gameRulesGameTitle)}</Typography.Title>
          <Typography.Paragraph>{fm(messages.gameRulesGameDescription1)}</Typography.Paragraph>
          <Typography.Paragraph>{fm(messages.gameRulesGameDescription2)}</Typography.Paragraph>
          <ul>
            <li>{fm(messages.gameRulesGameDescription2Item1)}</li>
            <li>{fm(messages.gameRulesGameDescription2Item2)}</li>
            <li>{fm(messages.gameRulesGameDescription2Item3)}</li>
            <li>{fm(messages.gameRulesGameDescription2Item4)}</li>
            <li>{fm(messages.gameRulesGameDescription2Item5)}</li>
            <li>{fm(messages.gameRulesGameDescription2Item6)}</li>
          </ul>
          <Typography.Paragraph>{fm(messages.gameRulesGameDescription3)}</Typography.Paragraph>
          <Typography.Paragraph>{fm(messages.gameRulesGameDescription4)}</Typography.Paragraph>
          <Typography.Paragraph>{fm(messages.gameRulesGameDescription5)}</Typography.Paragraph>
          <Typography.Paragraph>{fm(messages.gameRulesGameDescription6)}</Typography.Paragraph>
          <Typography.Paragraph>{fm(messages.gameRulesGameDescription7)}</Typography.Paragraph>
        </section>
        <section className="modal-rules-section">
          <Typography.Title>{fm(messages.gameRulesPurchaseTitle)}</Typography.Title>
          <Typography.Paragraph>{fm(messages.gameRulesPurchaseDescription1)}</Typography.Paragraph>
          <ul>
            <li>{fm(messages.gameRulesPurchaseDescription1Item1)}</li>
            <li>{fm(messages.gameRulesPurchaseDescription1Item2)}</li>
            <li>{fm(messages.gameRulesPurchaseDescription1Item3)}</li>
          </ul>
          <Typography.Paragraph>{fm(messages.gameRulesPurchaseDescription2)}</Typography.Paragraph>
          <Typography.Paragraph>{fm(messages.gameRulesPurchaseDescription3)}</Typography.Paragraph>
        </section>
      </div>
    </Modal>
  );
};
