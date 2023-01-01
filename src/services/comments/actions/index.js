import { ACTION_TYPES } from "../../../constants";

export const fetchingComments = () => ({
  type: ACTION_TYPES.FETCHING_COMMENTS,
});

export const updateComments = (payload) => ({
  type: ACTION_TYPES.UPDATE_COMMENTS_LIST,
  payload,
});
