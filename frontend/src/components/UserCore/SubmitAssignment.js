import React, { useState } from "react";
import { Box, Container, Button } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useLocation } from "react-router-dom";
import { Copyright } from "../../Commons";
import { viewSubmissions, fileUploadAPI } from "../../helper/API";
import UserHome from "../UserHome";
import { useStyles } from "../SignUp";
import Toast from "../utils/Toast";
const validUrl = require("valid-url");

const SubmitAssignment = () => {
  const classes = useStyles();
  const {
    state: { assignmentID },
  } = useLocation();
  const [link, setLink] = useState("");
  const [status, setStatus] = useState({ error: "", success: false });
  const { error, success } = status;

  const onSubmit = () => {
    //   TODO: Send Request
    console.log(validUrl.isWebUri(link), assignmentID);
  };

  // TODO: Will be done using file if time
  const handleFile = (event) => {
    const file = event.target.files[0]
    fileUploadAPI(file, assignmentID).then( data => {
      console.log(data);
    })
    .catch( err => {
      console.log(err);
    })
  }

  return (
    <UserHome>
      <Container component="main" maxWidth="xs" className={classes.root}>
        {/* <ValidatorForm className={classes.form} onSubmit={onSubmit}>
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            label="Assignment Link"
            autoFocus
            value={link}
            onChange={(e) => setLink(e.target.value)}
            validators={["required"]}
            errorMessages={["All fields are mandatory"]}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Submit
          </Button>
        </ValidatorForm> */}
        <Button
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            onChange={handleFile}
            hidden
          />
        </Button>
        <Toast open={error} text={error} setStatus={setStatus} />
        <Toast
          error={false}
          open={success}
          text={success}
          setStatus={setStatus}
          dashboard={true}
        />

        <Box mt="auto" py={3}>
          <Copyright />
        </Box>
      </Container>
    </UserHome>
  );
};

export default SubmitAssignment;
