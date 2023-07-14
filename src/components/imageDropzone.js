import React, { useState, useRef } from "react";

const ImageDropzone = ({ image }) => {
    const [imagePreview, setImagePreview] = useState("");
    const [showInstruction, setShowInstruction] = useState(true);
    const fileInputRef = useRef(null);
    console.log("image =>", image);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
                image.image = reader.result;
            };
            reader.readAsDataURL(file);
            setShowInstruction(false);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
                image.image = reader.result;
            };
            reader.readAsDataURL(file);
            setShowInstruction(false);
        }
    };

    const highlightDropzone = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.classList.add("highlight");
    };

    const unhighlightDropzone = (event) => {
        event.currentTarget.classList.remove("highlight");
    };

    const handleOverlayClick = (event) => {
        event.stopPropagation();
        fileInputRef.current.click();
    };

    return (
        <div className="dropzone">
            <div
                className="dropzone-overlay"
                onClick={handleOverlayClick}
                onDragOver={highlightDropzone}
                onDragLeave={unhighlightDropzone}
                onDrop={handleDrop}
            ></div>
            {imagePreview ? (
                <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="preview"
                />
            ) : (
                <>
                    <span className="instruction">
                        {showInstruction ? "Drop or Click to upload" : ""}
                    </span>
                </>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="file-input"
            />
        </div>
    );
};

export default ImageDropzone;
