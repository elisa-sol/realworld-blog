const initialState = {
  articles: [],
  article: null,
  currentPage: 1,
  totalPages: 0,
  isLoading: false,
};

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
      };
    default:
      return state;
  }
};

export default rootReducer;
