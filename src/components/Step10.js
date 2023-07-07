import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    // makeStyles,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Card,
    CardContent,
    CircularProgress,
    Typography,
} from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//     form: {
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//     },
//     textField: {
//         margin: theme.spacing(2),
//     },
//     submitButton: {
//         marginTop: theme.spacing(2),
//     },
// }));

const sheetURL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=1055355179&single=true&output=csv";

function Step() {
    const [sheetData, setSheetData] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [dropTimeSlotPrice, setDropTimeSlotPrice] = useState(0);

    useEffect(() => {
        setSelectedOption(
            localStorage.getItem("selectedDropTimeSlot") != null
                ? JSON.parse(localStorage.getItem("selectedDropTimeSlot"))
                : ""
        );
    }, []);

    useEffect(() => {
        try {
            var price = dropTimeSlotPrice.replace("€", "");
            localStorage.setItem("dropTimeSlotPrice", parseInt(price));
        } catch (error) {
            // alert(error);
        }
    }, [dropTimeSlotPrice]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(sheetURL);
                const parsedData = parseCSV(response.data);
                setSheetData(parsedData);
            } catch (error) {
                console.error("Error retrieving CSV data:", error);
            }
        };

        fetchData();
    }, []);

    const parseCSV = (csvData) => {
        const rows = csvData.split("\n");
        const parsedData = rows.map((row) => row.split(","));
        return parsedData;
    };

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        localStorage.setItem("selectedDropTimeSlot", JSON.stringify(value));
        var element = sheetData.find((element) => element[0] === value);
        setDropTimeSlotPrice(element[1]);
        //alert(element[1]);
    };
    const isPhone = window.innerWidth < 600;
    return (
        <div>
            <Typography
                variant="h5"
                style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    fontWeight: "bold",
                    //center it all
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Poppins",
                }}
            >
                Select Drop Time Slot
            </Typography>

            <div
                style={{
                    overflowY: "scroll",
                    maxWidth: "100%",
                    //full width
                    width: "100%",
                }}
            >
                {" "}
                <div
                    style={{
                        width: "100%",
                        height: "60vh",
                        //have eerything centered
                        display: "flex",
                        flexDirection: "column",

                        //center it all
                        margin: "auto",
                        fontFamily: "Poppins",
                    }}
                >
                    {
                        //if shhet data length is 0, show a loading spinner
                        sheetData.length === 0 ? (
                            <CircularProgress
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    //center it all
                                    margin: "auto",
                                }}
                            />
                        ) : (
                            <div></div>
                        )
                    }
                    <FormControl
                        style={{
                            width: "100%",
                            //position it starting from the top
                            marginTop: "10px",
                            //center it all
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <RadioGroup
                            aria-label="dropDate"
                            name="dropDate"
                            value={selectedOption}
                            onChange={handleSelectChange}
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {sheetData.map((item) => {
                                const isSelected = item[0] === selectedOption;
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
                                        label={
                                            <Card
                                                style={{
                                                    // width: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginBottom: "30px",
                                                    borderRadius: "10px",
                                                    //if the item is selected, change the background color
                                                    backgroundColor: isSelected
                                                        ? "#F5F5F5"
                                                        : "white",
                                                    width: isPhone
                                                        ? "100%"
                                                        : "500px",
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
                                                    <Typography
                                                        variant="h6"
                                                        style={{
                                                            marginBottom:
                                                                "10px",
                                                            marginTop: "10px",
                                                            fontWeight: "bold",
                                                            marginLeft: "10px",
                                                            marginRight: "10px",
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
                                                            marginLeft: "10px",
                                                            marginRight: "10px",
                                                            fontFamily:
                                                                "Poppins",
                                                        }}
                                                    >
                                                        {item[1]}
                                                    </Typography>

                                                    {/* <Typography
                            variant="h3"
                            style={{
                              marginBottom: "10px",
                              marginTop: "10px",
                              fontWeight: "bold",
                              color: "#6A1B9A",
                              marginLeft: "10px",

                              fontFamily: "Poppins",
                              //self align it to the right
                              alignSelf: "flex-end",
                            }}
                          >
                            {item[2]}
                          </Typography> */}
                                                </CardContent>
                                            </Card>
                                        }
                                    />
                                );
                            })}
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </div>
    );
}

export default Step;
