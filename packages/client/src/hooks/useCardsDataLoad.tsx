import { useEffect, useState } from 'react';
import type { CardData } from 'game/types/cards';

export const useCardsDataLoad = (
  cardsData: CardData[],
): [Nullable<Record<number, CardData>>, Nullable<Record<number, Nullable<CanvasImageSource>>>] => {
  const [data, setData] = useState<Record<number, CardData>>({});
  const [images, setImages] = useState<Record<number, CanvasImageSource | null>>({});

  const onLoadImg = (payload: Record<number, CanvasImageSource | null>) => {
    setImages((prev: Record<number, CanvasImageSource | null>) => ({ ...prev, ...payload }));
  };

  useEffect(() => {
    cardsData.forEach((card, key) => {
      const cardImage = new Image();
      cardImage.src = card.imgSrc;
      const cardData = { ...card };

      setData((prev) => ({ ...prev, [key]: cardData }));
      cardImage.onload = () => onLoadImg({ [key]: cardImage });
      cardImage.onerror = () => onLoadImg({ [key]: null });
    });
  }, [cardsData]);

  if (Object.keys(images).length !== 40) return [null, null];

  return [data, images];
};
