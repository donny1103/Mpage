import React from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(import("react-quill"), { ssr: false, loading: () => <p>Loading ...</p> });

const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link"],
        ["clean"],
    ],
    clipboard: {
        matchVisual: false,
    },
};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
];

export default (props) => {
    return <ReactQuill modules={modules} formats={formats} theme='snow' {...props} value={props.value || ""} />;
};
