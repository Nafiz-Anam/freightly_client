import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import style from "./Step10.module.css";
import { DataContext } from "../context/dataContext";
import { StepContext } from "../context/stepContext";
import { useNavigate } from "react-router-dom";

function Step10() {
    const { storage, updateData } = useContext(DataContext);
    const { activeStep, handleStepChange } = useContext(StepContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: storage.delivery_contact, // Set the default values from storage.delivery_contact
    });

    const { toAddress } = storage;
    const [deliverCity, setDeliverCity] = useState("City");
    const [deliverCountry, setDeliverCountry] = useState("Country");

    const deliverCity2 = toAddress && toAddress.split(",")[0].trim();
    const deliverCountry2 = toAddress && toAddress.split(",")[1].trim();

    useEffect(() => {
        if (deliverCity2) {
            setDeliverCity(deliverCity2);
        }
        if (deliverCountry2) {
            setDeliverCountry(deliverCountry2);
        }
    }, [deliverCity2, deliverCountry2]);

    const onSubmit = (data) => {
        // console.log(data);
        data.city = deliverCity;
        data.country = deliverCountry;
        updateData({
            delivery_contact: data,
        });
        handleStepChange(activeStep + 1);
        navigate("/step11");
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
                <div style={{ width: "100%", display: "flex", gap: "15px" }}>
                    <div
                        className={style.row}
                        style={{ width: "100%", flexDirection: "column" }}
                    >
                        <input
                            type="text"
                            placeholder="City"
                            value={deliverCity}
                            disabled
                            {...register("city", {})}
                        />
                    </div>
                    <div
                        className={style.row}
                        style={{ width: "100%", flexDirection: "column" }}
                    >
                        <input
                            type="text"
                            placeholder="Post Code"
                            {...register("post_code", { required: true })}
                        />
                        {errors && errors.post_code ? (
                            <span className={style.error_msg}>
                                Post code is required
                            </span>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <div className={style.row} style={{ flexDirection: "column" }}>
                    <input
                        type="text"
                        placeholder="Country"
                        value={deliverCountry}
                        disabled
                        {...register("country", {})}
                    />
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
