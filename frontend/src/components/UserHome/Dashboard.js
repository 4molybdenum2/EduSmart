import {
  CssBaseline,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Fab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCourses, isAuthenticated } from "../../helper/API";

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

const Dashboard = () => {
  const { id } = isAuthenticated();
  const classes = useStyles();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses(id).then((data) => {
      if (data.error) console.log(data.error.trim());
    });
  }, [courses]);

  return (
    <>
      <CssBaseline />
      <main className={classes.main}>
        {courses.length > 0 && (
          <Container maxWidth="md" className={classes.grid}>
            <Grid container spacing={4}>
              {courses.map((course, id) => (
                <Grid item key={id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    {/* TODO: Course-code or initials in Card Media */}
                    <CardContent className={classes.cardContent}>
                      <Link
                        to="/assignment"
                        style={{ textDecoration: "none", color: "#000" }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {course.name}
                        </Typography>
                      </Link>
                      <Typography color="textSecondary">
                        {course.professor}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}

        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "absolute", bottom: "10%", right: "5%" }}>
          <Add />
        </Fab>
      </main>
    </>
  );
};

export default Dashboard;
