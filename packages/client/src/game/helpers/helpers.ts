import { STREET_HOME_SIZE_H, STREET_HOME_SIZE_W } from 'game/constants';
import { STREET } from 'game/types/cards';
import type { PlayerPosition, PlayerPositionTarget } from 'game/types/game';
import type { TypeMapCardsData } from 'game/types/map';
import { CornersCardsID, MapDirectons } from 'game/types/map';

const { UP, DOWN, LEFT, RIGHT } = MapDirectons;
const { CARD_TOP_LEFT, CARD_TOP_RIGHT, CARD_BOTTOM_LEFT, CARD_BOTTOM_RIGHT } = CornersCardsID;

// render map

function calcCardSize(
  id: number,
  baseWidth: number,
  baseHeight: number,
): { height: number; width: number } {
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
): Array<{
  h: number;
  w: number;
  x: number;
  y: number;
}> => {
  const cards = [];
  let stepX = 0;
  let stepY = 0;

  for (let i = 0; i < count; i += 1) {
    const { width, height } = calcCardSize(i, cardWidth, cardHeight);
    const card = { x: stepX, y: stepY, w: width, h: height };
    if (i === CARD_TOP_LEFT) {
      stepX = width;
    } else if (i === CARD_TOP_RIGHT) {
      stepY += height;
    } else if (i === CARD_BOTTOM_LEFT) {
      stepX -= cardWidth;
    } else if (i === CARD_BOTTOM_RIGHT) {
      stepX = 0;
      card.x = stepX;
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
const drawHome = (
  context: CanvasRenderingContext2D,
  {
    homeX,
    homeY,
    homeW,
    homeH,
    roofLX,
    roofLY,
    roofCX,
    roofCY,
    roofRX,
    roofRY,
  }: Record<string, number>,
) => {
  context.beginPath();
  context.fillRect(homeX, homeY, homeW, homeH);
  context.stroke();

  context.beginPath();
  context.moveTo(roofLX, roofLY);
  context.lineTo(roofCX, roofCY);
  context.lineTo(roofRX, roofRY);
  context.closePath();
  context.stroke();
  context.fill();
};

const drawCardLevel = (
  context: CanvasRenderingContext2D,
  level: number | null,
  card: TypeMapCardsData,
  color: string,
) => {
  const { x, y, w, h } = card;
  const baseSize = w > h ? h : w;

  let homeW = (baseSize / 100) * STREET_HOME_SIZE_W;
  let homeH = (baseSize / 100) * STREET_HOME_SIZE_H;
  let roofW = (baseSize / 100) * STREET_HOME_SIZE_W;
  let homeY = y + (h - homeH) / 1.9;
  let homeX = x;

  let roofH = (baseSize / 100) * 8;

  if (!level || level === 5) {
    roofW *= 1.5;
    roofH *= 1.5;
    homeW *= 1.5;
    homeH *= 1.5;
    homeX = x + (w - homeW) / 2;
  }

  context.strokeStyle = color;

  context.fillStyle = color;

  if (level === 5 || !level) {
    const roofLX = homeX - (baseSize / 100) * 3;
    const roofLY = homeY;
    const roofCX = homeX + roofW / 2;
    const roofCY = homeY - roofH;
    const roofRX = homeX + homeW + (baseSize / 100) * 3;
    const roofRY = homeY;
    drawHome(context, {
      homeX,
      homeY,
      homeW,
      homeH,
      roofLX,
      roofLY,
      roofCX,
      roofCY,
      roofRX,
      roofRY,
    });
  } else {
    for (let i = 1; i <= level; i += 1) {
      if (i === 1) {
        homeX = x + (w / 4) * 1 - homeW / 2;
        homeY = y + (h / 4) * 1.2 + homeH;
      }
      if (i === 2) {
        homeX = x + (w / 3) * 2;
      }
      if (i === 3) {
        homeX = x + (w / 4) * 1 - homeW / 2;
        homeY = y + (h / 2) * 1.2 + homeH;
      }
      if (i === 4) {
        homeX = x + (w / 3) * 2;
      }

      const roofLX = homeX - (baseSize / 100) * 3;
      const roofLY = homeY;
      const roofCX = homeX + roofW / 2;
      const roofCY = homeY - roofH;
      const roofRX = homeX + homeW + (baseSize / 100) * 3;
      const roofRY = homeY;
      drawHome(context, {
        homeX,
        homeY,
        homeW,
        homeH,
        roofLX,
        roofLY,
        roofCX,
        roofCY,
        roofRX,
        roofRY,
      });
    }
  }
};

export const drawCard = (
  context: CanvasRenderingContext2D,
  mapSize: number,
  card: TypeMapCardsData,
): void => {
  const { x, y, w, h, img, colorLabel, colorBg, level, type, title, price } = card;
  const bgColor = colorBg ?? 'white';

  context.fillStyle = bgColor;

  context.fillRect(x, y, w, h);

  if (img && type !== STREET) {
    let imgSizes = [x, y, w, h];
    if (w === h) {
      imgSizes = [x, y, w, h];
    } else if (w > h) {
      imgSizes = [x + w / 1.8 - h / 2 / 2, y + h / 1.5 - h / 2 / 2, h / 3, h / 3];
    } else {
      imgSizes = [x + w / 1.8 - w / 2 / 2, y + h / 1.8 - w / 2 / 2, w / 3, w / 3];
    }
    context.drawImage(img, imgSizes[0], imgSizes[1], imgSizes[2], imgSizes[3]);
  }

  context.font = `${(mapSize / 100) * 1.7}px Georgia`;

  if (colorLabel && typeof colorLabel === 'string') {
    context.fillStyle = colorLabel;

    context.fillRect(x, y, w, (h / 100) * 30);

    context.fillStyle = 'white';
  } else {
    context.fillStyle = 'black';
  }

  const maxWidthText = w - 5;
  if (title) {
    const titleTextWidth =
      context.measureText(title).width > maxWidthText
        ? maxWidthText
        : context.measureText(title).width;

    context.fillText(title, x + (w / 2 - titleTextWidth / 2), y + 15, maxWidthText);
  }
  if (price) {
    context.fillStyle = 'black';

    const priceTextWidth = context.measureText(`${price}$`).width;

    context.fillText(`${price}$`, x + (w / 2 - priceTextWidth / 2), y + h - 5, maxWidthText);
  }
  // ДЛЯ ДЕМО
  // if (type === STREET && level !== CardLevel.LEVEL_0 && typeof colorLabel === 'string') {
  if (type === STREET && typeof colorLabel === 'string') {
    drawCardLevel(context, level, card, colorBg ? 'white' : colorLabel);
  }

  context.strokeStyle = 'black';

  context.strokeRect(x, y, w, h);
};

// player move

const arrayNumberRound = (array: Array<number>): Array<number> =>
  array.map((item) => Math.round(item));

export const getDirectionCard = (id: number): MapDirectons => {
  if (id >= 0 && id < 11) return UP;
  if (id >= 11 && id < 20) return RIGHT;
  if (id >= 20 && id < 31) return DOWN;
  if (id >= 31 && id < 40) return LEFT;

  return UP;
};

export const calcPlayerParkingSpotCard = (
  id: number,
  card: TypeMapCardsData,
  playerSize: number,
): Array<number> => {
  const { x, y, w, h } = card;

  const baseY = Number(Math.round(y + 10));
  const baseX = Number(Math.round(x + w / 2 - playerSize * 1.5));
  if (w > h) {
    if (id % 2 === 0) {
      return arrayNumberRound([baseX + (playerSize / 1.5) * id + 3, baseY]);
    }

    return arrayNumberRound([
      baseX + (playerSize / 1.5) * id - playerSize / 2 + 3,
      baseY + playerSize + 5,
    ]);
  }
  if (id % 2 === 0) {
    return arrayNumberRound([baseX, baseY + (playerSize / 1.5) * id + 3]);
  }

  return arrayNumberRound([
    baseX + playerSize + 5,
    baseY + (playerSize / 1.5) * id - playerSize / 2 + 3,
  ]);
};

const playerMoveBegin = (
  x: number,
  y: number,
  speed: number,
  direction: MapDirectons,
  mapSize: number,
  playerSize: number,
): PlayerPosition | false => {
  if (direction === RIGHT) {
    if (x + playerSize >= mapSize) {
      return { x, y, direction: DOWN };
    }

    return { x: x + speed, y, direction };
  }
  if (direction === DOWN) {
    if (y + playerSize >= mapSize) {
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
  mapSize: number,
  playerSize: number,
): PlayerPosition | false => {
  const { x, y, direction } = playerPosition;

  const [targetX, targetY] = tagetPosition;

  if (x === targetX && y === targetY) return false;

  const longDistance = Math.round((mapSize / 100) * 17);
  const shortDistance = Math.round(mapSize / 100);

  const distanceToTargetX = x - targetX;
  const distanceToTargetY = y - targetY;

  if (
    distanceToTargetX < longDistance &&
    distanceToTargetX > -longDistance &&
    distanceToTargetY < longDistance &&
    distanceToTargetY > -longDistance
  ) {
    if (
      (distanceToTargetX < shortDistance && distanceToTargetX > -shortDistance) ||
      (distanceToTargetY < shortDistance && distanceToTargetY > -shortDistance)
    ) {
      if (
        distanceToTargetX < shortDistance &&
        distanceToTargetX > -shortDistance &&
        distanceToTargetY < shortDistance &&
        distanceToTargetY > -shortDistance
      )
        return playerMoveEnd(x, y, targetX, targetY, 1, 1, direction);
      if (distanceToTargetX < shortDistance && distanceToTargetX > -shortDistance)
        return playerMoveEnd(x, y, targetX, targetY, 1, speed, direction);
      if (distanceToTargetY < shortDistance && distanceToTargetY > -shortDistance)
        return playerMoveEnd(x, y, targetX, targetY, speed, 1, direction);
    } else return playerMoveEnd(x, y, targetX, targetY, speed, speed, direction);
  }

  return playerMoveBegin(x, y, speed, direction, mapSize, playerSize);
};

// Dices

export const rollDices = (): Array<number> => [
  Math.floor(Math.random() * 6) + 1,
  Math.floor(Math.random() * 6) + 1,
];

export const resetDices = () => Math.random() + 1;
