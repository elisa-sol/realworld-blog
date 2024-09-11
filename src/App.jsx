import React from 'react';

import classes from './app.module.scss';
import Header from './components/header/header';
import ArticlesList from './components/aticlesList/articlesList';
import { Route, Routes } from 'react-router-dom';
import ArticleAlone from './components/articleAlone/articleAlone';
import SignUp from './components/signUp/signUp.jsx';
import SignIn from './components/signIn/signIn.jsx';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/article/:slug" element={<ArticleAlone />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
