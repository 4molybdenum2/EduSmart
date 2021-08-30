import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";
import { getAssignments, isAuthenticated } from "../../helper/API";
import UserHome from "../UserHome";

const useStyles = makeStyles((theme) => ({
  grid: { padding: theme.spacing(5, 6) },
}));
export default function Assignment() {
  const classes = useStyles();
  const { isStudent } = isAuthenticated();
  const {
    state: { courseID, name, professor },
  } = useLocation();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    getAssignments(courseID).then((data) => {
      if (data.error) console.log(data.error.trim());
      else {
        console.log(data);
        let asgs = data[0] ? data[0].assignments : [];
        setAssignments(asgs);
      }
    });
  }, []);

  return (
    <UserHome>
      <Container maxWidth="lg" className={classes.grid}>
        <h1>Assignments for {name} </h1>
        <Grid container spacing={4}>
          {assignments.map((assignment) => (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {assignment.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p">
                    {assignment.description}
                  </Typography>
                  <Typography
                    variant="body3"
                    color="textSecondary"
                    component="p">
                    {assignment.dueDate}
                  </Typography>
                </CardContent>
                {isStudent && (
                  <CardActions>
                    <Button size="small" color="primary">
                      Submit
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </UserHome>
  );
}

Assignment.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
