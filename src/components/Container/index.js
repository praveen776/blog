import { Container, styled } from "@mui/material";
import PropTypes from "prop-types";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginBlock: theme.spacing(2),
}));

const CustomContainer = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default CustomContainer;

CustomContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
