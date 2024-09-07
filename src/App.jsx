import React from 'react';

import classes from './app.module.scss';
import Header from './components/header/header';
import ArticlesList from './components/aticlesList/articlesList';

function App() {
  return (
    <div>
      <Header />
      <ArticlesList />
    </div>
  );
}

export default App;
