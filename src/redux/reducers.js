const initialState = {
  articles: [],
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
  article: {
    slug: '',
    title: '',
    favoritesCount: 0,
    createdAt: '',
    description: '',
    tagList: [],
    author: {},
    body: '',
  },
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
  agreement: false,
  user: null,
  error: null,
};

// eslint-disable-next-line default-param-last
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ARTICLES_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'ARTICLES_LIST_SUCCESS':
      return {
        ...state,
        articles: action.payload.articles,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        isLoading: false,
      };
    case 'ARTICLE_EXPAND_SUCCESS':
      return {
        ...state,
        article: action.payload,
        isLoading: false,
      };
    case 'USER_SIGNUP_SUCCESS':
    case 'USER_SIGNIN_SUCCESS':
    case 'USER_EDITING_SUCCESS':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
