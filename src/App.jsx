import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  Container,
  LinearProgress,
  Typography,
  AppBar,
  Toolbar,
  // Image,
} from "@material-ui/core";
//import Login from "./components/Login";
// import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Step6 from "./components/Step6";
import Step7 from "./components/Step7";
import Step8 from "./components/Step8";
import Step9 from "./components/Step9";
import Step10 from "./components/Step10";
import Step11 from "./components/Step11";
import Step12 from "./components/Step12";
import Step13 from "./components/Step13";
import Step14 from "./components/Step14";

import axios from "axios";
// import Map from "./components/Map";

import "./App.css";
// import { parse, set } from "date-fns";

import { v4 as uuidv4 } from "uuid";
// import { it } from "date-fns/locale";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    card: {
        width: 400,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        borderRadius: 8,
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        marginTop: 20,
        //black bg
        backgroundColor: "#000000",
        //hover bg
        "&:hover": {
            backgroundColor: "#00000f",
        },
        //green text
        color: "#00ff77",
    },
    progressBar: {
        width: "100%",
        marginTop: 20,
        //black and grey

        //grey for the unfilled part
        "& .MuiLinearProgress-barColorPrimary": {
            backgroundColor: "#000000",
        },
        //black for the filled part
        "& .MuiLinearProgress-colorPrimary": {
            backgroundColor: "#000000",
        },
    },
    //text
    text: {
        //black rounded bg and green colour
        backgroundColor: "#000000",
        color: "#00ff77",
        borderRadius: 8,
        // padding: 10,
        // marginTop: 5,
    },
}));

//set uuid to a random string
if (localStorage.getItem("uuid") == null) {
  localStorage.setItem("uuid", uuidv4());
}

function App() {
  const isPhone = window.innerWidth < 600;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);
  //show summary or not
  const [showSummary, setShowSummary] = React.useState(false);

  const [stateFullItems, setStateFullItems] = React.useState([]);
  const [itemWhere, setItemWhere] = React.useState("");

  useEffect(() => {}, [showSummary]);
  //var showSummary = false;
  //at first set the active step to 1

  //change isPhone dynamically

  const steps = [
    //"Login",
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
    setActiveStep(step);
  };

  //set state for the pickup address and dropoff address
  const [pickupAddress, setPickupAddress] = React.useState("");
  const [dropoffAddress, setDropoffAddress] = React.useState("");

  //state for the travel price
  const [travelPrice, setTravelPrice] = React.useState(0);
  //state for volume price
  const [volumePrice, setVolumePrice] = React.useState(0);
  //timing price FOR PICKUP
  const [timingPrice, setTimingPrice] = React.useState(0);
  //timing price FOR DROP
  const [dropTimingPrice, setDropTimingPrice] = React.useState(0);
  //pickupTimeSlotPrice
  const [pickupTimeSlotPrice, setPickupTimeSlotPrice] = React.useState(0);
  //extraPickUpHelpPrice
  const [extraPickUpHelpPrice, setExtraPickUpHelpPrice] = React.useState(0);
  //extraPickUpFloorHelpPrice
  const [
    extraPickULiftingpHelpPrice,
    setExtraPickUpFloorHelpPrice,
  ] = React.useState(0);
  //extra drop help price
  const [
    extraDropLiftingHelpPrice,
    setExtraDropLiftingHelpPrice,
  ] = React.useState(0);

  //drop time slot price
  const [dropTimeSlotPrice, setDropTimeSlotPrice] = React.useState(0);
  //extra drop help price
  const [extraDropHelpPrice, setExtraDropHelpPrice] = React.useState(0);

  //pickup time slot
  const [pickupTimeSlot, setPickupTimeSlot] = React.useState("");
  //drop time slot
  const [dropTimeSlot, setDropTimeSlot] = React.useState("");

  //drop date
  const [dropDate, setDropDate] = React.useState("");
  //set pickup date
  const [pickupDate, setPickupDate] = React.useState("");

  //pickup floor help
  const [pickupFloorHelp, setPickupFloorHelp] = React.useState(false);
  //drop floor help
  const [dropFloorHelp, setDropFloorHelp] = React.useState(false);

  //set localstorage uuid to some random generated string

  var items = [];

  useEffect(() => {
    const intervalId = setInterval(() => {
      //1 second interval
      //set timing price to the price from local
      //alert(localStorage.getItem("timingPrice"));
      //SET TIMING PRICE IF IT IS A PROPER FLOATING POINT NUMBER

      var _timingPrice = parseFloat(localStorage.getItem("timingPrice"));
      //if not NaN then set the timing price
      if (!isNaN(_timingPrice)) {
        setTimingPrice(_timingPrice);
      }
      var _dropTimingPrice = parseFloat(
        localStorage.getItem("dropTimingPrice")
      );
      //if not NaN then set the timing price
      if (!isNaN(_dropTimingPrice)) {
        setDropTimingPrice(_dropTimingPrice);
      }
      var _pickupTimeSlotPrice = parseFloat(
        localStorage.getItem("pickupTimeSlotPrice")
      );
      //if not NaN then set the timing price
      if (!isNaN(_pickupTimeSlotPrice)) {
        setPickupTimeSlotPrice(_pickupTimeSlotPrice);
      }
      var _extraPickUpHelpPrice = parseFloat(
        localStorage.getItem("extraPickupHelpPrice")
      );

      //if not NaN
      if (!isNaN(_extraPickUpHelpPrice)) {
        setExtraPickUpHelpPrice(_extraPickUpHelpPrice);
        //alert(_extraPickUpHelpPrice);
      }
      var _extraPickUpFloorHelpPrice = parseFloat(
        localStorage.getItem("extraPickupFloorHelpPrice")
      );

      //if not NaN
      if (!isNaN(_extraPickUpFloorHelpPrice)) {
        setExtraPickUpFloorHelpPrice(_extraPickUpFloorHelpPrice);
        //alert(_extraPickUpHelpPrice);
      }
      var _extraDropFloorHelpPrice = parseFloat(
        localStorage.getItem("extraDropFloorHelpPrice")
      );

      //if not NaN
      if (!isNaN(_extraDropFloorHelpPrice)) {
        setExtraDropLiftingHelpPrice(_extraDropFloorHelpPrice);
        //alert(_extraPickUpHelpPrice);
      }

      var _dropTimeSlotPrice = parseFloat(
        localStorage.getItem("dropTimeSlotPrice")
      );
      //if not NaN then set the timing price
      if (!isNaN(_dropTimeSlotPrice)) {
        setDropTimeSlotPrice(_dropTimeSlotPrice);
      }
      var _extraDropHelpPrice = parseFloat(
        localStorage.getItem("extraDropHelpPrice")
      );
      //if not NaN then set the timing price
      if (!isNaN(_extraDropHelpPrice)) {
        setExtraDropHelpPrice(_extraDropHelpPrice);
      }
      //se itemWhere
      setItemWhere(localStorage.getItem("itemWhere"));

      //set pickup date
      setPickupDate(localStorage.getItem("selectedTime"));
      //set the drop date
      setDropDate(localStorage.getItem("selectedDropTime"));
      //set the pickup time slot
      setPickupTimeSlot(localStorage.getItem("selectedPickupTimeSlot"));
      //set the drop time slot
      setDropTimeSlot(localStorage.getItem("selectedDropTimeSlot"));
      //pickup floor help
      setPickupFloorHelp(localStorage.getItem("extraPickupFloorHelp"));
      //drop floor help
      setDropFloorHelp(localStorage.getItem("extraDropFloorHelp"));
    }, 200);

    // Clean-up function
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  useEffect(() => {
    const intervalId = setInterval(() => {
      //make an items array with dim and name and additonal fields
      items = [];
      if (localStorage.getItem("selectedOptions")) {
        //get the items from local storage
        for (
          let i = 0;
          i < JSON.parse(localStorage.getItem("selectedOptions")).length;
          i++
        ) {
          //push the items into the items array
          items.push([
            JSON.parse(localStorage.getItem("selectedOptions"))[i],
            //dimenstions, its a dict of length, width, height
            JSON.parse(localStorage.getItem("selectedOptionsDimensions"))[i],
            //additional fields
            JSON.parse(localStorage.getItem("additionalFields"))[i]
              ? JSON.parse(localStorage.getItem("additionalFields"))[i].text
              : "",
            //materials
            JSON.parse(localStorage.getItem("selectedOptionsMaterials"))[i],
            //item im
            JSON.parse(localStorage.getItem("itemImages"))
              ? JSON.parse(localStorage.getItem("itemImages"))[i]
              : "",
          ]);
        }
        setStateFullItems(items);
      }

      if (
        localStorage.getItem("pickupAddress") &&
        localStorage.getItem("dropAddress")
      ) {
        axios
          .post(
            "https://us-central1-freightly-admin.cloudfunctions.net/api/updateData",
            {
              uuid: localStorage.getItem("uuid"),
              //pickup address and dropoff address from step 1
              pickupAddress: localStorage.getItem("pickupAddress"),
              dropoffAddress: localStorage.getItem("dropAddress"),
              //slelected options and additional fields  from step 2
              selectedOptions: localStorage.getItem("selectedOptions"),
              additionalFields: localStorage.getItem("additionalFields"),
              //sleected date, name email, and phone of pickup from step 3
              pickupData: JSON.parse(localStorage.getItem("pickupData")),
              //selected date, name, email, and phone of dropoff from step 4
              dropData: JSON.parse(localStorage.getItem("dropData")),
              itemWhere: localStorage.getItem("itemWhere"),
              itemHow: localStorage.getItem("itemHow"),
              //distanc
              distance: localStorage.getItem("distance"),
              //items
              items: items,
              //pick up times
              pickupTimes: {
                date: localStorage.getItem("selectedTime"),
                time: localStorage.getItem("selectedPickupTimeSlot"),
                price: localStorage.getItem("timingPrice"),
              },
              //drop times
              dropTimes: {
                date: localStorage.getItem("selectedDropTime"),
                time: localStorage.getItem("selectedDropTimeSlot"),
                price: localStorage.getItem("dropTimingPrice"),
              },
              timingPrice:
                (parseFloat(timingPrice ? timingPrice : 0) !== NaN
                  ? parseFloat(timingPrice ? timingPrice : 0)
                  : 0) +
                (parseFloat(dropTimingPrice ? dropTimingPrice : 0) !== NaN
                  ? parseFloat(dropTimingPrice ? dropTimingPrice : 0)
                  : 0) +
                //do the same for pickupTimeSlotPrice
                (parseFloat(pickupTimeSlotPrice ? pickupTimeSlotPrice : 0) !==
                NaN
                  ? parseFloat(pickupTimeSlotPrice ? pickupTimeSlotPrice : 0)
                  : 0) +
                //now do the same for dropTimeSlotPrice
                (parseFloat(dropTimeSlotPrice ? dropTimeSlotPrice : 0) !== NaN
                  ? parseFloat(dropTimeSlotPrice ? dropTimeSlotPrice : 0)
                  : 0),
              //extra pickup help
              extraPickupHelp: localStorage.getItem("extraPickupHelp"),
              //extra pickup lifting help
              extraPickupFloorHelp: localStorage.getItem(
                "extraPickupFloorHelp"
              ),
              extraDropFloorHelp: localStorage.getItem("extraDropFloorHelp"),
              //extra drop help
              extraDropHelp: localStorage.getItem("extraDropHelp"),
              //time slots prices
              timeSlotPrices:
                (parseFloat(localStorage.getItem("pickupTimeSlotPrice")) !== NaN
                  ? parseFloat(localStorage.getItem("pickupTimeSlotPrice"))
                  : 0) +
                (parseFloat(localStorage.getItem("dropTimeSlotPrice"))
                  ? parseFloat(localStorage.getItem("dropTimeSlotPrice"))
                  : 0),
              //extra help prices
              extraHelpPrices:
                parseFloat(localStorage.getItem("extraPickupHelpPrice")) +
                parseFloat(localStorage.getItem("extraDropHelpPrice")) +
                parseFloat(localStorage.getItem("extraPickupFloorHelpPrice")) +
                parseFloat(localStorage.getItem("extraDropFloorHelpPrice"))
                  ? parseFloat(localStorage.getItem("extraPickupHelpPrice")) +
                    parseFloat(localStorage.getItem("extraDropHelpPrice")) +
                    parseFloat(
                      localStorage.getItem("extraPickupFloorHelpPrice")
                    ) +
                    parseFloat(localStorage.getItem("extraDropFloorHelpPrice"))
                  : 0,
            }
          )
          .then((res) => {
            //alert(JSON.stringify(res.data));
            //set the travel price to the price from the server
            setTravelPrice(res.data.travelPrice);
            //set volume price to the price from the server
            setVolumePrice(res.data.volumePrice);
          });
      }
    }, 500);

    // Clean-up function
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  //update the pickup address and dropoff address
  const updateAddresses = (pickupAddress, dropoffAddress) => {
    setPickupAddress(pickupAddress);
    setDropoffAddress(dropoffAddress);
  };

  //if on / then go to step 1
  if (window.location.pathname === "/") {
    window.location.pathname = "/step2";
    setActiveStep(1);
  }

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  const handleHideSummary = () => {
    setShowSummary(false);
  };

  return (
    <>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#000000",
        }}
      >
        <Toolbar>
          <img
            src="https://freightly.nl/wp-content/uploads/2023/06/white_text-logoname_color1_NObackground-2048x143.png"
            style={{
              //contain
              objectFit: "contain",
              //center it
              margin: "auto",
              height: "20px",
              //center it
            }}
          />
        </Toolbar>
      </AppBar>
      <div //this is the main container
        style={{
          display: "flex",
          flexDirection: isPhone ? "column" : "row",

          justifyContent: "space-between",
          alignItems: "center",
          // backgroundColor: "#00ff77",
          //white bg
          backgroundColor: "#ffffff",
          width: "100%",
          height: "90%",
          margin: "0",
          padding: "0",
          overflowY: "scroll",
        }}
      >
        {!showSummary && (
          <Router>
            <Card
              className={classes.card}
              style={{
                width: "80vw",

                //position it to the left a bit but responsive
                //marginRight: "40%",
                //hide if show summary is true
                //center this
                fullHeight: true,

                marginLeft: !isPhone ? "10%" : "0%",
              }}
            >
              <CardContent className={classes.cardContent}>
                <Typography
                  style={{
                    //font family poppins
                    fontFamily: "Poppins",
                    //blacl
                    color: "#000000",
                  }}
                  variant="h5"
                  component="h1"
                  gutterBottom
                ></Typography>
                <LinearProgress style={{backgroundColor: "#00ff77"}}
                  variant="determinate"
                  value={(activeStep / steps.length) * 100}
                  className={classes.progressBar}
                />
                <Routes>
                  {/* <Route
                    path="/step1"
                    element={
                      <Step1
                        handleStepChange={handleStepChange}
                        updateParent={updateAddresses}
                      />
                    }
                  /> */}
                  <Route
                    path="/step2"
                    element={<Step2 handleStepChange={handleStepChange} />}
                  />
                  <Route
                    path="/step3"
                    element={<Step3 handleStepChange={handleStepChange} />}
                  />
                  <Route
                    path="/step4"
                    element={<Step4 handleStepChange={handleStepChange} />}
                  />
                  <Route
                    path="/step5"
                    element={<Step5 handleStepChange={handleStepChange} />}
                  />
                  <Route
                    path="/step6"
                    element={<Step6 handleStepChange={handleStepChange} />}
                  />
                  <Route
                    path="/step7"
                    element={<Step7 handleStepChange={handleStepChange} />}
                  />
                  <Route
                    path="/step8"
                    element={<Step8 handleStepChange={handleStepChange} />}
                  />
                  <Route
                    path="/step9"
                    element={<Step9 handleStepChange={handleStepChange} />}
                  />
                  <Route
                    path="/step10"
                    element={<Step10 handleStepChange={handleStepChange} />}
                  />
                  <Route
                    path="/step11"
                    element={<Step11 handleStepChange={handleStepChange} />}
                  />
                  <Route
                    path="/step12"
                    element={<Step12 handleStepChange={handleStepChange} />}
                  />
                  <Route
                    path="/step13"
                    element={<Step13 handleStepChange={handleStepChange} />}
                  />
                  <Route
                    path="/step14"
                    element={<Step14 handleStepChange={handleStepChange} />}
                  />
                </Routes>

                <div
                  id="buttons"
                  className={classes.buttonContainer}
                  style={{
                    //center it
                    //one single row
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    //gap between buttons
                    gap: "15vw",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={
                      //go to the previous step.
                      "/step" + (activeStep - 1)
                    }
                    className={classes.button}
                    disabled={activeStep === 2}
                    onClick={() => {
                      handleStepChange(activeStep - 1);
                    }}
                    style={{ fontFamily: "Poppins" }}
                  >
                    Previous
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    style={{ fontFamily: "Poppins" }}
                    component={Link}
                    to={
                      //go to the next step only if local storage uuid is set, regardless of what step you are on
                      //go to the next step
                      "/step" + (activeStep + 1)
                    }
                    className={classes.button}
                    disabled={activeStep === steps.length}
                    onClick={() => {
                      // alert("Active Step: " + activeStep);
                      setActiveStep(activeStep + 1);
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </div>
                {isPhone && (
                  <div
                    style={{
                      //flex row

                      display: "flex",
                      flexDirection: isPhone ? "column" : "row",

                      justifyContent: "center",
                      alignItems: "center",

                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h3"
                      style={{
                        marginBottom: "15px",
                        marginTop: "15px",
                        fontWeight: "bold",
                        //purple
                        color: "black",
                        fontFamily: "Poppins",
                      }}
                    >
                      €
                      {parseFloat(travelPrice) +
                        parseFloat(volumePrice) +
                        (parseFloat(timingPrice ? timingPrice : 0) !== NaN
                          ? parseFloat(timingPrice ? timingPrice : 0)
                          : 0) +
                        (parseFloat(dropTimingPrice ? dropTimingPrice : 0) !==
                        NaN
                          ? parseFloat(dropTimingPrice ? dropTimingPrice : 0)
                          : 0) +
                        //do the same for pickupTimeSlotPrice
                        (parseFloat(
                          pickupTimeSlotPrice ? pickupTimeSlotPrice : 0
                        ) !== NaN
                          ? parseFloat(
                              pickupTimeSlotPrice ? pickupTimeSlotPrice : 0
                            )
                          : 0) +
                        //do the same for extra pick up help
                        (parseFloat(
                          extraPickUpHelpPrice ? extraPickUpHelpPrice : 0
                        ) !== NaN
                          ? parseFloat(
                              extraPickUpHelpPrice ? extraPickUpHelpPrice : 0
                            )
                          : 0) +
                        //do the same for extra pick up lifting help
                        (parseFloat(
                          extraPickULiftingpHelpPrice
                            ? extraPickULiftingpHelpPrice
                            : 0
                        ) !== NaN
                          ? parseFloat(
                              extraPickULiftingpHelpPrice
                                ? extraPickULiftingpHelpPrice
                                : 0
                            )
                          : 0) +
                        //drop lifting help price
                        (parseFloat(
                          extraDropLiftingHelpPrice
                            ? extraDropLiftingHelpPrice
                            : 0
                        ) !== NaN
                          ? parseFloat(
                              extraDropLiftingHelpPrice
                                ? extraDropLiftingHelpPrice
                                : 0
                            )
                          : 0) +
                        //do the same for extra drop time slot price
                        (parseFloat(
                          dropTimeSlotPrice ? dropTimeSlotPrice : 0
                        ) !== NaN
                          ? parseFloat(
                              dropTimeSlotPrice ? dropTimeSlotPrice : 0
                            )
                          : 0) +
                        //do the same for extra drop off help
                        (parseFloat(
                          extraDropHelpPrice ? extraDropHelpPrice : 0
                        ) !== NaN
                          ? parseFloat(
                              extraDropHelpPrice ? extraDropHelpPrice : 0
                            )
                          : 0)}
                    </Typography>

                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        fontFamily: "Poppins",
                        //black bg
                        backgroundColor: "#000000",
                      }}
                      onClick={() => {
                        handleShowSummary();
                      }}
                    >
                      Show Summary
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </Router>
        )}

        {(!isPhone || showSummary) && (
          <Container //this is the summary thing
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              width: "45vw",
            }}
          >
            <Card
              style={{
                display: "flex",
                flexDirection: "column",

                minHeight: "70vh",
                //width fill parent
                width: "100%",
              }}
            >
              {true && (
                <CardContent
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    //have all items spaced out to the extremes
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleHideSummary();
                    }}
                    style={{
                      display: isPhone ? "block" : "none",
                      fontFamily: "Poppins",
                      //black bg
                      backgroundColor: "#000000",
                    }}
                  >
                    Hide Summary
                  </Button>
                  <Typography
                    variant="h8"
                    style={{
                      marginBottom: "5px",
                      marginTop: "5px",
                      //bold
                      fontWeight: "bold",

                      fontFamily: "Poppins",
                      //blue
                    }}
                  >
                    Pickup :
                    {pickupAddress
                      ? " " + pickupAddress.substring(0, 20) + "..."
                      : " " + "Pickup Address"}
                  </Typography>
                  {itemWhere && (
                    <Typography
                      variant="h9"
                      style={{
                        marginBottom: "5px",
                        marginTop: "5px",
                        marginLeft: "30px",

                        fontFamily: "Poppins",
                        //blue
                      }}
                    >
                      At a {itemWhere}
                    </Typography>
                  )}
                  {pickupDate && pickupTimeSlot ? (
                    <Typography
                      variant="h9"
                      style={{
                        marginBottom: "5px",
                        marginTop: "5px",
                        marginLeft: "30px",
                        fontFamily: "Poppins",
                      }}
                    >
                      {pickupDate.replace('"', "").replace('"', "")},
                      {pickupTimeSlot.replace('"', "").replace('"', "")}
                    </Typography>
                  ) : null}
                  {pickupFloorHelp ? (
                    <Typography
                      variant="h9"
                      style={{
                        marginBottom: "5px",
                        marginTop: "5px",
                        marginLeft: "30px",
                        fontFamily: "Poppins",
                      }}
                    >
                      {pickupFloorHelp}
                    </Typography>
                  ) : null}
                  <Typography
                    variant="h8"
                    style={{
                      marginBottom: "5px",
                      marginTop: "5px",
                      fontWeight: "bold",

                      fontFamily: "Poppins",
                    }}
                  >
                    Drop :
                    {" " + dropoffAddress
                      ? " " + dropoffAddress.substring(0, 20) + "..."
                      : " " + "Dropoff Address"}
                  </Typography>
                  {dropDate && dropTimeSlot ? (
                    <Typography
                      variant="h9"
                      style={{
                        marginBottom: "5px",
                        marginTop: "5px",
                        marginLeft: "30px",

                        fontFamily: "Poppins",
                      }}
                    >
                      {dropDate.replace('"', "").replace('"', "")},
                      {dropTimeSlot.replace('"', "").replace('"', "")}
                    </Typography>
                  ) : null}
                  {dropFloorHelp ? (
                    <Typography
                      variant="h9"
                      style={{
                        marginBottom: "5px",
                        marginTop: "5px",
                        marginLeft: "30px",
                        fontFamily: "Poppins",
                      }}
                    >
                      {dropFloorHelp}
                    </Typography>
                  ) : null}

                  <div //travel price
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h8"
                      style={{
                        marginBottom: "5px",
                        marginTop: "5px",
                        fontWeight: "bold",
                        fontFamily: "Poppins",
                      }}
                    >
                      Transport Price
                    </Typography>
                    <Typography
                      variant="h8"
                      style={{
                        marginBottom: "5px",
                        marginTop: "5px",
                        fontWeight: "bold",
                        fontFamily: "Poppins",
                      }}
                    >
                      ${travelPrice}
                    </Typography>
                  </div>
                  <div style={{ height: "40px" }}></div>
                  {stateFullItems.map((item) => {
                    return (
                      <>
                        <Typography
                          variant="h8"
                          style={{
                            marginBottom: "5px",
                            marginTop: "5px",
                            fontWeight: "bold",
                            fontFamily: "Poppins",
                          }}
                        >
                          {item[0]}
                        </Typography>
                        {item[1] ? (
                          <Typography
                            variant="h8"
                            style={{
                              marginBottom: "5px",
                              marginTop: "5px",
                              fontWeight: "bold",
                              fontFamily: "Poppins",
                            }}
                          >
                            ({item[1].Length}cm x{item[1].Width}cm x
                            {item[1].Height}cm )
                          </Typography>
                        ) : null}
                      </>
                    );
                  })}
                  <div
                    style={{
                      selfAlign: "bottom",
                    }}
                  >
                    {//extra pick up help price extraPickupHelpPrice from local storage
                    true && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="h8"
                          style={{
                            marginBottom: "5px",
                            marginTop: "5px",

                            //black
                            color: "black",
                            fontFamily: "Poppins",
                          }}
                        >
                          Total Items Price
                        </Typography>
                        <Typography
                          variant="h8"
                          style={{
                            marginBottom: "5px",
                            marginTop: "5px",
                            fontWeight: "bold",
                            //black
                            color: "black",
                            fontFamily: "Poppins",
                          }}
                        >
                          €
                          {parseFloat(volumePrice ? volumePrice : 0) !== NaN
                            ? parseFloat(volumePrice ? volumePrice : 0)
                            : 0}
                        </Typography>
                      </div>
                    )}

                    {activeStep > 3 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="h8"
                          style={{
                            marginBottom: "5px",
                            marginTop: "5px",

                            //black
                            color: "black",
                            fontFamily: "Poppins",
                          }}
                        >
                          Timing Price
                        </Typography>

                        <Typography
                          variant="h8"
                          style={{
                            marginBottom: "5px",
                            marginTop: "5px",
                            fontWeight: "bold",
                            //black
                            color: "black",
                            fontFamily: "Poppins",
                          }}
                        >
                          €
                          {(parseFloat(timingPrice ? timingPrice : 0) !== NaN
                            ? parseFloat(timingPrice ? timingPrice : 0)
                            : 0) +
                            (parseFloat(
                              dropTimingPrice ? dropTimingPrice : 0
                            ) !== NaN
                              ? parseFloat(
                                  dropTimingPrice ? dropTimingPrice : 0
                                )
                              : 0) +
                            //do the same for pickupTimeSlotPrice
                            (parseFloat(
                              pickupTimeSlotPrice ? pickupTimeSlotPrice : 0
                            ) !== NaN
                              ? parseFloat(
                                  pickupTimeSlotPrice ? pickupTimeSlotPrice : 0
                                )
                              : 0) +
                            //now do the same for dropTimeSlotPrice
                            (parseFloat(
                              dropTimeSlotPrice ? dropTimeSlotPrice : 0
                            ) !== NaN
                              ? parseFloat(
                                  dropTimeSlotPrice ? dropTimeSlotPrice : 0
                                )
                              : 0)}
                        </Typography>
                      </div>
                    )}
                  </div>
                  <div style={{ height: "40px" }}></div>
                  <div
                    style={{
                      selfAlign: "bottom",
                    }}
                  >
                    {//extra pick up help price extraPickupHelpPrice from local storage
                    (parseFloat(
                      extraPickUpHelpPrice ? extraPickUpHelpPrice : 0
                    ) !== NaN
                      ? parseFloat(
                          extraPickUpHelpPrice ? extraPickUpHelpPrice : 0
                        )
                      : 0) +
                      (parseFloat(
                        extraPickULiftingpHelpPrice
                          ? extraPickULiftingpHelpPrice
                          : 0
                      ) !== NaN
                        ? parseFloat(
                            extraPickULiftingpHelpPrice
                              ? extraPickULiftingpHelpPrice
                              : 0
                          )
                        : 0) +
                      (parseFloat(
                        extraDropLiftingHelpPrice
                          ? extraDropLiftingHelpPrice
                          : 0
                      ) !== NaN
                        ? parseFloat(
                            extraDropLiftingHelpPrice
                              ? extraDropLiftingHelpPrice
                              : 0
                          )
                        : 0) +
                      //extra drop off help price extraDropOffHelpPrice from local storage
                      (parseFloat(
                        extraDropHelpPrice ? extraDropHelpPrice : 0
                      ) !== NaN
                        ? parseFloat(
                            extraDropHelpPrice ? extraDropHelpPrice : 0
                          )
                        : 0) !==
                      0 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="h8"
                          style={{
                            marginBottom: "5px",
                            marginTop: "5px",

                            //black
                            color: "black",
                            fontFamily: "Poppins",
                          }}
                        >
                          Extra Help
                        </Typography>
                        <Typography
                          variant="h8"
                          style={{
                            marginBottom: "5px",
                            marginTop: "5px",
                            fontWeight: "bold",
                            //black
                            color: "black",
                            fontFamily: "Poppins",
                          }}
                        >
                          €
                          {//extra pick up help price extraPickupHelpPrice from local storage
                          (parseFloat(
                            extraPickUpHelpPrice ? extraPickUpHelpPrice : 0
                          ) !== NaN
                            ? parseFloat(
                                extraPickUpHelpPrice ? extraPickUpHelpPrice : 0
                              )
                            : 0) +
                            (parseFloat(
                              extraPickULiftingpHelpPrice
                                ? extraPickULiftingpHelpPrice
                                : 0
                            ) !== NaN
                              ? parseFloat(
                                  extraPickULiftingpHelpPrice
                                    ? extraPickULiftingpHelpPrice
                                    : 0
                                )
                              : 0) +
                            (parseFloat(
                              extraDropLiftingHelpPrice
                                ? extraDropLiftingHelpPrice
                                : 0
                            ) !== NaN
                              ? parseFloat(
                                  extraDropLiftingHelpPrice
                                    ? extraDropLiftingHelpPrice
                                    : 0
                                )
                              : 0) +
                            //extra drop off help price extraDropOffHelpPrice from local storage
                            (parseFloat(
                              extraDropHelpPrice ? extraDropHelpPrice : 0
                            ) !== NaN
                              ? parseFloat(
                                  extraDropHelpPrice ? extraDropHelpPrice : 0
                                )
                              : 0)}
                        </Typography>
                      </div>
                    )}

                    {activeStep > 3 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="h8"
                          style={{
                            marginBottom: "5px",
                            marginTop: "5px",

                            //black
                            color: "black",
                            fontFamily: "Poppins",
                          }}
                        >
                          Timing Price
                        </Typography>

                        <Typography
                          variant="h8"
                          style={{
                            marginBottom: "5px",
                            marginTop: "5px",
                            fontWeight: "bold",
                            //black
                            color: "black",
                            fontFamily: "Poppins",
                          }}
                        >
                          €
                          {(parseFloat(timingPrice ? timingPrice : 0) !== NaN
                            ? parseFloat(timingPrice ? timingPrice : 0)
                            : 0) +
                            (parseFloat(
                              dropTimingPrice ? dropTimingPrice : 0
                            ) !== NaN
                              ? parseFloat(
                                  dropTimingPrice ? dropTimingPrice : 0
                                )
                              : 0) +
                            //do the same for pickupTimeSlotPrice
                            (parseFloat(
                              pickupTimeSlotPrice ? pickupTimeSlotPrice : 0
                            ) !== NaN
                              ? parseFloat(
                                  pickupTimeSlotPrice ? pickupTimeSlotPrice : 0
                                )
                              : 0) +
                            //now do the same for dropTimeSlotPrice
                            (parseFloat(
                              dropTimeSlotPrice ? dropTimeSlotPrice : 0
                            ) !== NaN
                              ? parseFloat(
                                  dropTimeSlotPrice ? dropTimeSlotPrice : 0
                                )
                              : 0)}
                        </Typography>
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="h8"
                        style={{
                          marginBottom: "5px",
                          marginTop: "5px",

                          //black
                          color: "black",
                          fontFamily: "Poppins",
                        }}
                      >
                        Total
                      </Typography>
                      <Typography
                        variant="h4"
                        style={{
                          marginTop: "5px",
                          fontWeight: "bold",
                          //black
                          color: "#000000",
                          fontFamily: "Poppins",
                        }}
                      >
                        €
                        {parseFloat(travelPrice) +
                          parseFloat(volumePrice) +
                          // (typeof parseFloat(timingPrice) == "number"
                          //   ? parseFloat(timingPrice)
                          //   : 0) +
                          // (typeof parseFloat(dropTimingPrice) == "number"
                          //   ? parseFloat(dropTimingPrice)
                          //   : 0) +
                          //if timingprice is not NaN, then add it, otherwise add 0
                          (parseFloat(timingPrice ? timingPrice : 0) !== NaN
                            ? parseFloat(timingPrice ? timingPrice : 0)
                            : 0) +
                          (parseFloat(dropTimingPrice ? dropTimingPrice : 0) !==
                          NaN
                            ? parseFloat(dropTimingPrice ? dropTimingPrice : 0)
                            : 0) +
                          //do the same for pickupTimeSlotPrice
                          (parseFloat(
                            pickupTimeSlotPrice ? pickupTimeSlotPrice : 0
                          ) !== NaN
                            ? parseFloat(
                                pickupTimeSlotPrice ? pickupTimeSlotPrice : 0
                              )
                            : 0) +
                          //do the same for extra pick up help
                          (parseFloat(
                            extraPickUpHelpPrice ? extraPickUpHelpPrice : 0
                          ) !== NaN
                            ? parseFloat(
                                extraPickUpHelpPrice ? extraPickUpHelpPrice : 0
                              )
                            : 0) +
                          //do the same for extra pick up lifting help
                          (parseFloat(
                            extraPickULiftingpHelpPrice
                              ? extraPickULiftingpHelpPrice
                              : 0
                          ) !== NaN
                            ? parseFloat(
                                extraPickULiftingpHelpPrice
                                  ? extraPickULiftingpHelpPrice
                                  : 0
                              )
                            : 0) +
                          //drop lifting help price
                          (parseFloat(
                            extraDropLiftingHelpPrice
                              ? extraDropLiftingHelpPrice
                              : 0
                          ) !== NaN
                            ? parseFloat(
                                extraDropLiftingHelpPrice
                                  ? extraDropLiftingHelpPrice
                                  : 0
                              )
                            : 0) +
                          //do the same for extra drop time slot price
                          (parseFloat(
                            dropTimeSlotPrice ? dropTimeSlotPrice : 0
                          ) !== NaN
                            ? parseFloat(
                                dropTimeSlotPrice ? dropTimeSlotPrice : 0
                              )
                            : 0) +
                          //do the same for extra drop off help
                          (parseFloat(
                            extraDropHelpPrice ? extraDropHelpPrice : 0
                          ) !== NaN
                            ? parseFloat(
                                extraDropHelpPrice ? extraDropHelpPrice : 0
                              )
                            : 0)}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </Container>
        )}
      </div>
    </>
  );
}

export default App;
