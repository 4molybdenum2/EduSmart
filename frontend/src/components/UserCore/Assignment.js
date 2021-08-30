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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const posts = [
  {
    title: "Some title",
    description: "Some description",
  },
  {
    title: "Some title",
    description: "Some description",
  },
  {
    title: "Some title",
    description: "Some description",
  },
];

export default function Assignment() {
  const classes = useStyles();
  const [assignments, setAssignments] = useState([]);

  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");

  useEffect(() => {
    getAssignments(id).then((data) => {
      if (data.error) console.log(data.error.trim());
      else {
        setAssignments(data);
      }
    });
  }, [assignments, id]);

  return (
    <Container>
      <h1>Assignments: </h1>
      <Grid item xs={12} md={8}>
        {assignments.map((assignment) => (
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {assignment.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {assignment.description}
                </Typography>
                <Typography variant="body3" color="textSecondary" component="p">
                  {assignment.dueDate}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Submit
              </Button>
              <Button size="small" color="primary">
                Info
              </Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

// /assignment/:courseId

Assignment.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
