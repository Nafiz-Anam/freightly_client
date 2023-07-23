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
import EditItemForm from "./editItemForm";

const sheetURL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?output=csv";

const priceSheetURL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=981080402&single=true&output=csv";

const volumeSheetURL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQORHI8-xEc9MatJrHUWA-hUyuLVl6tmfkLLOVGoB7WmZwD6e98ZKK04ebEZkcKOdZI1uPWj0otsUNt/pub?gid=1568095341&single=true&output=csv";

function Step2() {
    const { storage, updateData } = useContext(DataContext);
    console.log("storage =>", storage);
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [sheetData, setSheetData] = useState([]);
    // console.log(sheetData);
    const [sheetPriceData, setSheetPriceData] = useState([]);
    // console.log(sheetPriceData);
    const [sheetVolumePriceData, setSheetVolumePriceData] = useState([]);
    // console.log("sheetVolumePriceData", sheetVolumePriceData);
    const [materials, setMaterials] = useState([]);
    // console.log("materials", materials);
    const [sizes, setSizes] = useState([]);
    // console.log("sizes", sizes);
    const [selectedItem, setSelectedItem] = useState({});
    // console.log("selectedItem", selectedItem);
    const [selectedItems, setSelectedItems] = useState(
        storage.selected_items.length > 0 ? storage.selected_items : []
    );
    console.log("selectedItems", selectedItems);
    const [image, setImage] = useState({});
    // console.log("selectedItems", selectedItems);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (storage.selected_items.length > 0) {
            setSelectedItems(storage.selected_items);
        }
    }, [storage]);

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
        const fetchPriceData = async () => {
            try {
                const response = await fetch(priceSheetURL);
                if (!response.ok) {
                    throw new Error("Failed to fetch sheet data");
                }
                const csvData = await response.text();
                const parsedData = Papa.parse(csvData, { header: true });
                const priceJson = parsedData.data;
                // console.log("priceJson", priceJson);
                setSheetPriceData(priceJson);
            } catch (error) {
                console.error(error);
                return null;
            }
        };
        const fetchVolumePriceData = async () => {
            try {
                const response = await fetch(volumeSheetURL);
                if (!response.ok) {
                    throw new Error("Failed to fetch sheet data");
                }
                const csvData = await response.text();
                const parsedData = Papa.parse(csvData, { header: true });
                const priceVolumeJson = parsedData.data;
                // console.log("priceVolumeJson", priceVolumeJson);
                setSheetVolumePriceData(priceVolumeJson);
            } catch (error) {
                console.error(error);
                return null;
            }
        };

        fetchData();
        fetchPriceData();
        fetchVolumePriceData();
    }, []);

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
        let totalPrice = 0;
        const selectedMaterial = materials.join(", ");
        // console.log("selectedMaterial", selectedMaterial);

        // Split the selectedMaterial into an array of individual materials
        const selectedMaterialsArray = selectedMaterial.split(", ");
        // Find all matching entries in priceSheetData based on the selectedMaterial
        const matchingEntries = selectedMaterialsArray.map((material) =>
            material.trim().toLowerCase() !== ""
                ? sheetPriceData.find((entry) =>
                      entry["price_per_material"]
                          .toLowerCase()
                          .includes(material.toLowerCase())
                  )
                : null
        );
        // console.log("matchingEntries", matchingEntries);

        // Calculate the total price based on the matching entries
        matchingEntries.forEach((entry) => {
            if (entry) {
                const itemPrice = parseFloat(entry.cost.replace("€", ""));
                totalPrice += itemPrice;
            }
        });

        // Calculate the volume of the item
        const volume =
            (data.width / 100) * (data.height / 100) * (data.length / 100);

        // Find the appropriate price range for the volume
        let priceRange = null;
        for (const volumeObj of sheetVolumePriceData) {
            const [minVolume, maxVolume] = volumeObj.volume_m3.split(" - ");
            if (minVolume <= volume && volume <= maxVolume) {
                priceRange = volumeObj;
                break;
            }
        }
        // console.log("priceRange", priceRange);
        if (!priceRange) {
            console.log("Volume is not within any price range.");
            return;
        } else {
            totalPrice =
                totalPrice + parseInt(priceRange.price.replace("€", ""));
        }

        let item = {
            width: data.width,
            height: data.height,
            length: data.length,
            count: data.count,
            title: selectedItem.title,
            image: image.image,
            materials: materials.length ? materials.join(",") : "",
            sizes: sizes.length ? sizes.join(",") : "",
            cost: (totalPrice *= parseInt(data.count)),
        };
        // console.log(item);

        setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
        updateData({
            selected_items: [...selectedItems, item],
        });

        // clear all states
        setSelectedItem({});
        setSizes([]);
        setMaterials([]);
        setImage({});
        reset();
    };

    const removeSelectedItem = (index) => {
        const updatedItems = [...storage.selected_items];
        updatedItems.splice(index, 1);
        setSelectedItems(updatedItems);
        updateData({
            ...storage,
            selected_items: updatedItems,
        });
    };

    const [editData, setEditData] = useState({});
    const [eIndex, setEIndex] = useState(null);

    const editItem = (index) => {
        console.log(index);
        console.log(storage.selected_items[index]);
        setEIndex(index);
        setEditData(storage.selected_items[index]);
        setEditModalShow(true);
    };

    return (
        <div className={style["step2-container"]}>
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
                            className={style.addBtn}
                            onClick={() => setModalShow(true)}
                        >
                            <FaRegPlusSquare className={style["icon-add"]} />
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
                                        <FiEdit3
                                            onClick={() => editItem(index)}
                                            className={style.listIcon2}
                                        />
                                        <FiTrash2
                                            onClick={() =>
                                                removeSelectedItem(index)
                                            }
                                            className={style.listIcon}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className={style.searchDesc}>
                            max. 200kg per transport
                        </p>
                    </div>
                </>
            ) : Object.keys(selectedItem).length > 0 ? (
                <>
                    <h2>{`Enter "${selectedItem.title}" details`}</h2>
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
                                    placeholder="Length"
                                    {...register("length", {})}
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
                                    placeholder="Height"
                                    {...register("height", {})}
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

                        <div className={style.btnDiv}>
                            <button type="submit"> Add</button>
                            <button
                                className={style.closeBtn}
                                onClick={() => setSelectedItem({})}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <div className={style.searchDemo}>
                    <h2 className={style.searchHeading}>Add your item(s)</h2>
                    <button
                        className={style.searchBtn}
                        onClick={() => setModalShow(true)}
                    >
                        <CiSearch className={style.searchIcon} /> Search
                        items...
                    </button>
                    <p className={style.searchDesc}>max. 200kg per transport</p>
                </div>
            )}

            {/* search modal */}
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

            {/* edit modal */}
            <Modal
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {`Edit "${editData.title}" details`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditItemForm
                        setEditModalShow={setEditModalShow}
                        eIndex={eIndex}
                        editData={editData}
                        sheetVolumePriceData={sheetVolumePriceData}
                        items={sheetData}
                        sheetPriceData={sheetPriceData}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Step2;
