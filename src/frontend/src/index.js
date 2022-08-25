import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'

import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ForgotPass from './pages/ForgotPass';
import Karma from './pages/Karma';
import PrefsQuiz from './pages/PrefsQuiz';
import Courses from './pages/Courses';
import Home from './pages/Home';
import TestProfile from './pages/components/TestProfile';
import Reviews from './pages/Reviews';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //地図: Add new routes
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="courses" element={<Courses />} />
      <Route path="forgot_pass" element={<ForgotPass />} />
      <Route path="karma" element={<Karma />} />
      <Route path="user_prefs" element={<PrefsQuiz />} />
      <Route path="test_profile" element={<TestProfile />} />
      <Route path="reviews"
      element={<Reviews />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
