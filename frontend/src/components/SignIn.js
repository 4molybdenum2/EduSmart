import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
  IconButton,
  Icon,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { rootStyle, Copyright } from "../Commons";
import { GoogleLogin, useGoogleLogin } from "react-google-login";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: { margin: theme.spacing(3, 0, 2) },
  root: rootStyle,
  divider: { marginTop: theme.spacing(1), width: "100%" },
}));

export default function SignIn() {
  const classes = useStyles();
  const [values, setValues] = useState({ email: "", password: "" });
  const { email, password } = values;

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (name) => (event) =>
    setValues({ ...values, [name]: event.target.value });

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange("email")}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange("password")}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign In
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2" underline="none">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
        <Divider className={classes.divider} />
        <GoogleLogin
          clientId="749827096167-dj5v0acsrmj35t7n0onr7qqqlhomcpph.apps.googleusercontent.com"
          render={(props) => (
            <IconButton onClick={props.onClick}>
              <Icon>
                <img src="/google.svg" width={25} />
              </Icon>
            </IconButton>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
      </div>

      <Box mt="auto" py={3}>
        <Copyright />
      </Box>
    </Container>
  );
}
