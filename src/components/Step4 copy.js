import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    
    // MenuItem,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Card,
    CardContent,
    CircularProgress,
} from "@material-ui/core";
import axios from "axios";
//import parse cv

import Typography from "@material-ui/core/Typography";
//import date and time picker from mui
// import {
//     DateTimePicker,
//     MuiPickersUtilsProvider,
//     MuiPickersContext,
// } from "@material-ui/pickers";
//utils of material ui
// import DateFnsUtils from "@date-io/date-fns";
// var loaded = false;
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
// let globalSheetData = [];
const sheetURL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=322664730&single=true&output=csv";
const DynamicInputForm = () => {
    //take the data from the sheet
    const [sheetData, setSheetData] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(sheetURL);
                const csvData = response.data;

                // Parse the CSV data
                const parsedData = parseCSV(csvData);

                setSheetData(parsedData);
                // globalSheetData = parsedData;
            } catch (error) {
                console.error("Error retrieving CSV data:", error);
            }
        };

        fetchData();

        //also just one time set the selected option to the one in local storage if it exists
        var value = localStorage.getItem("selectedTime");
        if (value != null) {
            setSelectedOption(JSON.parse(value));
        }
    }, []);

    // Function to parse CSV data into an array of rows
    const parseCSV = (csvData) => {
        const rows = csvData.split("\n");
        const parsedData = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i].split(",");
            //if i > 30, break
            if (i > 30) {
                break;
            }

            parsedData.push(row);
        }
        //sheetData is an array of items

        return parsedData;
    };

    //for every item in sheetData, create a menu item
    // const menuItems = sheetData.map((item) => {
    //     return <MenuItem value={item}>{item}</MenuItem>;
    // });
    const handleSelectChange = (event) => {
        //change selected option
        setSelectedOption(event.target.value);
        //save the selected option in local storage
        localStorage.setItem(
            "selectedTime",
            JSON.stringify(event.target.value)
        );

        //get that element from sheet data for the price
        var element = sheetData.find(
            (element) => element[0] === event.target.value
        );
        var tp = element[2];
        //remove the euro sign
        tp = tp.replace("€", "");

        localStorage.setItem("timingPrice", parseFloat(tp));
    };

    return (
        //if shhet length is 0, show a loading circle
        sheetData.length === 0 ? (
            <CircularProgress
                style={{
                    width: "100px",
                    height: "80vh",
                    //center it all
                    margin: "auto",
                }}
            />
        ) : (
            <div
                style={{
                    width: "80%",
                    height: "80vh",
                    //have eerything centered
                    display: "flex",
                    flexDirection: "column",

                    //center it all
                    margin: "auto",
                    fontFamily: "Poppins",
                }}
            >
                <FormControl
                    style={{
                        width: "100%",
                        //position it starting from the top
                        marginTop: "10px",
                        //center it all
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <RadioGroup
                        aria-label="pickupDate"
                        name="pickupDate"
                        value={selectedOption}
                        onChange={handleSelectChange}
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        {sheetData.map((item) => {
                            const isSelected = item[0] === selectedOption;
                            const isPhone = window.innerWidth < 500;
                            return (
                                <FormControlLabel
                                    value={item[0]}
                                    control={
                                        <Radio
                                            style={{
                                                display: "none",
                                            }}
                                        />
                                    }
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        //center it all
                                        alignItems: "center",
                                        justifyContent: "center",

                                        marginBottom: "10px",
                                    }}
                                    label={
                                        <Card
                                            style={{
                                                // width: "100%",
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginBottom: "10px",
                                                borderRadius: "10px",
                                                boxShadow: isSelected
                                                    ? "4px 4px 4px rgba(0, 0, 0, 0.5)"
                                                    : "4px 4px 4px rgba(0, 0, 0, 0.25)",
                                                backgroundColor: isSelected
                                                    ? "#f0f0f0"
                                                    : "#ffffff",
                                                width: isPhone
                                                    ? "100%"
                                                    : "350px",
                                                //grey #
                                            }}
                                        >
                                            <CardContent
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        display: "flex",
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        style={{
                                                            marginBottom:
                                                                "10px",
                                                            marginTop: "10px",
                                                            fontWeight: "bold",
                                                            marginRight: "10px",
                                                            marginLeft: "10px",
                                                            fontFamily:
                                                                "Poppins",
                                                        }}
                                                    >
                                                        {item[0]}{" "}
                                                        {/* Moved the item label inside the Card */}
                                                    </Typography>

                                                    <Typography
                                                        variant="h6"
                                                        style={{
                                                            marginBottom:
                                                                "10px",
                                                            marginTop: "10px",
                                                            fontWeight: "bold",
                                                            marginRight: "10px",
                                                            marginLeft: "10px",
                                                            fontFamily:
                                                                "Poppins",
                                                        }}
                                                    >
                                                        {item[1]}
                                                    </Typography>
                                                </div>
                                                <Typography
                                                    variant="h6"
                                                    style={{
                                                        marginBottom: "10px",
                                                        marginTop: "10px",
                                                        fontWeight: "bold",
                                                        marginRight: "10px",
                                                        marginLeft: "10px",
                                                        fontFamily: "Poppins",
                                                    }}
                                                >
                                                    {
                                                        item[2].replace(
                                                            "+",
                                                            "€"
                                                        )
                                                        //take a string and replace + with euro sign
                                                    }
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    }
                                />
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            </div>
        )
    );
};

function Step() {
    //get the spreadsheet data

    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState("");

    //set all the states from local storage at the start
    useEffect(() => {
        // set all the states from local storage at the start if they exist
        const pickupDate = localStorage.getItem("pickupDate");
        if (pickupDate) {
            handleDateChange(pickupDate);
        }
    }, []);

    //use effect
    useEffect(() => {
        //edit in local storage pickup date

        localStorage.setItem("pickupDate", selectedDate);
    }, [selectedDate]);

    return (
        <div>
            <form
                className={classes.form}
                style={{
                    //center it all
                    margin: "auto",
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
                    Select Pickup Date
                </Typography>

                <div
                    style={{
                        overflowY: "scroll",
                        maxWidth: "100%",
                        //full width
                        width: "100%",
                        height: "60vh",
                    }}
                >
                    {" "}
                    <DynamicInputForm />
                </div>
            </form>
        </div>
    );
}

export default Step;
