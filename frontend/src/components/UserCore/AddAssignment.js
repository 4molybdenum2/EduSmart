import React, { useState } from "react";
import { Container, Button, Box } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useLocation } from "react-router-dom";
import { useStyles } from "../SignUp";
import { Copyright } from "../../Commons";
import { createAssignment } from "../../helper/API";
import UserHome from "../UserHome";
import Toast from "../utils/Toast";

import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/en-in";
moment.updateLocale("en-in", { week: { dow: 1 } });

const AddAssignment = () => {
  const classes = useStyles();
  const {
    state: { courseID },
  } = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(moment().toISOString());
  const [status, setStatus] = useState({ error: "", success: false });
  const { error, success } = status;

  const onSubmit = () => {
    console.log({ courseID, title, description, dueDate });
  };

  return (
    <UserHome>
      <Container component="main" maxWidth="xs" className={classes.root}>
        <div className={classes.paper}>
          <ValidatorForm className={classes.form} onSubmit={onSubmit}>
            <TextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              label="Assignment Title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              validators={["required"]}
              errorMessages={["All fields are mandatory"]}
            />

            <TextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              validators={["required"]}
              errorMessages={["All fields are mandatory"]}
            />

            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                value={dueDate}
                onChange={(e) => setDueDate(e.toISOString())}
              />
            </MuiPickersUtilsProvider>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ marginTop: "30px" }}>
              Create Assignment
            </Button>
          </ValidatorForm>
        </div>

        <Toast open={error} text={error} setStatus={setStatus} />
        {/* TODO: Success Toast */}

        <Box mt="auto" py={3}>
          <Copyright />
        </Box>
      </Container>
    </UserHome>
  );
};
