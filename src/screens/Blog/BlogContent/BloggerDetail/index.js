import { Avatar, Button, Card, CardHeader } from "@mui/material";
import React from "react";

const BloggerDetail = () => {
  return (
    <React.Fragment>
      <Card elevation={0}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#ccc" }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <Button variant="contained" disableElevation size="small">
              Follow
            </Button>
          }
          title="Shrimp and Chorizo Paella"
          subheader={`September 14, 2016`}
        />
      </Card>
    </React.Fragment>
  );
};

export default BloggerDetail;
