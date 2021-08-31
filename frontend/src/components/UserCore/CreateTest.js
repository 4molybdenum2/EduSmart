// TODO: Create (This component is only for Teacher)
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Container, Button, Box, Typography } from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useStyles } from "../SignUp";
import { Copyright } from "../../Commons";
import { createAssignment } from "../../helper/API";
import UserHome from "../UserHome";
import Toast from "../utils/Toast";

import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/en-in";
moment.updateLocale("en-in", { week: { dow: 1 } });

const CreateTest = () => {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(moment().toISOString());
  const [endTime, setEndTime] = useState(moment().toISOString());
  const [maxMarks, setMaxMarks] = useState("");
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState({ error: "", success: false });
  const { error, success } = status;

  const onSubmit = () => {
    console.log({ title, startTime, endTime, maxMarks, questions });
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
              label="Test Title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              validators={["required"]}
              errorMessages={["All fields are mandatory"]}
            />

            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mx={0.75}>
                <Typography>Start Time</Typography>
                <DateTimePicker
                  inputVariant="outlined"
                  disablePast
                  value={startTime}
                  onChange={(e) =>
                    e.isSameOrBefore(moment())
                      ? setStatus({
                          error: "Start Time cannot be before current Time",
                          success: false,
                        })
                      : setStartTime(e.toISOString())
                  }
                />
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mx={0.75}>
                <Typography>End Time</Typography>
                <DateTimePicker
                  inputVariant="outlined"
                  disablePast
                  value={endTime}
                  onChange={(e) =>
                    e.isSameOrBefore(moment())
                      ? setStatus({
                          error: "Submission cannot be before current Time",
                          success: false,
                        })
                      : setEndTime(e.toISOString())
                  }
                />
              </Box>
            </MuiPickersUtilsProvider>

            <TextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              label="Maximum Marks"
              value={maxMarks}
              onChange={(e) => {
                if (!isNaN(e.target.value)) setMaxMarks(e.target.value);
              }}
              validators={["required", "minNumber:0", "maxNumber:100"]}
              errorMessages={[
                "All fields are mandatory",
                "Marks must be a positive value",
                "Marks cannot be more than 100",
              ]}
            />
          </ValidatorForm>
        </div>

        <Toast
          open={error}
          text={error}
          setStatus={setStatus}
          duration={3000}
        />

        <Toast
          error={false}
          open={success}
          text={success}
          onCloseExtra={() => history.goBack()}
          setStatus={setStatus}
        />

        <Box mt="auto" py={3}>
          <Copyright />
        </Box>
      </Container>
    </UserHome>
  );
};

export default CreateTest;
