import { styled, Typography } from "@mui/material";
import React from "react";
import blogImg from "../../../../assets/images/blog.jpg";

const ImgDiv = styled("div")(({ bg, theme }) => ({
  width: "100%",
  height: 350,
  backgroundImage: `url(${bg})`,
  borderRadius: theme.spacing(1),
  border: "1px solid #dbdbdb",
}));

const Content = () => {
  return (
    <React.Fragment>
      <Typography variant="h4" className={"title"}>
        I created the exact same app in React and Vue. Here are the differences.
      </Typography>
      <ImgDiv bg={blogImg}></ImgDiv>
      <Typography variant="body1">
        Having used Vue at work, I had a fairly solid understanding of it. I
        was, however, curious to know what the grass was like on the other side
        of the fence — the grass in this scenario being React.
      </Typography>
      <Typography variant="body1">
        I’d read the React docs and watched a few tutorial videos and, while
        they were great and all, what I really wanted to know was how different
        React was from Vue. By “different”, I didn’t mean things such as whether
        they both had virtual DOMS or how they went about rendering pages. I
        wanted someone to take the time to explain the code! I wanted to find an
        article that took the time to explain this so that someone new to either
        Vue or React (or Web Development as a whole) could gain a better
        understanding of the differences between the two.
      </Typography>
      <Typography variant="body1">
        Unfortunately, I couldn’t find anything that tackled this. So I came to
        the realisation that I would have to go ahead and build this myself in
        order to see the similarities and differences. In doing so, I thought
        I’d document the whole process so that an article on this will finally
        exist.
      </Typography>
    </React.Fragment>
  );
};

export default Content;
