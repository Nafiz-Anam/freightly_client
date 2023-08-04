import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, LinearProgress } from "@material-ui/core";
import AppRouter from "../AppRouter";
import { StepContext } from "../context/stepContext";

const useStyles = makeStyles((theme) => ({
    progressBar: {
        width: "100%",
        marginTop: 20,
        "& .MuiLinearProgress-barColorPrimary": {
            backgroundColor: "#00ff77",
        },
        "& .MuiLinearProgress-colorPrimary": {
            backgroundColor: "#000000",
        },
    },
}));

function MainPage() {
    const classes = useStyles();
    const { activeStep } = useContext(StepContext);
    const isPhone = window.innerWidth < 600;

    return (
        <>
            <div
                style={{
                    display: "flex",
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
                        width: isPhone ? "100vw" : "80vw",
                        fullHeight: true,
                        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <div>
                        <LinearProgress
                            style={{ backgroundColor: "#000000" }}
                            variant="determinate"
                            value={(activeStep / 11) * 100}
                            className={classes.progressBar}
                        />
                        <AppRouter />
                    </div>
                </Card>
            </div>
        </>
    );
}

export default MainPage;
