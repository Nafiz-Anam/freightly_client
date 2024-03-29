import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import style from "./Step10.module.css";
import { DataContext } from "../context/dataContext";
import { useNavigate } from "react-router-dom";
import { StepContext } from "../context/stepContext";

function Step9() {
    const { storage, updateData } = useContext(DataContext);
    const { activeStep, handleStepChange } = useContext(StepContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: storage.pickup_contact, // Set the default values from storage.pickup_contact
    });
    console.log(errors);

    const { fromAddress } = storage;
    const [pickupFromCity, setPickupFromCity] = useState("City");
    const [pickupFromCountry, setPickupFromCountry] = useState("Country");

    const pickupFromCity2 = fromAddress && fromAddress.split(",")[0].trim();
    const pickupFromCountry2 = fromAddress && fromAddress.split(",")[1].trim();

    useEffect(() => {
        if (pickupFromCity2) {
            setPickupFromCity(pickupFromCity2);
        }
        if (pickupFromCountry2) {
            setPickupFromCountry(pickupFromCountry2);
        }
    }, [pickupFromCity2, pickupFromCountry2]);

    const onSubmit = (data) => {
        // console.log(data);
        data.city = pickupFromCity;
        data.country = pickupFromCountry;
        updateData({
            // ...storage,
            pickup_contact: data,
        });
        handleStepChange(activeStep + 1);
        navigate("/step10");
    };

    return (
        <div style={{ marginTop: "40px" }}>
            <h2 style={{ textAlign: "center" }}>
                Pickup address contact details
            </h2>
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
                            value={pickupFromCity}
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
                        value={pickupFromCountry}
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
                            Name is required
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

export default Step9;
