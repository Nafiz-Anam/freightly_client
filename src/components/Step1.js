import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
//use params
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Map from "./Map.js";

import Typography from "@material-ui/core/Typography";
import { set } from "date-fns";
import { is } from "date-fns/locale";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    margin: theme.spacing(2),
  },
}));

function Step1({ updateParent }) {
  //url params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = Object.fromEntries(queryParams.entries());
  console.log("data from url params", data);
  var from = data.from;
  var to = data.to;
  const clearAll = data.clearAll;

  if (!from) {
    from = "";
  }
  if (!to) {
    to = "";
  }

  //there is an h2 element with id "welcome_name". hide it
  // document.getElementById("welcome_name").style.display = "none";
  const classes = useStyles();
  const [pickupAddress, setPickupAddress] = useState(from);
  const [dropAddress, setDropAddress] = useState(to);
  if (from != "") {
    //we have provided parameters
    localStorage.setItem("uuid", uuidv4());
  }

  //first time take value from local storage
  useEffect(() => {
    if (clearAll != null) {
      if (clearAll == "true") {
        //alert("clearing local storage");
        localStorage.clear();
      }
    }
    if (from != "") {
      //set pickup and drop address in local storage if  from is provided
      localStorage.setItem("pickupAddress", from);
      setPickupAddress(from);
      localStorage.setItem("dropAddress", to);
      setDropAddress(to);
      updateParent(from, to);
      //go to step 2 directly

      // window.location.href = "/step2";
    } else {
      //set pickup and drop address in local storage if  from is not provided
      if (!localStorage.getItem("pickupAddress")) {
        //localStorage.setItem("pickupAddress", "");
      } else {
        setPickupAddress(localStorage.getItem("pickupAddress"));
      }
      if (!localStorage.getItem("dropAddress")) {
        //localStorage.setItem("dropAddress", "");
      } else {
        setDropAddress(localStorage.getItem("dropAddress"));
      }
    }
  }, []);

  useEffect(() => {
    if (!from && !to) {
      if (from != "" && to != "") {
        setPickupAddress(from);
        setDropAddress(to);
      }
    }
    if (pickupAddress && dropAddress) {
      if (pickupAddress != "" && dropAddress != "") {
        localStorage.setItem("pickupAddress", pickupAddress);
        localStorage.setItem("dropAddress", dropAddress);
      }
    }

    updateParent(pickupAddress, dropAddress);
  }, [pickupAddress, dropAddress]);
  const isPhone = window.innerWidth <= 600;
  return (
    <div
      style={{
        height: "60vh",
      }}
    >
      <Typography
        variant="h5"
        style={{
          marginBottom: "20px",
          marginTop: "20px",
          fontWeight: "bold",
          fontFamily: "Poppins",
        }}
      >
        Select Pickup and Drop Location
      </Typography>
      <form className={classes.form}>
        <TextField
          label="Pickup Address"
          variant="outlined"
          className={classes.textField}
          onChange={(e) => setPickupAddress(e.target.value)}
          //set initial value to the value stored in local storage
          value={pickupAddress}
          fullWidth
          required
          style={{
            fontFamily: "Poppins",
          }}
        />
        <TextField
          label="Drop Address"
          variant="outlined"
          className={classes.textField}
          onChange={(e) => setDropAddress(e.target.value)}
          //set initial value to the value stored in local storage
          value={dropAddress}
          fullWidth
          required
          style={{
            fontFamily: "Poppins",
          }}
        />
      </form>

      <Map address1={pickupAddress} address2={dropAddress}>
        {" "}
      </Map>
    </div>
  );
}

export default Step1;
