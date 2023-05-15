import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes';

export const Router = () => (
  <Routes>
    {Object.entries(ROUTES).map(([_, item]) => (
      <Route key={item.path} {...item} />
    ))}
  </Routes>
);
