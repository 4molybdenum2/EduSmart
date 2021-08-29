import { Link, Typography, Snackbar, Slide } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

export const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Copyright © "}
    <Link
      color="inherit"
      href="https://github.com/4molybdenum2/EduSmart"
      underline="none">
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

export const Toast = ({ open, onClose, type, text }) => (
  <Snackbar
    open={open}
    autoHideDuration={5000}
    onClose={onClose}
    TransitionComponent={(props) => <Slide {...props} direction="up" />}>
    <MuiAlert elevation={6} variant="filled" severity={type} onClose={onClose}>
      {text}
    </MuiAlert>
  </Snackbar>
);
