// src/Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import About from './pages/About';
// import Contact from './pages/Contact';
import PageNotFound from './components/notFound/NotFound';
import HomeScreen from './components/home/HomeScreen';
import LoginScreen from './components/auth/LoginScreen';
import { CustomPage } from './components/common';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <CustomPage>
            <HomeScreen />
          </CustomPage>
        }
      />
      {/* <Route path="/about" element={<About />} /> */}
      <Route
        path="/login"
        element={
          <CustomPage>
            <LoginScreen />
          </CustomPage>
        }
      />
      {/* <Route path="/contact" element={<Contact />} /> */}
      <Route
        path="*"
        element={
          <CustomPage>
            <PageNotFound />
          </CustomPage>
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;
