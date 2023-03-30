import React from 'react';
import type { FC } from 'react';
import classNames from 'classnames';

import './PropertyCard.scss';

export type PropertyCardProps = {
  setup: {
    zone: number;
    image: string;
    cost: number;
    direction?: 'top' | 'left' | 'bottom' | 'right';
  };
};

type Props = FC<PropertyCardProps>;

const PropertyCard: Props = ({ setup }) => {
  const { zone, image, cost, direction = 'left' } = setup;

  return (
    <div
      className={classNames('property-card', {
        [`property-card_direction_${direction}`]: direction,
      })}
    >
      <div
        className={classNames('property-card__header', {
          [`property-card__header_zone_${zone}`]: zone,
        })}
      >
        <p className="property-card__cost">{cost}</p>
      </div>
      {image && <div className={classNames('property-card__image image', { image })} />}
    </div>
  );
};

export default PropertyCard;
