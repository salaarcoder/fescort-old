// src/Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import About from './pages/About';
// import Contact from './pages/Contact';
import PageNotFound from './components/notFound/NotFound';
import HomeScreen from './components/home/HomeScreen';
import LoginScreen from './components/auth/LoginScreen';
import { CustomPage } from './components/common';
import CreateScreen from './components/create/CreateScreen';
import MoviesScreen from './components/movies/MoviesScreen';
import { useSelector } from 'react-redux';
import { RootState } from './store';

// const activeVideoData = useSelector((state: RootState) => state.movie.activeData);

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <CustomPage>
            <HomeScreen />
          </CustomPage>
        }
      />
      {/*Movies */}
      <Route
        path="/movies"
        element={
          <CustomPage>
            <MoviesScreen />
          </CustomPage>
        }
      />
      {/* Create */}
      <Route
        path="/create"
        element={
          <CustomPage>
            <CreateScreen isEditScreen={false} />
          </CustomPage>
        }
      />
      {/* Update */}
      <Route
        path="/update"
        element={
          <CustomPage>
            <CreateScreen isEditScreen={true} />
          </CustomPage>
        }
      />
      {/* Login */}
      <Route
        path="/login"
        element={
          <CustomPage>
            <LoginScreen />
          </CustomPage>
        }
      />
      {/* <Route path="/contact" element={<Contact />} /> */}
      {/* Not Found */}
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
