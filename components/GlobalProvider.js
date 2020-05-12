import React, { createContext } from "react";
import useAuth from "../hooks/useAuth";

export const GlobalContext = createContext({});

export default (props) => {
    const user = useAuth();

    return <GlobalContext.Provider value={{ user }}>{props.children}</GlobalContext.Provider>;
};
