import React from 'react';

import { Route, Routes } from 'react-router-dom';

import classes from './app.module.scss';
import ArticleAlone from './components/articleAlone/articleAlone';
import ArticlesList from './components/aticlesList/articlesList';
import EditArticle from './components/editArticle/editArticle';
import EditProfile from './components/editProfile/editProfile';
import Header from './components/header/header';
import NewArticle from './components/newArticle/newArticle';
import SignIn from './components/signIn/signIn';
import SignUp from './components/signUp/signUp';
import { UserProvider } from './userContext/userContext';

function App() {
  return (
    <div className={classes.app}>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/article/:slug" element={<ArticleAlone />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/new-article" element={<NewArticle />} />
          <Route path="/articles/:slug/edit" element={<EditArticle />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
