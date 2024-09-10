import React from 'react';

import Markdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { watchArticle } from '../../redux/actions';
import classes from './articleAlone.module.css';
import { useParams } from 'react-router-dom';

function ArticleAlone() {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state);
  const { slug } = useParams();
}

export default ArticleAlone;
