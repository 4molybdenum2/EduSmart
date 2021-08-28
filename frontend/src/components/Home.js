import React from "react";
import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Copyright, rootStyle } from "../Commons";

const useStyles = makeStyles((theme) => ({
  authBtn: { marginTop: theme.spacing(4) },
  main: { marginTop: theme.spacing(10), marginBottom: theme.spacing(8) },
  root: rootStyle,
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    marginTop: "auto",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <main className={classes.main}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom>
              EduSmart
            </Typography>

            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph>
              A complete platform for having online classes with support for
              taking tests, online classes using video calling and creating
              assignments.
            </Typography>

            <div className={classes.authBtn}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    href="/signup"
                    disableElevation>
                    Sign-up
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    href="/signin"
                    disableElevation>
                    Sign-in
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </main>

        <footer className={classes.footer}>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p">
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </footer>
      </div>
    </>
  );
}
