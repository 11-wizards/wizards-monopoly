// Fixed code
export type PlayerPosition = { x: number; y: number; direction?: string };
export type PlayerPositionTarget = [number, number];

function determineSizeOfSide(
  i: number,
  baseWidth: number,
  baseHeight: number,
): { width: number; height: number } {
  if ((i > 0 && i < 10) || (i > 20 && i < 30)) return { width: baseWidth, height: baseHeight };
  if ((i > 10 && i < 20) || (i > 30 && i < 40)) return { width: baseHeight, height: baseWidth };

  return { width: baseHeight, height: baseHeight };
}

export const readyPositionCards = (
  count: number,
  cardWidth: number,
  cardHeight: number,
): number[][] => {
  const cards = [];
  let stepX = 0;
  let stepY = 0;

  for (let i = 0; i < count; i += 1) {
    const { width, height } = determineSizeOfSide(i, cardWidth, cardHeight);
    const card = [stepX, stepY, width, height];
    if (i === 0) {
      stepX = width;
    } else if (i === 10) {
      stepY += height;
    } else if (i === 20) {
      stepX -= cardWidth;
    } else if (i === 30) {
      stepX = 0;
      card[0] = stepX;
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
  x: number,
  y: number,
  targetX: number,
  targetY: number,
): PlayerPosition => {
  if (x < targetX) {
    return { x: x + 1, y };
  }
  if (y < targetY) {
    return { x, y: y + 1 };
  }
  if (x > targetX) {
    return { x: x - 1, y };
  }
  if (y > targetY) {
    return { x, y: y - 1 };
  }

  return { x, y };
};

const playerSquareDirection = (
  x: number,
  y: number,
  speed: number,
  direction = '',
): PlayerPosition | false => {
  const squareSize = 18;
  if (direction === 'right') {
    if (x + squareSize >= 900) {
      return { x, y, direction: 'down' };
    }

    return { x: x + speed, y, direction };
  }
  if (direction === 'down') {
    if (y + squareSize >= 900) {
      return { x, y, direction: 'left' };
    }

    return { x, y: y + speed, direction };
  }
  if (direction === 'left') {
    if (x <= 0) {
      return { x, y, direction: 'up' };
    }

    return { x: x - speed, y, direction };
  }
  if (direction === 'up') {
    if (y <= 0) {
      return { x, y, direction: 'right' };
    }

    return { x, y: y - speed, direction };
  }

  return false;
};

export const playerAnimationSteps = (
  playerPosition: PlayerPosition,
  tagetPosition: PlayerPositionTarget,
  speed: number,
): PlayerPosition | false => {
  const { x, y, direction } = playerPosition;
  const [targetX, targetY] = tagetPosition;

  if (x === targetX && y === targetY) return false;
  if (x - targetX < 150 && x - targetX > -150 && y - targetY < 150 && y - targetY > -150) {
    return playerTargetApproach(x, y, targetX, targetY);
  }

  return playerSquareDirection(x, y, speed, direction);
};
