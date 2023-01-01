import { Divider, styled } from "@mui/material";
import React from "react";

import BloggerDetail from "./BloggerDetail";
import Comments from "./Comments";
import Content from "./Content";

const StyledDiv = styled("div")(({ theme }) => ({
  "& h4": {
    fontWeight: 600,
    margin: theme.spacing(2, 0, 3, 0),
  },
  "& p": {
    marginBlock: theme.spacing(2),
    fontSize: theme.spacing(2),
    // lineHeight: "1.6",
    color: "#434343",
  },
}));

const BlogContent = () => {
  return (
    <StyledDiv>
      <BloggerDetail />
      <Content />
      <Divider sx={{ marginTop: 2 }} />
      <Comments />
    </StyledDiv>
  );
};

export default BlogContent;
