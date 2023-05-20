import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes';

export const Router = () => (
  <Routes>
    {Object.values(ROUTES).map((item) => (
      <Route key={item.path} {...item} />
    ))}
  </Routes>
);
