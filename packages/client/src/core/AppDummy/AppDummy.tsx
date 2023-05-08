/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { decrement, increment } from 'app/slices/counterSlice';

export const AppDummy: FC = () => {
  const count = useSelector((state: any) => state.counter.value);

  const data = useSelector((state: any) => state.counter.serverValue);

  console.log(data);

  const dispatch = useDispatch();

  return (
    <>
      <div>count: {count}</div>
      <Button onClick={() => dispatch(increment())}>increment</Button>
      <Button onClick={() => dispatch(decrement())}>decrement</Button>
    </>
  );
};
