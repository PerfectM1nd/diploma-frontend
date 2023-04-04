import { Route, Routes } from 'react-router-dom';

import { Home } from './Home';
import { Login } from './Login';
import { Register } from './Register';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
