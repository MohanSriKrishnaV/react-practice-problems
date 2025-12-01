import { use } from "react";
import React from "react";
import { useState } from "react";

export default function ImgUpload() {
    const [files, setfiles] = useState([])
    const [loader, setloader] = useState(false);

    const handleSubmit = () => {
        console.log(files, "files");
    };

    const clearForm = () => {
        setfiles([])
    }

    const handleFile = (e) => {
        setloader(true);
        const files1 = e.target.files;
        if (files1.length === 0) return;
        if (files1.length > 5) {
            window.alert("You can upload maximum 5 images");
            return;
        }
        const arr = [];
        for (const file of files1) {
            const reader = new FileReader();
            reader.onload = (event) => {
                arr.push({
                    name: file.name,
                    file: file,
                    img: event.target.result, // Base64 image
                });
                // If you want to update state after all files are processed:
                if (arr.length === files1.length) {
                    setfiles((prev) => [...prev, ...arr]); // Assuming you have setFiles state
                }
            };
            reader.readAsDataURL(file); // Important!
        }
        setloader(false);

    };

    const removeImg = (index) => () => {
        const newFiles = files.filter((_, i) => i !== index);
        setfiles(newFiles);
    }


    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <input type="file" name="dp" accept="image/*" multiple capture="camera" required onChange={handleFile} />
            <button onClick={handleSubmit} disabled={files.length > 0}>SUBMIT</button>
            <button onClick={clearForm}>Clear</button>
            {loader && <div>Loading...</div>}
            {!loader && files.length === 0 && <div>No images uploaded</div>}
            {!loader && files.length > 0 &&
                <div>
                    <ul>
                        {files && files.map((file, index) => (
                            <li key={index}>
                                <div>
                                    <button onClick={removeImg(index)}>remove</button>
                                    {file.img && <img src={file.img} alt={file.name} width="100" />}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>}
        </div>
    );
}