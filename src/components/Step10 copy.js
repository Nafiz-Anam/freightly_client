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
//   DateTimePicker,
//   MuiPickersUtilsProvider,
//   MuiPickersContext,
// } from "@material-ui/pickers";
//utils of material ui
// import DateFnsUtils from "@date-io/date-fns";
const extraHelpOptions = {
  option1: { value: "🙋‍♂️Extra Help", price: 55 },
  option2: { value: "🚚Tail Lift", price: 40 },
  option3: { value: "🚚Tail Lift + 2 Couriers", price: 80 },
  option4: { value: "🚚Not Necessary", price: 0 },
};
// const useStyles = makeStyles((theme) => ({
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     //center
//     justifyContent: "center",
//     width: "100%",
//   },
//   textField: {
//     margin: theme.spacing(2),
//     fontFamily: "Poppins",
//   },
//   submitButton: {
//     marginTop: theme.spacing(2),
//     fontFamily: "Poppins",
//   },
//   //typography font family must be poppins
//   typography: {
//     fontFamily: "Poppins",
//   },
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
  // const classes = useStyles();
  //use state for extra help at drop
  const [extraDropHelp, setExtraDropHelp] = useState("");
  //at first set it to the one in local storage
  useEffect(() => {
    var _extraDropHelp = localStorage.getItem("extraDropHelp");
    //set the selected option to extraDropHelp
    switch (_extraDropHelp) {
      case "🙋‍♂️Extra Help":
        setExtraDropHelp("option1");
        break;
      case "🚚Tail Lift":
        setExtraDropHelp("option2");
        break;
      case "🚚Tail Lift + 2 Couriers":
        setExtraDropHelp("option3");
        break;
      case "🚚Not Necessary":
        setExtraDropHelp("option4");
        break;
      default:
        setExtraDropHelp("option4");
    }
  }, []);
  //use effect to change in local storage
  //TODO
  useEffect(() => {
    if (extraDropHelp !== "") {
      var valueToStore = "🙋‍♂️Extra Help";
      var price = 0;
      //use switch case to set
      switch (extraDropHelp) {
        case "option1":
          valueToStore = "🙋‍♂️Extra Help";
          price = 55;
          break;
        case "option2":
          valueToStore = "🚚Tail Lift";
          price = 40;
          break;
        case "option3":
          valueToStore = "🚚Tail Lift + 2 Couriers";
          price = 80;
          break;
        case "option4":
          valueToStore = "🚚Not Necessary";
          price = 0;
          break;
        default:
          valueToStore = "🚚Not Necessary";
          price = 0;
      }
      //set in local storage
      localStorage.setItem("extraDropHelp", valueToStore);
      //set extra pick up help price
      localStorage.setItem("extraDropHelpPrice", price);
    }
  }, [extraDropHelp]);

  const isPhone = window.innerWidth < 600;
  /*
1. Extra Help - A second courier to help carry
2. A van with a tail lift 
3. A van with auto tail lifts + 2 couriers
4. Not necessary
        */
  return (
    <div style={{ fontFamily: "Poppins", height: "55vh" }}>
      <Typography
        variant="h5"
        style={{
          marginBottom: "20px",
          marginTop: "20px",
          fontWeight: "bold",
          fontFamily: "Poppins",
        }}
      >
        Need any extra help at the drop?
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          aria-label="extra help"
          name="extra help"
          value={extraDropHelp}
          onChange={(e) => {
            setExtraDropHelp(e.target.value);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {Object.keys(extraHelpOptions).map((option) => (
            <FormControlLabel
              key={option}
              value={option}
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
                    backgroundColor:
                      extraDropHelp === option ? "f5f5f5" : "white",
                    //bg

                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "100px",
                    alignItems: "center",
                    textAlign: "center",
                    minWidth: !isPhone ? "450px" : "200px",
                  }}
                >
                  <Typography
                    variant="h7"
                    style={{
                      marginBottom: !isPhone ? "5px" : "1px",
                      marginTop: !isPhone ? "5px" : "1px",
                      fontWeight: "bold",
                      backgroundColor:
                        extraDropHelp === option ? "f5f5f5" : "white",
                    }}
                  >
                    {extraHelpOptions[option].value}
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      marginBottom: !isPhone ? "5px" : "1px",
                      marginTop: !isPhone ? "5px" : "1px",
                      fontWeight: "bold",
                      backgroundColor:
                        extraDropHelp === option ? "f5f5f5" : "white",
                    }}
                  >
                    €{extraHelpOptions[option].price}
                  </Typography>
                </Card>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default Step;
