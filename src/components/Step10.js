import React from "react";
import { useForm } from "react-hook-form";
import style from "./Step11.module.css";

function Step10() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

    return (
        <div style={{ marginTop: "40px" }}>
            <h2 style={{ textAlign: "center" }}>
                Pickup address contact details
            </h2>
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

export default Step10;
