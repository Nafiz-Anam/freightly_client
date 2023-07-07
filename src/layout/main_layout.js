import React from "react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

const Layout = ({ children, cartSummary, totalPrice, onNext }) => {
    return (
        <div className="app">
            {/* Top Bar */}
            <div className="top-bar">
                <div className="logo">
                    <a href="https://freightly.nl/">
                        <img
                            src="https://freightly.nl/wp-content/uploads/2023/06/white_text-logoname_color1_NObackground-2048x143.png"
                            style={{
                                objectFit: "contain",
                                margin: "auto",
                                height: "20px",
                            }}
                            alt="Freightly Logo"
                        />
                    </a>
                </div>
            </div>

            {/* Main Body */}
            <div className="main-body">
                <div className="left-side">
                    {/* Dynamic Content */}
                    <div className="page-content">{children}</div>
                </div>
                <div className="right-side">
                    {/* Static Cart Summary */}
                    <div className="cart-summary">
                        {cartSummary.map((item, index) => (
                            <div className="item" key={index}>
                                <span>{item.name}</span>
                                <span>{item.price}</span>
                            </div>
                        ))}
                        <div className="total-price">{totalPrice}</div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="footer">
                <div className="footer-container">
                    <button className="next-button" onClick={onNext}>
                        <GoArrowLeft className="arrow-right" /> Previous
                    </button>
                    <button className="next-button" onClick={onNext}>
                        Continue <GoArrowRight className="arrow-right" />
                    </button>
                </div>
                <div className="footer-container_right"></div>
            </div>
        </div>
    );
};

export default Layout;
