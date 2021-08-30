import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Tooltip, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Add } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import { getAssignments, isAuthenticated } from "../../helper/API";
import UserHome from "../UserHome";
import Toast from "../utils/Toast";

const useStyles = makeStyles((theme) => ({
  grid: { padding: theme.spacing(5, 6) },
}));

export default function Assignment() {
  const classes = useStyles();
  const history = useHistory();
  const { isStudent } = isAuthenticated();
  const {
    state: { courseID, name },
  } = useLocation();
  const [assignments, setAssignments] = useState([]);
  const [status, setStatus] = useState({ error: "", success: false });
  const { error, success } = status;

  useEffect(() => {
    getAssignments(courseID).then((data) => {
      if (data.error) {
        setStatus({ error: data.error.trim(), success: false });
        setAssignments([]);
      } else {
        console.log(data);
        let asgs = data[0] ? data[0].assignments : [];
        setAssignments([]);
      }
    });
  }, []);

  return (
    <UserHome>
      {assignments.length > 0 && (
        <Container maxWidth="lg" className={classes.grid}>
          <h1>Assignments for {name}</h1>
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

                  <CardActions>
                    <Button size="small" color="primary">
                      {isStudent ? "Submit" : "View Submissions"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {!isStudent && (
        <Link
          onClick={() =>
            history.push("/assignments/create", { courseID: courseID })
          }>
          <Tooltip title="Add" aria-label="add">
            <Fab
              color="primary"
              aria-label="add"
              style={{ position: "fixed", bottom: "10%", right: "5%" }}>
              <Add />
            </Fab>
          </Tooltip>
        </Link>
      )}

      <Toast open={error} text={error} setStatus={setStatus} />
      {/* TODO: Assignment Submit Toast */}
    </UserHome>
  );
}

Assignment.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
