import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import classes from '../newArticle/newArticle.module.scss';
import { editArticle, watchArticle } from '../../redux/actions';

function EditArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [tagList, setTagList] = useState([]);

  const article = useSelector((state) => state.articles.find((article) => article.slug === slug));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    dispatch(watchArticle(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (article) {
      setValue('title', article.title);
      setValue('description', article.description);
      setValue('body', article.body);
      setTagList(article.tagList || []);
    }
  }, [article, setValue]);

  const onSubmit = async (data) => {
    try {
      const articleData = {
        ...data,
        tagList: tagList.filter((tag) => tag.trim() !== ''),
      };

      const token = localStorage.getItem('jwtToken');
      await dispatch(editArticle(articleData, slug, token));

      if (!token) {
        navigate('/sign-in');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log('Ошибка редактирования статьи');
    }
  };

  const handleTagChange = (value, index) => {
    const updatedTagList = [...tagList];
    updatedTagList[index] = value;
    setTagList(updatedTagList);
  };

  const handleClickAddTag = () => {
    if (tagList[tagList.length - 1].trim() !== '') {
      setTagList([...tagList, '']);
    }
  };

  const handleClickDeleteTag = (index) => {
    if (tagList[index].trim() !== '' && index !== 0) {
      setTagList(tagList.filter((_, i) => i !== index));
    }
  };

  return (
    <div className={classes['new-article']}>
      <div className={classes.header}>Edit article</div>
      <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.name}>
          Title
          <input
            className={`${classes.title} ${errors.title ? classes.inputError : ''}`}
            type="text"
            placeholder="Title"
            {...register('title', {
              required: 'Title is required',
            })}
          />
          {errors.title && <span className={classes.errors}>{errors.title.message}</span>}
        </div>
        <div className={classes.name}>
          Short description
          <input
            className={`${classes.description} ${errors.description ? classes.inputError : ''}`}
            type="text"
            placeholder="Description"
            {...register('description', {
              required: 'Short description is required',
            })}
          />
          {errors.description && <span className={classes.errors}>{errors.description.message}</span>}
        </div>
        <div className={classes.name}>
          Text
          <input
            className={`${classes.text} ${errors.body ? classes.inputError : ''}`}
            type="text"
            placeholder="Text"
            {...register('body', {
              required: 'Text is required',
            })}
          />
          {errors.body && <span className={classes.errors}>{errors.body.message}</span>}
        </div>
        <div className={classes.tags}>Tags</div>

        {tagList.map((tag, index) => (
          <div key={index} className={classes['mini-container']}>
            <input
              className={classes.tag}
              placeholder="Tag"
              type="text"
              value={tag}
              onChange={(e) => handleTagChange(e.target.value, index)}
            />
            <button type="button" className={classes.delete} onClick={() => handleClickDeleteTag(index)}>
              Delete
            </button>
          </div>
        ))}

        <button type="button" className={classes['add-tag']} onClick={handleClickAddTag}>
          Add tag
        </button>

        <button type="submit" className={classes.send}>
          Send
        </button>
      </form>
    </div>
  );
}

export default EditArticle;

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
//
// import classes from '../newArticle/newArticle.module.scss';
// import { editArticle, watchArticle } from '../../redux/actions';
//
// function EditArticle({ article }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//
//   // Состояния для полей статьи
//   const [title, setTitle] = useState(article?.title || '');
//   const [description, setDescription] = useState(article?.description || '');
//   const [body, setBody] = useState(article?.body || '');
//   const [tagList, setTagList] = useState(article?.tagList || ['']);
//
//   const handleTagChange = (value, index) => {
//     const updatedTagList = [...tagList];
//     updatedTagList[index] = value;
//     setTagList(updatedTagList);
//   };
//
//   const handleClickAddTag = () => {
//     if (tagList[tagList.length - 1].trim() !== '') {
//       setTagList([...tagList, '']);
//     }
//   };
//
//   const handleClickDeleteTag = (index) => {
//     if (tagList[index].trim() !== '' && index !== 0) {
//       setTagList(tagList.filter((_, i) => i !== index));
//     }
//   };
//
//   const onSubmit = async (data) => {
//     dispatch(watchArticle(article.slug));
//     try {
//       const body = {
//         article: {
//           title: data.title,
//           description: data.description,
//           body: data.body,
//           tagList: tagList.filter((tag) => tag.trim() !== ''),
//         },
//       };
//
//       const token = localStorage.getItem('jwtToken');
//       await dispatch(editArticle(body, article.slug, token));
//     } catch (error) {
//       console.log('Ошибка редактирования статьи');
//     }
//   };
//
//   return (
//     <div className={classes['edit-article']}>
//       <div className={classes.header}>Edit Article</div>
//       <form className={classes.container} onSubmit={onSubmit}>
//         <div className={classes.name}>
//           Title
//           <input
//             className={classes.title}
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div className={classes.name}>
//           Short description
//           <input
//             className={classes.description}
//             type="text"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div className={classes.name}>
//           Text
//           <textarea
//             className={classes.text}
//             placeholder="Text"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//           />
//         </div>
//         <div className={classes.tags}>Tags</div>
//
//         {tagList.map((tag, index) => (
//           <div key={index} className={classes['mini-container']}>
//             <input
//               className={classes.tag}
//               placeholder="Tag"
//               type="text"
//               value={tag}
//               onChange={(e) => handleTagChange(e.target.value, index)}
//             />
//             <button type="button" className={classes.delete} onClick={() => handleClickDeleteTag(index)}>
//               Delete
//             </button>
//           </div>
//         ))}
//
//         <button type="button" className={classes['add-tag']} onClick={handleClickAddTag}>
//           Add tag
//         </button>
//
//         <button type="submit" className={classes.send}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }
// // dispatch(watchArticle(slug));
//
// export default EditArticle;

// import React, { useEffect, useState } from 'react';
//
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
//
// import { editArticle } from '../../redux/actions';
// import classes from '../newArticle/newArticle.module.scss';
//
// function EditArticle() {
//   const dispatch = useDispatch();
//   const { article } = useSelector((state) => state.article);
//   const { slug } = useParams();
//   const [tagList, setTagList] = useState(article?.tagList || ['']);
//
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     mode: 'onChange',
//   });
//
//   const onSubmit = async (data) => {
//     try {
//       const body = {
//         article: {
//           title: data.title,
//           description: data.description,
//           body: data.body,
//           tagList: tagList.filter((tag) => tag.trim() !== ''),
//         },
//       };
//
//       const token = localStorage.getItem('jwtToken');
//       await dispatch(editArticle(body, slug, token));
//     } catch (error) {
//       console.log('Ошибка редактирования статьи');
//     }
//   };
//
//   // useEffect(() => {
//   //   // Устанавливаем начальные значения полей формы
//   //   Object.keys(initialValues).forEach((key) => {
//   //     setValue(key, initialValues[key]);
//   //   });
//   // }, [initialValues, setValue]);
//
//   return (
//     <div className={classes['new-article']}>
//       <div className={classes.header}> Edit article </div>
//       <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
//         <div className={classes.name}>
//           Title
//           <input
//             className={classes.title}
//             type="text"
//             placeholder="Title"
//             // defaultValue={article.title}
//             {...register('title', {
//               required: 'Title is required',
//             })}
//           />
//         </div>
//         <div className={classes.name}>
//           Short description
//           <input className={classes.description} placeholder="Description" />
//         </div>
//         <div className={classes.name}>
//           Text
//           <input className={classes.text} placeholder="Text" />
//         </div>
//         <div className={classes['mini-container']}>
//           <div className={classes.tags}>
//             Tags
//             <input className={classes.tag} placeholder="Tag" />
//           </div>
//           <button type="button" className={classes.delete}>
//             Delete
//           </button>
//           <button type="button" className={classes['add-tag']}>
//             Add tag
//           </button>
//         </div>
//         <button type="button" className={classes.send}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }
//
// export default EditArticle;

// import React, { useEffect } from 'react';
//
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
//
// import { editArticle, watchArticle } from '../../redux/actions';
// import ArticleForm from '../articleForm/articleForm.jsx';
//
// function EditArticle() {
//   const dispatch = useDispatch();
//   // const navigate = useNavigate();
//   const article = useSelector((state) => state.article);
//   const { slug } = useParams();
//
//   useEffect(() => {
//     dispatch(watchArticle(slug));
//   }, [dispatch, slug]);
//
//   const onSubmit = async (data) => {
//     try {
//       const body = {
//         article: {
//           title: data.title,
//           description: data.description,
//           body: data.body,
//           tagList: article.tagList.filter((tag) => tag.trim() !== ''),
//         },
//       };
//
//       const token = localStorage.getItem('jwtToken');
//       await dispatch(editArticle(body, slug, token));
//     } catch (error) {
//       console.log('Ошибка редактирования статьи');
//     }
//   };
//
//   // return <ArticleForm onSubmit={onSubmit} initialValues={article} />;
// }
//
// export default EditArticle;
