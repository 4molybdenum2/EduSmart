import React, { useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { verifyEmailAPI } from "../helper/API";
import { FRONTEND_URL } from "../helper/API";

const VerifyEmail = () => {

    const search = useLocation().search;

    const verify = () => {
        const token = new URLSearchParams(search).get('t');
        verifyEmailAPI(token).then(data => {
            console.log(data);
            // window.location.href = "http://localhost:3000/dashboard";
            window.location.href = `${FRONTEND_URL}/signin`;
        }).catch(err => {
            console.log(err);
        }) 
    }

    useEffect(verify, []);

    return(
      <Container
        maxWidth="sm"
        style={{ height: "100vh", display: "flex", alignItems: "center" }}>
        <Typography variant="h2">Verifying Email...</Typography>
      </Container>
    );
}

export default VerifyEmail;