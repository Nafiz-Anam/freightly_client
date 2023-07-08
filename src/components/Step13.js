import React, { useState } from "react";
import { useForm } from "react-hook-form";
import style from "./Step13.module.css";

const Step13 = () => {
    const { register, handleSubmit } = useForm();
    const [activeTab, setActiveTab] = useState("personal");
    console.log(activeTab);

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.tabContainer}>
                <div className={style.tabButtons}>
                    <button
                        className={activeTab === "personal" ? style.active : ""}
                        onClick={() => handleTabChange("personal")}
                    >
                        Personal Contact Details
                    </button>
                    <button
                        className={activeTab === "business" ? style.active : ""}
                        onClick={() => handleTabChange("business")}
                    >
                        Business Contact Details
                    </button>
                </div>

                {activeTab === "personal" && (
                    <div className={style.tab}>
                        <div className={style.section}>
                            <h3>Personal Details</h3>
                            <div className={style.row}>
                                <div className={style.column}>
                                    <label>First Name:</label>
                                    <input
                                        type="text"
                                        {...register("firstName")}
                                    />
                                </div>
                                <div className={style.column}>
                                    <label>Last Name:</label>
                                    <input
                                        type="text"
                                        {...register("lastName")}
                                    />
                                </div>
                            </div>
                            <div className={style.row}>
                                <div className={style.column}>
                                    <label>Email:</label>
                                    <input type="text" {...register("email")} />
                                </div>
                                <div className={style.column}>
                                    <label>Phone Number:</label>
                                    <input
                                        type="text"
                                        {...register("phoneNumber")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "business" && (
                    <div className={style.tab}>
                        <div className={style.section}>
                            <h3>Personal Details</h3>
                            <div className={style.row}>
                                <div className={style.column}>
                                    <label>First Name:</label>
                                    <input
                                        type="text"
                                        {...register("firstName")}
                                    />
                                </div>
                                <div className={style.column}>
                                    <label>Last Name:</label>
                                    <input
                                        type="text"
                                        {...register("lastName")}
                                    />
                                </div>
                            </div>
                            <div className={style.row}>
                                <div className={style.column}>
                                    <label>Email:</label>
                                    <input type="text" {...register("email")} />
                                </div>
                                <div className={style.column}>
                                    <label>Phone Number:</label>
                                    <input
                                        type="text"
                                        {...register("phoneNumber")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={style.section}>
                            <h3>Company Details</h3>
                            <div className="">
                                <div className={style.column}>
                                    <label>Company Name:</label>
                                    <input
                                        type="text"
                                        {...register("companyName")}
                                    />
                                </div>
                                <div className={style.column}>
                                    <label>Chamber of Commerce Number:</label>
                                    <input
                                        type="text"
                                        {...register("chamberOfCommerce")}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <div className={style.column}>
                                    <label>VAT Number:</label>
                                    <input
                                        type="text"
                                        {...register("vatNumber")}
                                    />
                                </div>
                                <div className={style.column}>
                                    <label>Street Name + Number:</label>
                                    <input
                                        type="text"
                                        {...register("streetAddress")}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <div className={style.column}>
                                    <label>Postal Code:</label>
                                    <input
                                        type="text"
                                        {...register("postalCode")}
                                    />
                                </div>
                                <div className={style.column}>
                                    <label>Area:</label>
                                    <input type="text" {...register("area")} />
                                </div>
                            </div>
                            <div className="">
                                <div className={style.column}>
                                    <label>Area Code:</label>
                                    <input
                                        type="text"
                                        {...register("areaCode")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default Step13;
