import { Link, Typography } from "@material-ui/core";

export const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Copyright © "}
    <Link color="inherit" href="https://github.com/4molybdenum2/EduSmart" underline="none">
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
