import React, { useState } from "react";

export default (name = "") => {
    const [value, setValue] = useState(name);
    const onChange = (e) => setValue(e.target.value);
    return { value, onChange };
};
