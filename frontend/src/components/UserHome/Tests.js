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
import { getTestResults } from "../../helper/API";

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

  // fetch all test results on first render
  useEffect(() => {
    // Get Tests using API
    getTestResults().then((data) => {
      if (data.error) console.log(data.error.trim());
      else {
        console.log(data);
        let tsts = data[0] ? data[0].tests : [];
        setTests(tsts);
      }
    });
  }, []);

  return (
    <UserHome>
      <main className={classes.main}>
        {tests.length > 0 && (
          <Container maxWidth="md" className={classes.grid}>
            {tests.map((course, id) => (
              <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course.docName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {course.createdAt}
                    </Typography>
                </CardContent>
              </Card>
            ))}
          </Container>
        )}
      </main>
    </UserHome>
  );
};

export default Tests;
