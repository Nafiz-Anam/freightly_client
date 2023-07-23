import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./Step2.module.css";
import ImageDropzone from "./imageDropzone";
import { DataContext } from "../context/dataContext";

const EditItemForm = ({
    eIndex,
    editData,
    setEditModalShow,
    sheetVolumePriceData,
    items,
    sheetPriceData,
}) => {
    // console.log("items", items);
    // New state variables to hold the matched item's materials and sizes
    const [matchedMaterials, setMatchedMaterials] = useState([]);
    const [matchedSizes, setMatchedSizes] = useState([]);
    const { storage, updateData } = useContext(DataContext);
    // console.log("storage =>", storage);
    let img = editData.image;
    const [image, setImage] = useState({ image: img });
    // console.log("image", image);

    let materials_old = [];
    let sizes_old = [];
    if (editData.materials) {
        if (editData.materials.includes(",")) {
            materials_old = editData.materials.split(",");
        } else {
            materials_old = [editData.materials];
        }
    }
    if (editData.sizes) {
        if (editData.sizes.includes(",")) {
            sizes_old = editData.sizes.split(",");
        } else {
            sizes_old = [editData.sizes];
        }
    }

    const [materials, setMaterials] = useState(materials_old);
    console.log("materials", materials);
    const [sizes, setSizes] = useState(sizes_old);
    console.log("sizes", sizes);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: editData,
    });

    useEffect(() => {
        // Function to find the corresponding item from the items array
        const findMatchingItem = () => {
            const matchingItem = items.find(
                (item) => item.title === editData.title
            );
            if (matchingItem) {
                // Extract materials and sizes from the matching item
                const { materials, sizes } = matchingItem;
                const materialsArray = materials ? materials.split(",") : [];
                const sizesArray = sizes ? sizes.split(",") : [];

                // Set the matched materials and sizes options
                setMatchedMaterials(materialsArray);
                setMatchedSizes(sizesArray);
            }
        };

        findMatchingItem();
    }, [editData.title, items]);

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
                      entry["price_per_material "]
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
            title: editData.title,
            image: image.image,
            materials: materials.length ? materials.join(",") : "",
            sizes: sizes.length ? sizes.join(",") : "",
            cost: (totalPrice *= parseInt(data.count)),
        };
        console.log(item);
        const updatedItems = [...storage.selected_items];
        updatedItems[eIndex] = item;

        updateData({
            selected_items: updatedItems,
        });
        setEditModalShow(false);
        setSizes([]);
        setMaterials([]);
    };

    return (
        <form
            className={style.formContainer_edit}
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
            {matchedMaterials.length ? (
                <div>
                    <h2
                        style={{ marginTop: "25px" }}
                        className={style.addItemHeader}
                    >
                        Does it contain any of these materials?
                    </h2>
                    <div className={style.row} style={{ flexWrap: "wrap" }}>
                        {matchedMaterials.map((item, index) => (
                            <div
                                key={index}
                                className={`${style.pills} ${
                                    materials.includes(item)
                                        ? style.selected
                                        : ""
                                }`}
                                onClick={() => handleMaterials(item)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                ""
            )}
            {matchedSizes.length ? (
                <div>
                    <h2
                        style={{ marginTop: "25px" }}
                        className={style.addItemHeader}
                    >
                        What size is it?
                    </h2>
                    <div className={style.row} style={{ flexWrap: "wrap" }}>
                        {matchedSizes.map((item, index) => (
                            <div
                                key={index}
                                className={`${style.pills} ${
                                    sizes.includes(item) ? style.selected : ""
                                }`}
                                onClick={() => handleSizes(item)}
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
                <div className={style.row} style={{ flexWrap: "wrap" }}>
                    <ImageDropzone image={image} />
                </div>
            </div>
            <div className={style.row}>
                <div
                    className={style.box}
                    style={{ width: "100%", padding: "5px" }}
                >
                    <h2 className={style.addItemHeader}>Item count</h2>
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
                    onClick={() => setEditModalShow(false)}
                >
                    Close
                </button>
            </div>
        </form>
    );
};

export default EditItemForm;
