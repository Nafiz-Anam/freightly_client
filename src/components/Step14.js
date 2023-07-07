import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
//import parse cv

import Typography from "@material-ui/core/Typography";
//import date and time picker from mui
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  MuiPickersContext,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    margin: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

function Step() {
  //make a post request to the server
  useEffect(() => {
    axios
      .post(
        "https://us-central1-freightly-admin.cloudfunctions.net/api/submit",
        {
          uuid: localStorage.getItem("uuid"),
        }
      )
      .then((res) => {
        console.log(res);
        //go to the url in response body
        //alert(res.data.url);
        window.location.href = res.data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ fontFamily: "Poppins", height: "55vh" }}>
      <h1>Redirecting to payment page...</h1>

      <CircularProgress
        style={{
          width: "100px",
          height: "100px",
          //center it all
          margin: "auto",
        }}
      />
    </div>
  );
}

export default Step;
