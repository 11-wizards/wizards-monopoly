import { cardsData } from 'data/cards';
import { useEffect, useState } from 'react';
import type { CardData } from 'types/cards';

export const useCardsDataLoad = (): Record<number, CardData> | null => {
  const [images, setImages] = useState<Record<number, CardData>>({});

  const onLoadImg = (payload: Record<number, CardData>) => {
    setImages((prev: Record<number, CardData>) => ({ ...prev, ...payload }));
  };

  useEffect(() => {
    cardsData.forEach(({ title, priceView, imgSrc }, key) => {
      const cardImage = new Image();
      cardImage.src = imgSrc;
      const cardData = { title, priceView };
      cardImage.onload = () => onLoadImg({ [key]: { ...cardData, img: cardImage } });
      cardImage.onerror = () => onLoadImg({ [key]: { ...cardData, img: null } });
    });
  }, [cardsData]);

  if (Object.keys(images).length !== 40) return null;

  return images;
};
