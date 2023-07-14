import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./Step12.module.css";
import { DataContext } from "../context/dataContext";

const Step12 = () => {
    const { register, handleSubmit } = useForm();
    const [activeTab, setActiveTab] = useState("personal");
    console.log(activeTab);
    const { storage, updateData } = useContext(DataContext);
    console.log("storage =>", storage);

    const onSubmit = (data) => {
        console.log(data);
        updateData({
            ...storage,
            personal_details: data,
        });
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

                <div className={style.tab}>
                    <div className={style.section}>
                        <h3 style={{ marginBottom: "3%" }}>Personal Details</h3>
                        <div className={style.row}>
                            <div className={style.column}>
                                <label>First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    {...register("firstName")}
                                />
                            </div>
                            <div className={style.column}>
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    {...register("lastName")}
                                />
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.column}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    {...register("email")}
                                />
                            </div>
                            <div className={style.column}>
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    {...register("phoneNumber")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {activeTab === "business" && (
                <div className={style.tab}>
                    <div className={style.businessSection}>
                        <h3 style={{ marginBottom: "3%" }}>Company Details</h3>
                        <div className={style.row}>
                            <label>Company Name</label>
                            <input
                                type="text"
                                placeholder="Company Name"
                                {...register("companyName")}
                            />
                        </div>
                        <div className={style.row}>
                            <label>Chamber of Commerce Number</label>
                            <input
                                type="text"
                                placeholder="Chamber of Commerce Number"
                                {...register("chamberOfCommerce")}
                            />
                        </div>
                        <div className={style.row}>
                            <label>VAT Number</label>
                            <input
                                type="text"
                                placeholder="VAT Number"
                                {...register("vatNumber")}
                            />
                        </div>
                        <div className={style.row}>
                            <label>Street Name + Number</label>
                            <input
                                type="text"
                                placeholder="Street Name + Number"
                                {...register("streetAddress")}
                            />
                        </div>
                        <div className={style.row}>
                            <label>Postal Code</label>
                            <input
                                type="text"
                                placeholder="Postal Code"
                                {...register("postalCode")}
                            />
                        </div>
                        <div className={style.row}>
                            <label>Area</label>
                            <input
                                type="text"
                                placeholder="Area"
                                {...register("area")}
                            />
                        </div>
                        <div className={style.row}>
                            <label>Area Code</label>
                            <input
                                type="text"
                                placeholder="Area Code"
                                {...register("areaCode")}
                            />
                        </div>
                    </div>
                </div>
            )}

            <button type="submit">Submit</button>
        </form>
    );
};

export default Step12;
