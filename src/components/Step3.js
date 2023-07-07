import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Typography,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    IconButton,
} from "@material-ui/core";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
//expand more icon
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//expand less icon
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import { parse } from "date-fns";

const materials = {
    glass: false,

    marble: false,
    heavy: false,
};
//access a google sheet from here
//https://www.youtube.com/watch?v=MiPpQzW_ya0

// const useStyles = makeStyles((theme) => ({
//     form: {
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//     },
//     textField: {
//         margin: theme.spacing(2),
//     },
// }));

const sheetURL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?output=csv";

// let globalSheetData = [];

const DynamicInputForm = () => {
    const isPhone = window.innerWidth < 600;
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [additionalFields, setAdditionalFields] = useState([]);
    const [sheetData, setSheetData] = useState([]);
    const [selectedOptionsDimensions, setSelectedOptionsDimensions] = useState(
        []
    );
    //selected options materials
    const [selectedOptionsMaterials, setSelectedOptionsMaterials] = useState(
        []
    );
    //selected options images
    // const [selectedOptionsImages, setSelectedOptionsImages] = useState([]);
    //minimised cards for each item
    const [minimisedCards, setMinimisedCards] = useState([false]);

    useEffect(() => {
        //at first get all this from local storage if local storage is not empty
        try {
            //if length of selectedOptions is not 0 in local storage, then set it
            if (
                JSON.parse(localStorage.getItem("selectedOptions")).length > 0
            ) {
                setSelectedOptions(
                    JSON.parse(localStorage.getItem("selectedOptions"))
                );
            }
            //same for additionalFields and selectedOptionsDimensions
            if (
                JSON.parse(localStorage.getItem("additionalFields")).length > 0
            ) {
                setAdditionalFields(
                    JSON.parse(localStorage.getItem("additionalFields"))
                );
            }
            if (
                JSON.parse(localStorage.getItem("selectedOptionsDimensions"))
                    .length > 0
            ) {
                setSelectedOptionsDimensions(
                    JSON.parse(
                        localStorage.getItem("selectedOptionsDimensions")
                    )
                );
            }
        } catch (err) {}
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
    }, []);
    //IF selectedOptions chanes, save it
    useEffect(() => {
        if (selectedOptions.length > 0) {
            localStorage.setItem(
                "selectedOptions",
                JSON.stringify(selectedOptions)
            );
        }
        //make new indices in additionalFields , selectedOptionsDimensions and selectedOptionsMaterials
        //for every new item in selectedOptions if it does not exist
        //if it exists, do not make a new index
        var length = selectedOptions.length;
        if (additionalFields[length - 1] === undefined) {
            setAdditionalFields([
                ...additionalFields,
                { value: selectedOptions[length - 1], text: "" },
            ]);
        }
        if (!selectedOptionsDimensions[length - 1]) {
            setSelectedOptionsDimensions([
                ...selectedOptionsDimensions,
                {
                    value: selectedOptions[length - 1],
                    text: "",
                    //default values
                    Length: 20,
                    Width: 20,
                    Height: 20,
                    qty: 1,
                },
            ]);
        }
        //add a new index for minimised cards
        //now minimise every card except the last one
        var newMinimisedCards = [...minimisedCards];
        if (minimisedCards[length - 1] === undefined) {
            for (let i = 0; i < minimisedCards.length; i++) {
                newMinimisedCards[i] = true;
            }
            newMinimisedCards[length - 1] = false;
            setMinimisedCards(newMinimisedCards);
        } else {
            //if length is 1 and minimisedCards[0] is undefined, set it to false

            setMinimisedCards([false]);
        }
    }, [selectedOptions]);
    //if additionalFields changes, save it
    useEffect(() => {
        localStorage.setItem(
            "additionalFields",
            JSON.stringify(additionalFields)
        );
    }, [additionalFields]);

    //if selectedOptionsDimensions changes, save it
    useEffect(() => {
        localStorage.setItem(
            "selectedOptionsDimensions",
            JSON.stringify(selectedOptionsDimensions)
        );
    }, [selectedOptionsDimensions]);

    //if selectedOptionsMaterials changes, save it
    useEffect(() => {
        localStorage.setItem(
            "selectedOptionsMaterials",
            JSON.stringify(selectedOptionsMaterials)
        );
    }, [selectedOptionsMaterials]);

    // Function to parse CSV data into an array of rows
    const parseCSV = (csvData) => {
        const rows = csvData.split("\n");
        const parsedData = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i].split(",");
            parsedData.push(row);
        }
        //sheetData is an array of items

        return parsedData;
    };

    //for every item in sheetData, create a menu item
    const menuItems = sheetData.map((item) => {
        return <MenuItem value={item}>{item}</MenuItem>;
    });
    // const handleSelectChange = (event) => {
    //   const selectedValue = event.target.value;
    //   setSelectedOptions(selectedValue);

    //   if (selectedValue.length > 0) {
    //     const newFields = selectedValue.map((value) => ({ value, text: "" }));
    //     setAdditionalFields(newFields);
    //   } else {
    //     setAdditionalFields([]);
    //   }
    // };

    const handleAdditionalFieldChange = (event, index) => {
        const { value } = event.target;
        const updatedFields = [...additionalFields];
        updatedFields[index] = {
            ...updatedFields[index],
            text: value,
        };
        setAdditionalFields(updatedFields);
    };
    const firebaseConfig = {
        apiKey: "AIzaSyDL94WDmgbpclkwY0oVh9TGjHQRvU8VlCc",
        authDomain: "freightly-admin.firebaseapp.com",
        databaseURL:
            "https://freightly-admin-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "freightly-admin",
        storageBucket: "freightly-admin.appspot.com",
        messagingSenderId: "897142706479",
        appId: "1:897142706479:web:1d99adaa3e5eae5b8a91da",
    };
    firebase.initializeApp(firebaseConfig);

    //storage
    const storage = firebase.storage();

    const [itemImages, setItemImages] = useState([]);
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    useEffect(() => {
        //save urls to local storage
        if (itemImages.length > 0) {
            localStorage.setItem("itemImages", JSON.stringify(itemImages));
        }
    }, [itemImages]);
    //on first time load, get itemImages from local storage
    useEffect(() => {
        try {
            if (JSON.parse(localStorage.getItem("itemImages")).length > 0) {
                setItemImages(JSON.parse(localStorage.getItem("itemImages")));
            }
        } catch (err) {}
    }, []);

    const handleImageUpload = (event, index) => {
        //TODO: Change the name of the file to "image.jpg"
        const file = event.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        //change the file name while uploading to "image.jpg"
        fileRef
            .put(file)
            .then(() => {
                console.log("Uploaded a file");
                //get the url of the uploaded file
                fileRef.getDownloadURL().then((url) => {
                    //set the url to the itemImages array
                    const newImages = [...itemImages];
                    newImages[index] = url;
                    setItemImages(newImages);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSelectChange2 = (event) => {
        setSelectedOptions(event.target.value);
        setIsSelectOpen(false); // close dropdown after selection
    };

    const handleOpen = () => {
        setIsSelectOpen(true);
    };

    const handleClose = () => {
        setIsSelectOpen(false);
    };
    return (
        <div
            style={{
                width: "100%",

                //have eerything centered
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "Poppins",
            }}
        >
            <FormControl style={{ width: "100%" }}>
                <InputLabel style={{ width: "100%" }}>
                    Select Items - Click here to add Items
                </InputLabel>
                <Select
                    multiple
                    value={selectedOptions}
                    onChange={handleSelectChange2}
                    renderValue={(selected) => selected.join(", ")}
                    width="100%"
                    dummyValue={selectedOptions}
                    open={isSelectOpen}
                    onOpen={handleOpen}
                    onClose={handleClose}
                >
                    {menuItems}
                </Select>
            </FormControl>

            {selectedOptions.map((option, index) => (
                <Card
                    key={index}
                    style={{
                        width: "70%",
                        margin: "10px",
                        //have eerything centered
                        display: "flex",
                        flexDirection: "column",

                        //put padding and deep rounded shadow border and stuff on it
                        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",

                        borderRadius: "10px",
                        padding: "10px",
                        //if minimised is true, make it small
                        height: minimisedCards[index] ? "60px" : "auto",
                    }}
                >
                    <div
                        style={{
                            //flex column
                            display: "flex",
                            flexDirection: "column",

                            width: "100%",
                        }}
                    >
                        <CardContent // THE WHOLE CARD
                            style={{
                                //flex row
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    //full width
                                    width: "90%",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                    }}
                                >
                                    <Typography // ITEM NAME
                                        variant="h5"
                                        style={{
                                            // marginBottom: "10px",
                                            // marginTop: "10px",
                                            fontWeight: "bold",
                                            //center text
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "row",
                                            //multi line
                                            flexWrap: "wrap",
                                            fontFamily: "Poppins",
                                        }}
                                    >
                                        {option}
                                    </Typography>

                                    <IconButton
                                        onClick={() => {
                                            //toggle the minimised state of the card
                                            setMinimisedCards(
                                                (prevMinimisedCards) => {
                                                    const updatedMinimisedCards =
                                                        [...prevMinimisedCards];
                                                    updatedMinimisedCards[
                                                        index
                                                    ] =
                                                        !updatedMinimisedCards[
                                                            index
                                                        ];
                                                    return updatedMinimisedCards;
                                                }
                                            );
                                        }}
                                    >
                                        {/* {minimisedCards[index] ? (
                      <ExpandMoreIcon />
                    ) : (
                      <ExpandLessIcon />
                    )} */}
                                    </IconButton>
                                </div>
                                <Typography
                                    style={{
                                        width: "90%",
                                        margin: "7px", //center it
                                        display: "flex",
                                        justifyContent: "center",
                                        fontFamily: "Poppins",
                                    }}
                                >
                                    Please fill out the dimensions of the item.
                                    Upload a picture. It will make the driver
                                    happy!
                                </Typography>
                                <TextField //Additional Text FOR THIS ITM
                                    key={index}
                                    label={`Description/Handling Instructions for this item`}
                                    value={
                                        additionalFields[index]
                                            ? additionalFields[index].text
                                            : ""
                                    }
                                    onChange={(event) =>
                                        handleAdditionalFieldChange(
                                            event,
                                            index
                                        )
                                    }
                                    style={{
                                        width: "100%",
                                        margin: "7px", //center it
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                    //fit max width
                                    fullWidth
                                />
                            </div>

                            <div /// Length Width Height
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <TextField
                                    label="Length in cm"
                                    value={
                                        selectedOptionsDimensions[index]
                                            ? selectedOptionsDimensions[index]
                                                  .Length
                                            : 0
                                    }
                                    //only take numbers
                                    type="number"
                                    //required to be greater than 0

                                    onChange={(event) => {
                                        if (
                                            parseInt(event.target.value) === NaN
                                        ) {
                                            return;
                                        }
                                        if (parseInt(event.target.value) <= 0) {
                                            return;
                                        }
                                        //in the selectedOptionsDimensions array, update the length only
                                        //for the index of the item that is being changed
                                        const updatedDimensions = [
                                            ...selectedOptionsDimensions,
                                        ];
                                        //create the index if it doesn't exist
                                        if (!updatedDimensions[index]) {
                                            updatedDimensions[index] = {
                                                Length: 0,
                                                Width: 0,
                                                Height: 0,
                                                qty: 1,
                                            };
                                        }
                                        updatedDimensions[index].Length =
                                            event.target.value;
                                        setSelectedOptionsDimensions(
                                            updatedDimensions
                                        );
                                    }}
                                    style={{
                                        width: "100%",
                                        margin: "5px",
                                    }}
                                    //fit max width
                                    fullWidth
                                />
                                <TextField
                                    type="number"
                                    label="Width in cm"
                                    value={
                                        selectedOptionsDimensions[index]
                                            ? selectedOptionsDimensions[index]
                                                  .Width
                                            : 0
                                    }
                                    onChange={(event) => {
                                        if (
                                            parseInt(event.target.value) === NaN
                                        ) {
                                            return;
                                        }
                                        if (parseInt(event.target.value) <= 0) {
                                            return;
                                        }
                                        //in the selectedOptionsDimensions array, update the width only
                                        //for the index of the item that is being changed
                                        const updatedDimensions = [
                                            ...selectedOptionsDimensions,
                                        ];
                                        //create the index if it doesn't exist
                                        if (!updatedDimensions[index]) {
                                            updatedDimensions[index] = {
                                                Length: 0,
                                                Width: 0,
                                                Height: 0,
                                                qty: 1,
                                            };
                                        }
                                        updatedDimensions[index].Width =
                                            event.target.value;
                                        setSelectedOptionsDimensions(
                                            updatedDimensions
                                        );
                                    }}
                                    style={{ width: "100%", margin: "20px" }}
                                    //fit max width
                                    fullWidth
                                />
                                <TextField
                                    type="number"
                                    label="Height in cm"
                                    value={
                                        selectedOptionsDimensions[index]
                                            ? selectedOptionsDimensions[index]
                                                  .Height
                                            : 0
                                    }
                                    onChange={(event) => {
                                        if (
                                            parseInt(event.target.value) === NaN
                                        ) {
                                            return;
                                        }
                                        if (parseInt(event.target.value) <= 0) {
                                            return;
                                        }
                                        //in the selectedOptionsDimensions array, update the height only
                                        //for the index of the item that is being changed
                                        const updatedDimensions = [
                                            ...selectedOptionsDimensions,
                                        ];
                                        //create the index if it doesn't exist
                                        if (!updatedDimensions[index]) {
                                            updatedDimensions[index] = {
                                                Length: 0,
                                                Width: 0,
                                                Height: 0,
                                                qty: 1,
                                            };
                                        }
                                        updatedDimensions[index].Height =
                                            event.target.value;
                                        setSelectedOptionsDimensions(
                                            updatedDimensions
                                        );
                                    }}
                                    style={{ width: "100%", margin: "20px" }}
                                    //fit max width
                                    fullWidth
                                />
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <TextField
                                    type="number"
                                    label="Quantity"
                                    value={
                                        selectedOptionsDimensions[index]
                                            ? selectedOptionsDimensions[index]
                                                  .qty
                                            : 0
                                    }
                                    onChange={(event) => {
                                        if (
                                            parseInt(event.target.value) === NaN
                                        ) {
                                            return;
                                        }
                                        if (parseInt(event.target.value) <= 0) {
                                            return;
                                        }
                                        //in the selectedOptionsDimensions array, update the qty only
                                        //for the index of the item that is being changed
                                        const updatedDimensions = [
                                            ...selectedOptionsDimensions,
                                        ];
                                        //create the index if it doesn't exist
                                        if (!updatedDimensions[index]) {
                                            updatedDimensions[index] = {
                                                Length: 0,
                                                Width: 0,
                                                Height: 0,
                                                qty: 1,
                                            };
                                        }
                                        updatedDimensions[index].qty =
                                            event.target.value;
                                        setSelectedOptionsDimensions(
                                            updatedDimensions
                                        );
                                    }}
                                    style={{
                                        width: "100%",
                                        margin: "20px",
                                        //make the font size bigger
                                        fontSize: "40px",
                                        //make the font bold
                                        fontWeight: "bold",
                                        //input font size bigger
                                        "& input": {
                                            fontSize: "40px",
                                            fontWeight: "bold",
                                        },
                                    }}
                                    //fit max width
                                    fullWidth
                                />
                                <Button //remove selected item button
                                    variant="contained"
                                    color="secondary"
                                    style={{
                                        margin: "20px", // have it centered
                                        //red color
                                        backgroundColor: "#ff0000",
                                    }}
                                    onClick={() => {
                                        //remove item from selected options
                                        const newSelectedOptions = [
                                            ...selectedOptions,
                                        ];
                                        newSelectedOptions.splice(index, 1);
                                        setSelectedOptions(newSelectedOptions);
                                        //change it in local storage
                                        localStorage.setItem(
                                            "selectedOptions",
                                            JSON.stringify(newSelectedOptions)
                                        );
                                        //remove additional field
                                        const newAdditionalFields = [
                                            ...additionalFields,
                                        ];
                                        newAdditionalFields.splice(index, 1);
                                        setAdditionalFields(
                                            newAdditionalFields
                                        );

                                        //remove it from the dimensions array as well
                                        const newSelectedOptionsDimensions = [
                                            ...selectedOptionsDimensions,
                                        ];
                                        newSelectedOptionsDimensions.splice(
                                            index,
                                            1
                                        );
                                        setSelectedOptionsDimensions(
                                            newSelectedOptionsDimensions
                                        );

                                        //remove this image
                                        const newImages = [...itemImages];
                                        newImages.splice(index, 1);
                                        setItemImages(newImages);
                                    }}
                                >
                                    Remove
                                </Button>
                            </div>
                            <div //image upload
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <label htmlFor="raised-button-file">
                                    <div>
                                        <div
                                            key={index}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                            }}
                                        >
                                            {!itemImages[index] && (
                                                <input
                                                    type="file"
                                                    onChange={(event) =>
                                                        handleImageUpload(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                    style={{
                                                        margin: "20px", // have it centered
                                                        //green color bold
                                                        backgroundColor:
                                                            "#00ff00",
                                                        fontWeight: "bold",
                                                        //change its text
                                                    }}
                                                    //change its text
                                                />
                                            )}

                                            {
                                                <img
                                                    src={
                                                        itemImages[index]
                                                            ? itemImages[index]
                                                            : ""
                                                    }
                                                    alt="Uploaded"
                                                    //contain
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        objectFit: "contain",
                                                        //center
                                                        margin: "auto",
                                                    }}
                                                />
                                            }
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </CardContent>

                        <div //materials container
                            style={{
                                //grid view
                                display: !isPhone ? "grid" : "flex",
                                gridTemplateColumns: "1fr 1fr 1fr",
                                //make it centered
                                justifyContent: "center",
                                //make it spaced out
                                gap: "8px",
                                //make it wrap
                                flexWrap: "wrap",
                                //make it centered
                                alignItems: "center",
                            }}
                        >
                            {Object.keys(materials).map((material) => (
                                //just make a mui checkbox group
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            style={{
                                                borderRadius: "10px",
                                                //make it smaller
                                                width: "20px",
                                                height: "20px",
                                            }}
                                            checked={
                                                selectedOptionsMaterials[index]
                                                    ? selectedOptionsMaterials[
                                                          index
                                                      ][material]
                                                    : false
                                            }
                                            onChange={(event) =>
                                                setSelectedOptionsMaterials(
                                                    //update the selectedOptionsMaterials array
                                                    //for the index of the item that is being changed
                                                    {
                                                        ...selectedOptionsMaterials,
                                                        [index]: {
                                                            ...selectedOptionsMaterials[
                                                                index
                                                            ],
                                                            [material]:
                                                                event.target
                                                                    .checked,
                                                        },
                                                    }
                                                )
                                            }
                                            name={material}
                                        />
                                    }
                                    label={material}
                                    //set label bg depending on if its selected
                                    style={{
                                        backgroundColor:
                                            selectedOptionsMaterials[index]
                                                ? selectedOptionsMaterials[
                                                      index
                                                  ][material]
                                                    ? "#3f51b5"
                                                    : "#fff"
                                                : "#fff",
                                        //set label color depending on if its selected
                                        color: selectedOptionsMaterials[index]
                                            ? selectedOptionsMaterials[index][
                                                  material
                                              ]
                                                ? "#fff"
                                                : "#000"
                                            : "#000",
                                        //make it centered
                                        textAlign: "center",
                                        //make it bold
                                        fontWeight: "bold",
                                        //make it bigger
                                        fontSize: "20px",
                                        //make it rounded
                                        borderRadius: "10px",
                                        //make it have a border
                                        border: "1px solid #000",
                                        //make it have a margin
                                        margin: "10px",
                                        //make it have a padding
                                        padding: "10px",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </Card>
            ))}

            <Button ///CLEAR EVERYTHING BUTTON
                variant="contained"
                color="primary"
                style={{
                    margin: "20px", // have it centered
                    //black bg
                    backgroundColor: "#000",
                    //green text
                    color: "#00ff77",
                }}
                onClick={() => {
                    //clear menu items
                    setSelectedOptions([]);
                    //change it in local storage
                    localStorage.setItem("selectedOptions", JSON.stringify([]));
                    //remove all additional fields
                    setAdditionalFields([]);
                    //remove images
                    setItemImages([]);
                }}
            >
                {
                    //if localhorage is not empty, show, your order already has items and show the items. click here to clear
                    // localStorage.getItem("selectedOptions") != "[]" ||
                    // localStorage.getItem("selectedOptions") != null
                    //   ? "Your order " +
                    //     (selectedOptions.length > 0
                    //       ? ""
                    //       : "already \n" +
                    //         JSON.stringify(
                    //           //run a for loop and take th that result in the argument of this function
                    //           JSON.parse(localStorage.getItem("selectedOptions"))
                    //         )) +
                    //     "  \n has items. Click here to clear"
                    //   : "Clear Selected Items" + (selectedOptions.length > 0 ? "" : "")}
                    "Clear Items"
                }
            </Button>
        </div>
    );
};
function Step3() {
    // const classes = useStyles();

    return (
        <>
            <Typography
                variant="h5"
                style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                }}
            >
                Select Items
            </Typography>
            <div
                style={{
                    overflowY: "scroll",
                    height: "55vh",
                    width: "100%",
                    //no x scroll
                    overflowX: "hidden",
                }}
            >
                <DynamicInputForm />
            </div>
        </>
    );
}

export default Step3;
