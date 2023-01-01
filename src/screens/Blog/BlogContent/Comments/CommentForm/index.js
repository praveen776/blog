import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Icon,
  IconButton,
  styled,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { postComments, postReply } from "../../../../../services/comments/api";
import { updateComments } from "../../../../../services/comments/actions";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";

const StyledForm = styled("form")(({ theme }) => ({
  "& h5": {
    fontSize: theme.spacing(2.1),
    fontWeight: 600,
    marginTop: theme.spacing(2),
  },
  "& .MuiFormHelperText-root": {
    fontSize: 12,
    marginBlock: theme.spacing(1),
  },
}));

const CommentForm = ({ isReply, onClose, comment }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state?.comments?.comments);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { open, message, severity } = snackbar;
  console.log("commentcomment", comment);

  const handleClose = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  const commentApi = (body) => {
    postComments(body)
      .then((res) => {
        formik?.resetForm();
        dispatch(updateComments([{ ...res?.data?.data }, ...comments]));
        setSnackbar((prevState) => ({
          ...prevState,
          open: true,
          message: res?.data?.message || "Created successfully!",
          severity: "success",
        }));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setSnackbar((prevState) => ({
          ...prevState,
          open: true,
          message:
            err?.response?.data?.message ||
            "Something went wrong. Please try again",
          severity: "error",
        }));
      });
  };

  const replyApi = (id, body) => {
    postReply(id, body)
      .then((res) => {
        formik?.resetForm();
        let data = [...comments];
        let currentIndex = _.findIndex(data, { _id: id });
        data[currentIndex] = {
          ...data[currentIndex],
          replies: [...data[currentIndex]?.replies, { ...res?.data?.data }],
        };
        dispatch(updateComments(data));
        setSnackbar((prevState) => ({
          ...prevState,
          open: true,
          message: res?.data?.message || "Created successfully!",
          severity: "success",
        }));
        setLoading(false);
        onClose();
      })
      .catch((err) => {
        setLoading(false);
        setSnackbar((prevState) => ({
          ...prevState,
          open: true,
          message:
            err?.response?.data?.message ||
            "Something went wrong. Please try again",
          severity: "error",
        }));
      });
  };

  const onSubmit = (e) => {
    setLoading(true);
    const body = {
      name: e.name,
      email: e?.email,
      comment: e?.comment,
      replies: [],
    };
    if (!_.isEmpty(comment)) {
      replyApi(comment?._id, body);
    } else {
      commentApi(body);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comment: "",
      comment_id: null,
    },
    validationSchema: yup.object({
      name: yup.string().required("Please enter name."),
      email: yup.string().email().required("Please enter email."),
      comment: yup.string().required("Please enter comment."),
    }),
    onSubmit: onSubmit,
  });

  return (
    <>
      <StyledForm onSubmit={formik?.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">
            {isReply ? "Reply" : "Post"} Your Comments
          </Typography>
          {onClose && (
            <IconButton onClick={() => onClose()}>
              <Icon>close</Icon>
            </IconButton>
          )}
        </Box>
        <Grid container spacing={2} sx={{ my: 1 }}>
          <Grid item lg={6} sm={6} xs={12}>
            <TextField
              id="name"
              name="name"
              value={formik?.values?.name}
              onChange={formik?.handleChange}
              label="Name"
              onBlur={formik?.handleBlur}
              error={
                formik?.errors?.name &&
                formik?.touched?.name &&
                formik?.errors?.name
              }
              helperText={
                formik?.errors?.name &&
                formik?.touched?.name &&
                formik?.errors?.name
              }
              variant="outlined"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <TextField
              id="email"
              name="email"
              value={formik?.values?.email}
              onChange={formik?.handleChange}
              label="Email"
              onBlur={formik?.handleBlur}
              error={
                formik?.errors?.email &&
                formik?.touched?.email &&
                formik?.errors?.email
              }
              helperText={
                formik?.errors?.email &&
                formik?.touched?.email &&
                formik?.errors?.email
              }
              variant="outlined"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <TextField
              id="comment"
              name="comment"
              value={formik?.values?.comment}
              onChange={formik?.handleChange}
              label="comment"
              onBlur={formik?.handleBlur}
              multiline
              maxRows={6}
              minRows={4}
              error={
                formik?.errors?.comment &&
                formik?.touched?.comment &&
                formik?.errors?.comment
              }
              helperText={
                formik?.errors?.comment &&
                formik?.touched?.comment &&
                formik?.errors?.comment
              }
              variant="outlined"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <Button
              disabled={loading}
              variant="contained"
              type={"submit"}
              disableElevation
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </StyledForm>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CommentForm;

CommentForm.propTypes = {
  isReply: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  comment: PropTypes.object,
};
