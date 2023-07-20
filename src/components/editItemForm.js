import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./Step2.module.css";
import ImageDropzone from "./imageDropzone";
import { DataContext } from "../context/dataContext";

const EditItemForm = ({ eIndex, editData, setEditModalShow }) => {
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

    const { storage, updateData } = useContext(DataContext);
    console.log("storage =>", storage);
    let img = editData.image;
    const [image, setImage] = useState({ image: img });
    console.log("image", image);
    const [materials, setMaterials] = useState(materials_old);
    console.log("materials", materials);
    const [sizes, setSizes] = useState(sizes_old);
    console.log("sizes", sizes);

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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: editData,
    });

    const onSubmit = (data) => {
        let item = {
            width: data.width,
            height: data.height,
            length: data.length,
            count: data.count,
            title: editData.title,
            image: image.image,
            materials: materials.length ? materials.join(",") : "",
            sizes: sizes.length ? sizes.join(",") : "",
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
            {editData.materials ? (
                <div>
                    <h2
                        style={{ marginTop: "25px" }}
                        className={style.addItemHeader}
                    >
                        Does it contain any of these materials?
                    </h2>
                    <div className={style.row} style={{ flexWrap: "wrap" }}>
                        {editData.materials.split(",").map((item, index) => (
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
            {editData.sizes ? (
                <div>
                    <h2
                        style={{ marginTop: "25px" }}
                        className={style.addItemHeader}
                    >
                        What size is it?
                    </h2>
                    <div className={style.row} style={{ flexWrap: "wrap" }}>
                        {editData.sizes.split(",").map((item, index) => (
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
                {/* <button
                    className={style.closeBtn}
                    onClick={() => setSelectedItem({})}
                >
                    Close
                </button> */}
            </div>
        </form>
    );
};

export default EditItemForm;
