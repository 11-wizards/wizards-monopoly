import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'features/Header';

export const Default: FC = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);
