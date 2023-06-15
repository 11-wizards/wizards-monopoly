import { CardFamily, CardTypes, STREET } from 'game/types/cards';
import type { Card, PlayerPosition, PlayerPositionTarget } from 'game/types/game';
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
): Array<Card> => {
  const cards = [];
  let stepX = 0;
  let stepY = 0;

  for (let i = 0; i < count; i += 1) {
    const { width, height } = calcCardSize(i, cardWidth, cardHeight);
    const card = { x: stepX, y: stepY, w: width, h: height, img: null };
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

export const drawCard = (
  context: CanvasRenderingContext2D,
  mapSize: number,
  card: Card,
  cardsData: {
    priceView: string | undefined;
    title: string | undefined;
    type: CardTypes;
    family: CardFamily
  },
  img: CanvasImageSource | null,
): void => {
  const { x, y, w, h } = card;
  const { priceView, title, type, family } = cardsData;
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
  // eslint-disable-next-line no-param-reassign
  context.font = `${(mapSize / 100) * 1.5}px Georgia`;
  // eslint-disable-next-line no-param-reassign

  if (type === STREET) {
    context.fillStyle = family;
    context.fillRect(x, y, w, h / 100 * 30);
    context.fillStyle = 'white';

  } else {
    context.fillStyle = 'black';
  }
  const maxWidthText = w - 10;
  if (title) {
    const titleTextWidth =
      context.measureText(title).width > maxWidthText
        ? maxWidthText
        : context.measureText(title).width;
    context.fillText(title, x + (w / 2 - titleTextWidth / 2), y + 15, maxWidthText);
  }
  if (priceView) {
    context.fillStyle = 'black';
    const priceViewTextWidth = context.measureText(priceView).width;
    context.fillText(priceView, x + (w / 2 - priceViewTextWidth / 2), y + h - 5, maxWidthText);
  }

  context.strokeRect(x, y, w, h);
  drawCardUpgrade(context, 5, card);
};

// player move

const drawCardUpgrade = (
  context: CanvasRenderingContext2D,
  level: number,
  card: Card
) => {
  const { x, y, w, h } = card;
  const baseSize = w > h ? h : w;

  let homeW = baseSize / 100 * 16;
  let homeH = baseSize / 100 * 13;
  let roofW = baseSize / 100 * 16;
  const homeY = y + ((h - homeH) / 1.6);
  let homeX = x;

  let roofH = baseSize / 100 * 8;
  if (level === 5) {
    roofW *= 2;
    roofH *= 2;
    homeW *= 2;
    homeH *= 2;
    homeX = x + ((w - homeW) / 2);
  }

  // const roofLX = homeX - baseSize / 100 * 3;
  // const roofLY = homeY;
  // const roofCX = homeX + roofW / 2;
  // const roofCY = homeY - roofH;
  // const roofRX = homeX + homeW + baseSize / 100 * 3;
  // const roofRY = homeY;

  context.strokeStyle = 'red';
  context.fillStyle = 'red';

  if (level === 5) {
    const roofLX = homeX - baseSize / 100 * 3;
    const roofLY = homeY;
    const roofCX = homeX + roofW / 2;
    const roofCY = homeY - roofH;
    const roofRX = homeX + homeW + baseSize / 100 * 3;
    const roofRY = homeY;
    drawHome(context, { homeX, homeY, homeW, homeH, roofLX, roofLY, roofCX, roofCY, roofRX, roofRY });
  } else {
    console.log(w);
    console.log(homeW);

    for (let i = 0; i < level; i++) {

      homeX = x + (w / level * i) + homeW / 2 + (baseSize / 100 * 3);
      console.log(homeX);
      const roofLX = homeX - baseSize / 100 * 3;
      const roofLY = homeY;
      const roofCX = homeX + roofW / 2;
      const roofCY = homeY - roofH;
      const roofRX = homeX + homeW + baseSize / 100 * 3;
      const roofRY = homeY;
      drawHome(context, { homeX, homeY, homeW, homeH, roofLX, roofLY, roofCX, roofCY, roofRX, roofRY });
    }
  }


}

const drawHome = (
  context: CanvasRenderingContext2D,
  { homeX, homeY, homeW, homeH, roofLX, roofLY, roofCX, roofCY, roofRX, roofRY }: Record<string, number>) => {
  // context.strokeStyle = 'red';
  // context.fillStyle = 'red';
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
}

const arrayNumberRound = (array: Array<number>): Array<number> =>
  array.map((item) => Math.round(item));

export const calcPlayerParkingSpotCard = (
  id: number,
  card: Card,
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

export const randomInt = (max: number, min: number = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
