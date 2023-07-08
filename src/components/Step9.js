import React from "react";
import { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
//import date and time picker from mui
// import {
//     DateTimePicker,
//     MuiPickersUtilsProvider,
//     MuiPickersContext,
// } from "@material-ui/pickers";
//utils of material ui
// import DateFnsUtils from "@date-io/date-fns";

// const useStyles = makeStyles((theme) => ({
//     form: {
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         //center
//         justifyContent: "center",
//         width: "100%",
//     },
//     textField: {
//         margin: theme.spacing(2),
//         fontFamily: "Poppins",
//     },
//     submitButton: {
//         marginTop: theme.spacing(2),
//         fontFamily: "Poppins",
//     },
//     //typography font family must be poppins
//     typography: {
//         fontFamily: "Poppins",
//     },
// }));
const commonStyle = {
    fontFamily: "Poppins",
    fontSize: "20px",
    //shadow rounded border
    border: "1px solid #ccc",
    borderRadius: "10px",

    //when hover on this element zoom
    transition: "  transform 0.5s ease-in-out",

    //have little gap on all sides

    margin: "10px",
    padding: "10px",
    //column flex
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};
function Step() {
    const isPhone = window.innerWidth < 600;
    // const classes = useStyles();
    //use state for extra help at drop
    const [extraDropFloorHelp, setExtraDropFloorHelp] = useState("");
    //at first set it to the one in local storage
    useEffect(() => {
        var _extraDropFloorHelp = localStorage.getItem("extraDropFloorHelp");
        //set the selected option to extraDropFloorHelp
        switch (_extraDropFloorHelp) {
            case "🚪Ground Floor":
                setExtraDropFloorHelp("option1");
                break;
            case "🛗Elevator Available":
                setExtraDropFloorHelp("option2");
                break;
            case "⬇️Basement":
                setExtraDropFloorHelp("option3");
                break;
            case "1️⃣1st Floor":
                setExtraDropFloorHelp("option4");
                break;
            case "2️⃣2nd Floor":
                setExtraDropFloorHelp("option5");
                break;
            case "3️⃣3rd Floor":
                setExtraDropFloorHelp("option6");
                break;
            case "4️⃣4th Floor":
                setExtraDropFloorHelp("option7");
                break;
            case "5️⃣5th Floor":
                setExtraDropFloorHelp("option8");
                break;
        }
    }, []);
    //use effect to change in local storage
    //TODO
    useEffect(() => {
        if (extraDropFloorHelp !== "") {
            var valueToStore = "🚪Ground Floor";
            var price = 0;
            //use switch case to set
            switch (extraDropFloorHelp) {
                case "option1":
                    valueToStore = "🚪Ground Floor";
                    price = 0;
                    break;
                case "option2":
                    valueToStore = "🛗Elevator Available";
                    price = 10;
                    break;
                case "option3":
                    valueToStore = "⬇️Basement";
                    price = 10;
                    break;
                case "option4":
                    valueToStore = "1️⃣1st Floor";
                    price = 10;
                    break;
                case "option5":
                    valueToStore = "2️⃣2nd Floor";
                    price = 20;
                    break;
                case "option6":
                    valueToStore = "3️⃣3rd Floor";
                    price = 30;
                    break;
                case "option7":
                    valueToStore = "4️⃣4th Floor";
                    price = 40;
                    break;
                case "option8":
                    valueToStore = "5️⃣5th Floor";
                    price = 50;
                    break;
            }
            //set in local storage
            localStorage.setItem("extraDropFloorHelp", valueToStore);
            //set extra pick up help price
            localStorage.setItem("extraDropFloorHelpPrice", price);
        }
    }, [extraDropFloorHelp]);

    /*
1. Extra Help - A second courier to help carry
2. A van with a tail lift 
3. A van with auto tail lifts + 2 couriers
4. Not necessary
        */

    const Options = ({ value, name, price }) => (
        <FormControlLabel
            style={{
                marginBottom: "10px",
                width: !isPhone ? "100%" : "400px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",

                //gap between elements 40px
            }}
            value={value}
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
                        ...commonStyle,

                        textAlign: "center",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        //gap between elements 40px

                        selfAlign: "center",
                        itemsAlign: "center",
                        minWidth: isPhone ? "100%" : "450px",
                        backgroundColor:
                            value === extraDropFloorHelp ? "#ccc" : "#fff",
                    }}
                >
                    <Typography
                        variant={!isPhone ? "h7" : "h8"}
                        style={{
                            marginBottom: "5px",
                            marginTop: "5px",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant="h5"
                        style={{
                            marginBottom: "5px",
                            marginTop: "5px",
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "#0",
                        }}
                    >
                        €{price}
                    </Typography>
                </Card>
            }
        />
    );

    const options = [
        { value: "option1", name: "🚪Ground Floor", price: 0 },
        { value: "option2", name: "🛗Elevator Available", price: 10 },
        { value: "option3", name: "⬇️Basement", price: 10 },
        { value: "option4", name: "1️⃣1st Floor", price: 10 },
        { value: "option5", name: "2️⃣2nd Floor", price: 20 },
        { value: "option6", name: "3️⃣3rd Floor", price: 30 },
        { value: "option7", name: "4️⃣4th Floor", price: 40 },
        { value: "option8", name: "5️⃣5th Floor", price: 50 },

        //... continue with other options
    ];

    return (
        <div
            style={{
                height: "55vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
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
                Need any extra lifting help at the drop?
            </Typography>
            <FormControl
                component="fieldset"
                style={{
                    flexDirection: "column",
                    overflowY: "scroll",
                    height: "500px",
                    width: !isPhone ? "60%" : "450px",
                    display: "flex",
                }}
            >
                <RadioGroup
                    aria-label="extra help"
                    name="extra help"
                    value={extraDropFloorHelp}
                    onChange={(e) => setExtraDropFloorHelp(e.target.value)}
                    style={{
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        width: !isPhone ? "100%" : "450px",
                    }}
                >
                    {options.map((option) => (
                        <Options key={option.value} {...option} />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default Step;
