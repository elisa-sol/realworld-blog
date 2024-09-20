// const initialState = {
//   articles: [],
//   currentPage: 1,
//   totalPages: 0,
//   isLoading: false,
//   article: {
//     slug: '',
//     title: '',
//     favoritesCount: 0,
//     createdAt: '',
//     description: '',
//     tagList: [],
//     author: {},
//     body: '',
//     tags: [],
//   },
//   username: '',
//   email: '',
//   password: '',
//   repeatPassword: '',
//   agreement: false,
//   user: null,
//   token: null,
//   error: null,
// };
//
// // eslint-disable-next-line default-param-last
// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ARTICLES_REQUEST':
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case 'ARTICLES_LIST_SUCCESS':
//       return {
//         ...state,
//         articles: action.payload.articles,
//         totalPages: action.payload.totalPages,
//         currentPage: action.payload.currentPage,
//         isLoading: false,
//       };
//     case 'ARTICLE_EXPAND_SUCCESS':
//       return {
//         ...state,
//         article: action.payload,
//         isLoading: false,
//       };
//     case 'USER_SIGNUP_SUCCESS':
//     case 'USER_SIGNIN_SUCCESS':
//     case 'USER_EDITING_SUCCESS':
//       return {
//         ...state,
//         user: action.payload.user,
//         token: action.payload.token || state.token,
//         error: null,
//       };
//     case 'USER_SIGNIN_FAILURE':
//     case 'USER_UPDATING_FAILURE':
//       return {
//         ...state,
//         user: null,
//         token: null,
//         error: action.payload.message || action.payload.error,
//       };
//     case 'ADDING_ARTICLE_SUCCESS':
//     case 'EDIT_ARTICLE_SUCCESS':
//       return {
//         ...state,
//         tags: action.payload.tags,
//       };
//     case 'EDIT_ARTICLE_FAILURE':
//     case 'LIKE_ARTICLE_FAILURE':
//     case 'DELETE_ARTICLE_FAILURE':
//       return {
//         ...state,
//         error: action.payload.message || action.payload.error,
//       };
//     case 'DELETE_ARTICLE_SUCCESS':
//       return {
//         ...state,
//         articles: state.articles.filter((article) => article.slug !== action.payload),
//       };
//     case 'LIKE_ARTICLE_SUCCESS':
//       return {
//         ...state,
//         articles: state.articles.map((article) =>
//           article.slug === action.payload.slug ? { ...article, favoritesCount: action.payload.favoritesCount } : article
//         ),
//       };
//     default:
//       return state;
//   }
// };
//
// export default rootReducer;
//
