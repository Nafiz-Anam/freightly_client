import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { StepContext } from "../context/stepContext";
import Summary from "../components/summary";
import style from "./main_layout.module.css";

const Layout = ({ children, cartSummary, totalPrice }) => {
    const { activeStep, handleStepChange } = useContext(StepContext);

    const handleNext = () => {
        handleStepChange(activeStep + 1);
    };

    const handlePrevious = () => {
        handleStepChange(activeStep - 1);
    };

    return (
        <div className={style.app}>
            {/* Top Bar */}
            <div className={style.topBar}>
                <div>
                    <a href="https://freightly.nl/">
                        <img
                            src="https://freightly.nl/wp-content/uploads/2023/06/white_text-logoname_color1_NObackground-2048x143.png"
                            style={{
                                objectFit: "contain",
                                margin: "auto",
                                height: "20px",
                            }}
                            alt="Freightly Company Logo"
                        />
                    </a>
                </div>
            </div>

            {/* Main Body */}
            <div className={style.mainBody}>
                <div className={style.leftSide}>
                    {/* Render the current step */}
                    <div className={style.pageContent}>{children}</div>
                </div>
                <div className={style.rightSide}>
                    {/* Summary details and calculation here */}
                    <Summary
                        cartSummary={cartSummary}
                        totalPrice={totalPrice}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className={style.footer}>
                <div className={style.footerContainer}>
                    {activeStep === 1 ? (
                        <button className={style["next-button-disabled"]}>
                            <GoArrowLeft className={style.arrowRight} />
                            Previous
                        </button>
                    ) : (
                        <Link
                            className={style["next-button"]}
                            to={"/step" + (activeStep - 1)}
                            onClick={handlePrevious}
                        >
                            <GoArrowLeft className={style.arrowRight} />
                            Previous
                        </Link>
                    )}

                    {activeStep <= 11 ? (
                        <Link
                            className={style["next-button"]}
                            to={"/step" + (activeStep + 1)}
                            onClick={handleNext}
                        >
                            Continue
                            <GoArrowRight className={style.arrowRight} />
                        </Link>
                    ) : (
                        <Link className={style["next-button"]}>
                            Submit & Pay
                            <GoArrowRight className={style.arrowRight} />
                        </Link>
                    )}
                </div>
                <div className={style["footer-container-right"]}></div>
            </div>
        </div>
    );
};

export default Layout;
