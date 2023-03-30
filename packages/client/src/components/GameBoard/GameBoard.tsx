import type { FC } from 'react';
import type { PropertyCardProps } from '../PropertyCard/PropertyCard';
import PropertyCard from '../PropertyCard/PropertyCard';

import './GameBoard.scss';

const setupTop: PropertyCardProps = {
  setup: {
    zone: 1,
    image: 'test',
    cost: 360,
    direction: 'top',
  },
};

const setupLeft: PropertyCardProps = {
  setup: {
    zone: 2,
    image: 'test',
    cost: 360,
    direction: 'left',
  },
};

const setupRight: PropertyCardProps = {
  setup: {
    zone: 3,
    image: 'test',
    cost: 360,
    direction: 'right',
  },
};

const setupBottom: PropertyCardProps = {
  setup: {
    zone: 4,
    image: 'test',
    cost: 360,
    direction: 'bottom',
  },
};

const renderPropertyCards = ({ setup }: PropertyCardProps, count = 4) =>
  Array.from({ length: count }).map(() => <PropertyCard setup={setup} key={setup.image} />);

const GameBoard: FC = () => (
  <div className="game-board">
    <div className="game-board__zone game-board__zone_type_start game-board__zone_type_angle">
      start
    </div>
    <div className="game-board__zone game-board__zone_index_1">{renderPropertyCards(setupTop)}</div>
    <div className="game-board__zone game-board__zone_index_2">{renderPropertyCards(setupTop)}</div>
    <div className="game-board__zone game-board__zone_type_prison game-board__zone_type_angle">
      prison
    </div>
    <div className="game-board__zone game-board__zone_index_3 game-board__zone_type_vertical">
      {renderPropertyCards(setupRight)}
    </div>
    <div className="game-board__zone game-board__zone_index_4 game-board__zone_type_vertical">
      {renderPropertyCards(setupRight)}
    </div>
    <div className="game-board__zone game-board__zone_type_jackpot game-board__zone_type_angle">
      jackpot
    </div>
    <div className="game-board__zone game-board__zone_index_5">
      {renderPropertyCards(setupBottom)}
    </div>
    <div className="game-board__zone game-board__zone_index_6">
      {renderPropertyCards(setupBottom)}
    </div>
    <div className="game-board__zone game-board__zone_type_police game-board__zone_type_angle">
      police
    </div>
    <div className="game-board__zone game-board__zone_index_7 game-board__zone_type_vertical">
      {renderPropertyCards(setupLeft)}
    </div>
    <div className="game-board__zone game-board__zone_index_8 game-board__zone_type_vertical">
      {renderPropertyCards(setupLeft)}
    </div>
  </div>
);

export default GameBoard;
