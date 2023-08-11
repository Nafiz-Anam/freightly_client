import React, { useContext, useState, useEffect } from "react";
import Papa from "papaparse";
import { Modal, Spinner } from "react-bootstrap";
import { DataContext } from "../context/dataContext";
import { StepContext } from "../context/stepContext";
import { useNavigate } from "react-router-dom";

function Step7() {
    const sheetURL =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=663952614&single=true&output=csv";

    const popupSheet =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=327490930&single=true&output=csv";

    const [sheetData, setSheetData] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { storage, updateData } = useContext(DataContext);
    const { activeStep, handleStepChange } = useContext(StepContext);
    const navigate = useNavigate();
    const [popupData, setPopupData] = useState([]);
    // console.log("popupData", popupData);
    // console.log("popupData", popupData.length > 0 ? popupData[1].content : "");
    const [alertShow, setAlertShow] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(sheetURL);
                if (!response.ok) {
                    throw new Error("Failed to fetch sheet data");
                }
                const csvData = await response.text();

                const parsedData = Papa.parse(csvData, { header: true });
                const jsonData = parsedData.data;

                setSheetData(jsonData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        const fetchPopupData = async () => {
            try {
                const response = await fetch(popupSheet);
                if (!response.ok) {
                    throw new Error("Failed to fetch sheet data");
                }
                const csvData = await response.text();
                const parsedData = Papa.parse(csvData, { header: true });
                const PopupJson = parsedData.data;
                // console.log("priceVolumeJson", priceVolumeJson);
                setPopupData(PopupJson);
            } catch (error) {
                console.error(error);
                return null;
            }
        };

        fetchData();
        fetchPopupData();
    }, []);

    useEffect(() => {
        setSelectedItem(storage.delivery_time);
    }, [storage.delivery_time]);

    useEffect(() => {
        if (popupData.length > 0 && storage.distance >= 0) {
            setAlertShow(true);
        }
    }, [popupData]);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        updateData({
            ...storage,
            delivery_time: item,
        });
    };

    const handleContinue = () => {
        let item = {
            time: "00:00 - 00:00",
            cost: "€0.00",
        };
        setSelectedItem(item);
        updateData({
            ...storage,
            delivery_time: item,
            request: true,
        });
        setAlertShow(false);
        handleStepChange(activeStep + 1);
        navigate("/step8");
    };

    return (
        <div className="list-layout">
            <h2
                style={{
                    textAlign: "center",
                    paddingTop: "15px",
                    paddingBottom: "25px",
                }}
            >
                Determine Your Desired Delivery Time
            </h2>
            {isLoading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <ul className="list">
                    {sheetData.map((item) => (
                        <li key={item.time}>
                            <button
                                className={`list-item2 ${
                                    selectedItem &&
                                    selectedItem.time === item.time
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => handleItemClick(item)}
                            >
                                <span className="item-name">{item.time}</span>
                                <span className="item-name">{item.cost}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* alert modal */}
            <Modal
                show={alertShow}
                onHide={() => setAlertShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {popupData[1] && popupData[1].title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p
                        style={{
                            textAlign: "center",
                            padding: "0px 0px 25px 0px",
                        }}
                    >
                        {popupData[1] && popupData[1].content}
                    </p>
                    {/* <h5 style={{ textAlign: "center", paddingBottom: "20px" }}>
                        Thank you for your patience
                    </h5> */}
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleContinue} className="web-btn">
                        Continue
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Step7;
