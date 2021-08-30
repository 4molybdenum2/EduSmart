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
export default function Assignment() {
  const classes = useStyles();
  const { isStudent } = isAuthenticated();
  const {
    state: { courseID },
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
    <Container>
      <h1>Assignments: </h1>

      {
        (assignments.length !== 0) ? 
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
            {isStudent && (
              <CardActions>
                <Button size="small" color="primary">
                  Submit
                </Button>
              </CardActions>
            )}
          </Card>
        ))}
      </Grid> : <p> No assignments currently !</p>
      }
      
    </Container>
  );
}

Assignment.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
