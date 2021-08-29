import React, { useState } from "react";
import { Container, Button, Box, Checkbox } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useStyles } from "../SignUp";
import { Copyright, Toast } from "../../Commons";
import { createCourse } from "../../helper/API";

import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/en-in";
import UserHome from "../UserHome";
moment.updateLocale("en-in", { week: { dow: 1 } });

const AddCourse = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [status, setStatus] = useState({ error: "", success: false });
  const { error, success } = status;

  const [schedule, setSchedule] = useState({
    monday: moment().toISOString(),
    tuesday: moment().toISOString(),
    wednesday: moment().toISOString(),
    thursday: moment().toISOString(),
    friday: moment().toISOString(),
  });

  const handleDateChange = (name) => (event) =>
    setSchedule({ ...schedule, [name]: event.toISOString() });

  const onSubmit = () => {
    createCourse({ name, schedule }).then((data) => {
      if (data.error) setStatus({ error: data.error.trim(), success: false });
      else console.log("OK");
    });
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
              label="Course Name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              validators={["required"]}
              errorMessages={["All fields are mandatory"]}
            />

            <MuiPickersUtilsProvider utils={MomentUtils}>
              {Object.keys(schedule).map((day, i) => (
                <Box
                  m={1}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <span>{day.toUpperCase()}</span>:
                  <TimePicker
                    key={i}
                    value={schedule[day]}
                    onChange={handleDateChange(day)}
                    minutesStep={15}
                  />
                </Box>
              ))}
            </MuiPickersUtilsProvider>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Add Course
            </Button>
          </ValidatorForm>
        </div>

        {error && (
          <Toast
            type="error"
            text={error}
            open={error}
            onClose={() => setStatus({ error: "", success: false })}
          />
        )}

        <Box mt="auto" py={3}>
          <Copyright />
        </Box>
      </Container>
    </UserHome>
  );
};

export default AddCourse;
