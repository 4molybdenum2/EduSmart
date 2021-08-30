import React, { useState } from "react";
import { Box, Container, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Copyright, Toast } from "../../Commons";
import { addCourseStudent } from "../../helper/API";
import UserHome from "../UserHome";
import { useStyles } from "../SignUp";

const StudentAddCourse = () => {
  const classes = useStyles();
  const history = useHistory();
  const [id, setId] = useState("");
  const [status, setStatus] = useState({ error: "", success: false });
  const { error, success } = status;

  const onSubmit = () => {
    if (id !== "") {
      addCourseStudent(id).then((data) => {
        if (data.error) setStatus({ error: data.error.trim(), success: false });
        else setStatus({ error: "", success: data.message.trim() });
      });
    }
  };

  return (
    <UserHome>
      <Container component="main" maxWidth="xs" className={classes.root}>
        <ValidatorForm className={classes.form} onSubmit={onSubmit}>
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            label="Course ID"
            autoFocus
            value={id}
            onChange={(e) => setId(e.target.value)}
            validators={["required"]}
            errorMessages={["All fields are mandatory"]}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Add Course
          </Button>
        </ValidatorForm>

        {error && (
          <Toast
            type="error"
            text={error}
            open={error}
            onClose={() => setStatus({ error: "", success: false })}
          />
        )}

        {success && (
          <Toast
            type="success"
            text={success}
            open={success}
            onClose={() => {
              setStatus({ error: "", success: false });
              history.push("/dashboard")
            }}
          />
        )}

        <Box mt="auto" py={3}>
          <Copyright />
        </Box>
      </Container>
    </UserHome>
  );
};

export default StudentAddCourse;
