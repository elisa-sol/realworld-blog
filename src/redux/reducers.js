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
    case 'UPDATE_FORM_FIELD':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case 'SUBMIT_FORM':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default rootReducer;
