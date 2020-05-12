import React, { createContext } from "react";
import Sidebar from "./sidebar/";
import useAuth from "../hooks/useAuth";

export const UserContext = createContext({});

export default ({ children }) => {
    const user = useAuth();
    return (
        <UserContext.Provider value={user}>
            <Sidebar />
            <main className='main'>{children}</main>
        </UserContext.Provider>
    );
};
