import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Map from "./Map.js";

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
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const data = Object.fromEntries(queryParams.entries());
    const [pickupAddress, setPickupAddress] = useState(data.from || "");
    const [dropAddress, setDropAddress] = useState(data.to || "");

    useEffect(() => {
        if (data.from) {
            localStorage.setItem("uuid", uuidv4());
        }

        if (data.clearAll === "true") {
            localStorage.clear();
        }

        if (data.from) {
            localStorage.setItem("pickupAddress", data.from);
            localStorage.setItem("dropAddress", data.to);
            updateParent(data.from, data.to);
        } else {
            const storedPickupAddress = localStorage.getItem("pickupAddress");
            const storedDropAddress = localStorage.getItem("dropAddress");

            if (storedPickupAddress) {
                setPickupAddress(storedPickupAddress);
            }

            if (storedDropAddress) {
                setDropAddress(storedDropAddress);
            }
        }
    }, []);

    useEffect(() => {
        if (pickupAddress && dropAddress) {
            localStorage.setItem("pickupAddress", pickupAddress);
            localStorage.setItem("dropAddress", dropAddress);
        }

        updateParent(pickupAddress, dropAddress);
    }, [pickupAddress, dropAddress]);

    const classes = useStyles();

    return (
        <div style={{ height: "60vh" }}>
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
                    value={pickupAddress}
                    fullWidth
                    required
                    style={{ fontFamily: "Poppins" }}
                />
                <TextField
                    label="Drop Address"
                    variant="outlined"
                    className={classes.textField}
                    onChange={(e) => setDropAddress(e.target.value)}
                    value={dropAddress}
                    fullWidth
                    required
                    style={{ fontFamily: "Poppins" }}
                />
            </form>
            <Map address1={pickupAddress} address2={dropAddress} />
        </div>
    );
}

export default Step1;
