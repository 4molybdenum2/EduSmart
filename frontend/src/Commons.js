import {
  Link,
  Typography,
  Snackbar,
  Slide,
  Container,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

export const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Copyright © "}
    <Link
      color="inherit"
      href="https://github.com/4molybdenum2/EduSmart"
      underline="always">
      EduSmart
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

export const rootStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

export const Toast = ({ open, onClose, type, text, duration = 5000 }) => (
  <Snackbar
    open={open}
    autoHideDuration={duration}
    onClose={onClose}
    TransitionComponent={(props) => <Slide {...props} direction="up" />}>
    <MuiAlert elevation={6} variant="filled" severity={type} onClose={onClose}>
      {text}
    </MuiAlert>
  </Snackbar>
);

export const NotFound = () => {
  return (
    <Container
      maxWidth="sm"
      style={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Typography variant="h2">404! Page not Found</Typography>
    </Container>
  );
};
