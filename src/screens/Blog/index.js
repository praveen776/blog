import React from "react";
import CustomContainer from "../../components/Container";
import Header from "../../components/Header";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import BlogContent from "./BlogContent";
import RecentBlogs from "./RightContent/RecentBlogs";

const Blog = () => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Header />
      <CustomContainer>
        <Grid container spacing={3}>
          <Grid item lg={8} md={8}>
            <BlogContent />
          </Grid>
          <Grid item lg={4} md={4}>
            {!isSmallDevice && <RecentBlogs />}
          </Grid>
        </Grid>
      </CustomContainer>
    </>
  );
};

export default Blog;
