import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchComponent from "./SearchComponent";
import { CiSearch } from "react-icons/ci";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const sheetURL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?output=csv";

function Step2() {
    // const classes = useStyles();
    const [sheetData, setSheetData] = useState([]);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(sheetURL);
                const csvData = response.data;
                // Parse the CSV data
                const parsedData = parseCSV(csvData);
                console.log("parsedData", parsedData);

                setSheetData(parsedData);
                // globalSheetData = parsedData;
            } catch (error) {
                console.error("Error retrieving CSV data:", error);
            }
        };

        fetchData();
    }, []);
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="step2-container">
            <div className="searchDemo">
                <h2 className="searchHeading">Add your item(s)</h2>
                <button
                    className="searchBtn"
                    onClick={() => setModalShow(true)}
                >
                    <CiSearch className="searchIcon" /> Search items...
                </button>
                <p className="searchDesc">max. 200kg per transport</p>
            </div>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        List Your Item(s) for Transport
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SearchComponent items={sheetData} />
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    );
}

export default Step2;
