import React, { useContext, useEffect, useState } from "react";
import Papa from "papaparse";
import SearchComponent from "./SearchComponent";
import { CiSearch } from "react-icons/ci";
import { Modal } from "react-bootstrap";
import { FaRegPlusSquare } from "react-icons/fa";
import { FiTrash2, FiEdit3 } from "react-icons/fi";
import { useForm } from "react-hook-form";
import style from "./Step2.module.css";
import ImageDropzone from "./imageDropzone";
import { DataContext } from "../context/dataContext";

const sheetURL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?output=csv";

function Step2() {
    const { storage, updateData } = useContext(DataContext);
    console.log("storage =>", storage);
    const [modalShow, setModalShow] = useState(false);
    const [sheetData, setSheetData] = useState([]);
    // console.log(sheetData);
    const [materials, setMaterials] = useState([]);
    console.log("materials", materials);
    const [sizes, setSizes] = useState([]);
    console.log("sizes", sizes);
    const [selectedItem, setSelectedItem] = useState({});
    console.log("selectedItem", selectedItem);
    const [selectedItems, setSelectedItems] = useState(
        storage.selected_items || []
    );
    const [image, setImage] = useState({});
    console.log("selectedItems", selectedItems);
    const { register, handleSubmit, reset } = useForm();

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

                // console.log(jsonData);
                setSheetData(jsonData);
            } catch (error) {
                console.error(error);
                return null;
            }
        };

        fetchData();
    }, []);
    

    // const items = ["glass", "wood", "solid wood", "steel", "marble", "metal"];
    // const items2 = ["2 - seater", "3 - seater", "4 - seater", "5 - seater"];

    const handleMaterials = (item) => {
        setMaterials((prevSelectedItems) => {
            if (prevSelectedItems.includes(item)) {
                // Item already selected, remove it from selectedItems
                return prevSelectedItems.filter(
                    (materials) => materials !== item
                );
            } else {
                // Item not selected, add it to selectedItems
                return [...prevSelectedItems, item];
            }
        });
    };
    const handleSizes = (item) => {
        setSizes((prevSelectedItems) => {
            if (prevSelectedItems.includes(item)) {
                // Item already selected, remove it from selectedItems
                return prevSelectedItems.filter((sizes) => sizes !== item);
            } else {
                // Item not selected, add it to selectedItems
                return [...prevSelectedItems, item];
            }
        });
    };

    const onSubmit = (data) => {
        let item = {
            width: data.width,
            height: data.height,
            length: data.length,
            count: data.count,
            title: selectedItem.title,
            image: image.image,
            materials: materials.length ? materials.join(",") : "",
            sizes: sizes.length ? sizes.join(",") : "",
        };
        console.log(item);
        setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
        updateData({
            selected_items: [...selectedItems, item],
        });
        setSelectedItem({});
        setSizes([]);
        setMaterials([]);
        reset();
    };

    return (
        <div className="step2-container">
            {storage.selected_items.length > 0 &&
            Object.keys(selectedItem).length === 0 ? (
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
                            marginBottom: "100px",
                            marginTop: "20px",
                        }}
                    >
                        <ul className={style.searchResults}>
                            {storage.selected_items.map((item, index) => (
                                <li className={style.listItem} key={index}>
                                    <div className={style.imgBox}>
                                        <img
                                            className={style.itemIMG}
                                            src={
                                                item.image
                                                    ? item.image
                                                    : "https://icon-library.com/images/camera-png-icon/camera-png-icon-0.jpg"
                                            }
                                            alt="item"
                                        />
                                    </div>
                                    <div className={style.contextBox}>
                                        <h2>{item.title}</h2>
                                        <p>{`Dimensions: ${
                                            item.length ? item.length : "L"
                                        } x ${
                                            item.width ? item.width : "W"
                                        } x ${
                                            item.height ? item.height : "H"
                                        } cm`}</p>
                                        <p>{`Quantity: ${
                                            item.count ? item.count : "1"
                                        }`}</p>
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
            ) : Object.keys(selectedItem).length > 0 ? (
                <>
                    <h2>{`Enter ${selectedItem.title} details`}</h2>
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
                        {selectedItem.materials ? (
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
                                    {selectedItem.materials
                                        .split(",")
                                        .map((item, index) => (
                                            <div
                                                key={index}
                                                className={`${style.pills} ${
                                                    materials.includes(item)
                                                        ? style.selected
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleMaterials(item)
                                                }
                                            >
                                                {item}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        {selectedItem.sizes ? (
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
                                    {selectedItem.sizes
                                        .split(",")
                                        .map((item, index) => (
                                            <div
                                                key={index}
                                                className={`${style.pills} ${
                                                    sizes.includes(item)
                                                        ? style.selected
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleSizes(item)
                                                }
                                            >
                                                {item}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        <div>
                            <h2
                                style={{ marginTop: "25px" }}
                                className={style.addItemHeader}
                            >
                                Upload image
                            </h2>
                            <div
                                className={style.row}
                                style={{ flexWrap: "wrap" }}
                            >
                                <ImageDropzone image={image} />
                            </div>
                        </div>
                        <div className={style.row}>
                            <div
                                className={style.box}
                                style={{ width: "100%", padding: "5px" }}
                            >
                                <h2 className={style.addItemHeader}>
                                    Item count
                                </h2>
                                <input
                                    type="text"
                                    placeholder="Enter item count"
                                    {...register("count", {})}
                                />
                                <span
                                    className={style.placeholderTXT}
                                    style={{ marginTop: "0px" }}
                                >
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
