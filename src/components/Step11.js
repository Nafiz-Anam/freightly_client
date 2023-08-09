import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import style from "./Step11.module.css";
import { DataContext } from "../context/dataContext";

const Step11 = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const { storage, updateData } = useContext(DataContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: storage.personal_details,
    });
    console.log(errors);

    const onSubmit = (data) => {
        // console.log(data);
        updateData({
            ...storage,
            personal_details: data,
        });
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        if (
            storage &&
            storage.personal_details &&
            (storage.personal_details.companyName ||
                storage.personal_details.chamberOfCommerce ||
                storage.personal_details.vatNumber ||
                storage.personal_details.streetAddress ||
                storage.personal_details.postalCode ||
                storage.personal_details.area ||
                storage.personal_details.areaCode)
        ) {
            setActiveTab("business");
        }
    }, [storage]);

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
                                    {...register("firstName", {
                                        required: true,
                                    })}
                                />
                                {errors && errors.firstName ? (
                                    <span className={style.error_msg}>
                                        First name is required
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className={style.column}>
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    {...register("lastName", {
                                        required: true,
                                    })}
                                />
                                {errors && errors.lastName ? (
                                    <span className={style.error_msg}>
                                        Last name is required
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className={style.row}>
                            <div className={style.column}>
                                <label>Email</label>
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
                            <div className={style.column}>
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    {...register("phoneNumber", {
                                        required: true,
                                    })}
                                />
                                {errors && errors.phoneNumber ? (
                                    <span className={style.error_msg}>
                                        Phone number is required
                                    </span>
                                ) : (
                                    ""
                                )}
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

            {/* Add Checkboxes */}
            <div className={style.checkboxesContainer}>
                <div className={style.checkbox}>
                    <input
                        type="checkbox"
                        id="newsletter"
                        {...register("newsletter")}
                    />
                    <label htmlFor="newsletter">
                        Yes, I would like to subscribe to Freightly newsletter
                    </label>
                </div>
                <div className={style.checkbox}>
                    <input
                        type="checkbox"
                        id="agreeTerms"
                        {...register("agreeTerms", { required: true })}
                    />
                    <label htmlFor="agreeTerms">
                        By making use of Freightly, you have to agree with{" "}
                        <a href="#">Freightly general terms</a>
                    </label>
                </div>
                <div className={style.checkbox}>
                    <input
                        type="checkbox"
                        id="agreePrivacy"
                        {...register("agreePrivacy", { required: true })}
                    />
                    <label htmlFor="agreePrivacy">
                        I agree with <a href="#">Freightly Privacy statement</a>
                    </label>
                </div>
                {errors && errors.agreeTerms ? (
                    <span className={style.error_msg}>
                        Please agree to Freightly general terms
                    </span>
                ) : (
                    ""
                )}
                {errors && errors.agreePrivacy ? (
                    <span className={style.error_msg}>
                        Please agree to Freightly Privacy statement
                    </span>
                ) : (
                    ""
                )}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default Step11;
