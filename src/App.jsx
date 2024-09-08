import React from 'react';

import classes from './app.module.scss';
import Header from './components/header/header';
import ArticlesList from './components/aticlesList/articlesList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        {/*<Route path="/article/:slug" element={<ArticlePage />} /> /!* Страница для отдельной статьи *!/*/}
      </Routes>
    </div>
  );
}

export default App;
