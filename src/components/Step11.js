import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import style from "./Step11.module.css";
import { DataContext } from "../context/dataContext";

function Step11() {
    const { storage, updateData } = useContext(DataContext);
    console.log("storage =>", storage);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        updateData({
            ...storage,
            delivery_contact: data,
        });
        reset();
    };
    console.log(errors);

    return (
        <div style={{ marginTop: "40px" }}>
            <h2 style={{ textAlign: "center" }}>Delivery contact details</h2>
            <form
                className={style.formContainer}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={style.row}>
                    <textarea
                        placeholder="Details address"
                        {...register("address")}
                    />
                </div>
                <div className={style.row}>
                    <input
                        type="text"
                        placeholder="Name"
                        {...register("name", {})}
                    />
                </div>
                <div className={style.row}>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {})}
                    />
                </div>
                <div className={style.row}>
                    <input
                        type="text"
                        placeholder="Phone"
                        {...register("phone", {})}
                    />
                </div>
                <div className={style.row}>
                    <button type="submit"> Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Step11;
