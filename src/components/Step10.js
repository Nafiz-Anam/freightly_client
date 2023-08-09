import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import style from "./Step10.module.css";
import { DataContext } from "../context/dataContext";

function Step10() {
    const { storage, updateData } = useContext(DataContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: storage.delivery_contact, // Set the default values from storage.delivery_contact
    });

    const onSubmit = (data) => {
        console.log(data);
        updateData({
            ...storage,
            delivery_contact: data,
        });
    };

    return (
        <div style={{ marginTop: "40px" }}>
            <h2 style={{ textAlign: "center" }}>Delivery contact details</h2>
            <form
                className={style.formContainer}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={style.row} style={{ flexDirection: "column" }}>
                    <textarea
                        placeholder="Details address"
                        {...register("address", { required: true })}
                    />
                    {errors && errors.address ? (
                        <span className={style.error_msg}>
                            Address is required
                        </span>
                    ) : (
                        ""
                    )}
                </div>
                <div className={style.row} style={{ flexDirection: "column" }}>
                    <input
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: true })}
                    />
                    {errors && errors.name ? (
                        <span className={style.error_msg}>
                            Name number is required
                        </span>
                    ) : (
                        ""
                    )}
                </div>
                <div className={style.row} style={{ flexDirection: "column" }}>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />
                    {errors && errors.email ? (
                        <span className={style.error_msg}>
                            Email address is required
                        </span>
                    ) : (
                        ""
                    )}
                </div>
                <div className={style.row} style={{ flexDirection: "column" }}>
                    <input
                        type="text"
                        placeholder="Phone"
                        {...register("phone", { required: true })}
                    />
                    {errors && errors.phone ? (
                        <span className={style.error_msg}>
                            Phone number is required
                        </span>
                    ) : (
                        ""
                    )}
                </div>
                <div className={style.row}>
                    <button type="submit"> Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Step10;
