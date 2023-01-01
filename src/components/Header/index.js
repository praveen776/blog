import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  useTheme,
  Menu,
  MenuItem,
  TextField,
  Box,
  InputAdornment,
  useMediaQuery,
  Typography,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledAppbar = styled(AppBar)(({ isSmallDevice, theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.paper.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "none",
  justifyContent: "space-between",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  zIndex: 999,
  "& .MuiToolbar-root": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: 40,
    height: 40,
    justifyContent: "space-between",
  },
  "& .MuiInputBase-root": {
    "& fieldset": {
      display: isSmallDevice ? "none" : "inherit",
    },
    "& .MuiInputAdornment-root": {
      display: isSmallDevice ? "none" : "inherit",
    },
    "& input": {
      display: isSmallDevice ? "none" : "inherit",
    },
  },
}));

const StyledDiv = styled("div")(({ theme }) => ({
  // display: 'block',
  // width: '100%',
  "& img": {
    marginTop: theme.spacing(0.5),
    width: 150,
  },
  "& .MuiTypography-root": {
    fontSize: theme.spacing(3),
    fontWeight: 600,
  },
}));

export default function Header() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onClickProfile = () => {
    handleClose();
  };
  const onClickPassword = () => {
    handleClose();
  };

  const onClickLogout = () => {
    console.log("clicked");
  };

  return (
    <StyledAppbar isSmallDevice={isSmallDevice} position="sticky">
      <Container maxWidth="lg">
        <Toolbar sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <StyledDiv>
              <Typography>BLOG</Typography>
            </StyledDiv>
          </Box>
          <TextField
            placeholder="Search"
            size="small"
            sx={{ maxWidth: 400, width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon color="primary">search</Icon>
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            sx={{ color: "#000" }}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <Icon
              fontSize="large"
              sx={{ color: theme.palette.primary.main }}
              className="material-symbols-outlined"
            >
              account_circle
            </Icon>
          </IconButton>
        </Toolbar>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={onClickProfile}>Account Details</MenuItem>
          <MenuItem onClick={onClickPassword}>Change password</MenuItem>
          <MenuItem onClick={onClickLogout}>Logout</MenuItem>
        </Menu>
      </Container>
    </StyledAppbar>
  );
}
