import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchingComments,
  updateComments,
} from "../../../../services/comments/actions";
import { getComments } from "../../../../services/comments/api";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

const Comments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchingComments());
    getComments()
      .then((res) => {
        dispatch(updateComments(res?.data?.data || []));
      })
      .catch((err) => {
        dispatch(updateComments([]));
      });
  }, [dispatch]);

  return (
    <>
      <CommentForm comment={() => {}} isReply={false} onClose={null} />
      <CommentFeed />
    </>
  );
};

export default Comments;
