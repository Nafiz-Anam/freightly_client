import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchComponent from "./SearchComponent";
import { CiSearch } from "react-icons/ci";
import { Modal } from "react-bootstrap";
import { FaRegPlusSquare } from "react-icons/fa";
import { FiTrash2, FiEdit3 } from "react-icons/fi";
import { useForm } from "react-hook-form";
import style from "./Step2.module.css";

const sheetURL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?output=csv";

function Step2() {
    const [modalShow, setModalShow] = useState(false);
    const [sheetData, setSheetData] = useState([]);
    const [extras, setExtras] = useState([]);
    console.log("extras", extras);
    const [selectedItem, setSelectedItem] = useState("");
    console.log("selectedItem", selectedItem);
    const [selectedItems, setSelectedItems] = useState([
        { title: "test" },
        { title: "ok ok here" },
    ]);
    console.log("selectedItems", selectedItems);

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
                // console.log("parsedData", parsedData);
                setSheetData(parsedData);
                // globalSheetData = parsedData;
            } catch (error) {
                console.error("Error retrieving CSV data:", error);
            }
        };

        fetchData();
    }, []);

    const handleImageDrop = (images, index) => {
        setSelectedItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index].images = images;
            return updatedItems;
        });
    };

    const items = ["glass", "wood", "solid wood", "steel", "marble", "metal"];
    const items2 = ["2 - seater", "3 - seater", "4 - seater", "5 - seater"];

    const handleItemClick = (item) => {
        setExtras((prevSelectedItems) => {
            if (prevSelectedItems.includes(item)) {
                // Item already selected, remove it from selectedItems
                return prevSelectedItems.filter((extras) => extras !== item);
            } else {
                // Item not selected, add it to selectedItems
                return [...prevSelectedItems, item];
            }
        });
    };

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        let item = {
            width: data.width,
            height: data.height,
            length: data.length,
            count: data.count,
            title: selectedItem,
        };
        console.log(item);
        selectedItems.push(item);
        // clear selected state
        setSelectedItem("");
    };

    return (
        <div className="step2-container">
            {selectedItems.length > 0 && !selectedItem ? (
                <>
                    <div
                        style={{
                            width: "70%",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <h2 style={{ marginBottom: "25px" }}>Your item(s)</h2>

                        <button
                            className="addBtn"
                            onClick={() => setModalShow(true)}
                        >
                            <FaRegPlusSquare className="icon-add" />
                            Add item
                        </button>
                    </div>
                    <div
                        style={{
                            width: "70%",
                            marginBottom: "50px",
                            marginTop: "20px",
                        }}
                    >
                        <ul className={style.searchResults}>
                            {selectedItems.map((item) => (
                                <li className={style.listItem}>
                                    <div className={style.imgBox}>
                                        <img className={style.itemIMG}
                                            src="https://icon-library.com/images/camera-png-icon/camera-png-icon-0.jpg"
                                            alt="place holder"
                                        />
                                    </div>
                                    <div className={style.contextBox}>
                                        <h2>{item.title}</h2>
                                        <p>Size: 2 x 5 x 9 cm</p>
                                        <p>Quantity: 2</p>
                                    </div>
                                    <div className={style.iconBox}>
                                        <FiEdit3 className={style.listIcon2} />
                                        <FiTrash2 className={style.listIcon} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : selectedItem ? (
                <>
                    <form
                        className={style.formContainer}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h2 className={style.addItemHeader}>
                            Check dimensions (l x w x h):
                        </h2>

                        <div className={style.row}>
                            <div className={`${style.column} ${style.box}`}>
                                <input
                                    type="text"
                                    placeholder="Height"
                                    {...register("height", {})}
                                />
                                <span className={style.placeholderTXT}>cm</span>
                            </div>
                            <div className={`${style.column} ${style.box}`}>
                                <input
                                    type="text"
                                    placeholder="Width"
                                    {...register("width", {})}
                                />
                                <span className={style.placeholderTXT}>cm</span>
                            </div>
                            <div className={`${style.column} ${style.box}`}>
                                <input
                                    type="text"
                                    placeholder="Length"
                                    {...register("length", {})}
                                />
                                <span className={style.placeholderTXT}>cm</span>
                            </div>
                        </div>
                        <div>
                            <h2
                                style={{ marginTop: "25px" }}
                                className={style.addItemHeader}
                            >
                                Does it contain any of these materials?
                            </h2>
                            <div
                                className={style.row}
                                style={{ flexWrap: "wrap" }}
                            >
                                {items.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`${style.pills} ${
                                            extras.includes(item)
                                                ? style.selected
                                                : ""
                                        }`}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2
                                style={{ marginTop: "25px" }}
                                className={style.addItemHeader}
                            >
                                What size is it?
                            </h2>
                            <div
                                className={style.row}
                                style={{ flexWrap: "wrap" }}
                            >
                                {items2.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`${style.pills} ${
                                            extras.includes(item)
                                                ? style.selected
                                                : ""
                                        }`}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={style.row}>
                            <div
                                className={style.box}
                                style={{ width: "100%", padding: "5px" }}
                            >
                                <input
                                    type="text"
                                    placeholder="Enter item count"
                                    {...register("count", {})}
                                />
                                <span className={style.placeholderTXT}>
                                    How many?
                                </span>
                            </div>
                        </div>

                        <button type="submit"> Add</button>
                    </form>
                </>
            ) : (
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
            )}

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
                    <SearchComponent
                        items={sheetData}
                        setModalShow={setModalShow}
                        setSelectedItem={setSelectedItem}
                    />
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    );
}

export default Step2;
