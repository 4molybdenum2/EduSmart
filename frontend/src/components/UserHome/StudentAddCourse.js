import React, { useState } from "react";
import { Box, Container, Button } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Copyright } from "../../Commons";

import UserHome from "../UserHome";

import { useStyles } from "../SignUp";

const StudentAddCourse = ({ children }) => {
  const classes = useStyles();
  const [id, setId] = useState("");
  const [status, setStatus] = useState({ error: "", success: false });
  const { error, success } = status;


  const onSubmit = () => {
    console.log('submit');
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
          className={classes.submit}
        >
          Add Course
        </Button>
        </ValidatorForm>
        <Box mt="auto" py={3}>
          <Copyright />
        </Box>
      </Container>
    </UserHome>
  );
};

export default StudentAddCourse;
