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
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { rootStyle, Copyright } from "../Commons";
import { auth } from "../helper/auth";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: { margin: theme.spacing(3, 0, 2) },
  root: rootStyle,
  divider: { marginTop: theme.spacing(1), width: "100%" },
}));

export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = values;

  const [status, setStatus] = useState({ error: "", success: false });
  const { error, success } = status;

  const onSubmit = (event) => {
    event.preventDefault();
    auth(values, "signup").then((data) => {
      if (data.error) setStatus({ error: data.error.trim(), success: false });
      else {
        // TODO: Token Handling and Redirect to Dashboard
        setStatus({ error: "", success: true });
      }
    });
  };

  const handleChange = (name) => (event) =>
    setValues({ ...values, [name]: event.target.value });

  const responseGoogle = (response) => {
    // TODO: Google Sign up Handling
    console.log(response);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={handleChange("name")}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
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
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2" underline="none">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
        <Divider className={classes.divider} />
        {/* TODO: Align Left */}
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
