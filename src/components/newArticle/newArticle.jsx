// import React, { useState } from 'react';
//
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
//
// import classes from './newArticle.module.scss';
// import { addArticle } from '../../redux/actions';
//
// function NewArticle({ article }) {
//   const dispatch = useDispatch();
//   const [tagList, setTagList] = useState(article?.tagList || []);
//   const [tagValue, setTagValue] = useState('');
//
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     mode: 'onChange',
//   });
//
//   const onSubmit = async (data) => {
//     try {
//       const tagsArray = data.tags ? data.tags.split(',').map((tag) => tag.trim()) : [];
//
//       const articleData = {
//         ...data,
//         tagList: tagsArray,
//       };
//
//       const token = localStorage.getItem('jwtToken');
//       await dispatch(addArticle(articleData, token));
//     } catch (error) {
//       console.log('Ошибка добавления статьи');
//     }
//   };
//
//   const handleClickAddTag = () => {
//     setTagList([...tagList, tagValue]);
//     setTagValue('');
//   };
//
//   const handleClickDeleteTag = (id) => {
//     setTagList(tagList.filter((_, index) => index !== id));
//   };
//
//   return (
//     <div className={classes['new-article']}>
//       <div className={classes.header}> Create new article</div>
//       <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
//         <div className={classes.name}>
//           Title
//           <input
//             className={`${classes.title} ${errors.title ? classes.inputError : ''}`}
//             type="text"
//             placeholder="Title"
//             {...register('title', {
//               required: 'Title is required',
//             })}
//           />
//           {errors.title && <span className={classes.errors}>{errors.title.message}</span>}
//         </div>
//         <div className={classes.name}>
//           Short description
//           <input
//             className={`${classes.description} ${errors.description ? classes.inputError : ''}`}
//             type="text"
//             placeholder="Description"
//             {...register('description', {
//               required: 'Short description is required',
//             })}
//           />
//           {errors.description && <span className={classes.errors}>{errors.description.message}</span>}
//         </div>
//         <div className={classes.name}>
//           Text
//           <input
//             className={`${classes.text} ${errors.body ? classes.inputError : ''}`}
//             type="text"
//             placeholder="Text"
//             {...register('body', {
//               required: 'Text is required',
//             })}
//           />
//           {errors.body && <span className={classes.errors}>{errors.body.message}</span>}
//         </div>
//         <div className={classes['mini-container']}>
//           <div className={classes.tags}>
//             Tags
//             <input className={classes.tag} placeholder="Tag" type="text" {...register('tags')} />
//           </div>
//
//           {tagList &&
//             tagList.map((item, id) => (
//               <button type="submit" className={classes.delete} onClick={() => handleClickDeleteTag(id)}>
//                 Delete
//               </button>
//             ))}
//
//           <button type="button" className={classes['add-tag']} onClick={handleClickAddTag}>
//             Add tag
//           </button>
//         </div>
//
//         <button type="button" className={classes.send}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }
//
// export default NewArticle;

// import React, { useState } from 'react';
//
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
//
// import classes from './newArticle.module.scss';
// import { addArticle } from '../../redux/actions';
//
// function NewArticle({ article }) {
//   const dispatch = useDispatch();
//   const [tagList, setTagList] = useState(article?.tagList || ['']);
//
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     mode: 'onChange',
//   });
//
//   const onSubmit = async (data) => {
//     try {
//       const tagsArray = data.tags ? data.tags.split(',').map((tag) => tag.trim()) : [];
//
//       const articleData = {
//         ...data,
//         tagList: tagsArray,
//       };
//
//       const token = localStorage.getItem('jwtToken');
//       await dispatch(addArticle(articleData, token));
//     } catch (error) {
//       console.log('Ошибка добавления статьи');
//     }
//   };
//
//   const handleTagChange = (value, index) => {
//     const updatedTagList = [...tagList];
//     updatedTagList[index] = value;
//     setTagList(updatedTagList);
//   };
//
//   const handleClickAddTag = () => {
//     setTagList([...tagList, '']);
//   };
//
//   const handleClickDeleteTag = (index) => {
//     setTagList(tagList.filter((_, i) => i !== index));
//   };
//
//   return (
//     <div className={classes['new-article']}>
//       <div className={classes.header}> Create new article</div>
//       <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
//         <div className={classes.name}>
//           Title
//           <input
//             className={`${classes.title} ${errors.title ? classes.inputError : ''}`}
//             type="text"
//             placeholder="Title"
//             {...register('title', {
//               required: 'Title is required',
//             })}
//           />
//           {errors.title && <span className={classes.errors}>{errors.title.message}</span>}
//         </div>
//         <div className={classes.name}>
//           Short description
//           <input
//             className={`${classes.description} ${errors.description ? classes.inputError : ''}`}
//             type="text"
//             placeholder="Description"
//             {...register('description', {
//               required: 'Short description is required',
//             })}
//           />
//           {errors.description && <span className={classes.errors}>{errors.description.message}</span>}
//         </div>
//         <div className={classes.name}>
//           Text
//           <input
//             className={`${classes.text} ${errors.body ? classes.inputError : ''}`}
//             type="text"
//             placeholder="Text"
//             {...register('body', {
//               required: 'Text is required',
//             })}
//           />
//           {errors.body && <span className={classes.errors}>{errors.body.message}</span>}
//         </div>
//         <div className={classes.tags}>Tags</div>
//
//         {/* <div className={classes['mini-container']}> */}
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
//         {/* </div> */}
//
//         <button type="submit" className={classes.send}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }
//
// export default NewArticle;

import React, { useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import classes from './newArticle.module.scss';
import { addArticle } from '../../redux/actions';

function NewArticle({ article }) {
  const dispatch = useDispatch();
  const [tagList, setTagList] = useState(article?.tagList || ['']);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      const articleData = {
        ...data,
        tagList: tagList.filter((tag) => tag.trim() !== ''),
      };

      const token = localStorage.getItem('jwtToken');
      await dispatch(addArticle(articleData, token));
    } catch (error) {
      console.log('Ошибка добавления статьи');
    }
  };

  const handleTagChange = (value, index) => {
    const updatedTagList = [...tagList];
    updatedTagList[index] = value;
    setTagList(updatedTagList);
  };

  const handleClickAddTag = () => {
    setTagList([...tagList, '']);
  };

  const handleClickDeleteTag = (index) => {
    setTagList(tagList.filter((_, i) => i !== index));
  };

  return (
    <div className={classes['new-article']}>
      <div className={classes.header}>Create new article</div>
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

export default NewArticle;

// import React, {useState} from 'react';
//
// // eslint-disable-next-line import/no-extraneous-dependencies
// import {useForm} from 'react-hook-form';
// import {useDispatch} from 'react-redux';
//
// import classes from './newArticle.module.scss';
// import {addArticle} from '../../redux/actions';
//
// function NewArticle({article}) {

//   const dispatch = useDispatch();
//   const [tagList, setTagList] = useState(article?.tagList || []);
//   const [tagValue, setTagValue] = useState('');
//
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     mode: 'onChange',
//   });
//
//   const onSubmit = async (data) => {
//     try {
//       const tagsArray = data.tags ? data.tags.split(',').map((tag) => tag.trim()) : [];
//
//       const articleData = {
//         ...data,
//         tagList: tagsArray,
//       };
//
//       const token = localStorage.getItem('jwtToken');
//       await dispatch(addArticle(articleData, token));
//     } catch (error) {
//       console.log('Ошибка добавления статьи');
//     }
//   };
//
//   const handleClickAddTag = () => {
//     setTagList([...tagList, tagValue]);
//     setTagValue('');
//   };
//
//   const handleClickDeleteTag = (id) => {
//     setTagList(tagList.filter((_, index) => index !== id));
//   };
//
//   return (
//     <div className={classes['new-article']}>
//       <div className={classes.header}> Create new article</div>
//       <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
//         <div className={classes.name}>
//           Title
//           <input
//             className={`${classes.title} ${errors.title ? classes.inputError : ''}`}
//             type="text"
//             placeholder="Title"
//             {...register('title', {
//               required: 'Title is required',
//             })}
//           />
//           {errors.title && <span className={classes.errors}>{errors.title.message}</span>}
//         </div>
//         <div className={classes.name}>
//           Short description
//           <input
//             className={`${classes.description} ${errors.description ? classes.inputError : ''}`}
//             type="text"
//             placeholder="Description"
//             {...register('description', {
//               required: 'Short description is required',
//             })}
//           />
//           {errors.description && <span className={classes.errors}>{errors.description.message}</span>}
//         </div>
//         <div className={classes.name}>
//           Text
//           <input
//             className={`${classes.text} ${errors.body ? classes.inputError : ''}`}
//             type="text"
//             placeholder="Text"
//             {...register('body', {
//               required: 'Text is required',
//             })}
//           />
//           {errors.body && <span className={classes.errors}>{errors.body.message}</span>}
//         </div>
//         <div className={classes['mini-container']}>
//           <div className={classes.tags}>
//             Tags
//             {tagList &&
//               tagList.map((tag, index) => (
//                 // <div key={index} className={classes.tagItem}>
//                 //   <input className={classes.tag} placeholder="Tag" value={tag} readOnly />
//                 // </div>
//                 <input
//                   className={classes.tag}
//                   value={tagValue}
//                   placeholder="Tag"
//                   onChange={(e) => setTagValue(e.target.value)}
//                 />
//               ))}
//             <button type="button" className={classes.delete} onClick={() => handleClickDeleteTag(index)}>
//               Delete
//             </button>
//             {/* // </div> */}
//             {/* ))} */}
//           </div>
//
//           {/* <input */}
//           {/*   className={classes.tag} */}
//           {/*   value={tagValue} */}
//           {/*   placeholder="Tag" */}
//           {/*   onChange={(e) => setTagValue(e.target.value)} */}
//           {/* /> */}
//           <button type="button" className={classes['add-tag']} onClick={handleClickAddTag}>
//             Add tag
//           </button>
//         </div>
//
//         <button type="button" className={classes.send}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }
//
// export default NewArticle;

// import React, { useState } from 'react';
//
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
//
// import classes from './newArticle.module.scss';
// import { addArticle } from '../../redux/actions';
//
// function NewArticle({ article }) {
//   const dispatch = useDispatch();
//   const [tagList, setTagList] = useState(article?.tagList || []);
//   const [tagValue, setTagValue] = useState('');
//
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     mode: 'onChange',
//   });
//
//   const onSubmit = async (data) => {
//     try {
//       const tagsArray = data.tags ? data.tags.split(',').map((tag) => tag.trim()) : [];
//
//       const articleData = {
//         ...data,
//         tagList: tagsArray,
//       };
//
//       const token = localStorage.getItem('jwtToken');
//       await dispatch(addArticle(articleData, token));
//     } catch (error) {
//       console.log('Ошибка добавления статьи');
//     }
//   };
//
//   const handleClickAddTag = () => {
//     if (tagValue.trim() !== '') {
//       setTagList([...tagList, tagValue.trim()]);
//       setTagValue('');
//     }
//   };
//
//   const handleClickDeleteTag = (id) => {
//     setTagList(tagList.filter((_, index) => index !== id));
//   };
//
//   return (
//     <div className={classes['new-article']}>
//       <div className={classes.header}> Create new article</div>
//       <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
//         <div className={classes.name}>
//           Title
//           <input
//             className={`${classes.title} ${errors.title ? classes.inputError : ''}`}
//             type="text"
//             placeholder="Title"
//             {...register('title', {
//               required: 'Title is required',
//             })}
//           />
//           {errors.title && <span className={classes.errors}>{errors.title.message}</span>}
//         </div>
//         <div className={classes.name}>
//           Short description
//           <input
//             className={`${classes.description} ${errors.description ? classes.inputError : ''}`}
//             type="text"
//             placeholder="Description"
//             {...register('description', {
//               required: 'Short description is required',
//             })}
//           />
//           {errors.description && <span className={classes.errors}>{errors.description.message}</span>}
//         </div>
//         <div className={classes.name}>
//           Text
//           <input
//             className={`${classes.text} ${errors.body ? classes.inputError : ''}`}
//             type="text"
//             placeholder="Text"
//             {...register('body', {
//               required: 'Text is required',
//             })}
//           />
//           {errors.body && <span className={classes.errors}>{errors.body.message}</span>}
//         </div>
//         <div className={classes['mini-container']}>
//           <div className={classes.tags}>
//             Tags
//             {tagList &&
//               tagList.map((tag, index) => (
//                 <div key={index} className={classes.tagItem}>
//                   <input className={classes.tag} placeholder="Tag" value={tag} readOnly />
//
//                   <button type="button" className={classes.delete} onClick={() => handleClickDeleteTag(index)}>
//                     Delete
//                   </button>
//                 </div>
//               ))}
//             {/* <div className={classes.addTag}> */}
//             <input
//               className={classes.tag}
//               value={tagValue}
//               placeholder="Tag"
//               onChange={(e) => setTagValue(e.target.value)}
//             />
//             <button type="button" className={classes['add-tag']} onClick={handleClickAddTag}>
//               Add tag
//             </button>
//             {/* </div> */}
//           </div>
//         </div>
//
//         <button type="button" className={classes.send}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }
//
// export default NewArticle;
