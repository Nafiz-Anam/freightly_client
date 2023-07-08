import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
//import date and time picker from mui

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
    //if drop data does not exist in local storage just make it  having all keys but empty values
    //if it exists then do nothing

    const classes = useStyles();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    //pickup address
    const [pickupAddress, setPickupAddress] = useState("");
    useEffect(() => {
        // set all the states from local storage at the start if they are not empty
        //alert(JSON.stringify(localStorage.getItem("pickupData")));
        if (JSON.parse(localStorage.getItem("pickupData"))) {
            if (JSON.parse(localStorage.getItem("pickupData")).name !== "") {
                setName(JSON.parse(localStorage.getItem("pickupData")).name);
            }
            if (JSON.parse(localStorage.getItem("pickupData")).email !== "") {
                setEmail(JSON.parse(localStorage.getItem("pickupData")).email);
            }
            if (JSON.parse(localStorage.getItem("pickupData")).phone !== "") {
                setPhone(JSON.parse(localStorage.getItem("pickupData")).phone);
            }
            if (JSON.parse(localStorage.getItem("pickupData")).address !== "") {
                setPickupAddress(
                    JSON.parse(localStorage.getItem("pickupData")).address
                );
            }
        }
    }, []);
    useEffect(() => {
        //set local storage on every change
        localStorage.setItem(
            "pickupData",
            JSON.stringify({
                name: name === "" ? "" : name,
                email: email === "" ? "" : email,
                phone: phone === "" ? "" : phone,
                address: pickupAddress === "" ? "" : pickupAddress,
            })
        );
    }, [name, email, phone, pickupAddress]);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <form
                style={{
                    // fontFamily: "Poppins",
                    height: "55vh",
                    width: "70%",
                }}
                className={classes.form}
            >
                <Typography
                    variant="h5"
                    style={{
                        marginBottom: "20px",
                        marginTop: "20px",
                        fontWeight: "bold",
                        // fontFamily: "Poppins",
                    }}
                >
                    Pickup Contact Information
                </Typography>
                <TextField
                    label="Detailed Pickup Address"
                    variant="outlined"
                    className={classes.textField}
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    fullWidth
                    style={{
                        fontFamily: "Poppins",
                    }}
                />
                <TextField
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    value={name}
                    style={{
                        fontFamily: "Poppins",
                    }}
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    style={{
                        fontFamily: "Poppins",
                    }}
                />
                <TextField
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    margin="normal"
                    style={{
                        fontFamily: "Poppins",
                    }}
                />
            </form>
        </div>
    );
}

export default Step;
