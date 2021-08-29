import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Fab,
  Link,
  CardActions,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import copyText from "copy-text-to-clipboard";
import { getCourses, isAuthenticated } from "../../helper/API";
import UserHome from "../UserHome";
import LetterAvatar from "../utils/LetterAvatar";

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
  media: {
    height: 150,
    width: "100%",
    fontSize: "2.5rem",
    letterSpacing: "0.1rem",
  },
  cardActions: { justifyContent: "flex-end", paddingTop: 0, paddingRight: 10 },
}));

const Dashboard = () => {
  const { id, isStudent } = isAuthenticated();
  const classes = useStyles();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses(id).then((data) => {
      if (data.error) console.log(data.error.trim());
      else setCourses(data.courses);
    });
  }, []);

  return (
    <UserHome>
      <main className={classes.main}>
        {courses.length > 0 && (
          <Container maxWidth="md" className={classes.grid}>
            <Grid container spacing={4}>
              {courses.map((course, id) => (
                <Grid item key={id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <Link
                      href={`/assignment?id=${id}`}
                      underline="none"
                      color="inherit">
                      <LetterAvatar text={course.name} css={classes.media} />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {course.name}
                        </Typography>
                        <Typography color="textSecondary">
                          {course.professor.name}
                        </Typography>
                      </CardContent>
                    </Link>
                    <CardActions classes={{ root: classes.cardActions }}>
                      <Button
                        size="small"
                        disableElevation
                        onClick={() => copyText(course._id)}>
                        Copy ID
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}

        <Link href={isStudent ? "/scourses/add" : "/courses/add"}>
          <Fab
            color="primary"
            aria-label="add"
            style={{ position: "absolute", bottom: "10%", right: "5%" }}>
            <Add />
          </Fab>
        </Link>
      </main>
    </UserHome>
  );
};

export default Dashboard;
