import * as React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  styled,
  Card,
  CardContent,
} from "@mui/material";
import _ from "lodash";

const StyledDiv = styled("div")(({ theme }) => ({
  "& .MuiListItem-root": {
    paddingLeft: 0,
  },
}));

const RecentBlogs = () => {
  return (
    <StyledDiv>
      <Typography variant="h5" sx={{ fontSize: 16, fontWeight: 600, my: 2 }}>
        Recent Posts
      </Typography>
      <Card>
        <CardContent>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {_.map(_.range(3), (i, idx) => (
              <React.Fragment key={idx}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </StyledDiv>
  );
};

export default RecentBlogs;
