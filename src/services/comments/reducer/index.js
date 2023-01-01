const { ACTION_TYPES } = require("../../../constants");

const initialState = {
  isLoading: false,
  comments: [],
};

const comments = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCHING_COMMENTS: {
      return {
        isLoading: true,
        comments: [],
      };
    }
    case ACTION_TYPES.UPDATE_COMMENTS_LIST: {
      return {
        isLoading: false,
        comments: action.payload,
      };
    }
    default:
      return state;
  }
};

export default comments;
