// Fixed code
import type { Player } from 'game/model';
import { CardRect } from 'game/model';
import { PlayerDirection } from 'types/enums/main';
import type { PlayerPosition } from 'models/game.model';

function determineSizeOfSide(
  i: number,
  baseWidth: number,
  baseHeight: number,
): { width: number; height: number } {
  if ((i > 0 && i < 10) || (i > 20 && i < 30)) return { width: baseWidth, height: baseHeight };
  if ((i > 10 && i < 20) || (i > 30 && i < 40)) return { width: baseHeight, height: baseWidth };

  return { width: baseHeight, height: baseHeight };
}

export const initStartPlayersPositions = (players: Player[]) => {
  const startPositions: PlayerPosition[] = [];
  players.forEach((player, index) => {
    const y = index * 20;
    const position: PlayerPosition = {
      id: player.getId(),
      x: 0,
      y,
      direction: PlayerDirection.RIGHT,
    };
    startPositions.push(position);
  });

  return startPositions;
};

export const initCardsPositions = (
  count: number,
  cardWidth: number,
  cardHeight: number,
): CardRect[] => {
  const cards: CardRect[] = [];
  let stepX = 0;
  let stepY = 0;

  for (let i = 0; i < count; i += 1) {
    const { width, height } = determineSizeOfSide(i, cardWidth, cardHeight);
    const card: CardRect = new CardRect(stepX, stepY, width, height);
    if (i === 0) {
      stepX = width;
    } else if (i === 10) {
      stepY += height;
    } else if (i === 20) {
      stepX -= cardWidth;
    } else if (i === 30) {
      stepX = 0;
      card.setX(stepX);
      stepY -= cardWidth;
    } else if (i > 0 && i < 10) {
      stepX += width;
    } else if (i > 10 && i < 20) {
      stepY += height;
    } else if (i > 20 && i < 30) {
      stepX -= width;
    } else if (i > 30 && i < 40) {
      stepY -= height;
    }
    cards[i] = card;
  }

  return cards;
};

const playerTargetApproach = (
  id: string,
  x: number,
  y: number,
  targetX: number,
  targetY: number,
): PlayerPosition => {
  if (x < targetX) {
    return { id, x: x + 1, y };
  }
  if (y < targetY) {
    return { id, x, y: y + 1 };
  }
  if (x > targetX) {
    return { id, x: x - 1, y };
  }
  if (y > targetY) {
    return { id, x, y: y - 1 };
  }

  return { id, x, y };
};

const playerSquareDirection = (
  id: string,
  x: number,
  y: number,
  speed: number,
  direction?: PlayerDirection,
): Nullable<PlayerPosition> => {
  const squareSize = 18;
  if (direction === 'right') {
    if (x + squareSize >= 900) {
      return { id, x, y, direction: PlayerDirection.DOWN };
    }

    return { id, x: x + speed, y, direction };
  }
  if (direction === 'down') {
    if (y + squareSize >= 900) {
      return { id, x, y, direction: PlayerDirection.LEFT };
    }

    return { id, x, y: y + speed, direction };
  }
  if (direction === 'left') {
    if (x <= 0) {
      return { id, x, y, direction: PlayerDirection.UP };
    }

    return { id, x: x - speed, y, direction };
  }
  if (direction === 'up') {
    if (y <= 0) {
      return { id, x, y, direction: PlayerDirection.RIGHT };
    }

    return { id, x, y: y - speed, direction };
  }

  return null;
};

export const playerAnimationSteps = (
  playerPosition: PlayerPosition,
  targetPosition: CardRect,
  speed: number,
): Nullable<PlayerPosition> => {
  const { x, y, direction } = playerPosition;
  const targetX = targetPosition.getX();
  const targetY = targetPosition.getY();

  if (x === targetX && y === targetY) return null;
  if (x - targetX < 150 && x - targetX > -150 && y - targetY < 150 && y - targetY > -150) {
    return playerTargetApproach(playerPosition.id, x, y, targetX, targetY);
  }

  return playerSquareDirection(playerPosition.id, x, y, speed, direction);
};
