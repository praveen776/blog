import {
  Avatar,
  Button,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import _ from "lodash";
import ReplyForm from "../ReplyForm";
import { useSelector } from "react-redux";
import moment from "moment";

const StyledDiv = styled("div")(({ theme }) => ({
  "& h5": {
    fontSize: theme.spacing(2.1),
    fontWeight: 600,
    marginTop: theme.spacing(2),
  },
  "& .listContainer": {
    width: "100%",
    padding: 0,
    "& .MuiDivider-root": {
      backgroundColor: "rgb(0 0 0 / 8%)",
      marginLeft: 0,
    },
    "& .createdDate": {
      fontSize: 12,
      marginBlock: 0,
    },
    "& .MuiTypography-body2": {
      marginBlock: 0,
    },
    "& .mainComment": {
      paddingLeft: 0,
    },
  },
}));

const CommentFeed = () => {
  const [openReply, setOpenReply] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const state = useSelector((state) => state?.comments);
  const [currentData, setCurrentData] = useState(null);
  const { isLoading, comments } = state;

  const toggleReply = (idx) => {
    if (currentIdx === idx) {
      setOpenReply((prevState) => !prevState);
      setCurrentIdx(idx);
    } else {
      setCurrentIdx(idx);
      setOpenReply(true);
    }
  };

  const onClickReply = (data) => {
    setOpenDialog(true);
    setCurrentData(data);
  };

  return (
    <StyledDiv>
      <ReplyForm
        open={openDialog}
        comment={currentData}
        handleClose={() => setOpenDialog(false)}
      />
      <Typography variant="h5">Comments</Typography>
      {!_.isEmpty(comments) ? (
        <List className={"listContainer"}>
          {_.map(comments, (comment, idx) => (
            <React.Fragment key={idx}>
              <ListItem alignItems="flex-start" className="mainComment">
                <ListItemAvatar>
                  <Avatar alt={comment?.name} src={""} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment?.name}
                  title={comment?.email}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="p"
                        variant="body2"
                        className={"createdDate"}
                      >
                        {moment(comment?.created).format("MMMM DD, YYYY")}
                        <Button onClick={() => toggleReply(idx)}>
                          {comment?.replies?.length} Replies
                        </Button>
                        <Button onClick={() => onClickReply(comment)}>
                          Reply
                        </Button>
                      </Typography>
                      <Typography
                        title={"September 14, 2016"}
                        component="span"
                        variant="body2"
                        className={"userName"}
                        color="textPrimary"
                      >
                        {comment?.comment}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Collapse
                in={openReply && currentIdx === idx}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding sx={{ pl: 5 }}>
                  {_.map(comment?.replies, (reply, idx1) => (
                    <React.Fragment key={idx1}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={reply?.name} src={""} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={reply?.name}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="p"
                                variant="body2"
                                className={"createdDate"}
                              >
                                {moment(comment?.created).format(
                                  "MMMM DD, YYYY"
                                )}
                              </Typography>
                              <Typography
                                title={"September 14, 2016"}
                                component="span"
                                variant="body2"
                                className={"userName"}
                                color="textPrimary"
                              >
                                {comment?.comment}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      {idx1 + 1 !== comment?.replies?.length && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Collapse>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      ) : isLoading ? (
        <Typography
          variant="h6"
          sx={{ fontSize: 2, my: 2, textAlign: "center" }}
        >
          Loading please wait...
        </Typography>
      ) : (
        <Typography
          variant="h6"
          sx={{ fontSize: 2, my: 2, textAlign: "center" }}
        >
          No Comments Found
        </Typography>
      )}
    </StyledDiv>
  );
};

export default CommentFeed;
