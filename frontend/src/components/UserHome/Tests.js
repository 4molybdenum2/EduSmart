import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import UserHome from "../UserHome";

const useStyles = makeStyles((theme) => ({
  main: { marginTop: theme.spacing(10), marginBottom: theme.spacing(8) },
  grid: { padding: theme.spacing(0, 8) },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
  cardContent: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
}));

const Tests = () => {
  const classes = useStyles();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Get Tests using API
  }, [tests.name]);

  return (
    <UserHome>
      <main className={classes.main}>
        {tests.length > 0 && (
          <Container maxWidth="md" className={classes.grid}>
            <Grid container spacing={4}>
              {tests.map((course, id) => (
                <Grid item key={id} xs={12} sm={6} md={4}>
                  <Card
                    className={classes.card}
                    onClick={() => console.log("test")}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {test.name}
                      </Typography>
                      <Typography variant="h5" color="textSecondary">
                        {test.professor}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </main>
    </UserHome>
  );
};

export default Tests;
