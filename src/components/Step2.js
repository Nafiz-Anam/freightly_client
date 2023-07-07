import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Card,
  CardContent,
} from "@material-ui/core";
import Map from "./Map";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  formControlLabel: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  },
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
    borderRadius: "10px",
  },
  cardContent: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  typography: {
    marginBottom: "10px",
    marginTop: "5px",
    fontWeight: "bold",
    marginRight: "10px",
    marginLeft: "10px",
    fontFamily: "Poppins",
  },
}));

function Step2() {
  //there is an h2 element with id "welcome_name". hide it
  // document.getElementById("welcome_name").style.display = "none";
  const classes = useStyles();
  //use state for How it came from itemHow
  const [itemHow, setItemHow] = useState("");
  //use effect to change in local storage
  useEffect(() => {
    if (itemHow != "") {
      var valueToStore = "🙋‍♂️Someone You know";
      //use switch case to set
      switch (itemHow) {
        case "option1":
          valueToStore = "🙋‍♂️Someone You know";
          break;
        case "option2":
          valueToStore = "🛒Marktplaats";
          break;
        case "option3":
          valueToStore = "📘Facebook Marketplace";
          break;
        case "option4":
          valueToStore = "2️⃣2dehands";
          break;
        case "option5":
          valueToStore = "➡️Other";
          break;
      }
      localStorage.setItem("itemHow", valueToStore);
    }
  }, [itemHow]);

  //first time take value from local storage
  useEffect(() => {
    var value = localStorage.getItem("itemHow");
    if (value != null) {
      switch (value) {
        case "🙋‍♂️Someone You know":
          setItemHow("option1");
          break;
        case "🛒Marktplaats":
          setItemHow("option2");
          break;
        case "📘Facebook Marketplace":
          setItemHow("option3");
          break;
        case "2️⃣2dehands":
          setItemHow("option4");
          break;
        case "➡️Other":
          setItemHow("option5");
          break;
      }
    }
  }, []);

  //NOW do the same foe itemWhere
  const [itemWhere, setItemWhere] = useState("");
  //use effect to change in local storage -  residence , shop , warehouse , office
  useEffect(() => {
    if (itemWhere != "") {
      var valueToStore = "🏠Residence";
      //use switch case to set
      switch (itemWhere) {
        case "option1":
          valueToStore = "🏠Residence";
          break;
        case "option2":
          valueToStore = "🏪Shop";
          break;
        case "option3":
          valueToStore = "🏭Warehouse";
          break;
        case "option4":
          valueToStore = "🏢Office";
          break;
      }
      localStorage.setItem("itemWhere", valueToStore);
    }
  }, [itemWhere]);

  //first time take value from local storage
  useEffect(() => {
    var value = localStorage.getItem("itemWhere");
    if (value != null) {
      switch (value) {
        case "🏠Residence":
          setItemWhere("option1");
          break;
        case "🏪Shop":
          setItemWhere("option2");
          break;
        case "🏭Warehouse":
          setItemWhere("option3");
          break;
        case "🏢Office":
          setItemWhere("option4");
          break;
      }
    }
  }, []);

  const handleSelectChange = (event) => {
    setItemWhere(event.target.value);
  };
  const isPhone = window.innerWidth < 600;

  return (
    <div
      style={{
        //row view
        display: "flex",
        flexDirection: "row",
        height: "55vh",
      }}
    >
      <div
        style={{
          // col flex
          display: "flex",
          flexDirection: "column",
          //center align
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          style={{
            marginBottom: isPhone ? "10px" : "20px",
            marginTop: isPhone ? "10px" : "20px",
            fontWeight: "bold",
            //center align
            textAlign: "center",
            fontFamily: "Poppins",
          }}
        >
          Where do we pick up the Object from?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="pickupDate"
            name="pickupDate"
            value={itemWhere}
            onChange={handleSelectChange}
            style={{
              width: "100%",
              flexDirection: "column",
            }}
          >
            {[
              { value: "option1", label: "🏠Residence" },
              { value: "option2", label: "🏪Shop" },
              { value: "option3", label: "🏭Warehouse" },
              { value: "option4", label: "🏢Office" },
            ].map((option) => (
              <Card
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: isPhone ? "3px" : "30px",
                  borderRadius: "10px",
                  width: "100%",
                  backgroundColor: itemWhere === option.value ? "#F2F2F2" : "",
                }}
                onClick={() => setItemWhere(option.value)}
                key={option.value}
              >
                <Radio
                  checked={itemWhere === option.value}
                  value={option.value}
                  name="radio-button-demo"
                  inputProps={{ "aria-label": option.label }}
                  style={{
                    display: "none",
                  }}
                />
                <CardContent
                  style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: isPhone ? "5px" : "10px",
                      marginTop: isPhone ? "5px" : "10px",
                      fontWeight: "bold",
                      marginRight: "10px",
                      marginLeft: "10px",
                      fontFamily: "Poppins",
                    }}
                  >
                    {option.label}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}

export default Step2;
