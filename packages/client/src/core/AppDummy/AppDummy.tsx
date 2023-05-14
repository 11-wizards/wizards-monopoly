import { type FC, useState } from 'react';
import { Button } from 'antd';

export const AppDummy: FC = () => {
  const [count, setCount] = useState<number>(0);

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const decrementCount = () => {
    setCount((prevState) => prevState - 1);
  };

  return (
    <>
      <div>count: {count}</div>
      <Button onClick={incrementCount}>increment</Button>
      <Button onClick={decrementCount}>decrement</Button>
    </>
  );
};
