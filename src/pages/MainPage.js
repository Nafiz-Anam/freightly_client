import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, LinearProgress, Button } from "@material-ui/core";
import AppRouter from "../AppRouter";

const useStyles = makeStyles((theme) => ({
    progressBar: {
        width: "100%",
        marginTop: 20,
        "& .MuiLinearProgress-barColorPrimary": {
            backgroundColor: "#000000",
        },
        "& .MuiLinearProgress-colorPrimary": {
            backgroundColor: "#000000",
        },
    },
}));

function MainPage({ activeStep, onNext }) {
    const isPhone = window.innerWidth < 600;
    const classes = useStyles();

    const steps = [
        // "Step 1",
        "Step 2",
        "Step 3",
        "Step 4",
        "Step 5",
        "Step 6",
        "Step 7",
        "Step 8",
        "Step 9",
        "Step 10",
        "Step 11",
        "Step 12",
        "Step 13",
        "Step 14",
    ];

    const handleStepChange = (step) => {
        onNext(step);
    };

    // if on / then go to step 1
    if (window.location.pathname === "/") {
        window.location.pathname = "/step2";
        handleStepChange(1);
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: isPhone ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    width: "100%",
                    height: "100%",
                    margin: "0",
                    padding: "0",
                }}
            >
                <Card
                    style={{
                        width: "80vw",
                        fullHeight: true,
                        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <div>
                        <LinearProgress
                            style={{ backgroundColor: "#00ff77" }}
                            variant="determinate"
                            value={(activeStep / steps.length) * 100}
                            className={classes.progressBar}
                        />
                        <AppRouter handleStepChange={handleStepChange} />
                    </div>
                </Card>
            </div>
        </>
    );
}

export default MainPage;
