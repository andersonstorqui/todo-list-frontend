import { Fragment } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; // Adicione Navigate aqui
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ element: Element }) => {
  const { signed } = useAuth();
  return signed ? <Element /> : <Home />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/home" element={<PrivateRoute element={Home} />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default Router;
