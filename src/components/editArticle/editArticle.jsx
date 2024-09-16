// import React, { useEffect, useState } from 'react';
//
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
//
// import { editArticle } from '../../redux/actions';
// import classes from '../newArticle/newArticle.module.scss';
//
// function EditArticle({ onSubmit, initialValues = {} }) {
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
//   // const onSubmit = async (data) => {
//   //   try {
//   //     const body = {
//   //       article: {
//   //         title: data.title,
//   //         description: data.description,
//   //         body: data.body,
//   //         tagList: tagList.filter((tag) => tag.trim() !== ''),
//   //       },
//   //     };
//   //
//   //     const token = localStorage.getItem('jwtToken');
//   //     await dispatch(editArticle(body, slug, token));
//   //   } catch (error) {
//   //     console.log('Ошибка редактирования статьи');
//   //   }
//   // };
//
//   useEffect(() => {
//     // Устанавливаем начальные значения полей формы
//     Object.keys(initialValues).forEach((key) => {
//       setValue(key, initialValues[key]);
//     });
//   }, [initialValues, setValue]);
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
//             // ejcb
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
//

import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { editArticle, watchArticle } from '../../redux/actions';
import ArticleForm from '../articleForm/articleForm.jsx';

function EditArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const article = useSelector((state) => state.article);
  const { slug } = useParams();

  useEffect(() => {
    dispatch(watchArticle(slug));
  }, [dispatch, slug]);

  const onSubmit = async (data) => {
    try {
      const body = {
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.tagList.filter((tag) => tag.trim() !== ''),
        },
      };

      const token = localStorage.getItem('jwtToken');
      await dispatch(editArticle(body, slug, token));
    } catch (error) {
      console.log('Ошибка редактирования статьи');
    }
  };

  return <ArticleForm onSubmit={onSubmit} initialValues={article} />;
}

export default EditArticle;
