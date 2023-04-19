import { CornersCardsID, MapDirectons } from 'types/enums/main';
import type { PlayerPosition, PlayerPositionTarget } from 'types/game';
import { MAP_DATA } from 'game/common';

const { MAP_SIZE, PLAYER_SIZE } = MAP_DATA;
const { UP, DOWN, LEFT, RIGHT } = MapDirectons;
const { CARD_TOP_LEFT, CARD_TOP_RIGHT, CARD_BOTTOM_LEFT, CARD_BOTTOM_RIGHT } = CornersCardsID;

// render map

function calcCardSize(
  id: number,
  baseWidth: number,
  baseHeight: number,
): { width: number; height: number } {
  if (
    (id > CARD_TOP_LEFT && id < CARD_TOP_RIGHT) ||
    (id > CARD_BOTTOM_LEFT && id < CARD_BOTTOM_RIGHT)
  ) {
    return { width: baseWidth, height: baseHeight };
  }
  if ((id > CARD_TOP_RIGHT && id < CARD_BOTTOM_LEFT) || (id > CARD_BOTTOM_RIGHT && id < 40)) {
    return { width: baseHeight, height: baseWidth };
  }

  return { width: baseHeight, height: baseHeight };
}

export const initCardsPositions = (
  count: number,
  cardWidth: number,
  cardHeight: number,
): number[][] => {
  const cards = [];
  let stepX = 0;
  let stepY = 0;

  for (let i = 0; i < count; i += 1) {
    const { width, height } = calcCardSize(i, cardWidth, cardHeight);
    const card = [stepX, stepY, width, height];
    if (i === CARD_TOP_LEFT) {
      stepX = width;
    } else if (i === CARD_TOP_RIGHT) {
      stepY += height;
    } else if (i === CARD_BOTTOM_LEFT) {
      stepX -= cardWidth;
    } else if (i === CARD_BOTTOM_RIGHT) {
      stepX = 0;
      card[0] = stepX;
      stepY -= cardWidth;
    } else if (i > 0 && i < CARD_TOP_RIGHT) {
      stepX += width;
    } else if (i > CARD_TOP_RIGHT && i < CARD_BOTTOM_LEFT) {
      stepY += height;
    } else if (i > CARD_BOTTOM_LEFT && i < CARD_BOTTOM_RIGHT) {
      stepX -= width;
    } else if (i > CARD_BOTTOM_RIGHT && i < 40) {
      stepY -= height;
    }
    cards[i] = card;
  }

  return cards;
};

// player move

export const calcPlayerParkingSpotCard = (
  id: number,
  card: Array<number>,
  playerSize: number,
): Array<number> => {
  const [x, y, w, h] = card;
  const baseY = Number(Math.round(y + 10));
  const baseX = Number(Math.round(x + w / 2 - playerSize * 1.5));
  if (w > h) {
    if (id % 2 === 0) {
      return [baseX + (playerSize / 1.5) * id + 3, baseY];
    }

    return [baseX + (playerSize / 1.5) * id - playerSize / 2 + 3, baseY + playerSize + 5];
  }
  if (id % 2 === 0) {
    return [baseX, baseY + (playerSize / 1.5) * id + 3];
  }

  return [baseX + playerSize + 5, baseY + (playerSize / 1.5) * id - playerSize / 2 + 3];
};

const playerMoveBegin = (
  x: number,
  y: number,
  speed: number,
  direction: MapDirectons,
): PlayerPosition | false => {
  if (direction === RIGHT) {
    if (x + PLAYER_SIZE >= MAP_SIZE) {
      return { x, y, direction: DOWN };
    }

    return { x: x + speed, y, direction };
  }
  if (direction === DOWN) {
    if (y + PLAYER_SIZE >= MAP_SIZE) {
      return { x, y, direction: LEFT };
    }

    return { x, y: y + speed, direction };
  }
  if (direction === LEFT) {
    if (x <= 0) {
      return { x, y, direction: UP };
    }

    return { x: x - speed, y, direction };
  }
  if (direction === UP) {
    if (y <= 0) {
      return { x, y, direction: RIGHT };
    }

    return { x, y: y - speed, direction };
  }

  return false;
};
const playerMoveEnd = (
  x: number,
  y: number,
  targetX: number,
  targetY: number,
  speedX: number,
  speedY: number,
  direction: MapDirectons,
): PlayerPosition => {
  if (x < targetX) {
    return { x: x + speedX, y, direction };
  }
  if (y < targetY) {
    return { x, y: y + speedY, direction };
  }
  if (x > targetX) {
    return { x: x - speedX, y, direction };
  }
  if (y > targetY) {
    return { x, y: y - speedY, direction };
  }

  return { x, y, direction };
};
export const playerMove = (
  playerPosition: PlayerPosition,
  tagetPosition: PlayerPositionTarget,
  speed: number,
): PlayerPosition | false => {
  const { x, y, direction } = playerPosition;
  const [targetX, targetY] = tagetPosition;

  if (x === targetX && y === targetY) return false;

  const distanceToTargetX = x - targetX;
  const distanceToTargetY = y - targetY;

  if (
    distanceToTargetX < 150 &&
    distanceToTargetX > -150 &&
    distanceToTargetY < 150 &&
    distanceToTargetY > -150
  ) {
    if (
      (distanceToTargetX < 10 && distanceToTargetX > -10) ||
      (distanceToTargetY < 10 && distanceToTargetY > -10)
    ) {
      if (
        distanceToTargetX < 10 &&
        distanceToTargetX > -10 &&
        distanceToTargetY < 10 &&
        distanceToTargetY > -10
      )
        return playerMoveEnd(x, y, targetX, targetY, 1, 1, direction);
      if (distanceToTargetX < 10 && distanceToTargetX > -10)
        return playerMoveEnd(x, y, targetX, targetY, 1, speed, direction);
      if (distanceToTargetY < 10 && distanceToTargetY > -10)
        return playerMoveEnd(x, y, targetX, targetY, speed, 1, direction);
    } else return playerMoveEnd(x, y, targetX, targetY, speed, speed, direction);
  }

  return playerMoveBegin(x, y, speed, direction);
};

// Dices

export const rollDices = (): Array<number> => [
  Math.floor(Math.random() * 6) + 1,
  Math.floor(Math.random() * 6) + 1,
];

export const resetDices = () => Math.random() + 1;
