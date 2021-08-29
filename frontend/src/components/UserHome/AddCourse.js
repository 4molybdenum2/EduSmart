import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Box, Checkbox } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import copyText from "copy-text-to-clipboard";
import { useStyles } from "../SignUp";
import { Copyright, Toast } from "../../Commons";
import { createCourse } from "../../helper/API";
import UserHome from "../UserHome";

import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/en-in";
moment.updateLocale("en-in", { week: { dow: 1 } });

const AddCourse = () => {
  const classes = useStyles();
  const history = useHistory();
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

  const [days, setDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
  });

  const handleDateChange = (name) => (event) =>
    setSchedule({ ...schedule, [name]: event.toISOString() });

  const onSubmit = () => {
    const timeSchedule = {};
    Object.keys(days).map((day) => {
      if (days[day]) {
        const dt = moment(schedule[day]);
        let rem = dt.minute() % 15;
        rem > 7 ? dt.add(15 - rem, "minutes") : dt.subtract(rem, "minutes");
        timeSchedule[day] = dt.format("hh:mm A");
      } else timeSchedule[day] = "";
    });

    createCourse({ name, schedule: timeSchedule }).then((data) => {
      if (data.error) setStatus({ error: data.error.trim(), success: false });
      else setStatus({ error: "", success: data.courseID });
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
                  key={i}
                  m={1}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <Checkbox
                    checked={days[day]}
                    onChange={() => setDays({ ...days, [day]: !days[day] })}
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

        {success && (
          <Toast
            type="success"
            text="Click on the Close Icon to copy the Course ID and go back to the Dashboard"
            open={success}
            duration={null}
            onClose={() => {
              copyText(success);
              setStatus({ error: "", success: false });
              history.push("/dashboard");
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

export default AddCourse;
